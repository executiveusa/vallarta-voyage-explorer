import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import net from 'net';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  '/',
  '/sunsets',
  '/directory',
  '/agents',
  '/sunset-spots/los-muertos-pier',
  '/sunset-spots/mirador-cerro-de-la-cruz',
  '/sunset-spots/conchas-chinas-beach',
  '/sunset-spots/el-barracuda',
  '/sunset-spots/colomitos-beach',
  '/sunset-spots/barcelona-tapas',
  '/sunset-spots/marina-lighthouse',
  '/sunset-spots/yelapa-main-beach'
];

const PORT = 4173; 
const BASE_URL = `http://localhost:${PORT}`;

const checkPort = (port) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(100);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, 'localhost');
  });
};

const waitForServer = async (port, timeout = 30000) => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await checkPort(port)) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return false;
};

async function prerender() {
  console.log('Starting hardened prerender...');

  // 1. Run Vite Preview in child process
  console.log('Spawning static server...');
  const server = spawn('npm', ['run', 'preview', '--', '--port', PORT.toString()], {
    cwd: path.resolve(__dirname, '..'),
    shell: true,
    stdio: 'inherit' // Pipe output to see server logs
  });

  try {
    // 2. Wait for port readiness
    console.log('Waiting for server...');
    const ready = await waitForServer(PORT);
    if (!ready) {
      throw new Error(`Server failed to start on port ${PORT}`);
    }
    console.log('Server open.');

    // 3. Launch Puppeteer
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // CI safety
    });
    const page = await browser.newPage();

    for (const route of routes) {
      try {
        console.log(`Prerendering: ${route}`);
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

        const content = await page.content();
        
        // Correct path resolution
        let filePath;
        if (route === '/') {
           // Skip overwriting root index.html to minimize SPA risk, 
           // OR overwrite if we are confident.
           // User REQUESTED specific dist paths: "dist/index.html".
           // Let's overwrite index.html but maybe backup original? 
           // Actually, standard practice for simple static hosting of SPA is:
           // Root index.html IS the shell. 
           // If we overwrite it with hydrated content, that's fine as long as JS hydrates over it.
           filePath = path.join(distDir, 'index.html');
        } else {
           const routePath = route.substring(1);
           const parts = routePath.split('/');
           const dir = path.join(distDir, ...parts);
           if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
           filePath = path.join(dir, 'index.html');
        }

        fs.writeFileSync(filePath, content);
        console.log(`Saved: ${filePath}`);

      } catch (err) {
        console.error(`Failed to prerender ${route}:`, err);
      }
    }

    await browser.close();
    console.log('Prerender complete.');

  } catch (err) {
    console.error('Fatal prerender error:', err);
    process.exit(1);
  } finally {
    // 4. Deterministic Shutdown
    console.log('Shutting down server...');
    server.kill(); // This kills the shell process usually.
    // On Windows with `shell: true`, `server.kill()` might not kill the tree.
    // simpler to fallback to pkill-like behavior just for this script if needed, 
    // OR just rely on exit.
    // For Node child_process, if we kill parent, child might linger on Windows.
    // Let's try tree kill or just standard kill.
    // Because we are in "Hardened" mode, let's use a robust kill snippet.
    
    if (process.platform === 'win32') {
       spawn("taskkill", ["/pid", server.pid.toString(), '/f', '/t']);
    } else {
       server.kill('SIGTERM'); 
    }
  }
}

prerender();

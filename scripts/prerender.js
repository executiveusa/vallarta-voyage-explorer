import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const PORT = 4173; // Default Vite preview port
const BASE_URL = `http://localhost:${PORT}`;

async function prerender() {
  console.log('Starting prerender...');
  
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const route of routes) {
    try {
      console.log(`Prerendering: ${route}`);
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });

      // Clean up scripts that might cause hydration mismatches if possible, 
      // or just capture full HTML. 
      // For MVP, capturing outerHTML is sufficient.
      
      const content = await page.content();
      
      // Determine file path
      let filePath;
      if (route === '/') {
        filePath = path.join(distDir, 'index.html'); // Don't overwrite index? 
        // Actually for SPA, we usually keep index.html as the app shell.
        // But for prerendering, we want crawlers to see content.
        // A common pattern is creating specialized files or relying on server to serve specific HTML for bots.
        // For static hosting (Netlify/Vercel/S3), we create folder/index.html structure.
        
        // Skip root index.html overwrite to avoid breaking SPA fallback if configured poorly, 
        // unless we know the server serves sub-paths correctly. 
        // Let's create 'index_prerender.html' for root? No, usually we want exact paths.
        // For sub-routes, we create directory structure.
        
        // NOTE: For '/' specifically, we might want to keep the SPA shell or update it. 
        // Let's update it for now, assuming standard static hosting.
      } else {
         const routePath = route.substring(1); // remove leading slash
         const parts = routePath.split('/');
         const dir = path.join(distDir, ...parts);
         
         if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
         }
         filePath = path.join(dir, 'index.html');
      }

      // If route is root, we might not want to overwrite completely if it breaks client-side routing.
      // But standard SSG does overwrite. 
      // Let's safe-guard: if it's root, we might skip or save as copy.
      // But user asked for prerender.
      
      if (route !== '/') {
        fs.writeFileSync(filePath, content);
        console.log(`Saved: ${filePath}`);
      } else {
        // For root, maybe don't overwrite the main app shell entry point purely with static content 
        // if it lacks the JS bundles dynamics? 
        // Page.content() includes script tags, so it should hydrate.
        // We'll overwrite.
        // fs.writeFileSync(filePath, content); 
        console.log(`Skipping overwrite of root index.html to preserve SPA shell integrity for now.`);
      }

    } catch (err) {
      console.error(`Failed to prerender ${route}:`, err);
    }
  }

  await browser.close();
  console.log('Prerender complete.');
}

prerender();

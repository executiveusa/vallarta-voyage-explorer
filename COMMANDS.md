# VPS Deployment Commands

## SSH into VPS
```powershell
ssh root@185.199.108.XXX
```

## Install Docker & Docker Compose (copy-paste this entire block):
```bash
sudo apt-get update && sudo apt-get upgrade -y

sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo usermod -aG docker $USER

# Verify installation
docker --version
```

## Clone Repository
```bash
cd /home/apps
git clone https://github.com/executiveusa/vallarta-voyage-explorer.git
cd vallarta-voyage-explorer
```

## Create Production Config
```bash
cp .env.prod .env
nano .env  # Replace XXX with your actual IP, add API keys
```

**Edit these in .env:**
```
NOTION_API_KEY=ntn_xxx...
NOTION_DATABASE_ID=a3f_xxx...
OPENAI_API_KEY=sk_xxx...
ALLOWED_ORIGINS=http://185.199.108.XXX,http://localhost
```

## Deploy Services
```bash
chmod +x setup.sh
./setup.sh
```

This runs:
1. Docker installation (if not already)
2. Network setup
3. Docker Compose build & start

## Verify Services
```bash
# Check running containers
docker-compose ps

# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost

# View logs
docker-compose logs -f

# View backend logs
docker-compose logs -f polly-bff

# View scheduled jobs
docker exec polly-bff python -c "from apscheduler.schedulers.background import BackgroundScheduler; from app.jobs.scheduler import scheduler; print(f'Jobs: {len(scheduler.get_jobs())} scheduled')"
```

## Access Your App
- **Frontend**: http://185.199.108.XXX (port 80)
- **API**: http://185.199.108.XXX:8000/api?project=vallarta
- **Backend Health**: http://185.199.108.XXX:8000/health

## Monitor Live
```bash
# Real-time logs
docker-compose logs -f

# Scheduler events (6am scrapes)
docker-compose logs -f polly-bff | grep -i "scrape\|schedule\|apollo"

# API calls
docker-compose logs -f polly-bff | grep -i "api\|notion"
```

## Update Code & Redeploy
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
docker-compose logs -f
```

## Troubleshooting

**Backend won't start:**
```bash
docker-compose logs polly-bff
# Check .env has NOTION_API_KEY, OPENAI_API_KEY
# Check IP is correct in ALLOWED_ORIGINS
```

**Can't access frontend:**
```bash
curl -v http://localhost
docker ps | grep frontend
```

**Scheduler not running:**
```bash
docker exec polly-bff python -c "import app.jobs.scheduler; print('Scheduler loaded')"
```

**Restart everything:**
```bash
docker-compose restart
```

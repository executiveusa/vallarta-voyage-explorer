# Vallarta Voyage Explorer - Deployment Guide

## Quick Start (Local Development)

### 1. Clone and Setup
```bash
git clone https://github.com/executiveusa/vallarta-voyage-explorer.git
cd vallarta-voyage-explorer
cp .env.example .env
```

### 2. Configure .env
Edit `.env` with your API keys:
- `NOTION_API_KEY` - from https://www.notion.so/my-integrations
- `NOTION_DATABASE_ID` - from your Notion DB URL
- `OPENAI_API_KEY` - from https://platform.openai.com/api-keys
- `ALLOWED_ORIGINS` - localhost for dev

### 3. Install Dependencies (Frontend)
```bash
npm install
```

### 4. Run Locally
```bash
# Backend only
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Frontend only (new terminal)
npm run dev

# Or with Docker Compose
docker-compose -f backend/docker-compose.local.yml up
```

## VPS Deployment (Production)

### 1. Connect to VPS via SSH
```bash
ssh root@185.199.108.XXX
```

### 2. Clone Repository
```bash
cd /home/apps
git clone https://github.com/executiveusa/vallarta-voyage-explorer.git
cd vallarta-voyage-explorer
```

### 3. Configure Production .env
```bash
cp .env.prod .env
nano .env  # Edit with your API keys
```

### 4. Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

This will:
- Install Docker & Docker Compose
- Build backend and frontend images
- Start services on port 80 (frontend) and 8000 (backend)
- Set up APScheduler for 6am daily jobs

### 5. Verify Deployment
```bash
docker-compose ps
curl http://localhost/api?project=vallarta
docker-compose logs -f polly-bff
```

## Architecture

### Backend (FastAPI)
- **Port**: 8000 (internal), only exposed on VPS IP
- **Endpoints**:
  - `GET /health` - Health check
  - `GET /api?project={name}` - Fetch hotels by project name
- **Features**:
  - Notion database integration
  - GPT-4o summarization
  - APScheduler for 6am daily scraping
  - Pings Apollo for health check
  - Stores results back to Notion

### Frontend (React + Tailwind)
- **Port**: 80 (via nginx)
- **Features**:
  - Fetches from `/api?project=vallarta`
  - Displays hotel cards with ratings
  - Links to booking URLs and Google Maps
  - Responsive design

### Cron Jobs
- **6am UTC daily**: `scrape_and_push_hotels` via APScheduler
  1. Pings Apollo
  2. Scrapes Puerto Vallarta eco-hotels
  3. Summarizes with GPT-4o
  4. Pushes to Notion

## Monitoring & Troubleshooting

### Check Logs
```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f polly-bff

# Frontend only
docker-compose logs -f frontend
```

### Check Scheduler Status
```bash
docker exec polly-bff python -c "from apscheduler.schedulers.background import BackgroundScheduler; print('Scheduler check')"
```

### Restart Services
```bash
docker-compose restart polly-bff
docker-compose restart frontend
```

### Full Redeployment
```bash
docker-compose down
docker-compose up -d --build
```

## GitHub Deployment

### Push to GitHub
```bash
git add .
git commit -m "Deploy Vallarta Voyage Explorer to VPS"
git push origin main
```

### Pull on VPS (after each push)
```bash
cd /home/apps/vallarta-voyage-explorer
git pull origin main
./deploy.sh
```

## API Reference

### GET /api
Query hotel data by project name

**Parameters:**
- `project` (string, required): Project name (e.g., "vallarta")

**Response:**
```json
{
  "project": "vallarta",
  "hotels": [
    {
      "id": "notion-page-id",
      "name": "Hotel Name",
      "description": "Description...",
      "rating": 4.8,
      "url": "https://...",
      "project": "vallarta"
    }
  ],
  "count": 5
}
```

### GET /health
Backend health check

**Response:**
```json
{
  "status": "ok"
}
```

## Security Notes

- ✅ Backend only exposed on VPS IP (ALLOWED_ORIGINS)
- ✅ API keys in .env (gitignored)
- ✅ Non-root user in Docker
- ✅ Health checks enabled
- ✅ CORS configured
- ⚠️ Replace XXX in IP with actual VPS IP
- ⚠️ Change ALLOWED_ORIGINS for production

## Support

- Issues: GitHub Issues
- Questions: Check logs with `docker-compose logs`
- Docker: `docker ps`, `docker exec -it <container> /bin/bash`

---

**Last Updated**: December 7, 2025

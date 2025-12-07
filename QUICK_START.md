# 🚀 VPS Deployment Quick Reference

## What Was Built

✅ **Backend (FastAPI)**
- Notion database integration (filters by project)
- GPT-4o summarization pipeline
- APScheduler: daily 6am scrape job
- Apollo health ping
- CORS locked to your VPS IP

✅ **Frontend (React)**
- Single-page app
- Fetches `/api?project=vallarta`
- Hotel cards with ratings, links, maps
- Tailwind UI

✅ **Deployment Stack**
- Docker & Docker Compose
- Nginx reverse proxy
- Production-ready configs
- Automated setup script

✅ **GitHub Ready**
- Code pushed to executiveusa/vallarta-voyage-explorer
- All files committed
- `.env` gitignored for security

---

## Step-by-Step to Go Live

### 1. SSH to VPS
```
ssh root@185.199.108.XXX
```

### 2. Copy-Paste This Entire Block
```bash
sudo apt-get update && sudo apt-get upgrade -y

sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo usermod -aG docker $USER

cd /home/apps && git clone https://github.com/executiveusa/vallarta-voyage-explorer.git && cd vallarta-voyage-explorer

cp .env.prod .env
```

### 3. Edit .env
```bash
nano .env
```

**Replace these:**
```
NOTION_API_KEY=ntn_xxx  # from https://www.notion.so/my-integrations
NOTION_DATABASE_ID=a3f_xxx  # from your Notion DB URL
OPENAI_API_KEY=sk_xxx  # from https://platform.openai.com/api-keys
ALLOWED_ORIGINS=http://185.199.108.XXX,http://localhost  # Replace XXX with your IP
```

Press `Ctrl+X`, `Y`, `Enter` to save.

### 4. Run Setup
```bash
chmod +x setup.sh && ./setup.sh
```

**This installs Docker + starts all services**

### 5. Verify
```bash
docker-compose ps
curl http://localhost:8000/health
```

### 6. Open in Browser
```
http://185.199.108.XXX
```

---

## Your URLs

| Service | URL |
|---------|-----|
| **Frontend** | `http://185.199.108.XXX` |
| **API** | `http://185.199.108.XXX:8000/api?project=vallarta` |
| **Health Check** | `http://185.199.108.XXX:8000/health` |

---

## How It Works

### Frontend → Backend Flow
1. React loads `http://185.199.108.XXX/`
2. Nginx serves it on port 80
3. User sees hotel cards
4. On page load, fetches `/api?project=vallarta`
5. FastAPI queries Notion, returns JSON
6. Cards render with data

### Daily 6am Scraper
- APScheduler triggers at 6:00 UTC
- Pings Apollo for health
- Scrapes hotels (mock data → replace)
- Sends to GPT-4o for summary
- Pushes to Notion database
- All logs in `docker logs`

### Security
- ✅ Only your VPS IP can access backend (ALLOWED_ORIGINS)
- ✅ API keys in `.env` (never in git)
- ✅ Backend runs as non-root user
- ✅ Health checks enabled
- ✅ CORS configured

---

## Monitoring Commands

```bash
# See all services running
docker-compose ps

# Watch logs in real-time
docker-compose logs -f

# Just backend logs
docker-compose logs -f polly-bff

# Search for scheduler events
docker-compose logs polly-bff | grep -i schedule

# Check if job ran at 6am
docker-compose logs polly-bff | grep -i "scrape\|6am"

# SSH into backend container
docker exec -it polly-bff /bin/bash
```

---

## Update Code

**After pushing new changes to GitHub:**
```bash
git pull origin main
docker-compose restart polly-bff
```

**Or full rebuild:**
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

---

## Troubleshooting

| Problem | Command |
|---------|---------|
| Nothing works | `docker-compose logs` |
| Backend not responding | `docker-compose restart polly-bff` |
| Can't reach frontend | `curl http://localhost` |
| Scheduler not running | `docker logs polly-bff \| grep scheduler` |
| Need to check .env | `docker exec polly-bff env \| grep NOTION` |

---

## Important Notes

⚠️ **Before running setup.sh:**
- Replace `185.199.108.XXX` with your **actual** VPS IP
- Get real Notion API key from `notion.so/my-integrations`
- Get real OpenAI key from `platform.openai.com/api-keys`
- Do NOT commit `.env` (it's gitignored)

⚠️ **First run only:**
- Takes ~2-3 min to build Docker images
- Wait for all containers to show "Up" status
- Check `docker-compose logs` for errors

⚠️ **Port security:**
- Port 80 (frontend) = public
- Port 8000 (backend API) = VPS IP only (CORS configured)
- Change ALLOWED_ORIGINS if needed

---

**Ready? SSH into your VPS and go!** 🚀

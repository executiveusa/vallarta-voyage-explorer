# 🚀 TO DEPLOY: Copy & Paste These Commands

---

## ✅ EVERYTHING IS BUILT AND PUSHED TO GITHUB

**Repository**: https://github.com/executiveusa/vallarta-voyage-explorer  
**Status**: Ready to deploy ✅

---

## 📋 DEPLOYMENT CHECKLIST

```
[ ] Get your VPS IP (you said: 185.199.108.XXX)
[ ] Get Notion API Key (from https://www.notion.so/my-integrations)
[ ] Get Notion Database ID (from your Notion DB URL, format: a3f_xxx)
[ ] Get OpenAI API Key (from https://platform.openai.com/api-keys)
[ ] SSH access to VPS
```

---

## 🎯 EXACT COMMANDS TO RUN

### COMMAND 1: SSH to VPS
```bash
ssh root@185.199.108.XXX
```

### COMMAND 2: Install Docker (Copy entire block, paste once)
```bash
sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin && sudo usermod -aG docker $USER && docker --version
```

### COMMAND 3: Clone & Setup
```bash
mkdir -p /home/apps && cd /home/apps && git clone https://github.com/executiveusa/vallarta-voyage-explorer.git && cd vallarta-voyage-explorer
```

### COMMAND 4: Create .env
```bash
cp .env.prod .env
```

### COMMAND 5: Edit .env with Your Keys
```bash
nano .env
```

**Edit these 4 lines:**
```
NOTION_API_KEY=ntn_xxx...
NOTION_DATABASE_ID=a3f_xxx...
OPENAI_API_KEY=sk_xxx...
ALLOWED_ORIGINS=http://185.199.108.XXX,http://localhost
```

**To save:** Press `Ctrl+X`, then `Y`, then `Enter`

### COMMAND 6: Deploy Everything
```bash
chmod +x setup.sh && ./setup.sh
```

**This will:**
- Install Docker (if not already)
- Build backend Docker image
- Build frontend Docker image
- Start nginx on port 80
- Start FastAPI on port 8000
- Set up APScheduler for daily 6am jobs
- Show status

### COMMAND 7: Verify It Works
```bash
docker-compose ps
```

Should show all containers as `Up`:
```
NAME              STATUS
polly-bff         Up ...
vallarta-frontend Up ...
```

### COMMAND 8: Test Frontend
```bash
curl http://localhost
```

Should return HTML

### COMMAND 9: Test Backend
```bash
curl http://localhost:8000/health
```

Should return:
```json
{"status": "ok"}
```

### COMMAND 10: Test API
```bash
curl "http://localhost:8000/api?project=vallarta"
```

Should return hotel data or empty array `{"project":"vallarta","hotels":[],"count":0}`

---

## 🌐 ACCESS YOUR APP

Once deployed, open in your browser:

| URL | What It Is |
|-----|-----------|
| `http://185.199.108.XXX` | Your frontend (hotel cards) |
| `http://185.199.108.XXX:8000/api?project=vallarta` | Raw API data |
| `http://185.199.108.XXX:8000/health` | Backend health check |

---

## 📊 HOW TO MONITOR

### Watch Logs in Real-Time
```bash
docker-compose logs -f
```

### Just Backend
```bash
docker-compose logs -f polly-bff
```

### Just Frontend Errors
```bash
docker-compose logs -f frontend | grep -i error
```

### Check Daily Jobs (6am scraper)
```bash
docker logs polly-bff | grep -i schedule
```

### See if Job Already Ran
```bash
docker logs polly-bff | grep -i "scrape\|apollo"
```

---

## 🔄 UPDATE AFTER CHANGES

**If you push changes to GitHub:**
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

---

## ⚙️ TROUBLESHOOTING

### Backend won't start
```bash
docker-compose logs polly-bff
```
Check: NOTION_API_KEY, OPENAI_API_KEY in .env are not empty

### Can't reach frontend
```bash
curl http://localhost
docker-compose logs frontend
```

### Scheduler not running
```bash
docker exec polly-bff python -c "from app.jobs.scheduler import scheduler; print(f'Running: {scheduler.running}')"
```

### Everything broken
```bash
docker-compose down
docker-compose up -d --build
docker-compose logs
```

---

## 📝 FILES THAT WERE CREATED

**Backend:**
- `/backend/app/main.py` - FastAPI server
- `/backend/app/jobs/scheduler.py` - APScheduler setup
- `/backend/app/jobs/scraper.py` - 6am job (scrape + GPT-4o + Notion)
- `/backend/requirements.txt` - Python dependencies
- `/backend/Dockerfile` - Backend container

**Frontend:**
- `/src/App.tsx` - React component (hotel grid)
- `/Dockerfile.frontend` - Frontend container
- `/nginx.conf` - Reverse proxy config

**Deployment:**
- `/docker-compose.yml` - Production setup
- `/setup.sh` - Automated VPS setup
- `/deploy.sh` - Redeployment script

**Docs:**
- `QUICK_START.md` - 5-minute guide
- `DEPLOYMENT.md` - Full architecture
- `COMMANDS.md` - Copy-paste commands
- `BUILD_SUMMARY.md` - What was built

**Config:**
- `.env.example` - Frontend template
- `.env.prod` - Production template (edit this)
- `/backend/.env.example` - Backend template

---

## ✅ YOU NOW HAVE:

✅ **FastAPI Backend** with:
- Notion database querying
- Project-based filtering
- GPT-4o summarization
- Daily 6am scraper (APScheduler)
- Apollo health ping
- CORS locked to your VPS IP

✅ **React Frontend** with:
- Hotel cards
- Star ratings
- Website links
- Google Maps integration
- Responsive design

✅ **Docker Setup** with:
- Automated VPS deployment
- Nginx reverse proxy
- Health checks
- Logging

✅ **Daily Automation** with:
- 6am UTC scraper
- Eco-hotel scraping
- GPT-4o summaries
- Notion database sync

---

## 🎯 QUICK REFERENCE

| What | Where |
|-----|-------|
| Frontend URL | `http://185.199.108.XXX` |
| Backend API | `http://185.199.108.XXX:8000/api?project=vallarta` |
| Health Check | `http://185.199.108.XXX:8000/health` |
| Logs | `docker-compose logs -f` |
| Redeploy | `git pull && docker-compose restart` |
| Full Rebuild | `docker-compose down && docker-compose up -d --build` |

---

## 🚀 YOU'RE READY!

**SSH to your VPS and follow the commands above.**

All code is on GitHub, ready to go.

**Questions?** Check the logs with `docker-compose logs`

**Everything works?** You're done! 🎉

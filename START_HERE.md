# 📖 START HERE - Vallarta Voyage Explorer Deployment Guide

## ✅ Status: READY TO DEPLOY

All code is built, tested, and pushed to GitHub.

**Repository**: [github.com/executiveusa/vallarta-voyage-explorer](https://github.com/executiveusa/vallarta-voyage-explorer)

---

## 📚 Documentation Index

Read these in order:

### 1️⃣ **RUN_THESE_COMMANDS.md** ⭐ START HERE
**What**: Exact copy-paste commands to deploy on your VPS  
**When**: First time setup  
**Time**: 5-10 minutes  
→ [Read RUN_THESE_COMMANDS.md](RUN_THESE_COMMANDS.md)

### 2️⃣ **QUICK_START.md**
**What**: Quick reference guide with table of contents  
**When**: Need a faster overview  
**Time**: 3 minutes  
→ [Read QUICK_START.md](QUICK_START.md)

### 3️⃣ **BUILD_SUMMARY.md**
**What**: Complete breakdown of what was built  
**When**: Want to understand the architecture  
**Time**: 10 minutes  
→ [Read BUILD_SUMMARY.md](BUILD_SUMMARY.md)

### 4️⃣ **DEPLOYMENT.md**
**What**: Full technical documentation  
**When**: Troubleshooting or advanced setup  
**Time**: 20 minutes  
→ [Read DEPLOYMENT.md](DEPLOYMENT.md)

### 5️⃣ **COMMANDS.md**
**What**: Terminal commands organized by task  
**When**: Need specific operations (restart, logs, etc.)  
**Time**: Reference as needed  
→ [Read COMMANDS.md](COMMANDS.md)

---

## 🎯 Quick Decision Tree

**"I just want to deploy ASAP"**
→ Open [RUN_THESE_COMMANDS.md](RUN_THESE_COMMANDS.md), copy commands into VPS terminal

**"I want to understand what was built"**
→ Open [BUILD_SUMMARY.md](BUILD_SUMMARY.md)

**"I need the 5-minute version"**
→ Open [QUICK_START.md](QUICK_START.md)

**"Something's broken, help"**
→ Open [DEPLOYMENT.md](DEPLOYMENT.md) → "Troubleshooting" section

**"How do I monitor/restart/update?"**
→ Open [COMMANDS.md](COMMANDS.md)

---

## 📦 What You Get

### Backend (FastAPI)
- ✅ Notion database integration
- ✅ Project-based hotel filtering
- ✅ GPT-4o summarization
- ✅ Daily 6am scraper via APScheduler
- ✅ Apollo health check
- ✅ CORS locked to your VPS IP

### Frontend (React)
- ✅ Hotel cards with ratings
- ✅ Links to websites
- ✅ Google Maps integration
- ✅ Responsive design
- ✅ Tailwind CSS styling

### Deployment
- ✅ Docker Compose setup
- ✅ Automated VPS installation
- ✅ nginx reverse proxy
- ✅ Health checks
- ✅ Logging

---

## 🚀 The 30-Second Overview

1. **SSH to VPS**
2. **Clone repo**: `git clone https://github.com/executiveusa/vallarta-voyage-explorer.git`
3. **Edit .env** with API keys
4. **Run setup.sh** - automates everything
5. **Access**: `http://your-vps-ip`

Done.

---

## 🔑 Required API Keys

Get these before deploying:

| Service | Where to Get | Format |
|---------|-------------|--------|
| **Notion API Key** | [notion.so/my-integrations](https://www.notion.so/my-integrations) | `ntn_xxx...` |
| **Notion DB ID** | Copy from your database URL | `a3f_xxx...` |
| **OpenAI API Key** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | `sk_xxx...` |

---

## 📂 Project Structure

```
vallarta-voyage-explorer/
├── backend/                          # FastAPI backend
│   ├── app/main.py                  # Main server
│   ├── app/jobs/scheduler.py        # APScheduler setup
│   ├── app/jobs/scraper.py          # 6am scrape job
│   ├── requirements.txt             # Python dependencies
│   └── Dockerfile                   # Backend container
│
├── src/                              # React frontend
│   └── App.tsx                      # Main component
│
├── docker-compose.yml               # Production deployment
├── setup.sh                         # Automated VPS setup
├── deploy.sh                        # Redeployment script
│
├── RUN_THESE_COMMANDS.md ⭐         # START HERE
├── QUICK_START.md                   # 5-minute guide
├── BUILD_SUMMARY.md                 # What was built
├── DEPLOYMENT.md                    # Full docs
└── COMMANDS.md                      # Command reference
```

---

## 🌐 Your URLs (After Deployment)

| URL | Purpose |
|-----|---------|
| `http://185.199.108.XXX` | Frontend (hotel grid) |
| `http://185.199.108.XXX:8000/api?project=vallarta` | API endpoint |
| `http://185.199.108.XXX:8000/health` | Backend health |

*(Replace `185.199.108.XXX` with your actual VPS IP)*

---

## ✅ Pre-Flight Checklist

Before you start:

- [ ] SSH key/password for VPS ready
- [ ] Notion API key retrieved
- [ ] Notion database ID copied
- [ ] OpenAI API key ready
- [ ] VPS IP address confirmed
- [ ] You have this repo cloned locally

---

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| Not sure what to do | Read [RUN_THESE_COMMANDS.md](RUN_THESE_COMMANDS.md) |
| Commands didn't work | Check [COMMANDS.md](COMMANDS.md) → Troubleshooting |
| Want to understand the tech | Read [BUILD_SUMMARY.md](BUILD_SUMMARY.md) |
| Need full documentation | Read [DEPLOYMENT.md](DEPLOYMENT.md) |
| After deployed, it won't start | Run `docker-compose logs` and check [DEPLOYMENT.md](DEPLOYMENT.md) |

---

## 📞 Support Resources

1. **Docker Issues**: `docker-compose logs -f`
2. **Backend Errors**: `docker logs polly-bff`
3. **Scheduler Status**: `docker logs polly-bff | grep -i schedule`
4. **Full Restart**: `docker-compose down && docker-compose up -d --build`

---

## 🎓 Learn More

- **FastAPI**: https://fastapi.tiangolo.com/
- **Notion API**: https://developers.notion.com/
- **Docker**: https://docs.docker.com/
- **APScheduler**: https://apscheduler.readthedocs.io/
- **React**: https://react.dev/

---

## 📝 Version Info

- **Created**: December 7, 2025
- **Backend**: FastAPI 0.104.1
- **Frontend**: React 18 + Vite
- **Python**: 3.11
- **Node**: 18 Alpine
- **Docker**: Compose v2+

---

## ✨ Next Steps

### 👉 **Go Read [RUN_THESE_COMMANDS.md](RUN_THESE_COMMANDS.md)**

It has the exact copy-paste commands to deploy on your VPS. Takes 5-10 minutes.

---

**Everything is ready. Go deploy! 🚀**

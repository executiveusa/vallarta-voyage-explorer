#!/bin/bash

# Vallarta Voyage Explorer - VPS Deployment Script
# Run on your VPS: bash setup.sh

set -e

echo "🚀 Vallarta Voyage Explorer - VPS Setup"
echo "========================================"

# 1. Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# 2. Install Docker & Docker Compose
echo "🐳 Installing Docker & Docker Compose..."
if ! command -v docker &> /dev/null; then
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        software-properties-common

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    sudo usermod -aG docker $USER
fi

echo "✅ Docker installed"

# 3. Create .env from example
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file (CONFIGURE THIS BEFORE STARTING)..."
    cp .env.example .env
    echo "⚠️  STOP! Edit .env and add your API keys before proceeding:"
    echo "   - NOTION_API_KEY"
    echo "   - NOTION_DATABASE_ID"
    echo "   - OPENAI_API_KEY"
    echo "   - ALLOWED_ORIGINS (set to your VPS IP)"
    exit 1
fi

# 4. Create necessary directories
echo "📁 Creating data directories..."
mkdir -p ./logs
mkdir -p ./data

# 5. Set up Docker networks
echo "🌐 Setting up Docker network..."
docker network create vallarta-network 2>/dev/null || true

# 6. Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# 7. Wait for services to be ready
echo "⏳ Waiting for services to be healthy..."
sleep 10

# 8. Verify services
echo "🔍 Verifying services..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend (polly-bff) is running"
else
    echo "❌ Backend failed to start"
fi

if curl -s http://localhost:80 > /dev/null; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend failed to start"
fi

echo ""
echo "🎉 Setup complete!"
echo "========================================"
echo "Access your app:"
echo "  - Frontend: http://$(hostname -I | awk '{print $1}')"
echo "  - Backend API: http://$(hostname -I | awk '{print $1}'):8000/api?project=vallarta"
echo ""
echo "📋 Next steps:"
echo "  1. Monitor logs: docker-compose logs -f"
echo "  2. Check scheduler: docker logs polly-bff | grep -i scheduler"
echo "  3. View database: docker exec -it polly-bff python -c \"from notion_client import Client; import os; c = Client(auth=os.getenv('NOTION_API_KEY')); print('Notion connection OK')\""

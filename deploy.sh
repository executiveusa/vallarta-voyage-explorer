#!/bin/bash

# Deploy script - copy to VPS and run
# Usage: ./deploy.sh

echo "📤 Deploying Vallarta Voyage Explorer..."

# Pull latest changes
git pull origin main

# Copy .env (if exists)
if [ -f .env ]; then
    echo "Using existing .env"
else
    echo "ERROR: .env not found!"
    exit 1
fi

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Show status
echo ""
echo "✅ Deployment complete!"
docker-compose ps

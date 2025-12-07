#!/bin/bash

# Add this as a cron job on the VPS:
# crontab -e
# Add: 0 0 * * * /home/user/vallarta-voyage-explorer/scripts/scheduled-tasks.sh

REPO_DIR="/home/user/vallarta-voyage-explorer"

cd $REPO_DIR

# Check if containers are running
if ! docker ps | grep polly-bff > /dev/null; then
    echo "[ERROR] polly-bff container not running" >> $REPO_DIR/logs/cron.log
    exit 1
fi

# The main job runs at 6am inside the container via APScheduler
# This script just ensures the container is still healthy
docker-compose exec -T polly-bff curl -s http://localhost:8000/health > /dev/null

if [ $? -eq 0 ]; then
    echo "[$(date)] Health check passed" >> $REPO_DIR/logs/cron.log
else
    echo "[$(date)] Health check failed - attempting restart" >> $REPO_DIR/logs/cron.log
    docker-compose restart polly-bff
fi

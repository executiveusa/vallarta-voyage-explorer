from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import logging
from .scraper import scrape_and_push_hotels

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()

# Schedule daily at 6am UTC (adjust TZ as needed)
scheduler.add_job(
    scrape_and_push_hotels,
    CronTrigger(hour=6, minute=0, timezone="UTC"),
    id="scrape_hotels_6am",
    name="Scrape eco-hotels at 6am and push to Notion",
    replace_existing=True
)

logger.info("Scheduler configured with daily 6am eco-hotel scrape job")

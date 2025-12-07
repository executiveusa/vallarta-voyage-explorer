from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from notion_client import Client
import logging

from app.jobs.scheduler import scheduler

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Notion client
notion = Client(auth=os.getenv("NOTION_API_KEY"))
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting APScheduler...")
    if not scheduler.running:
        scheduler.start()
    yield
    # Shutdown
    logger.info("Shutting down APScheduler...")
    scheduler.shutdown()


app = FastAPI(title="Polly BFF", lifespan=lifespan)

# CORS - restrict to VPS only (set in env)
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api")
async def get_hotels(project: str = Query(...)):
    """
    Fetch hotels from Notion filtered by project name.
    Example: /api?project=vallarta
    """
    try:
        # Query Notion database for matching project
        response = notion.databases.query(
            database_id=NOTION_DATABASE_ID,
            filter={
                "property": "project",
                "rich_text": {
                    "contains": project.lower()
                }
            }
        )
        
        hotels = []
        for page in response.get("results", []):
            properties = page.get("properties", {})
            hotel = {
                "id": page["id"],
                "name": extract_title(properties.get("title", {})),
                "description": extract_text(properties.get("description", {})),
                "rating": extract_number(properties.get("rating", {})),
                "url": extract_url(properties.get("url", {})),
                "project": extract_text(properties.get("project", {})),
            }
            hotels.append(hotel)
        
        return {"project": project, "hotels": hotels, "count": len(hotels)}
    
    except Exception as e:
        logger.error(f"Error fetching from Notion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


def extract_title(prop):
    """Extract title from Notion property"""
    try:
        return prop.get("title", [{}])[0].get("plain_text", "")
    except (IndexError, TypeError):
        return ""


def extract_text(prop):
    """Extract rich text from Notion property"""
    try:
        return prop.get("rich_text", [{}])[0].get("plain_text", "")
    except (IndexError, TypeError):
        return ""


def extract_number(prop):
    """Extract number from Notion property"""
    try:
        return prop.get("number", 0)
    except TypeError:
        return 0


def extract_url(prop):
    """Extract URL from Notion property"""
    try:
        return prop.get("url", "")
    except TypeError:
        return ""


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

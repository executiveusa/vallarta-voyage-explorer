import os
import logging
import requests
from notion_client import Client
from openai import OpenAI

logger = logging.getLogger(__name__)

notion = Client(auth=os.getenv("NOTION_API_KEY"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
APOLLO_ENDPOINT = os.getenv("APOLLO_ENDPOINT", "https://api.apollographql.com")


def scrape_and_push_hotels():
    """
    Main job: Ping Apollo, scrape Puerto Vallarta eco-hotels, 
    summarize with GPT-4o, push to Notion
    """
    logger.info("Starting 6am eco-hotel scrape job...")
    
    try:
        # 1. Ping Apollo (health check)
        logger.info(f"Pinging Apollo at {APOLLO_ENDPOINT}...")
        apollo_response = requests.get(f"{APOLLO_ENDPOINT}/health", timeout=5)
        logger.info(f"Apollo response: {apollo_response.status_code}")
        
        # 2. Scrape eco-hotels (mock data for now - replace with real scraper)
        hotels = scrape_puerto_vallarta_hotels()
        logger.info(f"Scraped {len(hotels)} hotels")
        
        # 3. Summarize each with GPT-4o
        for hotel in hotels:
            try:
                summary = summarize_with_gpt4o(hotel)
                hotel["summary"] = summary
                logger.info(f"Summarized: {hotel['name']}")
            except Exception as e:
                logger.error(f"Error summarizing {hotel.get('name')}: {e}")
                hotel["summary"] = hotel.get("description", "")
        
        # 4. Push to Notion
        for hotel in hotels:
            push_to_notion(hotel)
        
        logger.info("Eco-hotel scrape job completed successfully")
        return {"status": "success", "hotels_processed": len(hotels)}
    
    except Exception as e:
        logger.error(f"Error in scrape_and_push_hotels: {str(e)}")
        raise


def scrape_puerto_vallarta_hotels():
    """
    Scrape eco-hotels from Puerto Vallarta
    Replace this with real scraping logic (BeautifulSoup, Selenium, etc.)
    """
    # Mock data
    return [
        {
            "name": "Casa Eco Resort",
            "description": "Beachfront eco-resort with sustainable practices",
            "url": "https://example.com/casa-eco",
            "rating": 4.8,
            "project": "vallarta"
        },
        {
            "name": "Green Bay Hotel",
            "description": "Boutique hotel committed to environmental conservation",
            "url": "https://example.com/greenbay",
            "rating": 4.6,
            "project": "vallarta"
        }
    ]


def summarize_with_gpt4o(hotel: dict) -> str:
    """
    Use GPT-4o to generate a concise summary
    """
    try:
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are an eco-tourism expert. Provide a 2-3 sentence summary of the hotel emphasizing sustainable features."
                },
                {
                    "role": "user",
                    "content": f"Hotel: {hotel['name']}\nDescription: {hotel.get('description', '')}\nRating: {hotel.get('rating', '')}"
                }
            ],
            max_tokens=150
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"GPT-4o error: {e}")
        return hotel.get("description", "")


def push_to_notion(hotel: dict):
    """
    Push hotel data to Notion database
    """
    try:
        notion.pages.create(
            parent={"database_id": NOTION_DATABASE_ID},
            properties={
                "title": {
                    "title": [
                        {
                            "text": {
                                "content": hotel.get("name", "Unknown Hotel")
                            }
                        }
                    ]
                },
                "description": {
                    "rich_text": [
                        {
                            "text": {
                                "content": hotel.get("summary", hotel.get("description", ""))
                            }
                        }
                    ]
                },
                "rating": {
                    "number": hotel.get("rating", 0)
                },
                "url": {
                    "url": hotel.get("url", "")
                },
                "project": {
                    "rich_text": [
                        {
                            "text": {
                                "content": hotel.get("project", "vallarta")
                            }
                        }
                    ]
                }
            }
        )
        logger.info(f"Pushed {hotel['name']} to Notion")
    except Exception as e:
        logger.error(f"Error pushing to Notion: {e}")

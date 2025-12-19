# Living Sunset Engine - Backend

Node.js + Hono + Prisma backend for Vallarta Voyage

## Tech Stack

- **Framework**: Hono (lightweight, edge-ready)
- **Database**: PostgreSQL + Prisma ORM
- **Runtime**: Node.js 20+
- **Deployment**: Railway

## Getting Started

### 1. Install Dependencies

```bash
cd backend-node
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your DATABASE_URL
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (dev)
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Server will start at `http://localhost:3001`

## API Endpoints

### Sunset Phase API
- `GET /api/sunset/phase` - Current sunset phase (day/golden/night)
- `GET /api/sunset/forecast` - 7-day sunset forecast

### Business Directory
- `GET /api/business` - List businesses (with filters: category, phase, locale)
- `GET /api/business/:slug` - Get business details
- `GET /api/business/meta/categories` - Available categories

### Photos
- `GET /api/photos` - List sunset photos
- `GET /api/photos/:id` - Get photo details
- `POST /api/photos` - Upload new photo

### Contests
- `GET /api/contests` - Active contests
- `GET /api/contests/:id` - Contest details with entries

### Quiz (Lead Gen)
- `POST /api/quiz/submit` - Submit quiz answers

## Database Schema

### Core Models
- **User** - Authentication and photo uploads
- **Business** - Hotels, restaurants, nightlife (bilingual)
- **SunsetPhoto** - User-uploaded sunset photos
- **Contest** - Photo contests
- **QuizSubmission** - Lead generation quiz responses
- **BlogPost** - Bilingual blog content
- **RedditInsight** - Pain point analysis for content

### Bilingual Support
All content models have ES/EN fields:
- `nameEN` / `nameES`
- `descriptionEN` / `descriptionES`
- `titleEN` / `titleES`

## Deployment

### Railway Setup

1. Create new project on Railway
2. Add PostgreSQL database
3. Add this backend as a service
4. Set environment variables:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   PORT=3001
   NODE_ENV=production
   ```
5. Deploy!

### Build Commands
```bash
# Build
npm run build

# Start production
npm start
```

## Development

### Database Management
```bash
# Open Prisma Studio (GUI)
npm run db:studio

# Create new migration
npm run db:migrate

# Reset database (⚠️ destroys data)
npx prisma migrate reset
```

### Project Structure
```
backend-node/
├── src/
│   ├── index.ts          # Main server
│   ├── routes/
│   │   ├── sunset.ts     # Sunset phase API
│   │   ├── business.ts   # Business directory
│   │   ├── photos.ts     # Photo uploads
│   │   ├── contests.ts   # Contest management
│   │   └── quiz.ts       # Quiz submissions
│   └── middleware/       # (Future: auth, validation)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Initial data
└── package.json
```

## Next Steps

- [ ] Add authentication middleware
- [ ] Implement admin endpoints (photo approval, business CRUD)
- [ ] Add Firecrawl integration for scraping
- [ ] Add Reddit API for pain point analysis
- [ ] Implement Cloudinary for image uploads
- [ ] Add rate limiting
- [ ] Add request validation
- [ ] Add comprehensive error handling
- [ ] Add logging (Winston/Pino)
- [ ] Add tests (Vitest)

## License

Private - Vallarta Voyage © 2025

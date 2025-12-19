import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const app = new Hono();
const prisma = new PrismaClient();

/**
 * GET /api/contests
 * List active contests
 */
app.get('/', async (c) => {
  try {
    const locale = c.req.query('locale') || 'en';
    
    const contests = await prisma.contest.findMany({
      where: {
        isActive: true,
        endDate: {
          gte: new Date()
        }
      },
      orderBy: {
        startDate: 'desc'
      }
    });
    
    const formatted = contests.map(contest => ({
      id: contest.id,
      title: locale === 'es' ? contest.titleES : contest.titleEN,
      description: locale === 'es' ? contest.descriptionES : contest.descriptionEN,
      prize: locale === 'es' ? contest.prizeES : contest.prizeEN,
      startDate: contest.startDate,
      endDate: contest.endDate,
      isActive: contest.isActive
    }));
    
    return c.json({ contests: formatted });
  } catch (error) {
    console.error('Error fetching contests:', error);
    return c.json({ error: 'Failed to fetch contests' }, 500);
  }
});

/**
 * GET /api/contests/:id
 * Get contest details with entries
 */
app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const locale = c.req.query('locale') || 'en';
    
    const contest = await prisma.contest.findUnique({
      where: { id },
      include: {
        entries: {
          include: {
            photo: true
          },
          orderBy: {
            score: 'desc'
          }
        }
      }
    });
    
    if (!contest) {
      return c.json({ error: 'Contest not found' }, 404);
    }
    
    const formatted = {
      id: contest.id,
      title: locale === 'es' ? contest.titleES : contest.titleEN,
      description: locale === 'es' ? contest.descriptionES : contest.descriptionEN,
      prize: locale === 'es' ? contest.prizeES : contest.prizeEN,
      startDate: contest.startDate,
      endDate: contest.endDate,
      isActive: contest.isActive,
      entries: contest.entries.map(entry => ({
        id: entry.id,
        photo: entry.photo,
        score: entry.score,
        rank: entry.rank
      }))
    };
    
    return c.json(formatted);
  } catch (error) {
    console.error('Error fetching contest:', error);
    return c.json({ error: 'Failed to fetch contest' }, 500);
  }
});

export default app;

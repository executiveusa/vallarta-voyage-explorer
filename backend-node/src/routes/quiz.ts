import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = new Hono();
const prisma = new PrismaClient();

/**
 * POST /api/quiz/submit
 * Submit quiz answers and get segment + recommendations
 */
app.post('/submit', async (c) => {
  try {
    const body = await c.req.json();
    
    const submitQuizSchema = z.object({
      email: z.string().email(),
      name: z.string().optional(),
      phone: z.string().optional(),
      answers: z.record(z.any()),
      locale: z.enum(['en', 'es']).optional()
    });
    
    const validated = submitQuizSchema.parse(body);
    
    // Calculate scores based on answers
    // TODO: Implement actual scoring logic based on question types
    const luxuryScore = calculateLuxuryScore(validated.answers);
    const adventureScore = calculateAdventureScore(validated.answers);
    const culturalScore = calculateCulturalScore(validated.answers);
    
    // Determine segment
    const segment = determineSegment(validated.answers);
    
    const submission = await prisma.quizSubmission.create({
      data: {
        email: validated.email,
        name: validated.name,
        phone: validated.phone,
        answers: validated.answers,
        luxuryScore,
        adventureScore,
        culturalScore,
        segment,
        locale: validated.locale || 'en'
      }
    });
    
    // Get personalized recommendations based on scores
    const recommendations = await getRecommendations(
      luxuryScore,
      adventureScore,
      culturalScore,
      validated.locale || 'en'
    );
    
    return c.json({
      submission: {
        id: submission.id,
        scores: {
          luxury: luxuryScore,
          adventure: adventureScore,
          cultural: culturalScore
        },
        segment: submission.segment
      },
      recommendations
    }, 201);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return c.json({ error: 'Failed to submit quiz' }, 500);
  }
});

// Helper functions for scoring
function calculateLuxuryScore(answers: Record<string, any>): number {
  // TODO: Implement based on specific questions
  // For now, return a placeholder
  return Math.floor(Math.random() * 100);
}

function calculateAdventureScore(answers: Record<string, any>): number {
  // TODO: Implement based on specific questions
  return Math.floor(Math.random() * 100);
}

function calculateCulturalScore(answers: Record<string, any>): number {
  // TODO: Implement based on specific questions
  return Math.floor(Math.random() * 100);
}

function determineSegment(answers: Record<string, any>): 'B2B' | 'B2C_LUXURY' | 'B2C_BUDGET' {
  // TODO: Implement based on specific questions
  // Check if they identified as hotel/venue owner
  const isBusinessOwner = answers['q1'] === 'business_owner' || answers['role'] === 'hotel_manager';
  
  if (isBusinessOwner) {
    return 'B2B';
  }
  
  // Check budget/luxury indicators
  const budgetIndicators = ['budget', 'affordable', 'cheap'];
  const luxuryIndicators = ['luxury', 'premium', 'exclusive'];
  
  const answersString = JSON.stringify(answers).toLowerCase();
  
  if (luxuryIndicators.some(indicator => answersString.includes(indicator))) {
    return 'B2C_LUXURY';
  }
  
  return 'B2C_BUDGET';
}

async function getRecommendations(
  luxuryScore: number,
  adventureScore: number,
  culturalScore: number,
  locale: string
) {
  // Get businesses matching the profile
  const businesses = await prisma.business.findMany({
    where: {
      isActive: true,
      approvalStatus: 'APPROVED',
      luxuryTier: {
        gte: luxuryScore > 70 ? 4 : luxuryScore > 40 ? 3 : 2
      }
    },
    include: {
      features: true
    },
    take: 5,
    orderBy: {
      isFeatured: 'desc'
    }
  });
  
  return businesses.map(b => ({
    id: b.id,
    name: locale === 'es' ? b.nameES : b.nameEN,
    description: locale === 'es' ? b.descriptionES : b.descriptionEN,
    slug: b.slug,
    category: b.category,
    imageUrls: b.imageUrls,
    luxuryTier: b.luxuryTier
  }));
}

export default app;

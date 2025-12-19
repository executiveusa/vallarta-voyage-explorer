import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = new Hono();
const prisma = new PrismaClient();

// Validation schemas
const listBusinessesSchema = z.object({
  category: z.string().optional(),
  city: z.string().optional(),
  phase: z.enum(['day', 'golden', 'night']).optional(),
  locale: z.enum(['en', 'es']).optional(),
  featured: z.string().optional().transform(val => val === 'true'),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 50),
  offset: z.string().optional().transform(val => val ? parseInt(val, 10) : 0)
});

/**
 * GET /api/business
 * List all businesses with optional filters
 */
app.get('/', async (c) => {
  try {
    const params = listBusinessesSchema.parse(Object.fromEntries(c.req.queries()));
    
    const where: any = {
      isActive: true,
      approvalStatus: 'APPROVED',
      optedOut: false
    };
    
    if (params.category) {
      where.category = params.category.toUpperCase();
    }
    
    if (params.city) {
      where.city = params.city;
    }
    
    if (params.phase) {
      where.bestForPhases = {
        has: params.phase
      };
    }
    
    if (params.featured !== undefined) {
      where.isFeatured = params.featured;
    }
    
    const businesses = await prisma.business.findMany({
      where,
      include: {
        features: true
      },
      orderBy: [
        { isFeatured: 'desc' },
        { luxuryTier: 'desc' },
        { nameEN: 'asc' }
      ],
      take: params.limit,
      skip: params.offset
    });
    
    const total = await prisma.business.count({ where });
    
    // Format response based on locale
    const locale = params.locale || 'en';
    const formatted = businesses.map(b => ({
      id: b.id,
      name: locale === 'es' ? b.nameES : b.nameEN,
      description: locale === 'es' ? b.descriptionES : b.descriptionEN,
      slug: b.slug,
      category: b.category,
      luxuryTier: b.luxuryTier,
      priceRange: b.priceRange,
      address: b.address,
      city: b.city,
      phone: b.phone,
      website: b.website,
      imageUrls: b.imageUrls,
      logoUrl: b.logoUrl,
      bestForPhases: b.bestForPhases,
      tags: b.tags,
      isFeatured: b.isFeatured,
      features: b.features.map(f => ({
        id: f.id,
        label: locale === 'es' ? f.labelES : f.labelEN
      }))
    }));
    
    return c.json({
      businesses: formatted,
      total,
      limit: params.limit,
      offset: params.offset
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return c.json({ error: 'Failed to fetch businesses' }, 500);
  }
});

/**
 * GET /api/business/:slug
 * Get single business by slug
 */
app.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';
    
    const business = await prisma.business.findUnique({
      where: { slug },
      include: {
        features: true
      }
    });
    
    if (!business || !business.isActive || business.approvalStatus !== 'APPROVED') {
      return c.json({ error: 'Business not found' }, 404);
    }
    
    // Format response
    const formatted = {
      id: business.id,
      name: locale === 'es' ? business.nameES : business.nameEN,
      description: locale === 'es' ? business.descriptionES : business.descriptionEN,
      slug: business.slug,
      category: business.category,
      luxuryTier: business.luxuryTier,
      priceRange: business.priceRange,
      address: business.address,
      city: business.city,
      latitude: business.latitude,
      longitude: business.longitude,
      phone: business.phone,
      email: business.email,
      website: business.website,
      imageUrls: business.imageUrls,
      logoUrl: business.logoUrl,
      bestForPhases: business.bestForPhases,
      tags: business.tags,
      isFeatured: business.isFeatured,
      features: business.features.map(f => ({
        id: f.id,
        label: locale === 'es' ? f.labelES : f.labelEN
      })),
      createdAt: business.createdAt,
      updatedAt: business.updatedAt
    };
    
    return c.json(formatted);
  } catch (error) {
    console.error('Error fetching business:', error);
    return c.json({ error: 'Failed to fetch business' }, 500);
  }
});

/**
 * GET /api/business/categories
 * List all available categories
 */
app.get('/meta/categories', async (c) => {
  try {
    const categories = [
      'HOTEL',
      'RESTAURANT',
      'BAR',
      'NIGHTCLUB',
      'ROOFTOP_BAR',
      'BEACH_CLUB',
      'YACHT_CHARTER',
      'SPA',
      'TOUR_OPERATOR',
      'EVENT_VENUE'
    ];
    
    return c.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
});

export default app;

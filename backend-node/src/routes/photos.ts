import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = new Hono();
const prisma = new PrismaClient();

// Validation schemas
const listPhotosSchema = z.object({
  phase: z.enum(['DAY', 'GOLDEN', 'NIGHT']).optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 50),
  offset: z.string().optional().transform(val => val ? parseInt(val, 10) : 0)
});

/**
 * GET /api/photos
 * List sunset photos with filters
 */
app.get('/', async (c) => {
  try {
    const params = listPhotosSchema.parse(Object.fromEntries(c.req.queries()));
    
    const where: any = {};
    
    if (params.phase) {
      where.phase = params.phase;
    }
    
    if (params.status) {
      where.approvalStatus = params.status;
    } else {
      // Default: only show approved photos to public
      where.approvalStatus = 'APPROVED';
    }
    
    const photos = await prisma.sunsetPhoto.findMany({
      where,
      orderBy: [
        { capturedAt: 'desc' }
      ],
      take: params.limit,
      skip: params.offset
    });
    
    const total = await prisma.sunsetPhoto.count({ where });
    
    return c.json({
      photos,
      total,
      limit: params.limit,
      offset: params.offset
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return c.json({ error: 'Failed to fetch photos' }, 500);
  }
});

/**
 * GET /api/photos/:id
 * Get single photo by ID
 */
app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const photo = await prisma.sunsetPhoto.findUnique({
      where: { id }
    });
    
    if (!photo) {
      return c.json({ error: 'Photo not found' }, 404);
    }
    
    return c.json(photo);
  } catch (error) {
    console.error('Error fetching photo:', error);
    return c.json({ error: 'Failed to fetch photo' }, 500);
  }
});

/**
 * POST /api/photos
 * Upload new sunset photo
 * TODO: Add authentication, image upload to Cloudinary
 */
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    
    const createPhotoSchema = z.object({
      imageUrl: z.string().url(),
      title: z.string().optional(),
      caption: z.string().optional(),
      location: z.string().optional(),
      capturedAt: z.string().datetime(),
      phase: z.enum(['DAY', 'GOLDEN', 'NIGHT'])
    });
    
    const validated = createPhotoSchema.parse(body);
    
    const photo = await prisma.sunsetPhoto.create({
      data: {
        imageUrl: validated.imageUrl,
        title: validated.title,
        caption: validated.caption,
        location: validated.location,
        capturedAt: new Date(validated.capturedAt),
        phase: validated.phase,
        approvalStatus: 'PENDING' // Admin must approve
      }
    });
    
    return c.json(photo, 201);
  } catch (error) {
    console.error('Error creating photo:', error);
    return c.json({ error: 'Failed to create photo' }, 500);
  }
});

export default app;

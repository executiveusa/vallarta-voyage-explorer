import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// Routes
import sunsetRouter from './routes/sunset.js';
import businessRouter from './routes/business.js';
import photoRouter from './routes/photos.js';
import contestRouter from './routes/contests.js';
import quizRouter from './routes/quiz.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vallartavoyage.com', 'https://www.vallartavoyage.com']
    : '*',
  credentials: true,
}));

// Health check
app.get('/', (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'Living Sunset Engine API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.route('/api/sunset', sunsetRouter);
app.route('/api/business', businessRouter);
app.route('/api/photos', photoRouter);
app.route('/api/contests', contestRouter);
app.route('/api/quiz', quizRouter);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ 
    error: err.message || 'Internal server error' 
  }, 500);
});

const port = Number(process.env.PORT) || 3001;

console.log(`🌅 Living Sunset Engine starting on port ${port}...`);

serve({
  fetch: app.fetch,
  port
});

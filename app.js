import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { config } from './config/index.js';
import { notFound, errorHandler } from './middleware/error.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiters.js';
import { sanitizeBodyAndParams } from './middleware/sanitize.js';

import authRoutes from './routes/authRoutes.js';

const app = express();

// Security & core middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeBodyAndParams); // custom sanitizer 
app.use(compression());
if (config.env !== 'test') app.use(morgan('dev'));

// Health
app.get('/', (req, res) => res.json({ status: 'ok', service: 'fintech-dashboard' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Rate limits
app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);

// 404 & error
app.use(notFound);
app.use(errorHandler);

export default app;

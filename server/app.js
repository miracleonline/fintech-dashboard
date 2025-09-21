import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { config } from './config/index.js';
import { notFound, errorHandler } from './middleware/error.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiters.js';
import { sanitizeBodyAndParams } from './middleware/sanitize.js';

import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import beneficiaryRoutes from './routes/beneficiaryRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import loansRoutes from './routes/loansRoutes.js';

const app = express();

// Security & core middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeBodyAndParams); // custom sanitizer 
app.use(compression());
if (config.env !== 'test') app.use(morgan('dev')); 

app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(
  '/uploads',
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  }),
  express.static(path.join(__dirname, 'uploads'))
);

// Health
app.get('/', (req, res) => res.json({ status: 'ok', service: 'fintech-dashboard' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Rate limits
app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/loans', loansRoutes);

// 404 & error
app.use(notFound);
app.use(errorHandler);

export default app;

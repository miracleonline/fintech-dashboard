import mongoose from 'mongoose';
import { config } from './index.js';

export async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri, {
    autoIndex: config.env !== 'production',
    serverSelectionTimeoutMS: 10000,
  });
  console.log('MongoDB connected');
}

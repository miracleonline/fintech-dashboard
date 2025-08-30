import { config } from './config/index.js';
import { connectDB } from './config/db.js';
import app from './app.js';

const start = async () => {
  try {
    await connectDB();
    const host = '0.0.0.0'; // for PaaS
    app.listen(config.port, host, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
};

start();

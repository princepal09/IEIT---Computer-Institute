import app from './app.js';
import environment from './config/config.js';
import { connectRedis } from './lib/redis.js';

const startServer = async () => {
  try {
    await connectRedis();

    app.listen(environment.PORT, () => {
      console.log(`Server running on port ${environment.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

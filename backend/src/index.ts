import environment from './config/config.js';
import { connectRedis } from './lib/redis.js';

const startServer = async () => {
  try {
    await connectRedis();

    // Import app only after Redis is connected
    const { default: app } = await import('./app.js');

    app.listen(environment.PORT, () => {
      console.log(`Server running on port ${environment.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

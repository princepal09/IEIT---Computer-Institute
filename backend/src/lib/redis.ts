import { createClient } from 'redis';

import environment from '../config/config.js';

export const redisClient = createClient({
  url: environment.REDIS_URL,
});

redisClient.on('error', (error) => {
  console.error('Redis Client Error', error);
});

redisClient.on('connect', () => {
  console.log('Redis connecting...');
});

redisClient.on('ready', () => {
  console.log('Redis connected successfully');
});

redisClient.on('reconnecting', () => {
  console.log('Redis reconnecting...');
});

export const connectRedis = async (): Promise<void> => {
  if (redisClient.isOpen) {
    return;
  }

  await redisClient.connect();
};

import { redisClient } from '../lib/redis.js';

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    if (!redisClient.isReady) {
      console.warn(`[CACHE] Redis is not ready. GET skipped: ${key}`);
      return null;
    }

    const data = await redisClient.get(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  } catch (err) {
    console.error(`[CACHE] GET FAILED: ${key}`, err);
    return null;
  }
};

export const setCache = async <T>(key: string, data: T, ttl: number): Promise<void> => {
  try {
    if (!redisClient.isReady) {
      console.warn(`[CACHE] Redis not ready. SET skipped: ${key}`);
      return;
    }

    await redisClient.set(key, JSON.stringify(data), {
      EX: ttl,
    });
  } catch (err) {
    console.error(`[CACHE] SET failed: ${key}`, err);
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    if (!redisClient.isReady) {
      console.warn(`[CACHE] Redis not ready. DELETE skipped: ${key}`);
      return;
    }

    await redisClient.del(key);
  } catch (err) {
    console.error(`[CACHE] DELETE failed: ${key}`, err);
  }
};

import rateLimit from 'express-rate-limit';
import { redisClient } from '../lib/redis.js';
import RedisStore from 'rate-limit-redis';

// export const globalRateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,

//   standardHeaders: 'draft-8',
//   legacyHeaders: false,
//   store: new RedisStore({
//     sendCommand: (...args: string[]) => redisClient.sendCommand(args),
//   }),

//   message: {
//     success: false,
//     message: 'Too many requests. Please try again later.',
//   },
// });

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',

  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),

  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

export const forgotPasswordRateLimiter = rateLimit({
  windowMs: 60 * 1000,

  limit: 5,

  standardHeaders: 'draft-8',

  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),

  message: {
    success: false,
    message: 'Too many password reset requests. Please try again later.',
  },
});

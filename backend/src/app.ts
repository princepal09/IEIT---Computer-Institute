import express, { Request, Response } from 'express';

import ApiResponse from './utils/ApiResponse.js';
import errorMiddleware from './middlewares/globalError.middleware.js';

const app = express();

//Root Route
app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, 'IEIT API IS WORKING'));
});

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    message: 'IEIT API HEALTHY',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(errorMiddleware);

export default app;
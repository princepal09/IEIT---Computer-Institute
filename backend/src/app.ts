import express, { Request, Response } from 'express';

import ApiResponse from './utils/ApiResponse.js';
import errorMiddleware from './middlewares/globalError.middleware.js';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, 'IEIT API IS WORKING'));
});

app.use(errorMiddleware);

export default app;

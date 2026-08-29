import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import environment from './config/config.js';
import errorMiddleware from './middlewares/globalError.middleware.js';
import authRoutes from "./modules/auth/auth.route.js"

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: environment.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/auth", authRoutes);

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

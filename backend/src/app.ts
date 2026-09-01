import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import environment from './config/config.js';
import errorMiddleware from './middlewares/globalError.middleware.js';
import authRoutes from './modules/auth/auth.route.js';
import siteSettingsRoutes from './modules/siteSettings/siteSettings.route.js';
import branchRoutes from './modules/branch/branch.route.js';
import courseRoutes from './modules/course/course.route.js';
import enquiryRoutes from './modules/enquiry/enquiry.route.js';
import contactRoutes from './modules/contact/contact.route.js';
import noticeRoutes from './modules/notice/notice.route.js';
import galleryRoutes from './modules/gallery/gallery.route.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: environment.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/site-settings', siteSettingsRoutes);
app.use('/api/v1/branch', branchRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/notices', noticeRoutes);
app.use('/api/v1/gallery', galleryRoutes);

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

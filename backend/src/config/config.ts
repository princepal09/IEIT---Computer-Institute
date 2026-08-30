import dotenv from 'dotenv';
dotenv.config();

const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: process.env.DATABASE_URL!,

  FRONTEND_URL: process.env.FRONTEND_URL!,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN!,

  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  MAIL_FROM: process.env.MAIL_FROM!,
};

export default environment;

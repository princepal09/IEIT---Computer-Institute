import dotenv from "dotenv"
dotenv.config();



const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: process.env.DATABASE_URL!,

  CORS_ORIGIN: process.env.CORS_ORIGIN!,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,

  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN 
};

export default env;
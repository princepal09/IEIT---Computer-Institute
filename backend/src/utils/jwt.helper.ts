import jwt, { SignOptions } from 'jsonwebtoken';
import environment from '../config/config.js';
import { IPayload } from '../types/index.js';
import ApiError from './AppError.js';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } =
  environment;

export const generateAccessToken = (payload: IPayload) => {
  console.log(payload);
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'],
  });
};

export const generateRefreshToken = (payload: IPayload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
  });
};

export const verifyRefreshToken = (token: string):IPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as IPayload;
};

export const verifyAccessToken = (token: string): IPayload => {
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as IPayload;

    return decoded;
  } catch (err: any) {
    throw new ApiError(401, 'Invalid or expired access token');
  }
};


import { Document } from 'mongoose';

export interface UserFields {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken?: string;
  googleId?: string;
}

export interface UserDocument extends Document, UserFields {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

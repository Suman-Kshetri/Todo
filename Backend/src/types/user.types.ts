import { Document, Types } from 'mongoose';

export interface UserFields {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: string;
  avatarPublicId?: string;
  refreshToken?: string;
  googleId?: string;
}

export interface UserDocument extends Document, UserFields {
   _id: Types.ObjectId;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

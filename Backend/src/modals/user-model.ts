import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import {UserDocument } from '../types/user.types';

// Define the schema
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatar: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//hash password before saving to database
//in this callback function, we should have this reference so we don't use arrow function
//because arrow function doesn't have this reference
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.isPasswordCorrect = async function 
    (this: UserDocument,password: string)
    : Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
userSchema.methods.generateAccessToken = function (this: UserDocument): string {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const expiry = process.env.ACCESS_TOKEN_EXPIRY  as SignOptions['expiresIn']; 

    if (!secret || !expiry) {
        throw new Error("ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is not defined in environment variables");
    }

    const payload = {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    };

    const options: SignOptions = {
         expiresIn: expiry,
    };

    return jwt.sign(payload, secret as string, options);
};


userSchema.methods.generateRefreshToken = function () {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    const expiry = process.env.REFRESH_TOKEN_EXPIRY  as SignOptions['expiresIn']; 

    if (!secret || !expiry) {
        throw new Error("REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY is not defined in environment variables");
    }

    const payload = {
        _id: this._id,
    };

    const options: SignOptions = {
         expiresIn: expiry,
    };

    return jwt.sign(payload, secret as string, options);
}

export const User = mongoose.model<UserDocument>('User', userSchema);

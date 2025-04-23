import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//for better type safety:
//if we don't use the extends mongoose.Document,TypeScript types for .save() or _id or 
// .populate() will not be available, because TypeScript thinks you’re working with a plain object — not a Mongoose Document.
export interface UserInterface extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    avatar: string; // URL to the avatar image from cloudinary
    refreshToken: string;
}
//exportin the userInterface we can use it later on the conrollers

const userSchema = new Schema <UserInterface>({
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

    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String, // URL to the avatar image from cloudinary
        required: true,
    },

    refreshToken: {
        type: String,
    }
},{timestamps: true});

//hash password before saving to database
//in this callback function, we should have this reference so we don't use arrow function
//because arrow function doesn't have this reference
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.isPasswordCorrect = async function 
    (this: UserInterface,password: string)
    : Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

export const User = mongoose.model<UserInterface>('User', userSchema);

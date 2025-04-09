import mongoose from 'mongoose';
import { Schema } from 'mongoose';

//for better type safety:
//if we don't use the extends mongoose.Document,TypeScript types for .save() or _id or 
// .populate() will not be available, because TypeScript thinks you’re working with a plain object — not a Mongoose Document.
export interface UserInterface extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    avatar: string; // URL to the avatar image from cloudinary
    refreshTokn: string;
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
        lowecase: true,
        trim: true,
    },

    password: {
        type: String,
        reqired: [true, "Password is required"],
    },
    avatar: {
        type: String, // URL to the avatar image from cloudinary
        required: true,
    },

    refreshTokn: {
        type: String,
    }
},{timestamps: true});

export const User = mongoose.model<UserInterface>('User', userSchema);

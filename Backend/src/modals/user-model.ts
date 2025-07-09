import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import jwt, {SignOptions} from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//for better type safety:
//if we don't use the extends mongoose.Document,TypeScript types for .save() or _id or 
// .populate() will not be available, because TypeScript thinks you’re working with a plain object — not a Mongoose Document.
export interface UserInterface extends mongoose.Document {
    username: string;
    fullname: string;
    email: string;
    password: string;
    avatar: string; // URL to the avatar image from cloudinary
    refreshToken: string;
    googleId: string;
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
    fullname: {
        type: String,
        required: true,
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
    },
    googleId: {
        type : String
    },

},{timestamps: true});

//hash password before saving to database
//in this callback function, we should have this reference so we don't use arrow function
//because arrow function doesn't have this reference
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.isPasswordCorrect = async function 
    (this: UserInterface,password: string)
    : Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
userSchema.methods.generateAccessToken = function (this: UserInterface): string {
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

export const User = mongoose.model<UserInterface>('User', userSchema);

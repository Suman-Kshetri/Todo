import mongoose from "mongoose";

export interface TodoInterface extends mongoose.Document{
    title: string;
    description?: string;
    status: 'completed' | 'incomplete';
    user: mongoose.Schema.Types.ObjectId;
    priority?: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
}
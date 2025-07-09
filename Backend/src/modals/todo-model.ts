import mongoose from "mongoose";
import { Schema } from 'mongoose';

export interface TodoInterface extends mongoose.Document{
    title: string;
    description?: string;
    status: 'completed' | 'incomplete';
    user: mongoose.Schema.Types.ObjectId;
    priority?: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['completed', 'incomplete','pending'],
        default: 'incomplete',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    }
},{ timestamps: true });

export const Todo = mongoose.model<TodoInterface>('Todo', TodoSchema);

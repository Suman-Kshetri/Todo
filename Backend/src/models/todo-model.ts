import mongoose from "mongoose";
import { Schema } from 'mongoose';
import { TodoInterface } from "../types/todo.types";


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
        default: 'medium'
    },
    completedAt: {
      type: Date,
      default: null,
    },
},{ timestamps: true });

export const Todo = mongoose.model<TodoInterface>('Todo', TodoSchema);

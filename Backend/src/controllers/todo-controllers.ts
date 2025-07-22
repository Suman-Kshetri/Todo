import { Todo } from "../models/todo-model";
import { TodoInterface } from "../types/todo.types";
import { UserDocument } from "../types/user.types";
import { ApiError} from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { Types } from "mongoose";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;
  if ([title, priority].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All the fields are required");
  }

  const currentUser = req.user;
  if (!currentUser) {
    throw new ApiError(403, "Unauthorized access - user not found in request");
  }
  const userId = (currentUser as UserDocument)._id;

  const todo = await Todo.create({
    title,
    description,
    priority,
    user: userId,
  });

  if (!todo) {
    throw new ApiError(409, "Something went wrong while creating todo");
  }

  return res
  .status(201)
  .json(
    new ApiResponse(201,"Todo created successfully", todo))
});

const getTodos = asyncHandler(async (req , res) => {
  const currentUser = req.user;
  if (!currentUser) {
    throw new ApiError(403, "Unauthorized access - user not found in request");
  }

  const userId = (currentUser as UserDocument)._id;

  const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Todos fetched successfully", todos));
});

// GET /api/v1/todos/filter?sort=status&value=pending
const getFilteredTodos = asyncHandler(async (req, res) => {
const sort = req.query.sort as string | undefined;
const value = req.query.value as string | undefined;

  try {
    const currentuser = req.user;
    if(!currentuser){
        throw new ApiError(403, "Unauthorized access - user not found in request")
    }
    const userId = (currentuser as UserDocument)._id;

    const { sort, value } = req.query;

    const matchStage: any = {
      user: userId,
    };

    if (sort === "status" && value) {
      matchStage.status = value;
    } else if (sort === "priority" && value) {
      matchStage.priority = value;
    }

    const pipeline: any[] = [
      { $match: matchStage },
    ];

    //custom sort logic
    if (sort === "priority") {
      // Custom sort order: high → medium → low
      pipeline.push({
        $addFields: {
          priorityOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$priority", "high"] }, then: 1 },
                { case: { $eq: ["$priority", "medium"] }, then: 2 },
                { case: { $eq: ["$priority", "low"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      });
      pipeline.push({ $sort: { priorityOrder: 1, createdAt: -1 } }); // newest first for same priority
    } else if (sort === "createdAt") {
      pipeline.push({ $sort: { createdAt: -1 } });
    } else if (sort === "status") {
      pipeline.push({ $sort: { status: 1, createdAt: -1 } }); // alphabetical order of status
    }

    const todos = await Todo.aggregate(pipeline);

    res.status(200).json({
      success: true,
      message: "Filtered todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching filtered todos:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


const updateTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.id;

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ApiError(400, "Invalid Todo ID");
  }

  const currentUser = req.user;
  if (!currentUser) {
    throw new ApiError(403, "Unauthorized access - user not found in request");
  }

  const userId = (currentUser as any)._id;

  // If status is being updated to "completed", set completedAt to now.
  // If status is changed away from "completed", clear completedAt.
  if (req.body.status === "completed") {
    req.body.completedAt = new Date();
  } else if (req.body.status && req.body.status !== "completed") {
    req.body.completedAt = null;
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, user: userId },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedTodo) {
    throw new ApiError(403, "Todo not found or not authorized");
  }
  return res.status(200).json(new ApiResponse(200, "Todo updated successfully",updatedTodo));
});


const deleteTodo = asyncHandler(async (req, res) => {
    const todoId = req.params.id;
    if(!todoId){
        throw new ApiError(400,"Invalid todo id")
    }
    const currentUser = req.user;
    if(!currentUser){
        throw new ApiError(403, "Unauthorized access - user not found in request")
    }
    const userId = (currentUser as UserDocument)._id;
    await Todo.findOneAndDelete({ _id: todoId, user: userId });

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Todo successfully deleted",{})
    )
})
const getSingleTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const userId = (req.user as UserDocument)._id;

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ApiError(400, "Invalid Todo ID");
  }

  const todo = await Todo.findOne({ _id: todoId, user: userId });
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return res.status(200).json(new ApiResponse(200, "Todo fetched", todo));
});


export { createTodo, getTodos, getFilteredTodos, updateTodo, deleteTodo ,getSingleTodo};

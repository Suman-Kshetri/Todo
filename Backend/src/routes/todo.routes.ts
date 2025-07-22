import { Router } from "express";
import {
  createTodo,
  getTodos,
  getFilteredTodos,
  updateTodo,
  deleteTodo,
  getSingleTodo,
} from "../controllers/todo-controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const todoRouter = Router();

// Protect all routes
todoRouter.use(verifyJWT);

// Routes
todoRouter.post("/create", createTodo);
todoRouter.get("/todolist", getTodos);
todoRouter.get("/filter/criteria", getFilteredTodos);
todoRouter.patch("/edit/:id", updateTodo);
todoRouter.delete("/delete/:id", deleteTodo);
todoRouter.get("/single/:id", getSingleTodo);


export default todoRouter;

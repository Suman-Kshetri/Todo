import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

//data comes on backend form frontend in different form json, body, head so we need to parse it
//josn configure
app.use(express.json({limit: '16kb'}));

//urlencoded config
app.use(express.urlencoded({extended: true, limit: '16kb'}));

//if we want to use static files like images, videos, etc. 
//to store the files and folder in server we need to use express.static
app.use(express.static('public'));

//cookie parser is use to acces the cookie of user and set them
app.use(cookieParser());


import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";
//routes declaration
app.use("/api/v1/auth", authRouter);

//todo route:
app.use('/api/v1/todo', todoRouter);

export {app};
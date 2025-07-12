import { Router } from "express";
import { registerUser } from "../controllers/user-controller";
import { upload } from "../middlewares/multer.middleware";


const authRouter = Router()

authRouter.post(
  "/register",
  upload.single("avatar"),
  registerUser
);


export default authRouter;
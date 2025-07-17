import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, getUserProfile } from "../controllers/user-controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import asyncHandler from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";

const authRouter = Router()

authRouter.post(
  "/register",
  upload.single("avatar"),
  registerUser
);

authRouter.route("/login").post(loginUser)
//secure routes

authRouter.route("/logout").post(verifyJWT, logoutUser)
//verifyjwt --> next() --> logoutuser -> now the logoutuser has acces to user object that we added
authRouter.route("/refreshToken").post(refreshAccessToken)
authRouter.get("/profile", verifyJWT, getUserProfile);

export default authRouter;
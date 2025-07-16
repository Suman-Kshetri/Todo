import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user-controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import passport from "passport";

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


export default authRouter;
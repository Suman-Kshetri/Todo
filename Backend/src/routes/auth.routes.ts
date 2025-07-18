import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, getUserProfile } from "../controllers/user-controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { googleAuthCode } from "../controllers/googleAuthController";
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
authRouter.get("/profile", verifyJWT, getUserProfile);

//Google OAuth

authRouter.post("/google", googleAuthCode);

export default authRouter;
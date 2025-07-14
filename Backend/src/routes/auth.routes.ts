import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user-controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import passport from "passport";
import { googleAuthCallback } from "../controllers/user-controller";

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


// ---------------------------
// 🔐 Google OAuth Routes
// ---------------------------

// Step 1: Redirect to Google Auth
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Google callback endpoint
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);


export default authRouter;
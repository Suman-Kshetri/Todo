import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user-controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";


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

export default authRouter;
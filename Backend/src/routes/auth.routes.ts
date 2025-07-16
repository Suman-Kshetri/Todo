import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user-controller";
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
authRouter.get(
  "/profile",
  verifyJWT,
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(200, "User profile fetched", req.user)
    );
  })
);

export default authRouter;
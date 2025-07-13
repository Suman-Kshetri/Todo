//verify if the user is or not

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error";
import asyncHandler from "../utils/async-handler";
import dotenv from "dotenv";
import { User } from "../modals/user-model";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

//error while direcly accesing _id so we use this..
interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }
  
    //accessing the values we send during the generation of accesToken : id, username, fullName,....in payload
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error(
        "ACCESS_TOKEN_SECRET is not defined in environment variables"
      );
    }
  
    const decodedToken = jwt.verify(token, secret) as CustomJwtPayload;
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
  
    if(!user) {
      throw new ApiError(401, "Invalid Access Token")
    }
  
    //adding a new object in req
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token")
  }

});

// controllers/googleAuthController.ts
import axios from "axios";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { User } from "../models/user-model";

const generateUsername = (email: string) => {
  const base = email.split("@")[0];
  return base.toLowerCase() + Math.floor(Math.random() * 10000);
};

const googleAuthCode = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) throw new ApiError(400, "Authorization code not provided");

  const client_id = process.env.GOOGLE_CLIENT_ID!;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirect_uri = "postmessage";

  try {
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { email, name, picture, sub: googleId } = userInfoResponse.data;

    if (!email || !name) throw new ApiError(400, "Missing required fields from Google response");

    let user = await User.findOne({ email });

    if (!user) {
      const username = generateUsername(email);

      user = await User.create({
        fullname: name,
        email,
        avatar: picture,
        googleId,
        username,
        provider: "google",
      });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(201, "Login successful via Google", {
          user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            avatar: user.avatar,
            username: user.username,
          },
          accessToken,
        })
      );
  } catch (error: any) {
    console.error("Google Auth Error:", error.response?.data || error.message);
    throw new ApiError(500, "Failed during Google authentication");
  }
});

export default googleAuthCode;


export { googleAuthCode };

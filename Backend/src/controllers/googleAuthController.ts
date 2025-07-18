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
  const redirect_uri = "postmessage"; // This is the special value when using google auth code flow with Google API client on frontend

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenResponse.data;

    // Get user info from Google
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

    // Generate JWT tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set HttpOnly, secure cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // secure true in prod only
      sameSite: "strict" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res
      .status(201)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(new ApiResponse(201, "Login Successful via Google", { user, accessToken }));
  } catch (error: any) {
    console.error("Google Auth Error:", error.response?.data || error.message);
    throw new ApiError(500, "Failed during Google authentication");
  }
});

export { googleAuthCode };

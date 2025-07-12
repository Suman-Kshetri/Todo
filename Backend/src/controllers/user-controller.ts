import { ApiError } from '../utils/api-error'
import asyncHandler from '../utils/async-handler'
import { User } from '../modals/user-model'
import { uploadOnCloudinary } from '../utils/cloudinary'
import { ApiResponse } from '../utils/api-response'
import mongoose from 'mongoose';


const registerUser = asyncHandler( async (req, res)=> {
    //get user details from frontend
    //validation - not empty
    // check if user already exists username/email
    //files check : image
    //upload to cloudinary - profile picture
    //creating a user object to send to mongodb [create entry]
    //remove password and tokens field from response -> to send to user[frontend]
    //check user creation
    //return response
    const {username, fullname, email, password, avatar, googleId} = req.body
    // if(fullname == ""){
    //     throw new ApiError(400, "FullName is required")
    // }
    if (
        [fullname, email, username, password].some((field) => 
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400 , "All the fields are required");
    }

    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User With This Username Or Email Already Existed!!")
    }
    //checking if the file is in local file path or not
    const avatarLocalPath = req.file?.path;
    if(!avatarLocalPath){
        throw new ApiError(400, "Profile Image is required!!")
    }
    //uploading to cloudinary
    const avatarImage = await uploadOnCloudinary(avatarLocalPath);
    if(!avatarImage){
        throw new ApiError(409, "Profile Picture is required!!!")
    }

    //create entry in database:
    const user = await User.create({
        fullname,
        avatar: avatarImage.url, 
        email,
        password,
        username: username.toLowerCase()
    })
    //checking if the user is null or empty and select the username details that are not needed to send to fronted
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //the password and refresh token are exclueded

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating the user")
    }

    //sending api response
    return res
    .status(201)
    .json(
        new ApiResponse(200,"User Registered Sucessfully",createdUser)
    )

})
//generating refresh and access token
const generateAccessAndRefreshToken = async(userId: mongoose.Types.ObjectId | string) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
      throw new ApiError(404, "User not found while generating tokens");
    }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //save refresh token to db
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(503,"Something went wrong while generating access and refresh token")
    }
}

const loginUser = asyncHandler(async (req, res) => {
    //email+password form data
    //check if both field is or not
    //find user if user exists or not
    //if use is  then: 
        //check password is correct or not
    //refresh and acces token generate then send to user using cookies 
    //send reponse sucessfully logged in

    const {email, password} = req.body;
    if(!email){
        throw new ApiError(400, "Email is required")
    }
    const user =  await User.findOne({email})
    //doing this cause all the unwanted filed to be accessed so......>
    if(!user){
        throw new ApiError(404, "User doesnot exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id as string);

    //sending info to user : .....>update or do query again
    const loggedInUser = User.findById(user._id).select("-password -refreshToken");


    //sending cookies:
    const options = {
        //only modifiable by server
        httpOnly : true,
        secure : true
    }


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken" , refreshToken, options)
    .json(
        new ApiResponse(200,"User LoggedIn successfully",
            {
            user: loggedInUser, refreshToken, accessToken
        })
    )
})

export {registerUser, loginUser}
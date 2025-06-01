import asyncHandler from '../utils/async-handler'

const registerUser = asyncHandler( async (req, res)=> {
    res.status(200).json({
        message: "User registered successfully",
    })
})
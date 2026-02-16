import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

   
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false}) 
    return {accessToken, refreshToken}

  } catch (error){
    throw new ApiError(500, "something went wrong while generating refresh and access token")
  }
}
const Register = asyncHandler(async(req, res) => {
   
   const {email, username, password} = req.body
   if(!email || !username || !password) throw new ApiError(400, "All fields are required")

   const existedUser = await User.findOne({
    $or: [{username}, {email}]  // return if any, among username or email exist
   })
   if(existedUser) 
    res.status(400).json({
        success: false,
        message: "User already exists"
    })

    

    const user = await User.create({
        username,
        email,
        password,
        
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfuly"))
    
})

const login = asyncHandler(async(req, res) => {

 
    const {email, password} = req.body
    console.log(email)

    if(!email) throw new ApiError(400, "email is required")

    const user = await User.findOne({
        email
    }) 
    
    if(!user) throw new ApiError(400, "User does not exist")

    const isPasswordValid = await user.isPasswordCorrect(password)  
    if(!isPasswordValid) throw new ApiError(400, "password is incorrect")

      
      const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)  // refresh token is update here so user does not have refresh token

      // same user is access with new refresh token 
      const loggedInuser = await User.findById(user._id).select("-password -refreshToken")
      
      // sending these tokens into cookies
      const options = {
   httpOnly: true,
   secure: true, // Only secure in production
   sameSite: "lax" // "none" for production, "lax" for dev
}

      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInuser, accessToken,
            refreshToken
          },
          "User logged in succesfully"
        )
      )
})

const logout = asyncHandler( async(req, res) => {
   
     await User.findByIdAndUpdate(
        req.user?._id,  
        {
          $unset: {  // update by this
            refreshToken: 1
          }
        },{
          new: true
        }
     )
     
     const options = {
   httpOnly: true,
   secure: true, // Only secure in production
   sameSite: "lax"

   
}

     return res.status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(new ApiResponse(200, {}, "User logged out"))
})

const addTodo = asyncHandler( async(req, res) => {
    const {todo} = req.body
    if(!todo) throw new ApiError(400, "Add data in Todo")

    const update = await User.updateOne(
  { _id: req.user._id },
  {
    $push: {
      todos: todo
      
    }
  }
)
    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken")
          

    return res.status(200).json(new ApiResponse(200, updatedUser, "Todo added sucessfully"))
})

const deleteTodo = asyncHandler( async(req, res) => {
    const { todo } = req.body;

    if (!todo) {
      throw new ApiError(400, "All fields are required");
    }

    await User.updateOne(
  { _id: req.user._id },
  {
    $pull: { todos: todo }
  }
);

    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, updatedUser, "Todos added successfully"))
});

export { Register, login, logout, addTodo, deleteTodo };
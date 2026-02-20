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
    $or: [{username}, {email}]
   })
   if(existedUser) 
    res.status(400).json({
        success: false,
        message: "User already exists"
    })
    const user = await User.create({ username, email, password })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfuly"))
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    console.log(email)
    if(!email) throw new ApiError(400, "email is required")
    const user = await User.findOne({ email }) 
    if(!user) throw new ApiError(400, "User does not exist")
    const isPasswordValid = await user.isPasswordCorrect(password)  
    if(!isPasswordValid) throw new ApiError(400, "password is incorrect")
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInuser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInuser, accessToken, refreshToken }, "User logged in succesfully"))
})

const logout = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,  
        { $unset: { refreshToken: 1 } },
        { new: true }
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

// ✅ UPDATED
const addTodo = asyncHandler(async (req, res) => {
    const { id, title, description, priority } = req.body;

    if (!id || !title || !description || !priority) {
        throw new ApiError(400, "All fields are required");
    }

    await User.updateOne(
        { _id: req.user._id },
        { $push: { todos: { id, title, description, priority } } }
    );

    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, updatedUser, "Todo added successfully"));
});

// ✅ UPDATED
const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new ApiError(400, "Todo id is required");
    }

    await User.updateOne(
        { _id: req.user._id },
        { $pull: { todos: { id } } }
    );

    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, updatedUser, "Todo deleted successfully"));
});

// ✅ UPDATED
const editTodo = asyncHandler(async (req, res) => {
    const { id, title, description, priority } = req.body;

    if (!id || !title || !description || !priority) {
        throw new ApiError(400, "All fields are required");
    }

    await User.updateOne(
        { _id: req.user._id, "todos.id": id },
        {
            $set: {
                "todos.$.title": title,
                "todos.$.description": description,
                "todos.$.priority": priority,
            }
        }
    );

    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, updatedUser, "Todo updated successfully"));
});

const updateUserPassword = asyncHandler(async(req,res) => {
   const {password, confirmPassword} = req.body
   const userFromDB = await User.findById(req.user?._id)
   const passwordCorrect = await userFromDB.isPasswordCorrect(password)
   if(!passwordCorrect) throw new ApiError(400, "Password is incorrect")
   userFromDB.password = confirmPassword
   await userFromDB.save({validateBeforeSave: false})
   return res.status(200).json(new ApiResponse(200, {}, "Password changed"))
})

const updateUserDetail = asyncHandler(async(req, res) => {
  const {username} = req.body
  const user = await User.findByIdAndUpdate(
     req.user?._id,
     { $set: { username } },
     { new: true }
  ).select("-password")
  return res.status(200).json(new ApiResponse(200, user, "Details updated sucessfully"))
})

export { Register, login, logout, addTodo, deleteTodo, updateUserPassword, updateUserDetail, editTodo };
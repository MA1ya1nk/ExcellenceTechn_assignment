import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../model/user.model.js"


export const isAdmin = asyncHandler((req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Admin Only")
    
  }
  next();
});

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const isAdmin = asyncHandler((req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized — Please login first");
  }
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Forbidden — Admin access only");
  }
  next();
});
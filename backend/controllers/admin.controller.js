import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { users, totalUsers: users.length }, "All users fetched successfully")
  );
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(
    new ApiResponse(200, user, "User fetched successfully")
  );
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new ApiError(400, "User ID is required");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (userId === req.user._id.toString()) {
    throw new ApiError(400, "Admin cannot delete their own account");
  }

  await User.findByIdAndDelete(userId);

  return res.status(200).json(
    new ApiResponse(200, {}, "User deleted successfully")
  );
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) throw new ApiError(400, "userId and role are required");
  if (!["user", "admin"].includes(role)) throw new ApiError(400, "Role must be 'user' or 'admin'");

  if (userId === req.user._id.toString()) {
    throw new ApiError(400, "Admin cannot change their own role");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { role } },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(
    new ApiResponse(200, user, `User role updated to '${role}' successfully`)
  );
});

const deleteUserTodo = asyncHandler(async (req, res) => {
  const { userId, todoId } = req.body;
  if (!userId || !todoId) throw new ApiError(400, "userId and todoId are required");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  await User.updateOne(
    { _id: userId },
    { $pull: { todos: { id: todoId } } }
  );

  const updatedUser = await User.findById(userId).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Todo deleted successfully")
  );
});

const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const allUsers = await User.find({}).select("todos");
  const totalTodos = allUsers.reduce((acc, user) => acc + (user.todos?.length || 0), 0);

  return res.status(200).json(
    new ApiResponse(200, {
      totalUsers,
      totalAdmins,
      totalTodos,
      totalRegularUsers: totalUsers - totalAdmins,
    }, "Admin stats fetched successfully")
  );
});

export { getAllUsers, getUserById, deleteUser, updateUserRole, deleteUserTodo, getAdminStats };
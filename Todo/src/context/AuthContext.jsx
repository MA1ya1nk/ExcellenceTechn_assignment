import { createContext, useEffect, useState } from "react";
import api from "../api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState("");
  
  // ✅ FIXED — setUser(res.data.user) uncommented
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/users/me");
        console.log("Auth check successful:", res.data);
        setUser(res.data.user); // ✅ FIXED — was commented out
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // ✅ untouched
  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  // ✅ FIXED — sends { id, title, description, priority }
  const addTodo = async (todo) => {
    try {
      const res = await api.post("/users/addTodo", {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
      });
      console.log("Todo added successfully:", res.data.data);
      setUser(res.data.data);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // ✅ FIXED — sends { id } instead of whole todo object
  const delTodo = async (id) => {
    try {
      const res = await api.post("/users/deleteTodo", { id });
      console.log("Todo deleted successfully:", res.data.data);
      setUser(res.data.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // ✅ FIXED — sends { id, title, description, priority }
  const editTodo = async ({ id, title, description, priority }) => {
    try {
      const res = await api.post("/users/editTodo", {
        id,
        title,
        description,
        priority,
      });
      console.log("Todo edited successfully:", res.data.data);
      setUser(res.data.data);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // ✅ untouched
  const updateUserPassword = async (password, confirmPassword) => {
    try {
      const res = await api.post("/users/updateUserPassword", { password, confirmPassword });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  // ✅ untouched
  const updateUserDetail = async (username) => {
    try {
      const res = await api.post("/users/updateUserDetail", { username });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error updating user detail:", error);
    }
  };

  // ✅ admin functions — untouched
  const getAdminStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      return res.data.data;
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      return res.data.data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteAnyUser = async (userId) => {
    try {
      const res = await api.delete("/admin/delete-user", { data: { userId } });
      return res.data;
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      const res = await api.patch("/admin/update-role", { userId, role });
      return res.data;
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const deleteAnyTodo = async (userId, todoId) => {
    try {
      const res = await api.delete("/admin/delete-todo", { data: { userId, todoId } });
      return res.data;
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        addTodo,
        delTodo,
        editingTodo,
        setEditingTodo,
        updateUserPassword,
        updateUserDetail,
        editTodo,
        getAdminStats,
        getAllUsers,
        deleteAnyUser,
        updateUserRole,
        deleteAnyTodo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
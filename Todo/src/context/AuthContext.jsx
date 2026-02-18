import { createContext, useEffect, useState } from "react";
import api from "../api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState("");
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/users/me");
        console.log("Auth check successful:", res.data);
        // setUser(res.data.user); // ✅ logged in
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
  
  

   const logout = async () => {
    
      // const c=alert("Are you sure you want to logout?");
      // if(c) return;
    try {
      
         await api.post("/users/logout");

      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const addTodo = async (todo) => {
       try{
        const res = await api.post("/users/addTodo", todo);

            console.log('User logged in successfully:', res.data.data);
            setUser(res.data.data);
       } catch (error) {
        console.error('Error adding todo:', error);
       }

};

const delTodo = async (todo) => {
      try{
        const res = await api.post("/users/deleteTodo", {todo});

  console.log('User deleted successfully:', res.data.data);
            setUser(res.data.data);

        } catch (error) {
          console.error('Error deleting password:', error);
        }

};

    const updateUserPassword = async (password, confirmPassword) => {
  try {
    const res = await api.post("/users/updateUserPassword", { password, confirmPassword });
    setUser(res.data.user);
  } catch (error) {
    console.error("Error updating password:", error);
  }
};

const updateUserDetail = async (username) => {
  try {
    const res = await api.post("/users/updateUserDetail", { username });  
    setUser(res.data.user);
  } catch (error) {
    console.error("Error updating user detail:", error);
  }
};


  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, addTodo, delTodo, editingTodo, setEditingTodo, updateUserPassword, updateUserDetail }}>
      {children}
    </AuthContext.Provider>
  );
};
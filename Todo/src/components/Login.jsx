import React, { useState, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const ref = useRef()
    const passwordRef = useRef();

   const showPassword = () => {
       
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "eye.png";
    
  };
    }

   const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("User logged in successfully:", response.data.data.user);
      
      setUser(response.data.data.user);
      setTimeout(() => {
        navigate("/todo");
      }, 1000);
    } catch (error) {
      console.error("Error logging in:", error);
      setEmail("");
      setPassword("");
      
    }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-[400px] h-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg">

    <div className="text-center text-3xl py-6 font-semibold border-b">
      Log In your account
    </div>

    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        
        <div className="relative w-full">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

<span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
           


        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          Log In
        </button>

      </div>
      
    </form>

  </div>
</div>
  )
}

export default Login
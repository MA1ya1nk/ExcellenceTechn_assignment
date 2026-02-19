import React, { useState, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const ref = useRef();
  const passwordRef = useRef();

  // ✅ Your original logic — untouched
  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "eye.png";
    }
  };

  // ✅ Your original logic — untouched
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
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
  };

  return (
    <>
      <style>{`
        @keyframes drift1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 80px) scale(1.2); }
        }
        @keyframes drift2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-70px, -50px) scale(1.15); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        .login-card {
          position: relative;
          z-index: 1;
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
          border-radius: 2px;
        }
        .login-input {
          width: 100%;
          padding: 13px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: rgba(255,255,255,0.3); }
        .login-input:focus {
          border-color: rgba(0,210,150,0.5);
          background: rgba(0,210,150,0.05);
          box-shadow: 0 0 0 3px rgba(0,210,150,0.12);
        }
        
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div
          className="login-card w-[420px] rounded-2xl p-10"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                background: "linear-gradient(135deg, #00d296, #00a8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">

              {/* Email */}
              <div>
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="field-label">Password</label>
                <div className="relative w-full">
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    style={{ paddingRight: 44 }}
                  />
                  {/* ✅ Your original ref+img eye toggle — untouched */}
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
                      style={{ filter: "invert(1) opacity(0.5)" }}
                    />
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn">
                Log In
              </button>

            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default Login;
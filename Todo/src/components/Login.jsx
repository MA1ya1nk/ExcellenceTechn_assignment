import React, { useState, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");           // ← NEW
  const [loading, setLoading] = useState(false);    // ← NEW
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

  // ✅ Your original logic — only error/loading states added
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
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
      // ← Show meaningful error message
      const msg = error.response?.data?.message || "Invalid email or password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
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
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
        @keyframes errorIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.45;
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #00d296, transparent 70%);
          top: -150px; left: -150px;
          animation: drift1 11s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, #0066ff, transparent 70%);
          bottom: -100px; right: -100px;
          animation: drift2 14s ease-in-out infinite alternate;
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
        .login-card.shake {
          animation: shakeX 0.45s cubic-bezier(0.36,0.07,0.19,0.97) both;
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
        .login-input.input-error {
          border-color: rgba(255,80,80,0.6);
          background: rgba(255,80,80,0.05);
          box-shadow: 0 0 0 3px rgba(255,80,80,0.10);
        }
        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.25);
          border-radius: 10px;
          padding: 10px 14px;
          animation: errorIn 0.3s ease both;
        }
        .error-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ff6060;
          flex-shrink: 0;
        }
        .error-text {
          font-size: 13px;
          color: #ff8080;
        }
        .login-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #00d296 0%, #00a8ff 100%);
          color: #071014;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.3px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .login-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,210,150,0.45);
        }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: #071014;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* card gets shake class when error exists */}
        <div
          className={`login-card w-[420px] rounded-2xl p-10 ${error ? "shake" : ""}`}
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
              Log in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">

              {/* Error Box — only shows on error */}
              {error && (
                <div className="error-box">
                  <div className="error-dot" />
                  <span className="error-text">{error}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`login-input ${error ? "input-error" : ""}`}
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
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className={`login-input ${error ? "input-error" : ""}`}
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
              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>

            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default Login;
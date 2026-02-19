import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user, updateUserPassword, updateUserDetail } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateType, setUpdateType] = useState("");
  
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const eyeRef = useRef();
  const eyeRef2 = useRef();

  // ✅ Your original logic — untouched
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateType === "password") {
      if (confirmPassword.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
      console.log("Updating password for:", user.email);
      await updateUserPassword(password, confirmPassword);
    } else if (updateType === "username") {
      if (username.trim() === "") {
        alert("Username cannot be empty!");
        return;
      }
      console.log("Updating username for:", user.email, "to:", username);
      await updateUserDetail(username);
    }
  }

  // ✅ Your original logic — untouched
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      eyeRef.current.src = "eye.png";
    } else {
      passwordRef.current.type = "password";
      eyeRef.current.src = "eyecross.png";
    }
  };

  // ✅ Your original logic — untouched
  const showConfirmPassword = () => {
    if (confirmPasswordRef.current.type === "password") {
      confirmPasswordRef.current.type = "text";
      eyeRef2.current.src = "eye.png";
    } else {
      confirmPasswordRef.current.type = "password";
      eyeRef2.current.src = "eyecross.png";
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
        .dash-card {
          position: relative;
          z-index: 1;
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .dash-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
          border-radius: 2px;
        }
        .dash-input {
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
        .dash-input::placeholder { color: rgba(255,255,255,0.3); }
        .dash-input:focus {
          border-color: rgba(0,210,150,0.5);
          background: rgba(0,210,150,0.05);
          box-shadow: 0 0 0 3px rgba(0,210,150,0.12);
        }
        .dash-input:read-only {
          color: rgba(255,255,255,0.3);
          cursor: not-allowed;
          background: rgba(255,255,255,0.03);
        }
        .dash-select {
          width: 100%;
          padding: 13px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }
        .dash-select:focus {
          border-color: rgba(0,210,150,0.5);
          background-color: rgba(0,210,150,0.05);
          box-shadow: 0 0 0 3px rgba(0,210,150,0.12);
        }
        .dash-select option {
          background: #141927;
          color: white;
        }
        .dash-btn-active {
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
        }
        .dash-btn-active::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .dash-btn-active:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,210,150,0.45);
        }
        .dash-btn-active:active { transform: translateY(0); }
        .dash-btn-disabled {
          width: 100%;
          padding: 13px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.2);
          font-weight: 700;
          font-size: 15px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          cursor: not-allowed;
          margin-top: 8px;
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

        <div
          className="dash-card w-[460px] rounded-2xl p-10"
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
              Update Your Profile
            </h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              Manage your account details below
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">

              {/* Email — read only */}
              <div>
                <label className="field-label">Email (Cannot be changed)</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="dash-input"
                />
              </div>

              {/* Update Type Selection */}
              <div>
                <label className="field-label">What would you like to update?</label>
                <select
                  value={updateType}
                  onChange={(e) => setUpdateType(e.target.value)}
                  className="dash-select"
                >
                  <option value="">Select an option</option>
                  <option value="username">Update Username</option>
                  <option value="password">Update Password</option>
                </select>
              </div>

              {/* Username Field */}
              {updateType === "username" && (
                <div>
                  <label className="field-label">New Username</label>
                  <input
                    type="text"
                    placeholder="Enter new username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="dash-input"
                    required
                  />
                </div>
              )}

              {/* Password Fields */}
              {updateType === "password" && (
                <>
                  <div className="relative w-full">
                    <label className="field-label">Current Password</label>
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder="Enter current password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="dash-input"
                      style={{ paddingRight: 44 }}
                      required
                    />
                    {/* ✅ Your original ref+img eye toggle — untouched */}
                    <span
                      className="absolute right-3 top-[42px] cursor-pointer"
                      onClick={showPassword}
                    >
                      <img
                        ref={eyeRef}
                        className="p-1"
                        width={26}
                        src="/eyecross.png"
                        alt="eye"
                        style={{ filter: "invert(1) opacity(0.5)" }}
                      />
                    </span>
                  </div>

                  <div className="relative w-full">
                    <label className="field-label">New Password</label>
                    <input
                      ref={confirmPasswordRef}
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="dash-input"
                      style={{ paddingRight: 44 }}
                      required
                    />
                    {/* ✅ Your original ref+img eye toggle — untouched */}
                    <span
                      className="absolute right-3 top-[42px] cursor-pointer"
                      onClick={showConfirmPassword}
                    >
                      <img
                        ref={eyeRef2}
                        className="p-1"
                        width={26}
                        src="eyecross.png"
                        alt="eye"
                        style={{ filter: "invert(1) opacity(0.5)" }}
                      />
                    </span>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!updateType}
                className={updateType ? "dash-btn-active" : "dash-btn-disabled"}
              >
                Update Profile
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard
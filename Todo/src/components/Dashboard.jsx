import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user, updateUserPassword, updateUserDetail } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateType, setUpdateType] = useState(""); // "username" or "password"
  
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const eyeRef = useRef();
  const eyeRef2 = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (updateType === "password") {
      if (confirmPassword.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
      // API call to update password
      console.log("Updating password for:", user.email);
        await updateUserPassword(password, confirmPassword);

    } else if (updateType === "username") {
      if (username.trim() === "") {
        alert("Username cannot be empty!");
        return;
      }
      // API call to update username
      console.log("Updating username for:", user.email, "to:", username);
        await updateUserDetail(username);
    }
  }

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      eyeRef.current.src = "eye.png";
    } else {
      passwordRef.current.type = "password";
      eyeRef.current.src = "eyecross.png";
    }
  };

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
    <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 min-h-screen flex items-center justify-center"
    style={{ background: "#0a1628" }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
  
      <div className="w-[460px] backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl shadow-2xl hover:shadow-green-200/40 transition-all duration-300">
        
        <div className="text-center text-3xl py-6 font-semibold border-b">
          Update Your Profile
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 p-8">

            {/* Read-only Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Cannot be changed)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full p-3 border border-green-500 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Update Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to update?
              </label>
              <select
                value={updateType}
                onChange={(e) => setUpdateType(e.target.value)}
                className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select an option</option>
                <option value="username">Update Username</option>
                <option value="password">Update Password</option>
              </select>
            </div>

            {/* Username Field - Show only if updating username */}
            {updateType === "username" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Username
                </label>
                <input
                  type="text"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            )}

            {/* Password Fields - Show only if updating password */}
            {updateType === "password" && (
              <>
                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
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
                    />
                  </span>
                </div>

                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     New Password
                  </label>
                  <input
                    ref={confirmPasswordRef}
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
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
                    />
                  </span>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={!updateType}
              className={`btn p-3 rounded-lg text-white font-semibold transition ${
                updateType
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-300 cursor-not-allowed"
              }`}
            >
              Update Profile
            </button>
          </div>

          {/* <div className="text-center text-sm pb-6">
            <span className="text-gray-600">Go back to </span>
            <Link
              to="/dashboard"
              className="text-blue-600 font-semibold hover:underline"
            >
              Dashboard
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default Dashboard
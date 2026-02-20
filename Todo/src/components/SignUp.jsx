import React, {useState, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    const ref = useRef()
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
    }

    // ✅ Your original logic — untouched
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password.length < 6){
            alert("Password must be at least 6 characters long!");
            return;
        }
        try {
            const response = await api.post("/users/register", {
                email,
                password,
                username
            });
            console.log('User signed up successfully:', response.data);
            navigate('/login');
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
        }
    }

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
                .signin-card {
                    position: relative;
                    z-index: 1;
                    animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .signin-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 10%; right: 10%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
                    border-radius: 2px;
                }
                .signin-input {
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
                .signin-input::placeholder { color: rgba(255,255,255,0.3); }
                .signin-input:focus {
                    border-color: rgba(0,210,150,0.5);
                    background: rgba(0,210,150,0.05);
                    box-shadow: 0 0 0 3px rgba(0,210,150,0.12);
                }
                .signin-btn {
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
                .signin-btn::after {
                    content: '';
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
                }
                .signin-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(0,210,150,0.45);
                }
                .signin-btn:active { transform: translateY(0); }
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
                    className="signin-card w-[420px] rounded-2xl p-10"
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
                            Create Account
                        </h1>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
                            Sign up to get started today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">

                            {/* Email */}
                            <div>
                                <label className="field-label">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="signin-input"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label className="field-label">Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="signin-input"
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
                                        className="signin-input"
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
                            <button type="submit" className="signin-btn">
                                Sign In
                            </button>

                        </div>

                        {/* Footer link */}
                        <div className="text-center text-sm mt-6">
                            <span style={{ color: "rgba(255,255,255,0.35)" }}>Already have an account? </span>
                            <Link
                                to="/login"
                                style={{ color: "#00d296", fontWeight: 600, textDecoration: "none" }}
                            >
                                Login
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
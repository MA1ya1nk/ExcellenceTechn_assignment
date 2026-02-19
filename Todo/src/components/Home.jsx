import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

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
        .home-content {
          position: relative;
          z-index: 1;
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .home-btn-primary {
          padding: 12px 32px;
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
        }
        .home-btn-primary::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .home-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,210,150,0.45);
        }
        .home-btn-primary:active { transform: translateY(0); }
        .home-btn-secondary {
          padding: 12px 32px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.75);
          font-weight: 600;
          font-size: 15px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .home-btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(0,210,150,0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .feature-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.10);
          padding: 32px;
          border-radius: 20px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-card:hover {
          border-color: rgba(0,210,150,0.25);
          background: rgba(255,255,255,0.10);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .feature-title {
          font-size: 19px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
        }
        .feature-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }
      `}</style>

      <section
        className="min-h-screen flex flex-col items-center text-center px-4 py-16 relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="home-content w-full flex flex-col items-center">

          {/* HERO */}
          <h2
            className="text-5xl font-extrabold leading-tight"
            style={{
              background: "linear-gradient(135deg, #00d296, #00a8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Secure Your Todo With Ease 
          </h2>

          <p
            className="max-w-xl mt-4 mb-10 text-lg"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Store, manage and protect your todos in one secure place.
            Simple, fast and encrypted.
          </p>

          {/* BUTTONS — ✅ Link + user check untouched */}
          <div className="flex gap-5 mb-16">
            <Link to="/signin">
              <button className="home-btn-primary">
                Get Started
              </button>
            </Link>

            {user && (
              <Link to="/todo">
                <button className="home-btn-secondary">
                  Your Todos
                </button>
              </Link>
            )}
          </div>

          {/* FEATURES */}
          <section className="max-w-6xl w-full grid md:grid-cols-3 gap-10">

            {/* CARD 1 */}
            <div className="feature-card">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="feature-title">Secure Storage</h3>
              <p className="feature-desc">
                Your data is encrypted and protected with industry-level security.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="feature-card">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="feature-title">Fast Access</h3>
              <p className="feature-desc">
                Access your saved todos instantly anytime, anywhere.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="feature-card">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="feature-title">Multi-Device</h3>
              <p className="feature-desc">
                Works beautifully across mobile, tablet and desktop devices.
              </p>
            </div>

          </section>
        </div>
      </section>
    </>
  );
}

export default Home;
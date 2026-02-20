import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return (
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .orb {
          position: fixed; border-radius: 50%;
          filter: blur(80px); opacity: 0.45;
          pointer-events: none; z-index: 0;
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
        .loader-card {
          position: relative; z-index: 1;
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
          display: flex; flex-direction: column;
          align-items: center; gap: 20px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px; padding: 48px 56px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        .loader-card::before {
          content: ''; position: absolute;
          top: 0; left: 10%; right: 10%; height: 2px;
          background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
        }
        .loader-spinner {
          width: 48px; height: 48px; border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.08);
          border-top-color: #00d296; border-right-color: #00a8ff;
          animation: spin 0.9s linear infinite;
        }
        .loader-title {
          font-size: 18px; font-weight: 700;
          background: linear-gradient(135deg, #00d296, #00a8ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .loader-sub {
          font-size: 12px; color: rgba(255,255,255,0.3);
          animation: pulse 1.8s ease-in-out infinite; margin-top: -12px;
        }
        .loader-dots { display: flex; gap: 6px; }
        .loader-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #00d296, #00a8ff);
          animation: pulse 1.4s ease-in-out infinite;
        }
        .loader-dot:nth-child(2) { animation-delay: 0.2s; }
        .loader-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#0a1628" }}>
        <div className="orb orb-1" /><div className="orb orb-2" />
        <div className="loader-card">
          <div className="loader-spinner" />
          <div className="loader-title">Checking Admin Access</div>
          <div className="loader-sub">Please wait a moment...</div>
          <div className="loader-dots">
            <div className="loader-dot" /><div className="loader-dot" /><div className="loader-dot" />
          </div>
        </div>
      </div>
    </>
  );

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/todo" replace />;

  return children;
};

export default AdminRoute;
import { useState } from "react";
import { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Todo = () => {
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
        .todo-page-title {
          font-size: 26px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
          margin-top: 8px;
          background: linear-gradient(135deg, #00d296, #00a8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .todo-count {
          text-align: center;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin-top: -16px;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
        }
        .todo-empty {
          text-align: center;
          padding: 48px 0;
          color: rgba(255,255,255,0.2);
          font-size: 14px;
        }
        .todo-empty-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Form Section */}
        <div
          className="w-full max-w-2xl mx-auto px-4 py-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className="todo-page-title">Manage Your Todos</h1>
          <p className="todo-count">
            {(user?.todos || []).length} task{(user?.todos || []).length !== 1 ? "s" : ""} total
          </p>
          <TodoForm />
        </div>

        {/* Todos Grid */}
        <div
          className="w-full max-w-7xl mx-auto px-4 pb-12"
          style={{ position: "relative", zIndex: 1 }}
        >
          {(user?.todos || []).length === 0 ? (
            <div className="todo-empty">
              <div className="todo-empty-icon">📋</div>
              <p>No todos yet. Add your first one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {(user?.todos || []).map((todo) => (
                // ✅ key changed from todo to todo.id
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Todo;
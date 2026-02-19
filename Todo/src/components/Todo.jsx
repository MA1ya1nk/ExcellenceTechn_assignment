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
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900"
      style={{ background: "#0a1628" }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          
        </div>
        <div className="w-full max-w-7xl mx-auto shadow-md rounded-lg px-4 py-3 text-white mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {user.todos.map((todo) => (
              <div key={todo}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>  
      </div>
    </>
  );
};

export default Todo;

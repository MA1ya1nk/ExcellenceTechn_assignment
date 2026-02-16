import { useState } from 'react'
import { useEffect } from 'react';
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Todo = () => {
    
     const { user } = useContext(AuthContext);

  
  //   useEffect(() => {
    
  //   const storedTodos = JSON.parse(localStorage.getItem("todos"));
  //   if(storedTodos && storedTodos.length>0) setTodos(storedTodos)
  // }, [])
  
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }, [todos])
  
  return (
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        
                        {user.todos.map((todo) => (  
                          <div key={todo}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />  
                          </div>
                        ))}
                    </div>
                </div>
            </div>
  );
};

export default Todo;

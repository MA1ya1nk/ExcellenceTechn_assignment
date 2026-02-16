import React, {useState} from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";




const TodoItem = ({todo}) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)  
    const { user, addTodo, delTodo,  setEditingTodo } = useContext(AuthContext);
    
    
    const editTodo = () => {
      setEditingTodo(todo);    
       delTodo(todo);
    }

    
  return (
    <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black`}
      >
          
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg `}
              value={todo}
              
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          
              <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => editTodo(todo)}
          >
              📁
          </button>
        
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => delTodo(todo)}
          >
              ❌
          </button>
      </div>
  )
}

export default TodoItem
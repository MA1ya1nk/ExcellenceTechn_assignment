import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { user, addTodo, delTodo, setEditingTodo } = useContext(AuthContext);

  const editTodo = () => {
    setEditingTodo(todo);
    delTodo(todo);
  };

  return (
   <div
  className="
    flex items-start
    h-24 w-full
    bg-cyan-50
    rounded-xl
    border border-gray-200
    shadow-md hover:shadow-lg
    px-4 py-3 gap-3
    transition-all duration-200
  "
>

{/* <div
  className="
    flex items-start
    h-24 w-full
    bg-white
    rounded-xl
    border border-gray-200
    shadow-md

    px-4 py-3 gap-3
    
    transition-all duration-300
    
    hover:scale-310
    hover:-translate-y-2
    hover:shadow-2xl
    hover:z-10
  "
></div> */}

  {/* Todo Text */}
  <textarea
    className="
      flex-1
      bg-transparent
      outline-none
      text-gray-800
      text-sm
      resize-none
      leading-relaxed
      
      h-full
      overflow-y-auto
    "
    value={todo}
    readOnly={!isTodoEditable}
  />

  {/* Buttons Column */}
  <div className="flex flex-col gap-2">
    
    {/* Edit */}
    <button
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-lg
        bg-blue-50 text-blue-600
        hover:bg-blue-100 hover:scale-110
        transition
      "
      onClick={() => editTodo(todo)}
    >
      <FiEdit size={18} />
    </button>

    {/* Delete */}
    <button
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-lg
        bg-red-50 text-red-600
        hover:bg-red-100 hover:scale-110
        transition
      "
      onClick={() => delTodo(todo)}
    >
      <FiTrash2 size={18} />
    </button>

  </div>
</div>

  );
};

export default TodoItem;

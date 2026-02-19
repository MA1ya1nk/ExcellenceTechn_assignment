import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { user, addTodo, delTodo, setEditingTodo } = useContext(AuthContext);

  // ✅ Your original logic — untouched
  const editTodo = () => {
    setEditingTodo(todo);
    delTodo(todo);
  };

  return (
    <>
      <style>{`
        .todo-item {
          display: flex;
          align-items: flex-start;
          height: 96px;
          width: 100%;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px;
          padding: 12px 16px;
          gap: 12px;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .todo-item::before {
          content: '';
          position: absolute;
          left: 0; top: 15%; bottom: 15%;
          width: 2px;
          background: linear-gradient(180deg, #00d296, #00a8ff);
          border-radius: 2px;
        }
        .todo-item:hover {
          border-color: rgba(0,210,150,0.3);
          background: rgba(255,255,255,0.10);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,210,150,0.15);
          transform: translateY(-2px);
        }
        .todo-textarea {
          flex: 1;
          background: transparent;
          outline: none;
          color: rgba(255,255,255,0.85);
          font-size: 13.5px;
          resize: none;
          line-height: 1.6;
          height: 100%;
          overflow-y: auto;
          font-family: inherit;
        }
        .todo-textarea::-webkit-scrollbar { width: 3px; }
        .todo-textarea::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        .todo-btn-edit {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(0,168,255,0.25);
          background: rgba(0,168,255,0.10);
          color: #00a8ff;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .todo-btn-edit:hover {
          background: rgba(0,168,255,0.22);
          border-color: rgba(0,168,255,0.5);
          transform: scale(1.1);
        }
        .todo-btn-delete {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255,80,80,0.25);
          background: rgba(255,80,80,0.10);
          color: #ff6060;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .todo-btn-delete:hover {
          background: rgba(255,80,80,0.22);
          border-color: rgba(255,80,80,0.5);
          transform: scale(1.1);
        }
      `}</style>

      <div className="todo-item">

        {/* Todo Text — ✅ value and readOnly untouched */}
        <textarea
          className="todo-textarea"
          value={todo}
          readOnly={!isTodoEditable}
        />

        {/* Buttons Column */}
        <div className="flex flex-col gap-2">

          {/* Edit — ✅ onClick untouched */}
          <button
            className="todo-btn-edit"
            onClick={() => editTodo(todo)}
          >
            <FiEdit size={16} />
          </button>

          {/* Delete — ✅ onClick untouched */}
          <button
            className="todo-btn-delete"
            onClick={() => delTodo(todo)}
          >
            <FiTrash2 size={16} />
          </button>

        </div>
      </div>
    </>
  );
};

export default TodoItem;
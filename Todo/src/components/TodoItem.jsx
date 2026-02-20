import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const { user, setUser, editTodo, delTodo } = useContext(AuthContext);

  const priorityColor = {
    low:    { border: "#00d296", bg: "rgba(0,210,150,0.1)",  text: "#00d296",  label: "🟢 Low"    },
    medium: { border: "#f59e0b", bg: "rgba(245,158,11,0.1)", text: "#f59e0b",  label: "🟡 Medium" },
    high:   { border: "#ff6060", bg: "rgba(255,80,80,0.1)",  text: "#ff6060",  label: "🔴 High"   },
  };

  const handleEditClick = async () => {
    if (isTodoEditable) {
      // ✅ Your original editTodo call — updated for new schema
      await editTodo({
        id: todo.id,
        title,
        description,
        priority,
      });
      setIsTodoEditable(false);
    } else {
      setIsTodoEditable(true);
    }
  };

  return (
    <>
      <style>{`
        .todo-item {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px;
          padding: 14px 16px;
          gap: 8px;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .todo-item::before {
          content: '';
          position: absolute;
          left: 0; top: 10%; bottom: 10%;
          width: 3px;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .todo-item:hover {
          background: rgba(255,255,255,0.10);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .todo-item.editing {
          box-shadow: 0 0 0 2px rgba(0,210,150,0.2);
          transform: translateY(-2px);
        }
        .todo-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .todo-title-input {
          flex: 1;
          background: transparent;
          outline: none;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          font-weight: 600;
          border: none;
          font-family: inherit;
          cursor: default;
          padding: 0;
        }
        .todo-title-input.editable {
          border-bottom: 1px solid rgba(0,210,150,0.4);
          cursor: text;
          caret-color: #00d296;
          padding-bottom: 2px;
        }
        .todo-desc-input {
          width: 100%;
          background: transparent;
          outline: none;
          color: rgba(255,255,255,0.5);
          font-size: 12.5px;
          border: none;
          font-family: inherit;
          cursor: default;
          resize: none;
          padding: 0;
          line-height: 1.5;
        }
        .todo-desc-input.editable {
          border-bottom: 1px solid rgba(0,210,150,0.3);
          cursor: text;
          caret-color: #00d296;
          color: rgba(255,255,255,0.75);
          padding-bottom: 2px;
        }
        .todo-desc-input::-webkit-scrollbar { width: 3px; }
        .todo-desc-input::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
        }
        .priority-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 99px;
          border: 1px solid;
          letter-spacing: 0.4px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .todo-priority-select {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 99px;
          border: 1px solid rgba(0,210,150,0.4);
          background: rgba(0,210,150,0.1);
          color: #00d296;
          outline: none;
          cursor: pointer;
          font-family: inherit;
        }
        .todo-priority-select option { background: #141927; color: white; }
        .todo-btn-edit {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
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
        .todo-btn-save {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(0,210,150,0.4);
          background: rgba(0,210,150,0.15);
          color: #00d296;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .todo-btn-save:hover {
          background: rgba(0,210,150,0.28);
          border-color: rgba(0,210,150,0.7);
          transform: scale(1.1);
        }
        .todo-btn-delete {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
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

      <div
        className={`todo-item ${isTodoEditable ? "editing" : ""}`}
        style={{
          borderLeftColor: priorityColor[priority]?.border,
          borderLeftWidth: 3,
        }}
      >

        {/* Top Row — Title + Priority + Buttons */}
        <div className="todo-top-row">

          {/* Title */}
          <input
            type="text"
            className={`todo-title-input ${isTodoEditable ? "editable" : ""}`}
            value={title}
            readOnly={!isTodoEditable}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Priority — badge when viewing, select when editing */}
          {isTodoEditable ? (
            <select
              className="todo-priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          ) : (
            <span
              className="priority-badge"
              style={{
                color: priorityColor[priority]?.text,
                borderColor: priorityColor[priority]?.border,
                background: priorityColor[priority]?.bg,
              }}
            >
              {priorityColor[priority]?.label}
            </span>
          )}

          {/* Edit / Save + Delete */}
          <div className="flex gap-1">
            {isTodoEditable ? (
              <button className="todo-btn-save" onClick={handleEditClick}>
                <FiCheck size={14} />
              </button>
            ) : (
              <button className="todo-btn-edit" onClick={handleEditClick}>
                <FiEdit size={14} />
              </button>
            )}
            {/* ✅ Delete — untouched */}
            <button
              className="todo-btn-delete"
              onClick={() => delTodo(todo.id)}
            >
              <FiTrash2 size={14} />
            </button>
          </div>

        </div>

        {/* Description */}
        <textarea
          className={`todo-desc-input ${isTodoEditable ? "editable" : ""}`}
          value={description}
          readOnly={!isTodoEditable}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />

      </div>
    </>
  );
};

export default TodoItem;
import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const { user, addTodo, setEditingTodo, editingTodo } = useContext(AuthContext);

  // ✅ Your original logic — untouched
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setPriority(editingTodo.priority);
    }
  }, [editingTodo]);

  // ✅ Your original logic — untouched
  const add = async (e) => {
    e.preventDefault();
    if (title.length > 0 && description.length > 0) {
      await addTodo({
        id: editingTodo?.id || uuidv4(),
        title,
        description,
        priority,
      });
      setTitle("");
      setDescription("");
      setPriority("low");
      setEditingTodo("");
    } else {
      console.error("Error: Todo not added!");
    }
  };

  return (
    <>
      <style>{`
        .todo-form-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .todo-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
          border-radius: 2px;
        }
        .todo-form-input {
          width: 100%;
          padding: 11px 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .todo-form-input::placeholder { color: rgba(255,255,255,0.3); }
        .todo-form-input:focus {
          border-color: rgba(0,210,150,0.5);
          background: rgba(0,210,150,0.05);
          box-shadow: 0 0 0 3px rgba(0,210,150,0.12);
        }
        .todo-form-select {
          width: 100%;
          padding: 11px 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          appearance: none;
          cursor: pointer;
          font-family: inherit;
        }
        .todo-form-select:focus {
          border-color: rgba(0,210,150,0.5);
          background: rgba(0,210,150,0.05);
          box-shadow: 0 0 0 3px rgba(0,210,150,0.12);
        }
        .todo-form-select option { background: #141927; color: white; }
        .todo-form-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 6px;
        }
        .todo-form-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #00d296 0%, #00a8ff 100%);
          color: #071014;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.3px;
        }
        .todo-form-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .todo-form-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,210,150,0.4);
        }
        .todo-form-btn:active { transform: translateY(0); }
        .priority-low   { border-left: 3px solid #00d296; }
        .priority-medium { border-left: 3px solid #f59e0b; }
        .priority-high  { border-left: 3px solid #ff6060; }
      `}</style>

      <form onSubmit={add} className="todo-form-card">

        <div className="flex flex-col gap-4">

          {/* Title */}
          <div>
            <label className="todo-form-label">Title</label>
            <input
              type="text"
              placeholder="Todo title..."
              className={`todo-form-input ${
                priority === "low" ? "priority-low" :
                priority === "medium" ? "priority-medium" :
                "priority-high"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="todo-form-label">Description</label>
            <textarea
              placeholder="Todo description..."
              className="todo-form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ resize: "none" }}
            />
          </div>

          {/* Priority */}
          <div>
            <label className="todo-form-label">Priority</label>
            <select
              className="todo-form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="todo-form-btn">
            {editingTodo ? "Update Todo" : "Add Todo"}
          </button>

        </div>
      </form>
    </>
  );
};

export default TodoForm;
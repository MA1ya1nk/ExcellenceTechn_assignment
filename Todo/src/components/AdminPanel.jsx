import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiShieldUserLine } from "react-icons/ri";
import { FiTrash2, FiUsers, FiList, FiShield } from "react-icons/fi";

const AdminPanel = () => {
  const { getAdminStats, getAllUsers, deleteAnyUser, updateUserRole, deleteAnyTodo } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [statsData, usersData] = await Promise.all([
        getAdminStats(),
        getAllUsers(),
      ]);
      setStats(statsData);
      setUsers(usersData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteAnyUser(userId);
    setUsers(prev => prev.filter(u => u._id !== userId));
  };

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
  };

  const handleDeleteTodo = async (userId, todoId) => {
    await deleteAnyTodo(userId, todoId);
    setUsers(prev => prev.map(u =>
      u._id === userId
        ? { ...u, todos: u.todos.filter(t => t.id !== todoId) }
        : u
    ));
  };

  const priorityColor = {
    low:    "#00d296",
    medium: "#f59e0b",
    high:   "#ff6060",
  };

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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
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
        .admin-content {
          position: relative; z-index: 1;
          animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .admin-title {
          font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, #ffb400, #ff6060);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; letter-spacing: -0.5px;
        }
        .admin-sub {
          font-size: 13px; color: rgba(255,255,255,0.35); margin-top: 4px;
        }
        .stat-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px; padding: 20px 24px;
          display: flex; align-items: center; gap: 16px;
          transition: all 0.2s;
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.10);
          transform: translateY(-2px);
        }
        .stat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .stat-value {
          font-size: 26px; font-weight: 800; color: white; line-height: 1;
        }
        .stat-label {
          font-size: 11px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-top: 4px;
        }
        .section-title {
          font-size: 14px; font-weight: 700;
          color: rgba(255,255,255,0.6);
          letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .user-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px; overflow: hidden;
          transition: all 0.2s;
        }
        .user-card:hover { border-color: rgba(255,180,0,0.2); }
        .user-row {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 14px 18px; gap: 12px; flex-wrap: wrap;
        }
        .user-email {
          font-size: 14px; color: rgba(255,255,255,0.85);
          font-weight: 500;
        }
        .user-name {
          font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 2px;
        }
        .user-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .role-badge {
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: 99px; letter-spacing: 0.5px;
        }
        .role-admin {
          background: rgba(255,180,0,0.12);
          border: 1px solid rgba(255,180,0,0.35);
          color: #ffb400;
        }
        .role-user {
          background: rgba(0,168,255,0.1);
          border: 1px solid rgba(0,168,255,0.3);
          color: #00a8ff;
        }
        .admin-btn {
          height: 30px; padding: 0 12px; border-radius: 8px;
          font-size: 12px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 5px;
          transition: all 0.2s; border: 1px solid;
        }
        .btn-promote {
          background: rgba(255,180,0,0.08);
          border-color: rgba(255,180,0,0.3); color: #ffb400;
        }
        .btn-promote:hover {
          background: rgba(255,180,0,0.18);
          border-color: rgba(255,180,0,0.6);
        }
        .btn-demote {
          background: rgba(0,168,255,0.08);
          border-color: rgba(0,168,255,0.3); color: #00a8ff;
        }
        .btn-demote:hover {
          background: rgba(0,168,255,0.18);
          border-color: rgba(0,168,255,0.6);
        }
        .btn-delete-user {
          background: rgba(255,80,80,0.08);
          border-color: rgba(255,80,80,0.3); color: #ff6060;
        }
        .btn-delete-user:hover {
          background: rgba(255,80,80,0.18);
          border-color: rgba(255,80,80,0.6);
        }
        .btn-expand {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.5);
          font-size: 11px;
        }
        .btn-expand:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .todos-section {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 12px 18px; display: flex; flex-direction: column; gap: 8px;
        }
        .todo-row {
          display: flex; align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.04);
          border-radius: 8px; padding: 8px 12px; gap: 8px;
        }
        .todo-title-text {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.8);
        }
        .todo-desc-text {
          font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 2px;
        }
        .todo-priority {
          font-size: 10px; font-weight: 700; padding: 2px 8px;
          border-radius: 99px; letter-spacing: 0.5px; flex-shrink: 0;
        }
        .btn-delete-todo {
          width: 28px; height: 28px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.25); color: #ff6060;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .btn-delete-todo:hover {
          background: rgba(255,80,80,0.2);
          border-color: rgba(255,80,80,0.5);
          transform: scale(1.1);
        }
        .empty-todos {
          font-size: 12px; color: rgba(255,255,255,0.2);
          text-align: center; padding: 8px 0;
        }
        .admin-spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.08);
          border-top-color: #ffb400;
          animation: spin 0.9s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="admin-content max-w-5xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <RiShieldUserLine size={32} color="#ffb400" />
            <div>
              <div className="admin-title">Admin Panel</div>
              <div className="admin-sub">Manage users, roles and todos</div>
            </div>
          </div>

          {loading ? (
            <div style={{ paddingTop: 80 }}>
              <div className="admin-spinner" />
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", marginTop: 16, fontSize: 13 }}>
                Loading admin data...
              </p>
            </div>
          ) : (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: "rgba(0,210,150,0.1)" }}>
                    <FiUsers size={20} color="#00d296" />
                  </div>
                  <div>
                    <div className="stat-value">{stats?.totalUsers ?? 0}</div>
                    <div className="stat-label">Total Users</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: "rgba(255,180,0,0.1)" }}>
                    <RiShieldUserLine size={20} color="#ffb400" />
                  </div>
                  <div>
                    <div className="stat-value">{stats?.totalAdmins ?? 0}</div>
                    <div className="stat-label">Admins</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: "rgba(0,168,255,0.1)" }}>
                    <FiShield size={20} color="#00a8ff" />
                  </div>
                  <div>
                    <div className="stat-value">{stats?.totalRegularUsers ?? 0}</div>
                    <div className="stat-label">Regular Users</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: "rgba(255,96,96,0.1)" }}>
                    <FiList size={20} color="#ff6060" />
                  </div>
                  <div>
                    <div className="stat-value">{stats?.totalTodos ?? 0}</div>
                    <div className="stat-label">Total Todos</div>
                  </div>
                </div>
              </div>

              {/* Users List */}
              <div className="section-title">
                <FiUsers size={14} />
                All Users ({users.length})
              </div>

              <div className="flex flex-col gap-3">
                {users.map((u) => (
                  <div key={u._id} className="user-card">

                    {/* User Row */}
                    <div className="user-row">
                      <div>
                        <div className="user-email">{u.email}</div>
                        <div className="user-name">@{u.username}</div>
                      </div>

                      <div className="user-actions">
                        {/* Role Badge */}
                        <span className={`role-badge ${u.role === "admin" ? "role-admin" : "role-user"}`}>
                          {u.role === "admin" ? "⭐ Admin" : "👤 User"}
                        </span>

                        {/* Promote / Demote */}
                        {u.role !== "admin" ? (
                          <button
                            className="admin-btn btn-promote"
                            onClick={() => handleRoleChange(u._id, "admin")}
                          >
                            ⭐ Promote
                          </button>
                        ) : (
                          <button
                            className="admin-btn btn-demote"
                            onClick={() => handleRoleChange(u._id, "user")}
                          >
                            👤 Demote
                          </button>
                        )}

                        {/* Expand todos */}
                        <button
                          className="admin-btn btn-expand"
                          onClick={() => setExpandedUser(expandedUser === u._id ? null : u._id)}
                        >
                          {expandedUser === u._id ? "▲ Hide" : `▼ Todos (${u.todos?.length || 0})`}
                        </button>

                        {/* Delete user */}
                        <button
                          className="admin-btn btn-delete-user"
                          onClick={() => handleDeleteUser(u._id)}
                        >
                          <FiTrash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>

                    {/* Todos Dropdown */}
                    {expandedUser === u._id && (
                      <div className="todos-section">
                        {(u.todos || []).length === 0 ? (
                          <div className="empty-todos">No todos yet</div>
                        ) : (
                          (u.todos || []).map((todo) => (
                            <div key={todo.id} className="todo-row">
                              <div style={{ flex: 1 }}>
                                <div className="todo-title-text">{todo.title}</div>
                                <div className="todo-desc-text">{todo.description}</div>
                              </div>
                              <span
                                className="todo-priority"
                                style={{
                                  color: priorityColor[todo.priority],
                                  background: `${priorityColor[todo.priority]}18`,
                                  border: `1px solid ${priorityColor[todo.priority]}44`,
                                }}
                              >
                                {todo.priority?.toUpperCase()}
                              </span>
                              <button
                                className="btn-delete-todo"
                                onClick={() => handleDeleteTodo(u._id, todo.id)}
                              >
                                <FiTrash2 size={12} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
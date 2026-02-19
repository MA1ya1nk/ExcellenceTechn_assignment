import React, {useEffect} from "react";
import { FaLock } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  
  return (
    <>
    
    <nav className="bg-[#0a1f1f]/90 border-b border-teal-900/50 text-white navbar-slide-in">
  <div className="mycontainer flex justify-between items-center px-4 h-14">

    <Link to="/">
      <div className="logo font-bold text-2xl">
        Todo
      </div>
    </Link>

    <div className="flex items-center">

      

      {!user && (
        <Link to="/signin">
          <button className="btn h-8 mx-2 px-3 py-1 rounded-full ring-1 ring-white cursor-pointer flex items-center gap-2 ">
            <FaLock size={14} />
            Sign In
          </button>
        </Link>
      )}

      {user && (
        <button
          onClick={logout}
          className="btn h-8 mx-2 px-3 py-1 rounded-full ring-1 ring-white cursor-pointer flex items-center gap-2 "
        >
          <HiOutlineLogout size={18} />
  Sign Out
        </button>
      )}
      {user && (
        <Link to="/dashboard">
        <button
          className="btn h-8 mx-2 px-3 py-1 rounded-full ring-1 ring-white cursor-pointer flex items-center gap-2 "
        >
           <HiOutlineViewGrid size={18} />
    Dashboard
        </button>
        </Link>
      )}

    </div>
  </div>
</nav>

</>

  );
};

export default Navbar;


// import React, { useState } from "react";
// import { FaLock } from "react-icons/fa";
// import { HiOutlineLogout } from "react-icons/hi";
// import { HiOutlineViewGrid } from "react-icons/hi";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const { logout, user } = useContext(AuthContext);
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       <style>{`
//         .navbar-root {
//           background: rgba(10, 22, 40, 0.85);
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           border-bottom: 1px solid rgba(255,255,255,0.07);
//           color: white;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           width: 100%;
//         }
//         .navbar-root::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 5%; right: 5%;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
//           opacity: 0.5;
//         }
//         .nav-logo {
//           font-size: 22px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #00d296, #00a8ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           letter-spacing: -0.5px;
//           text-decoration: none;
//         }
//         .nav-btn {
//           height: 34px;
//           padding: 0 14px;
//           border-radius: 99px;
//           border: 1px solid rgba(255,255,255,0.15);
//           background: rgba(255,255,255,0.06);
//           color: rgba(255,255,255,0.8);
//           font-size: 13px;
//           font-weight: 500;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           transition: all 0.2s;
//           text-decoration: none;
//           white-space: nowrap;
//         }
//         .nav-btn:hover {
//           background: rgba(255,255,255,0.12);
//           border-color: rgba(0,210,150,0.4);
//           color: white;
//         }
//         .nav-btn-primary {
//           height: 34px;
//           padding: 0 16px;
//           border-radius: 99px;
//           border: none;
//           background: linear-gradient(135deg, #00d296, #00a8ff);
//           color: #071014;
//           font-size: 13px;
//           font-weight: 700;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           transition: all 0.2s;
//           text-decoration: none;
//         }
//         .nav-btn-primary:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 4px 16px rgba(0,210,150,0.4);
//         }
//         .nav-active {
//           border-color: rgba(0,210,150,0.5);
//           color: #00d296;
//           background: rgba(0,210,150,0.08);
//         }
//         .nav-greeting {
//           font-size: 12px;
//           color: rgba(255,255,255,0.35);
//           padding: 0 8px;
//           border-right: 1px solid rgba(255,255,255,0.1);
//           margin-right: 4px;
//         }
//         .nav-greeting span {
//           color: #00d296;
//           font-weight: 600;
//         }
//         .hamburger {
//           display: none;
//           flex-direction: column;
//           gap: 4px;
//           cursor: pointer;
//           padding: 4px;
//           background: none;
//           border: none;
//         }
//         .hamburger span {
//           display: block;
//           width: 20px;
//           height: 2px;
//           background: rgba(255,255,255,0.7);
//           border-radius: 2px;
//           transition: all 0.2s;
//         }
//         .mobile-menu {
//           display: none;
//           flex-direction: column;
//           gap: 8px;
//           padding: 12px 16px 16px;
//           border-top: 1px solid rgba(255,255,255,0.07);
//         }
//         @media (max-width: 640px) {
//           .nav-desktop-btns { display: none; }
//           .hamburger { display: flex; }
//           .mobile-menu { display: flex; }
//         }
//       `}</style>

//       <nav className="navbar-root">
//         <div className="flex justify-between items-center px-6 h-14">

//           {/* Logo */}
//           <Link to="/" className="nav-logo">
//             ✦ Todo
//           </Link>

//           {/* Desktop Buttons */}
//           <div className="nav-desktop-btns flex items-center gap-2">

//             {/* Greeting if logged in */}
//             {user && (
//               <span className="nav-greeting">
//                 Hey, <span>{user.username || "User"}</span>
//               </span>
//             )}

//             {/* Not logged in — show Sign In */}
//             {!user && (
//               <Link to="/signin">
//                 <button className="nav-btn-primary">
//                   <FaLock size={12} />
//                   Sign In
//                 </button>
//               </Link>
//             )}

//             {/* Logged in — Home link */}
//             {user && (
//               <Link to="/">
//                 <button className={`nav-btn ${location.pathname === "/" ? "nav-active" : ""}`}>
//                   🏠 Home
//                 </button>
//               </Link>
//             )}

//             {/* Logged in — Todos link */}
//             {user && (
//               <Link to="/todo">
//                 <button className={`nav-btn ${location.pathname === "/todo" ? "nav-active" : ""}`}>
//                   📋 Todos
//                 </button>
//               </Link>
//             )}

//             {/* Logged in — Dashboard */}
//             {user && (
//               <Link to="/dashboard">
//                 <button className={`nav-btn ${location.pathname === "/dashboard" ? "nav-active" : ""}`}>
//                   <HiOutlineViewGrid size={15} />
//                   Dashboard
//                 </button>
//               </Link>
//             )}

//             {/* Logged in — Sign Out */}
//             {user && (
//               <button onClick={logout} className="nav-btn">
//                 <HiOutlineLogout size={15} />
//                 Sign Out
//               </button>
//             )}

//           </div>

//           {/* Hamburger for mobile */}
//           <button
//             className="hamburger"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span />
//             <span />
//             <span />
//           </button>

//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="mobile-menu">
//             {user && (
//               <span className="nav-greeting" style={{ borderRight: "none" }}>
//                 Hey, <span>{user.username || "User"}</span>
//               </span>
//             )}
//             {!user && (
//               <Link to="/signin" onClick={() => setMenuOpen(false)}>
//                 <button className="nav-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
//                   <FaLock size={12} /> Sign In
//                 </button>
//               </Link>
//             )}
//             {user && (
//               <Link to="/" onClick={() => setMenuOpen(false)}>
//                 <button className="nav-btn" style={{ width: "100%", justifyContent: "center" }}>🏠 Home</button>
//               </Link>
//             )}
//             {user && (
//               <Link to="/todo" onClick={() => setMenuOpen(false)}>
//                 <button className="nav-btn" style={{ width: "100%", justifyContent: "center" }}>📋 Todos</button>
//               </Link>
//             )}
//             {user && (
//               <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
//                 <button className="nav-btn" style={{ width: "100%", justifyContent: "center" }}>
//                   <HiOutlineViewGrid size={15} /> Dashboard
//                 </button>
//               </Link>
//             )}
//             {user && (
//               <button onClick={() => { logout(); setMenuOpen(false); }} className="nav-btn" style={{ width: "100%", justifyContent: "center" }}>
//                 <HiOutlineLogout size={15} /> Sign Out
//               </button>
//             )}
//           </div>
//         )}

//       </nav>
//     </>
//   );
// };

// export default Navbar;
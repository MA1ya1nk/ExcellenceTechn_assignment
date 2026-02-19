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
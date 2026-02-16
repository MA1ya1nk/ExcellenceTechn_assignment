import React, {useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  
  return (
    <nav className="bg-slate-800 text-white">
  <div className="mycontainer flex justify-between items-center px-4 h-14">

    <Link to="/">
      <div className="logo font-bold text-2xl">
        Todo
      </div>
    </Link>

    <div className="flex items-center">

      

      {!user && (
        <Link to="/signin">
          <button className="bg-green-700 mx-2 px-3 py-1 rounded-full ring-1 ring-white">
            🔐 Sign In
          </button>
        </Link>
      )}

      {user && (
        <button
          onClick={logout}
          className="bg-green-700 mx-2 px-3 py-1 rounded-full ring-1 ring-white"
        >
          🔐 Sign Out
        </button>
      )}

    </div>
  </div>
</nav>

  );
};

export default Navbar;
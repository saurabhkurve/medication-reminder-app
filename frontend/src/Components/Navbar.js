import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    history.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Medication Reminder App</div>
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-semibold animate-pulse px-3 py-1 rounded-full ${role === "admin" ? "bg-red-700 text-white" : "bg-green-700 text-white"}`}>
            {role === "admin" ? "Admin" : "User"}
          </span>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
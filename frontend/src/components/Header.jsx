import { useState } from "react";
import { NavLink } from 'react-router';
import axios from "axios";

export default function NavHorizontal() {

  async function logout() {
    try {
      // Clear local access token
      localStorage.removeItem("access_token");

      // Redirect user to login page
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  const navItems = [
    { name: "Polls", href: "/all_polls" },
    { name: "My Polls", href: "/my_polls" },
    { name: "Create Poll", href: "/create_poll" },
  ];

  return (
    <div className="p-4 w-full bg-black">
      <nav className="bg-black border border-zinc-800 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <div className="ml-6 flex space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${isActive
                      ? "bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent scale-110"
                      : "text-gray-400 hover:text-gray-300"
                      }`}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <button
                onClick={logout}
                  className="px-2 py-2 ml-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200"
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

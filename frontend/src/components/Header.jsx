import { useState } from "react";
import {NavLink} from 'react-router';

export default function NavHorizontal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Polls", href: "/polls"},
    { name: "My Polls", href: "/my_polls"},
    { name: "Create Poll", href: "/create_poll"},
  ];

  return (
    <div className="p-8 w-full bg-white dark:bg-black">
      <nav className="bg-black border border-zinc-800 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <div className="ml-6 flex space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({isActive})=> `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-orange-600 border-b-2 border-orange-500"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

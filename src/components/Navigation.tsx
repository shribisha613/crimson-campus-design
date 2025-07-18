import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Folder, Users, UserCheck, Plus } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/draft-plans", label: "Draft Plans", icon: Folder },
    { path: "/students", label: "Student Management", icon: Users },
    { path: "/invigilators", label: "Invigilator Management", icon: UserCheck },
  ];

  return (
    <nav className="bg-white w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Navigation Links */}
          <div className="w-full overflow-x-auto">
            <div className="flex space-x-4 md:space-x-8 min-w-max">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 py-2 px-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ease-in-out ${
                      isActive
                        ? "border-red-800 text-red-800"
                        : "border-transparent text-gray-600 hover:text-red-800 hover:border-red-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          {!location.pathname.startsWith("/create-exam") && (
            <div className="flex justify-start md:justify-end">
              <Link to="/create-exam">
                <button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2 text-sm font-medium transition duration-200 ease-in-out whitespace-nowrap">
                  <Plus className="w-5 h-5" />
                  Create New Exam Plan
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

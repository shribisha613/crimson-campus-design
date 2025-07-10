
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  UserCheck, 
  MapPin, 
  BarChart3,
  Folder
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/exam-plans', label: 'Exam Plans', icon: FileText },
    { path: '/draft-plans', label: 'Draft Plans', icon: Folder },
    { path: '/students', label: 'Student Management', icon: Users },
    { path: '/invigilators', label: 'Manage Invigilators', icon: UserCheck },
    { path: '/rooms', label: 'Rooms', icon: MapPin },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 py-4 px-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-red-800 text-red-800'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

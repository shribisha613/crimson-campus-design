
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Plus, User, LogOut } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-red-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">RTE</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">RTE Exam Seat Allocation System</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/create-exam">
              <Button className="bg-red-800 hover:bg-red-900">
                <Plus className="w-4 h-4 mr-2" />
                Create New Exam Plan
              </Button>
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-red-100 text-red-800">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-gray-700">Admin</span>
            </div>

            {/* Logout Button */}
            <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

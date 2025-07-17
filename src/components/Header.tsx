import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center shadow text-white font-bold text-base">
              RTE
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              RTE Exam Seat Allocation System
            </h1>
          </div>

          {/* Admin Profile and Logout */}
          <div className="flex items-center gap-4">
            
            <Button
              variant="ghost"
              className="text-gray-700 hover:bg-gray-100 transition"
            >
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

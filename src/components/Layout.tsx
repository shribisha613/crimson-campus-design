import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main>
        <Outlet /> {/* Renders the nested route component */}
      </main>
    </div>
  );
};

export default Layout;
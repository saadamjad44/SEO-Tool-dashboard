import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">SEO Tools Dashboard</h1>
        <p className="text-blue-100">Analyze your content for search engine optimization - all in your browser</p>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { Music2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Music2 className="h-8 w-8" />
            <span className="text-xl font-bold">SongRecommender</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-purple-200 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-purple-200 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-purple-200 transition-colors">Contact</Link>
          </div>

          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
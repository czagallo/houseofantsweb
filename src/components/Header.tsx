import React from 'react';
import { ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-white/95 via-lime-50/95 to-emerald-50/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-lime-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="currentColor">
                <ellipse cx="16" cy="20" rx="3" ry="6" />
                <circle cx="16" cy="10" r="4" />
                <ellipse cx="16" cy="15" rx="2.5" ry="3" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 bg-clip-text text-transparent">
                House of Ants
              </h1>
              <p className="text-sm text-gray-600">24/7 Colony Stream</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'home'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('blog')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'blog'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => onPageChange('antypedia')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'antypedia'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
              }`}
            >
              Antypedia
            </button>
            <button
              onClick={() => onPageChange('formicarium')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'formicarium'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
              }`}
            >
              Monitor
            </button>
            <button
              onClick={() => onPageChange('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'admin'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
              }`}
            >
              Admin
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-lime-100 to-green-100 px-4 py-2 rounded-full shadow-md">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">LIVE</span>
            </div>
            <a 
              href="https://www.youtube.com/watch?v=SVeMHqWQ8og" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-4 h-4" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-4">
          <button
            onClick={() => onPageChange('home')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentPage === 'home'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onPageChange('blog')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentPage === 'blog'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => onPageChange('antypedia')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentPage === 'antypedia'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
            }`}
          >
            Antypedia
          </button>
          <button
            onClick={() => onPageChange('admin')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentPage === 'admin'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:text-green-700'
            }`}
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
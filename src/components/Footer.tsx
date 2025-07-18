import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 via-emerald-900 to-green-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
                <ellipse cx="16" cy="20" rx="3" ry="6" />
                <circle cx="16" cy="10" r="4" />
                <ellipse cx="16" cy="15" rx="2.5" ry="3" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-lime-200 to-emerald-200 bg-clip-text text-transparent">
              House of Ants
            </span>
          </div>
          <p className="text-green-200 mb-4">
            Bringing you closer to the fascinating world of ants, 24 hours a day.
          </p>
          <p className="text-sm text-green-300">
            © 2025 House of Ants | www.houseofants.org | Educational content for nature enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
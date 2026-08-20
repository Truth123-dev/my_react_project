

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold text-lg">SyncTask</div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
            <a href="#contact" className="hover:text-white transition">Contact Us</a>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} SyncTask Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
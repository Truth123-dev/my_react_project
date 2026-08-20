

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Simplify your workflow, <span className="text-indigo-600">increase productivity</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              SyncTask helps teams coordinate tasks, track progress, and meet deadlines in a clean, unified workspace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column: Visual Placeholder */}
          <div className="flex justify-center">
            <div className="w-full max-w-md md:max-w-full aspect-video bg-indigo-100 rounded-lg shadow-md flex items-center justify-center border border-indigo-200">
              <span className="text-indigo-500 font-medium">[ Dashboard Preview Image ]</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
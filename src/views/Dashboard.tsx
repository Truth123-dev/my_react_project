

import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Security Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-2">Protected Area</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This space is only visible to users authenticated through active sessions.
          </p>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-md font-mono text-xs">
            User Metadata: {JSON.stringify(user, null, 2)}
          </div>
        </div>
      </main>
    </div>
  );
};



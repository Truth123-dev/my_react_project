

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { VirtualKeycard } from '../components/office/VirtualKeycard';
import { DeskBooking } from '../components/office/DeskBooking';
import { MeetingRooms } from '../components/office/MeetingRooms';
import { AccessLogs } from '../components/office/AccessLogs';

export const OfficeDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-500/20">
              O
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">Workspace Portal</span>
              <h1 className="text-base font-bold text-slate-800 dark:text-white leading-tight">HQ - West Tower</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.name}</span>
              <span className="block text-xs text-slate-400">{user?.email}</span>
            </div>
            <button
              onClick={logout}
              className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition font-medium text-slate-600 dark:text-slate-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Workspace Grid Layout */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Keycard and History Audit */}
          <section className="lg:col-span-4 space-y-8">
            <VirtualKeycard />
            <AccessLogs />
          </section>

          {/* Right Column: Desk Allocations and Meeting Rooms */}
          <section className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Welcome to your Secure Office Space</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This portal handles desk assignments, hardware-based space authorizations, and real-time physical telemetry logging.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DeskBooking />
              <MeetingRooms />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
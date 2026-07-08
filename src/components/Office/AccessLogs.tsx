


import React from 'react';

interface LogEntry {
  timestamp: string;
  location: string;
  action: 'Access Granted' | 'Access Denied';
}

const ACCESS_HISTORY: LogEntry[] = [
  { timestamp: 'Today, 08:42 AM', location: 'Main Entrance Turnstile B', action: 'Access Granted' },
  { timestamp: 'Today, 08:45 AM', location: 'Elevator Lobby - Floor 4', action: 'Access Granted' },
  { timestamp: 'Yesterday, 06:12 PM', location: 'Main Entrance Turnstile A', action: 'Access Granted' },
  { timestamp: 'Yesterday, 01:15 PM', location: 'Server Room - Tier 2 Auth', action: 'Access Denied' },
];

export const AccessLogs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Physical Credential Logs</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Verification logs of your virtual keycard usage.</p>

      <div className="flow-root">
        <ul className="-mb-8">
          {ACCESS_HISTORY.map((log, index) => {
            const isGranted = log.action === 'Access Granted';
            return (
              <li key={index}>
                <div className="relative pb-6">
                  {index !== ACCESS_HISTORY.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800 ${
                        isGranted ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                      }`}>
                        {isGranted ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">{log.location}</p>
                        <span className={`text-[10px] font-semibold ${isGranted ? 'text-emerald-600' : 'text-rose-500'}`}>{log.action}</span>
                      </div>
                      <div className="text-right text-[10px] whitespace-nowrap text-gray-400 dark:text-gray-500">
                        <time>{log.timestamp}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
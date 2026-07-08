

import React, { useState } from 'react';

interface Desk {
  id: string;
  label: string;
  status: 'available' | 'occupied' | 'reserved-by-you';
}

export const DeskBooking: React.FC = () => {
  const [desks, setDesks] = useState<Desk[]>([
    { id: '1', label: 'Desk A1', status: 'occupied' },
    { id: '2', label: 'Desk A2', status: 'available' },
    { id: '3', label: 'Desk A3', status: 'available' },
    { id: '4', label: 'Desk A4', status: 'occupied' },
    { id: '5', label: 'Desk B1', status: 'available' },
    { id: '6', label: 'Desk B2', status: 'reserved-by-you' },
    { id: '7', label: 'Desk B3', status: 'occupied' },
    { id: '8', label: 'Desk B4', status: 'available' },
  ]);

  const handleDeskAction = (deskId: string) => {
    setDesks((prev) =>
      prev.map((desk) => {
        if (desk.id !== deskId) return desk;
        if (desk.status === 'available') {
          return { ...desk, status: 'reserved-by-you' };
        } else if (desk.status === 'reserved-by-you') {
          return { ...desk, status: 'available' };
        }
        return desk;
      })
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Flex Desk Allocation</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Select an available workstation to secure your booking for today.</p>

      <div className="grid grid-cols-4 gap-3">
        {desks.map((desk) => {
          const isOccupied = desk.status === 'occupied';
          const isMine = desk.status === 'reserved-by-you';
          
          return (
            <button
              key={desk.id}
              disabled={isOccupied}
              onClick={() => handleDeskAction(desk.id)}
              className={`p-3 rounded-xl border text-center transition-all ${
                isOccupied
                  ? 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : isMine
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-800'
              }`}
            >
              <div className="text-xs font-semibold mb-1">{desk.label}</div>
              <span className={`inline-block w-2 h-2 rounded-full ${
                isOccupied ? 'bg-gray-300 dark:bg-gray-700' : isMine ? 'bg-indigo-500' : 'bg-emerald-500'
              }`} />
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-400 justify-center">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" /> Occupied
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Reserved (You)
        </span>
      </div>
    </div>
  );
};
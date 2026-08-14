

import React from 'react';
import type { Teller } from '../types/bank';

interface TellerListProps {
  tellers: Teller[];
  onToggleStatus: (tellerId: string) => void;
}

export const TellerList: React.FC<TellerListProps> = ({ tellers, onToggleStatus }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Teller Station Status</h2>
      <div className="space-y-3">
        {tellers.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div>
              <h4 className="font-bold text-sm text-slate-800">{t.name}</h4>
              <p className="text-xs text-slate-400">{t.employeeId}</p>
            </div>
            <button
              onClick={() => onToggleStatus(t.id)}
              className={`text-xs px-2.5 py-1 rounded-full font-semibold select-none border transition-colors ${
                t.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' :
                t.status === 'Busy' ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100' :
                'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100'
              }`}
              title="Click to toggle status"
            >
              {t.status}
            </button>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 mt-2 text-center">
        Tip: Click on a status pill to toggle the teller's availability.
      </p>
    </div>
  );
};
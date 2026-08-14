

import React from 'react';
import type { Customer } from '../types/bank';

interface CustomerListProps {
  customers: Customer[];
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span>Customer Directory</span>
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-normal">
          {customers.length} Accounts
        </span>
      </h2>
      <div className="space-y-3">
        {customers.map((c) => (
          <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
              <p className="text-xs text-slate-400">{c.accountNumber} • {c.role}</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-bold block text-slate-950">
                ${c.balance.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
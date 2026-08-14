


import React from 'react';

interface BankStatsProps {
  bankVaultHold: number;
  totalCustomerDeposits: number;
  transactionCount: number;
}

export const BankStats: React.FC<BankStatsProps> = ({
  bankVaultHold,
  totalCustomerDeposits,
  transactionCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700">Bank Vault Holdings</h3>
        </div>
        <p className="text-2xl font-mono font-bold text-slate-900">${bankVaultHold.toLocaleString()}</p>
        <p className="text-xs text-slate-400 mt-1">Liquid operational reserve, increased via service fees.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700">Customer Deposits</h3>
        </div>
        <p className="text-2xl font-mono font-bold text-slate-900">${totalCustomerDeposits.toLocaleString()}</p>
        <p className="text-xs text-slate-400 mt-1">Cumulative balances of registered clients.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700">Ledger Count</h3>
        </div>
        <p className="text-2xl font-mono font-bold text-slate-900">{transactionCount}</p>
        <p className="text-xs text-slate-400 mt-1">Transactions completed in this session.</p>
      </div>
    </div>
  );
};
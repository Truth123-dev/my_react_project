


// src/views/TransactionsView.tsx
import React from 'react';
import type { Transaction } from '../types/Index';

interface TransactionsViewProps {
  transactions: Transaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Transaction History</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">A complete list of past account activities.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Merchant</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
            {transactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">{tx.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-100">{tx.merchant}</td>
                  <td className="py-3 px-4">{tx.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                      isIncome 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' 
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right font-bold ${
                    isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {isIncome ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

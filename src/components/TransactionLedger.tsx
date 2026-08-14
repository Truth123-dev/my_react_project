

import React from 'react';
import type { Transaction } from '../types/bank';

interface TransactionLedgerProps {
  transactions: Transaction[];
}

export const TransactionLedger: React.FC<TransactionLedgerProps> = ({ transactions }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Transaction Ledger</h2>
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          No transactions have been authorized during this session yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold text-xs">
                <th className="pb-2">Tx ID</th>
                <th className="pb-2">Details</th>
                <th className="pb-2 text-right">Amount</th>
                <th className="pb-2 text-right">Processed By</th>
                <th className="pb-2 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-slate-700 hover:bg-slate-50">
                  <td className="py-3 font-mono text-xs font-semibold text-slate-500">{tx.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-900">{tx.senderName}</span>
                      <span className="text-slate-400">➔</span>
                      <span className="font-semibold text-slate-900">{tx.receiverName}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-emerald-700">
                    +${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                      {tx.tellerName}
                    </span>
                  </td>
                  <td className="py-3 text-right text-xs text-slate-400">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
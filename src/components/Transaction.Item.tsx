


// src/components/TransactionItem.tsx
import React from 'react';
import type { Transaction } from '../types/Index';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = React.memo(({ transaction }) => {
  const isIncome = transaction.type === 'income';

  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-none">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
          isIncome ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
        }`}>
          {transaction.merchant[0]}
        </div>
        
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{transaction.merchant}</p>
          <div className="flex gap-2 items-center text-xs text-slate-400 dark:text-slate-500">
            <span>{transaction.category}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <span className={`font-semibold text-sm ${isIncome ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-200'}`}>
        {isIncome ? `+${formattedAmount}` : `-${formattedAmount}`}
      </span>
    </div>
  );
});

TransactionItem.displayName = 'TransactionItem';

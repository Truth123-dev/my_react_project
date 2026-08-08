

// src/components/StatCard.tsx
import React from 'react';

// We define what information this component needs to receive from its parent
interface StatCardProps {
  title: string;
  amount: number;
  type: 'balance' | 'income' | 'expense';
}

export const StatCard: React.FC<StatCardProps> = ({ title, amount, type }) => {
  // We can dynamically choose text colors based on the card type
  const isIncome = type === 'income';
  const isExpense = type === 'expense';

  // Format number to currency style (USD)
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  // Inside src/components/StatCard.tsx - Update return statement:

return (
  // Added dark:bg-slate-900 dark:border-slate-800
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
    {/* Added dark:text-slate-400 */}
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{title}</p>
    <p className={`text-2xl font-bold ${
      isIncome ? 'text-emerald-600' : isExpense ? 'text-rose-600' : 'text-slate-900 dark:text-white'
    }`}>
      {formattedAmount}
    </p>
  </div>
  );
};



// src/components/SavingsGoalCard.tsx
import React from 'react';
import type { SavingsGoal } from '../types/Index';

interface SavingsGoalCardProps {
  goals: SavingsGoal[];
}

export const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ goals }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200 h-full">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Savings Goals</h2>
      
      <div className="space-y-6">
        {goals.map((goal) => {
          const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{goal.name}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  ${goal.current} / <span className="text-slate-400 dark:text-slate-500">${goal.target}</span>
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-xs text-right font-medium text-emerald-600 dark:text-emerald-400">
                {percentage}% Completed
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
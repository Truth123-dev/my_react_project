

// src/views/DashboardView.tsx
import React from 'react';
import { StatCard } from '../components/StatCard';
import { TransactionList } from '../components/Transaction.List';
import { SavingsGoalCard } from '../components/SavingsGoalCard';
import { QuickTransfer } from '../components/QuickTransfer';
import type { AccountSummary, Transaction, SavingsGoal, Contact } from '../types/Index';

interface DashboardViewProps {
  summary: AccountSummary;
  transactions: Transaction[];
  goals: SavingsGoal[];
  contacts: Contact[];
  onTransfer: (contactName: string, amount: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  summary,
  transactions,
  goals,
  contacts,
  onTransfer,
}) => {
  return (
    <div className="space-y-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" amount={summary.balance} type="balance" />
        <StatCard title="Monthly Income" amount={summary.income} type="income" />
        <StatCard title="Monthly Expenses" amount={summary.expenses} type="expense" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <SavingsGoalCard goals={goals} />
          <QuickTransfer contacts={contacts} onTransfer={onTransfer} />
        </div>
      </div>
    </div>
  );
};
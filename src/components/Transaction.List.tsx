

// src/components/TransactionList.tsx
import React, { useState, useMemo } from 'react';
import type { Transaction } from '../types/Index';
import { TransactionItem } from './Transaction.Item';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch = item.merchant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, selectedCategory]);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Recent Transactions</h2>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          {filteredTransactions.length} items
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by merchant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm min-w-[140px]"
        >
          <option value="All">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Software">Software</option>
          <option value="Freelance">Freelance</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Utilities">Utilities</option>
        </select>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[350px] overflow-y-auto pr-1">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((item) => (
            <TransactionItem key={item.id} transaction={item} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">No transactions found</p>
            <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
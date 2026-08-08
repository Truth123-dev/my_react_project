

// src/data/mockData.ts
import type { AccountSummary, Contact, SavingsGoal, Transaction } from '../types/Index';

export const mockSummary: AccountSummary = {
  balance: 12450.75,
  income: 5400.00,
  expenses: 1250.25,
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Figma Subscription',
    category: 'Software',
    amount: 15.00,
    date: '2023-10-24',
    type: 'expense',
  },
  {
    id: '2',
    merchant: 'Client Retainer Payment',
    category: 'Freelance',
    amount: 2500.00,
    date: '2023-10-23',
    type: 'income',
  },
  {
    id: '3',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: 124.50,
    date: '2023-10-22',
    type: 'expense',
  },
  {
    id: '4',
    merchant: 'Client Product Payment',
    category: 'Freelance',
    amount: 4500.00,
    date: '2024-10-23',
    type: 'income',
  },
  {
    id: '5',
    merchant: 'Products Subscription',
    category: 'Groceries',
    amount: 154.50,
    date: '2025-10-22',
    type: 'expense',
  },
  {
    id: '6',
    merchant: 'Logistic Payment',
    category: 'Freelance',
    amount: 2500.00,
    date: '2023-11-23',
    type: 'income',
  },
  {
    id: '7',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: 124.50,
    date: '2023-10-22',
    type: 'expense',
  },
    {
    id: '8',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: 424.50,
    date: '2024-10-22',
    type: 'expense',
  },
  {
    id: '9',
    merchant: 'Client Product Payment',
    category: 'Freelance',
    amount: 4500.00,
    date: '2024-10-23',
    type: 'income',
  },
  {
    id: '10',
    merchant: 'Products',
    category: 'Groceries',
    amount: 154.50,
    date: '2025-10-22',
    type: 'expense',
  },
  {
    id: '11',
    merchant: 'Logistic Payment',
    category: 'Freelance',
    amount: 2500.00,
    date: '2023-11-23',
    type: 'income',
  },
  {
    id: '12',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: 124.50,
    date: '2023-10-22',
    type: 'expense',
  },
  {
    id: '13',
    merchant: 'Logistic Payment',
    category: 'Freelance',
    amount: 2500.00,
    date: '2023-11-23',
    type: 'income',
  },
  {
    id: '14',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: 124.50,
    date: '2023-10-22',
    type: 'expense',
  },
  {
    id: '15',
    merchant: 'Logistic Payment',
    category: 'Freelance',
    amount: 2500.00,
    date: '2023-11-23',
    type: 'income',
  },
  {
    id: '16',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    amount: 124.50,
    date: '2023-10-22',
    type: 'expense',
  },
];

  // Add this to the bottom of src/data/mockData.ts

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'New Macbook Pro',
    target: 2500,
    current: 1800,
  },
  {
    id: '2',
    name: 'Emergency Fund',
    target: 10000,
    current: 5000,
  },

];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Maya Chen',
    initials: 'MC',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: '2',
    name: 'Jordan Lee',
    initials: 'JL',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: '3',
    name: 'Priya Singh',
    initials: 'PS',
    color: 'bg-amber-100 text-amber-700',
  },
];

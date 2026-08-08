
// src/hooks/useBankData.ts
import { useState, useEffect, useCallback } from 'react';
import type { Transaction, AccountSummary, SavingsGoal, Contact, Toast } from '../types/Index';
import { mockSummary, mockTransactions, mockSavingsGoals, mockContacts } from '../data/MockData';

export const useBankData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('bank_transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [summary, setSummary] = useState<AccountSummary>(() => {
    const saved = localStorage.getItem('bank_summary');
    return saved ? JSON.parse(saved) : mockSummary;
  });

  const [goals] = useState<SavingsGoal[]>(mockSavingsGoals);
  const [contacts] = useState<Contact[]>(mockContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('bank_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('bank_theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 1. Notification State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 2. Remove Toast function (memoized with useCallback to avoid re-creation)
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 3. Add Toast helper (creates a auto-delete timer)
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Automatically remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  useEffect(() => {
    localStorage.setItem('bank_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('bank_summary', JSON.stringify(summary));
  }, [summary]);

  const addTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...newTxData,
      id: Date.now().toString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setSummary((prevSummary) => {
      const amt = newTransaction.amount;
      if (newTransaction.type === 'income') {
        return {
          balance: prevSummary.balance + amt,
          income: prevSummary.income + amt,
          expenses: prevSummary.expenses,
        };
      } else {
        return {
          balance: prevSummary.balance - amt,
          income: prevSummary.income,
          expenses: prevSummary.expenses + amt,
        };
      }
    });

    // Trigger Notification
    showToast(`Added transaction: "${newTransaction.merchant}" successfully!`, 'success');
  };

  const quickTransfer = (contactName: string, amount: number) => {
    addTransaction({
      merchant: `Sent to ${contactName}`,
      category: 'Transfer',
      amount: amount,
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });

    // Trigger separate Transfer confirmation
    showToast(`Transferred $${amount.toFixed(2)} to ${contactName}!`, 'success');
  };

  return {
    transactions,
    summary,
    goals,
    contacts,
    isModalOpen,
    setIsModalOpen,
    toasts, // return toasts array
    removeToast, // return remover function
    addTransaction,
    quickTransfer,
    theme,        // Added
    toggleTheme, //Added
  };
};
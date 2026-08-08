


// src/components/QuickTransfer.tsx
import React, { useState } from 'react';
import type { Contact } from '../types/Index';

interface QuickTransferProps {
  contacts: Contact[];
  onTransfer: (contactName: string, amount: number) => void;
}

export const QuickTransfer: React.FC<QuickTransferProps> = ({ contacts, onTransfer }) => {
  const [selectedContactId, setSelectedContactId] = useState<string>(contacts[0]?.id || '');
  const [amount, setAmount] = useState('');

  const activeContact = contacts.find(c => c.id === selectedContactId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);

    if (!activeContact) return;
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    onTransfer(activeContact.name, parsedAmount);
    setAmount('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200 h-full">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Quick Transfer</h2>

      <form onSubmit={handleSend} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">Select Contact</label>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {contacts.map((contact) => {
              const isSelected = contact.id === selectedContactId;
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedContactId(contact.id)}
                  className="flex flex-col items-center gap-1.5 focus:outline-none min-w-[64px]"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    contact.color
                  } ${
                    isSelected ? 'ring-2 ring-emerald-500 ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'
                  }`}>
                    {contact.initials}
                  </div>
                  <span className={`text-xs text-center font-medium ${
                    isSelected ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {contact.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Amount ($)</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button
              type="submit"
              className="bg-slate-900 dark:bg-slate-850 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

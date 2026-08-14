

import React, { useState } from 'react';
import type { Customer, Teller } from '../types/bank';

interface TransferFormProps {
  customers: Customer[];
  tellers: Teller[];
  onTransfer: (senderId: string, receiverId: string, tellerId: string, amount: number) => { success: boolean; message: string };
}

export const TransferForm: React.FC<TransferFormProps> = ({ customers, tellers, onTransfer }) => {
  const [senderId, setSenderId] = useState<string>('');
  const [receiverId, setReceiverId] = useState<string>('');
  const [tellerId, setTellerId] = useState<string>('');
  const [amountStr, setAmountStr] = useState<string>('');
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amount = parseFloat(amountStr);

    if (!senderId || !receiverId || !tellerId) {
      setError('Please select a sender, receiver, and an authorizing teller.');
      return;
    }

    if (senderId === receiverId) {
      setError('Sender and receiver cannot be the same customer.');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid transfer amount greater than 0.');
      return;
    }

    const result = onTransfer(senderId, receiverId, tellerId, amount);

    if (result.success) {
      setSuccess(result.message);
      setAmountStr('');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        Initiate New Transfer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Transfer From (Sender)</label>
            <select
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            >
              <option value="">-- Choose Sender --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} (${c.balance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Transfer To (Receiver)</label>
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            >
              <option value="">-- Choose Receiver --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} (${c.balance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Authorizing Teller</label>
            <select
              value={tellerId}
              onChange={(e) => setTellerId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            >
              <option value="">-- Assign Teller --</option>
              {tellers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Amount ($ USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 pl-7 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
            <strong>Success:</strong> {success}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm shadow-sm"
        >
          Process Transfer Request
        </button>
      </form>
    </div>
  );
};
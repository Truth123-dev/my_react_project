

import { useState } from 'react';
import type { Customer, Teller, Transaction } from './types/bank';
import { initialCustomers, initialTellers } from './data/MockData';
import { BankStats } from './components/BankStats';
import { TransferForm } from './components/TransferForm';
import { TransactionLedger } from './components/TransactionLedger';
import { CustomerList } from './components/CustomerList';
import { TellerList } from './components/TellerList';

export default function App() {
  // Central State Management
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [tellers, setTellers] = useState<Teller[]>(initialTellers);
  const [bankVaultHold, setBankVaultHold] = useState<number>(500000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Aggregate stats derived from state updates
  const totalCustomerDeposits = customers.reduce((sum, c) => sum + c.balance, 0);
  const totalBankAssets = bankVaultHold + totalCustomerDeposits;

  // Handles state logic processing for new transactions
  const handleTransfer = (
    senderId: string,
    receiverId: string,
    tellerId: string,
    amount: number
  ): { success: boolean; message: string } => {
    const sender = customers.find((c) => c.id === senderId);
    const receiver = customers.find((c) => c.id === receiverId);
    const teller = tellers.find((t) => t.id === tellerId);

    if (!sender || !receiver || !teller) {
      return { success: false, message: 'Invalid entity reference.' };
    }

    if (sender.balance < amount) {
      return {
        success: false,
        message: `Insufficient funds. ${sender.name} only holds $${sender.balance.toLocaleString()}.`,
      };
    }

    if (teller.status === 'On Break') {
      return {
        success: false,
        message: `${teller.name} is on break and cannot process dispatch items.`,
      };
    }

    // Process balances changes inside React state
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) => {
        if (c.id === sender.id) return { ...c, balance: c.balance - amount };
        if (c.id === receiver.id) return { ...c, balance: c.balance + amount };
        return c;
      })
    );

    // Minor flat transaction processing fee allocated to bank vault hold
    const fee = 2.5;
    setBankVaultHold((prev) => prev + fee);

    // Create a new ledger entry
    const newTx: Transaction = {
      id: `TX-${Date.now()}`,
      senderId: sender.id,
      senderName: sender.name,
      receiverId: receiver.id,
      receiverName: receiver.name,
      tellerId: teller.id,
      tellerName: teller.name,
      amount,
      timestamp: new Date().toLocaleTimeString(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    return {
      success: true,
      message: `Transferred $${amount.toLocaleString()} from ${sender.name} to ${receiver.name}. (Authorized by ${teller.name}. Fee: $${fee.toFixed(2)})`,
    };
  };

  // Allows toggling teller state globally from the child component interaction
  const handleToggleTellerStatus = (tellerId: string) => {
    setTellers((prevTellers) =>
      prevTellers.map((t) => {
        if (t.id === tellerId) {
          const statuses: ('Available' | 'Busy' | 'On Break')[] = ['Available', 'Busy', 'On Break'];
          const nextIndex = (statuses.indexOf(t.status) + 1) % statuses.length;
          return { ...t, status: statuses[nextIndex] };
        }
        return t;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Display */}
        <header className="bg-emerald-800 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meridian Trust Bank</h1>
            <p className="text-emerald-100 text-sm mt-1">Real-time ledger and teller-mediated dispatch system.</p>
          </div>
          <div className="bg-emerald-900/50 px-4 py-2 rounded-lg border border-emerald-700">
            <span className="text-xs text-emerald-200 block uppercase font-semibold">Total Reserves & Custody Assets</span>
            <span className="text-2xl font-mono font-bold text-emerald-300">
              ${totalBankAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </header>

        {/* Global Statistics Component */}
        <BankStats
          bankVaultHold={bankVaultHold}
          totalCustomerDeposits={totalCustomerDeposits}
          transactionCount={transactions.length}
        />

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main workspace (Form and Ledger list) */}
          <div className="lg:col-span-8 space-y-6">
            <TransferForm
              customers={customers}
              tellers={tellers}
              onTransfer={handleTransfer}
            />
            <TransactionLedger transactions={transactions} />
          </div>

          {/* Directory column */}
          <div className="lg:col-span-4 space-y-6">
            <CustomerList customers={customers} />
            <TellerList
              tellers={tellers}
              onToggleStatus={handleToggleTellerStatus}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
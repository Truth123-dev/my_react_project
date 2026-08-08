
// Inside src/App.tsx - Update only the render portion wrapper classes:

import { useState } from 'react';
import { Sidebar, type ViewName } from './components/Sidebar';
import { useBankData } from './hooks/useBankData';
import { AddTransactionModal } from "./components/AddTransactionModal";
import { ToastContainer } from "./components/ToastContainer";
import { DashboardView } from "./views/DashboardView";
import { TransactionsView } from "./views/TransactionsView";

function App() {
  const {
    transactions,
    summary,
    goals,
    contacts,
    isModalOpen,
    setIsModalOpen,
    toasts,
    removeToast,
    addTransaction,
    quickTransfer,
    theme,        // Extract theme
    toggleTheme,  // Extract toggleTheme
  } = useBankData();

  const [currentView, setCurrentView] = useState<ViewName>('dashboard');

  return (
    // Added dark:bg-slate-950
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-200">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />

      <main className="flex-1 p-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            {/* Added dark:text-slate-100 */}
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome Back, Alex</h1>
            <p className="text-slate-500 dark:text-slate-400">Here is your financial overview for today.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm transition-colors"
          >
            + Add Transaction
          </button>
        </header>

        {currentView === 'dashboard' && (
          <DashboardView 
            summary={summary}
            transactions={transactions}
            goals={goals}
            contacts={contacts}
            onTransfer={quickTransfer}
          />
        )}

        {currentView === 'transactions' && (
          <TransactionsView transactions={transactions} />
        )}
      </main>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddTransaction={addTransaction}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
export default App;

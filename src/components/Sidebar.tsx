

// src/components/Sidebar.tsx
import React from 'react';

export type ViewName = 'dashboard' | 'transactions';

interface SidebarProps {
  currentView: ViewName;
  onViewChange: (view: ViewName) => void;
  theme: 'light' | 'dark';          // Added
  onToggleTheme: () => void;        // Added
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  theme, 
  onToggleTheme 
}) => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col justify-between p-4 border-r border-slate-800">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="text-xl font-bold text-emerald-400">ApexBank</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'dashboard' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => onViewChange('transactions')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'transactions' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            Transactions
          </button>
        </nav>
      </div>

      {/* Footer Profile Area with Dark Mode Toggle */}
      <div className="border-t border-slate-800 pt-4 px-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Alex Mercer</p>
            <p className="text-xs text-slate-400">alex@example.com</p>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-semibold"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </aside>
  );
};




import React from 'react';
import { useCart } from '../context/CartContext';
import type { ActiveView } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setView: (view: ActiveView) => void;
  onCartOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  setView,
  onCartOpen,
}) => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="shrink-0 cursor-pointer" onClick={() => setView('shop')}>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              MODERN<span className="text-indigo-600">SHOP</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('shop')}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Shop
            </button>
            
            <button
              onClick={onCartOpen}
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
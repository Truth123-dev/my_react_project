


import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { mockProducts } from './data/products';
import type { Product, ActiveView } from './types';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './components/Checkout';

const AppContent: React.FC = () => {
  const [view, setView] = useState<ActiveView>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(mockProducts.map((p) => p.category)))];
  }, []);

  // Filter and sort items based on reactive configurations
  const filteredAndSortedProducts = useMemo(() => {
    let result = mockProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setView={setView}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'shop' && (
          <div>
            {/* Catalog Controller Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 whitespace-nowrap">Sort by</span>

             <select
                      value={sortBy}
                      onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'default' || value === 'price-low' || value === 'price-high') {
                      setSortBy(value);
                     }
                   }}
                 className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none"
              >
                   <option value="default">Popularity</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                   </select>


              </div>
            </div>

            {/* Empty Search State */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border rounded-xl">
                <p className="text-sm text-gray-500">We couldn't find matches matching your criteria.</p>
              </div>
            ) : (
              /* Product Grid Display */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'checkout' && <Checkout setView={setView} />}

        {view === 'order-confirmation' && (
          <div className="max-w-md mx-auto text-center py-16 bg-white p-8 rounded-2xl border border-gray-150 shadow-sm mt-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 mb-4 font-bold text-xl">
              ✓
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              We've processed your simulated payment. Your mock products will begin shipping shortly.
            </p>
            <button
              onClick={() => setView('shop')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        setView={setView}
      />

      {/* Product Detail Modal window */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Simple Global Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 text-center">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} ModernShop. Built with React and Tailwind.</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

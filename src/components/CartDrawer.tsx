


import React from 'react';
import { useCart } from '../context/CartContext';
import type { ActiveView } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: ActiveView) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, setView }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-950">Your Cart</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <span className="text-4xl mb-2">🛒</span>
              <p className="text-sm font-medium">Your cart is completely empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-3 border border-gray-50 rounded-lg hover:bg-slate-50/50">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 rounded-md object-cover bg-gray-50"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">{item.product.title}</h4>
                    <span className="text-xs font-bold text-gray-600">${item.product.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs bg-gray-50 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs bg-gray-50 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[10px] text-red-500 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Controls */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                setView('checkout');
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-colors text-center block"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
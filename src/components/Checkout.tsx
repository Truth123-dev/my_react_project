



import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { ActiveView } from '../types';

interface CheckoutProps {
  setView: (view: ActiveView) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ setView }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  });

  const shipping = 10.0;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Simulate API calling
    setTimeout(() => {
      clearCart();
      setView('order-confirmation');
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h2 className="text-xl font-bold text-gray-950 mb-2">No Items Found</h2>
        <button onClick={() => setView('shop')} className="text-indigo-600 hover:underline text-sm font-semibold">
          Return to shop page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-950 mb-8">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Billing Info Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-150 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Shipping & Payment Details</h2>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">ZIP / Postal Code</label>
              <input
                type="text"
                name="zip"
                required
                value={formData.zip}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Credit Card Number</label>
            <input
              type="text"
              name="card"
              placeholder="0000 0000 0000 0000"
              required
              value={formData.card}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-colors duration-200"
          >
            Authorize Purchase of ${finalTotal.toFixed(2)}
          </button>
        </form>

        {/* Order Summaries */}
        <div className="lg:col-span-5 bg-gray-50/50 p-6 rounded-xl border border-gray-200/60 h-fit">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Summary of Items</h2>
          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 justify-between items-center text-sm">
                <span className="text-gray-600 font-medium line-clamp-1">{item.product.title} <span className="text-xs text-gray-400">x{item.quantity}</span></span>
                <span className="font-bold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-200 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Tax (8%)</span>
              <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-4 border-t">
              <span>Grand Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
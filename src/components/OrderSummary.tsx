



import React from 'react';
import type { CartItem } from '../types';

interface OrderSummaryProps {
  items: CartItem[];
  shippingCost: number;
  taxRate: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, shippingCost, taxRate }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
      
      {/* Scrollable Item List for handling larger carts */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 object-cover rounded-lg bg-gray-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 my-4" />

      {/* Pricing Breakdown */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-gray-950">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-gray-950">
            {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Est. Tax</span>
          <span className="font-medium text-gray-950">${tax.toFixed(2)}</span>
        </div>
        <hr className="border-gray-200 my-2" />
        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
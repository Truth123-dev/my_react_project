


import React from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-full bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                {product.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-semibold text-gray-800">{product.rating.rate}</span>
                <span className="text-xs text-gray-500">({product.rating.count} buyer reviews)</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Price</p>
                <p className="text-2xl font-bold text-gray-950">${product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
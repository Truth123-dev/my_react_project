



import React from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      
      {/* Product Image */}
      <div 
        className="aspect-square overflow-hidden bg-gray-50 cursor-pointer relative"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-semibold text-gray-800 shadow-sm uppercase tracking-wider">
          {product.category}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-1 flex-col p-4">
        <h3 
          className="text-sm font-semibold text-gray-900 line-clamp-1 cursor-pointer hover:text-indigo-600"
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </h3>
        
        {/* Rating Row */}
        <div className="mt-1.5 flex items-center gap-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-xs font-medium text-gray-700">{product.rating.rate}</span>
          <span className="text-xs text-gray-400">({product.rating.count})</span>
        </div>

        <p className="mt-2 text-xs text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Pricing and Action */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-950">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
};
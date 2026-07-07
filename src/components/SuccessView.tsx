


import React from 'react';

interface SuccessViewProps {
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onReset }) => {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
      <p className="text-gray-500 mb-8">
        Thank you for your purchase. We have sent a confirmation email containing your receipt and shipping details.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
      >
        Go Back to Cart
      </button>
    </div>
  );
};
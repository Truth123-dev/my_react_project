


import { useState } from 'react';
import type { CartItem, PaymentDetails } from './types';
import { OrderSummary } from './components/OrderSummary';
import { PaymentForm } from './components/PaymentForm';
import { SuccessView } from './components/SuccessView';

const MOCK_ITEMS: CartItem[] = [
  {
    id: 'prod_1',
    name: 'Wireless Over-Ear Noise-Cancelling Headphones',
    price: 199.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_2',
    name: 'Leather Minimalist Key Organizer',
    price: 29.50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_3',
    name: 'Minimalist Travel Backpack (Waterproof)',
    price: 119.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_4',
    name: 'Ergonomic Wireless Trackball Mouse',
    price: 79.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_5',
    name: 'Mechanical Keyboard (Yamaha, Brown Switches)',
    price: 109.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_6',
    name: 'Smart Fitness Tracker with Heart Monitor',
    price: 149.50,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_7',
    name: 'Portable Power Bank 20,000mAh',
    price: 45.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_8',
    name: 'USB-C Multi-Port Hub (8-in-1)',
    price: 59.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_9',
    name: 'Insulated Stainless Steel Water Bottle (32oz)',
    price: 34.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_10',
    name: 'Adjustable Aluminum Laptop Stand',
    price: 39.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_11',
    name: 'Ceramic Coffee Mug with Spill-Proof Lid',
    price: 24.50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'prod_12',
    name: 'Clip-On Ring Light for Video Calls',
    price: 19.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200',
  },
];

export default function App() {
  const [items, setItems] = useState<CartItem[]>(MOCK_ITEMS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePaymentSubmit = async (details: PaymentDetails) => {
    setIsProcessing(true);

    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 2500));
      console.log('Payment validated client-side:', details);
      setIsSuccess(true);
    } catch (error) {
      console.error('Payment processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setItems(MOCK_ITEMS);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Secure Checkout
          </h1>
          <span className="text-sm text-gray-500">SSL Encrypted</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 grow">
        {isSuccess ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <SuccessView onReset={handleReset} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Payment Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
            </div>

            {/* Right side: Summary */}
            <div className="lg:col-span-5">
              <OrderSummary items={items} shippingCost={0} taxRate={0.08} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Sandbox Store. All mock transactions are secure.</p>
      </footer>
    </div>
  );
}
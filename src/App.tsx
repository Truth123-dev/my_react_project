

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Trash2
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string; // MM/YY
  cvv: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
}

export type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'confirmation';

export interface ValidationErrors {
  [key: string]: string;
}

interface CheckoutContextType {
  step: CheckoutStep;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethods: ShippingMethod[];
  selectedShippingMethod: ShippingMethod;
  paymentToken: string | null;
  isTokenizing: boolean;
  isSubmitting: boolean;
  validationErrors: ValidationErrors;
  draftRestored: boolean;
  clearDraftRestoredAlert: () => void;
  setStep: (step: CheckoutStep) => void;
  updateShippingAddress: (address: Partial<ShippingAddress>) => void;
  setSelectedShippingMethod: (method: ShippingMethod) => void;
  handleCardTokenization: (cardDetails: CardDetails) => Promise<boolean>;
  submitOrder: () => Promise<void>;
  resetCheckout: () => void;
}

// ==========================================
// STATIC/MOCK DATA
// ==========================================

const MOCK_CART: CartItem[] = [
  {
    id: 'prod_01',
    name: 'Modular Mechanical Keyboard (75% Layout)',
    price: 189.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'prod_02',
    name: 'Precision Ergonomic Wireless Mouse',
    price: 89.50,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Ground', description: 'Reliable parcel delivery', cost: 4.99, estimatedDays: '3-5 business days' },
  { id: 'express', name: 'Express Delivery', description: 'Expedited shipping to your door', cost: 15.00, estimatedDays: '1-2 business days' },
  { id: 'overnight', name: 'Priority Overnight', description: 'Next-day delivery by noon', cost: 35.00, estimatedDays: 'Next business day' }
];

const STORAGE_KEYS = {
  SHIPPING_DRAFT: 'checkout_pipeline_shipping_draft',
  SHIPPING_METHOD_DRAFT: 'checkout_pipeline_method_draft',
  STEP_DRAFT: 'checkout_pipeline_step_draft'
};

// Luhn Algorithm helper for credit card numbers (client validation)
const validateLuhn = (cardNumber: string): boolean => {
  const cleanNum = cardNumber.replace(/\D/g, '');
  if (!cleanNum) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleanNum.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNum.charAt(i), 10);
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

// ==========================================
// CONTEXT IMPLEMENTATION
// ==========================================

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStepState] = useState<CheckoutStep>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [selectedShippingMethod, setSelectedShippingMethodState] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [isTokenizing, setIsTokenizing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [draftRestored, setDraftRestored] = useState<boolean>(false);

  // Load drafts on mount - excluding sensitive details to maintain security controls
  useEffect(() => {
    try {
      const savedShipping = localStorage.getItem(STORAGE_KEYS.SHIPPING_DRAFT);
      const savedMethod = localStorage.getItem(STORAGE_KEYS.SHIPPING_METHOD_DRAFT);
      const savedStep = localStorage.getItem(STORAGE_KEYS.STEP_DRAFT);
      
      let restored = false;

      if (savedShipping) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShippingAddress(JSON.parse(savedShipping));
        restored = true;
      }
      if (savedMethod) {
        const foundMethod = SHIPPING_METHODS.find(m => m.id === savedMethod);
        if (foundMethod) {
          setSelectedShippingMethodState(foundMethod);
          restored = true;
        }
      }
      if (savedStep && savedStep !== 'confirmation') {
        setStepState(savedStep as CheckoutStep);
        restored = true;
      }

      if (restored) {
        setDraftRestored(true);
      }
    } catch (e) {
      console.warn('Failed to restore draft state', e);
    }
  }, []);

  // Save draft state (non-sensitive progress information only)
  const setStep = (nextStep: CheckoutStep) => {
    setStepState(nextStep);
    localStorage.setItem(STORAGE_KEYS.STEP_DRAFT, nextStep);
  };

  const updateShippingAddress = (addressUpdates: Partial<ShippingAddress>) => {
    setShippingAddress(prev => {
      const updated = { ...prev, ...addressUpdates };
      localStorage.setItem(STORAGE_KEYS.SHIPPING_DRAFT, JSON.stringify(updated));
      return updated;
    });
    // Clear field-specific validation warning when fixed
    const keys = Object.keys(addressUpdates);
    if (keys.length > 0) {
      setValidationErrors(prev => {
        const next = { ...prev };
        keys.forEach(k => delete next[k]);
        return next;
      });
    }
  };

  const setSelectedShippingMethod = (method: ShippingMethod) => {
    setSelectedShippingMethodState(method);
    localStorage.setItem(STORAGE_KEYS.SHIPPING_METHOD_DRAFT, method.id);
  };

  const clearDraftRestoredAlert = () => setDraftRestored(false);

  // Client-Side Secure Card Tokenization Simulation
  // Securely receives raw card details, contacts server/processor simulation, returns opaque payment token, 
  // and completely avoids storing credit card values in component state or browser localStorage
  const handleCardTokenization = async (cardDetails: CardDetails): Promise<boolean> => {
    setIsTokenizing(true);
    setValidationErrors({});
    
    // Simulate slight network latency to tokenize payment credentials
    await new Promise(resolve => setTimeout(resolve, 1800));

    const errors: ValidationErrors = {};
    if (!cardDetails.cardholderName.trim()) {
      errors.cardholderName = 'Cardholder name is required.';
    }
    
    const plainCardNumber = cardDetails.cardNumber.replace(/\s+/g, '');
    if (!plainCardNumber || plainCardNumber.length < 13 || plainCardNumber.length > 19) {
      errors.cardNumber = 'Card number must be between 13 and 19 digits.';
    } else if (!validateLuhn(plainCardNumber)) {
      errors.cardNumber = 'Invalid credit card number (failed checksum validation).';
    }

    const expiryMatch = cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
    if (!expiryMatch) {
      errors.expiryDate = 'Format must be MM/YY.';
    } else {
      const month = parseInt(expiryMatch[1], 10);
      const year = parseInt('20' + expiryMatch[2], 10);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errors.expiryDate = 'Card expiration date has passed.';
      }
    }

    if (!cardDetails.cvv || cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
      errors.cvv = 'CVV must be 3 or 4 digits.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsTokenizing(false);
      return false;
    }

    // Mock response of client-side tokenization (like Stripe.js elements or Braintree)
    // The key objective is to never persist the raw card properties in local state or browser storage.
    const last4 = plainCardNumber.slice(-4);
    const mockToken = `tok_client_${Math.random().toString(36).substring(2, 14)}_${last4}`;
    
    setPaymentToken(mockToken);
    setIsTokenizing(false);
    return true;
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    // Simulate API request to capture stateful token and finalize transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clean up all localized draft states upon successful order execution
    localStorage.removeItem(STORAGE_KEYS.SHIPPING_DRAFT);
    localStorage.removeItem(STORAGE_KEYS.SHIPPING_METHOD_DRAFT);
    localStorage.removeItem(STORAGE_KEYS.STEP_DRAFT);
    
    setIsSubmitting(false);
    setStep('confirmation');
  };

  const resetCheckout = () => {
    setStepState('shipping');
    setShippingAddress({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    });
    setSelectedShippingMethodState(SHIPPING_METHODS[0]);
    setPaymentToken(null);
    setValidationErrors({});
    setDraftRestored(false);
    localStorage.removeItem(STORAGE_KEYS.SHIPPING_DRAFT);
    localStorage.removeItem(STORAGE_KEYS.SHIPPING_METHOD_DRAFT);
    localStorage.removeItem(STORAGE_KEYS.STEP_DRAFT);
  };

  return (
    <CheckoutContext.Provider value={{
      step,
      cartItems: MOCK_CART,
      shippingAddress,
      shippingMethods: SHIPPING_METHODS,
      selectedShippingMethod,
      paymentToken,
      isTokenizing,
      isSubmitting,
      validationErrors,
      draftRestored,
      clearDraftRestoredAlert,
      setStep,
      updateShippingAddress,
      setSelectedShippingMethod,
      handleCardTokenization,
      submitOrder,
      resetCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

const ProgressBar: React.FC = () => {
  const { step } = useCheckout();
  
  const stepsList: { key: CheckoutStep; label: string }[] = [
    { key: 'shipping', label: 'Shipping Info' },
    { key: 'delivery', label: 'Delivery Method' },
    { key: 'payment', label: 'Payment Details' },
    { key: 'confirmation', label: 'Complete Order' }
  ];

  const getStepIndex = (s: CheckoutStep) => {
    const indices: Record<CheckoutStep, number> = { shipping: 0, delivery: 1, payment: 2, confirmation: 3 };
    return indices[s];
  };

  const activeIndex = getStepIndex(step);

  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between">
        {stepsList.map((item, idx) => {
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;
          
          return (
            <React.Fragment key={item.key}>
              <div className="flex flex-col items-center flex-1 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold z-10 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : isActive 
                    ? 'bg-slate-900 text-white ring-4 ring-slate-100 dark:ring-slate-800' 
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`text-[11px] font-medium mt-2 whitespace-nowrap hidden sm:block ${
                  isActive ? 'text-slate-900 font-semibold dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {item.label}
                </span>
              </div>
              
              {idx < stepsList.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 bg-slate-100 dark:bg-slate-800 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-emerald-600 transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const OrderSummary: React.FC = () => {
  const { cartItems, selectedShippingMethod, step } = useCheckout();

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return subtotal * 0.0825; // 8.25% mock sales tax
  }, [subtotal]);

  const shippingCost = useMemo(() => {
    if (step === 'shipping') return 0;
    return selectedShippingMethod.cost;
  }, [selectedShippingMethod, step]);

  const grandTotal = useMemo(() => {
    return subtotal + tax + shippingCost;
  }, [subtotal, tax, shippingCost]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-5 sticky top-6">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <ShoppingBag className="w-5 h-5 text-slate-500" />
        <h3 className="font-semibold text-slate-900 dark:text-white">Order Summary</h3>
      </div>

      <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-1">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3 text-sm">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-12 h-12 object-cover rounded-md border border-slate-200 dark:border-slate-800 bg-white" 
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
              <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <span className="font-medium text-slate-800 dark:text-slate-200">${item.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Sales Tax</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping {step === 'shipping' && <span className="text-[10px] text-slate-400">(calc next step)</span>}</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {step === 'shipping' ? '--' : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between text-base font-semibold text-slate-900 dark:text-white">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/40 py-2 rounded-lg">
        <Lock className="w-3.5 h-3.5" />
        <span>Secure 256-bit SSL encrypted pipeline</span>
      </div>
    </div>
  );
};

const ShippingForm: React.FC = () => {
  const { shippingAddress, updateShippingAddress, setStep } = useCheckout();
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});

  const validateFields = (): boolean => {
    const errors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!shippingAddress.firstName.trim()) errors.firstName = 'Required';
    if (!shippingAddress.lastName.trim()) errors.lastName = 'Required';
    if (!shippingAddress.addressLine1.trim()) errors.addressLine1 = 'Required';
    if (!shippingAddress.city.trim()) errors.city = 'Required';
    if (!shippingAddress.state.trim()) errors.state = 'Required';
    if (!shippingAddress.zipCode.trim()) {
      errors.zipCode = 'Required';
    } else if (shippingAddress.zipCode.length < 5) {
      errors.zipCode = 'Min 5 digits';
    }
    
    if (!shippingAddress.email.trim()) {
      errors.email = 'Required';
    } else if (!emailRegex.test(shippingAddress.email)) {
      errors.email = 'Invalid email';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      setStep('delivery');
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Shipping Address Details</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">First Name *</label>
          <input
            type="text"
            className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
              formErrors.firstName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
            }`}
            value={shippingAddress.firstName}
            onChange={(e) => updateShippingAddress({ firstName: e.target.value })}
            placeholder="Jane"
          />
          {formErrors.firstName && <p className="text-rose-500 text-xs mt-1">{formErrors.firstName}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Last Name *</label>
          <input
            type="text"
            className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
              formErrors.lastName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
            }`}
            value={shippingAddress.lastName}
            onChange={(e) => updateShippingAddress({ lastName: e.target.value })}
            placeholder="Doe"
          />
          {formErrors.lastName && <p className="text-rose-500 text-xs mt-1">{formErrors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Email Address *</label>
          <input
            type="email"
            className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
              formErrors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
            }`}
            value={shippingAddress.email}
            onChange={(e) => updateShippingAddress({ email: e.target.value })}
            placeholder="jane.doe@example.com"
          />
          {formErrors.email && <p className="text-rose-500 text-xs mt-1">{formErrors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-slate-900 dark:focus:border-slate-300"
            value={shippingAddress.phone}
            onChange={(e) => updateShippingAddress({ phone: e.target.value })}
            placeholder="+1 (555) 019-2834"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Address Line 1 *</label>
        <input
          type="text"
          className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
            formErrors.addressLine1 ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
          }`}
          value={shippingAddress.addressLine1}
          onChange={(e) => updateShippingAddress({ addressLine1: e.target.value })}
          placeholder="123 High Street"
        />
        {formErrors.addressLine1 && <p className="text-rose-500 text-xs mt-1">{formErrors.addressLine1}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Address Line 2 (Optional)</label>
        <input
          type="text"
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-slate-900 dark:focus:border-slate-300"
          value={shippingAddress.addressLine2 || ''}
          onChange={(e) => updateShippingAddress({ addressLine2: e.target.value })}
          placeholder="Apt 4B"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">City *</label>
          <input
            type="text"
            className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
              formErrors.city ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
            }`}
            value={shippingAddress.city}
            onChange={(e) => updateShippingAddress({ city: e.target.value })}
            placeholder="San Francisco"
          />
          {formErrors.city && <p className="text-rose-500 text-xs mt-1">{formErrors.city}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">State / Region *</label>
          <input
            type="text"
            className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
              formErrors.state ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
            }`}
            value={shippingAddress.state}
            onChange={(e) => updateShippingAddress({ state: e.target.value })}
            placeholder="CA"
          />
          {formErrors.state && <p className="text-rose-500 text-xs mt-1">{formErrors.state}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">ZIP / Postal Code *</label>
          <input
            type="text"
            className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
              formErrors.zipCode ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
            }`}
            value={shippingAddress.zipCode}
            onChange={(e) => updateShippingAddress({ zipCode: e.target.value })}
            placeholder="94105"
          />
          {formErrors.zipCode && <p className="text-rose-500 text-xs mt-1">{formErrors.zipCode}</p>}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-850 dark:hover:bg-slate-200 text-white dark:text-slate-950 text-sm font-medium py-2.5 px-5 rounded-lg transition-colors"
        >
          <span>Continue to Delivery</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

const DeliveryMethodForm: React.FC = () => {
  const { shippingMethods, selectedShippingMethod, setSelectedShippingMethod, setStep } = useCheckout();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
          <Truck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          Choose Shipping Speed
        </h2>
        <p className="text-xs text-slate-500">Please choose a preferred delivery method for your shipment.</p>
      </div>

      <div className="space-y-3">
        {shippingMethods.map((method) => {
          const isSelected = selectedShippingMethod.id === method.id;
          return (
            <label 
              key={method.id}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-slate-900 bg-slate-50/50 dark:border-slate-100 dark:bg-slate-900/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <input 
                  type="radio" 
                  name="shippingMethod" 
                  className="mt-1 h-4 w-4 text-slate-900 dark:text-slate-100 border-slate-350 focus:ring-0 accent-slate-900 dark:accent-slate-100"
                  checked={isSelected}
                  onChange={() => setSelectedShippingMethod(method)}
                />
                <div>
                  <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{method.name}</span>
                  <span className="block text-xs text-slate-500">{method.description} • {method.estimatedDays}</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {method.cost === 0 ? 'Free' : `$${method.cost.toFixed(2)}`}
              </span>
            </label>
          );
        })}
      </div>

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setStep('shipping')}
          className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <button
          type="button"
          onClick={() => setStep('payment')}
          className="flex items-center gap-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-850 dark:hover:bg-slate-200 text-white dark:text-slate-950 text-sm font-medium py-2.5 px-5 rounded-lg transition-colors"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const PaymentForm: React.FC = () => {
  const { 
    handleCardTokenization, 
    paymentToken, 
    isTokenizing, 
    isSubmitting, 
    submitOrder, 
    validationErrors, 
    setStep 
  } = useCheckout();

  // Local card states are ONLY used inside this transient form block. 
  // Under no circumstance do we lift raw card states up to persistent stores or localStorage.
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Handle format spacing for visual card typing ease
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    const chunked = rawVal.match(/.{1,4}/g);
    setCardNumber(chunked ? chunked.slice(0, 4).join(' ') : rawVal);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanVal = e.target.value.replace(/\D/g, '');
    if (cleanVal.length > 2) {
      cleanVal = `${cleanVal.slice(0, 2)}/${cleanVal.slice(2, 4)}`;
    }
    setExpiryDate(cleanVal.slice(0, 5));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanVal = e.target.value.replace(/\D/g, '');
    setCvv(cleanVal.slice(0, 4));
  };

  const onTokenizeAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Exchange raw details for token securely
    const success = await handleCardTokenization({
      cardholderName,
      cardNumber,
      expiryDate,
      cvv
    });

    if (success) {
      // 2. Erase volatile UI details immediately once tokenized successfully
      setCardholderName('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
          <CreditCard className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          Secure Payment Portal
        </h2>
        <p className="text-xs text-slate-500">
          State retention systems protect basic form input. Your critical card details are tokenized on demand and excluded from persistent browser memory.
        </p>
      </div>

      {paymentToken ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 space-y-3">
          <div className="flex gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">Card Securely Tokenized</h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-500/90 mt-0.5">
                Raw card data has been discarded from active memory and exchanged for an authorized payment identifier:
              </p>
              <code className="block bg-white dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-950 text-[11px] font-mono p-2 rounded mt-2 text-slate-700 dark:text-slate-300 break-all select-all">
                {paymentToken}
              </code>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={onTokenizeAndPay} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Cardholder Name</label>
            <input
              type="text"
              required
              disabled={isTokenizing}
              className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
                validationErrors.cardholderName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
              }`}
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Jane Doe"
            />
            {validationErrors.cardholderName && <p className="text-rose-500 text-xs mt-1">{validationErrors.cardholderName}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                required
                disabled={isTokenizing}
                className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg pl-10 pr-3 py-2.5 outline-none transition-colors ${
                  validationErrors.cardNumber ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
                }`}
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="4111 2222 3333 4444"
              />
              <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
            {validationErrors.cardNumber && <p className="text-rose-500 text-xs mt-1">{validationErrors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Expiration Date</label>
              <input
                type="text"
                required
                disabled={isTokenizing}
                className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
                  validationErrors.expiryDate ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
                }`}
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
              />
              {validationErrors.expiryDate && <p className="text-rose-500 text-xs mt-1">{validationErrors.expiryDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">CVV / Security Code</label>
              <input
                type="password"
                required
                disabled={isTokenizing}
                className={`w-full bg-white dark:bg-slate-950 border text-sm rounded-lg px-3 py-2.5 outline-none transition-colors ${
                  validationErrors.cvv ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-slate-300'
                }`}
                value={cvv}
                onChange={handleCvvChange}
                placeholder="•••"
              />
              {validationErrors.cvv && <p className="text-rose-500 text-xs mt-1">{validationErrors.cvv}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isTokenizing}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-150 hover:bg-slate-850 text-white dark:text-slate-900 text-sm font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isTokenizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Secure Payment Token...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Tokenize Payment Credentials</span>
              </>
            )}
          </button>
        </form>
      )}

      <div className="pt-4 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          disabled={isTokenizing || isSubmitting}
          onClick={() => setStep('delivery')}
          className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {paymentToken && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={submitOrder}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Complete Purchase</span>
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const SuccessConfirmation: React.FC = () => {
  const { resetCheckout, shippingAddress } = useCheckout();

  return (
    <div className="text-center py-8 px-4 max-w-md mx-auto space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
        <CheckCircle className="w-10 h-10" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Confirmed!</h2>
        <p className="text-sm text-slate-500 mt-2">
          Your payment token has been processed and order completed. A validation receipt has been transmitted to <span className="font-semibold text-slate-800 dark:text-slate-300">{shippingAddress.email || 'your inbox'}</span>.
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left text-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Order ID:</span>
          <span className="font-semibold text-slate-850 dark:text-slate-200">OP-39281-2893</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Status:</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ready for dispatch
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Deliver to:</span>
          <span className="font-semibold text-slate-850 dark:text-slate-200 truncate max-w-50">
            {shippingAddress.firstName} {shippingAddress.lastName}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={resetCheckout}
        className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors"
      >
        <span>Securely Start New Transaction</span>
      </button>
    </div>
  );
};

// ==========================================
// DRAFT RESTORATION BANNER
// ==========================================

const RestorationBanner: React.FC = () => {
  const { draftRestored, clearDraftRestoredAlert, resetCheckout } = useCheckout();

  if (!draftRestored) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-400 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start justify-between mb-6">
      <div className="flex gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold">Interruption Prevented</h4>
          <p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">
            Your non-sensitive shipping draft details were safely restored from a previous checkout attempt. Sensitive card details were intentionally excluded.
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0 self-end sm:self-center">
        <button
          onClick={clearDraftRestoredAlert}
          className="bg-amber-650 hover:bg-amber-700 text-white dark:bg-amber-900/40 dark:hover:bg-amber-900/70 text-[11px] font-semibold px-2.5 py-1.5 rounded-md transition-colors"
        >
          Keep Progress
        </button>
        <button
          onClick={resetCheckout}
          className="text-[11px] font-semibold text-amber-800 dark:text-amber-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" /> Clear Draft
        </button>
      </div>
    </div>
  );
};

// ==========================================
// PIPELINE WRAPPER (VIEW ORCHESTRATION)
// ==========================================

const CheckoutPipeline: React.FC = () => {
  const { step } = useCheckout();

  const handleSimulateRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <header className="border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 p-1.5 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Secure Checkout Sandbox</span>
          </div>

          <div className="flex items-center gap-3">
            {step !== 'confirmation' && (
              <button
                onClick={handleSimulateRefresh}
                title="Simulate browser interruption or accidental closure to view state retention performance"
                className="flex items-center gap-1.5 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate Interruption</span>
              </button>
            )}
            
            <div className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Sandbox Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <RestorationBanner />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
              <ProgressBar />

              <div className="mt-8">
                {step === 'shipping' && <ShippingForm />}
                {step === 'delivery' && <DeliveryMethodForm />}
                {step === 'payment' && <PaymentForm />}
                {step === 'confirmation' && <SuccessConfirmation />}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <CheckoutProvider>
      <CheckoutPipeline />
    </CheckoutProvider>
  );
}
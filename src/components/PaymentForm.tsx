import React, { useState } from "react";
import type { PaymentDetails } from "../types";

interface PaymentFormProps {
  onSubmit: (details: PaymentDetails) => void;
  isProcessing: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  isProcessing,
}) => {
  const [formData, setFormData] = useState<PaymentDetails>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentDetails, string>>
  >({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    if (cleanValue.length >= 2) {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
    }
    return cleanValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value).slice(0, 19); // 16 digits + 3 spaces
    } else if (name === "expiry") {
      formattedValue = formatExpiry(value).slice(0, 5); // MM/YY
    } else if (name === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
    } else if (name === "zipCode") {
      formattedValue = value.slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    // Clear validation error when user types
    if (errors[name as keyof PaymentDetails]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentDetails, string>> = {};

    if (!formData.cardName.trim())
      newErrors.cardName = "Name on card is required";
    if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Expiration date must be MM/YY";
    }
    if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP / Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Payment Method
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Complete your purchase by entering payment details.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name on Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name on card
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            placeholder="John Doe"
            disabled={isProcessing}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.cardName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.cardName && (
            <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="0000 0000 0000 0000"
              disabled={isProcessing}
              className={`w-full pl-4 pr-12 py-2.5 rounded-lg border ${
                errors.cardNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
              {/* Basic SVG Credit Card Icon */}
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
          </div>
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiry, CVV, Zip Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry date
            </label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              disabled={isProcessing}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.expiry
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.expiry && (
              <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              disabled={isProcessing}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.cvv
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.cvv && (
              <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP / Postal
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="90210"
              disabled={isProcessing}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.zipCode
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.zipCode && (
              <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing Payment...
          </>
        ) : (
          "Pay Securely"
        )}
      </button>
    </form>
  );
};

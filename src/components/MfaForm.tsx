



import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const MfaForm: React.FC = () => {
  const { verifyMfa, error, clearError } = useAuth();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await verifyMfa(code);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to your authenticator app.
        </p>
        <p className="text-xs text-indigo-500 mt-1">Mock validation code: <span className="font-mono font-bold">123456</span></p>
      </div>
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg flex justify-between">
          <span>{error}</span>
          <button type="button" onClick={clearError}>×</button>
        </div>
      )}
      <div>
        <input
          type="text"
          maxLength={6}
          pattern="\d{6}"
          required
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          className="block w-full px-3 py-3 text-center tracking-widest text-lg font-mono border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || code.length !== 6}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>
    </form>
  );
};
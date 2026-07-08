


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { MfaForm } from '../components/MfaForm';

export const AuthPage: React.FC = () => {
  const { requiresMfa } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {requiresMfa ? 'Security Verification' : isLogin ? 'Sign in to account' : 'Create secure account'}
          </h2>
          {!requiresMfa && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          )}
        </div>

        {requiresMfa ? (
          <MfaForm />
        ) : isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
        
        {!requiresMfa && isLogin && (
          <p className="text-xs text-center text-gray-400 mt-4">
            Tip: Log in with <span className="font-mono font-semibold">"mfa@example.com"</span> to test the MFA workflow.
          </p>
        )}
      </div>
    </div>
  );
};
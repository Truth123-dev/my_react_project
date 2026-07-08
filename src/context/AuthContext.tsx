



import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  requiresMfa: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyMfa: (code: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [requiresMfa, setRequiresMfa] = useState<boolean>(false);
  const [tempUser, setTempUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, _password: string) => {
    setError(null);
    try {
      // Replace with your actual backend API call
      // Example: const response = await api.login(email, password);
      
      // Simulating a secure MFA challenge trigger
      if (email.includes('mfa')) {
        setRequiresMfa(true);
        setTempUser({ id: '1', email, name: 'Secure User' });
      } else {
        setUser({ id: '1', email, name: 'Standard User' });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const verifyMfa = async (code: string) => {
    setError(null);
    try {
      // Replace with backend verification
      if (code === '123456') { // Mock verification
        setUser(tempUser);
        setRequiresMfa(false);
        setTempUser(null);
      } else {
        throw new Error('Invalid security code.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
    }
  };

  const register = async (email: string, _password: string, name: string) => {
    setError(null);
    try {
      // Replace with backend registration API call
      setUser({ id: '2', email, name });
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
  };

  const logout = () => {
    setUser(null);
    setRequiresMfa(false);
    setTempUser(null);
    // Clear any local state or cookies/tokens as required by your backend auth strategy
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        requiresMfa,
        login,
        verifyMfa,
        register,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
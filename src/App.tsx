


import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthPage } from './views/AuthPage';
import { Dashboard } from './views/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute fallback={<AuthPage />}>
        <Dashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
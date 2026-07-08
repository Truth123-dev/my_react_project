


import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthPage } from './views/AuthPage';
import { OfficeDashboard } from './views/OfficeDashboard';

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute fallback={<AuthPage />}>
        <OfficeDashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
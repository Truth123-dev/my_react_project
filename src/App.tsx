



import React from 'react';
import { DataTable } from './components/DataTable';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DataTable />
      </div>
    </div>
  );
};

export default App;
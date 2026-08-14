


import type { Customer, Teller } from '../types/bank';

export const initialCustomers: Customer[] = [
  { id: 'c1', name: 'Alice Smith', accountNumber: 'ACC-88291', balance: 5400, role: 'Individual Saver' },
  { id: 'c2', name: 'Bob Johnson', accountNumber: 'ACC-11029', balance: 12500, role: 'Business Account' },
  { id: 'c3', name: 'Clara Oswald', accountNumber: 'ACC-44910', balance: 750, role: 'Student Account' },
  { id: 'c4', name: 'David Miller', accountNumber: 'ACC-55201', balance: 62000, role: 'Premium Client' },
];

export const initialTellers: Teller[] = [
  { id: 't1', name: 'Teller Sarah', employeeId: 'EMP-01', status: 'Available' },
  { id: 't2', name: 'Teller James', employeeId: 'EMP-02', status: 'Available' },
  { id: 't3', name: 'Teller Elena', employeeId: 'EMP-03', status: 'Busy' },
];


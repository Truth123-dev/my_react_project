


import React, { useState } from 'react';
import type { Employee, SortField, SortDirection } from '../types/table';
import { TableFilter } from './TableFilter';

const employeeData: Employee[] = [
  { id: 1, name: 'Alice Johnson', role: 'Software Engineer', department: 'Engineering', status: 'Active', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', role: 'UX Designer', department: 'Design', status: 'Pending', email: 'bob@example.com' },
  { id: 3, name: 'Catherine Lee', role: 'Product Manager', department: 'Product', status: 'Active', email: 'catherine@example.com' },
  { id: 4, name: 'Daniel Kim', role: 'DevOps Specialist', department: 'Engineering', status: 'Inactive', email: 'daniel@example.com' },
  { id: 5, name: 'Emma Watson', role: 'Data Analyst', department: 'Analytics', status: 'Active', email: 'emma@example.com' },
];

export const DataTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Handle Sort Direction Changes
  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 1. Filtering Logic
  const filteredData = employeeData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 2. Sorting Logic
  const sortedData = [...filteredData].sort((a, b) => {
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white-900 p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Employee Registry</h2>
      
      {/* Search and Filter Row */}
      <TableFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Clickable Header Cells for Sorting */}
              {['name', 'role', 'department'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as SortField)}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-1">
                    {field}
                    {sortField === field && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                      ${employee.status === 'Inactive' ? 'bg-red-100 text-red-800' : ''}
                      ${employee.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                  No employee records matched your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
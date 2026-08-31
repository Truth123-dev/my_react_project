

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Pending';
  email: string;
}

export type SortField = 'name' | 'role' | 'department';
export type SortDirection = 'asc' | 'desc';


export interface Customer {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  role: string;
}

export interface Teller {
  id: string;
  name: string;
  employeeId: string;
  status: 'Available' | 'Busy' | 'On Break';
}

export interface Transaction {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  tellerId: string;
  tellerName: string;
  amount: number;
  timestamp: string;
}
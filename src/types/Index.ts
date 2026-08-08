


export interface Transaction {
   id: string;
   merchant: string;
   category: string;
   amount: number;
   date: string;
   type: "income" | "expense";
}

export interface AccountSummary {
    balance: number;
    income: number;
    expenses: number;
}


// Add this to src/types/index.ts

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
}

// Add this to src/types/index.ts

export interface Contact {
  id: string;
  name: string;
  initials: string;
  color: string; // Tailwind bg color class
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}


export interface Transaction {
  type: string;
  id: number;
  description: string;
  amount: number;
  date: string;
}

export interface User {
  name: string;
  accountBalance: string;
  recentTransactions: Transaction[];
}

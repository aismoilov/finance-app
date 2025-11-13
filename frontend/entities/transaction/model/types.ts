import type { Category } from '../../category';

export interface Transaction {
  id: number;
  amount: number;
  description?: string;
  type: 'income' | 'expense';
  date: string;
  categoryId: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDto {
  amount: number;
  description?: string;
  type: 'income' | 'expense';
  categoryId: number;
  date?: string;
}

export interface UpdateTransactionDto {
  amount?: number;
  description?: string;
  categoryId?: number;
  date?: string;
}

export interface Statistics {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

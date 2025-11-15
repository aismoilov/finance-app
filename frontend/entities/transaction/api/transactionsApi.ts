import api from '../../../shared/api/client';
import type {
  Transaction,
  CreateTransactionDto,
  UpdateTransactionDto,
  Statistics,
} from '../model/types';

export const transactionsApi = {
  getAll: (type?: 'income' | 'expense', month?: number, year?: number) => {
    const params: any = {};
    if (type) params.type = type;
    if (month) params.month = month;
    if (year) params.year = year;
    return api.get<Transaction[]>('/transactions', { params });
  },
  getOne: (id: number) => api.get<Transaction>(`/transactions/${id}`),
  getStatistics: (month?: number, year?: number) => {
    const params: any = {};
    if (month) params.month = month;
    if (year) params.year = year;
    return api.get<Statistics>('/transactions/statistics', { params });
  },
  create: (data: CreateTransactionDto) => api.post<Transaction>('/transactions', data),
  update: (id: number, data: UpdateTransactionDto) =>
    api.put<Transaction>(`/transactions/${id}`, data),
  delete: (id: number) => api.delete(`/transactions/${id}`),
};

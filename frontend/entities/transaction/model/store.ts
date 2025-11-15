import { defineStore } from 'pinia';
import { transactionsApi } from '../api/transactionsApi';
import type { Transaction, CreateTransactionDto, UpdateTransactionDto, Statistics } from './types';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    statistics: null as Statistics | null,
    loading: false,
  }),

  actions: {
    async fetchTransactions(type?: 'income' | 'expense', month?: number, year?: number) {
      this.loading = true;
      try {
        const response = await transactionsApi.getAll(type, month, year);
        const raw: any = response?.data ?? response;
        if (Array.isArray(raw)) {
          this.transactions = raw;
        } else if (Array.isArray(raw?.data)) {
          this.transactions = raw.data;
        } else {
          this.transactions = [];
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchStatistics(month?: number, year?: number) {
      try {
        const response = await transactionsApi.getStatistics(month, year);
        const raw: any = response?.data ?? response;
        this.statistics = raw?.data ?? raw ?? null;
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
        throw error;
      }
    },

    async createTransaction(data: CreateTransactionDto) {
      try {
        const response = await transactionsApi.create(data);
        this.transactions.unshift(response.data);
        await this.fetchStatistics();
        await this.fetchTransactions();
        return response.data;
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to create transaction';
      }
    },

    async updateTransaction(id: number, data: UpdateTransactionDto) {
      try {
        const response = await transactionsApi.update(id, data);
        const index = this.transactions.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.transactions[index] = response.data;
        }
        await this.fetchStatistics();
        return response.data;
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to update transaction';
      }
    },

    async deleteTransaction(id: number) {
      try {
        await transactionsApi.delete(id);
        this.transactions = this.transactions.filter((t) => t.id !== id);
        await this.fetchStatistics();
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to delete transaction';
      }
    },
  },
});

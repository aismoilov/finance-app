import { defineStore } from 'pinia';
import { categoriesApi } from '../api/categoriesApi';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from './types';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
  }),

  getters: {
    expenseCategories: (state) => state.categories.filter((c) => c.type === 'expense'),
    incomeCategories: (state) => state.categories.filter((c) => c.type === 'income'),
  },

  actions: {
    async fetchCategories() {
      this.loading = true;
      try {
        const response = await categoriesApi.getAll();
        this.categories = response.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createCategory(data: CreateCategoryDto) {
      try {
        const response = await categoriesApi.create(data);
        this.categories.push(response.data);
        return response.data;
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to create category';
      }
    },

    async updateCategory(id: number, data: UpdateCategoryDto) {
      try {
        const response = await categoriesApi.update(id, data);
        const index = this.categories.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.categories[index] = response.data;
        }
        return response.data;
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to update category';
      }
    },

    async deleteCategory(id: number) {
      try {
        await categoriesApi.delete(id);
        this.categories = this.categories.filter((c) => c.id !== id);
      } catch (error: any) {
        throw error.response?.data?.message || 'Failed to delete category';
      }
    },
  },
});

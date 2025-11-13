import api from '../../../shared/api/client';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '../model/types';

export const categoriesApi = {
  getAll: (type?: 'income' | 'expense') => {
    const params = type ? { type } : {};
    return api.get<Category[]>('/categories', { params });
  },
  create: (data: CreateCategoryDto) => api.post<Category>('/categories', data),
  update: (id: number, data: UpdateCategoryDto) => api.put<Category>(`/categories/${id}`, data),
  delete: (id: number) => api.delete(`/categories/${id}`),
};

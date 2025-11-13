export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  isDefault: boolean;
  userId: number | null;
}

export interface CreateCategoryDto {
  name: string;
  type: 'income' | 'expense';
}

export interface UpdateCategoryDto {
  name: string;
}

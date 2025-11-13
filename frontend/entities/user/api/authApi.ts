import api from '../../../shared/api/client';
import type { RegisterDto, LoginDto, AuthResponse } from '../model/types';

export const authApi = {
  register: (data: RegisterDto) => api.post<AuthResponse>('/auth/register', data),
  login: (data: LoginDto) => api.post<AuthResponse>('/auth/login', data),
};

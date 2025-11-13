import { defineStore } from 'pinia';
import { authApi } from '../api/authApi';
import type { User, RegisterDto, LoginDto } from './types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;
      if (process.client) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    initAuth() {
      if (process.client) {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          this.token = token;
          this.user = JSON.parse(userStr);
        }
      }
    },

    async register(data: RegisterDto) {
      try {
        const response = await authApi.register(data);
        this.setAuth(response.data.access_token, response.data.user);
        return response.data;
      } catch (error: any) {
        throw error.response?.data?.message || 'Registration failed';
      }
    },

    async login(data: LoginDto) {
      try {
        const response = await authApi.login(data);
        this.setAuth(response.data.access_token, response.data.user);
        return response.data;
      } catch (error: any) {
        throw error.response?.data?.message || 'Login failed';
      }
    },

    logout() {
      this.clearAuth();
      if (process.client) {
        window.location.href = '/login';
      }
    },
  },
});

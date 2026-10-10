import api from './api';
import { User, Role } from '../types';

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    if (response.data?.token) {
      localStorage.setItem('logancee_token', response.data.token);
      localStorage.setItem('logancee_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (name: string, email: string, password: string, role: Role = 'CUSTOMER'): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/register', { name, email, password, role });
    if (response.data?.token) {
      localStorage.setItem('logancee_token', response.data.token);
      localStorage.setItem('logancee_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // client logout even if request fails
    } finally {
      localStorage.removeItem('logancee_token');
      localStorage.removeItem('logancee_user');
    }
  }
};

import api from './api';
import { User, Address } from '../types';

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/users/me', data);
    return response.data;
  },

  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get<Address[]>('/users/me/addresses');
    return response.data;
  },

  addAddress: async (address: Omit<Address, 'id'>): Promise<Address[]> => {
    const response = await api.post<Address[]>('/users/me/addresses', address);
    return response.data;
  },

  updateAddress: async (id: string, address: Partial<Address>): Promise<Address[]> => {
    const response = await api.put<Address[]>(`/users/me/addresses/${id}`, address);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<Address[]> => {
    const response = await api.delete<Address[]>(`/users/me/addresses/${id}`);
    return response.data;
  }
};

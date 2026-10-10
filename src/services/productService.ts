import api from './api';
import { Product, Category, Brand, ProductFilterParams, PaginatedResponse, Coupon } from '../types';

export const productService = {
  getProducts: async (params?: ProductFilterParams): Promise<PaginatedResponse<Product>> => {
    const response = await api.get<PaginatedResponse<Product>>('/products', { params });
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string): Promise<{ products: Product[]; categories: Category[]; brands: Brand[] }> => {
    const response = await api.get<{ products: Product[]; categories: Category[]; brands: Brand[] }>('/products/search', { params: { q: query } });
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  getBrands: async (): Promise<Brand[]> => {
    const response = await api.get<Brand[]>('/brands');
    return response.data;
  },

  getCoupons: async (): Promise<Coupon[]> => {
    const response = await api.get<Coupon[]>('/admin/coupons');
    return response.data;
  }
};

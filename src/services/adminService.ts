import api from './api';
import { Product, Order, Inventory, Coupon, OrderStatus } from '../types';

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  pendingOrdersCount: number;
  revenueChart: { month: string; amount: number }[];
  categorySalesChart: { category: string; value: number }[];
}

export const adminService = {
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get<DashboardMetrics>('/admin/dashboard');
    return response.data;
  },

  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/admin/products');
    return response.data;
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post<Product>('/admin/products', product);
    return response.data;
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await api.put<Product>(`/admin/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    const response = await api.delete<boolean>(`/admin/products/${id}`);
    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/admin/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
    const response = await api.put<Order>(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  },

  getInventory: async (): Promise<Inventory[]> => {
    const response = await api.get<Inventory[]>('/admin/inventory');
    return response.data;
  },

  updateStock: async (inventoryId: string, availableStock: number): Promise<Inventory> => {
    const response = await api.put<Inventory>(`/admin/inventory/${inventoryId}`, { availableStock });
    return response.data;
  },

  getCoupons: async (): Promise<Coupon[]> => {
    const response = await api.get<Coupon[]>('/admin/coupons');
    return response.data;
  },

  createCoupon: async (coupon: Omit<Coupon, 'id' | 'usageCount'>): Promise<Coupon> => {
    const response = await api.post<Coupon>('/admin/coupons', coupon);
    return response.data;
  }
};

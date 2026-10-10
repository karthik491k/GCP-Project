import api from './api';
import { Order, Address, PaymentMethodType, CartItem } from '../types';

export interface CreateOrderPayload {
  shippingAddress: Address;
  paymentMethod: PaymentMethodType;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
}

export const orderService = {
  createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
    const response = await api.post<Order>('/orders', payload);
    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id: string, reason?: string): Promise<Order> => {
    const response = await api.post<Order>(`/orders/${id}/cancel`, { reason });
    return response.data;
  }
};

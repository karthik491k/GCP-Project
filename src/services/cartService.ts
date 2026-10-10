import api from './api';
import { Cart, Product } from '../types';

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get<Cart>('/cart');
    return response.data;
  },

  addItem: async (product: Product, color: string, size: string, quantity: number = 1): Promise<Cart> => {
    const response = await api.post<Cart>('/cart/items', {
      productId: product.id,
      color,
      size,
      quantity,
    });
    return response.data;
  },

  updateQuantity: async (productId: string, quantity: number, color?: string, size?: string): Promise<Cart> => {
    const response = await api.put<Cart>(`/cart/items/${productId}`, { quantity, color, size });
    return response.data;
  },

  removeItem: async (productId: string, color?: string, size?: string): Promise<Cart> => {
    const response = await api.delete<Cart>(`/cart/items/${productId}`, {
      params: { color, size }
    });
    return response.data;
  },

  clearCart: async (): Promise<Cart> => {
    const response = await api.delete<Cart>('/cart');
    return response.data;
  },

  applyCoupon: async (couponCode: string): Promise<{ cart: Cart; message: string }> => {
    const response = await api.post<{ cart: Cart; message: string }>('/cart/coupon', { code: couponCode });
    return response.data;
  }
};

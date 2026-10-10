import api from './api';
import { WishlistItem, Product } from '../types';

export const wishlistService = {
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await api.get<WishlistItem[]>('/wishlist');
    return response.data;
  },

  addToWishlist: async (product: Product): Promise<WishlistItem[]> => {
    const response = await api.post<WishlistItem[]>(`/wishlist/${product.id}`);
    return response.data;
  },

  removeFromWishlist: async (productId: string): Promise<WishlistItem[]> => {
    const response = await api.delete<WishlistItem[]>(`/wishlist/${productId}`);
    return response.data;
  }
};

import api from './api';
import { Review } from '../types';

export const reviewService = {
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/product/${productId}`);
    return response.data;
  },

  addReview: async (productId: string, review: { rating: number; title: string; comment: string; images?: string[] }): Promise<Review> => {
    const response = await api.post<Review>(`/reviews/product/${productId}`, review);
    return response.data;
  },

  voteHelpful: async (reviewId: string): Promise<number> => {
    const response = await api.post<number>(`/reviews/${reviewId}/helpful`);
    return response.data;
  }
};

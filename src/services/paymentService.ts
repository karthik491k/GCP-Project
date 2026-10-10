import api from './api';

export interface CreatePaymentResponse {
  paymentId: string;
  razorpayOrderId?: string;
  amount: number;
  currency: string;
  keyId: string;
}

export const paymentService = {
  createPaymentOrder: async (amount: number, orderId: string): Promise<CreatePaymentResponse> => {
    const response = await api.post<CreatePaymentResponse>('/payments/create', { amount, orderId });
    return response.data;
  },

  verifyPayment: async (paymentDetails: {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
  }): Promise<{ status: 'SUCCESS' | 'FAILED'; transactionId: string }> => {
    const response = await api.post<{ status: 'SUCCESS' | 'FAILED'; transactionId: string }>('/payments/verify', paymentDetails);
    return response.data;
  }
};

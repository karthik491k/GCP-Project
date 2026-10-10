import api from './api';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  date?: string;
  read: boolean;
  type: 'ORDER' | 'WISHLIST' | 'PROMO' | 'SYSTEM';
  link?: string;
}

export const notificationService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    const res = await api.get<NotificationItem[]>('/notifications');
    return res.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.put(`/notifications/${id}/read`);
  },
};

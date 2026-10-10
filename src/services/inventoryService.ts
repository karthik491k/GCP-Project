import api from './api';

export interface InventoryCheckResult {
  productId: string;
  inStock: boolean;
  availableQuantity: number;
}

export const inventoryService = {
  checkStock: async (productId: string, requestedQty: number): Promise<InventoryCheckResult> => {
    const res = await api.get<InventoryCheckResult>(`/inventory/${productId}?qty=${requestedQty}`);
    return res.data;
  },

  reserveStock: async (items: { productId: string; quantity: number }[]): Promise<boolean> => {
    const res = await api.post<boolean>('/inventory/reserve', { items });
    return res.data;
  },
};

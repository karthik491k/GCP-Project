import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Order, OrderStatus } from '../../types';
import { useToast } from '../../context/ToastContext';
import { ShoppingBag, Search } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast();

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getOrders();
      setOrders(data);
    } catch {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      const updated = await adminService.updateOrderStatus(orderId, status);
      setOrders(orders.map(o => o.id === orderId ? updated : o));
      showToast('Status Updated', `Order #${updated.orderNumber} status changed to ${status}`, 'success');
    } catch {
      showToast('Error', 'Could not update status', 'error');
    }
  };

  const filteredOrders = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div>
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">ORDER FULFILLMENT</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">CUSTOMER ORDERS ({orders.length})</h1>
      </div>

      <div className="p-4 bg-neutral-900 border border-neutral-800 flex items-center gap-4">
        <Search className="w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Filter orders by customer name or order number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-xs text-white outline-none w-full font-mono placeholder:text-neutral-500"
        />
      </div>

      <div className="bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-black text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-neutral-800">
            <tr>
              <th className="p-4">Order No.</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Order Status</th>
              <th className="p-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="p-4 font-mono font-bold text-white">#{ord.orderNumber}</td>
                <td className="p-4">
                  <div className="font-bold text-white">{ord.shippingAddress.fullName}</div>
                  <div className="text-[10px] text-neutral-400">{ord.shippingAddress.city}, {ord.shippingAddress.state}</div>
                </td>
                <td className="p-4 font-bold text-white">₹{ord.totalAmount.toLocaleString()}</td>
                <td className="p-4 font-semibold text-emerald-400">{ord.paymentStatus} ({ord.paymentMethod})</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-neutral-800 text-white font-mono text-[10px] font-bold">
                    {ord.orderStatus}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                    className="bg-black border border-neutral-700 text-white text-[11px] p-1.5 focus:outline-none"
                  >
                    <option value="ORDER_PLACED">ORDER PLACED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PACKED">PACKED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

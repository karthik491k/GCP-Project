import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Package, FileText } from 'lucide-react';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch {
        // error
      } flex: {
        setIsLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    try {
      const updated = await orderService.cancelOrder(selectedOrder.id, cancelReason);
      setOrders(orders.map(o => o.id === updated.id ? updated : o));
      setSelectedOrder(updated);
      setIsCancelModalOpen(false);
      showToast('Order Cancelled', `Order #${updated.orderNumber} has been cancelled.`, 'info');
    } catch {
      showToast('Error', 'Could not cancel order', 'error');
    }
  };

  const statusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 text-[10px] uppercase">DELIVERED</span>;
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
        return <span className="bg-sky-100 text-sky-800 font-bold px-2.5 py-0.5 text-[10px] uppercase">IN TRANSIT</span>;
      case 'CANCELLED':
        return <span className="bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 text-[10px] uppercase">CANCELLED</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 text-[10px] uppercase">PROCESSING</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#121212]">
      <div>
        <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">MEMBER PORTAL</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">MY ORDERS & TRACKING</h1>
      </div>

      {isLoading ? (
        <div className="py-20 text-center font-editorial text-xl animate-pulse">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 border text-center space-y-4">
          <Package className="w-12 h-12 text-neutral-400 mx-auto" />
          <h3 className="font-editorial text-xl">No Orders Found</h3>
          <p className="text-xs text-neutral-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="bg-neutral-50 p-4 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-bold block">ORDER NO.</span>
                    <span className="font-bold text-black text-sm">#{ord.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-bold block">DATE PLACED</span>
                    <span className="font-semibold">{new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-bold block">TOTAL AMOUNT</span>
                    <span className="font-bold text-black text-sm">₹{ord.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {statusBadge(ord.orderStatus)}
                  <Button onClick={() => setSelectedOrder(ord)} variant="outline" size="sm">
                    VIEW DETAILS & TRACK
                  </Button>
                </div>
              </div>

              {/* Items Summary */}
              <div className="p-4 sm:p-6 divide-y divide-neutral-100">
                {ord.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <img src={item.productImage} alt="" className="w-12 h-16 object-cover bg-neutral-100" />
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">{item.brand}</span>
                        <h4 className="font-semibold text-black">{item.productName}</h4>
                        <p className="text-[11px] text-neutral-500">{item.color} | {item.size} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-black">₹{item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details & Tracking Timeline Modal */}
      {selectedOrder && (
        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} maxWidth="2xl" title={`Order Details #${selectedOrder.orderNumber}`}>
          <div className="space-y-6 text-xs">
            {/* Status Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400">Order Delivery Timeline</h4>
              <div className="space-y-4 pl-4 border-l-2 border-neutral-200">
                {selectedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    <span className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 bg-white ${
                      step.completed ? 'border-emerald-600 bg-emerald-600' : 'border-neutral-300'
                    }`} />
                    <div>
                      <h5 className={`font-bold uppercase ${step.completed ? 'text-black' : 'text-neutral-400'}`}>
                        {step.status.replace(/_/g, ' ')}
                      </h5>
                      <p className="text-neutral-500 mt-0.5">{step.description}</p>
                      {step.timestamp && <span className="text-[10px] text-neutral-400 font-mono">{step.timestamp}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Payment Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 border border-neutral-200">
              <div>
                <h5 className="font-bold text-neutral-500 uppercase tracking-wider mb-1">Shipping Address</h5>
                <p className="font-bold text-black">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-neutral-600">{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.zipCode}</p>
              </div>
              <div>
                <h5 className="font-bold text-neutral-500 uppercase tracking-wider mb-1">Payment Status</h5>
                <p className="font-bold text-emerald-800 uppercase">{selectedOrder.paymentStatus} ({selectedOrder.paymentMethod})</p>
                <p className="text-neutral-500 mt-1">Tracking #: <span className="font-bold text-black">{selectedOrder.trackingNumber}</span></p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              {selectedOrder.orderStatus !== 'DELIVERED' && selectedOrder.orderStatus !== 'CANCELLED' && (
                <Button onClick={() => setIsCancelModalOpen(true)} variant="danger" size="sm">
                  CANCEL ORDER
                </Button>
              )}
              <Button onClick={() => window.print()} variant="secondary" size="sm" className="ml-auto">
                <FileText className="w-3.5 h-3.5 mr-1.5" /> PRINT INVOICE
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Cancel Order Confirm Modal */}
      <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} title="Cancel Order Confirmation">
        <div className="space-y-4">
          <p className="text-xs text-neutral-600">Are you sure you want to cancel this order? Please select a cancellation reason.</p>
          <select
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
          >
            <option value="">Select Reason...</option>
            <option value="Changed my mind">Changed my mind</option>
            <option value="Found lower price elsewhere">Found lower price elsewhere</option>
            <option value="Order created by mistake">Order created by mistake</option>
          </select>
          <Button onClick={handleCancelOrder} variant="danger" className="w-full py-3">CONFIRM CANCELLATION</Button>
        </div>
      </Modal>
    </div>
  );
};

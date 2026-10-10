import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ArrowLeft, Package, Truck, ShieldCheck, MapPin, CreditCard, FileText, XCircle, CheckCircle2 } from 'lucide-react';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch {
        // fallback
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order) return;
    try {
      const updated = await orderService.cancelOrder(order.id, cancelReason);
      setOrder(updated);
      setIsCancelModalOpen(false);
      showToast('Order Cancelled', `Order #${updated.orderNumber} has been cancelled.`, 'info');
    } catch {
      showToast('Error', 'Could not cancel order', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-editorial text-2xl">Order Not Found</h2>
        <p className="text-xs text-neutral-500">We could not locate the requested order details.</p>
        <Link to="/orders">
          <Button variant="secondary">RETURN TO MY ORDERS</Button>
        </Link>
      </div>
    );
  }

  const isCancellable = order.canCancel !== undefined ? order.canCancel : (order.orderStatus === 'ORDER_PLACED' || order.orderStatus === 'CONFIRMED');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#121212] animate-fade-in">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <Link to="/orders" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Orders
        </Link>
        <span className="text-xs font-mono font-bold bg-neutral-100 px-3 py-1 text-neutral-800">
          ORDER #{order.orderNumber}
        </span>
      </div>

      {/* Status Timeline */}
      <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
          <h3 className="font-editorial text-xl font-medium tracking-tight">DELIVERY TRACKING TIMELINE</h3>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
            {order.orderStatus.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="py-4">
          <div className="space-y-6 pl-6 border-l-2 border-neutral-200 relative">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                  step.completed ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-neutral-300'
                }`}>
                  {step.completed && <CheckCircle2 className="w-3 h-3" />}
                </span>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${step.completed ? 'text-black' : 'text-neutral-400'}`}>
                    {step.status.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">{step.description}</p>
                  {step.timestamp && <span className="text-[10px] text-neutral-400 font-mono block mt-1">{step.timestamp}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Address & Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-3 text-xs">
          <h4 className="font-editorial text-lg font-medium tracking-tight flex items-center gap-2 border-b border-neutral-100 pb-2">
            <MapPin className="w-4 h-4 text-neutral-700" /> SHIPPING ADDRESS
          </h4>
          <p className="font-bold text-black">{order.shippingAddress.fullName}</p>
          <p className="text-neutral-600">{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
          <p className="text-neutral-500">Phone: {order.shippingAddress.phone}</p>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-3 text-xs">
          <h4 className="font-editorial text-lg font-medium tracking-tight flex items-center gap-2 border-b border-neutral-100 pb-2">
            <CreditCard className="w-4 h-4 text-neutral-700" /> PAYMENT & COURIER
          </h4>
          <div className="flex justify-between">
            <span className="text-neutral-500">Payment Method:</span>
            <span className="font-bold uppercase text-black">{order.paymentMethod.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Payment Status:</span>
            <span className="font-bold uppercase text-emerald-800">{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Courier Tracking #:</span>
            <span className="font-bold font-mono text-black">{order.trackingNumber}</span>
          </div>
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-4">
        <h4 className="font-editorial text-lg font-medium tracking-tight border-b border-neutral-100 pb-3">ORDER ITEMS ({order.items.length})</h4>
        <div className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <img src={item.productImage} alt="" className="w-12 h-16 object-cover bg-neutral-100 border border-neutral-200" />
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">{item.brand}</span>
                  <h5 className="font-bold text-black">{item.productName}</h5>
                  <p className="text-[11px] text-neutral-500">{item.color} | {item.size} x {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-black">₹{item.totalPrice.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-neutral-200 text-xs space-y-2 max-w-xs ml-auto">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal</span>
            <span className="font-semibold text-black">₹{order.subtotal.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Discount</span>
              <span>-₹{order.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-neutral-600">
            <span>Shipping</span>
            <span className="font-semibold text-black">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Tax</span>
            <span className="font-semibold text-black">₹{order.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-neutral-200">
            <span>Total Amount</span>
            <span>₹{order.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-50 p-4 border border-neutral-200">
        {isCancellable ? (
          <Button onClick={() => setIsCancelModalOpen(true)} variant="danger" size="sm">
            <XCircle className="w-4 h-4 mr-1.5" /> CANCEL ORDER
          </Button>
        ) : (
          <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
            Order Status ({order.orderStatus}) cannot be self-cancelled.
          </span>
        )}

        <Button onClick={() => window.print()} variant="secondary" size="sm">
          <FileText className="w-4 h-4 mr-1.5" /> DOWNLOAD INVOICE
        </Button>
      </div>

      {/* Cancel Confirmation Modal */}
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

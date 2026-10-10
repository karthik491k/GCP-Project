import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Package, ArrowRight, Truck, Calendar, CreditCard, ShoppingBag } from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const data = await orderService.getOrderById(orderId);
        setOrder(data);
      } catch {
        // Fallback demo order
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const orderNumber = order ? order.orderNumber : orderId || 'ORD-2026-000123';
  const totalAmount = order ? order.totalAmount : 4999;
  const deliveryAddress = order?.shippingAddress;
  const paymentMethod = order?.paymentMethod || 'UPI';
  const estDelivery = order?.estimatedDelivery || '3-5 Business Days';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#121212] animate-fade-in">
      <div className="bg-white p-8 md:p-12 border border-neutral-200 shadow-xl text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-700 block">ORDER PLACED SUCCESSFULLY</span>
          <h1 className="font-editorial text-4xl font-light tracking-tight mt-1">THANK YOU FOR YOUR ORDER</h1>
          <p className="text-xs text-neutral-500 mt-2">
            Order Reference: <span className="font-bold text-black font-mono">#{orderNumber}</span>
          </p>
        </div>

        <div className="bg-neutral-50 p-6 border border-neutral-200 text-left space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-neutral-200">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold block mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-600" /> Delivery Address
              </span>
              <p className="font-bold text-black">{deliveryAddress?.fullName || 'Karthik'}</p>
              <p className="text-neutral-600">{deliveryAddress?.street || '123 Luxury Lane'}, {deliveryAddress?.city || 'Hyderabad'}, {deliveryAddress?.state || 'Telangana'} - {deliveryAddress?.zipCode || '500001'}</p>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-600" /> Estimated Delivery
              </span>
              <p className="font-bold text-emerald-800">{estDelivery}</p>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold block mt-3 mb-1 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-neutral-600" /> Payment Method
              </span>
              <p className="font-semibold text-black uppercase">{paymentMethod.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Items Preview */}
          {order && order.items && order.items.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">Purchased Items ({order.items.length})</span>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={item.productImage} alt="" className="w-10 h-12 object-cover bg-neutral-100" />
                    <div>
                      <p className="font-semibold text-black">{item.productName}</p>
                      <p className="text-[10px] text-neutral-500">{item.color} | {item.size} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-black">₹{item.totalPrice.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-neutral-200 flex justify-between text-sm font-bold text-black">
            <span>Total Paid</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link to="/orders">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-[#121212] text-white">
              TRACK ORDER <Package className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/orders">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8">
              VIEW ORDERS
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
              CONTINUE SHOPPING <ShoppingBag className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

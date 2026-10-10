import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartDrawerOpen, closeCartDrawer, updateQuantity, removeFromCart, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponCode);
    setIsApplyingCoupon(false);
    setCouponCode('');
  };

  const handleProceedToCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleViewCartPage = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  return (
    <Drawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} title={`Shopping Bag (${cart.items.length})`}>
      {cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-editorial text-xl font-medium">Your Bag is Empty</h3>
          <p className="text-xs text-neutral-500 mt-2 max-w-xs">
            Discover our haute couture collections, organic skincare, and curated lifestyle tech.
          </p>
          <Button onClick={() => { closeCartDrawer(); navigate('/shop'); }} className="mt-6">
            EXPLORE COLLECTIONS
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-100">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover bg-neutral-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">
                          {item.product.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-[#121212] line-clamp-1">{item.product.name}</h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.color, item.size)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 mt-1">
                      Color: <span className="font-medium text-black">{item.color}</span> | Size: <span className="font-medium text-black">{item.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-neutral-200">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.color, item.size)}
                        className="px-2 py-1 text-neutral-500 hover:text-black hover:bg-neutral-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.color, item.size)}
                        className="px-2 py-1 text-neutral-500 hover:text-black hover:bg-neutral-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-black">₹{item.subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary & Actions */}
          <div className="pt-4 border-t border-neutral-200 mt-4 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 pl-8 pr-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-black"
                />
              </div>
              <Button type="submit" variant="secondary" size="sm" isLoading={isApplyingCoupon}>
                APPLY
              </Button>
            </form>

            {cart.appliedCoupon && (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 border border-emerald-200 flex justify-between items-center font-medium">
                <span>Coupon ({cart.appliedCoupon.code}) Applied</span>
                <span>-₹{cart.discount.toLocaleString()}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-black">₹{cart.subtotal.toLocaleString()}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span>-₹{cart.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-black">
                  {cart.shipping === 0 ? 'FREE' : `₹${cart.shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span className="font-medium text-black">₹{cart.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-neutral-100">
                <span>Total Amount</span>
                <span>₹{cart.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={handleProceedToCheckout} className="w-full py-3">
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <button
                onClick={handleViewCartPage}
                className="w-full text-center text-xs uppercase tracking-widest text-neutral-500 hover:text-black py-2 font-semibold transition-colors"
              >
                VIEW FULL SHOPPING BAG
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

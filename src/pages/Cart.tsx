import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { ProductGrid } from '../components/product/ProductGrid';
import { productService } from '../services/productService';
import { Product } from '../types';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Truck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 999;
  const currentSubtotal = cart.subtotal;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - currentSubtotal);
  const shippingProgressPct = Math.min(100, Math.round((currentSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  useEffect(() => {
    const loadRecs = async () => {
      const res = await productService.getProducts({ sortBy: 'recommended', limit: 4 });
      setRecommended(res.content);
    };
    loadRecs();
  }, []);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplying(true);
    await applyCoupon(couponCode);
    setIsApplying(false);
    setCouponCode('');
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-editorial text-3xl font-light">YOUR SHOPPING BAG IS EMPTY</h1>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Explore our couture fashion, botanical skincare formulas, and next-gen audio gear.
        </p>
        <Link to="/shop">
          <Button size="lg" className="px-10 py-4 mt-2 font-bold">
            EXPLORE MARKETPLACE
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-[#121212]">
      {/* Free Shipping Progress Meter */}
      <div className="bg-neutral-900 text-white p-4 sm:p-5 border border-neutral-800 space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-400 font-bold">CONGRATULATIONS! YOU QUALIFY FOR COMPLIMENTARY FREE EXPRESS SHIPPING</span>
            ) : (
              <span>Add <strong className="text-amber-400">₹{amountNeededForFreeShipping.toLocaleString()}</strong> more to get FREE SHIPPING</span>
            )}
          </span>
          <span className="font-mono">{shippingProgressPct}%</span>
        </div>
        <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${shippingProgressPct}%` }}
          />
        </div>
      </div>

      <div>
        <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">SHOPPING BAG</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">YOUR SELECTED ITEMS ({cart.items.length})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Items Table (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="hidden sm:grid grid-cols-12 pb-3 border-b border-neutral-200 text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          <div className="divide-y divide-neutral-100">
            {cart.items.map((item) => (
              <div key={item.id} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Product Info */}
                <div className="sm:col-span-6 flex gap-4 items-center">
                  <img src={item.product.images[0]} alt="" className="w-20 h-24 object-cover bg-neutral-100 shrink-0 border" />
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">{item.product.brand}</span>
                    <Link to={`/product/${item.product.id}`} className="text-xs font-semibold text-black hover:underline line-clamp-1">
                      {item.product.name}
                    </Link>
                    <div className="text-[11px] text-neutral-500 mt-1">
                      Color: <span className="font-semibold text-black">{item.color}</span> | Size: <span className="font-semibold text-black">{item.size}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.color, item.size)}
                      className="text-neutral-400 hover:text-rose-600 text-[10px] uppercase font-bold flex items-center gap-1 mt-2 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Remove Item
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="sm:col-span-2 sm:text-center text-xs font-medium">
                  ₹{item.price.toLocaleString()}
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex sm:justify-center">
                  <div className="flex items-center border border-neutral-300 bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.color, item.size)}
                      className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.color, item.size)}
                      className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 text-right font-bold text-xs">
                  ₹{item.subtotal.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
            <Link to="/shop" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black font-semibold">
              ← CONTINUE SHOPPING
            </Link>
          </div>
        </div>

        {/* Right Summary Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-editorial text-xl font-medium tracking-tight border-b border-neutral-100 pb-3">ORDER SUMMARY</h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-600 block">PROMO CODE</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. WELCOME20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 pl-8 pr-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-black"
                  />
                </div>
                <Button type="submit" variant="secondary" size="sm" isLoading={isApplying}>
                  APPLY
                </Button>
              </div>
            </form>

            {cart.appliedCoupon && (
              <div className="text-[11px] text-emerald-800 bg-emerald-50 p-3 border border-emerald-200 font-medium space-y-0.5">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Coupon ({cart.appliedCoupon.code}) Applied!
                </div>
                <div>You saved <strong className="text-emerald-700">₹{cart.discount.toLocaleString()}</strong> on this order.</div>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-black">₹{cart.subtotal.toLocaleString()}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promo Discount</span>
                  <span>-₹{cart.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-medium text-black">
                  {cart.shipping === 0 ? 'FREE' : `₹${cart.shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span className="font-medium text-black">₹{cart.tax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-neutral-200">
                <span>Total Amount</span>
                <span>₹{cart.total.toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={() => navigate('/checkout')} size="lg" className="w-full py-4 font-bold">
              PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended Items Below Cart */}
      {recommended.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">PAIR WITH YOUR ORDER</span>
            <h2 className="font-editorial text-2xl font-light tracking-tight mt-0.5">YOU MAY ALSO LIKE</h2>
          </div>
          <ProductGrid products={recommended} />
        </div>
      )}
    </div>
  );
};

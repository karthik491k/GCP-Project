import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { userService } from '../services/userService';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { Address, PaymentMethodType, Order } from '../types';
import { Button } from '../components/ui/Button';
import { Check, ShieldCheck, Truck, CreditCard, Smartphone, Building2, CheckCircle2, ArrowRight, MapPin, Package } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // New Address inline form
  const [isAddingNewAddr, setIsAddingNewAddr] = useState(false);
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');
  const [newPhone, setNewPhone] = useState(user?.phone || '');

  // Step 2 Delivery
  const [deliveryMethod, setDeliveryMethod] = useState<'STANDARD' | 'EXPRESS'>('STANDARD');

  // Step 3 Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const addrs = await userService.getAddresses();
        setAddresses(addrs);
        const def = addrs.find(a => a.isDefault) || addrs[0];
        if (def) setSelectedAddress(def);
      } catch {
        // fallback
      }
    };
    loadAddresses();
  }, []);

  if (cart.items.length === 0 && step !== 5) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-editorial text-2xl font-medium">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-neutral-500">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop">
          <Button className="mt-2">BROWSE MARKETPLACE</Button>
        </Link>
      </div>
    );
  }

  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newState || !newZip || !newPhone) {
      showToast('Validation Error', 'Please fill in all address fields.', 'warning');
      return;
    }

    const created = await userService.addAddress({
      fullName: newFullName,
      street: newStreet,
      city: newCity,
      state: newState,
      zipCode: newZip,
      country: 'India',
      phone: newPhone,
      isDefault: addresses.length === 0,
      type: 'Home',
    });

    setAddresses(created);
    const added = created[created.length - 1];
    setSelectedAddress(added);
    setIsAddingNewAddr(false);
    showToast('Address Saved', 'New delivery address added successfully.', 'success');
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      showToast('Address Required', 'Please select a shipping address.', 'warning');
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      // Create order via orderService
      const created = await orderService.createOrder({
        shippingAddress: selectedAddress,
        paymentMethod,
        items: cart.items,
        subtotal: cart.subtotal,
        discount: cart.discount,
        shippingFee: deliveryMethod === 'EXPRESS' ? 250 : cart.shipping,
        tax: cart.tax,
        totalAmount: cart.total + (deliveryMethod === 'EXPRESS' ? 250 : 0),
      });

      // Verify payment gateway integration simulation
      if (paymentMethod !== 'COD') {
        const payRes = await paymentService.createPaymentOrder(created.totalAmount, created.id);
        await paymentService.verifyPayment({
          razorpayPaymentId: payRes.paymentId,
          razorpayOrderId: payRes.razorpayOrderId || 'rzp_mock',
          razorpaySignature: 'mock_signature',
        });
      }

      setCompletedOrder(created);
      await clearCart();
      setStep(5); // Success step
      showToast('Order Placed Successfully!', `Order #${created.orderNumber} confirmed.`, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Order processing failed';
      showToast('Checkout Failed', msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#121212]">
      {/* Checkout Header & Step Bar */}
      {step !== 5 && (
        <div className="space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">SECURE CHECKOUT</span>
            <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">LOGANCEE CONCIERGE CHECKOUT</h1>
          </div>

          {/* Stepper Indicator */}
          <div className="grid grid-cols-4 gap-2 border-y border-neutral-200 py-4 text-xs font-semibold uppercase tracking-wider">
            {[
              { num: 1, title: 'Shipping Address' },
              { num: 2, title: 'Delivery Method' },
              { num: 3, title: 'Payment Info' },
              { num: 4, title: 'Review Order' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 ${
                  step === s.num
                    ? 'text-black font-bold'
                    : step > s.num
                    ? 'text-emerald-700'
                    : 'text-neutral-400'
                }`}
              >
                <span className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  step === s.num
                    ? 'bg-[#121212] text-white'
                    : step > s.num
                    ? 'bg-emerald-700 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </span>
                <span className="hidden md:inline">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: ORDER SUCCESS SCREEN */}
      {step === 5 && completedOrder && (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-neutral-200 shadow-xl text-center space-y-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-800">ORDER CONFIRMED</span>
            <h1 className="font-editorial text-4xl font-light tracking-tight mt-1">THANK YOU FOR YOUR PURCHASE</h1>
            <p className="text-xs text-neutral-500 mt-2">
              Order <span className="font-bold text-black">#{completedOrder.orderNumber}</span> has been confirmed and queued for Atelier packing.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 border border-neutral-200 text-left space-y-4">
            <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-neutral-200 text-xs">
              <div>
                <span className="text-neutral-400 uppercase tracking-widest font-semibold block">Shipping Address</span>
                <p className="font-bold mt-0.5">{completedOrder.shippingAddress.fullName}</p>
                <p className="text-neutral-600">{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.zipCode}</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <span className="text-neutral-400 uppercase tracking-widest font-semibold block">Estimated Delivery</span>
                <p className="font-bold text-emerald-800 mt-0.5">{completedOrder.estimatedDelivery}</p>
                <p className="text-neutral-500 text-[10px]">Tracking #: {completedOrder.trackingNumber}</p>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">Order Items</span>
              {completedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.productImage} alt="" className="w-10 h-12 object-cover bg-neutral-100" />
                    <div>
                      <p className="font-semibold text-black">{item.productName}</p>
                      <p className="text-[10px] text-neutral-500">{item.color} | {item.size} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">₹{item.totalPrice.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 flex justify-between text-sm font-bold">
              <span>Total Amount Paid</span>
              <span>₹{completedOrder.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link to="/orders">
              <Button size="lg" className="w-full sm:w-auto px-8">
                TRACK ORDER STATUS <Package className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/shop">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* CHECKOUT STEPS CONTENT */}
      {step !== 5 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Forms (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* STEP 1: ADDRESS */}
            {step === 1 && (
              <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <h3 className="font-editorial text-xl font-medium tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-neutral-700" /> SELECT DELIVERY ADDRESS
                  </h3>
                  <button
                    onClick={() => setIsAddingNewAddr(!isAddingNewAddr)}
                    className="text-xs font-semibold uppercase tracking-wider text-black underline"
                  >
                    {isAddingNewAddr ? 'Cancel' : '+ Add New Address'}
                  </button>
                </div>

                {/* Inline New Address Form */}
                {isAddingNewAddr ? (
                  <form onSubmit={handleAddNewAddress} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">Street Address</label>
                      <input
                        type="text"
                        placeholder="House no, apartment, street name"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">City</label>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">State</label>
                        <input
                          type="text"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">PIN / Zip Code</label>
                        <input
                          type="text"
                          value={newZip}
                          onChange={(e) => setNewZip(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" size="md">SAVE ADDRESS & CONTINUE</Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-4 p-4 border transition-all cursor-pointer ${
                          selectedAddress?.id === addr.id
                            ? 'border-black bg-neutral-50 shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress?.id === addr.id}
                          onChange={() => setSelectedAddress(addr)}
                          className="mt-1 accent-black"
                        />
                        <div className="text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black">{addr.fullName}</span>
                            <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.5 uppercase font-semibold">{addr.type}</span>
                            {addr.isDefault && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 font-bold">DEFAULT</span>}
                          </div>
                          <p className="text-neutral-600 mt-1">{addr.street}, {addr.city}, {addr.state} - {addr.zipCode}</p>
                          <p className="text-neutral-500 mt-0.5">Phone: {addr.phone}</p>
                        </div>
                      </label>
                    ))}

                    <Button onClick={() => setStep(2)} disabled={!selectedAddress} className="w-full py-3.5 mt-4">
                      PROCEED TO DELIVERY METHOD <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: DELIVERY METHOD */}
            {step === 2 && (
              <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
                <h3 className="font-editorial text-xl font-medium tracking-tight flex items-center gap-2 pb-4 border-b border-neutral-100">
                  <Truck className="w-5 h-5 text-neutral-700" /> SELECT DELIVERY METHOD
                </h3>

                <div className="space-y-4">
                  <label className={`flex items-center justify-between p-4 border cursor-pointer ${
                    deliveryMethod === 'STANDARD' ? 'border-black bg-neutral-50' : 'border-neutral-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'STANDARD'}
                        onChange={() => setDeliveryMethod('STANDARD')}
                        className="accent-black"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-black uppercase">Standard Express Delivery (3 Business Days)</h4>
                        <p className="text-[11px] text-neutral-500">Delivered in luxury Logancee presentation box via BlueDart.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800">FREE</span>
                  </label>

                  <label className={`flex items-center justify-between p-4 border cursor-pointer ${
                    deliveryMethod === 'EXPRESS' ? 'border-black bg-neutral-50' : 'border-neutral-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'EXPRESS'}
                        onChange={() => setDeliveryMethod('EXPRESS')}
                        className="accent-black"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-black uppercase">Priority Overnight Air Courier (24-48 Hours)</h4>
                        <p className="text-[11px] text-neutral-500">Guaranteed priority dispatch with real-time SMS tracking updates.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-black">₹250</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-neutral-100">
                  <Button variant="secondary" onClick={() => setStep(1)}>BACK</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 py-3.5">
                    PROCEED TO PAYMENT <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
                <h3 className="font-editorial text-xl font-medium tracking-tight flex items-center gap-2 pb-4 border-b border-neutral-100">
                  <ShieldCheck className="w-5 h-5 text-neutral-700" /> CHOOSE PAYMENT METHOD
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                    { id: 'CARD', label: 'Credit / Debit', icon: CreditCard },
                    { id: 'NET_BANKING', label: 'Net Banking', icon: Building2 },
                    { id: 'COD', label: 'Cash on Delivery', icon: Package },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as PaymentMethodType)}
                      className={`flex flex-col items-center justify-center p-4 border transition-all text-xs font-semibold uppercase ${
                        paymentMethod === pm.id
                          ? 'border-black bg-[#121212] text-white shadow-md'
                          : 'border-neutral-200 text-neutral-700 hover:border-black'
                      }`}
                    >
                      <pm.icon className="w-5 h-5 mb-2" />
                      {pm.label}
                    </button>
                  ))}
                </div>

                {/* Method Specific Inputs */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-4 text-xs">
                  {paymentMethod === 'UPI' && (
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Enter VPA / UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@okaxis or GooglePay / PhonePe number"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  )}

                  {paymentMethod === 'CARD' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8912"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            placeholder="08/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">CVV Security Code</label>
                          <input
                            type="password"
                            placeholder="•••"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'NET_BANKING' && (
                    <p className="text-neutral-600">You will be securely redirected to your bank's portal (HDFC, ICICI, SBI, Axis) upon placing order.</p>
                  )}

                  {paymentMethod === 'COD' && (
                    <p className="text-neutral-600">Pay cash upon package arrival at your doorstep. Verified contact required.</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4 border-t border-neutral-100">
                  <Button variant="secondary" onClick={() => setStep(2)}>BACK</Button>
                  <Button onClick={() => setStep(4)} className="flex-1 py-3.5">
                    REVIEW ORDER DETAILS <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER REVIEW */}
            {step === 4 && (
              <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
                <h3 className="font-editorial text-xl font-medium tracking-tight pb-4 border-b border-neutral-100">
                  FINAL ORDER REVIEW
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-neutral-50 p-4 border border-neutral-200">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-neutral-500 mb-1">Shipping Address</h4>
                    <p className="font-bold text-black">{selectedAddress?.fullName}</p>
                    <p className="text-neutral-600">{selectedAddress?.street}, {selectedAddress?.city}, {selectedAddress?.state}</p>
                    <p className="text-neutral-500">Phone: {selectedAddress?.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-neutral-500 mb-1">Payment Method</h4>
                    <p className="font-bold text-black uppercase">{paymentMethod.replace('_', ' ')}</p>
                    <p className="text-neutral-500 mt-1">Delivery: {deliveryMethod === 'EXPRESS' ? 'Priority Air (₹250)' : 'Standard (FREE)'}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Bag Items ({cart.items.length})</h4>
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-neutral-100 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt="" className="w-12 h-14 object-cover bg-neutral-100" />
                        <div>
                          <p className="font-semibold text-black">{item.product.name}</p>
                          <p className="text-[10px] text-neutral-500">{item.color} | {item.size} x {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold">₹{item.subtotal.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-neutral-100">
                  <Button variant="secondary" onClick={() => setStep(3)}>BACK</Button>
                  <Button
                    onClick={handlePlaceOrder}
                    isLoading={isSubmitting}
                    className="flex-1 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                  >
                    CONFIRM & PLACE ORDER NOW
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-editorial text-lg font-medium tracking-tight border-b border-neutral-100 pb-3">ORDER TOTAL</h3>
              <div className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-medium text-black">₹{cart.subtotal.toLocaleString()}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-₹{cart.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-black">
                    {deliveryMethod === 'EXPRESS' ? '₹250' : cart.shipping === 0 ? 'FREE' : `₹${cart.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span className="font-medium text-black">₹{cart.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-neutral-200">
                  <span>Grand Total</span>
                  <span>₹{(cart.total + (deliveryMethod === 'EXPRESS' ? 250 : 0)).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>256-bit Encrypted SSL Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-700 shrink-0" />
                  <span>Insured Express Courier Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { Address, Coupon, Notification } from '../types';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  User as UserIcon,
  Package,
  Heart,
  ShoppingBag,
  MapPin,
  Tag,
  Bell,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { notificationService, NotificationItem } from '../services/notificationService';

export const Profile: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'coupons' | 'notifications' | 'settings'>('profile');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddrId, setEditingAddrId] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrType, setAddrType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const [addrs, notifs, coups] = await Promise.all([
          userService.getAddresses(),
          notificationService.getNotifications().catch(() => []),
          productService.getCoupons().catch(() => []),
        ]);
        setAddresses(addrs);
        setNotifications(notifs);
        setCoupons(coups);
      } catch (err) {
        console.error("Profile data load error:", err);
      }
    };
    loadProfileData();
  }, []);

  const handleUpdateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ name, phone, avatar });
  };

  const handleOpenAddressModal = (addr?: Address) => {
    if (addr) {
      setEditingAddrId(addr.id);
      setFullName(addr.fullName);
      setStreet(addr.street);
      setCity(addr.city);
      setState(addr.state);
      setZipCode(addr.zipCode);
      setAddrPhone(addr.phone);
      setAddrType(addr.type);
      setIsDefault(addr.isDefault);
    } else {
      setEditingAddrId(null);
      setFullName(user?.name || '');
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setAddrPhone(user?.phone || '');
      setAddrType('Home');
      setIsDefault(addresses.length === 0);
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddrId) {
      const updated = await userService.updateAddress(editingAddrId, {
        fullName,
        street,
        city,
        state,
        zipCode,
        phone: addrPhone,
        type: addrType,
        isDefault,
      });
      setAddresses(updated);
      showToast('Address Updated', 'Address saved successfully.', 'success');
    } else {
      const updated = await userService.addAddress({
        fullName,
        street,
        city,
        state,
        zipCode,
        country: 'India',
        phone: addrPhone,
        type: addrType,
        isDefault,
      });
      setAddresses(updated);
      showToast('Address Added', 'New address saved to your profile.', 'success');
    }
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = async (id: string) => {
    const updated = await userService.deleteAddress(id);
    setAddresses(updated);
    showToast('Address Deleted', 'Address removed.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#121212]">
      <div>
        <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">MEMBER DASHBOARD</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">WELCOME BACK, {user?.name.toUpperCase()}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Dashboard Sidebar (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-neutral-200 shadow-sm p-4 space-y-1">
            <div className="flex items-center gap-3 p-3 border-b border-neutral-100 mb-2">
              <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <h4 className="text-xs font-bold">{user?.name}</h4>
                <p className="text-[10px] text-neutral-400">{user?.email}</p>
              </div>
            </div>

            {[
              { id: 'profile', label: 'My Profile', icon: UserIcon },
              { id: 'orders', label: 'My Orders', icon: Package, link: '/orders' },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, link: '/wishlist' },
              { id: 'cart', label: 'Shopping Bag', icon: ShoppingBag, link: '/cart' },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
              { id: 'coupons', label: 'Coupons & Vouchers', icon: Tag },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Account Settings', icon: Settings },
            ].map((item) => {
              if (item.link) {
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-neutral-500" /> {item.label}
                  </Link>
                );
              }

              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 text-xs font-medium transition-colors ${
                    isActive ? 'bg-[#121212] text-white font-bold' : 'text-neutral-700 hover:bg-neutral-50 hover:text-black'
                  }`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              );
            })}

            <div className="border-t border-neutral-100 pt-2 mt-2">
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Tab Content (9 cols) */}
        <div className="lg:col-span-9">
          {activeTab === 'profile' && (
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
              <h3 className="font-editorial text-xl font-medium tracking-tight border-b border-neutral-100 pb-3">PERSONAL DETAILS</h3>
              <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Email Address (Read-only)</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-neutral-100 border border-neutral-200 p-2.5 text-xs text-neutral-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Profile Avatar Image URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <Button type="submit" size="md">SAVE CHANGES</Button>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h3 className="font-editorial text-xl font-medium tracking-tight">SAVED ADDRESSES</h3>
                <Button onClick={() => handleOpenAddressModal()} size="sm">
                  <Plus className="w-3.5 h-3.5 mr-1" /> ADD NEW ADDRESS
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 border border-neutral-200 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs">{addr.fullName}</span>
                        <div className="flex gap-1">
                          <span className="text-[10px] bg-neutral-100 px-1.5 py-0.5 font-semibold uppercase">{addr.type}</span>
                          {addr.isDefault && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 font-bold">DEFAULT</span>}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 mt-2">{addr.street}, {addr.city}, {addr.state} - {addr.zipCode}</p>
                      <p className="text-xs text-neutral-500 mt-1">Phone: {addr.phone}</p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-neutral-100">
                      <button onClick={() => handleOpenAddressModal(addr)} className="text-xs text-neutral-600 hover:text-black flex items-center gap-1">
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs text-rose-600 hover:underline flex items-center gap-1 ml-auto">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6">
              <h3 className="font-editorial text-xl font-medium tracking-tight border-b border-neutral-100 pb-3">AVAILABLE VOUCHERS & COUPONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coupons.map((c) => (
                  <div key={c.id} className="p-4 border-2 border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5">{c.code}</span>
                      <h4 className="text-sm font-bold mt-2">{c.discountPercentage}% OFF UP TO ₹{c.maxDiscount}</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Min Order: ₹{c.minOrderAmount} | Expires: {c.expiryDate}</p>
                    </div>
                    <Button onClick={() => { navigator.clipboard.writeText(c.code); showToast('Copied!', `Coupon code ${c.code} copied to clipboard.`, 'info'); }} size="sm" variant="outline">
                      COPY
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-editorial text-xl font-medium tracking-tight border-b border-neutral-100 pb-3">NOTIFICATIONS & ALERTS</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                    <Bell className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold">{n.title}</h4>
                        <span className="text-[10px] text-neutral-400">{n.date || n.createdAt}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-editorial text-xl font-medium tracking-tight border-b border-neutral-100 pb-3">ACCOUNT SETTINGS</h3>
              <p className="text-xs text-neutral-600">Manage security, communication preferences, and data privacy.</p>
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-800">
                  <input type="checkbox" defaultChecked className="accent-black" />
                  <span>Receive promotional private editorial drops via Email</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-800">
                  <input type="checkbox" defaultChecked className="accent-black" />
                  <span>Receive SMS dispatch updates for orders</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} title={editingAddrId ? 'Edit Address' : 'Add New Address'}>
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-neutral-50 border p-2 text-xs" required />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1">Street Address</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full bg-neutral-50 border p-2 text-xs" required />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div><label className="block text-[11px] font-semibold uppercase tracking-wider mb-1">City</label><input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-neutral-50 border p-2 text-xs" required /></div>
            <div><label className="block text-[11px] font-semibold uppercase tracking-wider mb-1">State</label><input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-neutral-50 border p-2 text-xs" required /></div>
            <div><label className="block text-[11px] font-semibold uppercase tracking-wider mb-1">Zip Code</label><input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full bg-neutral-50 border p-2 text-xs" required /></div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1">Phone</label>
            <input type="text" value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} className="w-full bg-neutral-50 border p-2 text-xs" required />
          </div>
          <Button type="submit" className="w-full py-3">SAVE ADDRESS</Button>
        </form>
      </Modal>
    </div>
  );
};

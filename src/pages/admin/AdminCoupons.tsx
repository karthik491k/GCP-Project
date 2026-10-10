import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Coupon } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Plus } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(20);
  const [maxDiscount, setMaxDiscount] = useState(3000);
  const [minOrderAmount, setMinOrderAmount] = useState(4999);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [usageLimit, setUsageLimit] = useState(1000);

  const { showToast } = useToast();

  const loadCoupons = async () => {
    try {
      const data = await adminService.getCoupons();
      setCoupons(data);
    } catch {
      // error
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      const created = await adminService.createCoupon({
        code: code.toUpperCase().trim(),
        discountPercentage,
        maxDiscount,
        minOrderAmount,
        expiryDate,
        usageLimit,
        isActive: true,
      });

      setCoupons([created, ...coupons]);
      setIsModalOpen(false);
      showToast('Coupon Created', `Promo code ${created.code} activated.`, 'success');
    } catch {
      showToast('Error', 'Could not create coupon', 'error');
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">PROMOTIONS & MARKETING</span>
          <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">PROMO COUPONS MANAGEMENT</h1>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="md" className="bg-white text-black hover:bg-neutral-200">
          <Plus className="w-4 h-4 mr-2" /> CREATE NEW COUPON
        </Button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-black text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-neutral-800">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount %</th>
              <th className="p-4">Max Discount</th>
              <th className="p-4">Min Order</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Usage Stats</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="p-4 font-mono font-bold text-white tracking-widest text-sm">{c.code}</td>
                <td className="p-4 font-bold text-emerald-400">{c.discountPercentage}% OFF</td>
                <td className="p-4 font-mono">₹{c.maxDiscount.toLocaleString()}</td>
                <td className="p-4 font-mono">₹{c.minOrderAmount.toLocaleString()}</td>
                <td className="p-4 font-mono text-neutral-400">{c.expiryDate}</td>
                <td className="p-4 font-mono text-neutral-400">{c.usageCount} / {c.usageLimit} redeemed</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold">ACTIVE</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coupon Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Promotional Coupon">
        <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs text-[#121212]">
          <div>
            <label className="block font-bold uppercase tracking-wider mb-1">Coupon Code</label>
            <input type="text" placeholder="e.g. FESTIVE30" value={code} onChange={(e) => setCode(e.target.value)} className="w-full bg-neutral-50 border p-2.5 uppercase" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Discount %</label>
              <input type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Max Discount (₹)</label>
              <input type="number" value={maxDiscount} onChange={(e) => setMaxDiscount(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Min Order Amount (₹)</label>
              <input type="number" value={minOrderAmount} onChange={(e) => setMinOrderAmount(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Usage Limit</label>
              <input type="number" value={usageLimit} onChange={(e) => setUsageLimit(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider mb-1">Expiry Date</label>
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
          </div>

          <Button type="submit" className="w-full py-3.5 bg-black text-white">ACTIVATE COUPON</Button>
        </form>
      </Modal>
    </div>
  );
};

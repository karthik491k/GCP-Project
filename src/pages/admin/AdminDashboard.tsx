import React, { useState, useEffect } from 'react';
import { adminService, DashboardMetrics } from '../../services/adminService';
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await adminService.getDashboardMetrics();
        setMetrics(data);
      } catch {
        // fallback
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (isLoading || !metrics) {
    return <div className="py-20 text-center font-mono text-sm">Loading Real-time Metrics...</div>;
  }

  return (
    <div className="space-y-8 text-white">
      <div>
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">SPRING BOOT BACKEND API METRICS</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">MARKETPLACE DASHBOARD</h1>
      </div>

      {/* 6 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">₹{metrics.totalRevenue.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last month
          </span>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{metrics.totalOrders}</div>
          <span className="text-[11px] text-neutral-400">Processed across India</span>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Customers</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{metrics.totalCustomers}</div>
          <span className="text-[11px] text-neutral-400">Active registered users</span>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Products</span>
            <Package className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{metrics.totalProducts}</div>
          <span className="text-[11px] text-neutral-400">Catalog SKUs online</span>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Products</span>
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-rose-400">{metrics.lowStockCount}</div>
          <span className="text-[11px] text-rose-400 font-semibold">Requires reorder</span>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Fulfillment</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-amber-400">{metrics.pendingOrdersCount}</div>
          <span className="text-[11px] text-neutral-400">Queued for dispatch</span>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Bar Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 bg-neutral-900 border border-neutral-800 space-y-6">
          <h3 className="font-editorial text-xl font-light tracking-tight">REVENUE PERFORMANCE (IN INR)</h3>
          <div className="h-64 flex items-end gap-6 pt-8 pb-4 border-b border-neutral-800 px-4">
            {metrics.revenueChart.map((item) => {
              const maxAmt = Math.max(...metrics.revenueChart.map(r => r.amount));
              const heightPct = Math.round((item.amount / maxAmt) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.amount / 1000).toFixed(0)}k
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-white group-hover:bg-amber-400 transition-all duration-300"
                  />
                  <span className="text-xs font-semibold text-neutral-400 font-mono">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Share (4 cols) */}
        <div className="lg:col-span-4 p-6 bg-neutral-900 border border-neutral-800 space-y-6">
          <h3 className="font-editorial text-xl font-light tracking-tight">SALES BY CATEGORY</h3>
          <div className="space-y-4">
            {metrics.categorySalesChart.map((c) => (
              <div key={c.category} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{c.category}</span>
                  <span className="font-mono text-neutral-400">{c.value}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 overflow-hidden">
                  <div style={{ width: `${c.value}%` }} className="h-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

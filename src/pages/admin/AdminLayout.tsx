import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Layers,
  Tag,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Boxes,
  Home,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products Management', path: '/admin/products', icon: Package },
    { label: 'Orders & Fulfillment', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Inventory & Stock', path: '/admin/inventory', icon: Boxes },
    { label: 'Coupons & Promos', path: '/admin/coupons', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col md:flex-row font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-neutral-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-500 block">ADMIN CONSOLE</span>
            <h1 className="font-editorial text-2xl font-bold tracking-widest text-white mt-0.5">LOGANCEE</h1>
          </div>

          {/* Nav items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? 'bg-white text-black font-bold shadow-md' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer info */}
        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <div className="flex items-center gap-3">
            <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full border border-neutral-700 object-cover" />
            <div>
              <p className="text-xs font-bold">{user?.name}</p>
              <span className="text-[9px] bg-rose-950 text-rose-300 font-bold px-1.5 py-0.5 uppercase">SYSTEM ADMIN</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link to="/" className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" /> Return to Customer Storefront
            </Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1.5 text-left font-bold"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out Admin
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Body Area */}
      <main className="flex-1 bg-neutral-950 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

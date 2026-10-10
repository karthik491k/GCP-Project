import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { notificationService, NotificationItem } from '../../services/notificationService';
import { SearchModal } from './SearchModal';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Package,
  LogOut,
  UserCheck,
  MapPin,
  Tag,
  Settings,
  Bell,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  CreditCard,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadNotifs = async () => {
      if (isAuthenticated) {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    };
    loadNotifs();
  }, [isAuthenticated]);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleMarkNotifRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'MEN', path: '/shop?category=Men' },
    { name: 'WOMEN', path: '/shop?category=Women' },
    { name: 'KIDS', path: '/shop?category=Kids' },
    { name: 'BEAUTY & SELF CARE', path: '/shop?category=Beauty%20%26%20Self%20Care' },
    { name: 'ELECTRONICS', path: '/shop?category=Electronics' },
    { name: 'HOME & LIFESTYLE', path: '/shop?category=Home%20%26%20Lifestyle' },
    { name: 'NEW ARRIVALS', path: '/shop?sortBy=newest' },
    { name: 'SALE', path: '/shop?discount=20' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#121212] text-white text-[11px] font-semibold tracking-widest text-center py-2 uppercase px-4 border-b border-neutral-800 flex justify-between items-center max-w-full">
        <span className="mx-auto">
          FREE EXPRESS SHIPPING ABOVE ₹999 | EASY 7-DAY RETURNS | ATELIER LUXURY GUARANTEE
        </span>
      </div>

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled ? 'shadow-md border-neutral-200 py-2.5' : 'border-neutral-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-neutral-700 hover:text-black focus:outline-none"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-editorial text-2xl lg:text-3xl font-bold tracking-widest text-[#121212] uppercase">
              LOGANCEE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] xl:text-[11px] font-semibold tracking-widest uppercase transition-colors relative py-1 ${
                    isActive ? 'text-black font-bold' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.name}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-700 hover:text-black transition-colors flex items-center gap-1.5"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline text-[11px] font-semibold tracking-widest uppercase text-neutral-500">
                Search
              </span>
            </button>

            {/* Notifications Icon (Bell) */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-neutral-700 hover:text-black transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Notifications Popover Drawer */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white text-[#121212] shadow-2xl border border-neutral-200 py-2 z-50 animate-fade-in rounded-none">
                  <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                      <Bell className="w-4 h-4 text-neutral-600" /> Notifications
                    </span>
                    {unreadNotifCount > 0 && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                        {unreadNotifCount} New
                      </span>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 text-xs">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-neutral-400">No notifications</div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkNotifRead(notif.id)}
                          className={`p-4 transition-colors cursor-pointer ${
                            notif.read ? 'bg-white text-neutral-600' : 'bg-amber-50/50 font-medium text-black'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-xs">{notif.title}</span>
                            <span className="text-[9px] text-neutral-400">{notif.createdAt}</span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1">{notif.message}</p>
                          {notif.link && (
                            <Link
                              to={notif.link}
                              onClick={() => setIsNotificationOpen(false)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-black mt-2 underline"
                            >
                              View Details <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 text-neutral-700 hover:text-black transition-colors relative"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Icon */}
            <button
              onClick={openCartDrawer}
              className="p-2 text-neutral-700 hover:text-black transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#121212] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Authentication Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-1.5 p-1 text-neutral-800 hover:text-black font-medium text-xs focus:outline-none"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover border border-neutral-300"
                  />
                  <span className="hidden md:inline text-xs font-semibold">{user?.name ? user.name.split(' ')[0] : 'User'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 bg-[#121212] text-white hover:bg-neutral-800 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Sign In"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>SIGN IN</span>
                </Link>
              )}

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && isAuthenticated && (
                <div
                  className="absolute right-0 mt-3 w-60 bg-white text-[#121212] shadow-2xl border border-neutral-200 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-black">{user?.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 bg-neutral-100 text-neutral-700">
                      {user?.role} ACCOUNT
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <UserCheck className="w-4 h-4 text-neutral-500" /> My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <Package className="w-4 h-4 text-neutral-500" /> My Orders & Tracking
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <Heart className="w-4 h-4 text-neutral-500" /> Saved Wishlist
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <MapPin className="w-4 h-4 text-neutral-500" /> Saved Addresses
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <CreditCard className="w-4 h-4 text-neutral-500" /> Saved Payment Methods
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <Tag className="w-4 h-4 text-neutral-500" /> Vouchers & Coupons
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    <Settings className="w-4 h-4 text-neutral-500" /> Settings
                  </Link>

                  {user?.role === 'ADMIN' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-700 bg-rose-50/60 hover:bg-rose-100 font-bold"
                    >
                      <LayoutDashboard className="w-4 h-4 text-rose-600" /> Admin Console
                    </Link>
                  )}

                  <div className="border-t border-neutral-100 my-1" />

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-fade-in overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <span className="font-editorial text-2xl font-bold tracking-widest text-[#121212]">
                  LOGANCEE
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-neutral-400 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Category Links */}
              <nav className="flex flex-col gap-3 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-semibold tracking-widest uppercase text-neutral-800 hover:text-black py-2 border-b border-neutral-100"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Auth */}
            <div className="pt-6 border-t border-neutral-100">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-neutral-300"
                    />
                    <div>
                      <p className="text-xs font-bold">{user?.name}</p>
                      <p className="text-[10px] text-neutral-400">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full py-2.5 bg-neutral-100 text-xs font-semibold uppercase tracking-wider text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center py-3 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center py-3 border border-[#121212] text-[#121212] text-xs uppercase tracking-widest font-semibold"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

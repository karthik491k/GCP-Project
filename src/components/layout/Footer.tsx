import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Globe, Share2, MessageCircle, Bookmark } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Subscribed!', 'Thank you for subscribing to Logancee Private Editorial.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#121212] text-white pt-16 pb-12 border-t border-neutral-800">
      {/* Value Proposition Banners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex items-center gap-3">
          <Truck className="w-6 h-6 text-neutral-400 shrink-0" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">Free Shipping</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">Complimentary for orders above ₹999</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-neutral-400 shrink-0" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">Easy 7-Day Returns</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">Hassle-free doorstep collection</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-neutral-400 shrink-0" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">100% Authentic</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">Direct from luxury ateliers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-neutral-400 shrink-0" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">Concierge Support</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">24/7 dedicated customer care</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <span className="font-editorial text-3xl font-bold tracking-widest text-white uppercase block mb-4">
            LOGANCEE
          </span>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            Curated fashion, haute couture, self-care formulations, and next-gen lifestyle tech for the modern tastemaker. Inspired by global runway aesthetics and refined craftsmanship.
          </p>

          {/* Newsletter Form */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-2">
              JOIN THE PRIVATE EDITORIAL
            </h4>
            <p className="text-[11px] text-neutral-400 mb-3">
              Receive private drop invitations, early sale access & 15% off your first order.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center"
              >
                JOIN <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">SHOP</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link to="/shop?category=Women" className="hover:text-white transition-colors">Women's Couture</Link></li>
            <li><Link to="/shop?category=Men" className="hover:text-white transition-colors">Men's Tailoring</Link></li>
            <li><Link to="/shop?category=Kids" className="hover:text-white transition-colors">Kids & Juniors</Link></li>
            <li><Link to="/shop?category=Beauty" className="hover:text-white transition-colors">Beauty & Skincare</Link></li>
            <li><Link to="/shop?category=Electronics" className="hover:text-white transition-colors">Lifestyle Electronics</Link></li>
            <li><Link to="/shop?category=Home" className="hover:text-white transition-colors">Home Decor</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">CUSTOMER CARE</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">Account Dashboard</Link></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Shipping Policy</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Returns & Exchanges</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Size Guide</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">FAQ & Help Center</span></li>
          </ul>
        </div>

        {/* Ateliers & Legal */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">ATELIER LOGANCEE</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><span className="hover:text-white transition-colors cursor-pointer">About Our Brand</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Sustainability</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Press & Editorial</span></li>
            <li><Link to="/admin" className="hover:text-rose-400 transition-colors font-semibold">Admin Portal</Link></li>
          </ul>

          <div className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3">CONNECT</h4>
            <div className="flex gap-3 text-neutral-400">
              <span className="hover:text-white cursor-pointer"><Globe className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><Share2 className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><MessageCircle className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer"><Bookmark className="w-4 h-4" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Payments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
        <div>
          © {new Date().getFullYear()} LOGANCEE MARKETPLACE INC. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-4 uppercase font-semibold text-[10px] tracking-widest text-neutral-400">
          <span>RAZORPAY READY</span>
          <span>VISA</span>
          <span>MASTERCARD</span>
          <span>UPI</span>
          <span>NET BANKING</span>
        </div>
      </div>
    </footer>
  );
};

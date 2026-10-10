import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Role } from '../types';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [role, setRole] = useState<Role>('CUSTOMER');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '';

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      showToast('Validation Error', 'Please complete all required fields.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Password Mismatch', 'Password and Confirm Password must match.', 'error');
      return;
    }

    if (!agreedToTerms) {
      showToast('Terms Required', 'Please accept the Terms & Privacy Policy to register.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      await register(fullName, email, password, role);

      if (redirectPath) {
        navigate(redirectPath);
      } else if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch {
      // toast in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-[#121212] animate-fade-in">
      <div className="bg-white p-8 border border-neutral-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">JOIN LOGANCEE</span>
          <h1 className="font-editorial text-3xl font-light tracking-tight">CREATE AN ACCOUNT</h1>
          <p className="text-xs text-neutral-500">Enjoy concierge shipping & 15% off your first luxury order.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="Elena"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Rostova"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="elena.rostova@logancee.fashion"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs font-medium focus:outline-none focus:border-black"
            >
              <option value="CUSTOMER">Customer Account</option>
              <option value="SELLER">Brand Atelier Seller</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          <label className="flex items-start gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 accent-black"
              required
            />
            <span className="text-[11px] text-neutral-600">
              I agree to the <span className="font-bold text-black underline">Terms & Conditions</span> and <span className="font-bold text-black underline">Privacy Policy</span>.
            </span>
          </label>

          <Button type="submit" isLoading={isLoading} className="w-full py-4 text-xs font-bold bg-[#121212] text-white hover:bg-neutral-800">
            CREATE ACCOUNT <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-neutral-100 text-xs text-neutral-500">
          Already a member?{' '}
          <Link to={`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`} className="font-bold text-black hover:underline uppercase tracking-wider">
            SIGN IN HERE
          </Link>
        </div>
      </div>
    </div>
  );
};

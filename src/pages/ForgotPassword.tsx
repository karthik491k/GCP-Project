import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      showToast('Reset Sent', res.message, 'success');
      setSubmitted(true);
    } catch {
      showToast('Error', 'Failed to request reset', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-[#121212] animate-fade-in">
      <div className="bg-white p-8 border border-neutral-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 font-mono">RECOVERY</span>
          <h1 className="font-editorial text-3xl font-light tracking-tight">RESET PASSWORD</h1>
          <p className="text-xs text-neutral-500">Enter your registered email to receive a password recovery link.</p>
        </div>

        {submitted ? (
          <div className="bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 space-y-3 text-center">
            <p className="font-semibold uppercase tracking-wider">[DEV SIMULATION NOTICE]</p>
            <p className="text-neutral-700">Password recovery request processed for ({email}). In this local development environment, email dispatch is simulated.</p>
            <Link to="/login" className="inline-block pt-2 font-bold text-black underline">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" isLoading={isLoading} className="w-full py-4 text-xs">
              SEND RESET LINK
            </Button>
          </form>
        )}

        <div className="text-center pt-4 border-t border-neutral-100 text-xs text-neutral-500">
          Remembered your password?{' '}
          <Link to="/login" className="font-bold text-black hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

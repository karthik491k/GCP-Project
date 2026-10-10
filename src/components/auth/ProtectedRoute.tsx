import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated user to login with return path
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in text-[#121212]">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">403 ACCESS FORBIDDEN</span>
          <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">ADMINISTRATOR PERMISSION REQUIRED</h1>
          <p className="text-xs text-neutral-500 mt-2">
            Your current account role (<span className="font-bold text-black">{role}</span>) does not have privileges to access the Logancee Management Console.
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-4">
          <a
            href="/"
            className="px-8 py-3 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
          >
            RETURN TO STOREFRONT
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

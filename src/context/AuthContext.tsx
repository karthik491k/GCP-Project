import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { authService, LoginResponse } from '../services/authService';
import { userService } from '../services/userService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: Role | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role?: Role) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updated: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('logancee_user');
      const token = localStorage.getItem('logancee_token');
      if (token) {
        try {
          const fresh = await userService.getProfile();
          setUser(fresh);
          localStorage.setItem('logancee_user', JSON.stringify(fresh));
        } catch {
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const handleLoginResponse = (res: LoginResponse) => {
    setUser(res.user);
    localStorage.setItem('logancee_token', res.token);
    localStorage.setItem('logancee_user', JSON.stringify(res.user));
  };

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, pass);
      handleLoginResponse(res);
      showToast(`Welcome back, ${res.user.name}!`, `Signed in as ${res.user.role}`, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      showToast('Authentication Failed', msg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string, role: Role = 'CUSTOMER') => {
    setIsLoading(true);
    try {
      const res = await authService.register(name, email, pass, role);
      handleLoginResponse(res);
      showToast('Account Created', `Welcome to Logancee Luxury Marketplace, ${name}!`, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      showToast('Registration Error', msg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    showToast('Signed Out', 'You have been safely logged out.', 'info');
  };

  const updateUser = async (updated: Partial<User>) => {
    const newProfile = await userService.updateProfile(updated);
    setUser(newProfile);
    localStorage.setItem('logancee_user', JSON.stringify(newProfile));
    showToast('Profile Updated', 'Your details have been saved.', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        role: user?.role || null,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistItem, Product } from '../types';
import { wishlistService } from '../services/wishlistService';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const items = await wishlistService.getWishlist();
      setWishlist(items || []);
    } catch {
      setWishlist([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.product?.id === productId);
  };

  const toggleWishlist = async (product: Product) => {
    if (!isAuthenticated) {
      showToast('Authentication Required', 'Please sign in to save items to your wishlist.', 'warning');
      return;
    }

    const exists = isInWishlist(product.id);
    try {
      if (exists) {
        const updated = await wishlistService.removeFromWishlist(product.id);
        setWishlist(updated || []);
        showToast('Removed from Wishlist', `${product.name} removed from your saved items.`, 'info');
      } else {
        const updated = await wishlistService.addToWishlist(product);
        setWishlist(updated || []);
        showToast('Saved to Wishlist', `${product.name} added to your wishlist.`, 'success');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Wishlist operation failed';
      showToast('Wishlist Error', msg, 'error');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const updated = await wishlistService.removeFromWishlist(productId);
      setWishlist(updated || []);
      showToast('Removed', 'Item removed from wishlist.', 'info');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to remove item';
      showToast('Error', msg, 'error');
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};

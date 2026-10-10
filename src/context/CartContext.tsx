import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, Product } from '../types';
import { cartService } from '../services/cartService';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart;
  cartCount: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (product: Product, color?: string, size?: string, qty?: number) => Promise<void>;
  updateQuantity: (productId: string, qty: number, color?: string, size?: string) => Promise<void>;
  removeFromCart: (productId: string, color?: string, size?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_CART: Cart = {
  id: '',
  items: [],
  subtotal: 0,
  discount: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(EMPTY_CART);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data || EMPTY_CART);
    } catch {
      setCart(EMPTY_CART);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = async (product: Product, color?: string, size?: string, qty: number = 1) => {
    if (!isAuthenticated) {
      showToast('Authentication Required', 'Please sign in to add items to your cart.', 'warning');
      return;
    }

    const selectedColor = color || (product.colorOptions[0]?.name ?? 'Standard');
    const selectedSize = size || (product.sizes[0] ?? 'Standard');

    try {
      const updated = await cartService.addItem(product, selectedColor, selectedSize, qty);
      setCart(updated);
      showToast('Added to Cart', `${product.name} (${selectedColor}, ${selectedSize})`, 'success');
      openCartDrawer();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not add item to cart';
      showToast('Cart Error', msg, 'error');
    }
  };

  const updateQuantity = async (productId: string, qty: number, color?: string, size?: string) => {
    try {
      const updated = await cartService.updateQuantity(productId, qty, color, size);
      setCart(updated);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update item quantity';
      showToast('Error', msg, 'error');
    }
  };

  const removeFromCart = async (productId: string, color?: string, size?: string) => {
    try {
      const updated = await cartService.removeItem(productId, color, size);
      setCart(updated);
      showToast('Item Removed', 'Item removed from your cart.', 'info');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to remove item';
      showToast('Error', msg, 'error');
    }
  };

  const clearCart = async () => {
    try {
      const empty = await cartService.clearCart();
      setCart(empty);
    } catch {
      setCart(EMPTY_CART);
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await cartService.applyCoupon(code);
      setCart(res.cart);
      showToast('Coupon Applied', res.message, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid code';
      showToast('Coupon Error', msg, 'error');
    }
  };

  const cartCount = cart?.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <CartContext.Provider
      value={{
        cart: cart || EMPTY_CART,
        cartCount,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

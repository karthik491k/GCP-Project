export type Role = 'CUSTOMER' | 'ADMIN' | 'SELLER';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: Role;
  createdAt?: string;
}

export interface Address {
  id: string;
  userId?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  type: 'Home' | 'Work' | 'Other';
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ColorOption {
  name: string;
  code: string; // hex code
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // e.g. 'Men', 'Women', 'Kids', 'Beauty & Self Care', 'Electronics', 'Home & Lifestyle'
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  description: string;
  specifications: Record<string, string>;
  sizeAndFit?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  colorOptions: ColorOption[];
  sizes: string[];
  images: string[];
  hoverImage?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  flashSaleEndTime?: string;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  itemCount: number;
  subcategories: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export interface CartItem {
  id: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  appliedCoupon?: Coupon;
}

export type OrderStatus = 
  | 'ORDER_PLACED' 
  | 'CONFIRMED' 
  | 'PACKED' 
  | 'SHIPPED' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethodType = 'UPI' | 'CARD' | 'NET_BANKING' | 'COD';

export interface OrderStatusTimeline {
  status: OrderStatus;
  timestamp?: string;
  completed: boolean;
  description: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  timeline: OrderStatusTimeline[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  canCancel?: boolean;
  canReturn?: boolean;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  images?: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minOrderAmount: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}

export interface Inventory {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  availableStock: number;
  reservedStock: number;
  totalSold: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ORDER' | 'PAYMENT' | 'INVENTORY' | 'PROMO' | 'SYSTEM';
  date: string;
  read: boolean;
}

export interface ProductFilterParams {
  category?: string;
  subcategory?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  color?: string[];
  size?: string[];
  rating?: number;
  inStock?: boolean;
  minDiscount?: number;
  sortBy?: 'recommended' | 'newest' | 'price_low' | 'price_high' | 'rating' | 'discount';
  searchQuery?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

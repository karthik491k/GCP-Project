import { Product, Category, Brand, User, Address, Order, Coupon, Inventory, Review, Notification } from '../types';

export const MOCK_USER: User = {
  id: 'user-101',
  name: 'Elena Rostova',
  email: 'elena.rostova@logancee.fashion',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  role: 'CUSTOMER',
  createdAt: '2024-01-15',
};

export const MOCK_ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Logancee Director',
  email: 'admin@logancee.com',
  phone: '+91 99999 88888',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  role: 'ADMIN',
  createdAt: '2023-11-01',
};

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Elena Rostova',
    street: '702 High Street, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400050',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: true,
    type: 'Home',
  },
  {
    id: 'addr-2',
    fullName: 'Elena Rostova (Office)',
    street: 'Tower 4, Maker Maxity, BKC',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400051',
    country: 'India',
    phone: '+91 98765 43211',
    isDefault: false,
    type: 'Work',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-women',
    name: 'Women',
    slug: 'women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    description: 'Haute couture, contemporary dresses, tailored suits & luxury accessories.',
    itemCount: 1240,
    subcategories: ['Dresses', 'Tops', 'Jeans', 'Ethnic Wear', 'Handbags', 'Shoes', 'Jewellery', 'Accessories'],
  },
  {
    id: 'cat-men',
    name: 'Men',
    slug: 'men',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
    description: 'Refined menswear, bespoke tailoring, premium leather shoes & watches.',
    itemCount: 980,
    subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Trousers', 'Jackets', 'Shoes', 'Watches', 'Accessories'],
  },
  {
    id: 'cat-kids',
    name: 'Kids',
    slug: 'kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
    description: 'Playful yet sophisticated apparel & accessories for young trendsetters.',
    itemCount: 540,
    subcategories: ['Boys Fashion', 'Girls Fashion', 'Footwear', 'Toys & Accessories'],
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Self Care',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    description: 'Clean skincare formulas, botanical hair treats & luxury fragrances.',
    itemCount: 760,
    subcategories: ['Skincare', 'Haircare', 'Body Care', 'Personal Care', 'Grooming'],
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    description: 'Next-gen audio gear, sleek smartwatches & minimalist lifestyle tech.',
    itemCount: 420,
    subcategories: ['Mobiles', 'Laptops', 'Headphones', 'Smart Watches', 'Earbuds', 'Accessories'],
  },
  {
    id: 'cat-home',
    name: 'Home & Lifestyle',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    description: 'Artisanal home decor, luxury bedding, statement lighting & travel bags.',
    itemCount: 680,
    subcategories: ['Home Decor', 'Furniture', 'Lighting', 'Kitchen', 'Watches', 'Bags', 'Travel Accessories'],
  }
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'brand-1', name: 'ATELIER LOGANCEE', logo: '', category: 'Women' },
  { id: 'brand-2', name: 'MAISON NOIR', logo: '', category: 'Men' },
  { id: 'brand-3', name: 'AURORA SKIN', logo: '', category: 'Beauty' },
  { id: 'brand-4', name: 'VALENTI ITALY', logo: '', category: 'Women' },
  { id: 'brand-5', name: 'NEO AUDIO', logo: '', category: 'Electronics' },
  { id: 'brand-6', name: 'SARTORIAL CO.', logo: '', category: 'Men' },
  { id: 'brand-7', name: 'LUMINA LIVING', logo: '', category: 'Home' },
  { id: 'brand-8', name: 'HERITAGE DENIM', logo: '', category: 'Men' },
  { id: 'brand-9', name: 'VERVE COSMETICS', logo: '', category: 'Beauty' },
  { id: 'brand-10', name: 'CHRONO SWISS', logo: '', category: 'Electronics' },
];

// Helper to generate 100+ rich products cleanly
const generateProducts = (): Product[] => {
  const products: Product[] = [];

  // WOMEN (22 Products)
  const womenItems = [
    { name: 'Structured Double-Breasted Wool Blazer', sub: 'Dresses', price: 12999, orig: 18999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80', isNew: true, isTrending: true, rating: 4.9, rev: 148 },
    { name: 'Silk Wrap Evening Gown with Slit', sub: 'Dresses', price: 18499, orig: 24999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80', isFlash: true, isBest: true, rating: 4.8, rev: 92 },
    { name: 'Pleated Floral Chiffon Midi Dress', sub: 'Dresses', price: 7999, orig: 11999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 64 },
    { name: 'Cashmere Knit Turtleneck Sweater', sub: 'Tops', price: 9499, orig: 13999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 210 },
    { name: 'High-Waisted Wide Leg Tailored Trousers', sub: 'Jeans', price: 6499, orig: 8999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.6, rev: 88 },
    { name: 'Embroidered Banarasi Silk Dupatta Set', sub: 'Ethnic Wear', price: 14999, orig: 21999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 56 },
    { name: 'Italian Calfskin Structured Satchel Bag', sub: 'Handbags', price: 16999, orig: 22999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80', isBest: true, isFlash: true, rating: 4.9, rev: 312 },
    { name: 'Pointed Toe Stiletto Leather Pumps', sub: 'Shoes', price: 11499, orig: 15999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 124 },
    { name: '18K Gold Plated Baroque Pearl Drop Earrings', sub: 'Jewellery', price: 4999, orig: 6999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 76 },
    { name: 'Satin Corset Cocktail Mini Dress', sub: 'Dresses', price: 9999, orig: 14999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 140 },
    { name: 'French Linen Button-Down Shirt', sub: 'Tops', price: 5499, orig: 7999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 95 },
    { name: 'Straight Cut Vintage Blue Denim Jeans', sub: 'Jeans', price: 5999, orig: 8499, brand: 'HERITAGE DENIM', img1: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.7, rev: 180 },
    { name: 'Hand-Woven Chanderi Silk Saree', sub: 'Ethnic Wear', price: 16499, orig: 22999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 67 },
    { name: 'Quilted Leather Crossbody Clutch', sub: 'Handbags', price: 12499, orig: 16999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80', isFlash: true, rating: 4.8, rev: 154 },
    { name: 'Strappy Leather Ankle Sandal Heels', sub: 'Shoes', price: 8999, orig: 12499, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 110 },
    { name: 'Diamond-Cut Tennis Choker Necklace', sub: 'Jewellery', price: 8499, orig: 11999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 82 },
    { name: 'Double-Face Cashmere Belted Long Coat', sub: 'Dresses', price: 24999, orig: 32999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 5.0, rev: 230 },
    { name: 'Silk Charmeuse Camisole Top', sub: 'Tops', price: 4499, orig: 6499, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.6, rev: 74 },
    { name: 'Oversized Knit Wool Cardigan', sub: 'Tops', price: 7499, orig: 10499, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 89 },
    { name: 'Monogrammed Leather Shoulder Hobo Bag', sub: 'Handbags', price: 15499, orig: 20999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 194 },
    { name: 'Suede Fringe Knee-High Boots', sub: 'Shoes', price: 13999, orig: 18999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 102 },
    { name: 'Crystal Embellished Hair Clip Set', sub: 'Accessories', price: 2999, orig: 4499, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80', isFlash: true, rating: 4.7, rev: 61 },
  ];

  womenItems.forEach((w, idx) => {
    const orig = w.orig;
    const price = w.price;
    const disc = Math.round(((orig - price) / orig) * 100);
    products.push({
      id: `wom-${100 + idx}`,
      name: w.name,
      brand: w.brand,
      category: 'Women',
      subcategory: w.sub,
      price: price,
      originalPrice: orig,
      discountPercentage: disc,
      rating: w.rating,
      reviewCount: w.rev,
      description: 'Crafted with immaculate precision and editorial artistry. Designed for contemporary luxury, breathability, and lasting elegance.',
      specifications: { 'Material': 'Italian Mulberry Silk & Fine Wool', 'Fit': 'Tailored European', 'Care': 'Dry Clean Only' },
      sizeAndFit: 'Fits true to European size standards.',
      shippingInfo: 'Complimentary shipping over ₹999.',
      returnPolicy: 'Easy 7-day doorstep pickup returns.',
      colorOptions: [
        { name: 'Onyx Black', code: '#121212' },
        { name: 'Ivory Cream', code: '#f5f4ef' },
        { name: 'Emerald Green', code: '#046307' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [w.img1, w.img2],
      hoverImage: w.img2,
      isNew: w.isNew,
      isTrending: w.isTrending,
      isBestSeller: w.isBest,
      isFlashSale: w.isFlash,
      flashSaleEndTime: '2026-09-29T23:59:59Z',
      inStock: true,
      stockQuantity: idx % 3 === 0 ? 4 : 18,
      sku: `LOG-W-${100 + idx}`,
      tags: ['women', 'fashion', 'luxury', w.sub.toLowerCase()]
    });
  });

  // MEN (22 Products)
  const menItems = [
    { name: 'Minimalist Cashmere Crewneck Sweater', sub: 'Shirts', price: 8999, orig: 12999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 215 },
    { name: 'Handcrafted Italian Leather Chelsea Boots', sub: 'Shoes', price: 14499, orig: 19999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', isNew: true, isTrending: true, rating: 4.9, rev: 168 },
    { name: 'Organic Linen Button-Down Oversized Shirt', sub: 'Shirts', price: 4999, orig: 6999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 94 },
    { name: 'Heavyweight Supima Cotton Crew T-Shirt', sub: 'T-Shirts', price: 2499, orig: 3499, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 320 },
    { name: 'Japanese Selvedge Denim Slim Jeans', sub: 'Jeans', price: 7999, orig: 11499, brand: 'HERITAGE DENIM', img1: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 142 },
    { name: 'Slim Fit Italian Wool Dress Trousers', sub: 'Trousers', price: 6999, orig: 9999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 110 },
    { name: 'Genuine Lambskin Leather Biker Jacket', sub: 'Jackets', price: 21999, orig: 29999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80', isFlash: true, isBest: true, rating: 4.9, rev: 240 },
    { name: 'Hand-Finished Calfskin Oxford Shoes', sub: 'Shoes', price: 12999, orig: 17999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 115 },
    { name: 'Automatic Skeleton Dial Leather Chronograph', sub: 'Watches', price: 22999, orig: 31999, brand: 'CHRONO SWISS', img1: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 184 },
    { name: 'Woven Leather Dress Belt with Brass Buckle', sub: 'Accessories', price: 3499, orig: 4999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 82 },
    { name: 'Merino Wool V-Neck Pullover', sub: 'Shirts', price: 6499, orig: 8999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 96 },
    { name: 'Pima Cotton Graphic Oversized Tee', sub: 'T-Shirts', price: 2999, orig: 4199, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 78 },
    { name: 'Raw Indigo Straight Leg Jeans', sub: 'Jeans', price: 6999, orig: 9499, brand: 'HERITAGE DENIM', img1: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 135 },
    { name: 'Pleated Chino Pants with Cuffed Hem', sub: 'Trousers', price: 4999, orig: 6999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.5, rev: 67 },
    { name: 'Suede Trucker Jacket with Shearling Collar', sub: 'Jackets', price: 18999, orig: 25999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', isFlash: true, rating: 4.9, rev: 160 },
    { name: 'Minimalist Leather Low-Top Sneakers', sub: 'Shoes', price: 9999, orig: 13999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 275 },
    { name: 'Minimalist Steel Mesh Automatic Watch', sub: 'Watches', price: 17999, orig: 24999, brand: 'CHRONO SWISS', img1: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 120 },
    { name: 'Silk Pocket Square & Silk Bowtie Set', sub: 'Accessories', price: 2999, orig: 4199, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 54 },
    { name: 'Textured Flannel Plaid Button-Down', sub: 'Shirts', price: 4499, orig: 6299, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 84 },
    { name: 'Polo Shirt with Ribbed Collar', sub: 'T-Shirts', price: 3499, orig: 4899, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.7, rev: 142 },
    { name: 'Slim Fit Corduroy Trousers', sub: 'Trousers', price: 5499, orig: 7699, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.6, rev: 71 },
    { name: 'Water-Resistant Technical Trench Coat', sub: 'Jackets', price: 16999, orig: 22999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 110 },
  ];

  menItems.forEach((m, idx) => {
    const orig = m.orig;
    const price = m.price;
    const disc = Math.round(((orig - price) / orig) * 100);
    products.push({
      id: `men-${200 + idx}`,
      name: m.name,
      brand: m.brand,
      category: 'Men',
      subcategory: m.sub,
      price: price,
      originalPrice: orig,
      discountPercentage: disc,
      rating: m.rating,
      reviewCount: m.rev,
      description: 'Handcrafted tailored menswear combining Italian fabrics, ergonomics, and timeless luxury silhouettes.',
      specifications: { 'Material': '100% Cotton & Cashmere', 'Fit': 'Modern Tailored', 'Care': 'Machine Wash Cold / Dry Clean' },
      sizeAndFit: 'Standard US/EU Menswear sizing.',
      shippingInfo: 'Complimentary shipping over ₹999.',
      returnPolicy: 'Easy 7-day returns.',
      colorOptions: [
        { name: 'Charcoal Grey', code: '#333333' },
        { name: 'Oatmeal Beige', code: '#d4c5b9' },
        { name: 'Navy Blue', code: '#1b2a4a' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      images: [m.img1, m.img2],
      hoverImage: m.img2,
      isNew: m.isNew,
      isTrending: m.isTrending,
      isBestSeller: m.isBest,
      isFlashSale: m.isFlash,
      flashSaleEndTime: '2026-09-29T23:59:59Z',
      inStock: true,
      stockQuantity: idx % 4 === 0 ? 3 : 24,
      sku: `LOG-M-${200 + idx}`,
      tags: ['men', 'fashion', 'menswear', m.sub.toLowerCase()]
    });
  });

  // KIDS (12 Products)
  const kidsItems = [
    { name: 'Organic Cotton Knit Jumper', sub: 'Boys Fashion', price: 2999, orig: 3999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 45 },
    { name: 'Tulle Layered Party Dress', sub: 'Girls Fashion', price: 3499, orig: 4999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 89 },
    { name: 'Soft Genuine Leather Booties', sub: 'Footwear', price: 2499, orig: 3299, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 38 },
    { name: 'Artisanal Wooden Stacking Blocks Toy', sub: 'Toys & Accessories', price: 1999, orig: 2799, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 52 },
    { name: 'Padded Quilted Puffer Jacket', sub: 'Boys Fashion', price: 4499, orig: 5999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 67 },
    { name: 'Embroidered Cotton Sundress', sub: 'Girls Fashion', price: 2799, orig: 3899, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 41 },
    { name: 'Canvas Slip-On Trainers', sub: 'Footwear', price: 1899, orig: 2499, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 33 },
    { name: 'Plush Cashmere Teddy Bear', sub: 'Toys & Accessories', price: 2999, orig: 3999, brand: 'ATELIER LOGANCEE', img1: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 98 },
    { name: 'Striped Sailor Cotton Tee', sub: 'Boys Fashion', price: 1499, orig: 1999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.5, rev: 29 },
    { name: 'Floral Hairband & Clip Set', sub: 'Toys & Accessories', price: 999, orig: 1499, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 36 },
    { name: 'Denim Dungaree Overalls', sub: 'Boys Fashion', price: 3299, orig: 4499, brand: 'HERITAGE DENIM', img1: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 55 },
    { name: 'Velvet Ballerina Shoes', sub: 'Footwear', price: 2199, orig: 2999, brand: 'VALENTI ITALY', img1: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 41 },
  ];

  kidsItems.forEach((k, idx) => {
    const orig = k.orig;
    const price = k.price;
    const disc = Math.round(((orig - price) / orig) * 100);
    products.push({
      id: `kid-${300 + idx}`,
      name: k.name,
      brand: k.brand,
      category: 'Kids',
      subcategory: k.sub,
      price: price,
      originalPrice: orig,
      discountPercentage: disc,
      rating: k.rating,
      reviewCount: k.rev,
      description: 'Hypoallergenic organic materials crafted for high active comfort and adorable luxury aesthetic.',
      specifications: { 'Material': '100% Organic GOTS Certified Cotton', 'Age': '2-10 Years' },
      colorOptions: [{ name: 'Sky Blue', code: '#87ceeb' }, { name: 'Blush Pink', code: '#ffb6c1' }],
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      images: [k.img1, k.img2],
      hoverImage: k.img2,
      isNew: k.isNew,
      isTrending: k.isTrending,
      isBestSeller: k.isBest,
      inStock: true,
      stockQuantity: 15,
      sku: `LOG-K-${300 + idx}`,
      tags: ['kids', 'junior', k.sub.toLowerCase()]
    });
  });

  // BEAUTY & SELF CARE (18 Products)
  const beautyItems = [
    { name: 'Radiance Peptide Botanical Face Serum (50ml)', sub: 'Skincare', price: 3499, orig: 4999, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isBest: true, isFlash: true, rating: 4.9, rev: 340 },
    { name: 'Deep Hydration Ceramides Cream (100ml)', sub: 'Skincare', price: 2899, orig: 3999, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 195 },
    { name: 'Niacinamide + Zinc Clarifying Tonic (150ml)', sub: 'Skincare', price: 1999, orig: 2699, brand: 'VERVE COSMETICS', img1: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 140 },
    { name: 'Botanical Argan Hair Elixir Oil (100ml)', sub: 'Haircare', price: 2499, orig: 3299, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 280 },
    { name: 'Sulfate-Free Keratin Nourishing Shampoo', sub: 'Haircare', price: 1799, orig: 2399, brand: 'VERVE COSMETICS', img1: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 110 },
    { name: 'Velvet Rose & Oud Eau de Parfum (100ml)', sub: 'Personal Care', price: 8999, orig: 11999, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', isFlash: true, isBest: true, rating: 4.9, rev: 410 },
    { name: 'Whipped Shea Butter Body Polish (250g)', sub: 'Body Care', price: 2199, orig: 2999, brand: 'VERVE COSMETICS', img1: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 165 },
    { name: 'Precision Beard Grooming Kit & Oil', sub: 'Grooming', price: 3499, orig: 4799, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 92 },
    { name: 'SPF 50+ Invisible Mineral Sunscreen Fluid', sub: 'Skincare', price: 1699, orig: 2299, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 255 },
    { name: 'Rosewater & Chamomile Hydrating Facial Mist', sub: 'Skincare', price: 1299, orig: 1799, brand: 'VERVE COSMETICS', img1: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.6, rev: 88 },
    { name: 'Scalp Revitalizing Peptide Serum (60ml)', sub: 'Haircare', price: 2999, orig: 3999, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 130 },
    { name: 'Eucalyptus & Sea Salt Body Wash (500ml)', sub: 'Body Care', price: 1899, orig: 2499, brand: 'VERVE COSMETICS', img1: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.7, rev: 175 },
    { name: 'Bergamot & Citrus Fine Cologne (50ml)', sub: 'Personal Care', price: 6499, orig: 8999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 140 },
    { name: 'Volcanic Ash Pore Detox Mask (100g)', sub: 'Skincare', price: 2299, orig: 3199, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', isFlash: true, rating: 4.9, rev: 210 },
    { name: 'Natural Deodorant Stick - Cedarwood', sub: 'Personal Care', price: 999, orig: 1499, brand: 'VERVE COSMETICS', img1: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 72 },
    { name: 'Matte Clay Hair Pomade for Men', sub: 'Grooming', price: 1499, orig: 1999, brand: 'MAISON NOIR', img1: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.7, rev: 118 },
    { name: 'Bakuchiol Retinol-Alternative Night Cream', sub: 'Skincare', price: 3899, orig: 5299, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1608248597261-8131e4e10793?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 180 },
    { name: 'Silk Sleep Mask & Lavender Spray Set', sub: 'Personal Care', price: 2799, orig: 3899, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 95 },
  ];

  beautyItems.forEach((b, idx) => {
    const orig = b.orig;
    const price = b.price;
    const disc = Math.round(((orig - price) / orig) * 100);
    products.push({
      id: `bt-400-${idx}`,
      name: b.name,
      brand: b.brand,
      category: 'Beauty & Self Care',
      subcategory: b.sub,
      price: price,
      originalPrice: orig,
      discountPercentage: disc,
      rating: b.rating,
      reviewCount: b.rev,
      description: 'Dermatologically tested clean formulation enriched with botanical actives and peptides for visible radiance.',
      specifications: { 'Volume': '50ml - 500ml', 'Formulation': '100% Vegan & Cruelty-Free' },
      colorOptions: [],
      sizes: ['Standard', 'Travel Size'],
      images: [b.img1, b.img2],
      hoverImage: b.img2,
      isNew: b.isNew,
      isTrending: b.isTrending,
      isBestSeller: b.isBest,
      isFlashSale: b.isFlash,
      flashSaleEndTime: '2026-09-29T23:59:59Z',
      inStock: true,
      stockQuantity: idx % 5 === 0 ? 5 : 42,
      sku: `LOG-B-${400 + idx}`,
      tags: ['beauty', 'skincare', 'selfcare', b.sub.toLowerCase()]
    });
  });

  // ELECTRONICS (18 Products)
  const electronicsItems = [
    { name: 'Acoustic Studio Active Noise-Cancelling Headphones', sub: 'Headphones', price: 19999, orig: 26999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80', isBest: true, isFlash: true, rating: 4.9, rev: 310 },
    { name: 'Pro Titanium Flagship Smartphone 256GB', sub: 'Mobiles', price: 89999, orig: 109999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 190 },
    { name: 'Ultra-Slim M3 Metal Laptop 15-inch', sub: 'Laptops', price: 114999, orig: 134999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 145 },
    { name: 'True Wireless Audiophile Earbuds with ANC', sub: 'Earbuds', price: 12999, orig: 17999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 275 },
    { name: 'Sapphire Glass Fitness Smartwatch', sub: 'Smart Watches', price: 21999, orig: 29999, brand: 'CHRONO SWISS', img1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 160 },
    { name: 'Magnetic Wireless Fast Charging Stand', sub: 'Accessories', price: 3999, orig: 5499, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.6, rev: 89 },
    { name: 'Compact Bluetooth Studio Speaker', sub: 'Accessories', price: 14999, orig: 19999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 220 },
    { name: 'Low-Profile Mechanical Wireless Keyboard', sub: 'Accessories', price: 11999, orig: 15999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 114 },
    { name: '5G Android Ultra Smartphone 128GB', sub: 'Mobiles', price: 64999, orig: 79999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80', isFlash: true, rating: 4.7, rev: 130 },
    { name: 'Precision Ergonomic Wireless Mouse', sub: 'Accessories', price: 4999, orig: 6999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 95 },
    { name: 'Noise-Isolating In-Ear Monitor Headphones', sub: 'Earbuds', price: 8999, orig: 11999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 82 },
    { name: 'Minimalist Ceramic Smartwatch Band', sub: 'Smart Watches', price: 3499, orig: 4999, brand: 'CHRONO SWISS', img1: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.6, rev: 67 },
    { name: 'High-Capacity 25000mAh Power Bank', sub: 'Accessories', price: 4499, orig: 5999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1609592424074-1efb8f2d5939?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 140 },
    { name: 'Over-Ear Studio Reference Headphones', sub: 'Headphones', price: 24999, orig: 32999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 198 },
    { name: 'Ultra-HD 4K Portable Monitor 15.6"', sub: 'Laptops', price: 22999, orig: 29999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 76 },
    { name: 'Rugged GPS Outdoor Smartwatch', sub: 'Smart Watches', price: 27999, orig: 35999, brand: 'CHRONO SWISS', img1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', isFlash: true, rating: 4.9, rev: 110 },
    { name: 'Aluminum Vertical Laptop Stand', sub: 'Accessories', price: 2999, orig: 3999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 63 },
    { name: 'Foldable Wireless ANC Headphones', sub: 'Headphones', price: 15999, orig: 21999, brand: 'NEO AUDIO', img1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 104 },
  ];

  electronicsItems.forEach((el, idx) => {
    const orig = el.orig;
    const price = el.price;
    const disc = Math.round(((orig - price) / orig) * 100);
    products.push({
      id: `el-500-${idx}`,
      name: el.name,
      brand: el.brand,
      category: 'Electronics',
      subcategory: el.sub,
      price: price,
      originalPrice: orig,
      discountPercentage: disc,
      rating: el.rating,
      reviewCount: el.rev,
      description: 'Engineered for audiophiles and digital creators featuring aircraft-grade metals, lossless codecs, and long battery autonomy.',
      specifications: { 'Connectivity': 'Bluetooth 5.3 & USB-C Fast Charge', 'Warranty': '2 Year International Warranty' },
      colorOptions: [
        { name: 'Matte Gunmetal', code: '#4a4e51' },
        { name: 'Silver Frost', code: '#d8dbdd' },
        { name: 'Midnight Black', code: '#0e0e0e' }
      ],
      sizes: ['Standard'],
      images: [el.img1, el.img2],
      hoverImage: el.img2,
      isNew: el.isNew,
      isTrending: el.isTrending,
      isBestSeller: el.isBest,
      isFlashSale: el.isFlash,
      flashSaleEndTime: '2026-09-29T23:59:59Z',
      inStock: true,
      stockQuantity: idx % 3 === 0 ? 3 : 11,
      sku: `LOG-E-${500 + idx}`,
      tags: ['electronics', 'tech', 'audio', el.sub.toLowerCase()]
    });
  });

  // HOME & LIFESTYLE (22 Products)
  const homeItems = [
    { name: 'Artisan Ceramic Sculptural Table Lamp', sub: 'Lighting', price: 6999, orig: 9999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 114 },
    { name: 'Hand-Woven Natural Wool Throw Blanket', sub: 'Home Decor', price: 4999, orig: 6999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 92 },
    { name: 'Minimalist Walnut Wood Coffee Table', sub: 'Furniture', price: 18999, orig: 24999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.9, rev: 140 },
    { name: 'Pour-Over Japanese Ceramic Coffee Dripper', sub: 'Kitchen', price: 2999, orig: 3999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 185 },
    { name: 'Full-Grain Leather Weekender Travel Duffle', sub: 'Bags', price: 16999, orig: 22999, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80', isNew: true, isFlash: true, rating: 4.9, rev: 230 },
    { name: 'Minimalist Brass Wall Clock (30cm)', sub: 'Home Decor', price: 3999, orig: 5499, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 78 },
    { name: 'Linen Duvet Cover & Bedding Set', sub: 'Home Decor', price: 11999, orig: 15999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 160 },
    { name: 'Hand-Poured Soy Wax Scented Candle', sub: 'Home Decor', price: 1999, orig: 2799, brand: 'AURORA SKIN', img1: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.8, rev: 112 },
    { name: 'Mid-Century Velvet Accent Armchair', sub: 'Furniture', price: 24999, orig: 32999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 95 },
    { name: 'Stoneware Matte Dinnerware Set (16 Piece)', sub: 'Kitchen', price: 8999, orig: 11999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.8, rev: 140 },
    { name: 'Architectural Brass Pendant Light', sub: 'Lighting', price: 9999, orig: 13999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 82 },
    { name: 'Handmade Terracotta Plant Pot', sub: 'Home Decor', price: 2499, orig: 3499, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 90 },
    { name: 'Leather Passport Holder & Luggage Tag Set', sub: 'Travel Accessories', price: 2999, orig: 4199, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 64 },
    { name: 'Artisan Glass Cocktail Decanter Set', sub: 'Kitchen', price: 5999, orig: 7999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.9, rev: 118 },
    { name: 'Minimalist Oak Wood Standing Mirror', sub: 'Furniture', price: 14999, orig: 19999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.9, rev: 142 },
    { name: 'Marble & Brass Bookends Pair', sub: 'Home Decor', price: 3499, orig: 4899, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.6, rev: 55 },
    { name: 'French Press Stainless Steel Coffee Maker', sub: 'Kitchen', price: 3999, orig: 5299, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 160 },
    { name: 'Handcrafted Wool Area Rug (5x7 ft)', sub: 'Home Decor', price: 19999, orig: 26999, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.9, rev: 108 },
    { name: 'Minimalist Wall Sconce Light', sub: 'Lighting', price: 5499, orig: 7499, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.7, rev: 72 },
    { name: 'Travel Leather Toiletry Washbag', sub: 'Travel Accessories', price: 3999, orig: 5499, brand: 'SARTORIAL CO.', img1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80', isBest: true, rating: 4.8, rev: 130 },
    { name: 'Teak Wood Cutting Board Set', sub: 'Kitchen', price: 2799, orig: 3899, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', isTrending: true, rating: 4.7, rev: 84 },
    { name: 'Silk Filled Luxury Pillow Set', sub: 'Home Decor', price: 6999, orig: 9499, brand: 'LUMINA LIVING', img1: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80', img2: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80', isNew: true, rating: 4.9, rev: 125 },
  ];

  homeItems.forEach((hm, idx) => {
    const orig = hm.orig;
    const price = hm.price;
    const disc = Math.round(((orig - price) / orig) * 100);
    products.push({
      id: `hm-600-${idx}`,
      name: hm.name,
      brand: hm.brand,
      category: 'Home & Lifestyle',
      subcategory: hm.sub,
      price: price,
      originalPrice: orig,
      discountPercentage: disc,
      rating: hm.rating,
      reviewCount: hm.rev,
      description: 'Hand-crafted artisanal home statement pieces engineered with organic stoneware, solid woods, and brushed brass.',
      specifications: { 'Origin': 'Hand-crafted Artisanal', 'Care': 'Wipe Clean / Hand Wash' },
      colorOptions: [
        { name: 'Sandstone Ivory', code: '#e5dec9' },
        { name: 'Terracotta', code: '#b35d46' }
      ],
      sizes: ['Standard', 'Large'],
      images: [hm.img1, hm.img2],
      hoverImage: hm.img2,
      isNew: hm.isNew,
      isTrending: hm.isTrending,
      isBestSeller: hm.isBest,
      isFlashSale: hm.isFlash,
      flashSaleEndTime: '2026-09-29T23:59:59Z',
      inStock: true,
      stockQuantity: idx % 4 === 0 ? 2 : 19,
      sku: `LOG-H-${600 + idx}`,
      tags: ['home', 'decor', 'lifestyle', hm.sub.toLowerCase()]
    });
  });

  return products;
};

export const MOCK_PRODUCTS: Product[] = generateProducts();

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-9012',
    orderNumber: 'LOG-884920',
    userId: 'user-101',
    items: [
      {
        id: 'oi-1',
        productId: 'wom-100',
        productName: 'Structured Double-Breasted Wool Blazer',
        productImage: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80',
        brand: 'ATELIER LOGANCEE',
        color: 'Onyx Black',
        size: 'S',
        quantity: 1,
        unitPrice: 12999,
        totalPrice: 12999,
      },
      {
        id: 'oi-2',
        productId: 'bt-400-0',
        productName: 'Radiance Peptide Botanical Face Serum (50ml)',
        productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
        brand: 'AURORA SKIN',
        color: 'Default',
        size: '50ml',
        quantity: 1,
        unitPrice: 3499,
        totalPrice: 3499,
      },
    ],
    shippingAddress: MOCK_ADDRESSES[0],
    paymentMethod: 'CARD',
    paymentStatus: 'COMPLETED',
    orderStatus: 'SHIPPED',
    timeline: [
      { status: 'ORDER_PLACED', timestamp: '2026-09-24 10:30 AM', completed: true, description: 'Order successfully confirmed' },
      { status: 'CONFIRMED', timestamp: '2026-09-24 10:35 AM', completed: true, description: 'Payment authorized and order queued' },
      { status: 'PACKED', timestamp: '2026-09-25 02:15 PM', completed: true, description: 'Items packed in luxury gift packaging' },
      { status: 'SHIPPED', timestamp: '2026-09-26 09:00 AM', completed: true, description: 'Handed over to Express Courier (BlueDart: 7729104)' },
      { status: 'OUT_FOR_DELIVERY', timestamp: 'Pending', completed: false, description: 'Will be out for delivery soon' },
      { status: 'DELIVERED', timestamp: 'Pending', completed: false, description: 'Expected delivery by Sep 27' },
    ],
    subtotal: 16498,
    discount: 1000,
    shippingFee: 0,
    tax: 825,
    totalAmount: 16323,
    createdAt: '2026-09-24T10:30:00Z',
    estimatedDelivery: 'September 27, 2026',
    trackingNumber: 'BD7729104IN',
  },
  {
    id: 'ord-8041',
    orderNumber: 'LOG-773105',
    userId: 'user-101',
    items: [
      {
        id: 'oi-3',
        productId: 'el-500-0',
        productName: 'Acoustic Studio Active Noise-Cancelling Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        brand: 'NEO AUDIO',
        color: 'Matte Gunmetal',
        size: 'Standard',
        quantity: 1,
        unitPrice: 19999,
        totalPrice: 19999,
      }
    ],
    shippingAddress: MOCK_ADDRESSES[0],
    paymentMethod: 'UPI',
    paymentStatus: 'COMPLETED',
    orderStatus: 'DELIVERED',
    timeline: [
      { status: 'ORDER_PLACED', timestamp: '2026-09-10 03:20 PM', completed: true, description: 'Order confirmed' },
      { status: 'CONFIRMED', timestamp: '2026-09-10 03:22 PM', completed: true, description: 'Payment received via UPI' },
      { status: 'PACKED', timestamp: '2026-09-11 11:00 AM', completed: true, description: 'Packed carefully' },
      { status: 'SHIPPED', timestamp: '2026-09-11 04:30 PM', completed: true, description: 'Shipped via Express' },
      { status: 'OUT_FOR_DELIVERY', timestamp: '2026-09-13 08:30 AM', completed: true, description: 'Out with delivery agent' },
      { status: 'DELIVERED', timestamp: '2026-09-13 01:15 PM', completed: true, description: 'Delivered to Elena Rostova' },
    ],
    subtotal: 19999,
    discount: 2000,
    shippingFee: 0,
    tax: 1000,
    totalAmount: 18999,
    createdAt: '2026-09-10T15:20:00Z',
    estimatedDelivery: 'September 13, 2026',
    trackingNumber: 'BD5410992IN',
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'wom-100',
    userId: 'usr-99',
    userName: 'Victoria S.',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Exquisite tailored silhouette!',
    comment: 'The quality of the virgin wool and shoulder structure is indistinguishable from top European luxury houses. Fits like a glove.',
    date: '2026-09-18',
    verifiedPurchase: true,
    helpfulCount: 14,
  },
  {
    id: 'rev-2',
    productId: 'wom-100',
    userId: 'usr-88',
    userName: 'Claire Dupont',
    rating: 5,
    title: 'Editorial perfection',
    comment: 'Subtle sheen, drape, horn buttons—everything feels deliberate and premium. Received countless compliments.',
    date: '2026-09-12',
    verifiedPurchase: true,
    helpfulCount: 8,
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'WELCOME20',
    discountPercentage: 20,
    maxDiscount: 3000,
    minOrderAmount: 4999,
    expiryDate: '2026-12-31',
    usageLimit: 1000,
    usageCount: 142,
    isActive: true,
  },
  {
    id: 'c-2',
    code: 'LOGANCEE10',
    discountPercentage: 10,
    maxDiscount: 1500,
    minOrderAmount: 2999,
    expiryDate: '2026-10-30',
    usageLimit: 500,
    usageCount: 89,
    isActive: true,
  },
  {
    id: 'c-3',
    code: 'FASHIONVIP',
    discountPercentage: 25,
    maxDiscount: 5000,
    minOrderAmount: 9999,
    expiryDate: '2026-11-15',
    usageLimit: 100,
    usageCount: 41,
    isActive: true,
  }
];

export const MOCK_INVENTORY: Inventory[] = MOCK_PRODUCTS.slice(0, 15).map((p, idx) => ({
  id: `inv-${idx + 1}`,
  productId: p.id,
  productName: p.name,
  sku: p.sku,
  category: p.category,
  availableStock: p.stockQuantity,
  reservedStock: 1,
  totalSold: 25 + idx * 3,
  status: p.stockQuantity > 5 ? 'IN_STOCK' : p.stockQuantity > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK'
}));

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif-1', title: 'Order Shipped', message: 'Your Order #LOG-884920 has been dispatched via BlueDart Express.', type: 'ORDER', date: '10 mins ago', read: false },
  { id: 'notif-2', title: 'Flash Sale Live', message: 'Up to 35% off on Couture Silk & Leather collection.', type: 'PROMO', date: '2 hours ago', read: false },
  { id: 'notif-3', title: 'Payment Confirmed', message: 'Payment of ₹18,999 received for Order #LOG-773105.', type: 'PAYMENT', date: '2 days ago', read: true },
];

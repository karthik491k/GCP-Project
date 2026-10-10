import React, { useState } from 'react';
import { Product } from '../../types';
import { RatingStars } from '../ui/RatingStars';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { QuickViewModal } from './QuickViewModal';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80';
  const imagesList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.hoverImage || FALLBACK_IMAGE];
  const primaryImage = imagesList[0] || FALLBACK_IMAGE;
  const secondaryImage = product.hoverImage || imagesList[1] || primaryImage;

  return (
    <>
      <div
        className="group relative flex flex-col bg-white border border-neutral-100 transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={isHovered ? secondaryImage : primaryImage}
              alt={product.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.isNew && <Badge variant="new">NEW</Badge>}
            {product.isBestSeller && <Badge variant="black">BEST SELLER</Badge>}
            {product.discountPercentage > 0 && (
              <Badge variant="sale">-{product.discountPercentage}% OFF</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isSaved
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-black'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
          </button>

          {/* Quick Actions Hover Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 py-2.5 px-3 bg-white/95 text-[#121212] hover:bg-white text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors shadow-lg"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
            <button
              onClick={() => addToCart(product)}
              className="py-2.5 px-3 bg-[#121212] text-white hover:bg-neutral-800 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center backdrop-blur-sm transition-colors shadow-lg"
              title="Quick Add"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-2 text-[#121212]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-0.5">
              {product.brand}
            </span>
            <Link
              to={`/product/${product.id}`}
              className="font-semibold text-xs text-[#121212] hover:text-neutral-600 line-clamp-1 transition-colors"
            >
              {product.name}
            </Link>
          </div>

          <div className="flex items-center justify-between mt-0.5">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            
            {/* Color Swatch Preview */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colorOptions.slice(0, 3).map((c) => (
                  <span
                    key={c.name}
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300 shrink-0"
                    style={{ backgroundColor: c.code }}
                    title={c.name}
                  />
                ))}
                {product.colorOptions.length > 3 && (
                  <span className="text-[9px] text-neutral-400 font-mono">+{product.colorOptions.length - 3}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-neutral-100">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#121212]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through font-normal">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="text-[10px] font-bold text-rose-600 uppercase">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Stock status indicator if low stock */}
          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
            <div className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 border border-amber-200 text-center">
              Only {product.stockQuantity} left
            </div>
          )}
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

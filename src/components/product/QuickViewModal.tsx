import React, { useState } from 'react';
import { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { RatingStars } from '../ui/RatingStars';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImg, setActiveImg] = useState<number>(0);

  if (!product) return null;

  const color = selectedColor || (product.colorOptions[0]?.name ?? 'Default');
  const size = selectedSize || (product.sizes[0] ?? 'Standard');
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, color, size, 1);
    onClose();
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop';
  const images = product.images && product.images.length > 0 ? product.images : [FALLBACK_IMAGE];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery Preview */}
        <div className="flex flex-col gap-3">
          <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
            <img
              src={images[activeImg] || images[0] || FALLBACK_IMAGE}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            {product.discountPercentage > 0 && (
              <Badge variant="sale" className="absolute top-4 left-4">
                -{product.discountPercentage}% OFF
              </Badge>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-20 bg-neutral-100 border transition-all ${
                  activeImg === i ? 'border-[#121212] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img || FALLBACK_IMAGE}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">{product.brand}</span>
            <h2 className="font-editorial text-2xl mt-1 tracking-tight">{product.name}</h2>

            <div className="mt-3 flex items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-xs text-neutral-400">|</span>
              <span className="text-xs text-emerald-700 font-medium">SKU: {product.sku}</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#121212]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-base text-neutral-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-4 text-xs text-neutral-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Colors */}
            {product.colorOptions.length > 0 && (
              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                  Color: <span className="text-neutral-900 font-normal">{color}</span>
                </label>
                <div className="flex gap-2">
                  {product.colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                        color === c.name ? 'border-[#121212] scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <span className="block w-full h-full rounded-full border border-black/10" style={{ backgroundColor: c.code }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                  Size: <span className="text-neutral-900 font-normal">{size}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                        size === s
                          ? 'border-[#121212] bg-[#121212] text-white'
                          : 'border-neutral-300 text-neutral-700 hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1 py-3" size="lg">
                <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO CART
              </Button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 border transition-colors ${
                  inWishlist
                    ? 'border-rose-600 bg-rose-50 text-rose-600'
                    : 'border-neutral-300 text-neutral-700 hover:border-black'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
            <button
              onClick={handleViewFullDetails}
              className="text-center text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors flex items-center justify-center gap-1.5 py-2 font-medium"
            >
              <Eye className="w-4 h-4" /> View Full Product Details & Specs
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

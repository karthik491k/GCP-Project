import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { RatingStars } from '../components/ui/RatingStars';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ProductGrid } from '../components/product/ProductGrid';
import { Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, ThumbsUp, Plus, Minus, Ruler, Star, CheckCircle } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'fit' | 'shipping' | 'returns'>('desc');

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Write review form state
  const [newRating, setNewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    const loadProductData = async () => {
      setIsLoading(true);
      try {
        const prod = await productService.getProductById(id);
        setProduct(prod);
        setSelectedColor(prod.colorOptions?.[0]?.name || 'Standard');
        setSelectedSize(prod.sizes?.[0] || 'Standard');
        setActiveImgIndex(0);

        const revs = await reviewService.getProductReviews(id);
        setReviews(revs);

        const recRes = await productService.getProducts({ category: prod.category, limit: 4 });
        setRecommended(recRes.content.filter(p => p.id !== id));
      } catch {
        showToast('Error', 'Product not found', 'error');
        navigate('/shop');
      } finally {
        setIsLoading(false);
      }
    };
    loadProductData();
  }, [id, navigate, showToast]);

  if (isLoading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse font-editorial text-2xl">Loading Luxury Product Details...</div>
      </div>
    );
  }

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80';
  const detailImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.hoverImage || FALLBACK_IMAGE];
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleAddReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) return;

    try {
      const added = await reviewService.addReview(product.id, {
        rating: newRating,
        title: newReviewTitle,
        comment: newReviewComment,
      });
      setReviews([added, ...reviews]);
      showToast('Review Submitted', 'Thank you for sharing your feedback with the community.', 'success');
      setIsWriteReviewOpen(false);
      setNewReviewTitle('');
      setNewReviewComment('');
    } catch {
      showToast('Error', 'Could not save review', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-[#121212]">
      {/* Breadcrumb */}
      <nav className="text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-2">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-black">{product.category}</Link>
        <span>/</span>
        <span className="text-neutral-800 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Gallery + Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] no-scrollbar shrink-0">
            {detailImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`w-16 h-20 bg-neutral-100 border transition-all ${
                  activeImgIndex === idx ? 'border-[#121212] opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="flex-1 aspect-[3/4] bg-neutral-100 relative overflow-hidden group">
            <img
              src={detailImages[activeImgIndex] || detailImages[0] || FALLBACK_IMAGE}
              alt={product.name}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 cursor-zoom-in"
            />
            {product.discountPercentage > 0 && (
              <Badge variant="sale" className="absolute top-4 left-4 z-10">
                -{product.discountPercentage}% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Right Info Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold block">{product.brand}</span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight mt-1 leading-tight">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-neutral-300">|</span>
              <span className="text-xs text-neutral-500">SKU: <span className="font-medium text-black">{product.sku}</span></span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4 py-3 border-y border-neutral-100">
              <span className="text-3xl font-bold text-[#121212]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-neutral-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5">
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-4 text-xs text-neutral-600 leading-relaxed">{product.description}</p>

            {/* Stock Pill */}
            <div className="mt-4">
              {product.stockQuantity <= 5 && product.stockQuantity > 0 ? (
                <Badge variant="stock">ONLY {product.stockQuantity} LEFT IN STOCK</Badge>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle className="w-4 h-4" /> IN STOCK & READY TO SHIP
                </span>
              )}
            </div>

            {/* Color Selector */}
            {product.colorOptions.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    COLOR: <span className="text-black font-normal">{selectedColor}</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  {product.colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === c.name ? 'border-[#121212] scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <span className="block w-full h-full rounded-full border border-black/10" style={{ backgroundColor: c.code }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    SIZE: <span className="text-black font-normal">{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-neutral-500 hover:text-black underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-medium border transition-all ${
                        selectedSize === s
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

            {/* Quantity */}
            <div className="mt-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                QUANTITY
              </label>
              <div className="flex items-center w-32 border border-neutral-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-neutral-500 hover:text-black hover:bg-neutral-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-neutral-500 hover:text-black hover:bg-neutral-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-neutral-200">
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} size="lg" className="flex-1 py-4">
                <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO CART
              </Button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border transition-colors ${
                  isSaved ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-neutral-300 text-neutral-700 hover:border-black'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
            <Button onClick={handleBuyNow} variant="outline" size="lg" className="w-full py-4 border-black text-black hover:bg-black hover:text-white">
              BUY NOW WITH 1-CLICK
            </Button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-neutral-700" />
              <span>Complimentary Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="w-4 h-4 text-neutral-700" />
              <span>Easy 7-Day Return</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>Authentic Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-neutral-200 pt-10 space-y-8">
        <div className="flex border-b border-neutral-200 overflow-x-auto no-scrollbar gap-8">
          {[
            { id: 'desc', label: 'Description' },
            { id: 'specs', label: 'Specifications' },
            { id: 'fit', label: 'Size & Fit' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'returns', label: 'Returns Policy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs leading-relaxed text-neutral-700 max-w-4xl">
          {activeTab === 'desc' && <p>{product.description}</p>}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="font-semibold text-neutral-500">{key}:</span>
                  <span className="font-medium text-black">{value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'fit' && <p>{product.sizeAndFit || 'Designed for a standard tailored fit. Fits true to size.'}</p>}
          {activeTab === 'shipping' && <p>{product.shippingInfo || 'Free standard express shipping on all orders above ₹999.'}</p>}
          {activeTab === 'returns' && <p>{product.returnPolicy || '7-day doorstep pickup returns.'}</p>}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-neutral-200 pt-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-editorial text-2xl font-medium tracking-tight">Customer Reviews ({reviews.length})</h3>
            <div className="flex items-center gap-3 mt-1">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-xs text-neutral-500">Based on verified purchaser feedback</span>
            </div>
          </div>
          <Button onClick={() => setIsWriteReviewOpen(true)} variant="outline">
            WRITE A REVIEW
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-xs text-neutral-500 py-4">No reviews yet for this product. Be the first to leave a review!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white border border-neutral-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-black">{rev.userName}</h5>
                      <span className="text-[10px] text-neutral-400">{rev.date}</span>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} showCount={false} />
                </div>
                <h4 className="text-xs font-bold text-black">{rev.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-400">
                  <button
                    onClick={async () => {
                      const newCnt = await reviewService.voteHelpful(rev.id);
                      setReviews(reviews.map(r => r.id === rev.id ? { ...r, helpfulCount: newCnt } : r));
                    }}
                    className="flex items-center gap-1 hover:text-black"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div className="border-t border-neutral-200 pt-12">
          <h3 className="font-editorial text-2xl font-medium tracking-tight mb-8">RECOMMENDED FOR YOU</h3>
          <ProductGrid products={recommended} />
        </div>
      )}

      {/* Size Guide Modal */}
      <Modal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} title="Size & Measurement Guide">
        <div className="space-y-4 text-xs">
          <p className="text-neutral-600">All measurements are provided in centimeters (cm). For exact fit, compare your body measurements to the chart below.</p>
          <table className="w-full border-collapse border border-neutral-200 text-left">
            <thead>
              <tr className="bg-neutral-100 text-neutral-800">
                <th className="p-2 border border-neutral-200 font-bold">Size</th>
                <th className="p-2 border border-neutral-200 font-bold">Bust / Chest</th>
                <th className="p-2 border border-neutral-200 font-bold">Waist</th>
                <th className="p-2 border border-neutral-200 font-bold">Hips</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border font-bold">XS</td><td className="p-2 border">82 - 85 cm</td><td className="p-2 border">63 - 66 cm</td><td className="p-2 border">89 - 92 cm</td></tr>
              <tr><td className="p-2 border font-bold">S</td><td className="p-2 border">86 - 89 cm</td><td className="p-2 border">67 - 70 cm</td><td className="p-2 border">93 - 96 cm</td></tr>
              <tr><td className="p-2 border font-bold">M</td><td className="p-2 border">90 - 93 cm</td><td className="p-2 border">71 - 74 cm</td><td className="p-2 border">97 - 100 cm</td></tr>
              <tr><td className="p-2 border font-bold">L</td><td className="p-2 border">94 - 98 cm</td><td className="p-2 border">75 - 79 cm</td><td className="p-2 border">101 - 105 cm</td></tr>
              <tr><td className="p-2 border font-bold">XL</td><td className="p-2 border">99 - 103 cm</td><td className="p-2 border">80 - 84 cm</td><td className="p-2 border">106 - 110 cm</td></tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Write Review Modal */}
      <Modal isOpen={isWriteReviewOpen} onClose={() => setIsWriteReviewOpen(false)} title="Write a Product Review">
        <form onSubmit={handleAddReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-1 text-amber-400 focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-neutral-300'}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Headline / Title</label>
            <input
              type="text"
              placeholder="e.g. Exceptional tailoring and fabric!"
              value={newReviewTitle}
              onChange={(e) => setNewReviewTitle(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Review Details</label>
            <textarea
              rows={4}
              placeholder="Describe fit, material quality, and overall impression..."
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
              required
            />
          </div>
          <Button type="submit" className="w-full py-3">SUBMIT REVIEW</Button>
        </form>
      </Modal>
    </div>
  );
};

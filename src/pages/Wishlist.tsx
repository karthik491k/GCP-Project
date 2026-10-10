import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { RatingStars } from '../components/ui/RatingStars';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-editorial text-3xl font-light">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Save your favorite couture gowns, cashmere knits, and peptide serums to revisit anytime.
        </p>
        <Link to="/shop">
          <Button size="lg" className="px-10 py-4 mt-2">
            EXPLORE MARKETPLACE
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#121212]">
      <div>
        <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">SAVED ITEMS</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">MY WISHLIST ({wishlist.length})</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="group relative bg-white border border-neutral-100 flex flex-col justify-between shadow-sm">
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              <button
                onClick={() => removeFromWishlist(item.product.id)}
                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-neutral-600 hover:text-rose-600 backdrop-blur-sm transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">{item.product.brand}</span>
                <h4 className="text-xs font-semibold text-black line-clamp-1">{item.product.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={item.product.rating} reviewCount={item.product.reviewCount} showCount={false} />
                  <span className="text-[10px] text-neutral-500">
                    {item.product.inStock ? (
                      <span className="text-emerald-700 font-bold">IN STOCK</span>
                    ) : (
                      <span className="text-rose-600 font-bold">OUT OF STOCK</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold">₹{item.product.price.toLocaleString()}</span>
                  {item.product.originalPrice > item.product.price && (
                    <span className="text-xs text-neutral-400 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                <Button
                  onClick={async () => {
                    await addToCart(item.product);
                    await removeFromWishlist(item.product.id);
                  }}
                  className="w-full py-2.5 text-[11px]"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5" /> MOVE TO BAG
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

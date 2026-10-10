import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Tag, Layers, ShoppingBag } from 'lucide-react';
import { productService } from '../../services/productService';
import { Product, Category, Brand } from '../../types';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ products: Product[]; categories: Category[]; brands: Brand[] }>({
    products: [],
    categories: [],
    brands: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [], brands: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await productService.searchProducts(query);
        setResults(data);
      } catch {
        // error handled
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleSelectCategory = (catName: string) => {
    onClose();
    navigate(`/shop?category=${encodeURIComponent(catName)}`);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white text-[#121212] w-full max-w-3xl shadow-2xl overflow-hidden border border-neutral-200">
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="flex items-center px-6 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <input
            type="text"
            placeholder="Search for products, brands (e.g. Atelier Logancee), or categories (e.g. Dresses)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-medium outline-none bg-transparent placeholder:text-neutral-400"
            autoFocus
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-black mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="button" onClick={onClose} className="text-xs uppercase tracking-widest text-neutral-500 font-semibold hover:text-black">
            ESC
          </button>
        </form>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6">
          {!query.trim() ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {['Silk Evening Gown', 'Wool Blazer', 'Cashmere Sweater', 'Peptide Serum', 'Noise-Cancelling Headphones', 'Italian Boots'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-xs tracking-wide transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : isLoading ? (
            <div className="py-12 text-center text-xs text-neutral-400 uppercase tracking-widest animate-pulse">
              Searching Logancee Marketplace...
            </div>
          ) : results.products.length === 0 && results.categories.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              No results found for "<span className="font-semibold">{query}</span>".
            </div>
          ) : (
            <div className="space-y-6">
              {/* Categories / Brands matched */}
              {(results.categories.length > 0 || results.brands.length > 0) && (
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-100">
                  {results.categories.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> Categories
                      </h4>
                      <div className="flex flex-col gap-1">
                        {results.categories.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCategory(c.name)}
                            className="text-xs text-left font-medium text-neutral-800 hover:text-black hover:underline"
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {results.brands.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" /> Brands
                      </h4>
                      <div className="flex flex-col gap-1">
                        {results.brands.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              onClose();
                              navigate(`/shop?brand=${encodeURIComponent(b.name)}`);
                            }}
                            className="text-xs text-left font-medium text-neutral-800 hover:text-black hover:underline"
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Products Matched */}
              {results.products.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" /> Products ({results.products.length})
                  </h4>
                  <div className="flex flex-col gap-3">
                    {results.products.slice(0, 5).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p.id)}
                        className="flex items-center gap-4 p-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover bg-neutral-100" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">{p.brand}</span>
                          <h5 className="text-xs font-semibold text-neutral-900 truncate">{p.name}</h5>
                          <div className="text-xs font-bold text-black mt-0.5">₹{p.price.toLocaleString()}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

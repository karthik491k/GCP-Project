import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product, Category } from '../types';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductCard } from '../components/product/ProductCard';
import { CountdownTimer } from '../components/ui/CountdownTimer';
import { Button } from '../components/ui/Button';
import { ArrowRight, Sparkles, ChevronRight, Star, Quote, Flame, Zap, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trendingNow, setTrendingNow] = useState<Product[]>([]);
  const [mensEdit, setMensEdit] = useState<Product[]>([]);
  const [womensEdit, setWomensEdit] = useState<Product[]>([]);
  const [beautyEdit, setBeautyEdit] = useState<Product[]>([]);
  const [electronicsEdit, setElectronicsEdit] = useState<Product[]>([]);
  const [homeEdit, setHomeEdit] = useState<Product[]>([]);
  const [flashSaleItems, setFlashSaleItems] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const catData = await productService.getCategories();
        setCategories(catData);

        const result = await productService.getProducts({ limit: 40 });
        console.log("PRODUCT API RESULT:", result);

        const allProducts = result && Array.isArray(result.content) ? result.content : [];

        if (allProducts.length === 0) {
          setError("No products available in database.");
          return;
        }

        const getCategoryItems = (catName: string) => {
          return allProducts.filter(p => p.category.toLowerCase().includes(catName.toLowerCase())).slice(0, 8);
        };

        setNewArrivals(allProducts.filter(p => p.isNew).length > 0 ? allProducts.filter(p => p.isNew).slice(0, 8) : allProducts.slice(0, 8));
        setTrendingNow(allProducts.filter(p => p.isTrending).length > 0 ? allProducts.filter(p => p.isTrending).slice(0, 8) : allProducts.slice(0, 8));
        setMensEdit(getCategoryItems('Men'));
        setWomensEdit(getCategoryItems('Women'));
        setBeautyEdit(getCategoryItems('Beauty'));
        setElectronicsEdit(getCategoryItems('Electronics'));
        setHomeEdit(getCategoryItems('Home'));
        setFlashSaleItems(allProducts.filter(p => p.isFlashSale || p.discountPercentage >= 20).slice(0, 4));
        setBestSellers(allProducts.filter(p => p.isBestSeller).length > 0 ? allProducts.filter(p => p.isBestSeller).slice(0, 8) : allProducts.slice(0, 8));
      } catch (err: any) {
        console.error("Home data fetch error:", err);
        setError(err?.message || 'Failed to connect to GlobalCart backend API.');
      } finally {
        setIsLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-20 text-[#121212]">
      {/* 2. REDUCED HEIGHT HERO SECTION */}
      <section className="relative min-h-[60vh] lg:min-h-[65vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Logancee Luxury Fashion Hero"
            className="w-full h-full object-cover opacity-60 scale-105 transform animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-4 py-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-neutral-300 border border-white/20 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AUTUMN / WINTER 2026 EDITORIAL
          </span>

          <h1 className="font-editorial text-4xl sm:text-6xl font-light tracking-tight leading-tight">
            DEFINE YOUR <br className="hidden sm:inline" /> EVERYDAY STYLE
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light tracking-wide leading-relaxed">
            Curated fashion, haute couture, botanical self-care, and minimalist lifestyle tech for every elevated moment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop?category=Men" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-10 py-3.5 bg-[#121212] text-white border border-neutral-700 hover:bg-neutral-800 active:bg-black focus:ring-2 focus:ring-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all duration-200"
              >
                SHOP MEN <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/shop?category=Women" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-10 py-3.5 bg-transparent text-white border border-white hover:bg-white hover:text-black active:bg-neutral-100 focus:ring-2 focus:ring-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all duration-200"
              >
                SHOP WOMEN <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider block mb-1">API ERROR NOTICE:</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* 3. CATEGORY SHOWCASE (IMMEDIATELY AFTER HERO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">EXPLORE MARKETPLACE</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">CURATED CATEGORIES</h2>
          </div>
          <span className="text-xs text-neutral-500 hidden md:block">Select a category to discover curated edits</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 flex flex-col justify-end p-4 border border-neutral-200/60 shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 text-white space-y-1">
                <h3 className="font-editorial text-lg font-normal tracking-wide">{cat.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-neutral-300 block">{cat.itemCount.toLocaleString()} Products</span>
                <div className="pt-1 flex items-center text-[10px] uppercase tracking-widest font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                  EXPLORE <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">JUST DROPPED</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">NEW ARRIVALS</h2>
            <p className="text-xs text-neutral-500 mt-1">Fresh styles curated for the current season.</p>
          </div>
          <Link to="/shop?sortBy=newest" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW ALL NEW DROPS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} isLoading={isLoading} />
      </section>

      {/* 5. SHOP BY CATEGORY - EDITORIAL SPOTLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">EDITORIAL LOOKBOOK</span>
          <h2 className="font-editorial text-3xl md:text-4xl font-light tracking-tight mt-1">FEATURED CATEGORY EDITS</h2>
        </div>

        {/* Women Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-neutral-200 p-6 md:p-8">
          <div className="lg:col-span-4 relative aspect-[4/5] bg-neutral-900 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
              alt="Women Couture Edit"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">HAUTE COUTURE</span>
              <h3 className="font-editorial text-2xl font-light">WOMEN'S COLLECTION</h3>
              <Link to="/shop?category=Women" className="mt-3 text-xs font-bold uppercase tracking-widest flex items-center text-amber-300 hover:underline">
                EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {womensEdit.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Men Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-neutral-200 p-6 md:p-8">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mensEdit.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2 relative aspect-[4/5] bg-neutral-900 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80"
              alt="Men Tailoring Edit"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">BESPOKE TAILORING</span>
              <h3 className="font-editorial text-2xl font-light">MEN'S COLLECTION</h3>
              <Link to="/shop?category=Men" className="mt-3 text-xs font-bold uppercase tracking-widest flex items-center text-amber-300 hover:underline">
                EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> POPULAR DEMAND
            </span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">TRENDING NOW</h2>
          </div>
          <Link to="/shop?sortBy=recommended" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            EXPLORE TRENDS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={trendingNow} isLoading={isLoading} />
      </section>

      {/* 7. MEN'S EDIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">SARTORIAL ELEGANCE</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">MEN'S EDIT</h2>
            <p className="text-xs text-neutral-500 mt-1">Shirts, T-Shirts, Jackets, Trousers, Leather Boots & Watches.</p>
          </div>
          <Link to="/shop?category=Men" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW ALL MEN <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={mensEdit} isLoading={isLoading} />
      </section>

      {/* 8. WOMEN'S EDIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">LUXURY COUTURE</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">WOMEN'S EDIT</h2>
            <p className="text-xs text-neutral-500 mt-1">Evening gowns, tailored blazers, silk sarees, handbags & pumps.</p>
          </div>
          <Link to="/shop?category=Women" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW ALL WOMEN <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={womensEdit} isLoading={isLoading} />
      </section>

      {/* 9. FLASH SALE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neutral-900 via-black to-neutral-900 text-white p-8 md:p-12 mb-8 border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.25em] text-rose-400">
              <Zap className="w-4 h-4 fill-rose-400" /> LIMITED TIME FLASH SALE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight">UP TO 35% OFF SIGNATURE EDITS</h2>
            <p className="text-xs text-neutral-400 max-w-lg">
              Limited quantity releases available at private drop pricing until timers expire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">TIME REMAINING:</span>
              <CountdownTimer />
            </div>
            <Link to="/shop?discount=20">
              <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-bold px-8 py-3.5">
                SHOP FLASH SALE <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <ProductGrid products={flashSaleItems} isLoading={isLoading} />
      </section>

      {/* 10. BEAUTY & SELF CARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-800">BOTANICAL FORMULATIONS</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">BEAUTY & SELF CARE</h2>
            <p className="text-xs text-neutral-500 mt-1">Peptide serums, ceramides creams, hair oils, and signature fragrances.</p>
          </div>
          <Link to="/shop?category=Beauty" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW BEAUTY EDIT <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={beautyEdit} isLoading={isLoading} />
      </section>

      {/* 11. ELECTRONICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-800">MINIMALIST TECH</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">ELECTRONICS & AUDIO</h2>
            <p className="text-xs text-neutral-500 mt-1">ANC headphones, titanium smartphones, laptops, and mechanical keyboards.</p>
          </div>
          <Link to="/shop?category=Electronics" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW TECH EDIT <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={electronicsEdit} isLoading={isLoading} />
      </section>

      {/* 12. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">HIGHEST RATED BY CUSTOMERS</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">BEST SELLERS</h2>
          </div>
          <Link to="/shop?sortBy=rating" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW ALL BEST SELLERS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} isLoading={isLoading} />
      </section>

      {/* 13. HOME & LIFESTYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">ARTISANAL LIVING</span>
            <h2 className="font-editorial text-3xl font-light tracking-tight mt-1">HOME & LIFESTYLE</h2>
            <p className="text-xs text-neutral-500 mt-1">Ceramic lamps, linen bedding, coffee drippers, and travel weekender duffles.</p>
          </div>
          <Link to="/shop?category=Home" className="text-xs uppercase tracking-widest font-bold hover:underline flex items-center gap-1 mt-2 md:mt-0">
            VIEW HOME EDIT <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={homeEdit} isLoading={isLoading} />
      </section>

      {/* 14. EDITORIAL REVIEWS */}
      <section className="bg-neutral-100 py-16 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <Quote className="w-10 h-10 mx-auto text-neutral-400" />
          <h2 className="font-editorial text-2xl md:text-3xl font-light italic text-neutral-800 leading-relaxed">
            "Logancee brings global runway craftsmanship and botanical self-care right to your doorstep. The double-breasted wool blazer and peptide serum set the standard for contemporary luxury."
          </h2>
          <div className="flex items-center justify-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">VOGUE EDITORIAL REVIEW</p>
            <p className="text-[11px] text-neutral-500">Paris Fashion Week Issue 2026</p>
          </div>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-bold tracking-widest font-editorial">
          <span>ATELIER LOGANCEE</span>
          <span>MAISON NOIR</span>
          <span>VALENTI ITALY</span>
          <span>AURORA SKIN</span>
          <span>NEO AUDIO</span>
          <span>CHRONO SWISS</span>
        </div>
      </section>
    </div>
  );
};

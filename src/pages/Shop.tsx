import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product, Category, Brand, ProductFilterParams, PaginatedResponse } from '../types';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { Drawer } from '../components/ui/Drawer';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [productsData, setProductsData] = useState<PaginatedResponse<Product>>({
    content: [],
    totalElements: 0,
    totalPages: 1,
    pageNumber: 1,
    pageSize: 12,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Parse Filters from URL search params
  const parseFiltersFromUrl = (): ProductFilterParams => ({
    category: searchParams.get('category') || undefined,
    subcategory: searchParams.get('subcategory') || undefined,
    brand: searchParams.getAll('brand').length > 0 ? searchParams.getAll('brand') : undefined,
    color: searchParams.getAll('color').length > 0 ? searchParams.getAll('color') : undefined,
    size: searchParams.getAll('size').length > 0 ? searchParams.getAll('size') : undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    inStock: searchParams.get('inStock') === 'true',
    minDiscount: searchParams.get('discount') ? Number(searchParams.get('discount')) : undefined,
    sortBy: (searchParams.get('sortBy') as ProductFilterParams['sortBy']) || 'recommended',
    searchQuery: searchParams.get('search') || undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: 12,
  });

  const [filters, setFilters] = useState<ProductFilterParams>(parseFiltersFromUrl());

  useEffect(() => {
    setFilters(parseFiltersFromUrl());
  }, [searchParams]);

  useEffect(() => {
    const loadMetadata = async () => {
      const [cats, bnd] = await Promise.all([
        productService.getCategories(),
        productService.getBrands(),
      ]);
      setCategories(cats);
      setBrands(bnd);
    };
    loadMetadata();
  }, []);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await productService.getProducts(filters);
        setProductsData(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load products from backend server.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const updateFilters = (updated: ProductFilterParams) => {
    setFilters(updated);

    // Sync search params URL
    const newParams = new URLSearchParams();
    if (updated.category) newParams.set('category', updated.category);
    if (updated.subcategory) newParams.set('subcategory', updated.subcategory);
    if (updated.brand) updated.brand.forEach(b => newParams.append('brand', b));
    if (updated.minPrice) newParams.set('minPrice', String(updated.minPrice));
    if (updated.maxPrice) newParams.set('maxPrice', String(updated.maxPrice));
    if (updated.inStock) newParams.set('inStock', 'true');
    if (updated.minDiscount) newParams.set('discount', String(updated.minDiscount));
    if (updated.sortBy) newParams.set('sortBy', updated.sortBy);
    if (updated.searchQuery) newParams.set('search', updated.searchQuery);
    if (updated.page) newParams.set('page', String(updated.page));

    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    const reset: ProductFilterParams = { sortBy: 'recommended', page: 1, limit: 12 };
    setFilters(reset);
    setSearchParams(new URLSearchParams());
  };

  const activeFilterPills = [
    filters.category && { label: `Category: ${filters.category}`, key: 'category' },
    filters.subcategory && { label: `Subcategory: ${filters.subcategory}`, key: 'subcategory' },
    filters.searchQuery && { label: `Search: ${filters.searchQuery}`, key: 'searchQuery' },
    filters.inStock && { label: 'In Stock Only', key: 'inStock' },
    filters.minDiscount && { label: `Min ${filters.minDiscount}% Discount`, key: 'minDiscount' },
    ...(filters.brand || []).map(b => ({ label: `Brand: ${b}`, key: `brand-${b}`, brandVal: b })),
  ].filter(Boolean);

  const removePill = (item: { key: string; brandVal?: string }) => {
    const updated = { ...filters, page: 1 };
    if (item.key === 'category') updated.category = undefined;
    if (item.key === 'subcategory') updated.subcategory = undefined;
    if (item.key === 'searchQuery') updated.searchQuery = undefined;
    if (item.key === 'inStock') updated.inStock = undefined;
    if (item.key === 'minDiscount') updated.minDiscount = undefined;
    if (item.brandVal) {
      updated.brand = (updated.brand || []).filter(b => b !== item.brandVal);
    }
    updateFilters(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#121212]">
      {/* Page Title & Breadcrumb */}
      <div>
        <div className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">LOGANCEE MARKETPLACE</div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight">
          {filters.category ? `${filters.category} Collection` : 'All Products & Collections'}
        </h1>
        {filters.searchQuery && (
          <p className="text-xs text-neutral-500 mt-1">Showing search results for "{filters.searchQuery}"</p>
        )}
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 text-xs font-mono">
          <span className="font-bold uppercase tracking-wider block mb-1">API ERROR NOTICE:</span>
          <p>{error}</p>
        </div>
      )}

      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-y border-neutral-200">
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 py-2.5 px-4 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filter Products
        </button>

        {/* Results Counter */}
        <div className="text-xs text-neutral-600 font-medium">
          Showing {productsData.totalElements > 0 ? (productsData.pageNumber - 1) * productsData.pageSize + 1 : 0}–
          {Math.min(productsData.pageNumber * productsData.pageSize, productsData.totalElements)} of{' '}
          <span className="font-bold text-black">{productsData.totalElements}</span> products
        </div>

        {/* Sorting Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Sort By:</span>
          <select
            value={filters.sortBy || 'recommended'}
            onChange={(e) => updateFilters({ ...filters, sortBy: e.target.value as ProductFilterParams['sortBy'], page: 1 })}
            className="bg-white border border-neutral-300 text-xs font-semibold py-2 px-3 focus:outline-none focus:border-black"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Active Filter Pills */}
      {activeFilterPills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-neutral-500 font-medium mr-1">Active Filters:</span>
          {activeFilterPills.map((pill) => (
            <span
              key={(pill as any).key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-xs text-neutral-800 font-medium"
            >
              {(pill as any).label}
              <button onClick={() => removePill(pill as any)} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={handleResetFilters}
            className="text-xs text-neutral-500 hover:text-black underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 border border-neutral-200 shadow-sm">
            <ProductFilters
              filters={filters}
              onChange={updateFilters}
              categories={categories}
              brands={brands}
              onReset={handleResetFilters}
            />
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="lg:col-span-3 space-y-8">
          <ProductGrid products={productsData.content} isLoading={isLoading} />

          {/* Pagination */}
          {productsData.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 border-t border-neutral-200">
              <button
                disabled={filters.page === 1}
                onClick={() => updateFilters({ ...filters, page: (filters.page || 1) - 1 })}
                className="p-2 border border-neutral-300 text-neutral-700 hover:border-black disabled:opacity-30 disabled:hover:border-neutral-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: productsData.totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = (filters.page || 1) === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => updateFilters({ ...filters, page: pageNum })}
                    className={`w-9 h-9 text-xs font-semibold border transition-all ${
                      isActive
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'border-neutral-200 text-neutral-700 hover:border-black'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={filters.page === productsData.totalPages}
                onClick={() => updateFilters({ ...filters, page: (filters.page || 1) + 1 })}
                className="p-2 border border-neutral-300 text-neutral-700 hover:border-black disabled:opacity-30 disabled:hover:border-neutral-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} title="Filter & Sort Products">
        <ProductFilters
          filters={filters}
          onChange={(up) => { updateFilters(up); setIsMobileFilterOpen(false); }}
          categories={categories}
          brands={brands}
          onReset={() => { handleResetFilters(); setIsMobileFilterOpen(false); }}
        />
      </Drawer>
    </div>
  );
};

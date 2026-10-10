import React from 'react';
import { ProductFilterParams, Category, Brand } from '../../types';
import { RotateCcw, Check } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFilterParams;
  onChange: (updated: ProductFilterParams) => void;
  categories: Category[];
  brands: Brand[];
  onReset: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  categories,
  brands,
  onReset,
}) => {
  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '50ml', '100ml', 'UK 7', 'UK 8', 'UK 9'];
  const COLORS = [
    { name: 'Black', code: '#121212' },
    { name: 'White', code: '#ffffff' },
    { name: 'Ivory', code: '#f5f4ef' },
    { name: 'Camel', code: '#966e44' },
    { name: 'Navy', code: '#1b2a4a' },
    { name: 'Green', code: '#046307' },
    { name: 'Burgundy', code: '#6e0f1e' },
  ];

  const handleBrandToggle = (brandName: string) => {
    const current = filters.brand || [];
    const updated = current.includes(brandName)
      ? current.filter((b) => b !== brandName)
      : [...current, brandName];
    onChange({ ...filters, brand: updated, page: 1 });
  };

  const handleCategorySelect = (catName: string) => {
    if (filters.category === catName) {
      onChange({ ...filters, category: undefined, subcategory: undefined, page: 1 });
    } else {
      onChange({ ...filters, category: catName, subcategory: undefined, page: 1 });
    }
  };

  const handleSubcategorySelect = (subName: string) => {
    if (filters.subcategory === subName) {
      onChange({ ...filters, subcategory: undefined, page: 1 });
    } else {
      onChange({ ...filters, subcategory: subName, page: 1 });
    }
  };

  const activeCategory = categories.find(
    (c) => c.name.toLowerCase() === (filters.category || '').toLowerCase()
  );

  return (
    <div className="flex flex-col gap-6 w-full text-[#121212]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h3 className="font-editorial text-lg tracking-tight uppercase font-medium">Filter By</h3>
        <button
          onClick={onReset}
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="pb-5 border-b border-neutral-200">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-3">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isSelected = filters.category?.toLowerCase() === cat.name.toLowerCase();
            return (
              <div key={cat.id} className="flex flex-col">
                <button
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex items-center justify-between text-xs py-1 transition-colors text-left font-medium ${
                    isSelected ? 'text-[#121212] font-bold pl-2 border-l-2 border-black' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-neutral-400">({cat.itemCount})</span>
                </button>

                {/* Subcategories */}
                {isSelected && cat.subcategories.length > 0 && (
                  <div className="pl-4 mt-1 flex flex-col gap-1.5 border-l border-neutral-200 py-1">
                    {cat.subcategories.map((sub) => {
                      const isSubSelected = filters.subcategory === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => handleSubcategorySelect(sub)}
                          className={`text-[11px] text-left transition-colors ${
                            isSubSelected ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pb-5 border-b border-neutral-200">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-3">Price Range</h4>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 bg-neutral-100 p-2 border border-neutral-200 text-xs">
            <span className="text-neutral-400">Min: </span>
            <span className="font-semibold">₹{filters.minPrice || 0}</span>
          </div>
          <span className="text-neutral-400">-</span>
          <div className="flex-1 bg-neutral-100 p-2 border border-neutral-200 text-xs">
            <span className="text-neutral-400">Max: </span>
            <span className="font-semibold">₹{filters.maxPrice || 30000}</span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={30000}
          step={1000}
          value={filters.maxPrice || 30000}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value), page: 1 })}
          className="w-full accent-[#121212] cursor-pointer"
        />
      </div>

      {/* Brand Checkboxes */}
      <div className="pb-5 border-b border-neutral-200">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-3">Brands</h4>
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 no-scrollbar">
          {brands.map((b) => {
            const checked = (filters.brand || []).includes(b.name);
            return (
              <label
                key={b.id}
                className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBrandToggle(b.name)}
                  className="rounded-none border-neutral-400 accent-[#121212]"
                />
                <span>{b.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="pb-5 border-b border-neutral-200">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => {
            const isSel = (filters.size || []).includes(sz);
            return (
              <button
                key={sz}
                onClick={() => {
                  const current = filters.size || [];
                  const updated = current.includes(sz)
                    ? current.filter((s) => s !== sz)
                    : [...current, sz];
                  onChange({ ...filters, size: updated, page: 1 });
                }}
                className={`px-2.5 py-1 text-xs border font-medium transition-colors ${
                  isSel ? 'bg-[#121212] text-white border-[#121212]' : 'border-neutral-200 text-neutral-700 hover:border-black'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Options */}
      <div className="pb-5 border-b border-neutral-200">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-3">Color</h4>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => {
            const isSel = (filters.color || []).includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => {
                  const current = filters.color || [];
                  const updated = current.includes(c.name)
                    ? current.filter((col) => col !== c.name)
                    : [...current, c.name];
                  onChange({ ...filters, color: updated, page: 1 });
                }}
                className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 relative ${
                  isSel ? 'border-black scale-110' : 'border-transparent hover:scale-105'
                }`}
                title={c.name}
              >
                <span
                  className="block w-full h-full rounded-full border border-black/10 flex items-center justify-center text-white"
                  style={{ backgroundColor: c.code }}
                >
                  {isSel && <Check className={`w-3 h-3 ${c.name === 'White' || c.name === 'Ivory' ? 'text-black' : 'text-white'}`} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability & Discount */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.inStock}
            onChange={(e) => onChange({ ...filters, inStock: e.target.checked, page: 1 })}
            className="accent-[#121212]"
          />
          <span>In Stock Only</span>
        </label>
        <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.minDiscount === 20}
            onChange={(e) => onChange({ ...filters, minDiscount: e.target.checked ? 20 : undefined, page: 1 })}
            className="accent-[#121212]"
          />
          <span>20% or More Discount</span>
        </label>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Product } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('ATELIER LOGANCEE');
  const [category, setCategory] = useState('Women');
  const [subcategory, setSubcategory] = useState('Dresses');
  const [price, setPrice] = useState(9999);
  const [originalPrice, setOriginalPrice] = useState(14999);
  const [stockQuantity, setStockQuantity] = useState(10);
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { showToast } = useToast();

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getProducts();
      setProducts(data);
    } catch {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenModal = (prod?: Product) => {
    if (prod) {
      setEditingId(prod.id);
      setName(prod.name);
      setBrand(prod.brand);
      setCategory(prod.category);
      setSubcategory(prod.subcategory);
      setPrice(prod.price);
      setOriginalPrice(prod.originalPrice);
      setStockQuantity(prod.stockQuantity);
      setDescription(prod.description);
      setSku(prod.sku);
      setImageUrl(prod.images[0] || '');
    } else {
      setEditingId(null);
      setName('');
      setBrand('ATELIER LOGANCEE');
      setCategory('Women');
      setSubcategory('Dresses');
      setPrice(9999);
      setOriginalPrice(14999);
      setStockQuantity(10);
      setDescription('');
      setSku(`LOG-${Math.floor(1000 + Math.random() * 9000)}`);
      setImageUrl('https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80');
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);

    try {
      if (editingId) {
        const updated = await adminService.updateProduct(editingId, {
          name,
          brand,
          category,
          subcategory,
          price,
          originalPrice,
          discountPercentage,
          stockQuantity,
          inStock: stockQuantity > 0,
          description,
          sku,
          images: [imageUrl],
        });
        setProducts(products.map(p => p.id === editingId ? updated : p));
        showToast('Product Updated', `${name} details saved successfully.`, 'success');
      } else {
        const created = await adminService.createProduct({
          name,
          brand,
          category,
          subcategory,
          price,
          originalPrice,
          discountPercentage,
          rating: 4.8,
          reviewCount: 0,
          description,
          specifications: { 'Material': '100% Premium Fiber', 'Fit': 'Standard Tailored' },
          colorOptions: [{ name: 'Black', code: '#121212' }],
          sizes: ['S', 'M', 'L'],
          images: [imageUrl],
          hoverImage: imageUrl,
          inStock: stockQuantity > 0,
          stockQuantity,
          sku,
        });
        setProducts([created, ...products]);
        showToast('Product Created', `New SKU #${created.sku} added to catalog.`, 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Error', 'Could not save product', 'error');
    }
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (confirm(`Are you sure you want to delete "${prodName}" from the marketplace?`)) {
      await adminService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      showToast('Product Deleted', `${prodName} removed.`, 'info');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">CATALOG MANAGEMENT</span>
          <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">PRODUCT INVENTORY ({products.length})</h1>
        </div>
        <Button onClick={() => handleOpenModal()} size="md" className="bg-white text-black hover:bg-neutral-200">
          <Plus className="w-4 h-4 mr-2" /> ADD NEW PRODUCT
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-neutral-900 border border-neutral-800 flex items-center gap-4">
        <Search className="w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search products by SKU, title, or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-xs text-white outline-none w-full placeholder:text-neutral-500 font-mono"
        />
      </div>

      {/* Products Table */}
      <div className="bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-black text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-neutral-800">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-10 h-12 object-cover bg-neutral-800 shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">{p.brand}</span>
                    <span className="font-bold text-white line-clamp-1">{p.name}</span>
                  </div>
                </td>
                <td className="p-4 font-mono font-semibold text-neutral-400">{p.sku}</td>
                <td className="p-4">{p.category} / {p.subcategory}</td>
                <td className="p-4 font-bold text-white">₹{p.price.toLocaleString()}</td>
                <td className="p-4">
                  {p.stockQuantity > 5 ? (
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold">IN STOCK ({p.stockQuantity})</span>
                  ) : p.stockQuantity > 0 ? (
                    <span className="px-2 py-0.5 bg-amber-950 text-amber-400 text-[10px] font-bold">LOW STOCK ({p.stockQuantity})</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-400 text-[10px] font-bold">OUT OF STOCK</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleOpenModal(p)} className="p-1.5 hover:text-white text-neutral-400">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 hover:text-rose-400 text-neutral-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Product Catalog Entry' : 'Create New Product'}>
        <form onSubmit={handleSaveProduct} className="space-y-4 text-xs text-[#121212]">
          <div>
            <label className="block font-bold uppercase tracking-wider mb-1">Product Title</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">SKU Code</label>
              <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Subcategory</label>
              <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Selling Price (₹)</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Original Price (₹)</label>
              <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider mb-1">Stock Qty</label>
              <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value))} className="w-full bg-neutral-50 border p-2.5" required />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider mb-1">Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-neutral-50 border p-2.5" required />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider mb-1">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-neutral-50 border p-2.5" />
          </div>

          <Button type="submit" className="w-full py-3.5 bg-black text-white">SAVE PRODUCT</Button>
        </form>
      </Modal>
    </div>
  );
};

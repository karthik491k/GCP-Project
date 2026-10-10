import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Inventory } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Boxes, Edit2 } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);

  const { showToast } = useToast();

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getInventory();
      setInventory(data);
    } catch {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleUpdateStock = async (invId: string) => {
    try {
      const updated = await adminService.updateStock(invId, newStockVal);
      setInventory(inventory.map(i => i.id === invId ? updated : i));
      setEditingId(null);
      showToast('Stock Updated', `Available stock updated to ${updated.availableStock}`, 'success');
    } catch {
      showToast('Error', 'Failed to update stock', 'error');
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">REAL-TIME WAREHOUSE MANAGEMENT</span>
        <h1 className="font-editorial text-3xl font-light tracking-tight mt-1">INVENTORY & STOCK CONTROL</h1>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-black text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-neutral-800">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Available Stock</th>
              <th className="p-4">Reserved Stock</th>
              <th className="p-4">Total Sold</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="p-4 font-mono font-bold text-white">{item.sku}</td>
                <td className="p-4 font-bold text-white">{item.productName}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4 font-bold text-white">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={newStockVal}
                        onChange={(e) => setNewStockVal(Number(e.target.value))}
                        className="w-16 bg-black border border-neutral-700 p-1 text-xs text-white"
                      />
                      <button onClick={() => handleUpdateStock(item.id)} className="bg-white text-black font-bold px-2 py-1 text-[10px]">SAVE</button>
                    </div>
                  ) : (
                    <span>{item.availableStock}</span>
                  )}
                </td>
                <td className="p-4 text-neutral-400">{item.reservedStock}</td>
                <td className="p-4 font-mono text-emerald-400">{item.totalSold}</td>
                <td className="p-4">
                  {item.status === 'IN_STOCK' && (
                    <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 font-bold text-[10px]">IN STOCK</span>
                  )}
                  {item.status === 'LOW_STOCK' && (
                    <span className="px-2.5 py-0.5 bg-amber-950 text-amber-400 font-bold text-[10px]">LOW STOCK</span>
                  )}
                  {item.status === 'OUT_OF_STOCK' && (
                    <span className="px-2.5 py-0.5 bg-rose-950 text-rose-400 font-bold text-[10px]">OUT OF STOCK</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => { setEditingId(item.id); setNewStockVal(item.availableStock); }}
                    className="text-xs text-neutral-400 hover:text-white underline font-mono"
                  >
                    Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

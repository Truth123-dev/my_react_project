


import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  LayoutDashboard, Package, ShoppingCart, Search, Plus, TrendingUp, DollarSign, Package2, AlertTriangle, CheckCircle, Clock, XCircle, ChevronRight, Trash2
} from 'lucide-react';

// ==========================================
// TypeScript Interfaces
// ==========================================
interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: string; // Simplified string type to avoid strict matching assignment errors
}

interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: string; // Simplified string type to avoid strict matching assignment errors
  items: string;
}

// ==========================================
// Mock Initial Data
// ==========================================
const initialProducts: Product[] = [
  { id: 'PROD-001', name: 'Premium Wireless Headphones', category: 'Electronics', stock: 45, price: 129.99, status: 'In Stock' },
  { id: 'PROD-002', name: 'Ergonomic Office Chair', category: 'Furniture', stock: 8, price: 249.99, status: 'Low Stock' },
  { id: 'PROD-003', name: 'Stainless Steel Water Bottle', category: 'Home & Kitchen', stock: 120, price: 24.99, status: 'In Stock' },
  { id: 'PROD-004', name: 'Ultra-wide Gaming Monitor', category: 'Electronics', stock: 0, price: 399.99, status: 'Out of Stock' },
  { id: 'PROD-005', name: 'Leather Running Shoes', category: 'Apparel', stock: 15, price: 89.99, status: 'In Stock' },
  { id: 'PROD-006', name: 'Mechanical Keyboard RGB', category: 'Electronics', stock: 5, price: 79.99, status: 'Low Stock' },
  { id: 'PROD-007', name: 'Cotton Crewneck T-Shirt', category: 'Apparel', stock: 200, price: 19.99, status: 'In Stock' },
];

const initialOrders: Order[] = [
  { id: 'ORD-5001', customerName: 'Sarah Jenkins', date: '2026-03-28', amount: 259.98, status: 'Delivered', items: '2x Premium Wireless Headphones' },
  { id: 'ORD-5002', customerName: 'Michael Chen', date: '2026-03-29', amount: 249.99, status: 'Pending', items: '1x Ergonomic Office Chair' },
  { id: 'ORD-5003', customerName: 'Emily Rodriguez', date: '2026-03-29', amount: 49.98, status: 'Shipped', items: '2x Stainless Steel Water Bottle' },
  { id: 'ORD-5004', customerName: 'David Kim', date: '2026-03-30', amount: 399.99, status: 'Pending', items: '1x Ultra-wide Gaming Monitor' },
  { id: 'ORD-5005', customerName: 'Jessica Taylor', date: '2026-03-30', amount: 89.99, status: 'Cancelled', items: '1x Leather Running Shoes' },
  { id: 'ORD-5006', customerName: 'Robert Johnson', date: '2026-03-31', amount: 159.98, status: 'Delivered', items: '2x Mechanical Keyboard RGB' },
];

const monthlySalesData = [
  { name: 'Jan', Sales: 4200, Revenue: 12400 },
  { name: 'Feb', Sales: 4800, Revenue: 14200 },
  { name: 'Mar', Sales: 5100, Revenue: 16100 },
  { name: 'Apr', Sales: 5900, Revenue: 18400 },
  { name: 'May', Sales: 6800, Revenue: 21000 },
  { name: 'Jun', Sales: 7200, Revenue: 23500 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

export default function EcommerceDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');
  
  // Primary shared data states
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Search & Filter States (Using standard string types to avoid union mismatch warnings)
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');

  // New Product Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Electronics',
    stock: 0,
    price: 0
  });

  // Dynamic Stock Level State Manager
  const updateStock = (id: string, amount: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + amount);
        let status = 'In Stock';
        if (newStock === 0) status = 'Out of Stock';
        else if (newStock < 10) status = 'Low Stock';
        return { ...p, stock: newStock, status };
      }
      return p;
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0) return;

    let status = 'In Stock';
    if (newProduct.stock === 0) status = 'Out of Stock';
    else if (newProduct.stock < 10) status = 'Low Stock';

    const productToAdd: Product = {
      id: `PROD-${Date.now().toString().slice(-3)}`,
      name: newProduct.name,
      category: newProduct.category,
      stock: newProduct.stock,
      price: newProduct.price,
      status
    };

    setProducts(prev => [productToAdd, ...prev]);
    setNewProduct({ name: '', category: 'Electronics', stock: 0, price: 0 });
    setIsAddingProduct(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Dynamic Order Status Manager
  const updateOrderStatus = (id: string, nextStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));
  };

  // ==========================================
  // Derived Metric Calculations
  // ==========================================
  const totalRevenue = useMemo(() => {
    return orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, order) => sum + order.amount, 0);
  }, [orders]);

  const activeOrdersCount = useMemo(() => {
    return orders.filter(o => o.status === 'Pending' || o.status === 'Shipped').length;
  }, [orders]);

  const lowStockCount = useMemo(() => {
    return products.filter(p => p.stock < 10).length;
  }, [products]);

  const avgOrderValue = useMemo(() => {
    const validOrders = orders.filter(o => o.status !== 'Cancelled');
    return validOrders.length ? (totalRevenue / validOrders.length) : 0;
  }, [orders, totalRevenue]);

  const categoryData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.keys(counts).map(name => ({
      name,
      value: counts[name]
    }));
  }, [products]);

  // ==========================================
  // Filter Logic Implementation
  // ==========================================
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(inventorySearch.toLowerCase()) || p.id.toLowerCase().includes(inventorySearch.toLowerCase());
      const matchesFilter = inventoryFilter === 'All' || p.status === inventoryFilter;
      return matchesSearch && matchesFilter;
    });
  }, [products, inventorySearch, inventoryFilter]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) || o.id.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
      return matchesSearch && matchesFilter;
    });
  }, [orders, orderSearch, orderFilter]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between z-10">
        <div>
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <Package2 className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">Apex Retail</span>
            </div>
          </div>
          
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'inventory'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Package className="h-4 w-4" />
              Inventory Management
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Order Operations
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
          Frontend Portal v1.2.0
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Sticky Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800">
            {activeTab === 'analytics' && 'Executive Analytics'}
            {activeTab === 'inventory' && 'Inventory Ledger'}
            {activeTab === 'orders' && 'Order Processing'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Environment: Demo
            </span>
          </div>
        </header>

        {/* Dynamic Inner Layout */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* TAB 1: EXECUTIVE ANALYTICS */}
          {activeTab === 'analytics' && (
            <>
              {/* Summary KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Net Revenue</p>
                    <h3 className="text-2xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Active Order Backlog</p>
                    <h3 className="text-2xl font-bold text-slate-900">{activeOrdersCount}</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Low Stock Triggers</p>
                    <h3 className="text-2xl font-bold text-slate-900">{lowStockCount}</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-violet-50 text-violet-600 rounded-lg">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Average Order Value</p>
                    <h3 className="text-2xl font-bold text-slate-900">${avgOrderValue.toFixed(2)}</h3>
                  </div>
                </div>
                
              </div>

              {/* Data Visualization Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Timeline Revenue/Sales Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
                  <div className="mb-4">
                    <h4 className="text-base font-semibold text-slate-900">Revenue & Sales Trends</h4>
                    <p className="text-xs text-slate-500">Historical performance scaling monthly averages</p>
                  </div>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Sales" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Breakdown (Pie) */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Inventory Distribution</h4>
                    <p className="text-xs text-slate-500">Breakdown of listings by primary taxonomy</p>
                  </div>
                  <div className="h-64 relative flex items-center justify-center">
                    {categoryData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <span className="text-slate-400 text-sm">No inventory recorded.</span>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
                    {categoryData.map((item, idx) => (
                      <div key={item.name} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <span className="text-slate-600 font-medium">{item.name} ({item.value})</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Status Board Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Out of Stock Alert Panel */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-base font-semibold text-slate-900">Critical Stock Warnings</h4>
                    <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-medium">Action Required</span>
                  </div>
                  <div className="space-y-3">
                    {products.filter(p => p.stock < 10).length === 0 ? (
                      <p className="text-slate-500 text-sm py-4 text-center">All product levels within optimal limits.</p>
                    ) : (
                      products.filter(p => p.stock < 10).slice(0, 4).map(product => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                         <div>
                            <p className="text-sm font-semibold text-slate-800">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.category} • SKU: {product.id}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              product.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {product.stock} units
                            </span>
                            <button 
                              onClick={() => { setActiveTab('inventory'); setInventoryFilter('Low Stock'); }} 
                              className="block text-indigo-600 text-xs mt-1.5 font-medium hover:underline"
                            >
                              Restock Ledger
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Processing/Recent Pending Orders Panel */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-base font-semibold text-slate-900">Awaiting Fulfillment</h4>
                    <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-medium">Pending Release</span>
                  </div>
                  <div className="space-y-3">
                    {orders.filter(o => o.status === 'Pending').length === 0 ? (
                      <p className="text-slate-500 text-sm py-4 text-center">No outstanding orders waiting fulfillment.</p>
                    ) : (
                      orders.filter(o => o.status === 'Pending').slice(0, 4).map(order => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-semibold text-slate-800">{order.customerName}</p>
                              <span className="text-xs text-slate-400">({order.id})</span>
                            </div>
                            <p className="text-xs text-slate-500 italic max-w-xs truncate">{order.items}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-800">${order.amount.toFixed(2)}</p>
                            <button 
                              onClick={() => { setActiveTab('orders'); setOrderFilter('Pending'); }} 
                              className="inline-flex items-center text-indigo-600 text-xs mt-1 font-medium hover:underline"
                            >
                              Update Status <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </>
          )}

          {/* TAB 2: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Toolbar & Filters */}
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-3">
                  <div className="relative w-full md:max-w-xs">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Search listings..."
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className="border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={inventoryFilter}
                    onChange={(e) => setInventoryFilter(e.target.value)}
                  >
                    <option value="All">All Levels</option>
                    <option value="In Stock">In Stock Only</option>
                    <option value="Low Stock">Low Stock Alert</option>
                    <option value="Out of Stock">Disrupted Stock (OOS)</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsAddingProduct(!isAddingProduct)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-150 shadow-sm"
                >
                  <Plus className="h-4 w-4" /> Create Product Record
                </button>
              </div>

              {/* Dynamic Add Product Module */}
              {isAddingProduct && (
                <div className="bg-slate-50 p-6 border-b border-slate-100 transition-all">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Register New E-Commerce Asset</h4>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Product Identity</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-slate-200 rounded-lg py-1.5 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white"
                        placeholder="e.g. Ergonomic Keyboard"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
                      <select
                        className="w-full border border-slate-200 rounded-lg py-1.5 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Apparel">Apparel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Initial Stock Count</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full border border-slate-200 rounded-lg py-1.5 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Unit Selling Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          className="w-full border border-slate-200 rounded-lg py-1.5 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Commit
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6">ID & Specifications</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Evaluation Unit Price</th>
                      <th className="py-4 px-6">Stock Status</th>
                      <th className="py-4 px-6">Inventory Volume</th>
                      <th className="py-4 px-6 text-right">Ledger Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No stock inventory elements matched the current queries.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-semibold text-slate-800 block">{product.name}</span>
                            <span className="text-xs text-slate-400 font-mono">{product.id}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-600">{product.category}</td>
                          <td className="py-4 px-6 text-slate-900 font-medium">${product.price.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              product.status === 'In Stock' && 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            } ${
                              product.status === 'Low Stock' && 'bg-amber-50 text-amber-700 border border-amber-200'
                            } ${
                              product.status === 'Out of Stock' && 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                product.status === 'In Stock' && 'bg-emerald-500'
                              } ${
                                product.status === 'Low Stock' && 'bg-amber-500'
                              } ${
                                product.status === 'Out of Stock' && 'bg-rose-500'
                              }`} />
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => updateStock(product.id, -1)}
                                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 transition-colors"
                              >
                                -
                              </button>
                              <span className="font-semibold text-slate-800 w-8 text-center">{product.stock}</span>
                              <button 
                                onClick={() => updateStock(product.id, 1)}
                                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-slate-400 hover:text-rose-600 p-1.5 rounded hover:bg-rose-50 transition-colors"
                              title="Delete Item Record"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: ORDER OPERATIONS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Toolbar & Filters */}
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:max-w-xs">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                    placeholder="Search orders..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        orderFilter === status
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6">Transaction ID</th>
                      <th className="py-4 px-6">Customer Identity</th>
                      <th className="py-4 px-6">Order Details</th>
                      <th className="py-4 px-6">Order Date</th>
                      <th className="py-4 px-6">Invoice value</th>
                      <th className="py-4 px-6">Status Marker</th>
                      <th className="py-4 px-6 text-right">Lifecycle Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No transactions match your queries.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 font-mono text-xs font-bold text-indigo-600">
                            {order.id}
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-slate-800 block">{order.customerName}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-500 italic max-w-xs truncate" title={order.items}>
                            {order.items}
                          </td>
                          <td className="py-4 px-6 text-slate-500 font-mono text-xs">{order.date}</td>
                          <td className="py-4 px-6 font-medium text-slate-900">${order.amount.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                              order.status === 'Delivered' && 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            } ${
                              order.status === 'Pending' && 'bg-amber-50 text-amber-700 border-amber-100'
                            } ${
                              order.status === 'Shipped' && 'bg-blue-50 text-blue-700 border-blue-100'
                            } ${
                              order.status === 'Cancelled' && 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                              {order.status === 'Delivered' && <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
                              {order.status === 'Pending' && <Clock className="h-3.5 w-3.5 text-amber-500" />}
                              {order.status === 'Shipped' && <Package className="h-3.5 w-3.5 text-blue-500" />}
                              {order.status === 'Cancelled' && <XCircle className="h-3.5 w-3.5 text-rose-500" />}
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
                              {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                                <button
                                  key={st}
                                  onClick={() => updateOrderStatus(order.id, st)}
                                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    order.status === st
                                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                      : 'text-slate-400 hover:text-slate-700'
                                  }`}
                                  title={`Mark as ${st}`}
                                >
                                  {st[0]}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}


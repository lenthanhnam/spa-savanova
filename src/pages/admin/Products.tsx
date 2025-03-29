
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  PackagePlus, 
  ArrowUpDown, 
  Edit, 
  Trash2,
  Info,
  ShoppingBag,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Mock data for products
const mockProducts = [
  {
    id: 'P001',
    name: 'Tinh dầu massage Oải Hương',
    category: 'oils',
    price: 250000,
    stock: 45,
    sales: 23,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2787',
    inStock: true
  },
  {
    id: 'P002',
    name: 'Bộ đá nóng massage',
    category: 'tools',
    price: 750000,
    stock: 12,
    sales: 8,
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044',
    inStock: true
  },
  {
    id: 'P003',
    name: 'Tinh dầu Bạc Hà',
    category: 'oils',
    price: 220000,
    stock: 38,
    sales: 15,
    imageUrl: 'https://images.unsplash.com/photo-1547793548-7a0e7dfdb24f?q=80&w=2070',
    inStock: true
  },
  {
    id: 'P004',
    name: 'Kem dưỡng da mặt Aloe Vera',
    category: 'skincare',
    price: 350000,
    stock: 27,
    sales: 34,
    imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2127',
    inStock: true
  },
  {
    id: 'P005',
    name: 'Mặt nạ Collagen',
    category: 'skincare',
    price: 80000,
    stock: 0,
    sales: 45,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070',
    inStock: false
  }
];

const categories = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'oils', name: 'Tinh dầu' },
  { id: 'skincare', name: 'Chăm sóc da' },
  { id: 'tools', name: 'Dụng cụ spa' },
  { id: 'haircare', name: 'Chăm sóc tóc' },
  { id: 'makeup', name: 'Trang điểm' },
  { id: 'candles', name: 'Nến thơm' },
  { id: 'accessories', name: 'Phụ kiện' }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [products, setProducts] = useState(mockProducts);
  const { toast } = useToast();

  const filteredProducts = products.filter(
    product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    }
  );

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Sản phẩm đã được xóa",
      description: `Sản phẩm ${id} đã được xóa thành công.`,
    });
  };

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const totalRevenue = products.reduce((sum, product) => sum + (product.sales * product.price), 0);
  const outOfStockCount = products.filter(product => product.stock === 0).length;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Quản lý sản phẩm</h1>
          <Button className="bg-spa-800 hover:bg-spa-700">
            <PackagePlus size={16} className="mr-2" />
            Thêm sản phẩm mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Tổng sản phẩm</p>
              <p className="text-3xl font-bold mt-1">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Tổng tồn kho</p>
              <p className="text-3xl font-bold mt-1">{totalStock}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Tổng đã bán</p>
              <p className="text-3xl font-bold mt-1 text-green-600">{totalSales}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Hết hàng</p>
              <p className="text-3xl font-bold mt-1 text-red-600">{outOfStockCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Tìm kiếm sản phẩm</CardTitle>
            <CardDescription>Tìm kiếm theo tên hoặc mã sản phẩm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  type="text" 
                  placeholder="Tìm kiếm sản phẩm..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <select 
                  className="w-full p-2 border rounded-md"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <CardDescription>
              {filteredProducts.length} sản phẩm được tìm thấy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Mã</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Sản phẩm
                        <ArrowUpDown size={16} className="ml-2" />
                      </div>
                    </TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá bán</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Tồn kho
                        <ArrowUpDown size={16} className="ml-2" />
                      </div>
                    </TableHead>
                    <TableHead>Đã bán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/products/${product.id}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye size={14} className="mr-1" />
                              Xem
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" onClick={() => console.log('Edit', product.id)}>
                            <Edit size={14} className="mr-1" />
                            Sửa
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:border-red-200"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Products;

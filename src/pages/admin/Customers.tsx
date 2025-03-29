
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  UserPlus, 
  ArrowUpDown, 
  Mail, 
  Phone, 
  Edit, 
  Trash2
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Mock data for customers
const mockCustomers = [
  { 
    id: 1, 
    name: 'Nguyễn Thị Anh', 
    email: 'anh.nguyen@example.com', 
    phone: '0901234567', 
    totalSpent: 3750000, 
    lastVisit: '15/04/2023', 
    status: 'active' 
  },
  { 
    id: 2, 
    name: 'Trần Văn Minh', 
    email: 'minh.tran@example.com', 
    phone: '0912345678', 
    totalSpent: 2100000, 
    lastVisit: '02/05/2023', 
    status: 'active' 
  },
  { 
    id: 3, 
    name: 'Lê Thị Hương', 
    email: 'huong.le@example.com', 
    phone: '0923456789', 
    totalSpent: 4250000, 
    lastVisit: '28/03/2023', 
    status: 'active' 
  },
  { 
    id: 4, 
    name: 'Phạm Văn Đức', 
    email: 'duc.pham@example.com', 
    phone: '0934567890', 
    totalSpent: 1850000, 
    lastVisit: '10/04/2023', 
    status: 'inactive' 
  },
  { 
    id: 5, 
    name: 'Hoàng Thị Lan', 
    email: 'lan.hoang@example.com', 
    phone: '0945678901', 
    totalSpent: 5200000, 
    lastVisit: '05/05/2023', 
    status: 'active' 
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState(mockCustomers);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(
    customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast({
      title: "Khách hàng đã được xóa",
      description: "Thông tin khách hàng đã được xóa thành công.",
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Quản lý khách hàng</h1>
          <Button className="bg-spa-800 hover:bg-spa-700">
            <UserPlus size={16} className="mr-2" />
            Thêm khách hàng
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Tìm kiếm khách hàng</CardTitle>
            <CardDescription>Tìm kiếm theo tên, email hoặc số điện thoại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Tìm kiếm khách hàng..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách khách hàng</CardTitle>
            <CardDescription>
              {filteredCustomers.length} khách hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        Tên khách hàng
                        <ArrowUpDown size={16} className="ml-2" />
                      </div>
                    </TableHead>
                    <TableHead>Thông tin liên hệ</TableHead>
                    <TableHead>Chi tiêu</TableHead>
                    <TableHead>Lần ghé gần nhất</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail size={14} className="mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone size={14} className="mr-2" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(customer.totalSpent)}
                      </TableCell>
                      <TableCell>{customer.lastVisit}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => console.log('Edit', customer.id)}>
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:border-red-200"
                            onClick={() => handleDelete(customer.id)}
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

export default Customers;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  CalendarPlus, 
  ArrowUpDown,
  Clock,
  User,
  Phone,
  Edit, 
  Trash2
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

// Mock data for appointments
const mockAppointments = [
  { 
    id: 'A001', 
    customer: 'Nguyễn Thị Linh', 
    phone: '0901234567',
    service: 'Massage Toàn Thân', 
    date: '28/05/2023', 
    time: '10:00 AM',
    duration: '90 phút',
    price: 750000,
    status: 'confirmed' 
  },
  { 
    id: 'A002', 
    customer: 'Trần Văn Hoàng', 
    phone: '0912345678',
    service: 'Chăm Sóc Da Mặt', 
    date: '28/05/2023', 
    time: '2:30 PM',
    duration: '60 phút',
    price: 550000,
    status: 'pending' 
  },
  { 
    id: 'A003', 
    customer: 'Phạm Thị Hoa', 
    phone: '0923456789',
    service: 'Tắm Thảo Dược', 
    date: '29/05/2023', 
    time: '11:15 AM',
    duration: '120 phút',
    price: 950000,
    status: 'confirmed' 
  },
  { 
    id: 'A004', 
    customer: 'Lê Minh Quân', 
    phone: '0934567890',
    service: 'Liệu Pháp Đá Nóng', 
    date: '29/05/2023', 
    time: '4:00 PM',
    duration: '75 phút',
    price: 850000,
    status: 'completed' 
  },
  { 
    id: 'A005', 
    customer: 'Hoàng Thị Mai', 
    phone: '0945678901',
    service: 'Massage Chân & Đầu', 
    date: '30/05/2023', 
    time: '3:30 PM',
    duration: '45 phút',
    price: 450000,
    status: 'cancelled' 
  },
];

const statusColors = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xác nhận' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đã xác nhận' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoàn thành' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã hủy' },
};

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [appointments, setAppointments] = useState(mockAppointments);
  const { toast } = useToast();

  const filteredAppointments = appointments.filter(
    appointment => {
      const matchesSearch = 
        appointment.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.phone.includes(searchQuery) ||
        appointment.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
    
    toast({
      title: "Trạng thái đã được cập nhật",
      description: `Lịch hẹn ${id} đã được cập nhật thành ${statusColors[newStatus as keyof typeof statusColors].label}.`,
    });
  };

  const handleDelete = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast({
      title: "Lịch hẹn đã được xóa",
      description: `Lịch hẹn ${id} đã được xóa thành công.`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Quản lý lịch hẹn</h1>
          <Button className="bg-spa-800 hover:bg-spa-700">
            <CalendarPlus size={16} className="mr-2" />
            Tạo lịch hẹn mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Tổng lịch hẹn</p>
              <p className="text-3xl font-bold mt-1">{appointments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Chờ xác nhận</p>
              <p className="text-3xl font-bold mt-1 text-yellow-600">
                {appointments.filter(a => a.status === 'pending').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Đã xác nhận</p>
              <p className="text-3xl font-bold mt-1 text-blue-600">
                {appointments.filter(a => a.status === 'confirmed').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Hoàn thành</p>
              <p className="text-3xl font-bold mt-1 text-green-600">
                {appointments.filter(a => a.status === 'completed').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">Đã hủy</p>
              <p className="text-3xl font-bold mt-1 text-red-600">
                {appointments.filter(a => a.status === 'cancelled').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Tìm kiếm lịch hẹn</CardTitle>
            <CardDescription>Tìm kiếm theo tên khách hàng, dịch vụ hoặc mã lịch hẹn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  type="text" 
                  placeholder="Tìm kiếm lịch hẹn..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <select 
                  className="w-full p-2 border rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách lịch hẹn</CardTitle>
            <CardDescription>
              {filteredAppointments.length} lịch hẹn được tìm thấy
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
                        Khách hàng
                        <ArrowUpDown size={16} className="ml-2" />
                      </div>
                    </TableHead>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Thời gian
                        <ArrowUpDown size={16} className="ml-2" />
                      </div>
                    </TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <User size={14} className="mr-2" />
                            {appointment.customer}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone size={14} className="mr-2" />
                            {appointment.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{appointment.service}</div>
                          <div className="text-sm text-gray-500">{appointment.duration}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-2" />
                            {appointment.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(appointment.price)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          statusColors[appointment.status as keyof typeof statusColors].bg
                        } ${
                          statusColors[appointment.status as keyof typeof statusColors].text
                        }`}>
                          {statusColors[appointment.status as keyof typeof statusColors].label}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit size={14} className="mr-1" />
                                Trạng thái
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'pending')}>
                                <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                Chờ xác nhận
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}>
                                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                                Đã xác nhận
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'completed')}>
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                Hoàn thành
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}>
                                <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                                Đã hủy
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:border-red-200"
                            onClick={() => handleDelete(appointment.id)}
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

export default Appointments;

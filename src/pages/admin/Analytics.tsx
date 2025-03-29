
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart3, PieChart, TrendingUp, DollarSign, Users, ShoppingBag, Clock } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Mock data for revenue chart
const revenueData = [
  { name: 'T1', dịchVụ: 12500000, sảnPhẩm: 4700000, total: 17200000 },
  { name: 'T2', dịchVụ: 15000000, sảnPhẩm: 5200000, total: 20200000 },
  { name: 'T3', dịchVụ: 14000000, sảnPhẩm: 6100000, total: 20100000 },
  { name: 'T4', dịchVụ: 16500000, sảnPhẩm: 6800000, total: 23300000 },
  { name: 'T5', dịchVụ: 17800000, sảnPhẩm: 7200000, total: 25000000 },
  { name: 'T6', dịchVụ: 19500000, sảnPhẩm: 8100000, total: 27600000 },
];

// Mock data for service categories
const serviceData = [
  { name: 'Massage', value: 35 },
  { name: 'Chăm sóc da', value: 25 },
  { name: 'Tắm thảo dược', value: 15 },
  { name: 'Liệu pháp đá nóng', value: 10 },
  { name: 'Khác', value: 15 },
];

// Mock data for product categories
const productData = [
  { name: 'Tinh dầu', value: 30 },
  { name: 'Chăm sóc da', value: 40 },
  { name: 'Dụng cụ spa', value: 10 },
  { name: 'Nến thơm', value: 15 },
  { name: 'Khác', value: 5 },
];

// Mock data for customer analytics
const customerData = [
  { name: 'T1', newCustomers: 48, returningCustomers: 25 },
  { name: 'T2', newCustomers: 52, returningCustomers: 28 },
  { name: 'T3', newCustomers: 55, returningCustomers: 32 },
  { name: 'T4', newCustomers: 60, returningCustomers: 35 },
  { name: 'T5', newCustomers: 58, returningCustomers: 40 },
  { name: 'T6', newCustomers: 70, returningCustomers: 45 },
];

// Mock data for appointment times
const appointmentTimeData = [
  { name: '9-11', count: 25 },
  { name: '11-13', count: 40 },
  { name: '13-15', count: 30 },
  { name: '15-17', count: 45 },
  { name: '17-19', count: 35 },
  { name: '19-21', count: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [dateRange, setDateRange] = useState('6months');

  // Fake calculations for overall metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.total, 0);
  const lastMonthRevenue = revenueData[revenueData.length - 1].total;
  const previousMonthRevenue = revenueData[revenueData.length - 2].total;
  const revenueGrowth = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

  const totalCustomers = customerData.reduce((sum, item) => sum + item.newCustomers + item.returningCustomers, 0);
  const totalServices = serviceData.reduce((sum, item) => sum + item.value, 0);
  const totalProducts = productData.reduce((sum, item) => sum + item.value, 0);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Báo cáo & Phân tích</h1>
          <div className="flex items-center space-x-3">
            <select 
              className="p-2 border rounded-md"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="30days">30 ngày qua</option>
              <option value="3months">3 tháng</option>
              <option value="6months">6 tháng</option>
              <option value="1year">1 năm</option>
              <option value="alltime">Tất cả</option>
            </select>
            <Button variant="outline">
              <Calendar size={16} className="mr-2" />
              Tùy chỉnh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng doanh thu</p>
                  <p className="text-2xl font-bold mt-1">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${revenueGrowth >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  <DollarSign size={20} className={revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'} />
                </div>
              </div>
              <div className={`mt-2 text-sm ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp size={14} className="inline mr-1" />
                {revenueGrowth.toFixed(1)}% so với tháng trước
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                  <p className="text-2xl font-bold mt-1">{totalCustomers}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Users size={20} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">
                <TrendingUp size={14} className="inline mr-1" />
                {Math.round((customerData[customerData.length - 1].newCustomers / 
                    (customerData[customerData.length - 2].newCustomers)) * 100 - 100)}% khách hàng mới
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Lượt dịch vụ</p>
                  <p className="text-2xl font-bold mt-1">{totalServices * 2}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <PieChart size={20} className="text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-purple-600">
                <TrendingUp size={14} className="inline mr-1" />
                12.3% so với tháng trước
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Sản phẩm đã bán</p>
                  <p className="text-2xl font-bold mt-1">{totalProducts * 3}</p>
                </div>
                <div className="p-3 rounded-full bg-amber-100">
                  <ShoppingBag size={20} className="text-amber-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-amber-600">
                <TrendingUp size={14} className="inline mr-1" />
                8.7% so với tháng trước
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="customers">Khách hàng</TabsTrigger>
            <TabsTrigger value="services">Dịch vụ & Sản phẩm</TabsTrigger>
            <TabsTrigger value="appointments">Lịch hẹn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Phân tích doanh thu</CardTitle>
                <CardDescription>Tổng doanh thu theo tháng từ dịch vụ và sản phẩm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => 
                          new Intl.NumberFormat('vi-VN', { 
                            notation: 'compact',
                            compactDisplay: 'short',
                            maximumFractionDigits: 1
                          }).format(value)
                        }
                      />
                      <Tooltip 
                        formatter={(value) => 
                          new Intl.NumberFormat('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND' 
                          }).format(value as number)
                        }
                      />
                      <Legend />
                      <Bar dataKey="dịchVụ" name="Dịch vụ" fill="#8884d8" />
                      <Bar dataKey="sảnPhẩm" name="Sản phẩm" fill="#82ca9d" />
                      <Bar dataKey="total" name="Tổng" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Số lượng khách hàng</CardTitle>
                  <CardDescription>Khách hàng mới và khách hàng quay lại theo tháng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={customerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="newCustomers" name="Khách hàng mới" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="returningCustomers" name="Khách hàng quay lại" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Phân tích độ hài lòng</CardTitle>
                  <CardDescription>Đánh giá của khách hàng về dịch vụ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-spa-800">4.8</div>
                      <div className="flex text-amber-500 my-2">
                        {'★★★★★'.split('').map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                      </div>
                      <div className="text-gray-500">Dựa trên 248 đánh giá</div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <span className="w-12">5 sao</span>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="w-12 text-right">75%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-12">4 sao</span>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: '18%' }}></div>
                          </div>
                          <span className="w-12 text-right">18%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-12">3 sao</span>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: '5%' }}></div>
                          </div>
                          <span className="w-12 text-right">5%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-12">2 sao</span>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: '1%' }}></div>
                          </div>
                          <span className="w-12 text-right">1%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-12">1 sao</span>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: '1%' }}></div>
                          </div>
                          <span className="w-12 text-right">1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phân bổ dịch vụ</CardTitle>
                  <CardDescription>Phân tích theo loại dịch vụ được đặt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={serviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {serviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Phân bổ sản phẩm</CardTitle>
                  <CardDescription>Phân tích theo danh mục sản phẩm đã bán</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Phân tích thời gian đặt lịch</CardTitle>
                <CardDescription>Số lượng lịch hẹn theo khung giờ trong ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Số lượng lịch hẹn" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Giờ cao điểm</div>
                        <div className="text-xl font-bold">15:00 - 17:00</div>
                      </div>
                      <Clock className="text-blue-500" size={24} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Thứ đông nhất</div>
                        <div className="text-xl font-bold">Thứ 7</div>
                      </div>
                      <Calendar className="text-blue-500" size={24} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Tỉ lệ hoàn thành</div>
                        <div className="text-xl font-bold">93%</div>
                      </div>
                      <BarChart3 className="text-blue-500" size={24} />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Analytics;

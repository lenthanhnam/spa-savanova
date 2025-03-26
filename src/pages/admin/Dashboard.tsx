
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ShoppingBag, 
  Settings, 
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { title: 'Customers', icon: Users, href: '/admin/customers' },
  { title: 'Appointments', icon: Calendar, href: '/admin/appointments' },
  { title: 'Products', icon: ShoppingBag, href: '/admin/products' },
  { title: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { title: 'Settings', icon: Settings, href: '/admin/settings' },
];

// Mock data for dashboard
const recentAppointments = [
  { id: 1, client: 'Emma Johnson', service: 'Deep Tissue Massage', date: 'Oct 15, 2023', status: 'Completed' },
  { id: 2, client: 'Michael Brown', service: 'Facial Treatment', date: 'Oct 16, 2023', status: 'Pending' },
  { id: 3, client: 'Sophia Williams', service: 'Aromatherapy', date: 'Oct 17, 2023', status: 'Confirmed' },
  { id: 4, client: 'James Davis', service: 'Hot Stone Massage', date: 'Oct 18, 2023', status: 'Cancelled' },
];

const stats = [
  { title: 'Total Customers', value: '1,245', change: '+12.5%' },
  { title: 'Monthly Revenue', value: '$28,650', change: '+8.2%' },
  { title: 'Appointments', value: '156', change: '+24.3%' },
  { title: 'Product Sales', value: '$12,430', change: '+16.8%' },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <motion.aside
          initial={{ width: sidebarOpen ? '250px' : '0px', opacity: sidebarOpen ? 1 : 0 }}
          animate={{ width: sidebarOpen ? '250px' : '0px', opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-y-0 bg-spa-800 text-white overflow-hidden z-20`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold">SerenitySpa Admin</h1>
              <button onClick={toggleSidebar} className="lg:hidden">
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-spa-700 transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full text-white border-white hover:bg-spa-700"
              >
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </Button>
            </div>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className={`transition-all duration-300 flex-1 ${sidebarOpen ? 'ml-[250px]' : 'ml-0'}`}>
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="p-6">
            <h1 className="text-2xl font-serif font-bold mb-6">Dashboard Overview</h1>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-green-500 mt-1">{stat.change} from last month</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Recent appointments */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Overview of the latest spa appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.client}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Service</CardTitle>
                  <CardDescription>Create a new spa service</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-spa-800 hover:bg-spa-700">Create Service</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Add a product to the store</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-spa-800 hover:bg-spa-700">Add Product</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Manage Bookings</CardTitle>
                  <CardDescription>View and manage appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-spa-800 hover:bg-spa-700">View All</Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
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

  const handleBackToSite = () => {
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.href
                      ? 'bg-spa-700 text-white'
                      : 'hover:bg-spa-700 text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <Button 
                variant="outline" 
                className="w-full text-white border-white hover:bg-spa-700 flex items-center"
                onClick={handleBackToSite}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Site
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full text-white border-white hover:bg-spa-700 flex items-center"
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

          {/* Content */}
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;


import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";
import { VouchersProvider } from "@/hooks/useVouchers";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import BookingHistory from "./pages/BookingHistory";
import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import RateService from "./pages/RateService";
import Profile from "./pages/Profile";
import MyVouchers from "./pages/MyVouchers";
import SuperVouchers from "./pages/SuperVouchers";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminAppointments from "./pages/admin/Appointments";
import AdminProducts from "./pages/admin/Products";
import AdminBranches from "./pages/admin/Branches";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Create React Query client
const queryClient = new QueryClient();

// Layout component for pages with header and footer
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-16">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <VouchersProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Admin Routes */}
                    <Route 
                      path="/admin/dashboard" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/customers" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminCustomers />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/appointments" 
                      element={
                        <ProtectedRoute allowedRoles={['admin', 'manager']}>
                          <AdminAppointments />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/products" 
                      element={
                        <ProtectedRoute allowedRoles={['admin', 'manager']}>
                          <AdminProducts />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/branches" 
                      element={
                        <ProtectedRoute allowedRoles={['admin', 'manager']}>
                          <AdminBranches />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/analytics" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminAnalytics />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/settings" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminSettings />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Protected Routes with Header & Footer */}
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <MainLayout><Profile /></MainLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/booking-history" 
                      element={
                        <ProtectedRoute>
                          <MainLayout><BookingHistory /></MainLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/rate-service/:id" 
                      element={
                        <ProtectedRoute>
                          <MainLayout><RateService /></MainLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <MainLayout><Checkout /></MainLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/order-success" 
                      element={
                        <ProtectedRoute>
                          <MainLayout><OrderSuccess /></MainLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/my-vouchers" 
                      element={
                        <ProtectedRoute>
                          <MainLayout><MyVouchers /></MainLayout>
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* Public Routes with Header & Footer */}
                    <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                    <Route path="/signin" element={<MainLayout><SignIn /></MainLayout>} />
                    <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
                    <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                    <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
                    <Route path="/services/:slug" element={<MainLayout><ServiceDetail /></MainLayout>} />
                    <Route path="/booking" element={<MainLayout><Booking /></MainLayout>} />
                    <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                    <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
                    <Route path="/products/:slug" element={<MainLayout><ProductDetail /></MainLayout>} />
                    <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                    <Route path="/super-vouchers" element={<MainLayout><SuperVouchers /></MainLayout>} />
                    
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
                  </Routes>
                </AnimatePresence>
              </TooltipProvider>
            </VouchersProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

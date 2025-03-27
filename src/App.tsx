
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/hooks/useCart";

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

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";

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
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                
                {/* Public Routes with Header & Footer */}
                <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                <Route path="/signin" element={<MainLayout><SignIn /></MainLayout>} />
                <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
                <Route path="/services/:slug" element={<MainLayout><ServiceDetail /></MainLayout>} />
                <Route path="/booking" element={<MainLayout><Booking /></MainLayout>} />
                <Route path="/booking-history" element={<MainLayout><BookingHistory /></MainLayout>} />
                <Route path="/rate-service/:id" element={<MainLayout><RateService /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
                <Route path="/products/:slug" element={<MainLayout><ProductDetail /></MainLayout>} />
                <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
                <Route path="/order-success" element={<MainLayout><OrderSuccess /></MainLayout>} />
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

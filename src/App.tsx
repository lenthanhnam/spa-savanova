
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Create React Query client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Add more routes as they are developed */}
                  {/* <Route path="/services/:serviceId" element={<ServiceDetail />} /> */}
                  {/* <Route path="/profile" element={<Profile />} /> */}
                  
                  {/* Admin Routes */}
                  {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
                  
                  {/* Manager Routes */}
                  {/* <Route path="/manager/dashboard" element={<ManagerDashboard />} /> */}
                  
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

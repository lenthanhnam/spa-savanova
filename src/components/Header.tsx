
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Calendar, 
  Home,
  Info,
  Sparkles,
  Phone,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from '@/components/CartIcon';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4 mr-2" /> },
    { name: 'Services', path: '/services', icon: <Sparkles className="w-4 h-4 mr-2" /> },
    { name: 'Products', path: '/products', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
    { name: 'Book Now', path: '/booking', icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white/80 backdrop-blur shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold bg-gradient-to-r from-spa-800 to-spa-600 bg-clip-text text-transparent">SerenitySpa</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center text-sm spa-transition 
                ${location.pathname === link.path 
                  ? 'text-spa-800 font-medium' 
                  : 'text-spa-600 hover:text-spa-800'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <CartIcon />
          <Link to="/signin">
            <Button variant="ghost" className="text-spa-800 hover:text-spa-900 hover:bg-spa-100">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-spa-800 hover:bg-spa-700 text-white">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button & Cart Icon */}
        <div className="md:hidden flex items-center space-x-4">
          <CartIcon />
          <button 
            className="text-spa-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t mt-2"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-md spa-transition
                    ${location.pathname === link.path 
                      ? 'bg-spa-100 text-spa-800 font-medium' 
                      : 'text-spa-600 hover:bg-spa-50 hover:text-spa-800'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col space-y-2">
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-spa-800 hover:bg-spa-700">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

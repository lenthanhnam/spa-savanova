
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-spa-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-2xl font-serif font-bold">SerenitySpa</h3>
            </Link>
            <p className="text-spa-100 mb-6 max-w-xs">
              Experience the perfect blend of traditional techniques and modern innovations for ultimate relaxation and rejuvenation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-spa-100 hover:text-white spa-transition p-2 rounded-full bg-spa-800 hover:bg-spa-700">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-spa-100 hover:text-white spa-transition p-2 rounded-full bg-spa-800 hover:bg-spa-700">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-spa-100 hover:text-white spa-transition p-2 rounded-full bg-spa-800 hover:bg-spa-700">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-spa-100 hover:text-white spa-transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-spa-100 hover:text-white spa-transition">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-spa-100 hover:text-white spa-transition">Services</Link>
              </li>
              <li>
                <Link to="/booking" className="text-spa-100 hover:text-white spa-transition">Book Appointment</Link>
              </li>
              <li>
                <Link to="/ai-consultation" className="text-spa-100 hover:text-white spa-transition">AI Consultation</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/massage" className="text-spa-100 hover:text-white spa-transition">Massage Therapy</Link>
              </li>
              <li>
                <Link to="/services/facial" className="text-spa-100 hover:text-white spa-transition">Facial Treatments</Link>
              </li>
              <li>
                <Link to="/services/body" className="text-spa-100 hover:text-white spa-transition">Body Treatments</Link>
              </li>
              <li>
                <Link to="/services/packages" className="text-spa-100 hover:text-white spa-transition">Spa Packages</Link>
              </li>
              <li>
                <Link to="/services/special" className="text-spa-100 hover:text-white spa-transition">Seasonal Specials</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-spa-300 mt-0.5" />
                <span className="text-spa-100">123 Tranquility Lane, Serenity City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-spa-300" />
                <span className="text-spa-100">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-spa-300" />
                <span className="text-spa-100">contact@serenityspa.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-spa-800 text-center text-spa-300 text-sm">
          <p>&copy; {currentYear} SerenitySpa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

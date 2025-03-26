
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  duration: string;
  slug: string;
  category?: string; // Adding the category property as optional
}

const ServiceCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  price, 
  duration, 
  slug 
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-spa-800 font-medium text-sm shadow-sm">
          {price}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-spa-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <Link to={`/services/${slug}`}>
          <Button variant="outline" className="w-full justify-between border-spa-200 text-spa-800 hover:bg-spa-50">
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;


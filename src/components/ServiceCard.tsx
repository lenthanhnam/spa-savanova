
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  duration: string;
  slug: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  imageUrl, 
  price, 
  duration,
  slug 
}: ServiceCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md spa-transition h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center spa-transition group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-serif font-medium mb-2 text-spa-900">{title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{duration}</span>
          <span className="font-medium text-spa-800">{price}</span>
        </div>
        
        <Link 
          to={`/services/${slug}`}
          className="inline-flex items-center text-spa-800 hover:text-spa-700 font-medium text-sm group"
        >
          Learn more 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 spa-transition" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

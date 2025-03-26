
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const TestimonialCard = ({ name, role, content, avatar, rating }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md spa-transition"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-spa-100"
        />
        <div>
          <h4 className="font-medium text-spa-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 italic">{content}</p>
    </motion.div>
  );
};

export default TestimonialCard;

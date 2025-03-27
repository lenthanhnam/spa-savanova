
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  slug: string;
  inStock: boolean;
}

interface ProductCardComponentProps extends ProductCardProps {
  onAddToCart: (product: ProductCardProps & { quantity: number }) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  imageUrl, 
  price, 
  category,
  slug,
  inStock,
  onAddToCart
}: ProductCardComponentProps) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    onAddToCart({
      id, 
      name, 
      description, 
      imageUrl, 
      price, 
      category,
      slug,
      inStock,
      quantity: 1
    });
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${name} đã được thêm vào giỏ hàng của bạn.`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-spa-800 font-medium text-sm shadow-sm">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </div>
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-md">Hết hàng</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-spa-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex gap-2">
          <Link to={`/products/${slug}`} className="flex-1">
            <Button variant="outline" className="w-full border-spa-200 text-spa-800 hover:bg-spa-50">
              Chi tiết
            </Button>
          </Link>
          <Button 
            className="bg-spa-800 hover:bg-spa-700 text-white" 
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;


import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="w-6 h-6 text-spa-800" />
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-spa-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
        >
          {totalItems}
        </motion.div>
      )}
    </Link>
  );
};

export default CartIcon;

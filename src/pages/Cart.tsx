
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setIsRemoving(null);
    }, 300);
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      clearCart();
      toast({
        title: "Giỏ hàng đã được xóa",
        description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng.",
        duration: 3000,
      });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold text-spa-900 mb-6"
            >
              Giỏ hàng của bạn
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              {totalItems > 0 
                ? `Bạn có ${totalItems} sản phẩm trong giỏ hàng.` 
                : 'Giỏ hàng của bạn đang trống.'}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-serif font-bold text-spa-900">Sản phẩm ({totalItems})</h2>
                  </div>
                  
                  <ul className="divide-y">
                    {cart.map(item => (
                      <motion.li 
                        key={item.id}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isRemoving === item.id ? 0 : 1, height: isRemoving === item.id ? 0 : 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="p-6 flex flex-col sm:flex-row items-center gap-4"
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-spa-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-500 hover:text-spa-800"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 border-x">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-500 hover:text-spa-800"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="font-medium text-spa-900">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="p-6 bg-gray-50 flex justify-between">
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={handleClearCart}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa giỏ hàng
                    </Button>
                    <Link to="/products">
                      <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Tiếp tục mua hàng
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-serif font-bold text-spa-900">Tóm tắt đơn hàng</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span>Miễn phí</span>
                    </div>
                    
                    <div className="pt-4 border-t flex justify-between font-medium">
                      <span>Tổng cộng</span>
                      <span className="text-spa-900 text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full bg-spa-800 hover:bg-spa-700 text-white mt-6"
                      onClick={handleCheckout}
                    >
                      Thanh toán
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-spa-100 text-spa-800 rounded-full mb-6">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-spa-900 mb-4">Giỏ hàng của bạn đang trống</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
              </p>
              <Link to="/products">
                <Button className="bg-spa-800 hover:bg-spa-700 text-white">
                  Mua sắm ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;

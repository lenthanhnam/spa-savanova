
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  return (
    <div className="pt-16">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden text-center p-8 md:p-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8">
              <CheckCircle className="h-12 w-12" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4">
              Đặt hàng thành công!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất.
            </p>
            
            <div className="bg-spa-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-medium text-spa-900 mb-2">Thông tin đơn hàng</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0">Mã đơn hàng:</span>
                  <span className="font-medium">{`ORD-${Date.now().toString().slice(-6)}`}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0">Ngày đặt hàng:</span>
                  <span>{new Date().toLocaleDateString('vi-VN')}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0">Trạng thái:</span>
                  <span className="text-green-600 font-medium">Đã xác nhận</span>
                </li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-8">
              Chúng tôi sẽ gửi email xác nhận cùng với thông tin chi tiết về đơn hàng của bạn. 
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" className="border-spa-700 text-spa-800 hover:bg-spa-50">
                  <Home className="mr-2 h-4 w-4" />
                  Về trang chủ
                </Button>
              </Link>
              <Link to="/products">
                <Button className="bg-spa-800 hover:bg-spa-700 text-white">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;

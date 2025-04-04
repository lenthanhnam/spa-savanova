import { useState } from 'react';
import { useVouchers } from '@/hooks/useVouchers';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import VoucherCard from '@/components/VoucherCard';
import { ArrowLeft, Ticket, TicketX, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const MyVouchers = () => {
  const { myVouchers, isLoading } = useVouchers();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Filter vouchers based on status
  const filteredVouchers = myVouchers.filter(voucher => {
    if (filter === 'all') return true;
    const isExpired = new Date(voucher.expiryDate) < new Date();
    return filter === 'active' ? !isExpired : isExpired;
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-spa-200 border-t-spa-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-spa-900">Vouchers của tôi</h1>
            <p className="text-gray-600 mt-2">Quản lý tất cả vouchers ưu đãi của bạn tại đây</p>
          </div>
          <Link to="/super-vouchers">
            <Button className="bg-spa-800 hover:bg-spa-700">
              <Ticket className="mr-2 h-4 w-4" />
              Khám phá thêm vouchers
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger 
              value="all" 
              onClick={() => setFilter('all')}
              className="data-[state=active]:bg-spa-800 data-[state=active]:text-white"
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              onClick={() => setFilter('active')}
              className="data-[state=active]:bg-spa-800 data-[state=active]:text-white"
            >
              Còn hiệu lực
            </TabsTrigger>
            <TabsTrigger 
              value="expired" 
              onClick={() => setFilter('expired')}
              className="data-[state=active]:bg-spa-800 data-[state=active]:text-white"
            >
              Đã hết hạn
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredVouchers.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredVouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <VoucherCard voucher={voucher} isSaved={true} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200">
            {filter === 'all' ? (
              <>
                <TicketX className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Chưa có voucher nào</h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Bạn chưa lưu voucher nào. Hãy khám phá các ưu đãi đặc biệt để tiết kiệm cho lần mua hàng tiếp theo.
                </p>
                <Link to="/super-vouchers">
                  <Button className="bg-spa-800 hover:bg-spa-700">
                    <Ticket className="mr-2 h-4 w-4" />
                    Khám phá vouchers
                  </Button>
                </Link>
              </>
            ) : filter === 'active' ? (
              <>
                <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Không có voucher còn hiệu lực</h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Bạn chưa có voucher nào còn hiệu lực. Hãy khám phá thêm các ưu đãi mới.
                </p>
                <Link to="/super-vouchers">
                  <Button className="bg-spa-800 hover:bg-spa-700">
                    <Ticket className="mr-2 h-4 w-4" />
                    Khám phá vouchers mới
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Không có voucher hết hạn</h3>
                <p className="text-gray-500 text-center max-w-md">
                  Bạn chưa có voucher nào đã hết hạn.
                </p>
              </>
            )}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/">
            <Button variant="outline" className="mx-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyVouchers;

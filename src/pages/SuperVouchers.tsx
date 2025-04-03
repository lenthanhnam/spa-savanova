
import { useState, useEffect } from 'react';
import { useVouchers } from '@/hooks/useVouchers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import VoucherCard from '@/components/VoucherCard';
import { ChevronRight, Search, TicketPercent, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuperVouchers = () => {
  const { superVouchers, isLoading, myVouchers } = useVouchers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [filteredVouchers, setFilteredVouchers] = useState(superVouchers);

  // Apply filters when superVouchers or filter changes
  useEffect(() => {
    if (!superVouchers) return;

    let result = [...superVouchers];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        voucher =>
          voucher.title.toLowerCase().includes(term) ||
          voucher.description.toLowerCase().includes(term) ||
          voucher.code.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(voucher => voucher.applicableFor === filter);
    }

    setFilteredVouchers(result);
  }, [superVouchers, searchTerm, filter]);

  // Check if a voucher is already saved
  const isVoucherSaved = (voucherId: string) => {
    return myVouchers.some(v => v.id === voucherId);
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-spa-200 border-t-spa-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-spa-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Super Vouchers</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Khám phá các ưu đãi độc quyền dành riêng cho bạn. Tiết kiệm ngay hôm nay!
              </p>
              <div className="flex items-center justify-center">
                <Link to="/my-vouchers">
                  <Button className="bg-white text-spa-800 hover:bg-gray-100">
                    <TicketPercent className="mr-2 h-5 w-5" />
                    Xem vouchers của tôi
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-spa-800 transition-colors">Trang chủ</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">Super Vouchers</span>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm voucher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="products">Sản phẩm</SelectItem>
              <SelectItem value="services">Dịch vụ</SelectItem>
              <SelectItem value="all">Tất cả dịch vụ & sản phẩm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vouchers Grid */}
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
                <VoucherCard 
                  voucher={voucher} 
                  isSaved={isVoucherSaved(voucher.id)} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200">
            <TicketPercent className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy voucher</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Không có voucher nào phù hợp với điều kiện tìm kiếm của bạn. Vui lòng thử lại với bộ lọc khác.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
            >
              Xóa bộ lọc
            </Button>
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

export default SuperVouchers;

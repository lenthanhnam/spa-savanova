
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, ArrowRight, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingStatus;
  therapistName: string;
  price: string;
  hasRated: boolean;
}

// Sample booking data
const sampleBookings: Booking[] = [
  {
    id: 'BK12345',
    serviceName: 'Swedish Massage',
    date: '2023-10-15',
    time: '10:00 AM',
    status: 'completed',
    therapistName: 'Nguyễn Thị Anh',
    price: '850.000 ₫',
    hasRated: true
  },
  {
    id: 'BK12346',
    serviceName: 'Deep Tissue Massage',
    date: '2023-11-20',
    time: '2:30 PM',
    status: 'completed',
    therapistName: 'Trần Minh Đức',
    price: '950.000 ₫',
    hasRated: false
  },
  {
    id: 'BK12347',
    serviceName: 'Hot Stone Therapy',
    date: '2023-12-05',
    time: '4:00 PM',
    status: 'upcoming',
    therapistName: 'Lê Hoàng Nam',
    price: '1.100.000 ₫',
    hasRated: false
  },
  {
    id: 'BK12348',
    serviceName: 'Aromatherapy Massage',
    date: '2023-12-18',
    time: '11:30 AM',
    status: 'upcoming',
    therapistName: 'Phạm Thị Lan',
    price: '900.000 ₫',
    hasRated: false
  },
  {
    id: 'BK12349',
    serviceName: 'Hydrating Facial',
    date: '2023-09-25',
    time: '3:00 PM',
    status: 'cancelled',
    therapistName: 'Vũ Thị Hương',
    price: '950.000 ₫',
    hasRated: false
  }
];

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeFilter, setActiveFilter] = useState<BookingStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading booking data
    const timer = setTimeout(() => {
      setBookings(sampleBookings);
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredBookings = bookings.filter(booking => 
    activeFilter === 'all' || booking.status === activeFilter
  );

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch(status) {
      case 'upcoming':
        return 'Sắp tới';
      case 'completed':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
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
              Lịch sử đặt lịch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Quản lý và theo dõi tất cả các buổi hẹn của bạn tại spa của chúng tôi
            </motion.p>
          </div>
        </div>
      </section>

      {/* Booking History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Options */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'upcoming', label: 'Sắp tới' },
              { id: 'completed', label: 'Đã hoàn thành' },
              { id: 'cancelled', label: 'Đã hủy' }
            ].map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={activeFilter === filter.id ? "bg-spa-800 hover:bg-spa-700" : ""}
                onClick={() => setActiveFilter(filter.id as BookingStatus | 'all')}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Bookings Table */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-spa-200 border-t-spa-800 rounded-full animate-spin"></div>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đặt lịch</TableHead>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Ngày & Giờ</TableHead>
                    <TableHead>Chuyên viên</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.serviceName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="flex items-center text-gray-700">
                            <Calendar className="mr-1 h-4 w-4 text-gray-500" /> 
                            {new Date(booking.date).toLocaleDateString('vi-VN')}
                          </span>
                          <span className="flex items-center text-gray-700 mt-1">
                            <Clock className="mr-1 h-4 w-4 text-gray-500" /> 
                            {booking.time}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{booking.therapistName}</TableCell>
                      <TableCell>{booking.price}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link to={`/booking/${booking.id}`}>
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-1" /> Chi tiết
                            </Button>
                          </Link>
                          
                          {booking.status === 'completed' && !booking.hasRated && (
                            <Link to={`/rate-service/${booking.id}`}>
                              <Button size="sm" className="bg-spa-800 hover:bg-spa-700">
                                <Star className="h-4 w-4 mr-1" /> Đánh giá
                              </Button>
                            </Link>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl text-gray-500 mb-4">Không tìm thấy lịch đặt nào.</h3>
              <Link to="/booking">
                <Button className="bg-spa-800 hover:bg-spa-700">
                  Đặt lịch ngay <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookingHistory;

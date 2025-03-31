
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ChevronRight, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceReview from '@/components/ServiceReview';
import { Service } from '@/types/branch';

// Sample service detail data
const sampleService: Service = {
  id: 's1',
  title: 'Swedish Massage',
  description: 'Our signature massage uses gentle to firm pressure to release tension, ease muscle pain, and promote relaxation.',
  fullDescription: 'Thư giãn và phục hồi cơ thể với liệu pháp massage Thụy Điển truyền thống của chúng tôi. Kỹ thuật massage này sử dụng các động tác vuốt nhẹ nhàng đến mạnh mẽ để giải phóng căng thẳng, làm dịu đau nhức cơ và thúc đẩy thư giãn sâu. Thợ massage của chúng tôi sẽ điều chỉnh áp lực theo nhu cầu cá nhân của bạn để tạo ra trải nghiệm hoàn toàn tùy chỉnh. Đây là lựa chọn hoàn hảo cho những người mới trải nghiệm massage hoặc những ai tìm kiếm phương pháp thư giãn toàn diện.',
  imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop',
  price: '850.000 ₫',
  duration: '60 phút',
  slug: 'swedish-massage',
  category: 'massage',
  benefits: [
    'Giảm căng thẳng và lo âu',
    'Giảm đau cơ và cải thiện tuần hoàn',
    'Thúc đẩy thư giãn tinh thần và thể chất',
    'Nâng cao chất lượng giấc ngủ',
    'Tăng cường hệ miễn dịch',
    'Cải thiện tâm trạng và tăng cường năng lượng'
  ],
  therapists: [
    {
      id: 't1',
      name: 'Nguyễn Thị Anh',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop',
      specialty: 'Chuyên gia massage với 8 năm kinh nghiệm'
    },
    {
      id: 't2',
      name: 'Trần Minh Đức',
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2069&auto=format&fit=crop',
      specialty: 'Chuyên gia trị liệu với 5 năm kinh nghiệm'
    },
    {
      id: 't3',
      name: 'Lê Hoàng Nam',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      specialty: 'Chuyên gia massage với 10 năm kinh nghiệm'
    }
  ]
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading service data
    const timer = setTimeout(() => {
      // In a real app, would fetch service by slug from an API
      setService(sampleService);
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-spa-200 border-t-spa-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-16 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-serif font-bold text-spa-900 mb-4">Dịch vụ không tồn tại</h2>
        <Link to="/services">
          <Button className="bg-spa-800 hover:bg-spa-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang dịch vụ
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Breadcrumbs */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-spa-800 transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/services" className="hover:text-spa-800 transition-colors">Dịch vụ</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-700 font-medium">{service.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{service.title}</h1>
            <div className="flex items-center justify-center space-x-4 md:space-x-8 text-sm md:text-base">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center">
                <div className="flex mr-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="h-4 w-4 text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>
                <span>(24 đánh giá)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold text-spa-900 mb-6">Thông tin dịch vụ</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {service.fullDescription}
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-spa-900 mb-6">Lợi ích</h2>
              <ul className="space-y-3 mb-12">
                {service.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-spa-100 rounded-full p-1 mr-3 mt-1">
                      <Star className="h-4 w-4 text-spa-800" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <h2 className="text-2xl font-serif font-bold text-spa-900 mb-6">Đội ngũ chuyên gia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {service.therapists?.map((therapist) => (
                  <motion.div 
                    key={therapist.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <img 
                      src={therapist.image} 
                      alt={therapist.name} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-spa-900">{therapist.name}</h3>
                      <p className="text-sm text-gray-600">{therapist.specialty}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-spa-900 mb-4">Chi tiết dịch vụ</h3>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Giá:</span>
                  <span className="font-medium text-spa-800">{service.price}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Loại dịch vụ:</span>
                  <span className="font-medium capitalize">{service.category}</span>
                </div>
                
                <Link to="/booking" className="mt-6 block">
                  <Button className="w-full bg-spa-800 hover:bg-spa-700">
                    <Calendar className="mr-2 h-5 w-5" />
                    Đặt lịch ngay
                  </Button>
                </Link>
                
                <div className="mt-6 bg-spa-50 rounded-lg p-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Lưu ý:</strong> Vui lòng đến trước 15 phút để hoàn thành thủ tục đăng ký và chuẩn bị cho buổi trị liệu của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-spa-900 mb-8">Đánh giá dịch vụ</h2>
          <ServiceReview serviceId={service.id} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-spa-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Sẵn sàng trải nghiệm dịch vụ này?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-spa-100">
            Đặt lịch ngay hôm nay và để các chuyên gia massage của chúng tôi mang đến cho bạn trải nghiệm thư giãn tuyệt vời.
          </p>
          <Link to="/booking">
            <Button size="lg" className="bg-white text-spa-800 hover:bg-spa-100">
              Đặt lịch ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;

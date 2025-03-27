
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ServiceToRate {
  id: string;
  name: string;
  date: string;
  therapist: string;
  imageUrl: string;
}

const RateService = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<ServiceToRate | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the service details based on id
    const timer = setTimeout(() => {
      setService({
        id: id || 'BK12346',
        name: 'Deep Tissue Massage',
        date: '2023-11-20',
        therapist: 'Trần Minh Đức',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      });
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Vui lòng chọn đánh giá",
        description: "Bạn cần chọn số sao đánh giá trước khi gửi",
        variant: "destructive"
      });
      return;
    }

    // Simulate submitting to an API
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Đánh giá thành công",
        description: "Cảm ơn bạn đã đánh giá dịch vụ của chúng tôi!",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/booking-history');
      }, 2000);
    }, 1500);
  };

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
        <h2 className="text-2xl font-serif font-bold text-spa-900 mb-4">Không tìm thấy thông tin đặt lịch</h2>
        <Button onClick={() => navigate('/booking-history')} className="bg-spa-800 hover:bg-spa-700">
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại lịch sử đặt lịch
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-16 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto px-4 py-12 max-w-lg text-center"
        >
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-spa-900 mb-4">
              Cảm ơn bạn đã đánh giá!
            </h1>
            <p className="text-gray-600 mb-6">
              Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ và mang đến trải nghiệm tốt hơn cho tất cả khách hàng.
            </p>
            <Button onClick={() => navigate('/booking-history')} className="bg-spa-800 hover:bg-spa-700">
              Quay lại lịch sử đặt lịch
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/booking-history')}
          className="mb-6 text-spa-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại lịch sử đặt lịch
        </Button>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-40 overflow-hidden">
            <img 
              src={service.imageUrl} 
              alt={service.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl font-serif font-bold text-spa-900 mb-4">
              Đánh giá dịch vụ
            </h1>
            
            <div className="mb-6">
              <h2 className="font-medium text-gray-900">{service.name}</h2>
              <p className="text-gray-600 text-sm">
                Ngày sử dụng dịch vụ: {new Date(service.date).toLocaleDateString('vi-VN')}
              </p>
              <p className="text-gray-600 text-sm">
                Chuyên viên: {service.therapist}
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Bạn đánh giá dịch vụ này như thế nào?
                </label>
                <div className="flex justify-center my-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-10 w-10 cursor-pointer ${
                        star <= (hoveredRating || rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    />
                  ))}
                </div>
                <div className="text-center text-gray-600 text-sm">
                  {rating > 0 && (
                    <span>
                      {rating === 1 && 'Rất không hài lòng'}
                      {rating === 2 && 'Không hài lòng'}
                      {rating === 3 && 'Bình thường'}
                      {rating === 4 && 'Hài lòng'}
                      {rating === 5 && 'Rất hài lòng'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Chia sẻ trải nghiệm của bạn (không bắt buộc)
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Hãy chia sẻ chi tiết trải nghiệm của bạn với dịch vụ này..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-spa-800 hover:bg-spa-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang gửi...
                  </div>
                ) : 'Gửi đánh giá'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateService;

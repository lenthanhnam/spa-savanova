
import { useState } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';

interface ProductReviewProps {
  productId: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  userHasMarkedHelpful: boolean;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: 'r1',
    userName: 'Nguyễn Văn A',
    rating: 5,
    date: '2023-12-01',
    content: 'Tôi rất hài lòng với sản phẩm này. Tinh dầu có hương thơm dịu nhẹ, giúp tôi thư giãn sau một ngày làm việc mệt mỏi. Chắc chắn sẽ mua lại!',
    helpful: 8,
    userHasMarkedHelpful: false
  },
  {
    id: 'r2',
    userName: 'Trần Thị B',
    rating: 4,
    date: '2023-11-15',
    content: 'Sản phẩm tốt, hương thơm dễ chịu và giúp tôi ngủ ngon hơn. Chỉ tiếc là chai hơi nhỏ so với giá tiền.',
    helpful: 3,
    userHasMarkedHelpful: true
  },
  {
    id: 'r3',
    userName: 'Lê Văn C',
    rating: 5,
    date: '2023-10-22',
    content: 'Tuyệt vời! Tôi đã dùng nhiều loại tinh dầu khác nhau nhưng sản phẩm này đặc biệt hiệu quả. Mùi hương không quá nồng và rất tự nhiên.',
    helpful: 12,
    userHasMarkedHelpful: false
  }
];

const ProductReview = ({ productId }: ProductReviewProps) => {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (userRating === 0) {
      toast({
        title: "Vui lòng chọn đánh giá",
        description: "Bạn cần chọn số sao đánh giá trước khi gửi",
        variant: "destructive"
      });
      return;
    }

    if (reviewContent.trim().length < 10) {
      toast({
        title: "Nội dung quá ngắn",
        description: "Vui lòng nhập ít nhất 10 ký tự cho đánh giá của bạn",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would send this to your API
    const newReview: Review = {
      id: `r${reviews.length + 1}`,
      userName: 'Bạn',
      rating: userRating,
      date: new Date().toISOString().split('T')[0],
      content: reviewContent,
      helpful: 0,
      userHasMarkedHelpful: false
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setReviewContent('');
    setIsDialogOpen(false);

    toast({
      title: "Đánh giá đã được gửi",
      description: "Cảm ơn bạn đã chia sẻ ý kiến về sản phẩm!",
    });
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId && !review.userHasMarkedHelpful) {
        return {
          ...review,
          helpful: review.helpful + 1,
          userHasMarkedHelpful: true
        };
      }
      return review;
    }));
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Count ratings by star
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating - 1]++;
    return acc;
  }, [0, 0, 0, 0, 0]);

  return (
    <div>
      {/* Rating Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-spa-900 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-6 w-6 ${
                    star <= Math.round(averageRating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <div className="text-gray-500 text-sm">{reviews.length} đánh giá</div>
          </div>
          
          <div>
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center mb-2">
                <div className="w-8 text-gray-600 text-sm">{star}</div>
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ width: `${(ratingCounts[5 - star] / reviews.length) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-gray-600 text-sm ml-2">
                  {ratingCounts[5 - star]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-spa-800 hover:bg-spa-700">Viết đánh giá</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-4 flex flex-col items-center">
                  <p className="text-gray-700 mb-2">Chọn đánh giá của bạn</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-8 w-8 cursor-pointer ${
                          star <= (hoveredRating || userRating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nội dung đánh giá</label>
                  <Textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button className="bg-spa-800 hover:bg-spa-700" onClick={handleSubmitReview}>
                  Gửi đánh giá
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <motion.div 
              key={review.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-spa-100 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-spa-800" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{review.userName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${
                        star <= review.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{review.content}</p>
              
              <button
                onClick={() => markReviewHelpful(review.id)}
                disabled={review.userHasMarkedHelpful}
                className={`flex items-center text-sm ${
                  review.userHasMarkedHelpful 
                    ? 'text-spa-800' 
                    : 'text-gray-500 hover:text-spa-800'
                }`}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Hữu ích ({review.helpful})</span>
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
            <p className="mt-2">Hãy trở thành người đầu tiên chia sẻ trải nghiệm của bạn!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;

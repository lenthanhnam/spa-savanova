
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronRight, Star, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import ProductReview from '@/components/ProductReview';
import { Product } from '@/types/branch';

// Sample product for demonstration
const sampleProduct: Product = {
  id: 'p1',
  name: 'Tinh dầu thảo mộc thư giãn',
  description: 'Tinh dầu thảo mộc cao cấp giúp thư giãn và giảm căng thẳng',
  longDescription: 'Tinh dầu thảo mộc Serenity Spa được chiết xuất từ những loại thảo mộc tươi tự nhiên, được thu hoạch từ các vùng đồi núi và thung lũng không bị ô nhiễm. Sản phẩm này được sản xuất bằng phương pháp chưng cất hơi nước truyền thống, giúp giữ nguyên các thành phần có lợi cho sức khỏe. Tinh dầu có tác dụng làm dịu thần kinh, giảm căng thẳng, mệt mỏi và cải thiện giấc ngủ. Hương thơm dịu nhẹ, tinh tế sẽ giúp bạn thư giãn sau một ngày dài làm việc.',
  ingredients: 'Tinh dầu oải hương (Lavender), tinh dầu cam ngọt (Sweet Orange), tinh dầu hoa hồng (Rose), tinh dầu ngọc lan tây (Ylang Ylang), tinh dầu hương thảo (Rosemary), dầu nền jojoba hữu cơ.',
  usage: 'Có thể sử dụng với đèn xông tinh dầu, máy khuếch tán tinh dầu hoặc thêm vài giọt vào nước tắm. Để massage, pha loãng với dầu nền (dầu dừa, dầu olive) theo tỷ lệ 2-3 giọt tinh dầu cho 10ml dầu nền.',
  imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f468e9b2a6?q=80&w=2069&auto=format&fit=crop',
  price: 350000,
  category: 'essential-oils',
  slug: 'relaxing-herbal-essential-oil',
  inStock: true,
  quantity: 30
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate fetching product data
    const timer = setTimeout(() => {
      // In a real app, you would fetch the product by slug from an API
      setProduct(sampleProduct);
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity: quantity
      });
      
      toast({
        title: "Đã thêm vào giỏ hàng",
        description: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
        duration: 3000,
      });
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-spa-200 border-t-spa-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-serif font-bold text-spa-900 mb-4">Sản phẩm không tồn tại</h2>
        <Link to="/products">
          <Button className="bg-spa-800 hover:bg-spa-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang sản phẩm
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
            <Link to="/products" className="hover:text-spa-800 transition-colors">Sản phẩm</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden"
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>
                <span className="text-gray-600">(12 đánh giá)</span>
              </div>
              
              <p className="text-xl md:text-2xl font-medium text-spa-800 mb-6">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </p>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-700 mb-6">
                <Truck className="h-5 w-5 text-spa-800" />
                <span>Giao hàng miễn phí cho đơn hàng trên 500,000₫</span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-2">Số lượng:</p>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 rounded-l-md hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 rounded-r-md hover:bg-gray-100"
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-500">
                    {product.quantity} sản phẩm có sẵn
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className="w-full md:w-auto bg-spa-800 hover:bg-spa-700 mb-8"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              
              {/* Product Tabs */}
              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Mô tả</TabsTrigger>
                  <TabsTrigger value="ingredients">Thành phần</TabsTrigger>
                  <TabsTrigger value="usage">Cách sử dụng</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4 text-gray-700">
                  <p>{product.longDescription}</p>
                </TabsContent>
                <TabsContent value="ingredients" className="p-4 text-gray-700">
                  <p>{product.ingredients}</p>
                </TabsContent>
                <TabsContent value="usage" className="p-4 text-gray-700">
                  <p>{product.usage}</p>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-spa-900 mb-8">Đánh giá sản phẩm</h2>
          {product && <ProductReview productId={product.id} />}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;

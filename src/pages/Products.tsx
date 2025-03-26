
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';

// Dữ liệu mẫu cho sản phẩm
const allProducts: ProductCardProps[] = [
  {
    id: '1',
    name: 'Tinh dầu massage Oải Hương',
    description: 'Tinh dầu massage từ hoa oải hương, giúp thư giãn và làm dịu cơ thể.',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2787',
    price: 250000,
    category: 'oils',
    slug: 'tinh-dau-massage-oai-huong',
    inStock: true
  },
  {
    id: '2',
    name: 'Bộ đá nóng massage',
    description: 'Bộ đá basalt dùng cho liệu pháp massage đá nóng, giúp giảm đau và căng thẳng.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044',
    price: 750000,
    category: 'tools',
    slug: 'bo-da-nong-massage',
    inStock: true
  },
  {
    id: '3',
    name: 'Tinh dầu Bạc Hà',
    description: 'Tinh dầu bạc hà nguyên chất, mang lại cảm giác tươi mới và sảng khoái.',
    imageUrl: 'https://images.unsplash.com/photo-1547793548-7a0e7dfdb24f?q=80&w=2070',
    price: 220000,
    category: 'oils',
    slug: 'tinh-dau-bac-ha',
    inStock: true
  },
  {
    id: '4',
    name: 'Kem dưỡng da mặt Aloe Vera',
    description: 'Kem dưỡng làm từ lô hội tự nhiên, cung cấp độ ẩm và làm dịu làn da.',
    imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2127',
    price: 350000,
    category: 'skincare',
    slug: 'kem-duong-da-mat-aloe-vera',
    inStock: true
  },
  {
    id: '5',
    name: 'Mặt nạ Collagen',
    description: 'Mặt nạ giàu collagen, giúp da săn chắc và trẻ hóa.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070',
    price: 80000,
    category: 'skincare',
    slug: 'mat-na-collagen',
    inStock: true
  },
  {
    id: '6',
    name: 'Bộ trang điểm tự nhiên',
    description: 'Bộ mỹ phẩm trang điểm với thành phần tự nhiên, an toàn cho da nhạy cảm.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087',
    price: 1200000,
    category: 'makeup',
    slug: 'bo-trang-diem-tu-nhien',
    inStock: true
  },
  {
    id: '7',
    name: 'Nến thơm Hoa Nhài',
    description: 'Nến thơm từ sáp đậu nành và tinh dầu hoa nhài, tạo không gian thư giãn.',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2787',
    price: 180000,
    category: 'candles',
    slug: 'nen-thom-hoa-nhai',
    inStock: true
  },
  {
    id: '8',
    name: 'Bộ chăm sóc tóc Argan',
    description: 'Bộ dầu gội và dầu xả với dầu Argan, dưỡng tóc mềm mượt.',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887',
    price: 420000,
    category: 'haircare',
    slug: 'bo-cham-soc-toc-argan',
    inStock: false
  },
  {
    id: '9',
    name: 'Khăn choàng spa',
    description: 'Khăn choàng cao cấp, mềm mại và thấm hút tốt.',
    imageUrl: 'https://images.unsplash.com/photo-1532926381893-7542290edf1d?q=80&w=2070',
    price: 300000,
    category: 'accessories',
    slug: 'khan-choang-spa',
    inStock: true
  }
];

const categories = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'oils', name: 'Tinh dầu' },
  { id: 'skincare', name: 'Chăm sóc da' },
  { id: 'tools', name: 'Dụng cụ spa' },
  { id: 'haircare', name: 'Chăm sóc tóc' },
  { id: 'makeup', name: 'Trang điểm' },
  { id: 'candles', name: 'Nến thơm' },
  { id: 'accessories', name: 'Phụ kiện' }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = allProducts.filter(product => {
    // Lọc theo danh mục
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold text-spa-900 mb-6"
            >
              Sản phẩm spa
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              Khám phá các sản phẩm chăm sóc sức khỏe và sắc đẹp cao cấp của chúng tôi để tiếp tục liệu trình spa tại nhà.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 pr-4 py-6 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id ? "bg-spa-800 hover:bg-spa-700" : ""}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Danh sách sản phẩm */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600 mb-4">Không tìm thấy sản phẩm phù hợp.</h3>
              <Button onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
                Xem tất cả sản phẩm
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Phần giới thiệu về sản phẩm */}
      <section className="py-16 md:py-20 bg-spa-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Tiếp tục trải nghiệm spa tại nhà</h2>
          <p className="max-w-2xl mx-auto mb-8 text-spa-100">
            Sản phẩm của chúng tôi được chọn lọc cẩn thận để mang đến trải nghiệm spa chất lượng cao ngay tại nhà bạn. Từ tinh dầu massage đến các sản phẩm chăm sóc da chuyên nghiệp.
          </p>
          <Link to="/cart">
            <Button size="lg" className="bg-white text-spa-800 hover:bg-spa-100">
              Xem giỏ hàng
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;

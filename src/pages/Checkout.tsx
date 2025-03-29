
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CreditCard, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import BranchSelector from '@/components/BranchSelector';
import { branches } from '@/data/branches';
import { Branch } from '@/types/branch';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  paymentMethod: 'cod' | 'bank-transfer' | 'credit-card';
}

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    paymentMethod: 'cod'
  });
  
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is changed
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handlePaymentMethodChange = (method: FormData['paymentMethod']) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.city.trim()) newErrors.city = 'Vui lòng nhập thành phố';
    if (!formData.district.trim()) newErrors.district = 'Vui lòng nhập quận/huyện';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    toast({
      title: "Chi nhánh đã được chọn",
      description: `Bạn đã chọn nhận hàng tại chi nhánh ${branch.name}`,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Giả lập API call để xử lý đơn hàng
    setTimeout(() => {
      clearCart();
      toast({
        title: "Đặt hàng thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn sớm để xác nhận đơn hàng.",
        duration: 5000,
      });
      navigate('/order-success');
      setIsSubmitting(false);
    }, 1500);
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4"
            >
              Thanh toán
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600"
            >
              Hoàn tất thông tin thanh toán để đặt hàng
            </motion.p>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Chi nhánh */}
                <BranchSelector 
                  branches={branches}
                  selectedBranch={selectedBranch}
                  onSelectBranch={handleSelectBranch}
                />
                
                {/* Thông tin cá nhân */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-spa-700" />
                    <h2 className="text-xl font-serif font-bold text-spa-900">Thông tin liên hệ</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Họ và tên</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Tỉnh/Thành phố</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="district">Quận/Huyện</Label>
                        <Input
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className={errors.district ? "border-red-500" : ""}
                        />
                        {errors.district && (
                          <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phương thức thanh toán */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-spa-700" />
                    <h2 className="text-xl font-serif font-bold text-spa-900">Phương thức thanh toán</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.paymentMethod === 'cod' ? 'border-spa-700 bg-spa-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handlePaymentMethodChange('cod')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            formData.paymentMethod === 'cod' ? 'border-spa-700' : 'border-gray-400'
                          }`}>
                            {formData.paymentMethod === 'cod' && (
                              <div className="w-3 h-3 rounded-full bg-spa-700"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">Thanh toán khi nhận hàng (COD)</h3>
                            <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.paymentMethod === 'bank-transfer' ? 'border-spa-700 bg-spa-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handlePaymentMethodChange('bank-transfer')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            formData.paymentMethod === 'bank-transfer' ? 'border-spa-700' : 'border-gray-400'
                          }`}>
                            {formData.paymentMethod === 'bank-transfer' && (
                              <div className="w-3 h-3 rounded-full bg-spa-700"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">Chuyển khoản ngân hàng</h3>
                            <p className="text-sm text-gray-500">Thanh toán qua chuyển khoản ngân hàng</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.paymentMethod === 'credit-card' ? 'border-spa-700 bg-spa-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handlePaymentMethodChange('credit-card')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            formData.paymentMethod === 'credit-card' ? 'border-spa-700' : 'border-gray-400'
                          }`}>
                            {formData.paymentMethod === 'credit-card' && (
                              <div className="w-3 h-3 rounded-full bg-spa-700"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">Thẻ tín dụng / Ghi nợ</h3>
                            <p className="text-sm text-gray-500">Thanh toán an toàn với thẻ Visa, Mastercard</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phương thức vận chuyển */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-spa-700" />
                    <h2 className="text-xl font-serif font-bold text-spa-900">Phương thức vận chuyển</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="border rounded-lg p-4 border-spa-700 bg-spa-50">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full border border-spa-700 flex items-center justify-center mr-3">
                          <div className="w-3 h-3 rounded-full bg-spa-700"></div>
                        </div>
                        <div>
                          <h3 className="font-medium">Giao hàng tiêu chuẩn</h3>
                          <p className="text-sm text-gray-500">Miễn phí - Nhận hàng trong 3-5 ngày</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:hidden">
                  <Button 
                    type="submit" 
                    className="w-full bg-spa-800 hover:bg-spa-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-serif font-bold text-spa-900">Đơn hàng của bạn</h2>
                </div>
                
                <div className="p-6">
                  <ul className="divide-y mb-6">
                    {cart.map(item => (
                      <li key={item.id} className="py-3 flex justify-between">
                        <div>
                          <span className="font-medium text-spa-900">{item.name}</span>
                          <span className="text-gray-500 ml-1">x{item.quantity}</span>
                        </div>
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span>Miễn phí</span>
                    </div>
                    
                    <div className="pt-3 border-t flex justify-between font-medium">
                      <span>Tổng cộng</span>
                      <span className="text-spa-900 text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-spa-800 hover:bg-spa-700 text-white mt-6"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Bằng cách nhấn nút "Hoàn tất đặt hàng", bạn đồng ý với các điều khoản và điều kiện của chúng tôi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;

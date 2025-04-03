
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Voucher } from '@/types/branch';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

// Sample vouchers for demo
const SAMPLE_VOUCHERS: Voucher[] = [
  {
    id: 'v1',
    code: 'WELCOME20',
    title: 'Chào mừng thành viên mới',
    description: 'Giảm 20% cho lần đặt lịch đầu tiên',
    discountType: 'percentage',
    discountValue: 20,
    expiryDate: '2023-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
    applicableFor: 'all',
    status: 'active',
    terms: [
      'Áp dụng cho thành viên mới',
      'Chỉ áp dụng cho lần đặt lịch đầu tiên',
      'Không áp dụng cùng các khuyến mãi khác'
    ]
  },
  {
    id: 'v2',
    code: 'BDAY30',
    title: 'Ưu đãi sinh nhật',
    description: 'Giảm 30% cho tất cả dịch vụ trong tháng sinh nhật',
    discountType: 'percentage',
    discountValue: 30,
    expiryDate: '2023-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
    applicableFor: 'services',
    status: 'active',
    terms: [
      'Áp dụng trong tháng sinh nhật',
      'Cần xuất trình CMND/CCCD để xác minh ngày sinh',
      'Chỉ áp dụng cho dịch vụ'
    ]
  },
  {
    id: 'v3',
    code: 'RELAX50',
    title: 'Giảm nửa giá cho Massage',
    description: 'Giảm 50% cho tất cả dịch vụ massage',
    discountType: 'percentage',
    discountValue: 50,
    minPurchase: 1000000,
    expiryDate: '2023-11-30',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
    applicableFor: 'services',
    status: 'active',
    terms: [
      'Chỉ áp dụng cho dịch vụ massage',
      'Áp dụng cho hóa đơn từ 1.000.000đ',
      'Không áp dụng vào cuối tuần và ngày lễ'
    ]
  },
  {
    id: 'v4',
    code: 'SKINCARE15',
    title: 'Giảm giá sản phẩm chăm sóc da',
    description: 'Giảm 15% cho tất cả sản phẩm chăm sóc da',
    discountType: 'percentage',
    discountValue: 15,
    expiryDate: '2023-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
    applicableFor: 'products',
    status: 'active',
    terms: [
      'Chỉ áp dụng cho sản phẩm chăm sóc da',
      'Không áp dụng cùng các khuyến mãi khác'
    ]
  },
  {
    id: 'v5',
    code: 'SUMMER100K',
    title: 'Ưu đãi mùa hè',
    description: 'Giảm 100.000đ cho hóa đơn từ 500.000đ',
    discountType: 'fixed',
    discountValue: 100000,
    minPurchase: 500000,
    expiryDate: '2023-08-31',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800',
    isSpecial: false,
    applicableFor: 'all',
    status: 'expired',
    terms: [
      'Áp dụng cho hóa đơn từ 500.000đ',
      'Không áp dụng cùng các khuyến mãi khác',
      'Hết hạn ngày 31/08/2023'
    ]
  }
];

interface VouchersContextType {
  myVouchers: Voucher[];
  superVouchers: Voucher[];
  isLoading: boolean;
  saveVoucher: (voucher: Voucher) => void;
  removeVoucher: (voucherId: string) => void;
  getVoucherById: (voucherId: string) => Voucher | undefined;
}

const VouchersContext = createContext<VouchersContextType | undefined>(undefined);

export const VouchersProvider = ({ children }: { children: ReactNode }) => {
  const [myVouchers, setMyVouchers] = useState<Voucher[]>([]);
  const [superVouchers, setSuperVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Load vouchers from localStorage if user is authenticated
    if (isAuthenticated) {
      const savedVouchers = localStorage.getItem('myVouchers');
      if (savedVouchers) {
        try {
          setMyVouchers(JSON.parse(savedVouchers));
        } catch (e) {
          console.error('Error parsing vouchers from localStorage', e);
          localStorage.removeItem('myVouchers');
        }
      }
    }

    // Load sample vouchers
    setSuperVouchers(SAMPLE_VOUCHERS.filter(v => v.isSpecial && v.status === 'active'));
    setIsLoading(false);
  }, [isAuthenticated]);

  // Save changes to localStorage
  useEffect(() => {
    if (isAuthenticated && myVouchers.length > 0) {
      localStorage.setItem('myVouchers', JSON.stringify(myVouchers));
    }
  }, [myVouchers, isAuthenticated]);

  const saveVoucher = (voucher: Voucher) => {
    if (!isAuthenticated) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để lưu voucher",
        variant: "destructive",
      });
      return;
    }

    if (myVouchers.some(v => v.id === voucher.id)) {
      toast({
        title: "Voucher đã tồn tại",
        description: "Voucher này đã có trong danh sách của bạn",
      });
      return;
    }

    setMyVouchers(prev => [...prev, voucher]);
    toast({
      title: "Đã lưu voucher",
      description: `Voucher ${voucher.code} đã được thêm vào danh sách của bạn`,
    });
  };

  const removeVoucher = (voucherId: string) => {
    setMyVouchers(prev => prev.filter(voucher => voucher.id !== voucherId));
    toast({
      title: "Đã xóa voucher",
      description: "Voucher đã được xóa khỏi danh sách của bạn",
    });
  };

  const getVoucherById = (voucherId: string) => {
    return [...myVouchers, ...superVouchers].find(voucher => voucher.id === voucherId);
  };

  return (
    <VouchersContext.Provider
      value={{
        myVouchers,
        superVouchers,
        isLoading,
        saveVoucher,
        removeVoucher,
        getVoucherById,
      }}
    >
      {children}
    </VouchersContext.Provider>
  );
};

export const useVouchers = () => {
  const context = useContext(VouchersContext);
  if (context === undefined) {
    throw new Error('useVouchers must be used within a VouchersProvider');
  }
  return context;
};

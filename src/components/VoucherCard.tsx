
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Voucher } from "@/types/branch";
import { Calendar, Tag, Info, Plus, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVouchers } from "@/hooks/useVouchers";
import { format, isBefore } from "date-fns";
import { vi } from "date-fns/locale";

interface VoucherCardProps {
  voucher: Voucher;
  isSaved?: boolean;
}

const VoucherCard = ({ voucher, isSaved = false }: VoucherCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { saveVoucher, removeVoucher } = useVouchers();
  
  const handleSaveVoucher = () => {
    saveVoucher(voucher);
  };

  const handleRemoveVoucher = () => {
    removeVoucher(voucher.id);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  const isExpired = isBefore(new Date(voucher.expiryDate), new Date());

  return (
    <>
      <Card className={`overflow-hidden ${isExpired ? 'opacity-70' : ''}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={voucher.imageUrl}
            alt={voucher.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Badge className={voucher.applicableFor === 'products' 
                ? 'bg-blue-500' 
                : voucher.applicableFor === 'services' 
                ? 'bg-purple-500' 
                : 'bg-green-500'}>
                {voucher.applicableFor === 'products' 
                  ? 'Sản phẩm' 
                  : voucher.applicableFor === 'services' 
                  ? 'Dịch vụ' 
                  : 'Tất cả'}
              </Badge>
              {isExpired && <Badge variant="destructive" className="ml-2">Hết hạn</Badge>}
            </div>
            <div className="bg-spa-800 text-white px-3 py-1 rounded-md font-mono text-sm">
              {voucher.code}
            </div>
          </div>
          <CardTitle className="text-lg mt-2">{voucher.title}</CardTitle>
          <CardDescription className="line-clamp-2">{voucher.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-green-700 font-medium">
              <Tag className="h-4 w-4 mr-1" />
              {voucher.discountType === 'percentage' 
                ? `Giảm ${voucher.discountValue}%` 
                : `Giảm ${formatCurrency(voucher.discountValue)}`}
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>HSD: {format(new Date(voucher.expiryDate), 'dd/MM/yyyy')}</span>
            </div>
          </div>
          {voucher.minPurchase && (
            <p className="text-xs text-gray-500 mt-1">
              Đơn hàng từ {formatCurrency(voucher.minPurchase)}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDetails(true)}
            className="text-xs"
          >
            <Info className="h-3 w-3 mr-1" />
            Chi tiết
          </Button>
          
          {isSaved ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleRemoveVoucher}
              className="text-xs"
              disabled={isExpired}
            >
              <X className="h-3 w-3 mr-1" />
              Xóa
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSaveVoucher}
              className="text-xs bg-spa-800 hover:bg-spa-700"
              disabled={isExpired}
            >
              {isSaved ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Đã lưu
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3 mr-1" />
                  Lưu voucher
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{voucher.title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Mã: <span className="font-mono font-medium">{voucher.code}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Mô tả:</h4>
              <p className="text-sm text-gray-700">{voucher.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Ưu đãi:</h4>
              <p className="text-sm text-gray-700">
                {voucher.discountType === 'percentage' 
                  ? `Giảm ${voucher.discountValue}% cho ${
                      voucher.applicableFor === 'products' 
                        ? 'sản phẩm' 
                        : voucher.applicableFor === 'services' 
                        ? 'dịch vụ' 
                        : 'tất cả dịch vụ và sản phẩm'
                    }` 
                  : `Giảm ${formatCurrency(voucher.discountValue)} cho ${
                      voucher.applicableFor === 'products' 
                        ? 'sản phẩm' 
                        : voucher.applicableFor === 'services' 
                        ? 'dịch vụ' 
                        : 'tất cả dịch vụ và sản phẩm'
                    }`}
                {voucher.minPurchase && ` khi đặt hàng từ ${formatCurrency(voucher.minPurchase)}`}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Hạn sử dụng:</h4>
              <p className="text-sm text-gray-700">
                {format(new Date(voucher.expiryDate), 'EEEE, dd MMMM yyyy', { locale: vi })}
                {isExpired && <span className="text-red-500 ml-2">(Đã hết hạn)</span>}
              </p>
            </div>
            
            {voucher.terms && voucher.terms.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Điều kiện:</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  {voucher.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            {!isSaved && !isExpired ? (
              <Button 
                onClick={() => {
                  handleSaveVoucher();
                  setShowDetails(false);
                }}
                className="bg-spa-800 hover:bg-spa-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Lưu voucher
              </Button>
            ) : isSaved && !isExpired ? (
              <Button 
                variant="destructive"
                onClick={() => {
                  handleRemoveVoucher();
                  setShowDetails(false);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Xóa voucher
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                Đóng
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoucherCard;

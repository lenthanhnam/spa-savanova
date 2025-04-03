
export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  openTime: string;
  closeTime: string;
  image?: string;
  managerId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'customer';
  phone?: string;
  address?: string;
  branchId?: string;
  avatar?: string;
  joinDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  ingredients?: string;
  usage?: string;
  imageUrl: string;
  price: number;
  category: string;
  slug: string;
  inStock: boolean;
  quantity: number;
  branchIds?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  benefits?: string[];
  imageUrl: string;
  price: string;
  duration: string;
  slug: string;
  category: string;
  branchIds?: string[];
  therapists?: {
    id: string;
    name: string;
    image: string;
    specialty: string;
  }[];
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  expiryDate: string;
  imageUrl: string;
  isSpecial: boolean;
  applicableFor: 'products' | 'services' | 'all';
  status: 'active' | 'used' | 'expired';
  terms?: string[];
}

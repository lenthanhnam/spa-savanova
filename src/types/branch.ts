
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


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Bell, 
  Lock, 
  CreditCard,
  Shield,
  Mail as MailIcon,
  Calendar,
  RefreshCw,
  FileText,
  Globe,
  Banknote,
  Smartphone,
  Store
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { branches } from '@/data/branches';
import { Branch } from '@/types/branch';

const Settings = () => {
  const { toast } = useToast();
  
  // Business Information State
  const [businessInfo, setBusinessInfo] = useState({
    name: 'SerenitySpa',
    email: 'contact@serenityspa.com',
    phone: '0901234567',
    address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    taxId: '0123456789',
    website: 'www.serenityspa.com',
    description: 'SerenitySpa - Nơi mang đến cho bạn những trải nghiệm thư giãn tuyệt vời. Chúng tôi cung cấp các dịch vụ spa chất lượng cao với những sản phẩm chăm sóc sức khỏe và sắc đẹp hàng đầu.'
  });
  
  // Operation Hours State
  const [operationHours, setOperationHours] = useState({
    monday: { open: '09:00', close: '21:00', isOpen: true },
    tuesday: { open: '09:00', close: '21:00', isOpen: true },
    wednesday: { open: '09:00', close: '21:00', isOpen: true },
    thursday: { open: '09:00', close: '21:00', isOpen: true },
    friday: { open: '09:00', close: '21:00', isOpen: true },
    saturday: { open: '09:00', close: '21:00', isOpen: true },
    sunday: { open: '09:00', close: '18:00', isOpen: true },
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
    systemUpdates: true
  });
  
  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCard: true,
    acceptBankTransfer: true,
    acceptMomo: true,
    acceptZaloPay: true,
    vatRate: 10,
  });

  // Branches State
  const [branchList, setBranchList] = useState(branches);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleOperationHoursChange = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setOperationHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePaymentSettingChange = (setting: string, value: boolean | number) => {
    setPaymentSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Cài đặt đã được lưu",
      description: "Các thay đổi của bạn đã được lưu thành công.",
    });
  };

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch({...branch});
  };

  const handleBranchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingBranch) return;
    
    const { name, value } = e.target;
    setEditingBranch(prev => ({
      ...prev!,
      [name]: value
    }));
  };

  const handleSaveBranch = () => {
    if (!editingBranch) return;
    
    setBranchList(prev => 
      prev.map(branch => 
        branch.id === editingBranch.id ? editingBranch : branch
      )
    );
    
    setEditingBranch(null);
    
    toast({
      title: "Chi nhánh đã được cập nhật",
      description: "Thông tin chi nhánh đã được lưu thành công.",
    });
  };

  const handleAddNewBranch = () => {
    const newBranch: Branch = {
      id: `${branchList.length + 1}`,
      name: 'Chi nhánh mới',
      address: 'Địa chỉ chi nhánh',
      phone: '0901234567',
      openTime: '09:00',
      closeTime: '21:00',
    };
    
    setBranchList(prev => [...prev, newBranch]);
    setEditingBranch(newBranch);
    
    toast({
      title: "Đã thêm chi nhánh mới",
      description: "Vui lòng cập nhật thông tin chi tiết.",
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Cài đặt hệ thống</h1>
          <Button className="bg-spa-800 hover:bg-spa-700" onClick={handleSaveSettings}>
            <Save size={16} className="mr-2" />
            Lưu thay đổi
          </Button>
        </div>

        <Tabs defaultValue="business" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="business">Thông tin doanh nghiệp</TabsTrigger>
            <TabsTrigger value="hours">Giờ hoạt động</TabsTrigger>
            <TabsTrigger value="branches">Chi nhánh</TabsTrigger>
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            <TabsTrigger value="payment">Thanh toán</TabsTrigger>
            <TabsTrigger value="security">Bảo mật</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin doanh nghiệp</CardTitle>
                <CardDescription>Cập nhật thông tin cơ bản về spa của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên doanh nghiệp</Label>
                    <div className="flex">
                      <Building className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input 
                        id="name" 
                        name="name" 
                        value={businessInfo.name}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={businessInfo.email}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="flex">
                      <Phone className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={businessInfo.phone}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <Globe className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input 
                        id="website" 
                        name="website" 
                        value={businessInfo.website}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Mã số thuế</Label>
                    <div className="flex">
                      <FileText className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input 
                        id="taxId" 
                        name="taxId" 
                        value={businessInfo.taxId}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <div className="flex">
                      <MapPin className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                      <Input 
                        id="address" 
                        name="address" 
                        value={businessInfo.address}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả doanh nghiệp</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    rows={4}
                    value={businessInfo.description}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Giờ hoạt động</CardTitle>
                <CardDescription>Thiết lập giờ mở cửa và đóng cửa hàng ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(operationHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <Label className="capitalize w-32">{day === 'monday' ? 'Thứ hai' :
                                                          day === 'tuesday' ? 'Thứ ba' : 
                                                          day === 'wednesday' ? 'Thứ tư' : 
                                                          day === 'thursday' ? 'Thứ năm' : 
                                                          day === 'friday' ? 'Thứ sáu' : 
                                                          day === 'saturday' ? 'Thứ bảy' : 'Chủ nhật'}</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Input 
                          type="time" 
                          className="w-28"
                          value={hours.open}
                          onChange={(e) => handleOperationHoursChange(day, 'open', e.target.value)}
                          disabled={!hours.isOpen}
                        />
                        <span>-</span>
                        <Input 
                          type="time" 
                          className="w-28"
                          value={hours.close}
                          onChange={(e) => handleOperationHoursChange(day, 'close', e.target.value)}
                          disabled={!hours.isOpen}
                        />
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`open-${day}`}>Mở cửa</Label>
                          <Switch 
                            id={`open-${day}`} 
                            checked={hours.isOpen}
                            onCheckedChange={(checked) => handleOperationHoursChange(day, 'isOpen', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branches">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý chi nhánh</CardTitle>
                <CardDescription>Thêm, chỉnh sửa và quản lý các chi nhánh của doanh nghiệp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button 
                    onClick={handleAddNewBranch}
                    className="bg-spa-800 hover:bg-spa-700"
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Thêm chi nhánh mới
                  </Button>
                </div>
                
                {editingBranch ? (
                  <div className="bg-spa-50 rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-medium mb-4">Chỉnh sửa chi nhánh</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="branch-name">Tên chi nhánh</Label>
                        <Input
                          id="branch-name"
                          name="name"
                          value={editingBranch.name}
                          onChange={handleBranchInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branch-address">Địa chỉ</Label>
                        <Input
                          id="branch-address"
                          name="address"
                          value={editingBranch.address}
                          onChange={handleBranchInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branch-phone">Số điện thoại</Label>
                        <Input
                          id="branch-phone"
                          name="phone"
                          value={editingBranch.phone}
                          onChange={handleBranchInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="branch-open">Giờ mở cửa</Label>
                          <Input
                            id="branch-open"
                            name="openTime"
                            type="time"
                            value={editingBranch.openTime}
                            onChange={handleBranchInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="branch-close">Giờ đóng cửa</Label>
                          <Input
                            id="branch-close"
                            name="closeTime"
                            type="time"
                            value={editingBranch.closeTime}
                            onChange={handleBranchInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingBranch(null)}
                        >
                          Hủy
                        </Button>
                        <Button 
                          onClick={handleSaveBranch}
                          className="bg-spa-800 hover:bg-spa-700"
                        >
                          Lưu chi nhánh
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <div className="space-y-3">
                  {branchList.map(branch => (
                    <div key={branch.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{branch.name}</h3>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <div className="flex items-start">
                              <MapPin className="h-3 w-3 mt-1 mr-2 flex-shrink-0" />
                              <span>{branch.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span>{branch.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span>{branch.openTime} - {branch.closeTime}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditBranch(branch)}
                        >
                          Chỉnh sửa
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>Thiết lập cách bạn nhận thông báo từ hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="emailNotifications">Thông báo qua email</Label>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <MailIcon className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="smsNotifications">Thông báo qua SMS</Label>
                  </div>
                  <Switch 
                    id="smsNotifications" 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="appointmentReminders">Nhắc nhở lịch hẹn</Label>
                  </div>
                  <Switch 
                    id="appointmentReminders" 
                    checked={notificationSettings.appointmentReminders}
                    onCheckedChange={(checked) => handleNotificationChange('appointmentReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="marketingEmails">Email marketing</Label>
                  </div>
                  <Switch 
                    id="marketingEmails" 
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="systemUpdates">Cập nhật hệ thống</Label>
                  </div>
                  <Switch 
                    id="systemUpdates" 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thanh toán</CardTitle>
                <CardDescription>Quản lý các phương thức thanh toán được chấp nhận</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="acceptCash">Chấp nhận thanh toán tiền mặt</Label>
                  </div>
                  <Switch 
                    id="acceptCash" 
                    checked={paymentSettings.acceptCash}
                    onCheckedChange={(checked) => handlePaymentSettingChange('acceptCash', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="acceptCard">Chấp nhận thanh toán thẻ</Label>
                  </div>
                  <Switch 
                    id="acceptCard" 
                    checked={paymentSettings.acceptCard}
                    onCheckedChange={(checked) => handlePaymentSettingChange('acceptCard', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="acceptBankTransfer">Chấp nhận chuyển khoản ngân hàng</Label>
                  </div>
                  <Switch 
                    id="acceptBankTransfer" 
                    checked={paymentSettings.acceptBankTransfer}
                    onCheckedChange={(checked) => handlePaymentSettingChange('acceptBankTransfer', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="acceptMomo">Chấp nhận thanh toán MoMo</Label>
                  </div>
                  <Switch 
                    id="acceptMomo" 
                    checked={paymentSettings.acceptMomo}
                    onCheckedChange={(checked) => handlePaymentSettingChange('acceptMomo', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="acceptZaloPay">Chấp nhận thanh toán ZaloPay</Label>
                  </div>
                  <Switch 
                    id="acceptZaloPay" 
                    checked={paymentSettings.acceptZaloPay}
                    onCheckedChange={(checked) => handlePaymentSettingChange('acceptZaloPay', checked)}
                  />
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="vatRate">Thuế VAT (%)</Label>
                  <Input 
                    id="vatRate" 
                    type="number" 
                    className="w-32"
                    value={paymentSettings.vatRate}
                    onChange={(e) => handlePaymentSettingChange('vatRate', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật</CardTitle>
                <CardDescription>Thiết lập bảo mật cho tài khoản của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <div className="flex">
                    <Lock className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="current-password" type="password" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <div className="flex">
                    <Lock className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="new-password" type="password" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                  <div className="flex">
                    <Lock className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="pt-6">
                  <Button className="bg-spa-800 hover:bg-spa-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Đổi mật khẩu
                  </Button>
                </div>
                
                <div className="pt-6 border-t mt-6">
                  <h3 className="font-medium text-lg mb-4">Bảo mật 2 lớp</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="two-factor">Bật xác thực hai yếu tố</Label>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Xác thực hai yếu tố sẽ yêu cầu mã xác thực từ điện thoại của bạn mỗi khi đăng nhập.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;

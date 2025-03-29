
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Edit, 
  Trash, 
  CheckCircle,
  XCircle,
  Store
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { branches as initialBranches } from '@/data/branches';
import { useToast } from '@/hooks/use-toast';
import { Branch } from '@/types/branch';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Branches = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
  
  const [formData, setFormData] = useState<Branch>({
    id: '',
    name: '',
    address: '',
    phone: '',
    openTime: '09:00',
    closeTime: '21:00',
    image: ''
  });

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBranch = () => {
    // Reset form data
    setFormData({
      id: `${branches.length + 1}`,
      name: '',
      address: '',
      phone: '',
      openTime: '09:00',
      closeTime: '21:00',
      image: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({...branch});
    setIsAddDialogOpen(true);
  };

  const handleDeletePrompt = (branch: Branch) => {
    setBranchToDelete(branch);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteBranch = () => {
    if (branchToDelete) {
      setBranches(branches.filter(b => b.id !== branchToDelete.id));
      toast({
        title: "Chi nhánh đã được xóa",
        description: `Chi nhánh ${branchToDelete.name} đã được xóa thành công.`,
      });
      setIsDeleteDialogOpen(false);
      setBranchToDelete(null);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveBranch = () => {
    if (editingBranch) {
      // Update existing branch
      setBranches(branches.map(branch => 
        branch.id === editingBranch.id ? formData : branch
      ));
      toast({
        title: "Chi nhánh đã được cập nhật",
        description: `Chi nhánh ${formData.name} đã được cập nhật thành công.`,
      });
    } else {
      // Add new branch
      setBranches([...branches, formData]);
      toast({
        title: "Chi nhánh mới đã được thêm",
        description: `Chi nhánh ${formData.name} đã được thêm thành công.`,
      });
    }
    setIsAddDialogOpen(false);
    setEditingBranch(null);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold">Quản lý chi nhánh</h1>
            <p className="text-gray-500">Quản lý tất cả chi nhánh của SerenitySpa</p>
          </div>
          <Button className="bg-spa-800 hover:bg-spa-700" onClick={handleAddBranch}>
            <Plus size={18} className="mr-2" />
            Thêm chi nhánh
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Tìm kiếm chi nhánh theo tên hoặc địa chỉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  {branch.image && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={branch.image} 
                        alt={branch.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{branch.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-gray-500" />
                        <span className="text-gray-600">{branch.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
                        <span className="text-gray-600">{branch.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
                        <span className="text-gray-600">{branch.openTime} - {branch.closeTime}</span>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditBranch(branch)}
                        >
                          <Edit size={16} className="mr-1" />
                          Sửa
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeletePrompt(branch)}
                        >
                          <Trash size={16} className="mr-1" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
              <Store size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Không tìm thấy chi nhánh</h3>
              <p className="text-gray-500 mt-1">
                Không có chi nhánh nào khớp với tìm kiếm của bạn.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Branch Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingBranch ? 'Chỉnh sửa chi nhánh' : 'Thêm chi nhánh mới'}
            </DialogTitle>
            <DialogDescription>
              {editingBranch 
                ? 'Cập nhật thông tin chi nhánh hiện tại' 
                : 'Điền thông tin để thêm chi nhánh mới vào hệ thống'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Tên chi nhánh</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="SerenitySpa Quận 1"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Địa chỉ</label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="123 Nguyễn Huệ, Quận 1, TP.HCM"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Số điện thoại</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="028 1234 5678"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="openTime" className="text-sm font-medium">Giờ mở cửa</label>
                <Input
                  id="openTime"
                  name="openTime"
                  type="time"
                  value={formData.openTime}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="closeTime" className="text-sm font-medium">Giờ đóng cửa</label>
                <Input
                  id="closeTime"
                  name="closeTime"
                  type="time"
                  value={formData.closeTime}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Ảnh chi nhánh (URL)</label>
              <Input
                id="image"
                name="image"
                value={formData.image || ''}
                onChange={handleFormChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
            <Button className="bg-spa-800 hover:bg-spa-700" onClick={handleSaveBranch}>
              {editingBranch ? 'Cập nhật' : 'Thêm chi nhánh'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa chi nhánh</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa chi nhánh {branchToDelete?.name}? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex items-center"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Hủy
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteBranch}
              className="flex items-center"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Branches;

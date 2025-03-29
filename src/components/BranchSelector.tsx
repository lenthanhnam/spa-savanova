
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Branch } from '@/types/branch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface BranchSelectorProps {
  branches: Branch[];
  selectedBranch?: Branch;
  onSelectBranch: (branch: Branch) => void;
  className?: string;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({
  branches,
  selectedBranch,
  onSelectBranch,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<Branch | undefined>(selectedBranch || branches[0]);

  const handleSelectBranch = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setCurrentBranch(branch);
      onSelectBranch(branch);
    }
  };

  const handleViewAllBranches = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b flex items-center">
        <MapPin className="mr-2 h-5 w-5 text-spa-700" />
        <h2 className="text-xl font-serif font-bold text-spa-900">Chọn chi nhánh</h2>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <Select 
            value={currentBranch?.id} 
            onValueChange={handleSelectBranch}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn chi nhánh" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {currentBranch && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-spa-50 rounded-lg p-4"
          >
            <h3 className="font-medium text-lg mb-2">{currentBranch.name}</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <span>{currentBranch.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{currentBranch.phone}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{currentBranch.openTime} - {currentBranch.closeTime}</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <Button 
          variant="outline" 
          onClick={handleViewAllBranches}
          className="w-full mt-4"
        >
          {isExpanded ? "Thu gọn" : "Xem tất cả chi nhánh"}
        </Button>
        
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {branches.map(branch => (
              <div 
                key={branch.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  currentBranch?.id === branch.id ? 'border-spa-700 bg-spa-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelectBranch(branch.id)}
              >
                <h3 className="font-medium">{branch.name}</h3>
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
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BranchSelector;

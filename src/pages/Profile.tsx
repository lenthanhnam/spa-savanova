
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, PenSquare, Camera, Save, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User as UserType } from '@/types/branch';

const MOCK_USER: UserType = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'customer',
  phone: '123-456-7890',
  address: '123 Main St, Anytown, CA 12345',
  joinDate: '2023-01-15',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
};

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        // Fallback to mock user if JSON is invalid
        setUser(MOCK_USER);
      }
    } else {
      // Use mock data for demo
      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          name,
          phone,
          address
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast({
          title: 'Profile Updated',
          description: 'Your profile information has been saved successfully.',
        });
        
        setIsEditing(false);
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/signin');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-spa-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-spa-100"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-spa-100 flex items-center justify-center">
                        <UserRound size={64} className="text-spa-600" />
                      </div>
                    )}
                    <button className="absolute bottom-0 right-0 bg-spa-800 text-white p-2 rounded-full hover:bg-spa-700 transition">
                      <Camera size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-500 capitalize">{user.role}</p>
                  <p className="text-sm text-gray-500 mt-1">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
                </div>

                <div className="mt-6 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={handleLogout}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="orders">Orders & Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleEditToggle}
                      disabled={isLoading}
                    >
                      {isEditing ? (
                        <>Cancel</>
                      ) : (
                        <>
                          <PenSquare className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{user.name}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="p-2 border rounded-md bg-gray-50">{user.email}</div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input 
                            id="phone" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{user.phone || 'Not provided'}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Account Type</Label>
                        <div className="p-2 border rounded-md bg-gray-50 capitalize">{user.role}</div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        {isEditing ? (
                          <Input 
                            id="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{user.address || 'Not provided'}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button 
                        onClick={handleSave} 
                        className="ml-auto bg-spa-800 hover:bg-spa-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Orders & Bookings</CardTitle>
                    <CardDescription>View your purchase history and appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-center py-10 text-gray-500">
                      <div className="text-center">
                        <p>You don't have any orders or bookings yet.</p>
                        <Button 
                          variant="outline" 
                          className="mt-4 bg-spa-50 text-spa-800 hover:bg-spa-100"
                          onClick={() => navigate('/booking')}
                        >
                          Book an Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

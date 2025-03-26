
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, hardcoded credentials
      if (email === 'admin@example.com' && password === 'password') {
        toast({
          title: 'Success',
          description: 'Signed in as Admin',
        });
        navigate('/admin/dashboard');
      } else if (email === 'manager@example.com' && password === 'password') {
        toast({
          title: 'Success',
          description: 'Signed in as Manager',
        });
        navigate('/manager/dashboard');
      } else if (email === 'user@example.com' && password === 'password') {
        toast({
          title: 'Success',
          description: 'Welcome back!',
        });
        navigate('/profile');
      } else {
        toast({
          title: 'Error',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-serif font-bold text-spa-800">SerenitySpa</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-serif font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/register" className="font-medium text-spa-700 hover:text-spa-600">
              create a new account
            </Link>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white py-8 px-6 shadow-sm rounded-xl border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-spa-700 hover:text-spa-600">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label 
                  htmlFor="remember-me" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me for 30 days
                </Label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-spa-800 hover:bg-spa-700 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Demo Accounts
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 gap-3 text-sm">
                  <div className="text-gray-600 text-center space-y-2">
                    <p>For demo purposes, you can use the following credentials:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs bg-gray-50 p-2 rounded-md">
                      <div>
                        <p className="font-medium">Admin:</p>
                        <p>admin@example.com</p>
                        <p className="text-gray-500">password</p>
                      </div>
                      <div>
                        <p className="font-medium">Manager:</p>
                        <p>manager@example.com</p>
                        <p className="text-gray-500">password</p>
                      </div>
                      <div>
                        <p className="font-medium">Customer:</p>
                        <p>user@example.com</p>
                        <p className="text-gray-500">password</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;

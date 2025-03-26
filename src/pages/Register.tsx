
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { id: "length", label: "At least 8 characters", validator: (p: string) => p.length >= 8 },
    { id: "uppercase", label: "At least 1 uppercase letter", validator: (p: string) => /[A-Z]/.test(p) },
    { id: "lowercase", label: "At least 1 lowercase letter", validator: (p: string) => /[a-z]/.test(p) },
    { id: "number", label: "At least 1 number", validator: (p: string) => /\d/.test(p) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Check if password meets all requirements
    const validPassword = passwordRequirements.every(req => req.validator(password));
    if (!validPassword) {
      toast({
        title: "Error",
        description: "Password does not meet all requirements",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account created",
        description: "You've successfully registered. Welcome to SerenitySpa!",
      });
      navigate("/signin");
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
          <h2 className="mt-6 text-2xl font-serif font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-spa-700 hover:text-spa-600">
              Sign in
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              
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
                <Label htmlFor="password">Password</Label>
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
                
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((requirement) => (
                    <div 
                      key={requirement.id} 
                      className="flex items-center space-x-2 text-xs"
                    >
                      <CheckCircle2 
                        className={`h-4 w-4 ${
                          password && requirement.validator(password) 
                            ? 'text-green-500' 
                            : 'text-gray-300'
                        }`} 
                      />
                      <span className={password && requirement.validator(password) ? 'text-green-700' : 'text-gray-500'}>
                        {requirement.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pr-10 ${
                      confirmPassword && password !== confirmPassword 
                        ? 'border-red-300 focus:border-red-300 focus-visible:ring-red-300' 
                        : ''
                    }`}
                    required
                  />
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-spa-800 hover:bg-spa-700 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-6">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-spa-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-spa-700">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

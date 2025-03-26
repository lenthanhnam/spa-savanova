
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex justify-center items-center w-24 h-24 bg-spa-100 rounded-full mb-8">
          <span className="text-spa-800 text-5xl font-serif">404</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-spa-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Link to="/">
            <Button className="bg-spa-800 hover:bg-spa-700 text-white flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

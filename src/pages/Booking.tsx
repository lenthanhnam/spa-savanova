
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import AppointmentBooking from '@/components/AppointmentBooking';
import BranchSelector from '@/components/BranchSelector';
import { branches } from '@/data/branches';
import { Branch } from '@/types/branch';
import { useToast } from '@/hooks/use-toast';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Booking = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);

  useEffect(() => {
    // Simulate loading of booking data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    toast({
      title: "Chi nhánh đã được chọn",
      description: `Bạn đã chọn chi nhánh ${branch.name}`,
    });
  };

  // Benefits of booking with us
  const benefits = [
    "Instant confirmation of your appointment",
    "Email and SMS reminders before your session",
    "Easily reschedule or cancel if needed",
    "Free consultation with every booking",
    "Earn loyalty points for each visit"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-4xl md:text-5xl font-serif font-bold text-spa-900 mb-6"
            >
              Book Your Appointment
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-lg text-gray-600"
            >
              Schedule your perfect spa experience with our easy online booking system.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="sticky top-24">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-spa-900 mb-6">
                  Why Book With Us?
                </h2>
                <p className="text-gray-600 mb-8">
                  Our streamlined booking process ensures a hassle-free experience from the moment you schedule to when you arrive for your appointment.
                </p>
                
                <BranchSelector 
                  branches={branches}
                  selectedBranch={selectedBranch}
                  onSelectBranch={handleSelectBranch}
                  className="mb-8"
                />
                
                <div className="bg-spa-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-medium text-spa-800 mb-4">Booking Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-spa-700 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-spa-800 text-white rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-medium">Availability Update</h3>
                  </div>
                  <p className="text-spa-100 mb-3">
                    Our weekend appointments typically fill up 5-7 days in advance. Book early to secure your preferred time slot.
                  </p>
                  <p className="text-spa-100 text-sm">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ duration: 0.7 }}
              className="min-h-[700px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[700px]">
                  <div className="w-12 h-12 border-4 border-spa-200 border-t-spa-800 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>
                  <AppointmentBooking branchId={selectedBranch.id} />
                  
                  <div className="mt-8 bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
                    <p className="font-medium">Cancellation Policy:</p>
                    <p className="mt-1">
                      Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment. 
                      Late cancellations may be subject to a fee of 50% of the service price.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-spa-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "How early should I arrive for my appointment?",
                  answer: "We recommend arriving 15-20 minutes before your scheduled appointment time. This allows you to complete any necessary paperwork, change into a robe if needed, and begin to relax before your treatment."
                },
                {
                  question: "What should I wear during my treatment?",
                  answer: "You'll be provided with disposable undergarments and a robe. During treatments, you'll be professionally draped to ensure your comfort and privacy at all times."
                },
                {
                  question: "Can I request a specific therapist?",
                  answer: "Yes, you can request a specific therapist when booking your appointment. If your preferred therapist is not available, we'll suggest alternative options."
                },
                {
                  question: "How do I prepare for my first visit?",
                  answer: "Avoid eating a heavy meal or consuming alcohol before your treatment. We also recommend avoiding sunbathing or shaving immediately before certain treatments."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-spa-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;

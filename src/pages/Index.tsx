
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard, { ServiceCardProps } from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import AppointmentBooking from '@/components/AppointmentBooking';
import AIConsultationChat from '@/components/AIConsultationChat';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Sample featured services data
const featuredServices: ServiceCardProps[] = [
  {
    id: '1',
    title: 'Swedish Massage',
    description: 'Our signature massage uses gentle to firm pressure to release tension, ease muscle pain, and promote relaxation.',
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop',
    price: '$85',
    duration: '60 min',
    slug: 'swedish-massage'
  },
  {
    id: '2',
    title: 'Hydrating Facial',
    description: 'Restore moisture and radiance to dry, dehydrated skin with our nourishing facial treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
    price: '$95',
    duration: '75 min',
    slug: 'hydrating-facial'
  },
  {
    id: '3',
    title: 'Hot Stone Therapy',
    description: 'Smooth, heated basalt stones and aromatic oils relieve deep muscle tension and improve circulation.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044&auto=format&fit=crop',
    price: '$110',
    duration: '90 min',
    slug: 'hot-stone-therapy'
  }
];

// Sample testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular Client',
    content: 'The AI consultation was spot on! It recommended the perfect treatment for my skin concerns. Absolutely loved the experience.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5
  },
  {
    name: 'Michael Chang',
    role: 'First-time Visitor',
    content: "Booking was incredibly easy and the hot stone massage was life-changing. I've already scheduled my next appointment!",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Monthly Member',
    content: 'The staff is amazing and the facilities are impeccable. My monthly facials have transformed my skin completely.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4
  }
];

const benefits = [
  {
    title: 'AI-Powered Skin Analysis',
    description: 'Our advanced AI system analyzes your skin and recommends personalized treatments.'
  },
  {
    title: 'Luxury Experience',
    description: 'Premium facilities designed for maximum comfort and ultimate relaxation.'
  },
  {
    title: 'Expert Therapists',
    description: 'Highly trained professionals with years of experience in spa therapies.'
  },
  {
    title: 'Online Booking',
    description: 'Easy appointment scheduling with real-time availability.'
  }
];

const Home = () => {
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-spa-900/70 to-spa-800/50"></div>
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
            alt="Spa background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium tracking-wider"
              >
                LUXURY SPA EXPERIENCE
              </motion.span>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white"
              >
                Discover True <span className="text-spa-100">Serenity</span> for Body and Mind
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-white/80 text-lg max-w-lg"
              >
                Experience the perfect blend of traditional techniques and modern AI-driven innovations for ultimate relaxation and rejuvenation.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link to="/booking">
                  <Button size="lg" className="bg-spa-700 hover:bg-spa-600 text-white">
                    Book Appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => setShowAIChat(!showAIChat)}
                >
                  AI Consultation
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* AI Chat Popup */}
      {showAIChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-md"
        >
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute -top-3 -right-3 bg-white rounded-full shadow-md z-10"
              onClick={() => setShowAIChat(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
            <AIConsultationChat />
          </div>
        </motion.div>
      )}
      
      {/* Featured Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4">Our Featured Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Indulge in our most popular treatments, designed to provide the ultimate spa experience tailored to your needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="border-spa-700 text-spa-800 hover:bg-spa-50">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* AI Consultation Feature */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-spa-700 font-medium text-sm tracking-wider">AI-POWERED SKINCARE</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mt-2 mb-6">Personalized Consultations with Our AI Assistant</h2>
              <p className="text-gray-600 mb-8">
                Our advanced AI system analyses your skin type and concerns to recommend personalized treatments tailored specifically to you. Get expert advice before booking your appointment.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex">
                    <CheckCircle className="h-6 w-6 text-spa-700 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-spa-900">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="bg-spa-800 hover:bg-spa-700 text-white"
                onClick={() => setShowAIChat(true)}
              >
                Start AI Consultation
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-2xl overflow-hidden shadow-lg relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop" 
                alt="AI Skin Consultation" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-spa-900/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-xl font-medium mb-2">AI Skin Analysis</h3>
                  <p className="text-white/80 text-sm">Advanced technology for precise skincare recommendations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Booking & Appointment */}
      <section className="py-16 md:py-24 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <AppointmentBooking />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <span className="text-spa-700 font-medium text-sm tracking-wider">EASY SCHEDULING</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mt-2 mb-6">Book Your Appointment in Minutes</h2>
              <p className="text-gray-600 mb-6">
                Our streamlined booking system makes it easy to schedule your perfect spa day. Choose from our range of services, select your preferred date and time, and confirm your appointment instantly.
              </p>
              <p className="text-gray-600 mb-8">
                Need help deciding which treatment is right for you? Start an AI consultation to receive personalized recommendations before booking.
              </p>
              
              <Link to="/booking">
                <Button className="bg-spa-800 hover:bg-spa-700 text-white">
                  View All Available Slots
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our satisfied clients have to say about their experience at SerenitySpa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-spa-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Experience True Relaxation?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-spa-100">
            Book your appointment today and discover why our clients keep coming back. Whether you're looking for relaxation, rejuvenation, or a little self-care, we have the perfect treatment for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className="bg-white text-spa-800 hover:bg-spa-100">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 hover:bg-white/10"
              onClick={() => setShowAIChat(true)}
            >
              Get AI Recommendations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

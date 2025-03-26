
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ServiceCard, { ServiceCardProps } from '@/components/ServiceCard';

// Sample data for all services
const allServices: ServiceCardProps[] = [
  {
    id: '1',
    title: 'Swedish Massage',
    description: 'Our signature massage uses gentle to firm pressure to release tension, ease muscle pain, and promote relaxation.',
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop',
    price: '$85',
    duration: '60 min',
    slug: 'swedish-massage',
    category: 'massage'
  },
  {
    id: '2',
    title: 'Deep Tissue Massage',
    description: 'Targets deeper layers of muscle and connective tissue to address chronic pain and tension.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop',
    price: '$95',
    duration: '60 min',
    slug: 'deep-tissue-massage',
    category: 'massage'
  },
  {
    id: '3',
    title: 'Hot Stone Therapy',
    description: 'Smooth, heated basalt stones and aromatic oils relieve deep muscle tension and improve circulation.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044&auto=format&fit=crop',
    price: '$110',
    duration: '90 min',
    slug: 'hot-stone-therapy',
    category: 'massage'
  },
  {
    id: '4',
    title: 'Aromatherapy Massage',
    description: 'Essential oils are used to enhance the therapeutic benefits of massage, promoting relaxation and mood improvement.',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop',
    price: '$90',
    duration: '60 min',
    slug: 'aromatherapy-massage',
    category: 'massage'
  },
  {
    id: '5',
    title: 'Hydrating Facial',
    description: 'Restore moisture and radiance to dry, dehydrated skin with our nourishing facial treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
    price: '$95',
    duration: '75 min',
    slug: 'hydrating-facial',
    category: 'facial'
  },
  {
    id: '6',
    title: 'Anti-Aging Facial',
    description: 'Target fine lines and wrinkles with advanced ingredients that promote collagen production and skin elasticity.',
    imageUrl: 'https://images.unsplash.com/photo-1598447066783-76ae6fc62c5c?q=80&w=2070&auto=format&fit=crop',
    price: '$120',
    duration: '90 min',
    slug: 'anti-aging-facial',
    category: 'facial'
  },
  {
    id: '7',
    title: 'Purifying Facial',
    description: 'Deep cleanse and detoxify congested skin to clear blemishes and prevent future breakouts.',
    imageUrl: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=2070&auto=format&fit=crop',
    price: '$90',
    duration: '60 min',
    slug: 'purifying-facial',
    category: 'facial'
  },
  {
    id: '8',
    title: 'Body Scrub & Wrap',
    description: 'Exfoliate and nourish the skin with our luxurious scrub, followed by a hydrating body wrap.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    price: '$120',
    duration: '90 min',
    slug: 'body-scrub-wrap',
    category: 'body'
  },
  {
    id: '9',
    title: 'Deluxe Manicure & Pedicure',
    description: 'Pamper your hands and feet with our deluxe treatment including exfoliation, masks, and massage.',
    imageUrl: 'https://images.unsplash.com/photo-1610992235683-e39abbf98d5a?q=80&w=2070&auto=format&fit=crop',
    price: '$80',
    duration: '90 min',
    slug: 'deluxe-mani-pedi',
    category: 'beauty'
  }
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'massage', name: 'Massage Therapy' },
  { id: 'facial', name: 'Facial Treatments' },
  { id: 'body', name: 'Body Treatments' },
  { id: 'beauty', name: 'Beauty Services' }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = allServices.filter(service => {
    // Filter by category
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    
    // Filter by search query
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold text-spa-900 mb-6"
            >
              Our Spa Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              Discover our range of treatments designed to rejuvenate your body and mind.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-6 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id ? "bg-spa-800 hover:bg-spa-700" : ""}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600 mb-4">No services found matching your search.</h3>
              <Button onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
                View all services
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Book Section */}
      <section className="py-16 md:py-20 bg-spa-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Experience Our Services?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-spa-100">
            Book your appointment today and let our expert therapists help you achieve the relaxation and rejuvenation you deserve.
          </p>
          <Link to="/booking">
            <Button size="lg" className="bg-white text-spa-800 hover:bg-spa-100">
              Book Your Appointment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

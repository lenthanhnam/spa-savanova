
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Heart } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const About = () => {
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
              About SerenitySpa
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-lg text-gray-600"
            >
              Where traditional techniques meet modern innovations for the ultimate relaxation experience.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, SerenitySpa began with a simple mission: to create a sanctuary where guests could escape the stresses of everyday life and find true relaxation.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Dr. Elena Chen, combined her background in traditional Eastern medicine with modern wellness practices to create a unique approach to spa therapy that treats both body and mind.
              </p>
              <p className="text-gray-600">
                Over the years, we've grown from a small studio to a full-service luxury spa, but our commitment to personalized care and holistic wellness remains at the heart of everything we do.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044&auto=format&fit=crop" 
                alt="SerenitySpa founder" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-spa-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at SerenitySpa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-spa-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-spa-800 h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-spa-900 mb-3">Holistic Wellness</h3>
              <p className="text-gray-600">We believe in treating the whole person—mind, body, and spirit—for complete wellness.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-spa-100 rounded-full flex items-center justify-center mb-6">
                <Award className="text-spa-800 h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-spa-900 mb-3">Excellence</h3>
              <p className="text-gray-600">We maintain the highest standards in every aspect of our service and facility.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-spa-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-spa-800 h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-spa-900 mb-3">Community</h3>
              <p className="text-gray-600">We create meaningful connections and support the community around us.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-spa-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-spa-800 h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-spa-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">We prioritize eco-friendly practices and products in all our operations.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-spa-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our highly skilled professionals are dedicated to providing you with the best spa experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Elena Chen",
                role: "Founder & Director",
                image: "https://randomuser.me/api/portraits/women/22.jpg",
                bio: "With over 20 years of experience in wellness and integrative medicine."
              },
              {
                name: "Marcus Johnson",
                role: "Head Massage Therapist",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "Specialized in deep tissue and therapeutic massage techniques."
              },
              {
                name: "Sophia Rodriguez",
                role: "Skincare Specialist",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                bio: "Expert in advanced facial treatments and skin analysis."
              },
              {
                name: "James Wilson",
                role: "Wellness Consultant",
                image: "https://randomuser.me/api/portraits/men/52.jpg",
                bio: "Helps design personalized wellness programs for our clients."
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-spa-900">{member.name}</h3>
                <p className="text-spa-700 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

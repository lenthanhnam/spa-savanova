
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Sample services data
const services = [
  { id: 1, name: 'Swedish Massage', duration: '60 min' },
  { id: 2, name: 'Deep Tissue Massage', duration: '90 min' },
  { id: 3, name: 'Hot Stone Therapy', duration: '75 min' },
  { id: 4, name: 'Aromatherapy Facial', duration: '60 min' },
  { id: 5, name: 'Deluxe Manicure & Pedicure', duration: '90 min' },
  { id: 6, name: 'Body Scrub & Wrap', duration: '120 min' },
];

interface AppointmentBookingProps {
  branchId?: string; // Add the branchId prop
  simplified?: boolean;
}

const AppointmentBooking = ({ branchId, simplified = false }: AppointmentBookingProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [service, setService] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Appointment Booked',
      description: `Your appointment for ${service} on ${date ? format(date, 'PPP') : ''} at ${timeSlot} has been confirmed at branch #${branchId}.`,
      variant: 'default',
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && !service) {
      toast({
        title: 'Service Required',
        description: 'Please select a service to continue.',
        variant: 'destructive',
      });
      return;
    }
    
    if (currentStep === 2 && !date) {
      toast({
        title: 'Date Required',
        description: 'Please select a date to continue.',
        variant: 'destructive',
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden ${simplified ? 'p-6' : 'p-8'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!simplified && (
        <div className="mb-6">
          <h3 className="text-xl font-serif text-spa-800 mb-2">Book Your Appointment</h3>
          <p className="text-gray-500 text-sm">Schedule your spa experience in a few simple steps</p>
        </div>
      )}
      
      {!simplified && (
        <div className="flex mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 relative">
              <div className={`h-1 ${step <= currentStep ? 'bg-spa-700' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                step < currentStep 
                  ? 'bg-spa-700 text-white' 
                  : step === currentStep 
                    ? 'bg-spa-700 text-white border-2 border-spa-100' 
                    : 'bg-gray-200 text-gray-400'
              }`}>
                {step}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <Label htmlFor="service">Select Service</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Spa Services</SelectLabel>
                    {services.map((svc) => (
                      <SelectItem key={svc.id} value={svc.name}>
                        <div className="flex justify-between items-center">
                          <span>{svc.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({svc.duration})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {!simplified && (
              <div className="flex justify-end mt-6">
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-spa-800 hover:bg-spa-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {!simplified && (
              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-spa-800 hover:bg-spa-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <Label htmlFor="time">Select Time</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Choose a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Time Slots</SelectLabel>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {simplified ? (
              <Button 
                type="submit" 
                className="w-full bg-spa-800 hover:bg-spa-700 mt-4"
                disabled={!service || !date || !timeSlot}
              >
                Book Now
              </Button>
            ) : (
              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-spa-800 hover:bg-spa-700"
                  disabled={!timeSlot}
                >
                  Confirm Booking
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {simplified && (
          <div className="flex flex-col mt-4 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={!service}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <Select value={timeSlot} onValueChange={setTimeSlot} disabled={!date}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Time Slots</SelectLabel>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button 
              type="submit" 
              className="w-full bg-spa-800 hover:bg-spa-700 mt-2"
              disabled={!service || !date || !timeSlot}
            >
              Book Now
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default AppointmentBooking;

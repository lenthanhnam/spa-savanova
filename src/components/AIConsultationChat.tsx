
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Mock AI consultation data
const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI skin care consultant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const AIConsultationChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const mockResponses = [
        "Based on what you've described, it sounds like you might benefit from our Hydrating Facial Treatment. It's specifically designed for dry skin types and includes deep moisturizing ingredients like hyaluronic acid and natural oils.",
        "For stress relief, I'd recommend our Aromatherapy Massage. The essential oils we use can help reduce anxiety and promote relaxation. Would you like more details about this service?",
        "Your symptoms might indicate sensitive skin. Our Gentle Rejuvenation treatment is perfect for sensitive skin types as it avoids harsh ingredients and focuses on calming botanicals."
      ];
      
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="bg-spa-800 text-white px-6 py-4">
        <h3 className="text-lg font-medium flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          AI Skin Care Consultant
        </h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                  {message.sender === 'user' ? (
                    <AvatarFallback className="bg-spa-100 text-spa-700">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-spa-700 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div 
                  className={`py-2 px-4 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-spa-700 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-spa-700 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="py-2 px-4 rounded-2xl bg-gray-100 text-gray-800">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-spa-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-spa-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-spa-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </AnimatePresence>
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask about skin concerns, treatments, or recommendations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px] resize-none"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="bg-spa-800 hover:bg-spa-700 text-white"
            disabled={isTyping || !input.trim()}
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIConsultationChat;

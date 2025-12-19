
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom of messages when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { message: input }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      toast({
        title: "Error",
        description: "Failed to get response from chatbot. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-ocean-600 hover:bg-ocean-700 shadow-lg z-50 flex items-center justify-center"
        aria-label="Chat with us"
      >
        {!isOpen ? <MessageCircle className="h-6 w-6" /> : <X className="h-6 w-6" />}
      </Button>

      {/* Chatbot panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 text-white px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <h3 className="font-semibold">Sunset Vallarta concierge ✨</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-ocean-700/50 h-8 w-8 p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto h-80 bg-slate-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-10 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                <p className="font-medium mb-2">Welcome to Sunset Vallarta!</p>
                <p>I can help with tours, accommodations, local tips, and more. What would you like to know about Puerto Vallarta?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 p-3 rounded-lg max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'ml-auto bg-ocean-100 text-gray-800 rounded-tr-none' 
                      : 'mr-auto bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            {isLoading && (
              <div className="mr-auto mb-3 p-3 rounded-lg bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-ocean-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-ocean-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-ocean-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex gap-2 bg-white">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 min-h-[40px] max-h-[120px] resize-none py-2"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) handleSendMessage();
                }
              }}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="bg-ocean-600 hover:bg-ocean-700 h-10 w-10 self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

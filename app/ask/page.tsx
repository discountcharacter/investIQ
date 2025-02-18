"use client";

import { useState } from 'react';
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/ai/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      
      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Ask AI Assistant
          </h1>
          
          <ScrollArea className="h-[60vh] mb-4 p-4 rounded-lg border">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-4`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg flex gap-3 ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                    ) : (
                      <User className="h-5 w-5 mt-1 flex-shrink-0" />
                    )}
                    <div>{message.content}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              placeholder="Ask any finance question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <Button onClick={handleSend} disabled={loading}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
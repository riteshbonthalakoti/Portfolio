"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@heroui/react";

import { Card, CardContent } from "@/components/ui/card";

type Message = {
  type: "user" | "bot" | "suggestion";
  content: string;
  category?: string;
  progress?: number;
  isTyping?: boolean;
};

type PortfolioSection = {
  title: string;
  description: string;
  progress: number;
  tags: string[];
  keywords: string[];
};

const suggestionCategories = [
  { icon: "👨‍💻", label: "About Me", value: "about" },
  { icon: "💼", label: "Experience", value: "experience" },
  { icon: "🛠️", label: "Skills", value: "skills" },
  { icon: "🚀", label: "Projects", value: "projects" },
  { icon: "📧", label: "Contact", value: "contact" },
];

const portfolioInfo: Record<string, PortfolioSection> = {
  about: {
    title: "About Ritesh",
    description:
      "I'm Ritesh Bonthalakoti — an Electronics & Communication Engineering graduate from Visakhapatnam, India. I build at the intersection of AI, embedded hardware, and full-stack development. Currently an Embedded Software Engineer at Dharanova Pvt Ltd, I work on systems that bridge the physical and digital world.",
    progress: 95,
    tags: ["ECE Graduate", "AI Engineer", "Embedded Systems", "Visakhapatnam"],
    keywords: ["about", "who are you", "background", "bio", "yourself", "hi", "hello", "hey"],
  },
  experience: {
    title: "Professional Experience",
    description:
      "Currently at Dharanova Pvt Ltd (Embedded Software Engineer, Aug 2026–Present). Previously: Gratian Technologies (Embedded Intern), PUSULA International (AI & Hardware Engineer), LearnDepth LLP (Project Lead & ML Mentor), and Infosys Springboard 6.0 (built Helpdesk.ai). Also served as Head of Operations at Wission Axis.",
    progress: 90,
    tags: ["Dharanova", "Infosys", "PUSULA", "LearnDepth"],
    keywords: ["experience", "work", "job", "internship", "career", "employment", "company"],
  },
  skills: {
    title: "Technical Skills",
    description:
      "AI/ML: Python, TensorFlow, DistilBERT, LLMs. Embedded & IoT: ESP32, Arduino, Embedded C, MQTT, PCB Design. Full-Stack: React, Next.js, FastAPI, Node.js, Supabase, PostgreSQL, TypeScript. Tools: Git, Docker, Linux, Vercel.",
    progress: 88,
    tags: ["ESP32", "Python", "React", "FastAPI", "Arduino", "AI"],
    keywords: ["skills", "tech", "stack", "language", "framework", "tools", "python", "react", "c++", "ai", "hardware"],
  },
  projects: {
    title: "Projects",
    description:
      "Flagship projects include Helpdesk.ai — an enterprise B2B IT support platform with DistilBERT ticket triage; and SHEM — a Smart Home Energy Manager using ESP32 + Gemini AI that won 1st Prize. Also built RaceXplorer, Notiflow, and IoT home automation systems.",
    progress: 92,
    tags: ["Helpdesk.ai", "SHEM", "RaceXplorer", "IoT"],
    keywords: ["project", "portfolio", "built", "made", "creation", "app", "software", "hardware"],
  },
  contact: {
    title: "Contact & Links",
    description:
      "I'm always open to new opportunities and collaborations! Reach me at riteshbonthalakoti@gmail.com. Let's connect on LinkedIn (/in/riteshbonthalakoti) or check out my code on GitHub (@riteshbonthalakoti). Based in Visakhapatnam, India — available for remote work.",
    progress: 100,
    tags: ["Open to Work", "Remote-friendly", "Email", "LinkedIn"],
    keywords: ["contact", "email", "reach", "hire", "resume", "cv", "linkedin", "github", "social"],
  },
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "Hi there! 👋 I'm Ritesh's AI Assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const simulateBotResponse = (input: string, categoryPrefix?: string) => {
    setIsTyping(true);
    
    // Simulate network delay
    setTimeout(() => {
      const response = getBotResponse(input, categoryPrefix);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800); // Random delay between 1.2s and 2s
  };

  const handleSuggestionClick = (category: string) => {
    const info = portfolioInfo[category];
    if (!info) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: `Tell me about your ${category}` },
    ]);
    
    simulateBotResponse(category, category);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { type: "user" as const, content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    simulateBotResponse(userMessage.content);
  };

  const getBotResponse = (input: string, forcedCategory?: string): Message => {
    const lowercaseInput = input.toLowerCase();

    // If a suggestion button was clicked, we know the category
    if (forcedCategory && portfolioInfo[forcedCategory]) {
      const info = portfolioInfo[forcedCategory];
      return {
        type: "bot",
        content: info.description,
        category: forcedCategory,
        progress: info.progress,
      };
    }

    // Try to match keywords
    let bestMatch = null;
    let maxMatches = 0;

    for (const [categoryKey, info] of Object.entries(portfolioInfo)) {
      let matches = 0;
      for (const keyword of info.keywords) {
        if (lowercaseInput.includes(keyword)) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = categoryKey;
      }
    }

    if (bestMatch && maxMatches > 0) {
      const info = portfolioInfo[bestMatch];
      return {
        type: "bot",
        content: info.description,
        category: bestMatch,
        progress: info.progress,
      };
    }

    // Fallback response
    const fallbacks = [
      "I'm not quite sure about that. But I can tell you about my experience, skills, or projects!",
      "I might need a bit more context. Would you like to hear about my background or see my projects?",
      "That's an interesting question! While I don't have a specific answer for that, I'd love to share my technical skills or work experience with you.",
    ];
    
    return {
      type: "bot",
      content: fallbacks[Math.floor(Math.random() * fallbacks.length)],
    };
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 p-4 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all z-40 flex items-center justify-center group"
        initial={{ scale: 0.8, opacity: 0 }}
        aria-label="Open portfolio assistant"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] rounded-2xl bg-black/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden z-50 flex flex-col max-h-[85vh] h-[600px]"
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -z-10 rounded-full" />
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                    <span className="text-xl">🤖</span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-white tracking-wide">
                      AI Assistant
                    </h3>
                    <p className="text-xs text-white/50 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  aria-label="Close assistant"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.type === "bot" && (
                    <div className="flex gap-2 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center border border-primary/30 mt-auto">
                        <span className="text-sm">🤖</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {message.category ? (
                          <Card className="w-full bg-white/5 border-white/10 rounded-2xl rounded-bl-none overflow-hidden">
                            <CardContent className="p-4 space-y-3">
                              <h4 className="font-grotesk font-bold text-primary flex items-center gap-2">
                                {portfolioInfo[message.category].title}
                              </h4>
                              <p className="text-sm leading-relaxed text-white/90">{message.content}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {portfolioInfo[message.category].tags.map((tag) => (
                                  <Chip key={tag} size="sm" variant="flat" className="bg-primary/20 text-primary-foreground border border-primary/20">
                                    {tag}
                                  </Chip>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-none p-3 shadow-lg">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {message.type === "user" && (
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-none p-3 max-w-[80%] shadow-lg">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                >
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center border border-primary/30 mt-auto">
                      <span className="text-sm">🤖</span>
                    </div>
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-none p-4 shadow-lg flex items-center gap-1.5 h-11">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-1.5 h-1.5 bg-white/50 rounded-full" 
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-white/50 rounded-full" 
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-white/50 rounded-full" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Suggestions & Input Area */}
            <div className="border-t border-white/10 bg-black/80 backdrop-blur-xl flex flex-col">
              {/* Suggestions */}
              <div className="flex overflow-x-auto gap-2 p-3 pb-2 scrollbar-none hide-scrollbar mask-fade-edges">
                {suggestionCategories.map((category) => (
                  <motion.button
                    key={category.value}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-medium transition-colors whitespace-nowrap text-white/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestionClick(category.value)}
                    disabled={isTyping}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 pt-1">
                <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-full p-1 pl-4 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                  <input
                    className="flex-1 bg-transparent text-sm focus:outline-none text-white placeholder:text-white/30"
                    placeholder="Message AI Assistant..."
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    disabled={isTyping}
                  />
                  <motion.button
                    className={`p-2.5 rounded-full flex items-center justify-center transition-colors ${
                      inputValue.trim() && !isTyping 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                    whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
                    whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}
                    aria-label="Send message"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <svg
                      className="w-4 h-4 translate-x-[1px] -translate-y-[1px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

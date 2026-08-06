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
};

type PortfolioSection = {
  title: string;
  description: string;
  progress: number;
  tags: string[];
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
    description:
      "I'm Ritesh Bonthalakoti — an Electronics & Communication Engineering graduate from Visakhapatnam, India. I build at the intersection of AI, embedded hardware, and full-stack development. Currently an Embedded Software Engineer at Dharanova Pvt Ltd, I work on systems that bridge the physical and digital world — from ESP32 firmware to DistilBERT-powered enterprise platforms.",
    progress: 95,
    tags: ["ECE Graduate", "AI Engineer", "Embedded Systems", "Visakhapatnam"],
    title: "About Ritesh",
  },
  contact: {
    description:
      "Open to internships, collaborations, and project opportunities. Reach me at bonthalamadhavi1@gmail.com or connect on LinkedIn (ritesh1908) and GitHub (riteshbonthalakoti). Based in Visakhapatnam, India — available for remote work.",
    progress: 100,
    tags: ["Open to Work", "Remote-friendly", "Internships"],
    title: "Contact",
  },
  experience: {
    description:
      "Currently at Dharanova Pvt Ltd (Embedded Software Engineer, Aug 2026–Present). Previously: Gratian Technologies (Embedded Intern), PUSULA International (AI & Hardware Engineer), LearnDepth LLP (Project Lead & ML Mentor), and Infosys Springboard 6.0 (built Helpdesk.ai). Also served as Head of Operations at Wission Axis.",
    progress: 90,
    tags: ["Dharanova", "Infosys", "PUSULA", "LearnDepth"],
    title: "Professional Experience",
  },
  projects: {
    description:
      "Flagship projects include Helpdesk.ai — an enterprise B2B IT support platform with DistilBERT ticket triage and Gemini auto-resolution (Infosys Springboard); and SHEM — a Smart Home Energy Manager using ESP32 + Gemini AI that won 1st Prize (₹10,000). Also built RaceXplorer (1st Prize at district expo), Notiflow, and IoT home automation systems.",
    progress: 92,
    tags: ["Helpdesk.ai", "SHEM", "RaceXplorer", "IoT"],
    title: "Projects",
  },
  skills: {
    description:
      "AI/ML: Python, TensorFlow, DistilBERT, AutoML, LLMs, RAG, AI Agents. Embedded & IoT: ESP32, Arduino, Embedded C, MQTT, Edge ML, PCB Design, Verilog HDL. Full-Stack: React, Next.js, FastAPI, Node.js, Supabase, PostgreSQL, TypeScript. Tools: Git, Docker, Linux, Claude Code, Vercel, Arduino IDE.",
    progress: 88,
    tags: ["ESP32", "Python", "React", "FastAPI", "Arduino"],
    title: "Technical Skills",
  },
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: `Hi! I'm your portfolio assistant. What would you like to know about?`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (category: string) => {
    const info = portfolioInfo[category];

    if (!info) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: `Tell me about your ${category}` },
      {
        type: "bot",
        content: info.description,
        category: category,
        progress: info.progress,
      },
    ]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: "user" as const, content: inputValue };

    setMessages((prev) => [...prev, userMessage]);

    // Process the message and get response
    const response = getBotResponse(inputValue);

    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
    }, 500);

    setInputValue("");
  };

  const getBotResponse = (input: string): Message => {
    const lowercaseInput = input.toLowerCase();

    for (const [category, info] of Object.entries(portfolioInfo)) {
      if (lowercaseInput.includes(category)) {
        return {
          type: "bot",
          content: info.description,
          category: category,
          progress: info.progress,
        };
      }
    }

    return {
      type: "bot",
      content:
        "I can tell you about my experience, skills, projects, or how to contact me. What interests you?",
    };
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 p-3 md:p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all z-40"
        initial={{ scale: 0.8, opacity: 0 }}
        aria-label="Open portfolio assistant"
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-6 h-6"
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
            className="fixed bottom-20 right-4 md:bottom-24 md:right-8 w-[calc(100vw-2rem)] md:w-96 rounded-2xl bg-black/95 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden z-50 flex flex-col max-h-[80vh]"
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-grotesk font-bold">
                    Portfolio Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Ask me anything about my work
                  </p>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-background/50 transition-colors"
                  aria-label="Close assistant"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                >
                  {message.type === "bot" && message.category && (
                    <Card className="w-full">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-grotesk font-bold">
                            {portfolioInfo[message.category].title}
                          </h4>
                        </div>

                        <p className="text-sm">{message.content}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {portfolioInfo[message.category].tags.map((tag) => (
                            <Chip key={tag} variant="flat">
                              {tag}
                            </Chip>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {message.type === "bot" && !message.category && (
                    <div className="bg-white/10 border border-white/5 rounded-2xl p-4 max-w-[80%] shadow-lg">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  )}

                  {message.type === "user" && (
                    <div className="bg-primary text-primary-foreground rounded-2xl p-4 max-w-[80%] shadow-lg">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestionCategories.map((category) => (
                  <motion.button
                    key={category.value}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm transition-colors shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestionClick(category.value)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-md">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/40 shadow-inner"
                  placeholder="Ask me anything..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <motion.button
                  className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
                  onClick={handleSend}
                >
                  <svg
                    className="w-5 h-5"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

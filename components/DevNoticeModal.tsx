"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const DevNoticeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show only once per browser session (shows on reopen/new visit, hides on internal refresh)
    const dismissed = sessionStorage.getItem("devNoticeDismissed");
    
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("devNoticeDismissed", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-neutral-950/80 border border-white/10 p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            {/* Top Glass Shimmer Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Ambient Corner Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-44 h-44 bg-blue-500/10 blur-[60px] rounded-full" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 w-44 h-44 bg-emerald-500/10 blur-[60px] rounded-full" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Minimalist Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300 mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              ACTIVE STAGING • BUILD PREVIEW
            </div>

            {/* Heading & Content */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-bold font-grotesk tracking-tight text-white">
                Development Environment
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                This platform is undergoing active iteration. Modules, project assets, and API integrations are continuously deployed.
              </p>
            </div>

            {/* Glassmorphic Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="flex-1 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-mono text-xs py-2.5 px-4 rounded-xl border border-white/20 backdrop-blur-xl shadow-lg transition-all text-center"
              >
                Proceed to Site
              </button>

              <button
                onClick={handleClose}
                className="bg-transparent hover:bg-white/5 active:scale-[0.98] text-neutral-400 hover:text-white font-mono text-xs py-2.5 px-4 rounded-xl border border-white/10 transition-all text-center"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

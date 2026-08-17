"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor = ({ className }: CustomCursorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const isClickable = target.closest('button, a, input, textarea, [role="button"], [role="link"]');
      setIsPointer(!!isClickable);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <motion.div
        className={cn(
          "pointer-events-none z-[1000] mix-blend-difference will-change-transform",
          className,
        )}
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          opacity: isVisible ? 1 : 0,
          position: "fixed",
        }}
      >
        <div className="relative">
          {/* Main cursor */}
          <motion.div
            animate={{
              scale: isPointer ? 2 : 1,
              opacity: isPointer ? 0.5 : 1,
            }}
            className="w-8 h-8 bg-white rounded-full"
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
              mass: 0.5,
            }}
          />

          {/* Outer ring */}
          <motion.div
            animate={{
              scale: isPointer ? 1.5 : [1, 1.2, 1],
              opacity: isPointer ? 0.2 : 0.3,
            }}
            className="absolute inset-0 border border-white rounded-full"
            transition={
              isPointer
                ? { type: "spring", damping: 20, stiffness: 200, mass: 0.5 }
                : { duration: 2, repeat: Infinity }
            }
          />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }

        ::selection {
          background: rgba(255, 255, 255, 0.1);
          color: inherit;
        }
      `}</style>
    </>
  );
};

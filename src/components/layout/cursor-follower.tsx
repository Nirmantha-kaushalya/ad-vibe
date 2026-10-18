"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorFollower() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updateTouchState = () => setIsTouch(mediaQuery.matches);

    updateTouchState();
    mediaQuery.addEventListener("change", updateTouchState);

    const handleMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleHover = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    const targets = Array.from(document.querySelectorAll("a, button, [data-cursor]"));
    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleHover);
      target.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("pointermove", handleMove);

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleHover);
        target.removeEventListener("mouseleave", handleLeave);
      });
      window.removeEventListener("pointermove", handleMove);
      mediaQuery.removeEventListener("change", updateTouchState);
    };
  }, []);

  if (isTouch || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <motion.div
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 1.8 : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 24, mass: 0.2 }}
        className="absolute h-3 w-3 rounded-full border border-[var(--gold)] bg-[var(--gold)]/20"
      />
      <motion.div
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.9 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.2 }}
        className="absolute h-9 w-9 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/5"
      />
    </div>
  );
}

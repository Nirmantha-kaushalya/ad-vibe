"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ProjectArtwork } from "@/src/components/sections/project-artwork";

export function ParallaxArtwork() {
  const element = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: element, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={element}
      aria-hidden="true"
      className="absolute inset-0"
      style={reduceMotion ? undefined : { y }}
    >
      <ProjectArtwork variant="studio" className="group absolute inset-0 shadow-[0_24px_80px_rgba(35,59,53,0.18)]" />
    </motion.div>
  );
}

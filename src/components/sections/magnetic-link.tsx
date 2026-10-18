"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

export function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.2 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="inline-block"
      onPointerMove={move}
      onPointerLeave={reset}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
    >
      <Link href={href} className={className}>{children}</Link>
    </motion.div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Props = {
  className?: string;
};

export function AnimatedLine({ className }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const dash = useMemo(() => 220, []);

  return (
    <svg
      ref={ref}
      className={["h-[2px] w-full", className].filter(Boolean).join(" ")}
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={dash}
        initial={{ strokeDashoffset: dash }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: dash }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}


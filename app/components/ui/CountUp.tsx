"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

type Props = {
  to: number;
  from?: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

export function CountUp({ to, from = 0, suffix = "", className, durationMs }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const value = useCountUp(to, from, inView, { durationMs });
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}


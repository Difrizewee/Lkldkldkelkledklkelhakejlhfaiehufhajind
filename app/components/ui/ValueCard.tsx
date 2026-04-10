"use client";

import { motion } from "framer-motion";
import { revealItem } from "@/lib/animations";

type Props = {
  title: string;
  text: string;
  icon: string;
};

export function ValueCard({ title, text, icon }: Props) {
  return (
    <motion.div
      variants={revealItem}
      className="rounded-[4px] border border-ok-border bg-white/60 p-5"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-[4px] border border-ok-border text-ok-lime font-mono">
          {icon}
        </div>
        <div className="font-display uppercase tracking-tight text-foreground">{title}</div>
      </div>
      <div className="mt-3 text-[13px] leading-relaxed text-ok-muted">{text}</div>
    </motion.div>
  );
}


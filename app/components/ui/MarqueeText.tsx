"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  speedSeconds?: number;
  reverse?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

export function MarqueeText({ text, speedSeconds = 18, reverse, tone = "light", className }: Props) {
  const dir = reverse ? 1 : -1;
  const textClass =
    tone === "dark"
      ? "text-[#F0F0F0] text-sm font-mono uppercase tracking-widest"
      : "text-[#999999] text-xs font-mono uppercase tracking-widest";
  const dotClass = tone === "dark" ? "text-[#C8FF00]" : "text-[#CCCCCC]";
  return (
    <div className={["relative overflow-hidden", className].filter(Boolean).join(" ")}>
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap will-change-transform"
        animate={{ x: [`0%`, `${dir * 50}%`] }}
        transition={{ duration: speedSeconds, ease: "linear", repeat: Infinity }}
      >
        <MarqueeSpan text={text} textClass={textClass} dotClass={dotClass} />
        <MarqueeSpan text={text} textClass={textClass} dotClass={dotClass} />
        <MarqueeSpan text={text} textClass={textClass} dotClass={dotClass} />
      </motion.div>
    </div>
  );
}

function MarqueeSpan({
  text,
  textClass,
  dotClass,
}: {
  text: string;
  textClass: string;
  dotClass: string;
}) {
  const parts = text
    .split("·")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <span className="flex items-center">
      {parts.map((p, i) => (
        <span key={`${p}-${i}`} className="flex items-center">
          <span className={[textClass, "px-6"].join(" ")}>{p}</span>
          <span className={dotClass}>·</span>
        </span>
      ))}
    </span>
  );
}


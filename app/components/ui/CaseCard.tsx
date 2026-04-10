"use client";

import { motion } from "framer-motion";

export type CaseItem = {
  client: string;
  platform: string;
  image?: string;
  metric: string;
  metricLabel: string;
  description: string;
  period: string;
  bloggers?: number | string;
  filter: "tiktok" | "youtube" | "telegram" | "twitch";
};

type Props = {
  c: CaseItem;
  onOpen: (item: CaseItem) => void;
};

export function CaseCard({ c, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      data-cursor="case"
      aria-label={`Открыть кейс ${c.client}`}
      onClick={() => onOpen(c)}
      className="bg-white border border-[#E0E0DE] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer text-left"
    >
      <div className="h-44 bg-[#F0F0EE] group-hover:bg-[#E8E8E6] transition-colors duration-300 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#CCCCCC] font-black text-6xl uppercase leading-none opacity-30 select-none">
            {c.client.slice(0, 2)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-[#111111] font-black text-base uppercase leading-tight max-w-[70%]">
            {c.client}
          </h3>
          <span className="text-[#111111] font-mono text-xs border border-[#E0E0DE] px-2 py-1 rounded whitespace-nowrap">
            {c.platform}
          </span>
        </div>

        <div className="mb-3">
          <div className="text-[#111111] font-black text-2xl leading-none">{c.metric}</div>
          <div className="text-[#AAAAAA] text-xs font-mono mt-1">{c.metricLabel}</div>
        </div>

        <p className="text-[#666666] text-xs leading-relaxed">{c.description}</p>

        {(c.period || c.bloggers) && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#F0F0EE]">
            {c.period && <span className="text-[#AAAAAA] text-xs font-mono">{c.period}</span>}
            {c.bloggers && (
              <span className="text-[#AAAAAA] text-xs font-mono">{c.bloggers} блогеров</span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}

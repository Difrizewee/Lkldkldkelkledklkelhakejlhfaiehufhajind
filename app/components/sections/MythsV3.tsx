"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { revealItem, revealParent } from "@/lib/animations";

const myths = [
  {
    myth: "TikTok — это только для подростков",
    fact: "43% аудитории — 25–44, ещё 30% — старше 45.",
  },
  {
    myth: "Только крупные блогеры дают результат",
    fact: "До 60% новых размещений — микро- и нано-блогеры.",
  },
  {
    myth: "TikTok не работает / заблокирован",
    fact: "66 млн MAU, 524 тыс. скачиваний в неделю, и платформа легальна.",
  },
] as const;

export function MythsV3() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <section className="border-t border-ok-border">
      <div className="ok-container py-16 md:py-20">
        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          <motion.h2
            variants={revealItem}
            className="font-display uppercase font-extrabold tracking-tight text-[clamp(32px,5vw,72px)] leading-[0.95]"
          >
            Три мифа, которые мешают вашей рекламе
          </motion.h2>

          <p className="text-[#888888] text-sm mt-4 mb-10 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 border border-[#CCCCCC] rounded-full text-xs">↕</span>
            Нажмите на карточку, чтобы увидеть реальный факт
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {myths.map((item, idx) => {
              const flipped = !!open[idx];

              return (
                <motion.div key={item.myth} variants={revealItem} className="relative" style={{ perspective: "1000px" }}>
                  <button
                    type="button"
                    onClick={() => setOpen((s) => ({ ...s, [idx]: !s[idx] }))}
                    className="w-full h-[280px] text-left cursor-pointer"
                    aria-label={`Карточка мифа: ${item.myth}`}
                  >
                    <div
                      className="relative h-full transition-transform duration-500"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div
                        className="absolute inset-0 border border-[#E0E0DE] rounded-2xl p-8 transition-all duration-300 hover:border-[#111111] hover:shadow-lg active:scale-[0.98] bg-white"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="inline-flex items-center gap-2 bg-[#F5F5F3] px-3 py-1.5 rounded-full mb-6">
                          <span className="text-[#888888] text-xs font-mono uppercase">МИФ</span>
                        </div>

                        <h3 className="text-[#111111] font-black text-xl uppercase mb-4 font-display">{item.myth}</h3>

                        <div className="flex items-center gap-2 mt-6 text-[#111111] text-xs font-mono uppercase tracking-wider transition-all duration-200 hover:gap-3">
                          <div className="w-6 h-6 border border-[#111111] rounded-full flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors">
                            ↓
                          </div>
                          <span>Узнать факт</span>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 bg-[#111111] rounded-2xl p-8"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <div className="text-[#C8FF00] font-mono text-xs uppercase tracking-widest mb-4">ФАКТ</div>
                        <p className="text-white text-base leading-relaxed">{item.fact}</p>
                        <div className="mt-6 text-[#8F8F8F] text-xs font-mono uppercase tracking-wider">
                          Нажмите ещё раз, чтобы вернуться
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

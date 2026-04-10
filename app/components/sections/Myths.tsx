"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { revealItem, revealParent } from "@/lib/animations";

const myths = [
  {
    myth: "TikTok — это для подростков",
    fact: "43% аудитории 25–44 года, 30% — 45+",
  },
  {
    myth: "Только крупные блогеры дают результат",
    fact: "До 60% новых размещений — микро и нано блогеры",
  },
  {
    myth: "TikTok не работает / заблокирован",
    fact: "66 млн MAU, 524 тыс. скачиваний в неделю, полностью легален",
  },
] as const;

export function Myths() {
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

          <div className="mt-10 grid gap-4 md:grid-cols-3 [perspective:1200px]">
            {myths.map((m, idx) => {
              const flipped = !!open[idx];
              return (
                <motion.button
                  key={m.myth}
                  type="button"
                  aria-label={`Миф ${idx + 1}: ${m.myth}. Нажмите, чтобы перевернуть.`}
                  onClick={() => setOpen((s) => ({ ...s, [idx]: !s[idx] }))}
                  variants={revealItem}
                  className="group relative h-[240px] w-full rounded-[4px] border border-ok-border bg-transparent text-left"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]"
                    style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                  >
                    <div className="absolute inset-0 rounded-[4px] bg-white/60 p-6 [backface-visibility:hidden]">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-ok-muted">
                        МИФ
                      </div>
                      <div className="mt-3 font-display uppercase tracking-tight text-foreground">
                        {m.myth}
                      </div>
                      <div className="mt-6 text-[13px] leading-relaxed text-ok-muted">
                        Нажмите, чтобы увидеть факт.
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-[4px] p-6 text-foreground [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)", background: "#C8FF00" }}
                    >
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#0A0A0A]/80">
                        ФАКТ
                      </div>
                      <div className="mt-3 font-display uppercase tracking-tight">{m.fact}</div>
                      <div className="mt-6 text-[13px] leading-relaxed text-[#0A0A0A]/80">
                        Нажмите ещё раз, чтобы вернуться.
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


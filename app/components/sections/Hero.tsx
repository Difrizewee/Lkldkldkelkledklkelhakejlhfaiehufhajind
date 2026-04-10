"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MarqueeText } from "@/app/components/ui/MarqueeText";
import { lineReveal, revealItem, revealParent } from "@/lib/animations";

const lines = ["ИНФЛЮЕНС-", "МАРКЕТИНГ", "СО СМЫСЛОМ"];

export function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const decoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const t = Math.min(240, y * 0.3);
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${t}px, 0)`;
      if (decoRef.current) decoRef.current.style.transform = `translate3d(0, ${t * 0.7}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] pt-[88px]">
      <div ref={bgRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(200,255,0,0.12),transparent_60%),radial-gradient(900px_500px_at_80%_30%,rgba(200,255,0,0.08),transparent_60%)]" />
        <div className="ok-noise" />
      </div>

      <div ref={decoRef} className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-120px] top-[20%] h-[240px] w-[240px] rounded-full border border-ok-border opacity-60" />
        <div className="absolute left-[-120px] bottom-[18%] h-[280px] w-[280px] rounded-full border border-ok-border opacity-40" />
      </div>

      <div className="relative ok-container">
        <motion.div
          variants={revealParent}
          initial="hidden"
          animate="show"
          className="max-w-[1100px]"
        >
          <div className="space-y-2">
            {lines.map((t) => (
              <div key={t} className="overflow-hidden">
                <motion.h1
                  variants={lineReveal}
                  className="font-display uppercase font-extrabold tracking-tight text-[clamp(36px,10vw,120px)] leading-[0.92]"
                >
                  {t}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div variants={revealItem} className="mt-8 h-px w-full bg-ok-border" />

          <motion.div
            variants={revealItem}
            className="mt-6 grid gap-4 md:grid-cols-2 text-[13px] leading-relaxed text-ok-muted"
          >
            <div>
              <div className="text-foreground/90">Агентство ОК | Осмысленные Коммуникации</div>
              <div className="mt-2 max-w-[560px]">
                Агентство ОК помогает брендам работать с блогерами честно, стратегически и с измеримым результатом.
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-foreground/90">2019 — сегодня</div>
              <div className="mt-2">Москва</div>
            </div>
          </motion.div>

          <motion.div variants={revealItem} className="mt-10 flex items-center gap-4">
            <a
              href="#contact"
              aria-label="Получить бриф"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[4px] border border-ok-border px-6 font-medium text-foreground"
            >
              <span className="relative z-10">Получить бриф</span>
              <span className="absolute inset-0 translate-y-full bg-ok-lime transition-transform duration-200 group-hover:translate-y-0" />
              <span className="absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-foreground grid place-items-center">
                Получить бриф
              </span>
            </a>
            <div className="hidden sm:block text-[12px] font-mono uppercase tracking-wider text-ok-muted">
              Если есть смысл — делаем. Если нет — не делаем.
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="ok-container pb-6">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-3 text-ok-muted">
              <div className="relative h-10 w-[2px] bg-ok-border overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-3 w-[2px] bg-ok-lime"
                  animate={{ y: [0, 28, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider">Scroll</div>
            </div>
            <MarqueeText
              speedSeconds={16}
              tone="light"
              text="СМЫСЛЕННО · ИЗМЕРИМО · ПРОЗРАЧНО · TIKTOK · TELEGRAM ·"
              className="w-full max-w-[720px] pb-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


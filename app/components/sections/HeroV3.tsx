"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MarqueeTextV3 } from "@/app/components/ui/MarqueeTextV3";
import { lineReveal, revealItem, revealParent } from "@/lib/animations";

const lines = ["ИНФЛЮЕНС-", "МАРКЕТИНГ", "СО СМЫСЛОМ"];

export function HeroV3() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-[92vh] pt-[88px] overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_640px_at_20%_18%,rgba(200,255,0,0.12),transparent_62%),radial-gradient(960px_560px_at_82%_28%,rgba(17,17,17,0.06),transparent_65%)]" />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, transparent 30%, black 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.04) 100%)",
          }}
        />

        <div className="ok-noise" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-120px] top-[20%] h-[240px] w-[240px] rounded-full border border-ok-border opacity-60"
          style={{ transform: `translateY(${Math.min(240, scrollY * 0.2)}px)` }}
        />
        <div
          className="absolute left-[-120px] bottom-[18%] h-[280px] w-[280px] rounded-full border border-ok-border opacity-40"
          style={{ transform: `translateY(${Math.min(240, scrollY * 0.14)}px)` }}
        />
      </div>

      <div className="relative ok-container">
        <motion.div variants={revealParent} initial="hidden" animate="show" className="max-w-[1100px]">
          <div className="space-y-2">
            {lines.map((line) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  variants={lineReveal}
                  className="font-display uppercase font-extrabold tracking-tight text-[clamp(36px,10vw,120px)] leading-[0.92]"
                >
                  {line}
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
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-[#111111] px-6 font-medium text-[#111111]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Получить бриф
              </span>
              <span className="absolute inset-0 translate-y-full bg-[#111111] transition-transform duration-300 ease-out group-hover:translate-y-0" />
            </a>
            <div className="hidden sm:block text-[12px] font-mono uppercase tracking-wider text-ok-muted">
              Если есть смысл — делаем. Если нет — не делаем.
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 pointer-events-none overflow-hidden select-none">
        <div
          className="absolute bottom-0 right-[5%] text-[220px] font-black text-[#111111]/[0.03] leading-none uppercase"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          ОК
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex items-center gap-0">
          <div className="h-[1px] bg-[#111111]/10 flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 mx-4" />
          <div className="h-[1px] bg-[#111111]/10 w-[30%]" />
        </div>

        <div className="absolute bottom-12 left-[40%] text-[#111111]/10 text-2xl font-thin">+</div>
        <div className="absolute bottom-6 left-[60%] text-[#111111]/10 text-lg font-thin">+</div>

        <div className="absolute bottom-10 right-8 flex flex-col items-end gap-1">
          <span className="text-[#111111]/30 font-mono text-xs uppercase tracking-widest">с 2019</span>
          <span className="text-[#111111]/15 font-mono text-xs">BloggerTrack → ОК</span>
        </div>
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
            <MarqueeTextV3
              speedSeconds={40}
              tone="light"
              items={[
                "ОК",
                "ОСМЫСЛЕННЫЕ КОММУНИКАЦИИ",
                "ИНФЛЮЕНС-МАРКЕТИНГ",
                "TIKTOK",
                "ОСМЫСЛЕННО",
                "ИЗМЕРИМО",
                "ПРОЗРАЧНО",
              ]}
              className="w-full max-w-[760px] pb-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

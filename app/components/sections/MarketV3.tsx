"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CountUp } from "@/app/components/ui/CountUp";
import { revealItem, revealParent } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

type Panel = {
  title: string;
  body: ReactNode;
};

type PlatformItem = {
  name: string;
  share: string;
  status: string;
  color: string;
  desc: string;
};

const platforms: PlatformItem[] = [
  {
    name: "YOUTUBE",
    share: "48%",
    status: "ЗАМЕДЛЯЕТСЯ",
    color: "#FF4444",
    desc: "88% трафика уходит из-за ограничений. Риск блокировки остаётся.",
  },
  {
    name: "INSTAGRAM",
    share: "20%",
    status: "ЗАПРЕЩАЕТСЯ",
    color: "#FF4444",
    desc: "Формально запрещён. Реклама — под угрозой штрафов.",
  },
  {
    name: "TELEGRAM",
    share: "20%",
    status: "ТЕРЯЕТ ПОЛЬЗОВАТЕЛЕЙ",
    color: "#FF8844",
    desc: "Замедляется. Аудитория уходит на другие платформы.",
  },
];

export function MarketV3() {
  const horizontalRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const panels = useMemo<Panel[]>(
    () => [
      {
        title: "Цифры рынка",
        body: (
          <div className="bg-[#111111] rounded-2xl px-6 md:px-10 py-10 md:py-12 my-6 md:my-12 relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, #333333 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <div className="text-[#555555] font-mono text-xs uppercase tracking-widest mb-8">
                ЦИФРЫ РЫНКА
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="text-[#C8FF00] font-black leading-none font-display uppercase tracking-tight text-[clamp(52px,7vw,88px)]">
                    62–<CountUp to={74} suffix="%" className="tabular-nums" />
                  </div>
                  <p className="text-[#666666] text-sm mt-4 leading-relaxed max-w-xs">
                    маркетологов увеличат бюджеты на инфлюенс-маркетинг в 2026
                  </p>
                </div>
                <div>
                  <div className="text-[#C8FF00] font-black leading-none font-display uppercase tracking-tight text-[clamp(52px,7vw,88px)]">
                    В 2–<CountUp to={3} className="tabular-nums" /> РАЗА
                  </div>
                  <p className="text-[#666666] text-sm mt-4 leading-relaxed max-w-xs">
                    выше ROI от инфлюенсеров vs традиционная реклама
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Проблема площадок",
        body: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="bg-[#141414] border border-[#1E1E1E] rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                  {p.name.slice(0, 2)}
                </div>

                <div className="flex items-start justify-between">
                  <div className="text-white font-black text-3xl md:text-4xl tracking-tight font-display">
                    {p.name}
                  </div>
                  <div className="text-[#444444] font-mono text-sm">{p.share}</div>
                </div>

                <div className="flex items-center gap-2 self-start">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: p.color }} />
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: p.color }}>
                    {p.status}
                  </span>
                </div>

                <p className="text-[#666666] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Возможность — TikTok",
        body: (
          <section className="bg-[#111111] py-12 md:py-16 mt-0 rounded-2xl relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, #333333 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative px-6 md:px-10">
              <div className="text-[#444444] font-mono text-xs uppercase tracking-widest mb-3">
                ВОЗМОЖНОСТЬ — TIKTOK
              </div>
              <h2
                className="text-white font-black uppercase leading-none mb-12 font-display"
                style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
              >
                ВОЗМОЖНОСТЬ №1
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "ЛЕГАЛЬНОСТЬ", desc: "Работает в России без серых схем. Без угрозы блокировки." },
                  { label: "ОХВАТ", desc: "66 млн MAU — реальная аудитория, не накрутка." },
                  { label: "CPV", desc: "Часто ниже, чем у привычных площадок." },
                  { label: "ОРГАНИКА", desc: "Алгоритм всё ещё умеет разгонять видео." },
                ].map((item) => (
                  <div key={item.label} className="border border-[#222222] rounded-xl p-6 flex flex-col gap-4">
                    <div className="text-[#C8FF00] font-mono text-xs uppercase tracking-widest">{item.label}</div>
                    <div className="h-[1px] bg-[#222222]" />
                    <p className="text-[#888888] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const section = horizontalRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const totalShift = () => Math.max(0, track.scrollWidth - section.clientWidth);

      const tween = gsap.to(track, {
        x: () => -totalShift(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalShift()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress * 100);
          },
          onToggle: (self) => {
            setShowProgress(self.isActive);
            if (!self.isActive) {
              setScrollProgress(self.progress >= 1 ? 100 : 0);
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [panels.length]);

  return (
    <section id="market" className="relative border-t border-ok-border">
      <div className="ok-container section-padding">
        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="max-w-[900px]"
        >
          <motion.h2
            variants={revealItem}
            className="font-display uppercase font-extrabold tracking-tight text-[clamp(32px,5vw,72px)] leading-[0.95]"
          >
            Что происходит
          </motion.h2>
          <motion.p variants={revealItem} className="mt-6 text-[14px] leading-relaxed text-ok-muted">
            Рынок инфлюенс-маркетинга в России переживает не лучшие времена. 88% ключевых площадок
            замедляют, запрещают или теряют пользователей. Крупные блогеры стоят дорого и работают со
            всеми подряд. Доверие к агентствам падает.
            <br />
            <span className="text-foreground/90">Мы считаем, что это не повод работать хуже. Это повод работать иначе.</span>
          </motion.p>
        </motion.div>
      </div>

      <section ref={horizontalRef} className="relative overflow-hidden h-auto md:h-screen">
        <div ref={trackRef} className="flex h-full flex-col md:flex-row w-full md:w-max">
          {panels.map((panel) => (
            <div key={panel.title} className="w-full md:w-screen md:shrink-0 border-t border-ok-border">
              <div className="ok-container py-16 md:py-20 h-full">
                <div className="flex items-baseline justify-between gap-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-ok-muted">{panel.title}</div>
                  <div className="h-px flex-1 bg-ok-border" />
                </div>
                <div className="mt-8 md:mt-10">{panel.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-[#999999] text-xs font-mono uppercase tracking-widest">
          <span>скролл</span>
          <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden="true">
            <path
              d="M0 6h28M24 2l6 4-6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      <div
        className={[
          "fixed bottom-0 left-0 h-0.5 bg-[#C8FF00] z-50 transition-opacity duration-200",
          showProgress ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{ width: `${scrollProgress}%` }}
      />
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CountUp } from "@/app/components/ui/CountUp";
import { revealItem, revealParent } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export function Market() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const panels = useMemo(
    () => [
      {
        title: "Цифры рынка",
        body: (
          <div className="card-dark rounded-2xl px-8 py-12 my-8">
            <span className="muted-on-dark text-xs uppercase tracking-widest font-mono">
              ЦИФРЫ РЫНКА
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <div className="text-ok-lime font-black text-[clamp(48px,6vw,80px)] leading-none font-display uppercase tracking-tight">
                  62–<CountUp to={74} suffix="%" className="tabular-nums" />
                </div>
                <p className="muted-on-dark text-sm mt-3 leading-relaxed">
                  маркетологов увеличат бюджеты на инфлюенс-маркетинг в 2026
                </p>
              </div>
              <div>
                <div className="text-ok-lime font-black text-[clamp(48px,6vw,80px)] leading-none font-display uppercase tracking-tight">
                  В 2–<CountUp to={3} className="tabular-nums" /> РАЗА
                </div>
                <p className="muted-on-dark text-sm mt-3 leading-relaxed">
                  выше ROI от инфлюенсеров vs традиционная реклама
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Проблема площадок",
        body: (
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "YouTube", share: "48%", status: "ЗАМЕДЛЯЕТСЯ" },
              { name: "Instagram", share: "20%", status: "ЗАПРЕЩАЕТСЯ" },
              { name: "Telegram", share: "20%", status: "ТЕРЯЕТ ПОЛЬЗОВАТЕЛЕЙ" },
            ].map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: idx * 0.08 },
                }}
                viewport={{ once: true, margin: "-20% 0px" }}
                className="card-dark rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="on-dark font-black text-4xl font-display uppercase tracking-tight">
                    {c.name.toUpperCase()}
                  </div>
                  <div className="text-[#555555] font-mono text-sm">{c.share}</div>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#2A0A0A] border border-[#FF3333]/30 rounded px-3 py-1.5 self-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444] animate-pulse" />
                  <span className="text-[#FF6666] text-xs font-mono uppercase tracking-wider">
                    {c.status}
                  </span>
                </div>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Риск и шум вместо стабильности.
                </p>
              </motion.div>
            ))}
          </div>
        ),
      },
      {
        title: "Возможность — TikTok",
        body: (
          <div>
            <div className="font-display uppercase tracking-tight text-[clamp(28px,4vw,56px)] text-foreground">
              ВОЗМОЖНОСТЬ №1
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {[
                { t: "ЛЕГАЛЬНОСТЬ", d: "Работает в России без серых схем." },
                { t: "ОХВАТ", d: "66 млн MAU — реальная аудитория." },
                { t: "CPV", d: "Часто ниже, чем у привычных площадок." },
                { t: "ОРГАНИКА", d: "Алгоритм всё ещё умеет разгонять." },
              ].map((c) => (
                <div
                  key={c.t}
                  className="card-dark rounded-xl p-5"
                >
                  <div className="text-ok-lime text-xs font-mono uppercase tracking-widest mb-3">
                    {c.t}
                  </div>
                  <p className="muted-on-dark text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const totalShift = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -totalShift(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
        tween.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, [panels.length, panels]);

  return (
    <section id="market" ref={sectionRef} className="relative border-t border-ok-border">
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
            Рынок инфлюенс-маркетинга в России переживает не лучшие времена. 88% ключевых
            площадок замедляют, запрещают или теряют пользователей. Крупные блогеры стоят
            дорого и работают со всеми подряд. Доверие к агентствам падает.
            <br />
            <span className="text-foreground/90">Мы считаем, что это не повод работать хуже. Это повод работать иначе.</span>
          </motion.p>
        </motion.div>
      </div>

      <div ref={trackRef} className="flex w-max gap-0 md:gap-0">
        {panels.map((p) => (
          <div
            key={p.title}
            className="w-screen md:w-[100vw] shrink-0 border-t border-ok-border"
          >
            <div className="ok-container section-padding">
              <div className="flex items-baseline justify-between gap-6">
                <div className="font-mono text-[11px] uppercase tracking-wider text-ok-muted">
                  {p.title}
                </div>
                <div className="h-px flex-1 bg-ok-border" />
              </div>
              <div className="mt-10">{p.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


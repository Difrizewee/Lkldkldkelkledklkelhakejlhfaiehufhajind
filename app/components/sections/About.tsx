"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealItem, revealParent } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2019",
    text: "Основание BloggerTrack",
  },
  {
    year: "2020",
    text: "Первые кейсы с федеральными брендами. Партнёрство с TikTok аналитикой",
  },
  {
    year: "2023–2024",
    text: "Крупные кампании. Адаптация под новую реальность рынка",
  },
  {
    year: "2026",
    text: "Ребрендинг в «ОК | Осмысленные Коммуникации»",
  },
] as const;

const values = [
  { title: "Чёткость и точность", text: "Знаем, что нужно делать, а что нет", icon: "01" },
  { title: "Стратегичность", text: "Точно планируем и прогнозируем результаты", icon: "02" },
  { title: "Эффективность", text: "Используем только каналы, которые реально работают", icon: "03" },
  { title: "Открытость", text: "Клиент точно знает, куда уходят деньги", icon: "04" },
  { title: "Клиентоориентированность", text: "Делаем как лучше для клиента, даже если сами заработаем меньше", icon: "05" },
  { title: "Честность", text: "Говорим правду, даже если она неприятна", icon: "06" },
] as const;

export function About() {
  const svgRef = useRef<SVGPathElement | null>(null);
  const wrapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const path = svgRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
      gsap.fromTo(
        "[data-tl-point]",
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 70%",
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={wrapRef} className="border-t border-ok-border">
      <div className="ok-container section-padding">
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
            Немного про нас
          </motion.h2>
          <motion.p variants={revealItem} className="mt-6 max-w-[860px] text-[14px] leading-relaxed text-ok-muted">
            С 2019 года мы запускали кампании для Samsung, TECNO, Novabev Group, Пятёрочки и десятков других брендов.
            <br />
            В 2026 году мы стали «ОК | Осмысленными Коммуникациями» — не потому что захотели новое название, а потому что рынок потребовал нового стандарта работы.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111111] rounded-2xl p-8 border border-[#2A2A2A]">
            <div className="text-[#555555] font-mono text-xs mb-6">
              2019 → 2026
            </div>

            <div className="relative pl-6 border-l border-[#2A2A2A] space-y-8">
              {/* Animated line (desktop only) */}
              <svg
                className="absolute left-[-14px] top-0 h-full w-6 hidden lg:block"
                viewBox="0 0 24 400"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path ref={svgRef} d="M12 0 V400" stroke="#C8FF00" strokeWidth="2" fill="none" />
              </svg>

              {timeline.map((t) => (
                <div key={t.year} className="relative">
                  <div
                    data-tl-point
                    className="absolute -left-[25px] w-3 h-3 rounded-full bg-[#C8FF00] border-2 border-[#111111]"
                  />
                  <div className="text-[#C8FF00] font-mono font-bold text-sm mb-1">{t.year}</div>
                  <div className="text-[#888888] text-sm">{t.text}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            variants={revealParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px" }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-[#E0E0DE] rounded-xl p-5">
                <div className="text-[#AAAAAA] font-mono text-xs mb-3">{v.icon}</div>
                <div className="text-[#111111] font-bold text-sm uppercase mb-2">{v.title}</div>
                <div className="text-[#666666] text-xs leading-relaxed">{v.text}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

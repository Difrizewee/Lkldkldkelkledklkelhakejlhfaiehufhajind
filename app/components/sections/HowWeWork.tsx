"use client";

import { motion } from "framer-motion";
import { revealItem, revealParent } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Бриф и аудит",
    text: "Принимаем задачу, честно оцениваем, нужна ли вам вообще реклама у инфлюенсеров",
  },
  {
    n: "02",
    title: "Стратегия и медиаплан",
    text: "Подбираем площадки и блогеров с аналитическим обоснованием",
  },
  {
    n: "03",
    title: "Запуск кампании",
    text: "Размещения с полным сопровождением",
  },
  {
    n: "04",
    title: "Аналитика в реальном времени",
    text: "Все данные открыты для клиента",
  },
  {
    n: "05",
    title: "Отчёт и выводы",
    text: "Честная оценка результатов, включая провалы",
  },
] as const;

export function HowWeWork() {
  return (
    <section className="border-t border-ok-border">
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
            Процесс без лишних движений
          </motion.h2>

          <motion.div variants={revealItem} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 },
                  }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  className="bg-white border border-[#E0E0DE] rounded-xl p-6 shadow-sm relative"
                >
                  <div className="text-[#AAAAAA] font-mono text-xs mb-4 tabular-nums">
                    {s.n}
                  </div>

                  {i < steps.length - 1 && (
                    <div className="absolute top-6 -right-2 w-4 h-[1px] bg-[#CCCCCC] hidden md:block" />
                  )}

                  <h4 className="text-[#111111] font-bold text-sm uppercase leading-tight mb-3">
                    {s.title}
                  </h4>
                  <p className="text-[#666666] text-xs leading-relaxed">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


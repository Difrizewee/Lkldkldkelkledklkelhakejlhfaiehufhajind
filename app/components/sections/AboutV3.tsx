"use client";

import { motion } from "framer-motion";
import { revealItem, revealParent } from "@/lib/animations";

const timeline = [
  {
    year: "2019",
    label: "Старт",
    desc: "Основали BloggerTrack. Первые кампании для малого бизнеса.",
  },
  {
    year: "2020",
    label: "Рост",
    desc: "Первые федеральные бренды. Эксклюзивное партнёрство с TikTok-аналитикой.",
  },
  {
    year: "2023–24",
    label: "Масштаб",
    desc: "Крупные кампании. Адаптация под новую реальность рынка.",
  },
  {
    year: "2026",
    label: "Сегодня",
    desc: "Ребрендинг в ОК | Осмысленные Коммуникации.",
  },
] as const;

const values = [
  { title: "Чёткость и точность", text: "Знаем, что нужно делать, а что не нужно", icon: "01" },
  { title: "Стратегичность", text: "Точно планируем и прогнозируем результаты", icon: "02" },
  { title: "Эффективность", text: "Используем только каналы, которые реально работают", icon: "03" },
  { title: "Открытость", text: "Клиент точно знает, куда уходят деньги", icon: "04" },
  { title: "Клиентоориентированность", text: "Ставим результат клиента выше формальностей", icon: "05" },
  { title: "Честность", text: "Говорим правду, даже если она неприятна", icon: "06" },
] as const;

export function AboutV3() {
  return (
    <section id="about" className="border-t border-ok-border">
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
            В 2026 году мы стали «ОК | Осмысленными Коммуникациями» — потому что рынок потребовал нового стандарта работы.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111111] rounded-2xl p-8 mt-0 relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, #333333 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <div className="text-[#444444] font-mono text-xs mb-2">2019 → 2026</div>

              <div className="mt-12 overflow-x-auto -mx-6 px-6 pb-4">
                <div className="flex gap-0 min-w-max">
                  {timeline.map((item, index, arr) => (
                    <div key={item.year} className="flex items-start">
                      <div className="w-56 flex-shrink-0">
                        <div className="flex items-baseline gap-3 mb-3">
                          <span className="text-[#C8FF00] font-mono font-black text-xl">{item.year}</span>
                          <span className="text-[#555555] text-xs uppercase font-mono">{item.label}</span>
                        </div>

                        <div className="flex items-center mb-4">
                          <div className="w-3 h-3 rounded-full bg-[#C8FF00] flex-shrink-0" />
                          {index < arr.length - 1 && (
                            <div
                              className="h-[1px] flex-1 bg-gradient-to-r from-[#333333] to-[#222222]"
                              style={{ width: "80px" }}
                            />
                          )}
                        </div>

                        <p className="text-[#666666] text-xs leading-relaxed pr-4">{item.desc}</p>
                      </div>

                      {index < arr.length - 1 && <div className="w-8 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            variants={revealParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px" }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={revealItem} className="bg-white border border-[#E0E0DE] rounded-xl p-5">
                <div className="text-[#AAAAAA] font-mono text-xs mb-3">{value.icon}</div>
                <div className="text-[#111111] font-bold text-sm uppercase mb-2">{value.title}</div>
                <div className="text-[#666666] text-xs leading-relaxed">{value.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

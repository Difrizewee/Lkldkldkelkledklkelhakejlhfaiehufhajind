"use client";

import { motion } from "framer-motion";
import { revealItem, revealParent } from "@/lib/animations";

const metrics = [
  "Earned Media Value",
  "% видео в рекомендациях",
  "Антифрод-аналитика",
  "Бенчмарки по нишам",
] as const;

const bloggerMix = [
  { label: "Нано 2.5к–25к", pct: 27, width: "27%" },
  { label: "Микро 25к–60к", pct: 27, width: "27%" },
  { label: "Средние 60к–250к", pct: 32, width: "32%" },
  { label: "Макро 250к–1М", pct: 12, width: "12%" },
  { label: "Селебрити 1М+", pct: 2, width: "2%" },
] as const;

export function DifferentiatorsV3() {
  return (
    <section id="services" className="border-t border-ok-border">
      <div className="ok-container py-20 md:py-28">
        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          <motion.h2
            variants={revealItem}
            className="font-display font-black uppercase leading-[0.9] mb-16 [font-feature-settings:'kern'_1] [text-rendering:optimizeLegibility]"
            style={{ fontSize: "clamp(36px, 5.5vw, 76px)" }}
          >
            РЫНОК ИГРАЕТ НЕ ПО
            <br />
            ПРАВИЛАМ. МЫ — ТОЖЕ.
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
            <motion.div variants={revealItem} className="bg-white border border-[#E8E8E6] rounded-2xl p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 text-[160px] font-black text-[#111111]/[0.025] leading-none select-none">
                01
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-black text-xl uppercase leading-tight max-w-[70%] text-foreground font-display">
                    Аналитика, которой нет ни у кого в России
                  </div>
                  <div className="text-[#111111] font-mono text-xs border border-ok-border px-2 py-1 rounded">
                    OK
                  </div>
                </div>

                <div className="mt-4 text-sm leading-relaxed text-ok-muted">
                  С 2020 года — эксклюзивное партнёрство с западными лидерами TikTok-аналитики.
                  Прогнозирование Earned Media Value, % видео в рекомендациях, антифрод и бенчмарки —
                  инструменты, которых в российских кабинетах просто нет.
                </div>

                <motion.ul variants={revealParent} className="mt-6 grid grid-cols-2 gap-3">
                  {metrics.map((m) => (
                    <motion.li key={m} variants={revealItem} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-sm bg-[#111111] flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                          <path d="M1 3L3 5L7 1" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="text-[#111111] text-sm">{m}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            <motion.div variants={revealItem} className="bg-white border border-[#E8E8E6] rounded-2xl p-8 shadow-sm">
              <h3 className="text-[#111111] font-black text-xl uppercase mb-6 font-display">
                Работаем с любым типом блогеров
              </h3>

              {bloggerMix.map((row, idx) => (
                <div key={row.label} className={idx === bloggerMix.length - 1 ? "" : "mb-4"}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[#111111] text-xs">{row.label}</span>
                    <span className="text-[#111111] font-mono font-bold text-xs">{row.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#F0F0EE] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#111111] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: row.width }}
                      viewport={{ once: true, margin: "-20% 0px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={revealItem}
            className="bg-white border border-[#E8E8E6] rounded-2xl p-8 shadow-sm mt-6"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div className="text-[clamp(18px,2.4vw,30px)] leading-tight text-foreground/90 italic">
                «Если реклама не принесёт результат — мы скажем об этом до, а не после.»
              </div>
              <div className="text-[14px] leading-relaxed text-ok-muted">
                Если мы видим, что инфлюенс-маркетинг не подходит для вашей задачи — говорим об этом прямо.
                Репутация дороже одного контракта.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

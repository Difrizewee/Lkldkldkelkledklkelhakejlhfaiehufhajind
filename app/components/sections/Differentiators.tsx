"use client";

import { motion } from "framer-motion";
import { revealItem, revealParent } from "@/lib/animations";

const metrics = [
  "Earned Media Value",
  "% видео в рекомендациях",
  "Антифрод-аналитика",
  "Бенчмарки по нишам",
] as const;

const pyramid = [
  { label: "Селебрити 1М+", value: "2%" },
  { label: "Макро 250к–1М", value: "12%" },
  { label: "Средние 60к–250к", value: "32%" },
  { label: "Микро 25к–60к", value: "27%" },
  { label: "Нано 2.5к–25к", value: "27%" },
] as const;

export function Differentiators() {
  return (
    <section id="services" className="border-t border-ok-border">
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
            Рынок играет не по правилам. Мы — тоже.
          </motion.h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <motion.div
              variants={revealItem}
              className="card-light rounded-2xl p-8 lg:col-span-2"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="font-black text-xl uppercase leading-tight max-w-[70%] text-foreground font-display">
                  Аналитика, которой нет ни у кого в России
                </div>
                <div className="text-[#111111] font-mono text-xs border border-ok-border px-2 py-1 rounded">
                  OK
                </div>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-ok-muted">
                С 2020 года — эксклюзивное партнёрство с западными лидерами аналитики TikTok.
                Прогнозирование Earned Media Value, % видео в рекомендациях, антифрод-аналитика —
                инструменты, которые российские платформы не предлагают.
              </div>

              <motion.ul
                variants={revealParent}
                className="mt-6 grid grid-cols-2 gap-3"
              >
                {metrics.map((m) => (
                  <motion.li
                    key={m}
                    variants={revealItem}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-sm bg-[#111111] flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="#C8FF00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[#111111] text-sm">{m}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="card-light rounded-2xl p-8"
            >
              <div className="text-[#111111] font-black text-xl uppercase mb-6 font-display">
                Работаем с любым типом блогеров
              </div>
              <div className="space-y-0">
                {pyramid.map((p, idx) => (
                  <motion.div
                    key={p.label}
                    initial={{ x: -18, opacity: 0 }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.45, ease: "easeOut", delay: idx * 0.08 },
                    }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    className="flex items-center justify-between py-3 border-b border-[#F0F0EE] last:border-0"
                  >
                    <div className="text-[#111111] text-sm">{p.label}</div>
                    <div className="text-[#111111] font-mono font-bold text-sm tabular-nums">
                      {p.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="card-light rounded-2xl p-8 lg:col-span-3"
            >
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div className="text-[clamp(18px,2.4vw,30px)] leading-tight text-foreground/90 italic">
                  «Если реклама не принесёт результат — мы скажем об этом до, а не после.»
                </div>
                <div className="text-[14px] leading-relaxed text-ok-muted">
                  Если мы видим, что инфлюенс-маркетинг не подходит для вашей задачи — мы скажем об
                  этом прямо. Репутация дороже одного контракта.
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


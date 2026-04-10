"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CaseCard, CaseItem } from "@/app/components/ui/CaseCard";
import { revealItem, revealParent } from "@/lib/animations";

type FilterKey = "all" | "tiktok" | "youtube" | "telegram" | "twitch";

export function CasesV3() {
  const allCases: CaseItem[] = useMemo(
    () => [
      {
        client: "ПЯТЁРОЧКА",
        platform: "TWITCH",
        metric: "4 664 712",
        metricLabel: "просмотров (OTS)",
        description:
          "Серия интеграций с популярными Twitch-стримерами для продвижения готовой еды. Разработали креативные механики и форматы с донатами.",
        period: "",
        bloggers: "",
        filter: "twitch",
      },
      {
        client: "TECNO",
        platform: "YOUTUBE",
        metric: "4 000 000",
        metricLabel: "просмотров (OTS)",
        description:
          "Постоянное продвижение продуктов бренда. YouTube-обзоры, вертикальные форматы и поддержка в Telegram-каналах.",
        period: "",
        bloggers: "",
        filter: "youtube",
      },
      {
        client: "БЕЛЕНЬКАЯ",
        platform: "TIKTOK",
        metric: "2 057 885",
        metricLabel: "просмотров (OTS)",
        description:
          "Формировали имидж бренда через контент про коктейли и домашние рецепты с нативной подачей от блогеров.",
        period: "2025",
        bloggers: "",
        filter: "tiktok",
      },
      {
        client: "ВЫХОДИ ЗА МЕНЯ",
        platform: "YOUTUBE",
        metric: "6 388 775",
        metricLabel: "просмотров (OTS)",
        description:
          "Всероссийский онлайн-марафон с интеграциями блогеров, конкурсной механикой и офлайн-поддержкой на фестивале.",
        period: "2024",
        bloggers: "",
        filter: "youtube",
      },
      {
        client: "ГОСУСЛУГИ — КИБЕРБЕЗОПАСНОСТЬ",
        platform: "TELEGRAM",
        metric: "4 030 900",
        metricLabel: "просмотров (OTS)",
        description:
          "Популяризация сервиса по борьбе с фишингом на портале Госуслуг через блогеров и образовательный контент.",
        period: "ноябрь–декабрь 2024",
        bloggers: "13+",
        filter: "telegram",
      },
      {
        client: "ПРОДОЛЖИТЕЛЬНАЯ И АКТИВНАЯ ЖИЗНЬ",
        platform: "YOUTUBE",
        metric: "5 929 202",
        metricLabel: "просмотров (OTS)",
        description:
          "Кампания нацпроекта с блогерами: нативно рассказывали о диспансеризации через понятные бытовые метафоры.",
        period: "август–ноябрь 2025",
        bloggers: "8",
        filter: "youtube",
      },
      {
        client: "Л'ЭТУАЛЬ — БЬЮТИ СТИПЕНДИЯ",
        platform: "TELEGRAM",
        metric: "21",
        metricLabel: "блогер в кампании",
        description:
          "Серия интеграций со студентами-блогерами. Telegram + YouTube, lifestyle-контент и ежемесячные инфоповоды.",
        period: "сентябрь–декабрь 2025",
        bloggers: "21",
        filter: "telegram",
      },
      {
        client: "АРХАНГЕЛЬСКАЯ",
        platform: "YOUTUBE",
        metric: "1 483 144",
        metricLabel: "просмотров (OTS)",
        description:
          "Креативная коллаборация с YouTube-каналом: адаптация болида для работы на водке и вирусное PR-покрытие.",
        period: "",
        bloggers: "",
        filter: "youtube",
      },
    ],
    []
  );

  const [filter, setFilter] = useState<FilterKey>("all");
  const [active, setActive] = useState<CaseItem | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return allCases;
    return allCases.filter((item) => item.filter === filter);
  }, [allCases, filter]);

  const filters = ["ВСЕ", "TIKTOK", "YOUTUBE", "TELEGRAM", "TWITCH"] as const;
  const filterKeys: FilterKey[] = ["all", "tiktok", "youtube", "telegram", "twitch"];

  const scrollToContact = () => {
    const contact = document.querySelector<HTMLElement>("#contact");
    if (!contact) return;
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="cases" className="border-t border-ok-border">
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
            Работа, за которую не стыдно
          </motion.h2>

          <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-2">
            {filters.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => setFilter(filterKeys[idx])}
                className={[
                  "px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer",
                  filter === filterKeys[idx]
                    ? "bg-[#111111] text-white"
                    : "bg-transparent text-[#555555] border border-[#E0E0DE] hover:border-[#111111] hover:text-[#111111]",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <CaseCard key={`${item.client}-${item.platform}`} c={item} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Кейс ${active.client}`}
              className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              exit={{ y: 40, opacity: 0, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 bg-[#E0E0DE] rounded-full" />
              </div>

              <div className="w-full h-52 md:h-64 bg-[#F0F0EE] relative overflow-hidden flex-shrink-0">
                {active.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={active.image} alt={active.client} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#CCCCCC] font-black text-8xl uppercase">{active.client.slice(0, 2)}</span>
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-black/70 text-white font-mono text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {active.platform}
                </div>

                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute top-4 left-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-colors"
                  aria-label="Закрыть модалку кейса"
                >
                  ×
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-[#111111] font-black text-2xl uppercase mb-2 font-display">{active.client}</h2>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-[#111111] font-black text-4xl font-display">{active.metric}</span>
                  <span className="text-[#AAAAAA] font-mono text-sm">{active.metricLabel}</span>
                </div>

                <div className="h-[1px] bg-[#F0F0EE] mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[#AAAAAA] font-mono text-xs uppercase tracking-wider mb-3">ЧТО ДЕЛАЛИ</div>
                    <p className="text-[#333333] text-sm leading-relaxed">{active.description}</p>
                  </div>
                  <div>
                    <div className="text-[#AAAAAA] font-mono text-xs uppercase tracking-wider mb-3">МЕТАДАННЫЕ</div>
                    <div className="space-y-2">
                      {active.period && <div className="text-[#333333] text-sm">Период: {active.period}</div>}
                      {active.bloggers && <div className="text-[#333333] text-sm">Блогеров: {active.bloggers}</div>}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F0F0EE]">
                  <p className="text-[#AAAAAA] text-xs mb-4">Хотите похожий результат для вашего бренда?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(null);
                      scrollToContact();
                    }}
                    className="w-full bg-[#111111] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-[#333333] transition-colors"
                  >
                    Обсудить проект →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

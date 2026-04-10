"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CaseCard, CaseItem } from "@/app/components/ui/CaseCard";
import { revealItem, revealParent } from "@/lib/animations";

type FilterKey = "all" | "tiktok" | "youtube" | "telegram" | "twitch";

export function Cases() {
  const allCases: CaseItem[] = useMemo(
    () => [
      {
        client: "ПЯТЁРОЧКА",
        platform: "TWITCH",
        metric: "4 664 712",
        metricLabel: "просмотров (OTS)",
        description:
          "Серия интеграций с популярными Twitch-стримерами для продвижения готовой еды. Разработаны креативные рамки, механики с донатами и баннеры.",
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
          "Постоянное продвижение продуктов бренда. YouTube-обзоры + вертикальные форматы + посевы в Telegram-каналах. Блогеры: Wylsacom, Rozetked, Droider и другие.",
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
          "Формирование имиджа водки как основы для коктейлей. Блогеры демонстрировали рецепты, которые можно повторить дома.",
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
          "Всероссийский онлайн-марафон для АНО «Национальные приоритеты». 20 интеграций с блогерами, конкурс в соцсетях, бренд-зона на VK Fest.",
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
          "Популяризация сервиса по борьбе с фишингом на портале Госуслуг. Более 13 блогеров, 4+ млн просмотров.",
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
          "Нацпроект России. Блогеры нативно рассказывали о диспансеризации через метафору тела как главного гаджета.",
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
          "Серия интеграций с блогерами-студентами. Telegram + YouTube, lifestyle-контент, ежемесячные инфоповоды.",
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
          "Коллаборация с YouTube-каналом «Гараж 54»: адаптировали гоночный болид для работы на водке. Бренд занял 1-е место.",
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
    return allCases.filter((c) => c.filter === filter);
  }, [allCases, filter]);

  const filters = ["ВСЕ", "TIKTOK", "YOUTUBE", "TELEGRAM", "TWITCH"] as const;
  const filterKeys: FilterKey[] = ["all", "tiktok", "youtube", "telegram", "twitch"];
  const activeFilterClass = "bg-[#111111] text-white";
  const inactiveFilterClass =
    "bg-transparent text-[#555555] border border-[#E0E0DE] hover:border-[#111111] hover:text-[#111111]";
  const filterBtnClass =
    "px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer";

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
                  filterBtnClass,
                  filter === filterKeys[idx] ? activeFilterClass : inactiveFilterClass,
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
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-[6px] p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Кейс ${active.client}`}
              className="mx-auto max-w-[860px] rounded-2xl border border-[#E0E0DE] bg-white p-6"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display uppercase tracking-tight text-[28px] text-[#111111]">
                    {active.client}
                  </div>
                  <div className="mt-2 text-[12px] font-mono uppercase tracking-wider text-[#AAAAAA]">
                    {active.platform} · <span className="text-[#111111]">{active.metric}</span>{" "}
                    <span className="normal-case">{active.metricLabel}</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Закрыть модальное окно"
                  className="h-10 w-10 rounded-lg border border-[#E0E0DE] text-[#111111]"
                  onClick={() => setActive(null)}
                >
                  <span className="font-mono text-[12px]">X</span>
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 text-[13px] leading-relaxed text-[#666666]">
                <div>
                  <div className="font-mono uppercase tracking-wider text-[#111111]/80">Что делали</div>
                  <p className="mt-2">
                    {active.description}
                  </p>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-wider text-[#111111]/80">Метаданные</div>
                  <p className="mt-2">
                    {active.period ? `Период: ${active.period}. ` : ""}
                    {active.bloggers ? `Блогеров: ${active.bloggers}.` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

const nav = [
  { href: "#about", label: "О нас" },
  { href: "#market", label: "Рынок" },
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
  { href: "#contact", label: "Контакт" },
] as const;

export function HeaderV3() {
  const isScrolled = useScrollTrigger(50);
  const [open, setOpen] = useState(false);

  const briefTheme = isScrolled
    ? {
        button: "border-[#111111] text-[#111111]",
        fill: "bg-[#111111]",
        textHover: "group-hover:text-white",
      }
    : {
        button: "border-[#111111] text-[#111111]",
        fill: "bg-[#111111]",
        textHover: "group-hover:text-white",
      };

  const scrollTo = (selector: string) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300",
          isScrolled ? "bg-background/95 backdrop-blur-[12px] border-b border-ok-border" : "bg-transparent",
        ].join(" ")}
      >
        <div className="ok-container">
          <div className="flex h-[72px] items-center justify-between">
            <Link
              href="#top"
              aria-label="ОК — на верх страницы"
              className="group flex items-baseline gap-3 select-none"
              onClick={() => setOpen(false)}
            >
              <span className="font-display text-[22px] font-extrabold tracking-tight uppercase text-foreground">
                ОК
              </span>
              <span className="hidden sm:block text-[12px] leading-none text-ok-muted">
                | Осмысленные коммуникации
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-[13px] text-ok-muted">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className={[
                  "relative px-5 py-2.5 border rounded-full text-sm font-medium overflow-hidden transition-colors duration-300 group",
                  briefTheme.button,
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out",
                    briefTheme.fill,
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span className={["relative z-10 transition-colors duration-300", briefTheme.textHover].join(" ")}>
                  Получить бриф
                </span>
              </button>
            </nav>

            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className={[
                "hidden sm:inline-flex md:hidden relative h-10 items-center justify-center overflow-hidden rounded-full border px-4 text-[12px] font-mono uppercase tracking-wider transition-colors duration-300 group",
                briefTheme.button,
              ].join(" ")}
            >
              <span
                className={[
                  "absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0",
                  briefTheme.fill,
                ].join(" ")}
                aria-hidden="true"
              />
              <span
                className={[
                  "relative z-10 transition-colors duration-300",
                  briefTheme.textHover,
                ].join(" ")}
              >
                Получить бриф
              </span>
            </button>

            <button
              type="button"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-ok-border text-foreground"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="font-mono text-[12px]">{open ? "X" : "≡"}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ok-container pt-28"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
              exit={{ y: 12, opacity: 0, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col gap-5">
                {nav.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-[28px] sm:text-[34px] font-display uppercase tracking-tight text-foreground"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.06 * idx } }}
                    exit={{ opacity: 0 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <button
                  type="button"
                  onClick={() => scrollTo("#contact")}
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-[4px] bg-ok-lime px-5 font-medium text-foreground"
                >
                  Получить бриф →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

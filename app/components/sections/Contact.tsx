"use client";

import { motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { revealItem, revealParent } from "@/lib/animations";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export function Contact() {
  const budgets = useMemo(
    () =>
      [
        "до 100 000 ₽",
        "100 000 — 500 000 ₽",
        "500 000 — 1 000 000 ₽",
        "более 1 000 000 ₽",
      ] as string[],
    []
  );

  const [state, setState] = useState<State>({ status: "idle" });
  const [form, setForm] = useState<{
    name: string;
    company: string;
    budget: string;
    message: string;
  }>({
    name: "",
    company: "",
    budget: "",
    message: "",
  });

  const inputClass =
    "w-full bg-transparent border border-[#333333] rounded-lg px-4 py-3 text-[#F0F0F0] placeholder-[#555555] text-sm focus:outline-none focus:border-[#C8FF00] focus:ring-1 focus:ring-[#C8FF00]/30 transition-colors duration-200";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState({ status: "error", message: data.error ?? "Не удалось отправить. Попробуйте ещё раз." });
        return;
      }
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: "Сеть недоступна. Попробуйте ещё раз." });
    }
  }

  return (
    <section id="contact" className="border-t border-ok-border">
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
            Хотим получить ваш бриф
          </motion.h2>

          <motion.p variants={revealItem} className="mt-6 max-w-[860px] text-[14px] leading-relaxed text-ok-muted">
            Расскажите нам о своей задаче. Если реклама у блогеров — это то, что вам нужно, мы скажем «да» и покажем, как именно это сделать.
            Если нет — честно объясним, куда лучше вложить бюджет.
          </motion.p>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <motion.div variants={revealItem} className="card-dark rounded-2xl p-8">
              {state.status !== "success" ? (
                <form onSubmit={onSubmit} className="grid gap-4">
                  <FloatingInput
                    id="name"
                    label="Ваше имя"
                    value={form.name}
                    onChange={(v) => setForm((s) => ({ ...s, name: v }))}
                    className={inputClass}
                  />
                  <FloatingInput
                    id="company"
                    label="Компания / бренд"
                    value={form.company}
                    onChange={(v) => setForm((s) => ({ ...s, company: v }))}
                    className={inputClass}
                  />

                  <div className="relative">
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Бюджет
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <FloatingTextarea
                    id="message"
                    label="Опишите задачу"
                    value={form.message}
                    onChange={(v) => setForm((s) => ({ ...s, message: v }))}
                    rows={5}
                    className={inputClass}
                  />

                  {state.status === "error" ? (
                    <div className="rounded-[4px] border border-[#ff4d4d]/40 bg-[#ff4d4d]/10 px-4 py-3 text-[13px] text-[#ffb3b3]">
                      {state.message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    aria-label="Отправить бриф"
                    disabled={state.status === "loading"}
                    className="w-full bg-[#C8FF00] text-[#111111] font-bold text-sm uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-[#A8E000] transition-colors duration-200 group disabled:opacity-60"
                  >
                    <span>{state.status === "loading" ? "Отправляем…" : "Отправить бриф"}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                </form>
              ) : (
                <div className="py-6">
                  <div className="flex items-center gap-4">
                    <Checkmark />
                    <div>
                      <div className="font-display uppercase tracking-tight text-foreground">Готово</div>
                      <div className="mt-1 text-[13px] leading-relaxed text-ok-muted">
                        Ответим в течение рабочего дня. Если задача нам не подходит — честно скажем.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 h-10 rounded-lg border border-[#333333] px-4 text-[12px] font-mono uppercase tracking-wider text-[#888888] hover:text-[#F0F0F0] hover:border-[#C8FF00]"
                    onClick={() => {
                      setState({ status: "idle" });
                      setForm({ name: "", company: "", budget: "", message: "" });
                    }}
                  >
                    Отправить ещё раз
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div variants={revealItem} className="card-dark rounded-2xl p-8">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#888888]">
                Контакты
              </div>
              <div className="mt-6 grid gap-4 text-[14px]">
                <a className="text-[#F0F0F0] hover:text-[#C8FF00]" href="mailto:email@ok-agency.ru">
                  email@ok-agency.ru
                </a>
                <a
                  className="text-[#F0F0F0] hover:text-[#C8FF00]"
                  href="https://t.me/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram-канал
                </a>
              </div>
              <div className="mt-8 text-[13px] leading-relaxed text-[#888888]">
                Ответим в течение рабочего дня. Если задача нам не подходит — честно скажем.
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  className: string;
}) {
  const has = value.trim().length > 0;
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={["peer", className].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute left-4 top-3 text-[13px] text-[#555555] transition-all",
          "peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[#C8FF00]",
          has ? "top-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8FF00]" : "",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  rows,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  className: string;
}) {
  const has = value.trim().length > 0;
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={["peer min-h-[140px]", className].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute left-4 top-3 text-[13px] text-[#555555] transition-all",
          "peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[#C8FF00]",
          has ? "top-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8FF00]" : "",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function Checkmark() {
  return (
    <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#C8FF00] text-[#111111]">
      <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
        <motion.path
          d="M2 10.5 L10 18 L26 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}


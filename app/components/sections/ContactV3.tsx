"use client";

import { motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { revealItem, revealParent } from "@/lib/animations";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

type FormData = {
  name: string;
  company: string;
  budget: string;
  message: string;
};

export function ContactV3() {
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
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    budget: "",
    message: "",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setState({ status: "error", message: data.error ?? "Не удалось отправить. Попробуйте ещё раз." });
        return;
      }

      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: "Сеть недоступна. Попробуйте ещё раз." });
    }
  }

  return (
    <section id="contact" className="border-t border-ok-border bg-[#F7F7F5] py-24">
      <div className="ok-container">
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
            Расскажите нам о своей задаче. Если инфлюенс-маркетинг вам подходит — честно покажем, как сделать
            это эффективно. Если не подходит — так же честно подскажем, куда лучше вложить бюджет.
          </motion.p>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <motion.div variants={revealItem} className="bg-white border border-[#E0E0DE] rounded-2xl p-8 shadow-sm">
              {state.status !== "success" ? (
                <form onSubmit={onSubmit} className="grid gap-4">
                  <Field
                    id="name"
                    label="Ваше имя"
                    value={form.name}
                    onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                    placeholder="Иван Иванов"
                  />

                  <Field
                    id="company"
                    label="Компания / бренд"
                    value={form.company}
                    onChange={(value) => setForm((prev) => ({ ...prev, company: value }))}
                    placeholder="ОК"
                  />

                  <div>
                    <label htmlFor="budget" className="block text-[#111111] text-xs font-mono uppercase tracking-wider mb-2">
                      Бюджет
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                      className="w-full bg-white border border-[#E0E0DE] rounded-xl px-4 py-3.5 text-[#111111] placeholder-[#AAAAAA] text-sm focus:border-[#111111] focus:outline-none transition-colors"
                    >
                      <option value="" disabled>
                        Выберите бюджет
                      </option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <TextareaField
                    id="message"
                    label="Опишите задачу"
                    value={form.message}
                    onChange={(value) => setForm((prev) => ({ ...prev, message: value }))}
                    placeholder="Например: запуск кампании в TikTok для нового продукта..."
                    rows={5}
                  />

                  {state.status === "error" && (
                    <div className="rounded-xl border border-[#ff4d4d]/30 bg-[#ff4d4d]/8 px-4 py-3 text-[13px] text-[#a52b2b]">
                      {state.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    aria-label="Отправить бриф"
                    disabled={state.status === "loading"}
                    className="w-full bg-[#111111] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#333333] transition-colors duration-200 group disabled:opacity-60"
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
                        Ответим в течение рабочего дня. Если задача не наша — честно скажем об этом.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 h-10 rounded-lg border border-[#E0E0DE] px-4 text-[12px] font-mono uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:border-[#111111]"
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

            <motion.div variants={revealItem} className="bg-[#111111] rounded-2xl p-8 border border-[#2A2A2A] relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(circle, #333333 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#888888]">Контакты</div>
                <div className="mt-6 grid gap-4 text-[14px]">
                  <a className="text-[#F0F0F0] hover:text-[#C8FF00]" href="mailto:email@ok-agency.ru">
                    email@ok-agency.ru
                  </a>
                  <a className="text-[#F0F0F0] hover:text-[#C8FF00]" href="https://t.me/" target="_blank" rel="noreferrer">
                    Telegram-канал
                  </a>
                </div>
                <div className="mt-8 text-[13px] leading-relaxed text-[#888888]">
                  Ответим в течение рабочего дня и сразу дадим честный фидбек по задаче.
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#111111] text-xs font-mono uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#E0E0DE] rounded-xl px-4 py-3.5 text-[#111111] placeholder-[#AAAAAA] text-sm focus:border-[#111111] focus:outline-none transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#111111] text-xs font-mono uppercase tracking-wider mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#E0E0DE] rounded-xl px-4 py-3.5 text-[#111111] placeholder-[#AAAAAA] text-sm focus:border-[#111111] focus:outline-none transition-colors min-h-[140px]"
        placeholder={placeholder}
      />
    </div>
  );
}

function Checkmark() {
  return (
    <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#C8FF00] text-[#111111]">
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

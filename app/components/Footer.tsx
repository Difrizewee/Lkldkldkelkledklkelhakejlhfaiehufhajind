"use client";

import Link from "next/link";
import { MarqueeText } from "@/app/components/ui/MarqueeText";

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#111111] text-[#F0F0F0]">
      <div className="bg-[#111111] py-4 overflow-hidden border-b border-[#2A2A2A]">
        <MarqueeText
          reverse
          tone="dark"
          speedSeconds={26}
          text="ОК · ОСМЫСЛЕННЫЕ КОММУНИКАЦИИ · ИНФЛЮЕНС-МАРКЕТИНГ · TIKTOK · ОСМЫСЛЕННО ·"
        />
      </div>

      <div className="ok-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="#top" className="inline-flex items-baseline gap-3 select-none">
              <span className="font-display text-[22px] font-extrabold tracking-tight uppercase text-[#F0F0F0]">
                ОК
              </span>
              <span className="text-[12px] leading-none text-[#888888]">
                Осмысленные коммуникации
              </span>
            </Link>
            <div className="mt-4 text-[13px] leading-relaxed text-[#888888]">
              Москва · 2019–2026
            </div>
          </div>

          <div className="text-[13px] text-[#888888]">
            <div className="font-mono uppercase tracking-wider text-[#F0F0F0]/80">Навигация</div>
            <div className="mt-3 grid gap-2">
              <a href="#about" className="hover:text-[#F0F0F0]">
                О нас
              </a>
              <a href="#cases" className="hover:text-[#F0F0F0]">
                Кейсы
              </a>
              <a href="#contact" className="hover:text-[#F0F0F0]">
                Контакт
              </a>
            </div>
          </div>

          <div className="text-[13px] text-[#888888]">
            <div className="font-mono uppercase tracking-wider text-[#F0F0F0]/80">Связь</div>
            <div className="mt-3 grid gap-2">
              <a className="hover:text-[#F0F0F0]" href="https://t.me/" target="_blank" rel="noreferrer">
                Telegram
              </a>
              <a className="hover:text-[#F0F0F0]" href="/privacy">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


"use client";

import Link from "next/link";
import { MarqueeTextV3 } from "@/app/components/ui/MarqueeTextV3";

export function FooterV3() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#111111] text-[#F0F0F0] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #333333 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative bg-[#111111] py-4 overflow-hidden border-b border-[#2A2A2A]">
        <MarqueeTextV3
          reverse
          tone="dark"
          speedSeconds={26}
          items={["ОК", "ОСМЫСЛЕННЫЕ КОММУНИКАЦИИ", "ИНФЛЮЕНС-МАРКЕТИНГ", "TIKTOK", "ОСМЫСЛЕННО"]}
        />
      </div>

      <div className="ok-container py-10 relative">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="#top" className="inline-flex items-baseline gap-3 select-none">
              <span className="font-display text-[22px] font-extrabold tracking-tight uppercase text-[#F0F0F0]">
                ОК
              </span>
              <span className="text-[12px] leading-none text-[#888888]">Осмысленные коммуникации</span>
            </Link>
            <div className="mt-4 text-[13px] leading-relaxed text-[#888888]">Москва · 2019–2026</div>
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

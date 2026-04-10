import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "ОК | Осмысленные Коммуникации — Агентство инфлюенс-маркетинга",
  description:
    "Инфлюенс-маркетинг со смыслом. TikTok, YouTube, Telegram. Эксклюзивная аналитика, честные результаты. Работаем с 2019 года.",
  keywords:
    "инфлюенс-маркетинг, блогеры, TikTok реклама, агентство блогеров, Москва",
  openGraph: {
    title: "ОК | Осмысленные Коммуникации",
    description: "Реклама у блогеров со смыслом",
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "ОК" }],
    locale: "ru_RU",
    type: "website",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jbm = JetBrains_Mono({
  variable: "--font-jbm",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${unbounded.variable} ${jbm.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

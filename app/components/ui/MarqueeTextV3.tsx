"use client";

type Props = {
  text?: string;
  items?: string[];
  speedSeconds?: number;
  reverse?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

export function MarqueeTextV3({
  text,
  items,
  speedSeconds = 30,
  reverse = false,
  tone = "light",
  className,
}: Props) {
  const normalized =
    items && items.length > 0
      ? items
      : (text ?? "")
          .split(/[·В·]/g)
          .map((part) => part.trim())
          .filter(Boolean);

  const repeated = [...normalized, ...normalized, ...normalized, ...normalized];
  const textClass =
    tone === "dark"
      ? "text-[#F0F0F0] text-sm font-mono uppercase tracking-widest"
      : "text-[#999999] text-xs font-mono uppercase tracking-widest";
  const dotClass = tone === "dark" ? "text-[#C8FF00] opacity-80" : "text-[#C8FF00] opacity-60";

  return (
    <div className={["overflow-hidden whitespace-nowrap", className].filter(Boolean).join(" ")}>
      <div
        className="inline-flex will-change-transform"
        style={{
          animation: `marquee ${speedSeconds}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center">
            <span className={["px-6", textClass].join(" ")}>{item}</span>
            <span className={dotClass}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

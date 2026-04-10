"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "default" | "hover" | "case";

function isCoarsePointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(pointer: coarse)")?.matches ?? true;
}

function isTouchLike() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(hover: none)")?.matches ?? true;
}

export function CustomCursor() {
  const enabled = useMemo(() => !isTouchLike() && !isCoarsePointer(), []);
  const [mode, setMode] = useState<Mode>("default");

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const ringLag = useMemo(() => 0.14, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * ringLag;
      ring.current.y += (pos.current.y - ring.current.y) * ringLag;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, ringLag]);

  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const caseEl = el.closest?.("[data-cursor='case']") as HTMLElement | null;
      if (caseEl) return setMode("case");
      const hoverEl = el.closest?.("a,button,[role='button'],input,textarea,select,[data-cursor='hover']") as HTMLElement | null;
      if (hoverEl) return setMode("hover");
      setMode("default");
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => window.removeEventListener("mouseover", onOver);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9998] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ok-lime mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={[
          "custom-cursor pointer-events-none fixed left-0 top-0 z-[9997] grid h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ok-border text-[11px] font-mono uppercase tracking-wider text-ok-lime transition-[width,height,background,border-color,color] duration-150 will-change-transform",
          mode === "hover" ? "h-[60px] w-[60px] border-ok-lime bg-ok-lime/10" : "",
          mode === "case" ? "h-[60px] w-[120px] rounded-[4px] border-ok-lime bg-ok-lime text-[#0A0A0A]" : "",
        ].join(" ")}
      >
        {mode === "case" ? "СМОТРЕТЬ" : null}
      </div>
    </>
  );
}

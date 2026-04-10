"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
  durationMs?: number;
  easing?: (t: number) => number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp(target: number, start: number, enabled: boolean, options?: Options) {
  const durationMs = options?.durationMs ?? 1500;
  const easing = options?.easing ?? easeOutCubic;
  const [value, setValue] = useState(start);
  const raf = useRef<number | null>(null);
  const startTs = useRef<number | null>(null);
  const from = useRef(start);

  const to = useMemo(() => target, [target]);

  useEffect(() => {
    if (!enabled) return;
    from.current = start;
    startTs.current = null;

    const tick = (ts: number) => {
      if (startTs.current == null) startTs.current = ts;
      const elapsed = ts - startTs.current;
      const t = Math.min(1, Math.max(0, elapsed / durationMs));
      const eased = easing(t);
      const next = Math.round(from.current + (to - from.current) * eased);
      setValue(next);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, durationMs, easing, start, to]);

  return value;
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Props = {
  onDone?: () => void;
};

export function Preloader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "curtain" | "done">("loading");

  const easeInOut = useMemo(() => (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2), []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOut(t);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("curtain");
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [easeInOut]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background text-foreground"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ y: "0%" }}
            animate={
              phase === "curtain"
                ? { y: "-100%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                : { y: "0%" }
            }
            onAnimationComplete={() => {
              if (phase === "curtain") {
                setPhase("done");
                onDone?.();
              }
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="font-mono text-[clamp(48px,8vw,120px)] leading-none tracking-tight tabular-nums">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


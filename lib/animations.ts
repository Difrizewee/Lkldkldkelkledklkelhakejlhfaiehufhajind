export const revealParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

export const revealItem = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export const lineReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
} as const;


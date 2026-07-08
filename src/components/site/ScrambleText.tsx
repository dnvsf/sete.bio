import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({
  text,
  duration = 700,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  duration?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "div";
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const start = performance.now();
    const chars = text.split("");
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const revealCount = Math.floor(p * chars.length);
      const next = chars
        .map((c, i) => {
          if (i < revealCount || c === " ") return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOut(next);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return <Tag className={className}>{out}</Tag>;
}

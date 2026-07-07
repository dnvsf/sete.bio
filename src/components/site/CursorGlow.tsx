import { useEffect, useState } from "react";

// Sutil glow vermelho seguindo o cursor (desktop apenas).
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const on = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity"
      style={{
        background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, oklch(0.62 0.24 25 / 0.10), transparent 60%)`,
      }}
    />
  );
}

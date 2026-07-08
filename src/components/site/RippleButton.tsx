import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, useState } from "react";

type Ripple = { id: number; x: number; y: number };

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

export const RippleButton = forwardRef<HTMLButtonElement, Props>(function RippleButton(
  { className = "", children, onClick, ...rest },
  ref,
) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [flash, setFlash] = useState(0);

  function handle(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setFlash((n) => n + 1);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 750);
    onClick?.(e);
  }

  return (
    <button
      ref={ref}
      onClick={handle}
      className={`relative isolate overflow-hidden transition-transform duration-150 active:scale-[0.96] ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {flash > 0 && (
        <span
          key={flash}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, oklch(1 0 0 / 0.25), transparent 70%)",
            animation: "ripple-flash 0.35s ease-out forwards",
          }}
        />
      )}
      {ripples.map((r) => (
        <span key={r.id} className="pointer-events-none absolute" style={{ left: r.x, top: r.y }}>
          <span
            className="absolute rounded-full"
            style={{
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              background:
                "radial-gradient(circle, oklch(0.62 0.24 25 / 0.9), oklch(0.62 0.24 25 / 0) 70%)",
              animation: "ripple-expand 0.7s ease-out forwards",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              background:
                "radial-gradient(circle, oklch(0.98 0 0 / 0.6), transparent 70%)",
              animation: "ripple-expand 0.5s ease-out forwards",
              animationDelay: "0.08s",
            }}
          />
        </span>
      ))}
    </button>
  );
});

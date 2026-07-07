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

  function handle(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 700);
    onClick?.(e);
  }

  return (
    <button
      ref={ref}
      onClick={handle}
      className={`relative overflow-hidden isolate active:scale-[0.98] transition-transform ${className}`}
      {...rest}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 12,
            height: 12,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, oklch(0.62 0.24 25 / 0.9), oklch(0.62 0.24 25 / 0) 70%)",
            animation: "ripple-expand 0.7s ease-out forwards",
          }}
        />
      ))}
      <style>{`@keyframes ripple-expand { from { width:12px; height:12px; opacity:0.9 } to { width:360px; height:360px; opacity:0 } }`}</style>
    </button>
  );
});

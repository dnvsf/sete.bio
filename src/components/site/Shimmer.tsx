export function Shimmer({
  className = "",
  rounded = "rounded-md",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <span
      aria-hidden
      className={`relative inline-block overflow-hidden bg-white/[0.04] ${rounded} ${className}`}
    >
      <span
        className="absolute inset-0 animate-shimmer-slide"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.06), transparent)",
        }}
      />
    </span>
  );
}

export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div
        className="absolute animate-aurora-a"
        style={{
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.22 0.01 260 / 0.7), oklch(0.13 0.005 260 / 0) 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute animate-aurora-b"
        style={{
          bottom: "-25%",
          right: "-15%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.20 0.008 260 / 0.65), oklch(0.13 0.005 260 / 0) 65%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}

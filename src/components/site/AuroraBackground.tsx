export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-white">
      {/* Gradient Light Superior - Cinza muito suave */}
      <div
        className="absolute animate-aurora-a"
        style={{
          top: "-20%",
          left: "-10%",
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.92 0.002 0 / 0.4), oklch(0.98 0.002 0 / 0.15), oklch(0.98 0.002 0 / 0) 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Gradient Light Inferior - Cinza muito suave */}
      <div
        className="absolute animate-aurora-b"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "75vw",
          height: "75vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.90 0.002 0 / 0.3), oklch(0.95 0.002 0 / 0.12), oklch(0.98 0.002 0 / 0) 75%)",
          filter: "blur(110px)",
        }}
      />

      {/* Glow Central Sutil - Luz suave no centro */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh]"
        style={{
          background: "radial-gradient(circle at center, oklch(0.92 0.002 0 / 0.15), transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      {/* Accent Glow - Pequeno e Dinâmico */}
      <div
        className="absolute top-1/3 left-1/4"
        style={{
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.88 0.002 0 / 0.1), transparent 60%)",
          filter: "blur(80px)",
          animation: "aurora-a 50s ease-in-out infinite",
          animationDelay: "5s",
        }}
      />

      {/* Vignette Suave - Bordas com leve sombra */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.92 0.002 0 / 0.2) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

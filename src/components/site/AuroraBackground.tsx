export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-background">
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
            "radial-gradient(circle, oklch(0.42 0.12 15 / 0.18), oklch(0.24 0.04 15 / 0.08), transparent 75%)",
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
            "radial-gradient(circle, oklch(0.36 0.1 15 / 0.14), oklch(0.22 0.03 15 / 0.06), transparent 75%)",
          filter: "blur(110px)",
        }}
      />

      {/* Glow Central Sutil - Luz suave no centro */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh]"
        style={{
          background: "radial-gradient(circle at center, oklch(0.3 0.06 15 / 0.09), transparent 70%)",
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
            "radial-gradient(circle, oklch(0.44 0.13 15 / 0.08), transparent 60%)",
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
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.08 0 0 / 0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

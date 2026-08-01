export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-black">
      {/* Aurora Primária - Vermelho Quente Superior */}
      <div
        className="absolute animate-aurora-a"
        style={{
          top: "-15%",
          left: "-10%",
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.58 0.25 28 / 0.35), oklch(0.45 0.18 25 / 0.15), oklch(0.10 0.02 20 / 0) 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Aurora Secundária - Vermelho Escuro Inferior */}
      <div
        className="absolute animate-aurora-b"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "75vw",
          height: "75vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.45 0.20 25 / 0.25), oklch(0.35 0.15 25 / 0.10), oklch(0.10 0.02 20 / 0) 75%)",
          filter: "blur(110px)",
        }}
      />

      {/* Glow Central Sutil - Profundidade */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh]"
        style={{
          background: "radial-gradient(circle at center, oklch(0.58 0.25 28 / 0.12), transparent 70%)",
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
            "radial-gradient(circle, oklch(0.58 0.25 28 / 0.08), transparent 60%)",
          filter: "blur(80px)",
          animation: "aurora-a 50s ease-in-out infinite",
          animationDelay: "5s",
        }}
      />

      {/* Vignette Suave - Bordas mais escuras */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.08 0.008 20 / 0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

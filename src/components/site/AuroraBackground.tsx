export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-black">
      <div
        className="absolute animate-aurora-a"
        style={{
          top: "-10%",
          left: "-5%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.45 0.20 25 / 0.25), oklch(0.10 0.02 20 / 0) 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute animate-aurora-b"
        style={{
          bottom: "-15%",
          right: "-5%",
          width: "65vw",
          height: "65vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.40 0.18 20 / 0.20), oklch(0.10 0.02 20 / 0) 70%)",
          filter: "blur(90px)",
        }}
      />
      {/* Adicionando um brilho central sutil */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh]"
        style={{
          background: "radial-gradient(circle at center, oklch(0.55 0.22 25 / 0.08), transparent 80%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}

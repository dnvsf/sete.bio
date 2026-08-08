import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Lock } from "lucide-react";

type Phase = "idle" | "arming" | "engaged";

const LowProfileContext = createContext<{ phase: Phase }>({ phase: "idle" });

export function useLowProfile() {
  return useContext(LowProfileContext);
}

interface LockPopState {
  id: number;
  x: number;
  y: number;
}

/* ===== Cadeado que aparece ao tentar clicar ===== */
function LockPop({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[70]"
      style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1.15, 1, 0.9],
        rotate: [0, -8, 8, -5, 0],
      }}
      transition={{ duration: 1, times: [0, 0.2, 0.75, 1], ease: "easeOut" }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <Lock size={20} className="text-white/80" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ===== Interruptor LOW PROFILE (sem card) ===== */
const TRACK_W = 188;
const TRACK_H = 34;
const KNOB = 26;
const PAD = 4;
const KNOB_ON = TRACK_W - KNOB - PAD;
const EASE = [0.22, 1, 0.36, 1] as const;
const SWITCH_DURATION = 0.85;

function LowProfileSwitch({ on, onActivate }: { on: boolean; onActivate: () => void }) {
  const reduced = useReducedMotion();
  const target = on ? KNOB_ON : PAD;
  const color = on ? "oklch(0.66 0.16 150)" : "oklch(0.60 0.20 27)";
  const duration = reduced ? 0.001 : SWITCH_DURATION;
  const [pressed, setPressed] = useState(false);
  const [pulse, setPulse] = useState(0);

  const handleClick = () => {
    setPulse((p) => p + 1);
    onActivate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="pointer-events-auto flex flex-col items-center gap-5"
    >
      <div className="relative h-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={on ? "on" : "off"}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mono block whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.5em] text-white/45"
          >
            {on ? "Modo Low Profile" : "Modo Público"}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        aria-label="Ativar modo low profile"
        aria-pressed={on}
        onClick={handleClick}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        className="relative rounded-full border bg-transparent"
        style={{
          width: TRACK_W,
          height: TRACK_H,
          borderColor: on ? "oklch(0.72 0.16 150 / 0.28)" : "oklch(0.70 0.18 27 / 0.28)",
          transition: "border-color 900ms cubic-bezier(0.22,1,0.36,1)",
        }}
        animate={{
          scale: pressed ? 0.965 : 1,
          boxShadow: pressed
            ? `0 0 0 ${on ? "oklch(0.66 0.16 150 / 0.10)" : "oklch(0.60 0.20 27 / 0.10)"}`
            : `0 8px 24px -8px ${on ? "oklch(0.66 0.16 150 / 0.22)" : "oklch(0.60 0.20 27 / 0.18)"}`,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduced ? {} : { scale: 1.02 }}
        whileTap={reduced ? {} : { scale: 0.96 }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={on ? "on" : "off"}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mono text-[9px] font-medium uppercase tracking-[0.4em] text-white/40"
            >
              {on ? "Ativo" : "Ativar"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Ripple de clique sutil */}
        {!reduced && (
          <motion.span
            key={pulse}
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${on ? "oklch(0.66 0.16 150 / 0.45)" : "oklch(0.60 0.20 27 / 0.4)"}`,
            }}
            initial={{ opacity: 0.7, scale: 0.92 }}
            animate={{ opacity: 0, scale: 1.18 }}
            transition={{ duration: 0.65, ease: EASE }}
          />
        )}

        {/* rastro */}
        {!reduced &&
          [0.22, 0.12, 0.06].map((o, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute top-1/2 rounded-full"
              style={{
                width: KNOB,
                height: KNOB,
                background: color,
                opacity: o,
                filter: "blur(7px)",
              }}
              animate={{ left: target, y: "-50%" }}
              transition={{ duration: duration + 0.08 * (i + 1), ease: EASE }}
            />
          ))}

        <motion.span
          className="absolute top-1/2 rounded-full"
          style={{ width: KNOB, height: KNOB }}
          animate={{
            left: target,
            y: "-50%",
            scale: pressed ? 0.88 : 1,
            background: color,
            boxShadow: `0 0 18px ${on ? "oklch(0.66 0.16 150 / 0.45)" : "oklch(0.60 0.20 27 / 0.4)"}`,
          }}
          transition={{ duration, ease: EASE }}
        />
      </motion.button>
    </motion.div>

  );
}


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const small = window.innerWidth < 768;
      setIsMobile(coarse || small);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export function LowProfileProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<Phase>("idle");
  const [locks, setLocks] = useState<LockPopState[]>([]);

  const engage = useCallback(() => {
    setPhase((p) => (p === "idle" ? "arming" : p));
  }, []);

  // O interruptor vira sozinho depois de ~1,5s em toda entrada
  useEffect(() => {
    const t = setTimeout(engage, 1500);
    return () => clearTimeout(t);
  }, [engage]);

  useEffect(() => {
    if (phase !== "arming") return;
    const t = setTimeout(() => setPhase("engaged"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = phase === "engaged" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Bloqueia cópia, seleção, menu de contexto e atalhos de inspeção
  useEffect(() => {
    if (typeof document === "undefined") return;
    const block = (e: Event) => e.preventDefault();
    const keys = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        k === "f12" ||
        ((e.ctrlKey || e.metaKey) && ["c", "u", "s", "a", "p"].includes(k)) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(k))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("selectstart", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", keys);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("selectstart", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown", keys);
    };
  }, []);

  const blockClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = Date.now() + Math.random();
    setLocks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setLocks((prev) => prev.filter((l) => l.id !== id)), 1000);
  }, []);

  // Em mobile reduzimos blur e saturacao para evitar travamentos
  const blur = phase === "idle" ? 0 : phase === "arming" ? (isMobile ? 4 : 11) : isMobile ? 6 : 14;
  const overlayBlur = phase === "idle" ? 0 : isMobile ? 4 : 8;
  const dark = phase === "idle" ? 0 : phase === "arming" ? 0.82 : 0.94;
  // Mesma curva e duração da bola do interruptor
  const sync = {
    duration: reduced ? 0.001 : SWITCH_DURATION,
    ease: EASE,
  } as const;
  const value = useMemo(() => ({ phase }), [phase]);

  return (
    <LowProfileContext.Provider value={value}>
      <div
        onClickCapture={blockClick}
        className="select-none"
        aria-hidden={phase === "engaged"}
        style={{ cursor: "not-allowed", WebkitUserSelect: "none", userSelect: "none" }}
      >
        <motion.div
          initial={false}
          animate={
            reduced
              ? { filter: `blur(${phase === "idle" ? 0 : 10}px)` }
              : {
                  filter: `blur(${blur}px) saturate(${phase === "engaged" ? 0.5 : 1})`,
                  scale: phase === "engaged" ? 1.02 : 1,
                }
          }
          transition={sync}
          style={{ pointerEvents: "none" }}
        >
          {children}
        </motion.div>
      </div>

      {/* Escurecimento até o preto, em sincronia com a bola do interruptor */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[55]"
        style={{ background: "oklch(0.05 0 0)" }}
        initial={false}
        animate={{ opacity: dark }}
        transition={sync}
      />

      {/* Overlay de blur unificado para manter cards e conteúdo com visual consistente */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[58]"
        style={{ backdropFilter: "blur(8px) saturate(0.6)" }}
        initial={false}
        animate={{ opacity: phase === "idle" ? 0 : phase === "arming" ? 0.65 : 1 }}
        transition={sync}
      />



      {/* Interruptor sempre visível */}
      <div className="pointer-events-none fixed inset-0 z-[65] grid place-items-center px-6">
        <LowProfileSwitch on={phase !== "idle"} onActivate={engage} />
      </div>

      <AnimatePresence>
        {locks.map((l) => (
          <LockPop key={l.id} x={l.x} y={l.y} />
        ))}
      </AnimatePresence>
    </LowProfileContext.Provider>
  );
}

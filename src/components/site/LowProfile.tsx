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

const STORAGE_KEY = "sete:low-profile";

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
const TRACK_W = 128;
const KNOB_W = 54;
const PAD = 6;
const KNOB_ON = TRACK_W - KNOB_W - PAD;

function LowProfileSwitch({ on, onActivate }: { on: boolean; onActivate: () => void }) {
  const reduced = useReducedMotion();
  const target = on ? KNOB_ON : PAD;
  const color = on ? "oklch(0.62 0.19 150)" : "oklch(0.58 0.22 27)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className="pointer-events-auto flex flex-col items-center gap-4"
    >
      <div className="relative h-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={on ? "on" : "off"}
            initial={{ opacity: 0, filter: "blur(6px)", y: 4 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(6px)", y: -4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mono block whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em] text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            {on ? "Low Profile" : "Influencer"}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Ativar modo low profile"
        aria-pressed={on}
        onClick={onActivate}
        className="relative rounded-full border bg-transparent transition-colors duration-700"
        style={{
          width: TRACK_W,
          height: KNOB_W + PAD * 2,
          borderColor: on ? "oklch(0.72 0.19 150 / 0.35)" : "oklch(0.70 0.20 27 / 0.35)",
        }}
      >
        {/* rastro */}
        {!reduced &&
          [0.28, 0.16, 0.08].map((o, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute top-1/2 rounded-full"
              style={{
                width: KNOB_W,
                height: KNOB_W,
                background: color,
                opacity: o,
                filter: "blur(6px)",
              }}
              animate={{ left: target, y: "-50%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                delay: 0.05 * (i + 1),
              }}
            />
          ))}

        <motion.span
          className="absolute top-1/2 grid place-items-center rounded-full"
          style={{ width: KNOB_W, height: KNOB_W }}
          animate={{
            left: target,
            y: "-50%",
            background: color,
            boxShadow: `0 0 24px ${on ? "oklch(0.62 0.19 150 / 0.5)" : "oklch(0.58 0.22 27 / 0.45)"}`,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={on ? "on" : "off"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-white"
            >
              {on ? "On" : "Off"}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </button>
    </motion.div>
  );
}


export function LowProfileProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [restored, setRestored] = useState(false);
  const [locks, setLocks] = useState<LockPopState[]>([]);

  // Restaura estado salvo no navegador
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "on") {
        setRestored(true);
        setPhase("engaged");
      }
    } catch {
      /* noop */
    }
  }, []);

  const engage = useCallback(() => {
    setPhase((p) => (p === "idle" ? "arming" : p));
  }, []);

  // O interruptor vira sozinho depois de ~1,5s (só na primeira visita)
  useEffect(() => {
    if (restored) return;
    const t = setTimeout(engage, 1500);
    return () => clearTimeout(t);
  }, [engage, restored]);

  useEffect(() => {
    if (phase !== "arming") return;
    const t = setTimeout(() => setPhase("engaged"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "engaged") return;
    try {
      localStorage.setItem(STORAGE_KEY, "on");
    } catch {
      /* noop */
    }
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

  const blur = phase === "idle" ? 0 : phase === "arming" ? 6 : 14;
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
          transition={{
            duration: restored ? 0 : phase === "engaged" ? 2.4 : 1.6,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{ pointerEvents: "none" }}
        >
          {children}
        </motion.div>
      </div>

      {/* Escurecimento até o preto, em sincronia com o borrão */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[55]"
        style={{ background: "oklch(0.05 0 0)" }}
        initial={false}
        animate={{ opacity: phase === "engaged" ? 0.92 : phase === "arming" ? 0.45 : 0 }}
        transition={{
          duration: restored ? 0 : phase === "engaged" ? 2.4 : 1.6,
          ease: [0.2, 0.8, 0.2, 1],
        }}
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

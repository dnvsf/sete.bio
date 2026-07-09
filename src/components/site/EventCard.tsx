import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { Event } from "@/data/events";
import { RippleButton } from "./RippleButton";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function EventCard({ event, index = 0 }: { event: Event; index?: number }) {
  const d = new Date(event.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="hover-red-border rounded-2xl border border-white/8 bg-card/60 p-4 backdrop-blur-sm"
      style={{ ["--led-offset" as never]: `${(index * 0.75) % 6}s` }}
    >
      <div className="flex gap-4">
        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-black/40 p-2 text-center">
          <div className="mono text-[10px] uppercase text-accent-red-glow">{DIAS[d.getDay()]}</div>
          <div className="mono text-2xl font-bold leading-none">
            {String(d.getDate()).padStart(2, "0")}
          </div>
          <div className="mono text-[10px] uppercase text-muted-foreground">{MESES[d.getMonth()]}</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-bold">{event.title}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link
              to="/$slug"
              params={{ slug: event.partnerSlug }}
              className="mono uppercase tracking-wider text-foreground/80 hover:text-accent-red-glow"
            >
              {event.partnerName}
            </Link>
            <span>·</span>
            <span>{event.city}</span>
            <span>·</span>
            <span className="mono">
              {String(d.getHours()).padStart(2, "0")}:{String(d.getMinutes()).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <RippleButton
              onClick={() => window.open(event.listUrl, "_blank")}
              className="rounded-lg bg-accent-red px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Entrar na lista
            </RippleButton>
            {event.ticketUrl && (
              <RippleButton
                onClick={() => window.open(event.ticketUrl, "_blank")}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground/90 hover:border-accent-red-glow"
              >
                Ingresso
              </RippleButton>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { SevenGlyph } from "./SevenGlyph";

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="my-10 flex items-center gap-4" aria-hidden={!label}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label && <span>{label}</span>}
        <span className="animate-pulse-red inline-flex h-6 w-6 items-center justify-center rounded-full text-accent-red-glow">
          <SevenGlyph size={16} />
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

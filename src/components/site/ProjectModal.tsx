import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { InstagramIcon, TikTokIcon, FacebookIcon, GlobeIcon } from "./icons";

export interface ProjectLink {
  label: string;
  url: string;
  type: "instagram" | "tiktok" | "facebook" | "website";
  handle?: string;
}

export interface ProjectData {
  name: string;
  description: string;
  links: ProjectLink[];
}

interface ProjectModalProps {
  open: boolean;
  project: ProjectData | null;
  onClose: () => void;
}

function PlatformIcon({ type }: { type: string }) {
  const iconSize = 18;
  switch (type) {
    case "instagram":
      return <InstagramIcon size={iconSize} />;
    case "tiktok":
      return <TikTokIcon size={iconSize} />;
    case "facebook":
      return <FacebookIcon size={iconSize} />;
    case "website":
      return <GlobeIcon size={iconSize} />;
    default:
      return null;
  }
}

export function ProjectModal({ open, project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[oklch(0.16_0.008_260_/0.95)] backdrop-blur-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: "radial-gradient(circle at 50% 0%, oklch(0.95 0.01 260 / 0.08), transparent 60%)",
              }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-6">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {project.name}
              </h2>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>

            {/* Description */}
            <div className="relative z-10 px-6 pt-3 pb-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Links */}
            <div className="relative z-10 px-6 pt-2 pb-6 flex flex-col gap-2">
              {project.links.map((link, i) => (
                <motion.a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-3 transition-all hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <span className="text-foreground opacity-70 group-hover:opacity-100 transition-opacity">
                    <PlatformIcon type={link.type} />
                  </span>
                  <span className="text-sm font-medium text-foreground tracking-tight">
                    {link.type === "website" ? link.label : link.handle || link.label}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-60 transition-opacity"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

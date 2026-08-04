import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { LinkCard } from "@/components/site/LinkCard";
import { SectionDivider } from "@/components/site/SectionDivider";
import { BackgroundSevens } from "@/components/site/SevenGlyph";

export const Route = createFileRoute("/biker")({
  head: () => ({
    meta: [
      { title: "Sete Biker | Conteúdo de entregador" },
      {
        name: "description",
        content:
          "YouTube, TikTok e Instagram do Sete Biker: o dia a dia real do entregador. Parcerias com empresas via direct.",
      },
      { property: "og:title", content: "Sete Biker | Conteúdo de entregador" },
      {
        property: "og:description",
        content:
          "YouTube, TikTok e Instagram do Sete Biker: o dia a dia real do entregador. Parcerias com empresas via direct.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BikerPage,
});

const PARTNER_DM = "https://ig.me/m/setexxl";

function BikerPage() {
  return (
    <div className="relative min-h-screen">
      <BackgroundSevens />

      <div className="relative z-10 mx-auto max-w-xl px-4 pb-28 pt-16 sm:pt-24">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sete Biker</h1>
          <p className="mono mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            O dia a dia do entregador
          </p>
        </motion.header>

        <div className="flex flex-col gap-4">
          <div style={{ ["--led-offset" as never]: "0s" }}>
            <LinkCard
              label="YouTube"
              handle="@setebiker"
              icon={<YouTubeIcon size={26} />}
              href="https://youtube.com/@setebiker"
              delay={0.05}
            />
          </div>
          <div style={{ ["--led-offset" as never]: "0.2s" }}>
            <LinkCard
              label="TikTok"
              handle="@setebiker"
              icon={<TikTokIcon size={26} />}
              href="https://tiktok.com/@setebiker"
              delay={0.15}
            />
          </div>
          <div style={{ ["--led-offset" as never]: "0.4s" }}>
            <LinkCard
              label="Instagram"
              handle="@setebiker_"
              icon={<InstagramIcon size={26} />}
              href="https://instagram.com/setebiker_"
              delay={0.25}
            />
          </div>
        </div>

        <SectionDivider label="Parcerias" />

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          style={{ ["--led-offset" as never]: "0.6s" }}
          className="hover-black-border relative overflow-hidden rounded-2xl border border-black/8 bg-card p-6 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Sua marca no dia a dia do entregador
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Empresas de delivery, acessórios, manutenção, seguros e apps: crio conteúdo real na rua,
            com quem vive a entrega todos os dias. Aberto para publis, testes de produto e
            campanhas de longo prazo.
          </p>

          <motion.a
            href={PARTNER_DM}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mono mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-background"
          >
            <InstagramIcon size={14} />
            Fechar parceria — direct @setexxl
          </motion.a>
        </motion.section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← sete.bio
          </Link>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { SocialCard } from "@/components/site/SocialCard";
import { SectionDivider } from "@/components/site/SectionDivider";
import { PageShell, PageStack } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";

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
const led = (offset: string) => ({ ["--led-offset" as never]: offset });

function BikerPage() {
  return (
    <PageShell>
      <PageHeader title="Sete Biker" subtitle="O dia a dia do entregador" />

      <PageStack>
        <div style={led("0s")}>
          <SocialCard
            label="YouTube"
            handle="@setebiker"
            icon={<YouTubeIcon size={26} />}
            href="https://youtube.com/@setebiker"
            delay={0.05}
          />
        </div>
        <div style={led("0.2s")}>
          <SocialCard
            label="TikTok"
            handle="@setebiker"
            icon={<TikTokIcon size={26} />}
            href="https://tiktok.com/@setebiker"
            delay={0.15}
          />
        </div>
        <div style={led("0.4s")}>
          <SocialCard
            label="Instagram"
            handle="@setebiker_"
            icon={<InstagramIcon size={26} />}
            href="https://instagram.com/setebiker_"
            delay={0.25}
          />
        </div>
      </PageStack>

      <SectionDivider label="Parcerias" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7 }}
        style={led("0.6s")}
        className="hover-black-border card-pad relative overflow-hidden rounded-2xl border border-black/8 bg-card shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      >
        <h2 className="text-fluid-title font-bold tracking-tight text-foreground">
          Sua marca no dia a dia do entregador
        </h2>
        <p className="text-fluid-body mt-2 text-muted-foreground">
          Empresas de delivery, acessórios, manutenção, seguros e apps: crio conteúdo real na rua,
          com quem vive a entrega todos os dias. Aberto para publis, testes de produto e campanhas
          de longo prazo.
        </p>

        <motion.a
          href={PARTNER_DM}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mono text-fluid-meta tap-target mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-center font-bold uppercase tracking-widest text-background"
        >
          <InstagramIcon size={14} />
          <span className="truncate">Fechar parceria · @setexxl</span>
        </motion.a>
      </motion.section>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="mono text-fluid-meta uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← sete.bio
        </Link>
      </div>
    </PageShell>
  );
}

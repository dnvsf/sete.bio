import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LivePixIcon } from "./icons";
import { Shimmer } from "./Shimmer";
import {
  createLivePixPayment,
  getLivePixRecentMessages,
} from "@/lib/livePix.functions";

function formatBRL(amountCents: number): string {
  return (amountCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `${mins}min atrás`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
}

const AMOUNTS = [
  { label: "R$ 5", value: 500 },
  { label: "R$ 10", value: 1000 },
  { label: "R$ 20", value: 2000 },
  { label: "R$ 50", value: 5000 },
  { label: "R$ 100", value: 10000 },
];

export function LivePixModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const createPayment = useServerFn(createLivePixPayment);
  const fetchMessages = useServerFn(getLivePixRecentMessages);

  const { data: messagesData, refetch: refetchMessages } = useQuery({
    queryKey: ["livepix-messages"],
    queryFn: () => fetchMessages(),
    staleTime: 30_000,
    refetchInterval: 60_000,
    enabled: open,
  });

  useEffect(() => {
    if (open) {
      setPaymentUrl(null);
      setSelectedAmount(1000);
    }
  }, [open]);

  const handleSend = async () => {
    setIsProcessing(true);
    try {
      const result = await createPayment({ amount: selectedAmount });
      if (result.success && result.redirectUrl) {
        setPaymentUrl(result.redirectUrl);
      } else {
        // Fallback: abrir perfil do LivePix
        setPaymentUrl(`https://livepix.gg/setexxl`);
      }
    } catch {
      setPaymentUrl(`https://livepix.gg/setexxl`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Apoiar via LivePix"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl border border-black/10 bg-background p-6 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl text-foreground">
                <LivePixIcon size={22} />
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">LivePix</div>
                <div className="font-bold">Apoiar o canal</div>
              </div>
            </div>

            {/* Payment section */}
            {!paymentUrl ? (
              <>
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Escolha o valor
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {AMOUNTS.map((a) => (
                      <button
                        key={a.value}
                        onClick={() => setSelectedAmount(a.value)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                          selectedAmount === a.value
                            ? "border-[oklch(0.70_0.18_280)] bg-[oklch(0.70_0.18_280/0.15)] text-foreground"
                            : "border-black/10 bg-black/[0.03] text-muted-foreground hover:text-foreground hover:border-black/15"
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleSend}
                  disabled={isProcessing}
                  className="w-full rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-all disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.55 0.18 280), oklch(0.45 0.20 300))",
                  }}
                  animate={{
                    scale: isProcessing ? 0.98 : 1,
                  }}
                >
                  {isProcessing ? "Gerando..." : "Gerar QR Code / Link"}
                </motion.button>
              </>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-black/10 bg-black/[0.03] p-4">
                  <div className="text-xs text-muted-foreground mb-2">Seu QR Code / Link está pronto:</div>
                  <motion.a
                    href={paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-lg py-3 text-center text-sm font-bold text-foreground"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.55 0.18 280), oklch(0.45 0.20 300))",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Pagar {formatBRL(selectedAmount)}
                  </motion.a>
                  <div className="mt-2 text-center">
                    <a
                      href={paymentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground underline hover:text-foreground"
                    >
                      Abrir em nova aba
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            {messagesData && messagesData.messages.length > 0 && (
              <>
                <div className="my-5 h-px bg-white/10" />

                {/* Feed de Apoios */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Últimos apoios
                  </div>
                  <div className="space-y-2">
                    {(messagesData.messages || []).map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-xl border border-black/8 bg-white/[0.02] p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-foreground truncate">
                              {msg.username || "Anônimo"}
                            </div>
                            {msg.message && (
                              <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                                {msg.message}
                              </div>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-bold text-[oklch(0.75_0.15_280)]">
                              {formatBRL(msg.amount)}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {timeAgo(msg.createdAt)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-xl border border-black/10 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

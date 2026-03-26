"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  MessageCircle,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamPayment {
  id: string;
  name: string;
  players: { id: string; name: string; position: string }[];
  payment?: { status: "UNPAID" | "HALF_PAID" | "PAID" } | null;
}

const PIX_KEY = "msilva24624@gmail.com";
const WHATSAPP_NUMBER = "5511999999999"; // Update with real number

const statusConfig = {
  UNPAID: { label: "Não pago", className: "badge-unpaid", emoji: "🔴" },
  HALF_PAID: {
    label: "Pago metade (R$100)",
    className: "badge-half",
    emoji: "🟡",
  },
  PAID: { label: "Pago total (R$200)", className: "badge-paid", emoji: "🟢" },
};

export default function PaymentScreen() {
  const [copied, setCopied] = useState(false);
  const [teams, setTeams] = useState<TeamPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      "Olá! Estou enviando o comprovante de pagamento da inscrição do II Festival Família Fanfarrões.",
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0d0f11] px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <p
          className="text-[#0080cc] text-xs uppercase tracking-widest font-semibold mb-1"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          II Festival Família Fanfarrões
        </p>
        <h2
          className="text-4xl font-black uppercase text-white"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Pagamento
        </h2>
      </div>

      {/* Payment Info Card */}
      <div className="bg-[#121315] border border-[#0080cc]/25 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={16} className="text-[#0080cc]" />
          <h3
            className="text-white font-medium text-sm uppercase tracking-wide"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Pagamento em 2 Etapas
          </h3>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 bg-[#0080cc]/10 border border-[#0080cc]/20 rounded-xl p-3">
            <span className="text-2xl">1️⃣</span>
            <div>
              <p className="text-white font-medium text-sm">50% na inscrição</p>
              <p
                className="text-[#0080cc] font-medium text-lg"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                R$ 100,00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl p-3">
            <span className="text-2xl">2️⃣</span>
            <div>
              <p className="text-white font-medium text-sm">
                50% na última semana
              </p>
              <p
                className="text-white font-medium text-lg"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                R$ 100,00
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <p className="text-red-400 text-xs leading-relaxed">
            ⚠️ Caso o time desista após a inscrição, perde os 50% já pagos.
          </p>
        </div>
      </div>

      {/* PIX Card */}
      <div className="bg-gradient-to-br from-[#0080cc]/15 to-[#121315] border border-[#0080cc]/30 rounded-2xl p-4 mb-4">
        <p
          className="text-white/50 text-xs uppercase tracking-widest mb-2"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Chave PIX
        </p>
        <div className="flex items-center gap-2 bg-[#0d0f11] border border-white/10 rounded-xl p-3 mb-3">
          <p className="flex-1 text-white text-sm font-mono break-all">
            {PIX_KEY}
          </p>
        </div>
        <button
          onClick={handleCopyPix}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm uppercase tracking-wide transition-all duration-200",
            copied
              ? "bg-green-500 text-white"
              : "bg-[#0080cc] text-white active:scale-95",
          )}
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          {copied ? (
            <>
              <Check size={16} />
              Copiado!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copiar Chave PIX
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm uppercase tracking-wide bg-green-600 text-white active:scale-95 transition-all duration-200 mb-6"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        <MessageCircle size={16} />
        Enviar Comprovante no WhatsApp
      </button>

      {/* Team Payment Status */}
      <div className="mb-3 flex items-center gap-2">
        <CreditCard size={15} className="text-[#0080cc]" />
        <h3
          className="text-white font-medium uppercase tracking-wide text-sm"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Status por Time
        </h3>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 bg-[#121315] rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-10 text-white/30 text-sm">
          Nenhum time cadastrado ainda.
        </div>
      ) : (
        <div className="space-y-2">
          {teams.map((team, index) => {
            const status = team.payment?.status ?? "UNPAID";
            const cfg = statusConfig[status];
            const isExpanded = expanded === team.id;
            return (
              <div
                key={team.id}
                className="bg-[#121315] border border-white/8 rounded-xl overflow-hidden"
                style={{
                  animation: `fade-in 0.4s ease-out ${index * 0.05}s forwards`,
                  opacity: 0,
                }}
              >
                <button
                  className="w-full flex items-center gap-3 px-4 py-3"
                  onClick={() => setExpanded(isExpanded ? null : team.id)}
                >
                  <span className="text-lg">{cfg.emoji}</span>
                  <span
                    className="flex-1 text-white font-medium text-sm text-left uppercase"
                    style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  >
                    {team.name}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      cfg.className,
                    )}
                  >
                    {cfg.label}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={14} className="text-white/30" />
                  ) : (
                    <ChevronDown size={14} className="text-white/30" />
                  )}
                </button>
                {isExpanded && (
                  <div className="border-t border-white/5 px-4 py-3">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                      Jogadores
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {team.players.map((p) => (
                        <span
                          key={p.id}
                          className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded-lg"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  MessageCircle,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  X,
  Shield,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamPayment {
  id: string;
  name: string;
  players: { id: string; name: string; position: string }[];
  payment?: { status: "UNPAID" | "HALF_PAID" | "PAID" } | null;
}

const PIX_KEY = "msilva24624@gmail.com";
const WHATSAPP_NUMBER = "5511947897643"; // Update with real number

const statusConfig = {
  UNPAID: {
    label: "Não pago",
    className: "badge-unpaid",
    icon: AlertCircle,
    color: "text-red-400",
  },
  HALF_PAID: {
    label: "Pago metade (R$85)",
    className: "badge-half",
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  PAID: {
    label: "Pago total (R$170)",
    className: "badge-paid",
    icon: CheckCircle2,
    color: "text-green-400",
  },
};

export default function PaymentScreen() {
  const [copied, setCopied] = useState(false);
  const [teams, setTeams] = useState<TeamPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleWhatsAppClick = () => {
    if (teams.length === 0) {
      // Fallback message if no teams exist yet
      const msg = encodeURIComponent(
        "Olá! Estou enviando o comprovante de pagamento da inscrição do II Festival Família Fanfarrões.",
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      return;
    }
    setShowTeamModal(true);
  };

  const sendToWhatsApp = (teamName: string) => {
    const msg = encodeURIComponent(
      `Olá! Sou do time *${teamName.toUpperCase()}* e estou enviando o comprovante de pagamento da inscrição do II Festival Família Fanfarrões.`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setShowTeamModal(false);
  };

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#0d0f11] px-4 pt-8 pb-4 relative">
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
            Pagamento Único
          </h3>
        </div>
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-3 bg-[#0080cc]/10 border border-[#0080cc]/20 rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-[#0080cc]/10 flex items-center justify-center text-[#0080cc] font-bold">
              1
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                O capitão fica responsável pelo pagamento
              </p>
              <p
                className="text-[#0080cc] font-medium text-lg"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                R$ 170,00
              </p>
            </div>
          </div>
        </div>

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
            <div className="w-8 h-8 rounded-lg bg-[#0080cc]/10 flex items-center justify-center text-[#0080cc] font-bold">
              1
            </div>
            <div>
              <p className="text-white font-medium text-sm">50% na inscrição</p>
              <p
                className="text-[#0080cc] font-medium text-lg"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                R$ 85,00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-[#0080cc]/10 flex items-center justify-center text-[#0080cc] font-bold">
              2
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                50% na última semana
              </p>
              <p
                className="text-white font-medium text-lg"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                R$ 85,00
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
        onClick={handleWhatsAppClick}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm uppercase tracking-wide bg-green-600 text-white active:scale-95 transition-all duration-200 mb-6"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        <MessageCircle size={16} />
        Enviar Comprovante no WhatsApp
      </button>

      {/* Team Selection Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center px-0 sm:px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowTeamModal(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-[#121315] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-full duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div>
                <h3
                  className="text-xl font-black text-white uppercase"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  Selecione seu Time
                </h3>
                <p className="text-white/40 text-xs mt-0.5">
                  Identifique-se para enviar o comprovante
                </p>
              </div>
              <button
                onClick={() => setShowTeamModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                />
                <input
                  type="text"
                  placeholder="Buscar time..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d0f11] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#0080cc]/50 transition-colors"
                />
              </div>
            </div>

            {/* Teams List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {filteredTeams.length === 0 ? (
                <div className="text-center py-10 text-white/20 text-sm italic">
                  Nenhum time encontrado
                </div>
              ) : (
                filteredTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => sendToWhatsApp(team.name)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-[#0080cc]/10 hover:border-[#0080cc]/30 transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0080cc]/10 border border-[#0080cc]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield size={20} className="text-[#0080cc]" />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-white font-bold uppercase text-sm"
                        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                      >
                        {team.name}
                      </p>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">
                        {team.players.length} jogadores cadastrados
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/10 group-hover:text-[#0080cc] group-hover:translate-x-1 transition-all"
                    />
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white/[0.02] border-t border-white/5 rounded-b-2xl">
              <button
                onClick={() => setShowTeamModal(false)}
                className="w-full py-3 text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <cfg.icon size={18} className={cfg.color} />
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

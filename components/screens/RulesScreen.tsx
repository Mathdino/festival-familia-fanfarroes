"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Users,
  Hash,
  Clock,
  Timer,
  Trophy,
  CircleDollarSign,
  CalendarDays,
  Gavel,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const rules = [
  {
    icon: Users,
    title: "Composição das Equipes",
    content:
      "Todos os times devem ter no mínimo 6 jogadores ou mais para reservas, pois os mesmos não poderão jogar em outros times.",
  },
  {
    icon: Hash,
    title: "Número de Jogos",
    content:
      "Serão realizados 10 jogos, equivalendo a 20 equipes participantes.",
  },
  {
    icon: Clock,
    title: "Horário dos Jogos",
    content:
      "Os jogos começarão às 8:00 horas da manhã (ajustado conforme cronograma).",
  },
  {
    icon: Timer,
    title: "Duração das Partidas",
    content:
      "Todos os jogos terão duração de 20x20 minutos com intervalo de 10 minutos entre cada tempo.",
  },
  {
    icon: Trophy,
    title: "Premiação",
    content:
      "Um troféu para o ganhador da partida. Se a partida terminar em empate, serão feitas cobranças de pênaltis (5 de cada lado).",
  },
  {
    icon: CircleDollarSign,
    title: "Taxa de Participação",
    content: "Valor de R$ 200,00 para cada time participante.",
  },
  {
    icon: CalendarDays,
    title: "Idade Mínima",
    content: "Não há idade mínima para participação.",
  },
  {
    icon: Gavel,
    title: "Arbitragem",
    content: "Haverá juiz em todos os jogos.",
  },
  {
    icon: ClipboardList,
    title: "Regulamento",
    content: "Seguimos as regras oficiais de Futebol Society.",
  },
];

const observations = [
  "Todos devem estar cientes dos horários estabelecidos durante o dia.",
  "Manter coerência e respeito uns com os outros, principalmente com o juiz.",
  "Cuidado com a saúde de cada participante.",
  "A Família Fanfarrões agradece a participação de todos!",
];

export default function RulesScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0d0f11] px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-2">
        <p
          className="text-[#0080cc] text-xs uppercase tracking-widest font-semibold mb-1"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          II Festival Família Fanfarrões 2026
        </p>
        <h2
          className="text-4xl font-black uppercase text-white"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Regras do Festival
        </h2>
      </div>

      {/* Trophy Banner */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-[#0080cc]/15 to-transparent border border-[#0080cc]/20 rounded-2xl p-3 mb-6">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src="/trofeu.png"
            alt="Troféu"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-white/70 text-xs leading-relaxed">
          Leia atentamente todas as regras antes de se inscrever. Ao participar,
          você concorda com todos os termos.
        </p>
      </div>

      {/* Rules Accordion */}
      <div className="space-y-2 mb-6">
        {rules.map((rule, index) => (
          <div
            key={index}
            className={cn(
              "bg-[#121315] border rounded-xl overflow-hidden transition-all duration-200",
              expanded === index ? "border-[#0080cc]/40" : "border-white/8",
            )}
          >
            <button
              className="w-full flex items-center justify-between p-4 text-left"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0080cc]/10 border border-[#0080cc]/20 flex items-center justify-center">
                  <rule.icon size={16} className="text-[#0080cc]" />
                </div>
                <span
                  className="text-white font-medium text-lg uppercase tracking-tight"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  {rule.title}
                </span>
              </div>
              {expanded === index ? (
                <ChevronUp size={18} className="text-[#0080cc]" />
              ) : (
                <ChevronDown size={18} className="text-white/20" />
              )}
            </button>
            {expanded === index && (
              <div className="px-4 pb-4">
                <div className="h-px bg-white/5 mb-3" />
                <p className="text-white/60 text-sm leading-relaxed">
                  {rule.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Observations */}
      <div className="bg-[#0080cc]/10 border border-[#0080cc]/25 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={15} className="text-[#0080cc]" />
          <h3
            className="text-[#0080cc] font-bold text-sm uppercase tracking-wide"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Observações Importantes
          </h3>
        </div>
        <ul className="space-y-2">
          {observations.map((obs, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#0080cc] text-xs mt-0.5 flex-shrink-0">
                •
              </span>
              <p className="text-white/70 text-xs leading-relaxed">{obs}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

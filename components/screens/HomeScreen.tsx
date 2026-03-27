"use client";

import Image from "next/image";
import {
  Trophy,
  Star,
  Calendar,
  Clock,
  MapPin,
  LayoutGrid,
  List,
} from "lucide-react";

export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-[#0d0f11] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#0080cc]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-60 h-60 bg-[#0080cc]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center pt-10 px-5 pb-6">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-[#0080cc]/15 border border-[#0080cc]/30 rounded-full px-4 py-1.5 mb-6">
          <Star size={12} className="text-[#0080cc] fill-[#0080cc]" />
          <span
            className="text-[#0080cc] text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Edição 2026
          </span>
          <Star size={12} className="text-[#0080cc] fill-[#0080cc]" />
        </div>

        {/* Logo */}
        <div className="relative w-52 h-52 mb-6">
          <div className="absolute inset-0 bg-[#0080cc]/20 rounded-full blur-2xl animate-pulse" />
          <Image
            src="/logo.png"
            alt="Família Fanfarrões"
            fill
            className="object-contain relative z-10 drop-shadow-2xl"
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center mb-2">
          <p
            className="text-white/50 text-sm uppercase tracking-widest mb-1"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            II Festival
          </p>
          <h1
            className="text-5xl font-black uppercase leading-none text-white"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Família
          </h1>
          <h1
            className="text-5xl font-black uppercase leading-none"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #0080cc, #00c2ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fanfarrões
          </h1>
          <p
            className="text-white/40 text-sm tracking-widest uppercase mt-1"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Futebol Society
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6 w-full">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#0080cc]/40" />
          <div className="w-1.5 h-1.5 bg-[#0080cc] rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#0080cc]/40" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {[
            { value: "20", label: "Times", sub: "participantes" },
            { value: "10", label: "Jogos", sub: "no festival" },
            { value: "2007", label: "Desde", sub: "sempre unidos" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#121315] border border-white/8 rounded-2xl p-3 text-center"
            >
              <span
                className="block text-2xl font-black text-[#0080cc]"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="block text-white text-xs font-semibold leading-tight">
                {stat.label}
              </span>
              <span className="block text-white/30 text-[10px] leading-tight">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Trophy Card */}
        <div className="w-full bg-gradient-to-r from-[#0080cc]/10 to-[#121315] border border-[#0080cc]/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src="/trofeu.png"
              alt="Troféu"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p
              className="text-white font-bold text-lg"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Jogue pelo troféu!
            </p>
            <p className="text-white/50 text-xs leading-snug mt-0.5">
              20 equipes disputando a glória. Cada partida, uma nova história.
            </p>
          </div>
        </div>

        {/* Event Info */}
        <div className="w-full mt-4 grid grid-cols-1 gap-2">
          {[
            {
              icon: List,
              label: "INSCRIÇÕES ATÉ",
              value: "24 de Maio",
            },
            { icon: Calendar, label: "Data dos jogos", value: "07 de Junho" },
            { icon: Clock, label: "Horário inicial", value: "08:00 da manhã" },
            {
              icon: MapPin,
              label: "Local",
              value: "Chute Inicial Arena Guarulhos",
            },
            { icon: LayoutGrid, label: "Formato", value: "20min × 2 tempos" },
          ].map((info) => (
            <div
              key={info.label}
              className="flex items-center gap-3 bg-[#121315] rounded-xl px-4 py-3 border border-white/5"
            >
              <info.icon size={18} className="text-[#0080cc]" />
              <div className="flex-1 flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-wide">
                  {info.label}
                </span>
                <span className="text-white text-sm font-medium">
                  {info.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-white/20 text-xs text-center mt-6 italic">
          "A Família Fanfarrões agradece a participação de todos!"
        </p>
      </div>
    </div>
  );
}

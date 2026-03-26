'use client'

import { useEffect, useState } from 'react'
import { Clock, Calendar, Swords, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Schedule {
  id: string
  time: string
  teamA: string
  teamB: string
  date: string
  round: string
  result?: string | null
}

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/schedules')
      .then(r => r.json())
      .then(data => { setSchedules(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0f11] px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[#0080cc] text-xs uppercase tracking-widest font-semibold mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
          II Festival Família Fanfarrões
        </p>
        <h2 className="text-4xl font-black uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
          Horários
        </h2>
      </div>

      {/* Format Info Card */}
      <div className="bg-[#121315] border border-[#0080cc]/20 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-[#0080cc]" />
          <h3 className="text-white font-bold text-sm uppercase tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Formato dos Jogos
          </h3>
        </div>
        <div className="space-y-2">
          {[
            { label: '1º Tempo', value: '20 minutos', color: '#0080cc' },
            { label: 'Intervalo', value: '10 minutos', color: '#ffffff44' },
            { label: '2º Tempo', value: '20 minutos', color: '#0080cc' },
            { label: 'Troca de equipes', value: '10 minutos', color: '#ffffff44' },
            { label: 'Em caso de empate', value: 'Pênaltis (5 cada)', color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                <span className="text-white/60 text-xs">{item.label}</span>
              </div>
              <span className="text-white text-xs font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="mb-4 flex items-center gap-2">
        <Calendar size={16} className="text-[#0080cc]" />
        <h3 className="text-white font-bold uppercase tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
          Jogos do Dia
        </h3>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-[#121315] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-3">⚽</div>
          <p className="text-white/40 text-sm">Nenhum jogo cadastrado ainda.</p>
          <p className="text-white/20 text-xs mt-1">O admin irá cadastrar em breve!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {schedules.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

function GameCard({ game, index }: { game: Schedule; index: number }) {
  const hasResult = !!game.result
  return (
    <div
      className={cn(
        'bg-[#121315] border rounded-2xl p-4 relative overflow-hidden',
        hasResult ? 'border-[#0080cc]/30' : 'border-white/8'
      )}
      style={{ animation: `fade-in 0.4s ease-out ${index * 0.06}s forwards`, opacity: 0 }}
    >
      {hasResult && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0080cc] to-transparent" />
      )}

      {/* Top row */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#0080cc] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
          {game.round}
        </span>
        <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-0.5">
          <Clock size={10} className="text-white/40" />
          <span className="text-white/60 text-xs">{game.time}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center gap-2">
        {/* Team A */}
        <div className="flex-1 text-center">
          <p className="text-white font-black text-base leading-tight uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {game.teamA}
          </p>
        </div>

        {/* VS / Result */}
        <div className="flex flex-col items-center px-2">
          {hasResult ? (
            <div className="bg-[#0080cc]/20 border border-[#0080cc]/40 rounded-lg px-2 py-0.5">
              <span className="text-[#0080cc] text-sm font-black" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                {game.result}
              </span>
            </div>
          ) : (
            <>
              <Swords size={14} className="text-white/30 mb-0.5" />
              <span className="text-white/30 text-xs font-bold">VS</span>
            </>
          )}
        </div>

        {/* Team B */}
        <div className="flex-1 text-center">
          <p className="text-white font-black text-base leading-tight uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {game.teamB}
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
        <span className="text-white/30 text-xs">{formatDate(game.date)}</span>
        {!hasResult && (
          <span className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-2 py-0.5">
            Aguardando
          </span>
        )}
      </div>
    </div>
  )
}

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  } catch {
    return dateStr
  }
}

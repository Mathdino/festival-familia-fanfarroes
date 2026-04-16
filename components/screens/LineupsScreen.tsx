"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Users,
  X,
  Check,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Player {
  id?: string;
  name: string;
  number?: number | null;
  position: string;
}

interface Team {
  id: string;
  name: string;
  formation: string;
  players: Player[];
}

const POSITION_LABELS: Record<string, string> = {
  GK: "Goleiro",
  DEF: "Defensor",
  MID: "Meio-Campo",
  FWD: "Atacante",
  RES: "Reserva",
};

const POSITION_COLORS: Record<string, string> = {
  GK: "#f59e0b",
  DEF: "#3b82f6",
  MID: "#22c55e",
  FWD: "#ef4444",
  RES: "#8b5cf6",
};

export default function LineupsScreen() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchTeams = () => {
    setLoading(true);
    fetch("/api/teams")
      .then((r) => r.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const starters = (players: Player[]) =>
    players.filter((p) => p.position !== "RES").slice(0, 6);
  const reserves = (players: Player[]) =>
    players.filter((p) => p.position === "RES").slice(0, 9);

  return (
    <div className="min-h-screen bg-[#0d0f11] px-4 pt-8 pb-4">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
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
            Escalações
          </h2>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 bg-[#0080cc] hover:bg-[#0080cc]/90 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors uppercase"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            <Plus size={16} strokeWidth={3} />
            Novo Time
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <AddTeamForm
            onCancel={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
              fetchTeams();
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-[#121315] rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : teams.length === 0 && !showAddForm ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users size={40} className="text-white/20 mb-3" />
          <p className="text-white/40 text-sm">Nenhum time cadastrado ainda.</p>
          <p className="text-white/20 text-xs mt-1">
            Seja o primeiro a cadastrar seu time!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={cn(
                "bg-[#121315] border rounded-2xl overflow-hidden transition-all duration-300",
                expanded === team.id ? "border-[#0080cc]/40" : "border-white/8",
              )}
              style={{
                animation: `fade-in 0.4s ease-out ${index * 0.06}s forwards`,
                opacity: 0,
              }}
            >
              {/* Team Header - clickable */}
              <button
                className="w-full flex items-center gap-3 p-4"
                onClick={() =>
                  setExpanded(expanded === team.id ? null : team.id)
                }
              >
                <div className="w-10 h-10 rounded-full bg-[#0080cc]/20 border border-[#0080cc]/30 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-[#0080cc]" />
                </div>
                <div className="flex-1 text-left">
                  <p
                    className="text-white font-medium text-lg uppercase"
                    style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  >
                    {team.name}
                  </p>
                  <p className="text-white/40 text-xs">
                    {team.players.length} jogadores · {team.formation}
                  </p>
                </div>
                {expanded === team.id ? (
                  <ChevronUp size={18} className="text-[#0080cc]" />
                ) : (
                  <ChevronDown size={18} className="text-white/30" />
                )}
              </button>

              {/* Team Content */}
              {expanded === team.id && (
                <div className="border-t border-white/8">
                  {/* Field visualization */}
                  <div className="mx-4 my-4">
                    <FieldView players={starters(team.players)} />
                  </div>

                  {/* Starters List */}
                  {starters(team.players).length > 0 && (
                    <div className="px-4 pb-3">
                      <p
                        className="text-white/40 text-xs uppercase tracking-wider mb-2"
                        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                      >
                        Titulares
                      </p>
                      <div className="space-y-1.5">
                        {starters(team.players).map((player, idx) => (
                          <PlayerRow key={player.id || idx} player={player} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reserves */}
                  {reserves(team.players).length > 0 && (
                    <div className="px-4 pb-4">
                      <p
                        className="text-white/40 text-xs uppercase tracking-wider mb-2 mt-2"
                        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                      >
                        Banco de Reservas
                      </p>
                      <div className="space-y-1.5">
                        {reserves(team.players).map((player, idx) => (
                          <PlayerRow key={player.id || idx} player={player} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddTeamForm({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [starters, setStarters] = useState<Player[]>(
    Array(6)
      .fill(null)
      .map((_, i) => ({
        name: "",
        position: i === 0 ? "GK" : i < 3 ? "DEF" : i < 5 ? "MID" : "FWD",
      })),
  );
  const [reserves, setReserves] = useState<Player[]>(
    Array(9)
      .fill(null)
      .map(() => ({
        name: "",
        position: "RES",
      })),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Digite o nome do time");

    const filteredReserves = reserves.filter((p) => p.name.trim() !== "");
    const allPlayers = [...starters, ...filteredReserves];

    if (starters.some((p) => !p.name.trim()))
      return setError("Preencha o nome de todos os titulares");

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          formation: "Society",
          players: allPlayers,
        }),
      });

      if (!res.ok) throw new Error("Falha ao criar time");
      onSuccess();
    } catch (err) {
      setError("Ocorreu um erro ao salvar o time");
      setSubmitting(false);
    }
  };

  const updatePlayer = (idx: number, isStarter: boolean, val: string) => {
    if (isStarter) {
      const newS = [...starters];
      newS[idx].name = val;
      setStarters(newS);
    } else {
      const newR = [...reserves];
      newR[idx].name = val;
      setReserves(newR);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121315] border border-white/10 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-xl font-medium text-white uppercase"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Novo Time
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-white/30 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white/40 text-[10px] uppercase font-bold mb-1.5 tracking-wider">
            Nome do Time
          </label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Fanfarrões FC"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#0080cc] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-white/40 text-[10px] uppercase font-bold mb-2 tracking-wider">
            Titulares (6)
          </label>
          <div className="grid grid-cols-1 gap-2">
            {starters.map((p, i) => (
              <div key={i} className="flex gap-2">
                <div
                  className="w-10 h-11 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40 uppercase"
                  style={{ color: POSITION_COLORS[p.position] }}
                >
                  {p.position}
                </div>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updatePlayer(i, true, e.target.value)}
                  placeholder={`Jogador ${i + 1}`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-[#0080cc] outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white/40 text-[10px] uppercase font-bold mb-2 tracking-wider">
            Reservas (9)
          </label>
          <div className="grid grid-cols-1 gap-2">
            {reserves.map((p, i) => (
              <input
                key={i}
                type="text"
                value={p.name}
                onChange={(e) => updatePlayer(i, false, e.target.value)}
                placeholder={`Reserva ${i + 1}`}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-[#0080cc] outline-none transition-colors"
              />
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs font-medium text-center">
            {error}
          </p>
        )}

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-white/10 text-white/60 font-bold py-3 rounded-xl uppercase text-sm transition-colors hover:bg-white/5"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Cancelar
          </button>
          <button
            disabled={submitting}
            type="submit"
            className="flex-1 bg-[#0080cc] text-white font-medium py-3 rounded-xl uppercase text-sm transition-colors hover:bg-[#0080cc]/90 flex items-center justify-center gap-2"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {submitting ? (
              "Salvando..."
            ) : (
              <>
                <Check size={16} /> Salvar Time
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function PlayerRow({ player }: { player: Player }) {
  const color = POSITION_COLORS[player.position] || "#ffffff";
  return (
    <div className="flex items-center gap-2.5 bg-white/3 rounded-lg px-3 py-2">
      {player.number != null && (
        <span
          className="text-white/50 text-xs w-5 text-right font-bold"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          {player.number}
        </span>
      )}
      <span className="flex-1 text-white text-sm font-medium">
        {player.name}
      </span>
      <span
        className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{
          color,
          background: `${color}20`,
          border: `1px solid ${color}30`,
          fontFamily: "Barlow Condensed, sans-serif",
        }}
      >
        {POSITION_LABELS[player.position] || player.position}
      </span>
    </div>
  );
}

function FieldView({ players }: { players: Player[] }) {
  const byPosition: Record<string, Player[]> = {};
  players.forEach((p) => {
    if (!byPosition[p.position]) byPosition[p.position] = [];
    byPosition[p.position].push(p);
  });

  const gks = byPosition["GK"] || [];
  const defs = byPosition["DEF"] || [];
  const mids = byPosition["MID"] || [];
  const fwds = byPosition["FWD"] || [];

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        background: "#1a5c2a",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        aspectRatio: "2/3",
      }}
    >
      {/* Field markings */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-4 pointer-events-none">
        {/* Top arc */}
        <div className="w-16 h-8 border-b-2 border-white/20 rounded-b-full" />
        {/* Center circle */}
        <div className="w-16 h-16 border-2 border-white/20 rounded-full" />
        {/* Bottom arc */}
        <div className="w-16 h-8 border-t-2 border-white/20 rounded-t-full" />
      </div>
      {/* Center line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20" />

      {/* Players - FWD top, MID middle, DEF bottom, GK very bottom */}
      <div className="absolute inset-0 flex flex-col justify-between py-6 px-3">
        <FieldRow players={fwds} color={POSITION_COLORS.FWD} />
        <FieldRow players={mids} color={POSITION_COLORS.MID} />
        <FieldRow players={defs} color={POSITION_COLORS.DEF} />
        <FieldRow players={gks} color={POSITION_COLORS.GK} />
      </div>
    </div>
  );
}

function FieldRow({ players, color }: { players: Player[]; color: string }) {
  if (players.length === 0) return <div />;
  return (
    <div className="flex justify-around">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex flex-col items-center gap-1 max-w-[50px]"
        >
          <div
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black"
            style={{
              borderColor: color,
              background: `${color}30`,
              color: "white",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            {player.number ?? player.name.charAt(0)}
          </div>
          <span className="text-white text-[9px] font-medium text-center leading-tight line-clamp-1">
            {player.name.split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

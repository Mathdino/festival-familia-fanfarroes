"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  CreditCard,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  X,
  UserPlus,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AdminTab = "schedules" | "teams" | "payments";

interface Schedule {
  id: string;
  time: string;
  teamA: string;
  teamB: string;
  date: string;
  round: string;
  result?: string | null;
}
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
  payment?: { status: "UNPAID" | "HALF_PAID" | "PAID" } | null;
}

const POSITIONS = ["GK", "DEF", "MID", "FWD", "RES"];
const POSITION_LABELS: Record<string, string> = {
  GK: "Goleiro",
  DEF: "Defensor",
  MID: "Meio",
  FWD: "Atacante",
  RES: "Reserva",
};
const PAYMENT_STATUSES = [
  {
    value: "UNPAID",
    label: "Não pago",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  {
    value: "HALF_PAID",
    label: "Pago metade",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    value: "PAID",
    label: "Pago total",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
];
const ADMIN_PASSWORD = "fanfarroes2026";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<AdminTab>("schedules");

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else setError("Senha incorreta");
  };

  if (!authed)
    return (
      <LoginScreen
        pw={pw}
        setPw={setPw}
        showPw={showPw}
        setShowPw={setShowPw}
        error={error}
        onLogin={login}
      />
    );

  return (
    <div className="min-h-screen bg-[#0d0f11] pb-20">
      {/* Header */}
      <div className="bg-[#121315] border-b border-white/8 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </Link>
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="FF" fill className="object-contain" />
            </div>
            <div>
              <p
                className="text-white font-black text-sm uppercase"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                Painel Admin
              </p>
              <div className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-green-400" />
                <p className="text-green-400 text-[10px]">Autenticado</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1 text-white/40 text-xs py-1.5 px-2.5 rounded-lg bg-white/5"
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
        {/* Tab bar */}
        <div className="flex border-t border-white/8">
          {(
            [
              { id: "schedules", icon: Calendar, label: "Horários" },
              { id: "teams", icon: Users, label: "Times" },
              { id: "payments", icon: CreditCard, label: "Pagamentos" },
            ] as const
          ).map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors relative",
                tab === id ? "text-[#0080cc]" : "text-white/40",
              )}
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              {tab === id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#0080cc] rounded-full" />
              )}
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {tab === "schedules" && <SchedulesAdmin />}
        {tab === "teams" && <TeamsAdmin />}
        {tab === "payments" && <PaymentsAdmin />}
      </div>
    </div>
  );
}

/* ========================
   LOGIN SCREEN
======================== */
function LoginScreen({
  pw,
  setPw,
  showPw,
  setShowPw,
  error,
  onLogin,
}: {
  pw: string;
  setPw: (v: string) => void;
  showPw: boolean;
  setShowPw: (v: boolean) => void;
  error: string;
  onLogin: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0d0f11] flex flex-col items-center justify-center px-6">
      <div className="w-20 h-20 relative mb-6">
        <Image src="/logo.png" alt="FF" fill className="object-contain" />
      </div>
      <h1
        className="text-3xl font-black text-white uppercase mb-1"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        Área Admin
      </h1>
      <p className="text-white/40 text-sm mb-8">
        II Festival Família Fanfarrões
      </p>

      <div className="w-full bg-[#121315] border border-white/10 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">
            Senha
          </label>
          <div className="flex gap-2">
            <input
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
              placeholder="Digite a senha de admin"
              className="flex-1 bg-[#0d0f11] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#0080cc]/50"
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="px-3 text-white/30"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
        <button
          onClick={onLogin}
          className="w-full bg-[#0080cc] text-white font-bold py-3 rounded-xl uppercase tracking-wide text-sm active:scale-95 transition-transform"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

/* ========================
   SCHEDULES ADMIN
======================== */
function SchedulesAdmin() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [form, setForm] = useState({
    time: "",
    teamA: "",
    teamB: "",
    date: "",
    round: "",
    result: "",
  });

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/schedules")
      .then((r) => r.json())
      .then((d) => {
        setSchedules(d);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm({
      time: "",
      teamA: "",
      teamB: "",
      date: "",
      round: "",
      result: "",
    });
    setShowForm(true);
  };
  const openEdit = (s: Schedule) => {
    setEditing(s);
    setForm({
      time: s.time,
      teamA: s.teamA,
      teamB: s.teamB,
      date: s.date,
      round: s.round,
      result: s.result || "",
    });
    setShowForm(true);
  };

  const save = async () => {
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/schedules/${editing.id}` : "/api/schedules";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Falha ao salvar");
      setShowForm(false);
      load();
    } catch (e) {
      alert(
        "Erro ao salvar jogo: " +
          (e instanceof Error ? e.message : "Erro desconhecido"),
      );
    }
  };

  const del = async (id: string) => {
    try {
      if (!confirm("Excluir este jogo?")) return;
      const res = await fetch(`/api/schedules/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
      load();
    } catch (e) {
      alert(
        "Erro ao excluir jogo: " +
          (e instanceof Error ? e.message : "Erro desconhecido"),
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-black text-white uppercase"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Jogos Cadastrados
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#0080cc] text-white text-xs font-bold px-3 py-2 rounded-xl"
        >
          <Plus size={14} /> Adicionar
        </button>
      </div>

      {showForm && (
        <FormCard
          title={editing ? "Editar Jogo" : "Novo Jogo"}
          onSave={save}
          onCancel={() => setShowForm(false)}
        >
          <InputField
            label="Rodada/Jogo"
            value={form.round}
            onChange={(v) => setForm((f) => ({ ...f, round: v }))}
            placeholder="Ex: Jogo 1"
          />
          <InputField
            label="Data"
            type="date"
            value={form.date}
            onChange={(v) => setForm((f) => ({ ...f, date: v }))}
          />
          <InputField
            label="Horário"
            type="time"
            value={form.time}
            onChange={(v) => setForm((f) => ({ ...f, time: v }))}
          />
          <InputField
            label="Time A"
            value={form.teamA}
            onChange={(v) => setForm((f) => ({ ...f, teamA: v }))}
            placeholder="Nome do time A"
          />
          <InputField
            label="Time B"
            value={form.teamB}
            onChange={(v) => setForm((f) => ({ ...f, teamB: v }))}
            placeholder="Nome do time B"
          />
          <InputField
            label="Resultado (opcional)"
            value={form.result}
            onChange={(v) => setForm((f) => ({ ...f, result: v }))}
            placeholder="Ex: 2x1"
          />
        </FormCard>
      )}

      {loading ? (
        <Skeleton />
      ) : schedules.length === 0 ? (
        <Empty text="Nenhum jogo cadastrado" />
      ) : (
        <div className="space-y-2">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="bg-[#121315] border border-white/8 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className="text-[#0080cc] text-xs font-bold uppercase"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  {s.round}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="p-1.5 bg-white/5 rounded-lg"
                  >
                    <Pencil size={12} className="text-white/60" />
                  </button>
                  <button
                    onClick={() => del(s.id)}
                    className="p-1.5 bg-red-500/10 rounded-lg"
                  >
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>
              </div>
              <p
                className="text-white font-medium text-base uppercase"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                {s.teamA} <span className="text-white/30">vs</span> {s.teamB}
              </p>
              <div className="flex gap-3 mt-1">
                <span className="text-white/40 text-xs">
                  {formatDate(s.date)}
                </span>
                <span className="text-white/40 text-xs">{s.time}</span>
                {s.result && (
                  <span className="text-[#0080cc] text-xs font-bold">
                    {s.result}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================
   TEAMS ADMIN
======================== */
function TeamsAdmin() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [formation, setFormation] = useState("4-3-3");
  const [players, setPlayers] = useState<Player[]>([]);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/teams")
      .then((r) => r.json())
      .then((d) => {
        setTeams(d);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setTeamName("");
    setFormation("4-3-3");
    setPlayers([{ name: "", position: "GK" }]);
    setShowForm(true);
  };
  const openEdit = (t: Team) => {
    setEditing(t);
    setTeamName(t.name);
    setFormation(t.formation);
    setPlayers(
      t.players.map((p) => ({
        id: p.id,
        name: p.name,
        number: p.number,
        position: p.position,
      })),
    );
    setShowForm(true);
  };

  const addPlayer = () =>
    setPlayers((p) => [...p, { name: "", position: "DEF" }]);
  const removePlayer = (i: number) =>
    setPlayers((p) => p.filter((_, idx) => idx !== i));
  const updatePlayer = (
    i: number,
    field: keyof Player,
    value: string | number,
  ) => {
    setPlayers((p) =>
      p.map((pl, idx) => (idx === i ? { ...pl, [field]: value } : pl)),
    );
  };

  const save = async () => {
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/teams/${editing.id}` : "/api/teams";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName, formation, players }),
      });
      if (!res.ok) throw new Error("Falha ao salvar");
      setShowForm(false);
      load();
    } catch (e) {
      alert(
        "Erro ao salvar time: " +
          (e instanceof Error ? e.message : "Erro desconhecido"),
      );
    }
  };

  const del = async (id: string) => {
    try {
      if (!confirm("Excluir este time e todos seus jogadores?")) return;
      const res = await fetch(`/api/teams/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
      load();
    } catch (e) {
      alert(
        "Erro ao excluir time: " +
          (e instanceof Error ? e.message : "Erro desconhecido"),
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-black text-white uppercase"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Times
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#0080cc] text-white text-xs font-bold px-3 py-2 rounded-xl"
        >
          <Plus size={14} /> Novo Time
        </button>
      </div>

      {showForm && (
        <FormCard
          title={editing ? "Editar Time" : "Cadastrar Time"}
          onSave={save}
          onCancel={() => setShowForm(false)}
        >
          <InputField
            label="Nome do Time"
            value={teamName}
            onChange={setTeamName}
            placeholder="Ex: Os Guerreiros"
          />
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wide block mb-1.5">
              Formação
            </label>
            <select
              value={formation}
              onChange={(e) => setFormation(e.target.value)}
              className="w-full bg-[#0d0f11] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#0080cc]/50"
            >
              {["4-3-3", "4-4-2", "3-5-2", "5-3-2", "4-2-3-1"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white/50 text-xs uppercase tracking-wide">
                Jogadores
              </label>
              <button
                onClick={addPlayer}
                className="flex items-center gap-1 text-[#0080cc] text-xs font-bold"
              >
                <UserPlus size={12} /> Adicionar
              </button>
            </div>
            <div className="space-y-2">
              {players.map((pl, i) => (
                <div
                  key={i}
                  className="flex gap-2 items-center bg-[#0d0f11] border border-white/8 rounded-xl p-2"
                >
                  <input
                    type="number"
                    placeholder="#"
                    value={pl.number ?? ""}
                    onChange={(e) =>
                      updatePlayer(i, "number", parseInt(e.target.value) || 0)
                    }
                    className="w-12 bg-transparent text-white text-sm outline-none text-center"
                  />
                  <input
                    placeholder="Nome do jogador"
                    value={pl.name}
                    onChange={(e) => updatePlayer(i, "name", e.target.value)}
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/20"
                  />
                  <select
                    value={pl.position}
                    onChange={(e) =>
                      updatePlayer(i, "position", e.target.value)
                    }
                    className="bg-[#121315] border border-white/10 rounded-lg px-2 py-1 text-white text-xs outline-none"
                  >
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {POSITION_LABELS[pos]}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removePlayer(i)}
                    className="text-red-400 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FormCard>
      )}

      {loading ? (
        <Skeleton />
      ) : teams.length === 0 ? (
        <Empty text="Nenhum time cadastrado" />
      ) : (
        <div className="space-y-3">
          {teams.map((t) => (
            <div
              key={t.id}
              className="bg-[#121315] border border-white/8 rounded-xl p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className="text-white font-medium text-base uppercase"
                    style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {t.players.length} jogadores · {t.formation}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-1.5 bg-white/5 rounded-lg"
                  >
                    <Pencil size={12} className="text-white/60" />
                  </button>
                  <button
                    onClick={() => del(t.id)}
                    className="p-1.5 bg-red-500/10 rounded-lg"
                  >
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {t.players.map((p) => (
                  <span
                    key={p.id}
                    className="text-xs bg-white/5 text-white/60 px-2 py-0.5 rounded-lg"
                  >
                    {p.number ? `#${p.number} ` : ""}
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================
   PAYMENTS ADMIN
======================== */
function PaymentsAdmin() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/teams")
      .then((r) => r.json())
      .then((d) => {
        setTeams(d);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updatePayment = async (teamId: string, status: string) => {
    try {
      const res = await fetch(`/api/payments`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, status }),
      });
      if (!res.ok) throw new Error("Falha ao atualizar pagamento");
      load();
    } catch (e) {
      alert(
        "Erro ao atualizar pagamento: " +
          (e instanceof Error ? e.message : "Erro desconhecido"),
      );
    }
  };

  const counts = {
    PAID: teams.filter((t) => t.payment?.status === "PAID").length,
    HALF_PAID: teams.filter((t) => t.payment?.status === "HALF_PAID").length,
    UNPAID: teams.filter((t) => !t.payment || t.payment.status === "UNPAID")
      .length,
  };

  return (
    <div>
      <h2
        className="text-xl font-black text-white uppercase mb-4"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        Controle de Pagamentos
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <p
            className="text-green-400 text-2xl font-black"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {counts.PAID}
          </p>
          <p className="text-green-400/70 text-xs">Pagos</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
          <p
            className="text-yellow-400 text-2xl font-black"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {counts.HALF_PAID}
          </p>
          <p className="text-yellow-400/70 text-xs">Metade</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <p
            className="text-red-400 text-2xl font-black"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {counts.UNPAID}
          </p>
          <p className="text-red-400/70 text-xs">Pendentes</p>
        </div>
      </div>

      {loading ? (
        <Skeleton />
      ) : teams.length === 0 ? (
        <Empty text="Nenhum time cadastrado" />
      ) : (
        <div className="space-y-3">
          {teams.map((t) => {
            const status = t.payment?.status ?? "UNPAID";
            return (
              <div
                key={t.id}
                className="bg-[#121315] border border-white/8 rounded-xl p-4"
              >
                <p
                  className="text-white font-medium text-base uppercase mb-3"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  {t.name}
                </p>
                <div className="flex gap-2">
                  {PAYMENT_STATUSES.map((ps) => (
                    <button
                      key={ps.value}
                      onClick={() => updatePayment(t.id, ps.value)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border text-xs font-bold transition-all",
                        ps.bg,
                        ps.color,
                        status === ps.value
                          ? "opacity-100 ring-1 ring-offset-1 ring-offset-[#121315]"
                          : "opacity-50",
                      )}
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                      }}
                    >
                      {status === ps.value && <Check size={10} />}
                      {ps.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ========================
   SHARED COMPONENTS
======================== */
function FormCard({
  title,
  children,
  onSave,
  onCancel,
}: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-[#121315] border border-[#0080cc]/30 rounded-2xl p-4 mb-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3
          className="text-white font-black uppercase"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          {title}
        </h3>
        <button onClick={onCancel}>
          <X size={16} className="text-white/40" />
        </button>
      </div>
      {children}
      <div className="flex gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-bold"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="flex-1 py-2.5 rounded-xl bg-[#0080cc] text-white text-sm font-bold active:scale-95 transition-transform"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs uppercase tracking-wide block mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0d0f11] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#0080cc]/50"
      />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-[#121315] rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-white/30 text-sm">{text}</p>
    </div>
  );
}

function formatDate(d: string) {
  try {
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  } catch {
    return d;
  }
}

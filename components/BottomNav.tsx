"use client";

import {
  Home,
  Calendar,
  BookOpen,
  Users,
  CreditCard,
  LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screen } from "@/app/page";

const navItems: {
  id: Screen;
  label: string;
  icon: React.ComponentType<LucideProps>;
}[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "schedule", label: "Horários", icon: Calendar },
  { id: "rules", label: "Regras", icon: BookOpen },
  { id: "lineups", label: "Escalações", icon: Users },
  { id: "payment", label: "Pagamento", icon: CreditCard },
];

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#121315] border-t border-white/10 safe-area-pb">
      <div className="flex items-stretch">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 px-1 gap-0.5 transition-all duration-200 relative",
                isActive ? "text-[#0080cc]" : "text-white/40",
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#0080cc] rounded-full" />
              )}
              <Icon
                size={20}
                className={cn(
                  "transition-all duration-200",
                  isActive ? "scale-110" : "scale-100",
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium font-body transition-all duration-200",
                  isActive ? "font-semibold" : "",
                )}
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import HomeScreen from "@/components/screens/HomeScreen";
import ScheduleScreen from "@/components/screens/ScheduleScreen";
import RulesScreen from "@/components/screens/RulesScreen";
import LineupsScreen from "@/components/screens/LineupsScreen";
import PaymentScreen from "@/components/screens/PaymentScreen";
import BottomNav from "@/components/BottomNav";

export type Screen = "home" | "schedule" | "rules" | "lineups" | "payment";

export default function Page() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeScreen]);

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen />;
      case "schedule":
        return <ScheduleScreen />;
      case "rules":
        return <RulesScreen />;
      case "lineups":
        return <LineupsScreen />;
      case "payment":
        return <PaymentScreen />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0f11] overflow-hidden">
      {/* Main content area */}
      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden pb-20"
      >
        {renderScreen()}
      </main>

      {/* Fixed bottom nav */}
      <BottomNav active={activeScreen} onChange={setActiveScreen} />
    </div>
  );
}

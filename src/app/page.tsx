"use client";

import { useState, useEffect } from "react";

import Board from "../components/kanban/Board";

import OnboardingModal from "../components/kanban/OnboardingModal";
import BoardHeader from "../components/kanban/BoardHeader";

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("board_user_info");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!mounted) return null;

  if (!user) {
    return <OnboardingModal onSuccess={(userInfo) => setUser(userInfo)} />;
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-70px)] bg-white dark:bg-transparent">
      <BoardHeader userName={user.name} userEmail={user.email} />
      <Board />
    </div>
  );
}

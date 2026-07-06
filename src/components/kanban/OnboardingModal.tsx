"use client";

import { useState } from "react";

interface OnboardingModalProps {
  onSuccess: (userInfo: { name: string; email: string }) => void;
}

export default function OnboardingModal({ onSuccess }: OnboardingModalProps) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameInput.trim() || !emailInput.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const userInfo = { name: nameInput, email: emailInput };
    localStorage.setItem("board_user_info", JSON.stringify(userInfo));
    onSuccess(userInfo);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-black dark:text-white tracking-tight">
            Access Control Portal
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
            Please enter your details to initialize your Workspace Kanban Board.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-black dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Work Email Address
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-black dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
          >
            Enter Workspace
          </button>
        </form>
      </div>
    </div>
  );
}

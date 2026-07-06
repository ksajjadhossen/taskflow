// src/app/page.tsx
"use client";

import Board from "../components/kanban/Board";

export default function Home() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-70px)]">
      {/* Top Welcome Heading & Action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-current">
            Workspace Board
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
            Manage tasks, keep track of internal progress workflows.
          </p>
        </div>

        {/* Action Button */}
        <button className="px-5 py-2.5 text-xs bg-blue-600 text-white dark:bg-blue-500 font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 flex items-center gap-1">
          <span className="text-sm font-black">+</span> New Task
        </button>
      </div>

      {/* Main Board Grid */}
      <Board />
    </div>
  );
}

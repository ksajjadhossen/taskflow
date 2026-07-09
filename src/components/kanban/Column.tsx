"use client";

import { useState } from "react";
import { Task } from "../../types/kanban";
import Card from "./Card";

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  onCardClick: (task: Task) => void;
  onTasksUpdate: () => void;
}

export default function Column({
  title,
  status,
  tasks,
  onCardClick,
  onTasksUpdate,
}: ColumnProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    const currentTasks: Task[] = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );
    const updatedTasks = currentTasks.map((t) =>
      t.id === taskId ? { ...t, status } : t,
    );

    localStorage.setItem("kanban_tasks", JSON.stringify(updatedTasks));
    onTasksUpdate();
  };

  const getHeaderBgColor = (colTitle: string) => {
    if (!colTitle)
      return "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100";
    switch (colTitle.toUpperCase()) {
      case "BACKLOG":
        return "bg-zinc-500 text-white";
      case "TODO":
        return "bg-blue-600 text-white";
      case "IN PROGRESS":
        return "bg-orange-500 text-white";
      case "REVIEW":
        return "bg-teal-500 text-white";
      case "DONE":
        return "bg-emerald-600 text-white";
      default:
        return "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100";
    }
  };

  const safeTasks = tasks || [];
  const visibleTasks = safeTasks.slice(0, visibleCount);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col bg-transparent w-full h-fit rounded-sm border border-zinc-200 dark:border-zinc-800/60 shadow-xs overflow-hidden"
    >
      <div
        className={`flex items-center justify-between p-3.5 font-black uppercase tracking-wider text-sm ${getHeaderBgColor(title)}`}
      >
        <h3>{title}</h3>
        <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-black/10 dark:bg-black/20 text-inherit border border-white/10">
          {safeTasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4 h-auto">
        {visibleTasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            onCardClick={onCardClick}
            onTasksUpdate={onTasksUpdate}
          />
        ))}

        {safeTasks.length > visibleCount && (
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="w-full py-2.5 mt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-800/50 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/40 rounded-sm cursor-pointer transition-all uppercase tracking-wider active:scale-[0.99]"
          >
            ➕ Load More ({safeTasks.length - visibleCount} left)
          </button>
        )}

        {safeTasks.length === 0 && (
          <div className="flex flex-col rounded-sm items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800/40 p-8 h-40">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
              Empty Column
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

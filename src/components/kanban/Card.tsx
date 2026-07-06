"use client";

import { useState, useEffect } from "react";
import { Task } from "../../types/kanban";

interface CardProps {
  task: Task;
}
export default function Card({ task }: CardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-rose-600 text-white dark:bg-rose-500";
      case "Medium":
        return "bg-amber-600 text-white dark:bg-amber-500";
      default:
        return "bg-blue-600 text-white dark:bg-blue-500";
    }
  };

  if (!mounted) {
    return (
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 animate-pulse h-32" />
    );
  }
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-700 cursor-grab active:cursor-grabbing">
      <h4 className="font-bold text-sm tracking-tight mb-1 text-black dark:text-white">
        {task.title}
      </h4>

      <p className="text-xs text-neutral-900 dark:text-neutral-200 line-clamp-3 mb-4 font-medium leading-relaxed">
        {task.description}
      </p>
      {/* Divider and Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-3 text-[11px] font-bold">
        {/* User Assignee Badge */}
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-extrabold text-[9px]">
            {task.assignee.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-black dark:text-white font-semibold">
            {task.assignee.name}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-md text-[9px] uppercase font-black tracking-wider ${getPriorityStyle(task.priority)}`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}

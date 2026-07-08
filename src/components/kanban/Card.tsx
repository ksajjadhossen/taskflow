"use client";

import { Task } from "../../types/kanban";

interface CardProps {
  task: Task;
  onCardClick: (task: Task) => void;
}

export default function Card({ task, onCardClick }: CardProps) {
  const getPriorityStyles = (priority: string) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return {
          cardBg:
            "bg-teal-50/60 dark:bg-teal-950/20 border-teal-600/40 dark:border-teal-500/30",
          badgeBg:
            "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
          textColor: "text-teal-950 dark:text-teal-100",
          descColor: "text-teal-800/80 dark:text-teal-300/70",
        };
      case "MEDIUM":
        return {
          cardBg:
            "bg-purple-50/60 dark:bg-purple-950/20 border-purple-600/40 dark:border-purple-500/30",
          badgeBg:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          textColor: "text-purple-950 dark:text-purple-100",
          descColor: "text-purple-800/80 dark:text-purple-300/70",
        };
      default:
        return {
          cardBg:
            "bg-blue-50/40 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900/50",
          badgeBg:
            "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
          textColor: "text-zinc-900 dark:text-zinc-100",
          descColor: "text-zinc-600 dark:text-zinc-400",
        };
    }
  };

  const styles = getPriorityStyles(task.priority);

  const getAssigneeName = (): string => {
    if (!task.assignee) return "Unassigned";
    if (typeof task.assignee === "object" && "name" in task.assignee) {
      return String(task.assignee.name);
    }
    return String(task.assignee);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentTasks = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );
    const updatedTasks = currentTasks.filter((t: any) => t.id !== task.id);
    localStorage.setItem("kanban_tasks", JSON.stringify(updatedTasks));
  };

  const assigneeName = getAssigneeName();
  const avatarLetter = assigneeName.charAt(0).toUpperCase();

  return (
    <div
      onClick={() => onCardClick(task)}
      className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer ${styles.cardBg}`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 h-7 w-7 flex items-center justify-center rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white transition-all cursor-pointer z-10"
        title="Delete Task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.34 9m-4.72 0l-.34-9m9.42-2.24l-.81 14.07a2.25 2.25 0 01-2.244 2.118H7.422a2.25 2.25 0 01-2.244-2.118L4.35 6.76M4.07 6.76A1.25 1.25 0 013 5.5V5a1.25 1.25 0 011.25-1.25h15.5A1.25 1.25 0 0121 5v.5a1.25 1.25 0 01-1.07 1.26M9.25 4h5.5"
          />
        </svg>
      </button>

      <h4
        className={`font-black text-sm tracking-tight mb-1.5 pr-8 ${styles.textColor}`}
      >
        {task.title}
      </h4>

      <p
        className={`text-xs font-semibold leading-relaxed mb-4 line-clamp-2 ${styles.descColor}`}
      >
        {task.description}
      </p>

      <div className="w-full h-px bg-black/5 dark:bg-white/5 mb-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-[10px] font-black border border-zinc-200 dark:border-zinc-800 shadow-xs">
            {avatarLetter}
          </div>
          <span
            className={`text-xs font-black tracking-wide ${styles.textColor}`}
          >
            {assigneeName}
          </span>
        </div>

        <span
          className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md border ${styles.badgeBg}`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}

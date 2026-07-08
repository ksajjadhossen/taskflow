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
        };
      case "MEDIUM":
        return {
          cardBg:
            "bg-purple-50/60 dark:bg-purple-950/20 border-purple-600/40 dark:border-purple-500/30",
          badgeBg:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          textColor: "text-purple-950 dark:text-purple-100",
        };
      default:
        return {
          cardBg:
            "bg-blue-50/40 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900/50",
          badgeBg:
            "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
          textColor: "text-zinc-900 dark:text-zinc-100",
        };
    }
  };

  const styles = getPriorityStyles(task.priority);

  const getAssigneeName = (): string => {
    if (!task.assignee) return "Unassigned";
    return typeof task.assignee === "object" && "name" in task.assignee
      ? String(task.assignee.name)
      : String(task.assignee);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentTasks = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );
    const updatedTasks = currentTasks.filter((t: any) => t.id !== task.id);
    localStorage.setItem("kanban_tasks", JSON.stringify(updatedTasks));
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id);
  };

  const assigneeName = getAssigneeName();
  const avatarLetter = assigneeName.charAt(0).toUpperCase();

  const getLabelColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "bug":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "feature":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "ui/ux":
      case "ui":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div
      onClick={() => onCardClick(task)}
      draggable
      onDragStart={handleDragStart}
      className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing ${styles.cardBg}`}
    >
      <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 flex gap-1.5 z-10">
        <button
          onClick={handleDelete}
          className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.34 9m-4.72 0l-.34-9m9.42-2.24l-.81 14.07a2.25 2.25 0 01-2.244 2.118H7.422a2.25 2.25 0 01-2.244-2.118L4.35 6.76M4.07 6.76A1.25 1.25 0 013 5.5V5a1.25 1.25 0 011.25-1.25h15.5A1.25 1.25 0 0121 5v.5a1.25 1.25 0 01-1.07 1.26M9.25 4h5.5"
            />
          </svg>
        </button>
      </div>

      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2 pr-16">
          {task.labels.map((lbl, idx) => (
            <span
              key={idx}
              className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${getLabelColor(lbl)}`}
            >
              {lbl}
            </span>
          ))}
        </div>
      )}

      <h4
        className={`font-black text-sm tracking-tight mb-1 pr-16 ${styles.textColor}`}
      >
        {task.title}
      </h4>

      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="w-full h-px bg-black/5 dark:bg-white/5 mb-3" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="h-5 w-5 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-[9px] font-black border border-zinc-200 dark:border-zinc-800 shadow-xs">
            {avatarLetter}
          </div>
          <span
            className={`text-[11px] font-black tracking-wide truncate ${styles.textColor}`}
          >
            {assigneeName}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 dark:text-zinc-400/85 bg-zinc-100/50 dark:bg-zinc-800/40 px-1.5 py-0.5 rounded-md border border-zinc-200/40 dark:border-zinc-700/30 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-2.5 h-2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3v18.75h18V7.5H3v13.25zm2.25-10.5h13.5"
              />
            </svg>
            <span>{task.dueDate}</span>
          </div>
        )}

        <span
          className={`text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-md border shrink-0 ${styles.badgeBg}`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}

"use client";

import { Task } from "../../types/kanban";
import Card from "./Card";

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  onCardClick: (task: Task) => void;
  onTasksUpdate?: () => void;
}

export default function Column({
  title,
  status,
  tasks,
  onCardClick,
  onTasksUpdate,
}: ColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    const currentTasks: Task[] = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );
    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: status };
      }
      return task;
    });

    localStorage.setItem("kanban_tasks", JSON.stringify(updatedTasks));

    if (onTasksUpdate) {
      onTasksUpdate();
    }
  };

  const getHeaderBgColor = (colTitle: string) => {
    switch (colTitle.toUpperCase()) {
      case "BACKLOG":
        return "bg-zinc-500 text-white";
      case "TODO":
        return "bg-blue-600 text-white";
      case "IN PROGRESS":
        return "bg-amber-500 text-black";
      case "REVIEW":
        return "bg-teal-500 text-white";
      case "DONE":
        return "bg-emerald-600 text-white";
      default:
        return "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100";
    }
  };

  const headerBg = getHeaderBgColor(title);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col bg-zinc-950/40 w-full min-h-[500px] rounded-2xl border border-zinc-800/60 shadow-xs overflow-hidden"
    >
      <div
        className={`flex items-center justify-between p-3.5 font-black uppercase tracking-wider text-sm ${headerBg}`}
      >
        <h3>{title}</h3>
        <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-black/20 text-inherit border border-white/10">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4 overflow-y-auto h-full custom-scrollbar">
        {tasks.map((task) => (
          <Card key={task.id} task={task} onCardClick={onCardClick} />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800/40 rounded-xl p-8 h-32">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
              Empty Column
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

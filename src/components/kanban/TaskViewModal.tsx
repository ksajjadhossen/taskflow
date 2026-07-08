"use client";

import { Task } from "../../types/kanban";

interface TaskViewModalProps {
  task: Task | null;
  onClose: () => void;
}

export default function TaskViewModal({ task, onClose }: TaskViewModalProps) {
  if (!task) return null;

  const assigneeName =
    typeof task.assignee === "object" && "name" in task.assignee
      ? task.assignee.name
      : String(task.assignee || "Unassigned");
  const avatarLetter = assigneeName.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
            {task.priority} Priority
          </span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black dark:hover:text-white font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <h2 className="text-xl font-black text-black dark:text-white tracking-tight mb-2">
          {task.title}
        </h2>
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900">
          {task.description}
        </p>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-black">
              {avatarLetter}
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                Assignee
              </p>
              <p className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                {assigneeName}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              Due Date
            </p>
            <p className="text-xs font-black text-zinc-800 dark:text-zinc-200">
              {task.dueDate || "No Date"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

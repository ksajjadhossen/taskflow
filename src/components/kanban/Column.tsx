// src/components/kanban/Column.tsx

import { Task } from "../../types/kanban";
import Card from "./Card";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export default function Column({ title, tasks }: ColumnProps) {
  const getHeaderStyles = (columnTitle: string) => {
    switch (columnTitle?.toUpperCase()) {
      case "BACKLOG":
        return "bg-zinc-500 text-white font-black";
      case "TODO":
        return "bg-blue-600 text-white font-black";
      case "IN PROGRESS":
      case "DOING":
        return "bg-amber-400 text-zinc-950 font-black";
      case "REVIEW":
        return "bg-emerald-400 text-zinc-950 font-black";
      case "DONE":
        return "bg-green-600 text-white font-black";
      default:
        return "bg-zinc-200 text-zinc-900";
    }
  };

  const headerBgClass = getHeaderStyles(title);

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl min-h-[620px] w-full shadow-sm overflow-hidden">
      <div
        className={`flex items-center justify-between px-4 py-3.5 mb-4 ${headerBgClass}`}
      >
        <h3 className="text-xs tracking-wider uppercase">{title}</h3>

        <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-black/15 border border-black/5">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-3.5 px-4 pb-4">
        {tasks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-800/80 rounded-xl p-8 bg-zinc-50/60 dark:bg-transparent">
            <span className="text-xs text-black dark:text-zinc-400 font-extrabold tracking-wide">
              No tasks yet
            </span>
          </div>
        ) : (
          tasks.map((task) => <Card key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

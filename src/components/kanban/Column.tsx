import { Task } from "../../types/kanban";
import Card from "./Card";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export default function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4 min-h-[620px] w-full shadow-sm">
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="font-black text-xs tracking-wider text-black dark:text-zinc-100 uppercase">
          {title}
        </h3>
        <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-black text-white dark:bg-zinc-800 dark:text-zinc-200 shadow-xs">
          {tasks.length}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-3.5">
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

"use client";

interface BoardHeaderProps {
  userName: string;
  userEmail: string;
  onNewTaskClick: () => void;
}
export default function BoardHeader({ userName, userEmail }: BoardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Workspace Board</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
          Welcome back,{" "}
          <span className="text-blue-600 dark:text-blue-400 font-black">
            {userName}
          </span>
          ! Managing workflow for {userEmail}
        </p>
      </div>
    </div>
  );
}

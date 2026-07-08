"use client";

interface BoardHeaderProps {
  userName: string;
  userEmail: string;
  onNewTaskClick: () => void;
}

export default function BoardHeader({
  userName,
  userEmail,
  onNewTaskClick,
}: BoardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        {/* টেক্সট কালার গ্লোবাল CSS থেকে অটোমেটিক পাবে */}
        <h1 className="text-3xl font-black tracking-tight">Workspace Board</h1>

        {/* সাবটেক্সট: লাইট মোডে স্পষ্ট ধূসর এবং ডার্ক মোডে হালকা ধূসর */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
          Welcome back,{" "}
          <span className="text-blue-600 dark:text-blue-400 font-black">
            {userName}
          </span>
          ! Managing workflow for {userEmail}
        </p>
      </div>

      <button
        onClick={onNewTaskClick}
        className="px-5 py-2.5 text-xs bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 flex items-center gap-1"
      >
        <span className="text-sm font-black">+</span> New Task
      </button>
    </div>
  );
}

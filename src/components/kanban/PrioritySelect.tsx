"use client";

interface PrioritySelectProps {
  value: string;
  onChange: (val: string) => void;
}

export default function PrioritySelect({
  value,
  onChange,
}: PrioritySelectProps) {
  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
        Priority
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-black dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
    </div>
  );
}

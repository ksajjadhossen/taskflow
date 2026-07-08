"use client";

interface LabelOption {
  id: string;
  name: string;
  color: string;
}

const AVAILABLE_LABELS: LabelOption[] = [
  { id: "bug", name: "Bug", color: "bg-rose-500 text-white" },
  { id: "feature", name: "Feature", color: "bg-purple-500 text-white" },
  { id: "ui", name: "UI/UX", color: "bg-blue-500 text-white" },
  { id: "refactor", name: "Refactor", color: "bg-amber-500 text-zinc-950" },
];

interface LabelsSelectProps {
  selectedLabels: string[];
  onChange: (labels: string[]) => void;
}

export default function LabelsSelect({
  selectedLabels,
  onChange,
}: LabelsSelectProps) {
  const toggleLabel = (labelName: string): void => {
    if (selectedLabels.includes(labelName)) {
      onChange(selectedLabels.filter((l) => l !== labelName));
    } else {
      onChange([...selectedLabels, labelName]);
    }
  };

  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
        Labels
      </label>
      <div className="flex flex-wrap gap-1.5 p-2 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950">
        {AVAILABLE_LABELS.map((lbl) => {
          const isSelected = selectedLabels.includes(lbl.name);
          return (
            <button
              type="button"
              key={lbl.id}
              onClick={() => toggleLabel(lbl.name)}
              className={`text-[10px] font-black px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                isSelected
                  ? `${lbl.color} border-transparent scale-105`
                  : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {lbl.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

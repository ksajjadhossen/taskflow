"use client";

interface InputFieldProps {
  label: string;
  type?: "text" | "textarea";
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  rows = 3,
}: InputFieldProps) {
  const baseClass =
    "w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-black dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          required={required}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}

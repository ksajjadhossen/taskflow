const pastelColors = [
  "bg-white border-blue-300 dark:bg-blue-950/20 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 shadow-xs",
  "bg-white border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 shadow-xs",
  "bg-white border-amber-400 dark:bg-amber-950/20 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 shadow-xs",
  "bg-white border-purple-300 dark:bg-purple-950/20 dark:border-purple-900/50 text-purple-800 dark:text-purple-300 shadow-xs",
  "bg-white border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 shadow-xs",
];

export function getRandomPastelColor(): string {
  const index = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[index];
}

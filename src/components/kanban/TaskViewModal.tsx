"use client";

import { useState, useEffect } from "react";
import { Task } from "../../types/kanban";
import InputField from "./InputField";
import PrioritySelect from "./PrioritySelect";

interface TaskViewModalProps {
  task: Task | null;
  onClose: () => void;
}

export default function TaskViewModal({ task, onClose }: TaskViewModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      const name =
        typeof task.assignee === "object" && "name" in task.assignee
          ? task.assignee.name
          : String(task.assignee || "");
      setAssignee(name);
      setPriority(task.priority?.toUpperCase() || "MEDIUM");
    }
  }, [task]);

  if (!task) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const currentTasks = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );
    const updatedTasks = currentTasks.map((t: any) => {
      if (t.id === task.id) {
        return {
          ...t,
          title: title.trim(),
          description: description.trim(),
          assignee: { ...t.assignee, name: assignee.trim() || "Unassigned" },
          priority:
            priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase(),
        };
      }
      return t;
    });

    localStorage.setItem("kanban_tasks", JSON.stringify(updatedTasks));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-black text-black dark:text-white tracking-tight">
            Edit Task Details
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black dark:hover:text-white font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <InputField
            label="Task Title"
            required
            value={title}
            onChange={setTitle}
          />

          <InputField
            label="Description"
            type="textarea"
            required
            value={description}
            onChange={setDescription}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Assignee"
              value={assignee}
              onChange={setAssignee}
              placeholder="Name"
            />
            <PrioritySelect value={priority} onChange={setPriority} />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

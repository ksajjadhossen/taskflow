"use client";

import { useState } from "react";
import { Priority } from "../../types/kanban";
import InputField from "./InputField";
import PrioritySelect from "./PrioritySelect";
import LabelsSelect from "./LabelsSelect";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description: string;
    assignee: string;
    priority: Priority;
    labels: string[];
    dueDate: string;
  }) => void;
}

export default function TaskModal({
  isOpen,
  onClose,
  onAddTask,
}: TaskModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [labels, setLabels] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddTask({
      title,
      description,
      assignee: assignee.trim() || "Unassigned",
      priority,
      labels,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setAssignee("");
    setPriority("Medium");
    setLabels([]);
    setDueDate(new Date().toISOString().split("T")[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-black text-black dark:text-white tracking-tight">
            Create New Task
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-black dark:hover:text-white font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Task Title"
            required
            value={title}
            onChange={setTitle}
            placeholder="Enter task title..."
          />

          <div>
            <InputField
              label="Description"
              type="textarea"
              required
              value={description}
              onChange={setDescription}
              placeholder="Describe details..."
            />
            <span className="text-[9px] text-zinc-400 font-bold block mt-1">
              Tip: Rich text representation via clean layout.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Assignee Name"
              value={assignee}
              onChange={setAssignee}
              placeholder="Name"
            />
            <InputField
              label="Due Date"
              value={dueDate}
              onChange={setDueDate}
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <PrioritySelect
              value={priority}
              onChange={(val) => setPriority(val as Priority)}
            />
            <LabelsSelect selectedLabels={labels} onChange={setLabels} />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer text-xs uppercase tracking-wider"
          >
            Add to Todo
          </button>
        </form>
      </div>
    </div>
  );
}

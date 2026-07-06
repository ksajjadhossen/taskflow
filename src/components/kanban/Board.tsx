"use client";

import { useState } from "react";

import Column from "./Column";
import { Task } from "../../types/kanban";
import { getRandomPastelColor } from "../../lib/utils";

// Simple initial mock dataset to test components out
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Setup project with TypeScript",
    description:
      "Convert initial setup javascript files to typescript configurations.",
    assignee: { name: "Sajjad", avatar: "" },
    labels: ["Setup"],
    dueDate: "2026-07-10",
    priority: "High",
    bgColor: getRandomPastelColor(),
  },
  {
    id: "2",
    title: "Design Minimal Navbar",
    description:
      "Build a light and dark mode togglable responsive header navbar component.",
    assignee: { name: "Anik", avatar: "" },
    labels: ["UI"],
    dueDate: "2026-07-12",
    priority: "Medium",
    bgColor: getRandomPastelColor(),
  },
];

export default function Board() {
  const [tasks] = useState<Task[]>(initialTasks);

  // Group columns basic filter layout
  const getTasksByStatus = (status: string) => {
    if (status === "todo") return tasks; // Place mock tasks in Todo for display testing
    return [];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
      <Column title="Backlog" tasks={getTasksByStatus("backlog")} />
      <Column title="Todo" tasks={getTasksByStatus("todo")} />
      <Column title="In Progress" tasks={getTasksByStatus("in-progress")} />
      <Column title="Review" tasks={getTasksByStatus("review")} />
      <Column title="Done" tasks={getTasksByStatus("done")} />
    </div>
  );
}

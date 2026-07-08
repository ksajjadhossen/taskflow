"use client";

import { useState, useEffect } from "react";
import { Task } from "../../types/kanban";
import Column from "./Column";
import TaskViewModal from "./TaskViewModal";

const INITIAL_COLUMNS = ["BACKLOG", "TODO", "IN PROGRESS", "REVIEW", "DONE"];

const DEFAULT_TASKS: any[] = [
  {
    id: "task-1",
    title: "Welcome to Kanban Board",
    description:
      "This is a default task. Try adding a new task from the top button!",
    status: "TODO",
    assignee: { name: "Sajjad", avatar: "" },
    labels: [],
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Medium",
    bgColor: "",
  },
];

export default function Board() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const loadTasks = () => {
    const savedTasks = localStorage.getItem("kanban_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      localStorage.setItem("kanban_tasks", JSON.stringify(DEFAULT_TASKS));
      setTasks(DEFAULT_TASKS);
    }
  };

  useEffect(() => {
    loadTasks();

    const handleStorageChange = () => {
      const updatedTasks = localStorage.getItem("kanban_tasks");
      if (updatedTasks) {
        setTasks(JSON.parse(updatedTasks));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 items-start mt-4">
      {INITIAL_COLUMNS.map((columnTitle) => {
        const filteredTasks = tasks.filter(
          (task) => (task.status || "TODO").toUpperCase() === columnTitle,
        );

        return (
          <Column
            key={columnTitle}
            title={columnTitle}
            status={columnTitle}
            tasks={filteredTasks}
            onCardClick={(task) => setSelectedTask(task)}
            onTasksUpdate={loadTasks}
          />
        );
      })}

      <TaskViewModal
        task={selectedTask}
        onClose={() => {
          setSelectedTask(null);
          loadTasks();
        }}
      />
    </div>
  );
}

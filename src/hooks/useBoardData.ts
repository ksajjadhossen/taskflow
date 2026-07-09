"use client";

import { useEffect, useRef } from "react";
import { useUndoRedo } from "./useUndoRedo";

const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Welcome to TaskFlow",
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

export function useBoardData() {
  const {
    state: tasks,
    setState: setTasks,
    updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadTasks = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("kanban_tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      localStorage.setItem("kanban_tasks", JSON.stringify(DEFAULT_TASKS));
      setTasks(DEFAULT_TASKS);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const syncStorage = () => {
    const saved = localStorage.getItem("kanban_tasks");
    if (saved) updateState(JSON.parse(saved));
  };

  const handleAddTask = (newTask: any) => {
    const current = JSON.parse(localStorage.getItem("kanban_tasks") || "[]");
    const taskToSave = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      status: "TODO",
      assignee: { name: newTask.assignee, avatar: "" },
      labels: newTask.labels,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      bgColor: "",
    };
    const updated = [...current, taskToSave];
    localStorage.setItem("kanban_tasks", JSON.stringify(updated));
    updateState(updated);
  };

  const exportBoard = () => {
    const dataUri =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tasks, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute(
      "download",
      `kanban-board-${new Date().toISOString().split("T")[0]}.json`,
    );
    link.click();
  };

  const importBoard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          localStorage.setItem("kanban_tasks", JSON.stringify(importedData));
          updateState(importedData);
          alert("Board imported successfully!");
        }
      } catch {
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = "";
  };

  return {
    tasks,
    handleAddTask,
    syncStorage,
    exportBoard,
    importBoard,
    fileInputRef,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}

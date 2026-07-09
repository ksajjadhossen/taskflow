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

const boardChannel =
  typeof window !== "undefined" ? new BroadcastChannel("kanban_sync") : null;

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

  useEffect(() => {
    const handleSync = (e: MessageEvent) => {
      if (e.data === "sync-data") {
        const saved = localStorage.getItem("kanban_tasks");
        if (saved) updateState(JSON.parse(saved));
      }
    };

    boardChannel?.addEventListener("message", handleSync);
    return () => boardChannel?.removeEventListener("message", handleSync);
  }, [updateState]);

  const syncStorage = () => {
    const saved = localStorage.getItem("kanban_tasks");
    if (saved) {
      updateState(JSON.parse(saved));
      boardChannel?.postMessage("sync-data");
    }
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
    boardChannel?.postMessage("sync-data");
  };

  const exportBoard = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanban-board-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          boardChannel?.postMessage("sync-data");
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

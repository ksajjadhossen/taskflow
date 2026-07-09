"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, Priority } from "../../types/kanban";
import Column from "./Column";
import TaskViewModal from "./TaskViewModal";
import TaskModal from "./TaskModal";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useUndoRedo } from "../../hooks/useUndoRedo";

const INITIAL_COLUMNS = ["BACKLOG", "TODO", "IN PROGRESS", "REVIEW", "DONE"];

const DEFAULT_TASKS: any[] = [
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

export default function Board() {
  const {
    state: tasks,
    setState: setTasks,
    updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<any[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const loadTasks = () => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("kanban_tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        localStorage.setItem("kanban_tasks", JSON.stringify(DEFAULT_TASKS));
        setTasks(DEFAULT_TASKS);
      }
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTasksUpdateFromColumn = () => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("kanban_tasks");
      if (savedTasks) {
        const parsed = JSON.parse(savedTasks);
        updateState(parsed);
      }
    }
  };

  const handleAddTask = (newTask: {
    title: string;
    description: string;
    assignee: string;
    priority: Priority;
    labels: string[];
    dueDate: string;
  }) => {
    const currentTasks = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );

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

    const updated = [...currentTasks, taskToSave];
    localStorage.setItem("kanban_tasks", JSON.stringify(updated));
    updateState(updated);
  };

  useEffect(() => {
    const handleUndoRedoKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        const prevState = undo();
        if (prevState)
          localStorage.setItem("kanban_tasks", JSON.stringify(prevState));
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        const nextState = redo();
        if (nextState)
          localStorage.setItem("kanban_tasks", JSON.stringify(nextState));
      }
    };

    window.addEventListener("keydown", handleUndoRedoKeys);
    return () => window.removeEventListener("keydown", handleUndoRedoKeys);
  }, [undo, redo]);

  const handleNewTaskShortcut = useCallback(() => {
    setIsNewTaskModalOpen(true);
  }, []);

  const handleCloseModalsShortcut = useCallback(() => {
    setSelectedTask(null);
    setIsNewTaskModalOpen(false);
  }, []);

  useKeyboardShortcuts({
    onNewTask: handleNewTaskShortcut,
    onCloseModals: handleCloseModalsShortcut,
  });

  return (
    <div className="w-full">
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            disabled={!canUndo}
            onClick={() => {
              const prev = undo();
              if (prev)
                localStorage.setItem("kanban_tasks", JSON.stringify(prev));
            }}
            className="px-3 py-1.5 text-xs font-bold rounded bg-zinc-100 dark:bg-zinc-800 disabled:opacity-40 cursor-pointer"
          >
            ↩ Undo
          </button>
          <button
            disabled={!canRedo}
            onClick={() => {
              const next = redo();
              if (next)
                localStorage.setItem("kanban_tasks", JSON.stringify(next));
            }}
            className="px-3 py-1.5 text-xs font-bold rounded bg-zinc-100 dark:bg-zinc-800 disabled:opacity-40 cursor-pointer"
          >
            ↪ Redo
          </button>
        </div>

        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="px-5 py-2.5 text-xs bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-all cursor-pointer shadow-md flex items-center gap-1"
        >
          <span className="text-sm font-black">+</span> New Task
        </button>
      </div>

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
              onTasksUpdate={handleTasksUpdateFromColumn}
            />
          );
        })}

        <TaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />

        <TaskViewModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            handleTasksUpdateFromColumn();
          }}
        />
      </div>
    </div>
  );
}

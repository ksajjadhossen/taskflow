"use client";

import { useState, useEffect, useCallback } from "react";
import { Task } from "../../types/kanban";
import Column from "./Column";
import TaskViewModal from "./TaskViewModal";
import TaskModal from "./TaskModal";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useBoardData } from "../../hooks/useBoardData";
import { polyfill } from "mobile-drag-drop";

const INITIAL_COLUMNS = ["BACKLOG", "TODO", "IN PROGRESS", "REVIEW", "DONE"];

export default function Board() {
  const {
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
  } = useBoardData();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    polyfill({
      holdToDrag: 300,
    });
  }, []);

  useEffect(() => {
    const handleUndoRedoKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        const prev = undo();
        if (prev) localStorage.setItem("kanban_tasks", JSON.stringify(prev));
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        const next = redo();
        if (next) localStorage.setItem("kanban_tasks", JSON.stringify(next));
      }
    };
    window.addEventListener("keydown", handleUndoRedoKeys);
    return () => window.removeEventListener("keydown", handleUndoRedoKeys);
  }, [undo, redo]);

  useKeyboardShortcuts({
    onNewTask: useCallback(() => setIsNewTaskModalOpen(true), []),
    onCloseModals: useCallback(() => {
      setSelectedTask(null);
      setIsNewTaskModalOpen(false);
    }, []),
  });

  return (
    <div className="w-full">
      <div className="w-full mb-4 flex justify-between items-center flex-wrap gap-3">
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

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={importBoard}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-xs border border-zinc-200 dark:border-zinc-700 font-bold rounded bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-all"
          >
            📥 Import JSON
          </button>
          <button
            onClick={exportBoard}
            className="px-4 py-2 text-xs border border-zinc-200 dark:border-zinc-700 font-bold rounded bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-all"
          >
            📤 Export JSON
          </button>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-5 py-2.5 text-xs bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-all cursor-pointer shadow-md flex items-center gap-1"
          >
            <span className="text-sm font-black">+</span> New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 items-start mt-4">
        {INITIAL_COLUMNS.map((col) => (
          <Column
            key={col}
            title={col}
            status={col}
            tasks={tasks.filter(
              (t) => (t.status || "TODO").toUpperCase() === col,
            )}
            onCardClick={setSelectedTask}
            onTasksUpdate={syncStorage}
          />
        ))}

        <TaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />
        <TaskViewModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            syncStorage();
          }}
        />
      </div>
    </div>
  );
}

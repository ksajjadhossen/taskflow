"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, Priority } from "../../types/kanban";
import Column from "./Column";
import TaskViewModal from "./TaskViewModal";
import TaskModal from "./TaskModal";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

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
  const [tasks, setTasks] = useState<any[]>([]);
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
    loadTasks();
  };

  // ⚡ শর্টকাটের জন্য হ্যান্ডলার ফাংশন তৈরি
  const handleNewTaskShortcut = useCallback(() => {
    setIsNewTaskModalOpen(true);
  }, []);

  const handleCloseModalsShortcut = useCallback(() => {
    setSelectedTask(null);
    setIsNewTaskModalOpen(false);
  }, []);

  // ⚡ কীবোর্ড শর্টকাট হুক কল করা হলো
  useKeyboardShortcuts({
    onNewTask: handleNewTaskShortcut,
    onCloseModals: handleCloseModalsShortcut,
  });

  return (
    <div className="w-full">
      {/* 💡 পরিবর্তন এখানে: flex justify-end ব্যবহার করে বাটনকে ডান দিকে নেওয়া হয়েছে */}
      <div className="w-full mb-4 flex justify-end items-end">
        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="px-5 py-2.5 text-xs bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-all cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 flex items-center gap-1"
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
              onTasksUpdate={loadTasks}
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
            loadTasks();
          }}
        />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Board from "../components/kanban/Board";
import BoardHeader from "../components/kanban/BoardHeader";
import OnboardingModal from "../components/kanban/OnboardingModal";
import TaskModal from "../components/kanban/TaskModal";

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("board_user_info");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAddTask = (newTaskData: {
    title: string;
    description: string;
    assignee: string;
    priority: string;
  }) => {
    const currentTasks = JSON.parse(
      localStorage.getItem("kanban_tasks") || "[]",
    );

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskData.title,
      description: newTaskData.description,
      status: "TODO",
      assignee: {
        name: newTaskData.assignee,
        avatar: "",
      },
      labels: [],
      dueDate: new Date().toISOString().split("T")[0],
      priority:
        newTaskData.priority.charAt(0).toUpperCase() +
        newTaskData.priority.slice(1).toLowerCase(),
      bgColor: "",
    };

    const updatedTasks = [...currentTasks, newTask];
    localStorage.setItem("kanban_tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
  };

  if (!mounted) return null;

  if (!user) {
    return <OnboardingModal onSuccess={(userInfo) => setUser(userInfo)} />;
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-70px)] bg-white dark:bg-transparent">
      <BoardHeader
        userName={user.name}
        userEmail={user.email}
        onNewTaskClick={() => setIsModalOpen(true)}
      />
      <Board />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

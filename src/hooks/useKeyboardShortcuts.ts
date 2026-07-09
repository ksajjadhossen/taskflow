"use client";

import { useEffect } from "react";

interface ShortcutConfig {
  onNewTask: () => void;
  onCloseModals: () => void;
}

export function useKeyboardShortcuts({
  onNewTask,
  onCloseModals,
}: ShortcutConfig) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "Escape") {
        onCloseModals();
        return;
      }

      if (isTyping) {
        return;
      }

      if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        onNewTask();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNewTask, onCloseModals]);
}

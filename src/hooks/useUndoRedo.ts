"use client";

import { useState, useCallback } from "react";

export function useUndoRedo<T>(initialState: T) {
  const [present, setPresent] = useState<T>(initialState);
  const [past, setPast] = useState<any[]>([]);
  const [future, setFuture] = useState<any[]>([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const updateState = useCallback(
    (newState: T) => {
      setPast((prev) => [...prev, present]);
      setPresent(newState);
      setFuture([]);
    },
    [present],
  );

  const undo = useCallback(() => {
    if (!canUndo) return null;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setFuture((prev) => [present, ...prev]);
    setPresent(previous);
    setPast(newPast);
    return previous;
  }, [canUndo, past, present]);

  const redo = useCallback(() => {
    if (!canRedo) return null;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prev) => [...prev, present]);
    setPresent(next);
    setFuture(newFuture);
    return next;
  }, [canRedo, future, present]);

  return {
    state: present,
    setState: setPresent,
    updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}

export type Priority = "Low" | "Medium" | "High";

export interface Assignee {
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Assignee;
  labels: string[];
  dueDate: string;
  priority: Priority;
  bgColor: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

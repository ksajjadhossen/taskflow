# 🚀 Workspace Kanban Board

<div align="left">
  <a href="https://github.com/ksajjadhossen/taskflow">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  <a href="https://taskflow-sammtech.vercel.app/">
    <img src="https://img.shields.io/badge/Vercel-Live%20Demo-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</div>

<br />

A modern, high-performance, and deeply optimized task management Kanban Board built with **Next.js** and **TypeScript**. This project features a fluid drag-and-drop system, persistent local storage, custom color-coded layouts, and an adaptive dark/light theme designed for maximum productivity.

---

## 🔗 Project Links

- **GitHub Repository:** [https://github.com/ksajjadhossen/taskflow](https://github.com/ksajjadhossen/taskflow)
- **Live Deployment (Vercel):** [https://taskflow-sammtech.vercel.app/](https://taskflow-sammtech.vercel.app/)

---

## ✨ Features & Functionalities

### 🛠️ Core Kanban Operations

- **Task Progression Management:** Organizes workflow efficiently across 5 distinct stages: `BACKLOG`, `TODO`, `IN PROGRESS`, `REVIEW`, and `DONE`.
- **Comprehensive Task Creation:** Allows setting up granular task parameters, including:
  - Task Title & Detailed Descriptions.
  - Due Dates (Automatically defaults to the current date).
  - Assignee Information (Supports automatic name-based avatar generation).
  - Priority Matrices (`HIGH`, `MEDIUM`, `LOW`).
  - Modular Labels (`Bug`, `Feature`, `UI/UX`, `Refactor`).
- **Interactive Editing & Management:** Full-featured `TaskViewModal` allows quick inline task modifications or permanent task deletion on the fly.

### ⚡ Real-Time Drag and Drop

- **Native HTML5 Implementation:** Zero reliance on heavy third-party packages, minimizing bundle sizes while achieving instantaneous rendering.
- **Rerender-Free State Updates:** Utilizes functional React lifecycle callbacks instead of aggressive window reloads, resulting in ultra-smooth, flicker-free state changes during task transitions.

### 🎨 Premium UI/UX Optimization

- **Dual-Mode Aesthetic Alignment:**
  - **Dark Mode:** High-contrast, glowing neon accents with clean glassmorphism styling parameters.
  - **Light Mode:** Pure, crisp white layouts relying on soft atmospheric drop-shadows and micro-borders to keep views perfectly segregated without feeling cluttered.
- **Priority-Driven Color Coding:** Dynamically overrides card themes based on severity markers (e.g., _Teal/Rose_ for High, _Purple/Amber_ for Medium) across both light and dark backgrounds.
- **Dynamic Headers:** Columns render dedicated color blocks mapped identically to default kanban priorities for immediate visual segregation.

### 💾 Performance & Sync

- **Local Storage Architecture:** Complete data persistence across browser lifecycles without requiring heavy external server-side interactions.
- **Automated Sync Observers:** Native event loops map background local storage modifications in real-time, matching browser changes smoothly without breaking component trees.

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js (App Router, Turbopack Compiler Engine)
- **Language:** TypeScript (TSX)
- **Styling:** Tailwind CSS (Utility-first configuration with custom scrollbars)
- **State Layer:** React Local Hooks (`useState`, `useEffect`, Custom Storage Event Listeners)

---

## 📂 Architecture Setup

```text
src/
└── components/
    └── kanban/
        ├── Board.tsx           # Parent controller; synchronizes data boundaries
        ├── Column.tsx          # Droppable board columns; renders headers & handles dropped events
        ├── Card.tsx            # Draggable task items; handles priority styles & deletion
        ├── TaskViewModal.tsx   # Portal window for editing and visual oversight
        ├── TaskModal.tsx       # Standard template injection point for task generation
        └── LabelsSelect.tsx    # Modular interface component for parsing workflow badges
```

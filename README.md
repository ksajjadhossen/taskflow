# 🚀 TaskFlow — Interactive Workspace Kanban Board

<div align="left">
  <a href="https://github.com/ksajjadhossen/taskflow">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  <a href="https://taskflow-sammtech.vercel.app/">
    <img src="https://img.shields.io/badge/Vercel-Live%20Demo-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</div>

<br />

A premium, production-ready, and deeply optimized task management Kanban Board built with **Next.js 14+ (App Router)** and **TypeScript**. This project implements smooth drag-and-drop interaction, granular performance optimizations, reactive state synchronization, and a fully production-grade UX architecture meeting all the requirements specified in the job task guidelines.

---

## 🔗 Project Links

- **GitHub Repository:** [https://github.com/ksajjadhossen/taskflow](https://github.com/ksajjadhossen/taskflow)
- **Live Deployment (Vercel):** [https://taskflow-sammtech.vercel.app/](https://taskflow-sammtech.vercel.app/)

---

## ✨ Features Implemented

### 📦 Core Kanban Architecture

- **5-Stage Progression Layout:** Seamless task movement tracking across `BACKLOG`, `TODO`, `IN PROGRESS`, `REVIEW`, and `DONE` workflow columns.
- **Rich Card Parameters:** Detailed task tracking utilizing text descriptions, due dates, multi-select colored tags (`Bug`, `Feature`, `UI/UX`, `Refactor`), and dynamically computed priority matrices (`HIGH`, `MEDIUM`, `LOW`).
- **Granular Editing & Oversight:** Interactive modal popups facilitating instantaneous full-field attribute updates and permanent safe-deletion commands.
- **Search & Advanced Filtering:** Zero-lag filtering engine allowing instant searching by task title, assignee name, specific workflow labels, and priority states.
- **Persistent Dual-Theme Engine:** Smart light/dark toggle respecting system preferences automatically and persisting user selections flawlessly.

### 🔥 Premium Bonus Features (Advanced Tech)

- **⚡ Real-Time Multi-Tab Synchronization:** Integrated with the **Web BroadcastChannel API** to orchestrate real-time, zero-backend state syncing across multiple browser tabs instantaneously.
- **↩️ Built-in Undo / Redo Mechanism:** Custom state history manager mapping state nodes to rollback or re-apply drag-and-drop transitions or task deletions via hotkeys or control buttons.
- **📱 Touch-Friendly Cross-Device Drag & Drop:** Enhanced with a continuous-gesture polyfill enabling flawless drag mechanics on smartphone and tablet touch-screens using short-press triggers.
- **📥 Robust JSON Export & Import Engine:** Generates mobile-compatible file blobs for downloading the board layout as a `.json` configuration file or restoring deep board states back instantly.

---

## ⌨️ Keyboard Shortcuts & Hotkeys (Power-User Workflow)

To enable a lightning-fast, mouse-free workflow, the system includes built-in keyboard event listeners with automatic focus traps:

| Key Command                                                  | Action Triggered                           | Context / Scope                   |
| :----------------------------------------------------------- | :----------------------------------------- | :-------------------------------- |
| <kbd>N</kbd>                                                 | Opens **New Task** Creation Modal          | Global (Anywhere on the board)    |
| <kbd>Esc</kbd>                                               | Closes **Any Active Modal** (View or Edit) | Active Modal Overlay              |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>⌘</kbd> + <kbd>Z</kbd> | **Undo** last drag-and-drop or action      | Global (Instant rollback)         |
| <kbd>Ctrl</kbd> + <kbd>Y</kbd> / <kbd>⌘</kbd> + <kbd>Y</kbd> | **Redo** last undone action                | Global (Instant forward tracking) |

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js 14+ (App Router, Turbopack Compiler Engine)
- **Language:** TypeScript (TSX)
- **Styling:** Tailwind CSS (Utility-first configuration with custom scrollbars)
- **State Layer:** React Local Hooks (`useState`, `useEffect`, Custom Storage Event Listeners)

---

## 📂 Architecture Setup

```text
src/
├── app/                                # Next.js App Router core routing & layout rules
├── components/
│   ├── kanban/
│   │   ├── Board.tsx                   # Parent controller; synchronizes data boundaries
│   │   ├── BoardHeader.tsx             # Renders filters, search controls, and structural actions
│   │   ├── Card.tsx                    # Draggable task items; handles priority styles & deletion
│   │   ├── Column.tsx                  # Droppable board columns; handles auto-height & drop events
│   │   ├── InputField.tsx              # Reusable form field layout with standardized interface input
│   │   ├── LabelsSelect.tsx            # Modular interface component for parsing workflow badges
│   │   ├── OnboardingModal.tsx         # Guided overlay welcoming new users with onboarding steps
│   │   ├── PrioritySelect.tsx          # Dedicated selection dropdown for assigning task severity
│   │   ├── TaskModal.tsx               # Standard template injection point for task generation
│   │   └── TaskViewModal.tsx           # Portal window for editing and visual oversight
│   └── shared/
│       └── navbar.tsx                  # Main layout navigation header configuration
├── hooks/
│   ├── useBoardData.ts                 # Custom hook for layout sync, export/import & BroadcastChannel
│   ├── useKeyboardShortcuts.ts         # Event listener hub managing system-wide keyboard macros
│   └── useUndoRedo.ts                  # Custom state history stack tracking layout nodes
├── lib/
│   └── utils.ts                        # Global utility configurations and helper scripts
└── types/
    └── kanban.ts                       # Structured TypeScript type rules and interface definitions
```

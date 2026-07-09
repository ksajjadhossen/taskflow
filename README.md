# 🚀 TaskFlow — Interactive Workspace Kanban Board

<div align="left">
  <a href="https://github.com/ksajjadhossen/taskflow">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  <a href="https://taskflow-sammtech.vercel.app/">
    <img src="https://img.shields.io/badge/Vercel-Live%20Demo-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</div>

<br/>

A premium, production-ready, and highly optimized **Kanban Task Management Board** built with **Next.js 14 (App Router)** and **TypeScript**. The application provides a smooth drag-and-drop experience, powerful task management, real-time synchronization across browser tabs, and a modern responsive UI designed to meet production-level standards.

---

# 🔗 Project Links

- **GitHub Repository:** https://github.com/ksajjadhossen/taskflow
- **Live Demo:** https://taskflow-sammtech.vercel.app/

---

# ⚙️ Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/ksajjadhossen/taskflow.git
cd taskflow
```

---

## 2. Install Dependencies

Make sure you have **Node.js v18+** installed.

Using npm:

```bash
npm install
```

Using Yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

---

## 3. Run Development Server

Start the local development server with Turbopack.

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## 4. Build for Production

```bash
npm run build
npm run start
```

---

# ✨ Features Implemented

## 📦 Core Kanban Features

- ✅ 5-stage Kanban workflow
  - BACKLOG
  - TODO
  - IN PROGRESS
  - REVIEW
  - DONE

- ✅ Drag & Drop task management

- ✅ Create new tasks

- ✅ Edit existing tasks

- ✅ Delete tasks

- ✅ Rich task information
  - Description
  - Due Date
  - Assignee
  - Labels
  - Priority

- ✅ Multi-label support
  - Bug
  - Feature
  - UI/UX
  - Refactor

- ✅ Priority management
  - High
  - Medium
  - Low

- ✅ Fast search by
  - Task title
  - Assignee
  - Labels

- ✅ Advanced filtering

- ✅ Persistent Local Storage

- ✅ Light / Dark Theme

- ✅ Fully Responsive Design

---

# 🔥 Premium Bonus Features

### ⚡ Real-Time Multi-Tab Synchronization

Implemented using the **BroadcastChannel API** so changes made in one browser tab instantly appear in every other open tab without refreshing.

---

### ↩️ Undo / Redo History

Custom state history management allows users to undo and redo:

- Drag & Drop
- Task Updates
- Task Deletion

using keyboard shortcuts or action buttons.

---

### 📱 Touch-Friendly Drag & Drop

Supports mobile and tablet devices with touch gestures and long-press interactions for smooth drag-and-drop functionality.

---

### 📥 JSON Export & Import

Users can:

- Export the entire board as a JSON file
- Restore board state by importing JSON

---

# 💡 Technical Decisions & Why

## Next.js 14 App Router + TypeScript

Chosen for:

- Modern routing architecture
- Better scalability
- Strong type safety
- Reduced runtime errors
- Future maintainability

---

## React Hooks for State Management

Instead of Redux or Zustand, the project uses lightweight custom hooks because:

- Less boilerplate
- Better readability
- Smaller bundle size
- Sufficient for frontend-only state

---

## BroadcastChannel API

Instead of WebSockets or polling,

BroadcastChannel provides:

- Native browser support
- Zero backend cost
- Instant synchronization across tabs

---

## Custom Undo / Redo Stack

Implemented using a lightweight history stack to efficiently track previous board states while keeping memory usage low.

---

# 🧩 Challenges Faced & How They Were Solved

## 1. Mobile Drag & Drop Issues

### Challenge

Native HTML5 Drag and Drop behaves inconsistently on mobile devices.

### Solution

Implemented custom touch gesture handling with long-press support to provide a desktop-like drag-and-drop experience across smartphones and tablets.

---

## 2. Cross-Tab Synchronization

### Challenge

Updating tasks in one browser tab caused stale data in other open tabs.

### Solution

Integrated the BroadcastChannel API to broadcast every board state update. Other tabs listen for these events and instantly synchronize without requiring a page refresh.

---

## 3. Performance During Heavy Filtering

### Challenge

Searching and filtering large datasets caused unnecessary re-renders.

### Solution

Optimized selector logic and memoized computations so filtering only recalculates when relevant state changes occur.

---

# 🔮 Future Improvements

Given additional development time, the following enhancements would be implemented:

- 🔐 JWT Authentication
- 🗄️ PostgreSQL / MongoDB backend
- ⚡ Socket.io real-time collaboration
- 👥 Multi-user collaborative boards
- ✅ Sub-task checklists
- 📊 Analytics Dashboard
- 📈 Productivity & Burn-down charts
- 🔔 Notifications & reminders
- 📅 Calendar integration

---

# ⌨️ Keyboard Shortcuts

| Shortcut             | Action              |
| -------------------- | ------------------- |
| **N**                | Open New Task Modal |
| **Esc**              | Close Active Modal  |
| **Ctrl + Z / ⌘ + Z** | Undo                |
| **Ctrl + Y / ⌘ + Y** | Redo                |

---

# 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Storage:** LocalStorage
- **Synchronization:** BroadcastChannel API
- **Deployment:** Vercel

---

# 📂 Project Structure

```text
src/
├── app/
├── components/
│   ├── kanban/
│   │   ├── Board.tsx
│   │   ├── BoardHeader.tsx
│   │   ├── Card.tsx
│   │   ├── Column.tsx
│   │   ├── InputField.tsx
│   │   ├── LabelsSelect.tsx
│   │   ├── OnboardingModal.tsx
│   │   ├── PrioritySelect.tsx
│   │   ├── TaskModal.tsx
│   │   └── TaskViewModal.tsx
│   └── shared/
│       └── Navbar.tsx
│
├── hooks/
│   ├── useBoardData.ts
│   ├── useKeyboardShortcuts.ts
│   └── useUndoRedo.ts
│
├── lib/
│   └── utils.ts
│
└── types/
    └── kanban.ts
```

---

# 📄 License

This project was developed as part of a Frontend Developer technical assessment and is intended for educational and portfolio purposes.

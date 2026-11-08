# 🏋️‍♂️ FitLog — Train With Intent. Log Every Set.

A high-performance, dark-mode gym companion built with **Next.js (App Router)** and **Tailwind CSS**. FitLog allows athletes to explore comprehensive lift mechanics, lock exercises into a custom daily routine, and track workout volume and calories burned in real time.

---

## 📌 Project Overview
**FitLog** is designed for lifters who prioritize discipline and clarity. It eliminates clutter and focuses on pure utility: select lifts from a curated 12-movement library covering every major muscle group, organize your daily routine with a 5-lift cap, and seamlessly monitor estimated training time and caloric expenditure.

---

## 🛠️ Technologies Used
- **Framework:** Next.js 16.4 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 & DaisyUI (Forest Theme)
- **Icons:** Lucide React
- **Typography:** Oswald & Inter via `next/font/google`
- **State Management:** React Context API with persistent `localStorage` synchronization
- **Routing:** Next.js dynamic routing with server & client component architecture

---

## 🚀 Key Features

### 1. Curated Workout Library with Real-Time Sorting
- Displays 12 core compound and isolation movements across major muscle groups in a responsive 3x4 grid on desktop.
- **Challenge C1 — Dynamic Sort Dropdown:** Effortlessly re-sort exercises by **Duration**, **Calories**, or **Rating** (defaults to Duration).
- Built-in instant keyword filtering by exercise name, target muscle group, or equipment.

### 2. Comprehensive Workout Detail Blueprint
- Dedicated dynamic route (`/workout/[id]`) with a two-column responsive layout.
- High-resolution visual demonstration on the left paired with technical specifications on the right.
- Structured **Key Specs table** outlining Equipment, Difficulty, Sets, Reps, Duration, Calories, and Rating.
- Step-by-step numbered movement execution instructions.
- Direct quick-action CTAs: **"Add to today's plan"** (with live 5-lift cap protection) and **"Save for later"**.

### 3. Real-Time Daily Workout Log (`/my-plan`)
- **Live Metrics Dashboard:** Automatically aggregates total **Exercises** (with cap tracking), estimated training **Minutes**, and target **Calories burned** starting at zero and updating instantly as lifts are managed.
- **Dual Tab Architecture:** Smoothly toggle between **Today's Plan** and **Saved** lifts with live quantity pill counters.
- **Interactive Exercise Completion (Challenge C3):** Lifters can check off workouts with the **"Mark as Done"** button, visually striking through completed sets with accent status badges and updating progress metrics.
- One-click removal (**"X"**) and quick transfer of saved lifts into today's schedule.

### 4. Interactive Feedback & State Persistence
- Lightweight, animated non-intrusive **Toast Notifications** triggered upon adding, saving, completing, or removing lifts.
- **Full LocalStorage Persistence:** All planned lifts, saved routines, and completion states survive browser reloads and offline sessions.
- Dynamic Navbar badges reactively reflect current quantities in real time.

### 5. Robust Fallback & Loading States
- Custom dark-mode **404 Not Found Page** (`/not-found`) guiding users back to active routines.
- Tailored skeleton and spinner **Loading State** (`/loading`) for smooth transitions during data fetches.
- Context-aware **Empty States** with direct call-to-actions when no routines are queued.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.17.0 or higher recommended)
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/assignment-6.git
   cd assignment-6
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment & Links
- **Live Deployment Link:** *[Insert Live Link Here]*
- **GitHub Repository:** https://github.com/Starry-NightFall/ph-b14-m37-a6

---

## 📄 License & Attribution
Designed & developed as part of **Milestone 6 Assignment** for Web Development.  
© 2026 FitLog — Workout Library. Train hard, log honest.

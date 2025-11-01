# Student Assignment Dashboard

This project is a clean, responsive dashboard for a student-assignment management system, built as an internship assignment.

It features two distinct user roles (Admin and Student) and simulates a full data flow using `localstorage`. No backend.

Live Demo: https://student-dashboard-nine-blue.vercel.app/

## Project Setup

This project was built with Vite + React + TypeScript

1. Clone the repository

```bash
git clone https://github.com/Speedforce1230/StudentDashboard
```

2. Navigate to the project directory

```bash
cd StudentDashboard
```

3. Install dependencies

```bash
npm install
```

4. Run the dev server

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Folder Structure

The project follows a standard, component-based architecture:

```
src/
├── components/   # All reusable React components (e.g., AssignmentListItem, ConfirmationModal)
├── utility/      # Core logic, custom hooks, and data simulation
│   ├── localStorage.ts # All functions for interacting with localStorage
│   └── useAuth.ts      # Custom hook to manage auth state
├── pages/        # Main dashboard/view components (e.g., AdminDashboard, StudentDashboard)
├── App.tsx       # Main app component, handles routing
└── main.tsx      # Entry point
```

## Design Decisions

My primary goal was to create a table-based UI with instant updates and a simple, non-obstructive UI.

1. Data Management

Per the requirements, the data is simulate with `localstorage`. I created three "tables".  
allowedUsers: Stores all user objects and roles.  
assignments: Stores all assignments created by admin.  
submissions: Links users to assignments.

Authentication is done with a simple useAuth hook that manages the current user's state. It checks localstorage periodically and provides the correct user and permissions.

2. Component Structure

Role Based Views: Depending on the role of the user, the views will change.
Encapsulation: State is managed only by the component that cares about it the most.

3. Key Features

Admin Dashboard(Full CRUD): The admin has full control to Create, Read, Update and Delete assignments.
Student Double Verification Flow: To prevent accidental submissions, the student must go through a 2-step confirmation modal.

4. Core Requirements Checklist

Stack: React.js, TypeScript, Tailwind CSS

Component-based architecture

Basic React hooks: useState, useEffect, useRef, and a custom useAuth hook.

Responsive design: Student-facing pages are fully responsive, and the admin panel uses a horizontal scroll to maintain usability.

No backend: All data is simulated via localStorage.

Role-Based Functionality: Clear separation between Student and Admin views.

Double-Verification Flow

Progress Indicators

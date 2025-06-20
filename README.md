# TonicTodos - Task Management Application

A modern, responsive todo application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This application provides a clean interface for managing daily tasks with features like task creation, editing, completion tracking, and progress monitoring.

## Features

-   ✅ **Task Management**: Create, edit, delete, and duplicate Todo items.
-   📊 **Progress Tracking**: Visual progress indicators and statistics
-   🎯 **Priority Levels**: High, Medium, and Low priority classification
-   📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
-   🌙 **Dark Mode Support**: Built-in dark/light theme support
-   🔄 **Real-time Updates**: Instant UI updates with optimistic rendering
-   📈 **Task Statistics**: Completed, pending, and progress percentage tracking

## Tech Stack

-   **Framework**: Next.js 15 with App Router
-   **Frontend**: React 19, TypeScript
-   **Styling**: Tailwind CSS 4.x
-   **Icons**: Heroicons
-   **UI Components**: Headless UI
-   **Data Storage**: In-memory storage (development)

## Project Structure

```
src/
├── app/
│   ├── api/tasks/          # API routes for task operations
│   ├── lib/                # Database utilities
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main application page
├── components/
│   ├── AddTaskModal.tsx    # Modal for adding/editing tasks
│   ├── Header.tsx          # Application header
│   ├── TaskItem.tsx        # Individual task component
│   └── TaskList.tsx        # Task list container
├── types/
│   └── Task.ts             # TypeScript interfaces
└── styles/
    └── global.css          # Additional global styles
```

## Task (todo) Data Model

```typescript
interface Task {
	id: string;
	title: string;
	priority: 'High' | 'Medium' | 'Low';
	status: 'completed' | 'in progress' | 'pending';
	createdAt: Date;
}
```

## API Endpoints

-   `GET /api/tasks` - Retrieve all tasks
-   `POST /api/tasks` - Create a new task
-   `PUT /api/tasks` - Update an existing task
-   `DELETE /api/tasks` - Delete a task

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tonic-todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint

## Usage

### Creating Tasks

1. Click the "New Task" button
2. Fill in the task title and select priority
3. Click "Save" to create the task

### Managing Tasks

-   **Edit**: Click the edit icon on any task
-   **Complete**: Click the checkbox to mark as complete
-   **Delete**: Click the delete icon to remove a task
-   **Duplicate**: Click the duplicate icon to create a copy

### Viewing Progress

The dashboard displays:

-   Number of completed tasks
-   Number of pending tasks
-   Overall completion percentage

## Development Notes

### Data Persistence

Currently uses in-memory storage for development. For production, consider integrating with:

-   Database (PostgreSQL, MongoDB, etc.)
-   Local Storage for client-side persistence
-   External APIs

### Styling

-   Uses Tailwind CSS for styling
-   Responsive design with mobile-first approach

### Type Safety

-   Full TypeScript implementation
-   Strict type checking enabled
-   Interface definitions for all data models

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Other Platforms

This application can be deployed on any platform that supports Next.js:

-   Netlify
-   AWS Amplify
-   Railway
-   Render

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about the technologies used:

-   [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
-   [React Documentation](https://react.dev/) - Learn React
-   [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
-   [TypeScript](https://www.typescriptlang.org/docs/) - TypeScript documentation

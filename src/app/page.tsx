'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/Task';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';

export default function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

	useEffect(() => {
		fetchTasks();
	}, []);

	async function fetchTasks() {
		const res = await fetch('/api/tasks');
		const data = await res.json();
		setTasks(data);
	}

	async function addTask(task: Task) {
		await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) });
		setTasks(prev => [...prev, task]);
	}

	async function updateTask(task: Task) {
		await fetch('/api/tasks', { method: 'PUT', body: JSON.stringify(task) });
		setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));
	}

	async function deleteTask(id: string) {
		await fetch('/api/tasks', { method: 'DELETE', body: JSON.stringify({ id }) });
		setTasks(prev => prev.filter(t => t.id !== id));
	}

	async function toggleComplete(id: string, complete: boolean) {
		const updated = { status: complete ? 'completed' : 'pending' } as Partial<Task>;
		await fetch('/api/tasks', { method: 'PUT', body: JSON.stringify({ id, ...updated }) });
		setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
	}

	const handleSave = (task: Task) => {
		if (taskToEdit) {
			updateTask(task);
		} else {
			addTask(task);
		}
	};

	return (
		<main className='max-w-xl mx-auto p-4'>
			<Header
				onAdd={() => {
					setTaskToEdit(null);
					setShowModal(true);
				}}
			/>
			<TaskList
				tasks={tasks}
				onEdit={task => {
					setTaskToEdit(task);
					setShowModal(true);
				}}
				onDelete={deleteTask}
				onToggleComplete={toggleComplete}
			/>
			<AddTaskModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onSave={handleSave}
				task={taskToEdit || undefined}
			/>
		</main>
	);
}

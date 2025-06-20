'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/Task';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import AddTaskModal from '@/components/AddTaskModal';

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

	async function clearAllTasks() {
		for (const task of tasks) {
			await deleteTask(task.id);
		}
	}

	const handleSave = (task: Task) => {
		if (taskToEdit) {
			updateTask(task);
		} else {
			addTask(task);
		}
	};

	const completedTasks = tasks.filter(task => task.status === 'completed');
	const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'in progress');
	const progressPercentage = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<div className='max-w-4xl mx-auto p-6'>
				<Header />

				{/* Stats Cards */}
				<div className='grid grid-cols-3 gap-6 mb-8'>
					<div className='bg-white dark:bg-gray-800 rounded-lg p-6 text-center'>
						<h3 className='text-gray-500 dark:text-gray-400 text-sm font-medium mb-2'>Completed</h3>
						<div className='text-3xl font-bold text-gray-900 dark:text-white'>{completedTasks.length}</div>
						<div className='text-gray-400 text-sm'>Tasks</div>
					</div>
					<div className='bg-white dark:bg-gray-800 rounded-lg p-6 text-center'>
						<h3 className='text-gray-500 dark:text-gray-400 text-sm font-medium mb-2'>Pending</h3>
						<div className='text-3xl font-bold text-gray-900 dark:text-white'>{pendingTasks.length}</div>
						<div className='text-gray-400 text-sm'>Tasks</div>
					</div>
					<div className='bg-white dark:bg-gray-800 rounded-lg p-6 text-center'>
						<h3 className='text-gray-500 dark:text-gray-400 text-sm font-medium mb-2'>Progress</h3>
						<div className='text-3xl font-bold text-gray-900 dark:text-white'>{progressPercentage}</div>
						<div className='text-gray-400 text-sm'>%</div>
					</div>
				</div>

				{/* Today's Tasks Section */}
				<div className='bg-white dark:bg-gray-800 rounded-lg p-6'>
					<div className='flex items-center justify-between mb-6'>
						<div>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Today&apos;s Task</h2>
							<p className='text-gray-500 dark:text-gray-400 text-sm'>
								{new Date().toLocaleDateString('en-US', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							</p>
						</div>
						<button
							onClick={() => {
								setTaskToEdit(null);
								setShowModal(true);
							}}
							className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium'
						>
							<span className='text-lg'>+</span>
							New Task
						</button>
					</div>

					<TaskList
						tasks={tasks}
						onEdit={task => {
							setTaskToEdit(task);
							setShowModal(true);
						}}
						onDelete={deleteTask}
						onToggleComplete={toggleComplete}
					/>

					{tasks.length > 0 && (
						<div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'>
							<span className='text-gray-500 dark:text-gray-400 text-sm'>{tasks.length} Tasks</span>
							<button
								onClick={clearAllTasks}
								className='text-green-600 hover:text-green-700 text-sm font-medium'
							>
								Clear All
							</button>
						</div>
					)}
				</div>

				<AddTaskModal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					onSave={handleSave}
					task={taskToEdit || undefined}
				/>
			</div>
		</div>
	);
}

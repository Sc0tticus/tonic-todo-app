'use client';

import { Task } from '@/types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onToggleComplete: (id: string, completed: boolean) => void;
	onDelete: (id: string) => void;
	onDuplicate: (task: Task) => void;
}

export default function TaskList({ tasks, onEdit, onToggleComplete, onDelete, onDuplicate }: TaskListProps) {
	if (!tasks.length) {
		return (
			<div className='text-center py-12'>
				<div className='text-gray-400 dark:text-gray-500 text-lg mb-2'>No tasks yet</div>
				<p className='text-gray-500 dark:text-gray-400 text-sm'>
					Click &quot;New Task&quot; to add your first task
				</p>
			</div>
		);
	}

	// Sort tasks by priority: High -> Medium -> Low
	const sortedTasks = [...tasks].sort((a, b) => {
		const priorityOrder = { High: 0, Medium: 1, Low: 2 };
		return priorityOrder[a.priority] - priorityOrder[b.priority];
	});

	return (
		<div className='space-y-0'>
			{sortedTasks.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					onEdit={onEdit}
					onToggleComplete={onToggleComplete}
					onDelete={onDelete}
					onDuplicate={onDuplicate}
				/>
			))}
		</div>
	);
}

'use client';

import { Task } from '@/types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onToggleComplete: (id: string, completed: boolean) => void;
}

export default function TaskList({ tasks, onEdit, onToggleComplete }: TaskListProps) {
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

	return (
		<div className='space-y-0'>
			{tasks.map(task => (
				<TaskItem key={task.id} task={task} onEdit={onEdit} onToggleComplete={onToggleComplete} />
			))}
		</div>
	);
}

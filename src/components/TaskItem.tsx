'use client';

import { Task } from '@/types/Task';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface TaskItemProps {
	task: Task;
	onEdit: (task: Task) => void;
	onDelete: (id: string) => void;
	onToggleComplete: (id: string, completed: boolean) => void;
}

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) {
	const handleToggle = () => {
		onToggleComplete(task.id, task.status !== 'completed');
	};

	const getPriorityColor = (priority: string) => {
		switch (priority.toLowerCase()) {
			case 'high':
				return 'text-red-600 bg-red-50 border-red-200';
			case 'medium':
				return 'text-yellow-600 bg-yellow-50 border-yellow-200';
			case 'low':
				return 'text-green-600 bg-green-50 border-green-200';
			default:
				return 'text-gray-600 bg-gray-50 border-gray-200';
		}
	};

	return (
		<div className='flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0'>
			<div className='flex items-center gap-4'>
				<input
					type='checkbox'
					checked={task.status === 'completed'}
					onChange={handleToggle}
					className='w-5 h-5 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 dark:bg-gray-700'
				/>
				<div className='flex-1'>
					<h3
						className={`font-medium ${
							task.status === 'completed'
								? 'line-through text-gray-500 dark:text-gray-400'
								: 'text-gray-900 dark:text-white'
						}`}
					>
						{task.title}
					</h3>
					<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
						{task.status === 'in progress' ? 'In progress' : task.status}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<select
					value={task.priority}
					onChange={e => {
						const updatedTask = { ...task, priority: e.target.value as Task['priority'] };
						onEdit(updatedTask);
					}}
					className={`px-3 py-1 text-xs font-medium border rounded-full dark:bg-gray-700 dark:border-gray-600 ${getPriorityColor(
						task.priority
					)}`}
				>
					<option value='High'>High</option>
					<option value='Medium'>Medium</option>
					<option value='Low'>Low</option>
				</select>

				<div className='relative'>
					<button
						onClick={() => onDelete(task.id)}
						className='p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
					>
						<EllipsisHorizontalIcon className='h-5 w-5' />
					</button>
				</div>
			</div>
		</div>
	);
}

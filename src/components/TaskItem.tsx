'use client';

import { Task } from '@/types/Task';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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

	return (
		<div className='flex items-center justify-between border rounded p-2'>
			<div className='flex items-center gap-2'>
				<input type='checkbox' checked={task.status === 'completed'} onChange={handleToggle} />
				<div>
					<p className='font-medium'>{task.title}</p>
					<p className='text-sm text-gray-500'>
						{task.priority} • {new Date(task.createdAt).toLocaleDateString()}
					</p>
				</div>
			</div>
			<div className='flex gap-2'>
				<button onClick={() => onEdit(task)} className='text-gray-500 hover:text-gray-700'>
					<PencilIcon className='h-5 w-5' />
				</button>
				<button onClick={() => onDelete(task.id)} className='text-red-500 hover:text-red-700'>
					<TrashIcon className='h-5 w-5' />
				</button>
			</div>
		</div>
	);
}

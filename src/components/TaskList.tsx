'use client';

import { Task } from '@/types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onDelete: (id: string) => void;
	onToggleComplete: (id: string, completed: boolean) => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
	if (!tasks.length) {
		return <p className='text-center text-gray-500'>No tasks yet</p>;
	}

	return (
		<div className='flex flex-col gap-2'>
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					onEdit={onEdit}
					onDelete={onDelete}
					onToggleComplete={onToggleComplete}
				/>
			))}
		</div>
	);
}

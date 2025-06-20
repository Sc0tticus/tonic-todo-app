'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Task } from '@/types/Task';

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (task: Task) => void;
	task?: Task;
}

export default function AddTaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
	const isEdit = !!task;
	const [title, setTitle] = useState('');
	const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
	const [status, setStatus] = useState<'pending' | 'in progress' | 'completed'>('pending');

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setPriority(task.priority);
			setStatus(task.status);
		} else {
			setTitle('');
			setPriority('Medium');
			setStatus('pending');
		}
	}, [task]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const newTask: Task = task
			? { ...task, title, priority, status }
			: {
					id: crypto.randomUUID(),
					title,
					priority,
					status,
					createdAt: new Date()
			  };

		onSave(newTask);
		onClose();
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
									{isEdit ? 'Edit Task' : 'Add Task'}
								</Dialog.Title>
								<form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
									<input
										className='border rounded px-2 py-1'
										placeholder='Title'
										value={title}
										onChange={e => setTitle(e.target.value)}
										required
									/>
									<select
										className='border rounded px-2 py-1'
										value={priority}
										onChange={e => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
									>
										<option value='High'>High</option>
										<option value='Medium'>Medium</option>
										<option value='Low'>Low</option>
									</select>
									<select
										className='border rounded px-2 py-1'
										value={status}
										onChange={e =>
											setStatus(e.target.value as 'pending' | 'in progress' | 'completed')
										}
									>
										<option value='pending'>Pending</option>
										<option value='in progress'>In Progress</option>
										<option value='completed'>Completed</option>
									</select>
									<div className='mt-4 flex justify-end gap-2'>
										<button
											type='button'
											className='px-4 py-2 rounded bg-gray-200'
											onClick={onClose}
										>
											Cancel
										</button>
										<button type='submit' className='px-4 py-2 rounded bg-blue-600 text-white'>
											{isEdit ? 'Save' : 'Add'}
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

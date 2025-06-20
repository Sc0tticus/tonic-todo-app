'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Task } from '@/types/Task';

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (task: Task) => void;
	task?: Task;
}

export default function AddTaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
	const [title, setTitle] = useState('');
	const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');
	const [status, setStatus] = useState<'pending' | 'in progress' | 'completed'>('in progress');

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setPriority(task.priority);
			setStatus(task.status);
		} else {
			setTitle('');
			setPriority('Low');
			setStatus('in progress');
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
			<Dialog as='div' className='relative z-50' onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-50' />
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
							<Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all'>
								<div className='flex items-center justify-between mb-4'>
									<Dialog.Title
										as='h3'
										className='text-xl font-semibold text-gray-900 dark:text-white'
									>
										Add Task
									</Dialog.Title>
									<button
										onClick={onClose}
										className='p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
									>
										<XMarkIcon className='h-6 w-6' />
									</button>
								</div>

								<p className='text-gray-500 dark:text-gray-400 text-sm mb-6'>
									Add a new task here. Click save when you&apos;re done.
								</p>

								<form className='space-y-6' onSubmit={handleSubmit}>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											Task Name
										</label>
										<input
											type='text'
											className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
											placeholder='Enter a name of the task'
											value={title}
											onChange={e => setTitle(e.target.value)}
											required
										/>
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
												Priority
											</label>
											<div className='relative'>
												<select
													className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none'
													value={priority}
													onChange={e =>
														setPriority(e.target.value as 'High' | 'Medium' | 'Low')
													}
												>
													<option value='High'>High</option>
													<option value='Medium'>Medium</option>
													<option value='Low'>Low</option>
												</select>
												<div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
													<div
														className={`w-2 h-2 rounded-full ${
															priority === 'High'
																? 'bg-red-500'
																: priority === 'Medium'
																? 'bg-yellow-500'
																: 'bg-green-500'
														}`}
													></div>
												</div>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
												Select Status
											</label>
											<select
												className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none'
												value={status}
												onChange={e =>
													setStatus(e.target.value as 'pending' | 'in progress' | 'completed')
												}
											>
												<option value='pending'>Pending</option>
												<option value='in progress'>In Progress</option>
												<option value='completed'>Completed</option>
											</select>
										</div>
									</div>

									<div className='flex justify-end pt-4'>
										<button
											type='submit'
											className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium'
										>
											Save task
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

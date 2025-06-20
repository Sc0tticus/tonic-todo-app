'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Header() {
	const [showUserMenu, setShowUserMenu] = useState(false);
	const { darkMode, toggleDarkMode } = useDarkMode();

	return (
		<header className='flex items-center justify-between mb-8'>
			<div className='flex items-center gap-3'>
				<div className='bg-green-600 rounded-lg p-2 flex items-center justify-center'>
					<svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
				<div>
					<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Quick<span className='text-gray-600 dark:text-gray-400'>Task</span>
					</h1>
				</div>
			</div>

			<div className='flex items-center gap-4'>
				<button className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
					<MagnifyingGlassIcon className='h-6 w-6' />
				</button>
				<div className='relative'>
					<button
						onClick={() => setShowUserMenu(!showUserMenu)}
						className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
					>
						<UserIcon className='h-6 w-6' />
					</button>

					{showUserMenu && (
						<div className='absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50'>
							<div className='px-4 py-2 border-b border-gray-200 dark:border-gray-700'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>ali@gmail.com</p>
							</div>
							<div className='px-4 py-3 flex items-center justify-between'>
								<span className='text-sm text-gray-700 dark:text-gray-300'>Dark Mode</span>
								<button
									onClick={toggleDarkMode}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
										darkMode ? 'bg-green-600' : 'bg-gray-200'
									}`}
								>
									<span
										className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
											darkMode ? 'translate-x-6' : 'translate-x-1'
										}`}
									/>
								</button>
							</div>
							<button className='w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700'>
								🔓 logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
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
						Tonic<span className='text-gray-600 dark:text-gray-400'>Todos</span>
					</h1>
				</div>
			</div>

			<div className='flex items-center'>
				<button className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
					<MagnifyingGlassIcon className='h-6 w-6' />
				</button>
			</div>
		</header>
	);
}

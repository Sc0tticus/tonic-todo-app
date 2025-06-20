'use client';

import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

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
					<h1 className='text-2xl font-bold text-gray-900'>
						Tonic<span className='text-gray-600'>Todo List</span>
					</h1>
				</div>
			</div>

			<div className='flex items-center gap-4'>
				<button className='p-2 text-gray-500 hover:text-gray-700'>
					<MagnifyingGlassIcon className='h-6 w-6' />
				</button>
				<button className='p-2 text-gray-500 hover:text-gray-700'>
					<UserIcon className='h-6 w-6' />
				</button>
			</div>
		</header>
	);
}

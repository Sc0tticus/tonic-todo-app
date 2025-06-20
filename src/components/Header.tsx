'use client';

interface HeaderProps {
	onAdd: () => void;
}

export default function Header({ onAdd }: HeaderProps) {
	return (
		<header className='flex items-center justify-between mb-4'>
			<h1 className='text-2xl font-bold'>Todo List</h1>
			<button onClick={onAdd} className='px-4 py-2 rounded bg-blue-600 text-white'>
				Add Task
			</button>
		</header>
	);
}

import { NextRequest, NextResponse } from 'next/server';
import { getTasks, addTask, updateTask, deleteTask } from '@/app/lib/db';
import { Task } from '@/types/Task';

export async function GET() {
	return NextResponse.json(getTasks());
}

export async function POST(req: NextRequest) {
	const newTask: Task = await req.json();
	addTask(newTask);
	return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: NextRequest) {
	const { id, ...updateData } = await req.json();
	updateTask(id, updateData);
	return NextResponse.json({ message: 'Updated' });
}

export async function DELETE(req: NextRequest) {
	const { id } = await req.json();
	deleteTask(id);
	return NextResponse.json({ message: 'Deleted' });
}

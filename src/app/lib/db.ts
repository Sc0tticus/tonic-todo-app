import { Task } from '../../types/Task';

let tasks: Task[] = [];

export const getTasks = () => tasks;

export const addTask = (task: Task) => tasks.push(task);

export const updateTask = (id: string, updatedTask: Partial<Task>) => {
	tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
};

export const deleteTask = (id: string) => {
	tasks = tasks.filter(task => task.id !== id);
};

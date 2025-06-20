export interface Task {
	id: string;
	title: string;
	priority: 'High' | 'Medium' | 'Low';
	status: 'completed' | 'in progress' | 'pending';
	createdAt: Date;
}

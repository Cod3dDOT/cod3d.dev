import PocketBase, { RecordService } from 'pocketbase';

export interface Project {
	id: string;
	created: string;
	updated: string;
	published: boolean;
	name: string;
	description: string;
	color: string;
	repo: URL;
	status: 'stale' | 'dev' | 'idea' | 'archived';
}

export interface Thought {
	id: string;
	created: string;
	updated: string;
	slug: string;
	name: string;
	body: string;
	preview: string;
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'projects'): RecordService<Project>;
	collection(idOrName: 'thoughts'): RecordService<Thought>;
}

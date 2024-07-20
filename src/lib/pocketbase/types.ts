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

	markdown: string;
	images: string[];

	og_title: string;
	og_description: string;
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'projects'): RecordService<Project>;
	collection(idOrName: 'thoughts'): RecordService<Thought>;
}

export interface ClientResponseError {
	url: string; // requested url
	status: number; // response status code
	response: unknown; // the API JSON error response
	isAbort: boolean; // is abort/cancellation error
	originalError: Error | null; // the original non-normalized error
}

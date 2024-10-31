import PocketBase, { RecordService } from 'pocketbase';

export interface PBProject {
	id: string;
	created: string;
	updated: string;

	name: string;
	description: string;

	status: 'stale' | 'dev' | 'idea' | 'archived';

	repo: string;
	tags: PBTag['id'][];

	expand?: {
		tags: PBTag[];
	};
}

export interface PBThought {
	id: string;
	created: string;
	updated: string;

	published: boolean;
	slug: string;

	title: string;
	description: string;

	hero: string[];

	markdown: string;
	markdown_images: string[];

	tags: PBTag['id'][];

	expand?: {
		tags: PBTag[];
	};
}

export interface PBTag {
	id: string;
	created: string;
	updated: string;
	tag: string;
}

export interface Project
	extends Omit<PBProject, 'tags' | 'created' | 'updated' | 'expand'> {
	created: Date;
	updated: Date;
	tags: string[];
}

export interface Thought
	extends Omit<PBThought, 'tags' | 'created' | 'updated' | 'expand' | 'hero'> {
	created: Date;
	updated: Date;
	tags: string[];
	hero: {
		light: string;
		dark: string | undefined;
	};
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'projects'): RecordService<PBProject>;
	collection(idOrName: 'thoughts'): RecordService<PBThought>;
	collection(idOrName: 'tags'): RecordService<PBTag>;
}

export interface ClientResponseError {
	url: string; // requested url
	status: number; // response status code
	response: unknown; // the API JSON error response
	isAbort: boolean; // is abort/cancellation error
	originalError: Error | null; // the original non-normalized error
}

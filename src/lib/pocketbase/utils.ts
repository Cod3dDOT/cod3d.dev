import { FileOptions } from 'pocketbase';

import { pb } from './config';
import { Project, Thought } from './types';

export function getFileUrl(
	record:
		| {
				[key: string]: string;
		  }
		| Project
		| Thought,
	filename: string,
	queryParams?: FileOptions | undefined
) {
	return pb?.files.getUrl(record, filename, queryParams);
}

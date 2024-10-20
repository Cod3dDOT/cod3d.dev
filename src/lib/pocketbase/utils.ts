import { ClientResponseError } from 'pocketbase';

import { PBProject, PBTag, PBThought, TypedPocketBase } from './types';

export const isError = (
	response: unknown | ClientResponseError
): response is ClientResponseError =>
	typeof (response as ClientResponseError).isAbort === 'boolean';

export const getUrl = (
	client: TypedPocketBase,
	record: PBThought | PBProject | PBTag,
	filename: string
): URL => new URL(client.files.getUrl(record, filename));

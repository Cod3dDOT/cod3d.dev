import { ClientResponseError } from 'pocketbase';

export const isError = (
	response: unknown | ClientResponseError
): response is ClientResponseError =>
	typeof (response as ClientResponseError).isAbort === 'boolean';

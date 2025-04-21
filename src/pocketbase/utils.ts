import type { ClientResponseError } from "pocketbase";

import type { PBProject, PBTag, PBThought, TypedPocketBase } from "./types";

export const isError = (
	response: object | ClientResponseError
): response is ClientResponseError =>
	typeof (response as ClientResponseError).isAbort === "boolean";

export const getAssetUrl = (
	client: TypedPocketBase,
	record: PBThought | PBProject | PBTag,
	filename: string
): URL => new URL(client.files.getURL(record, filename));

import PocketBase, { FileOptions } from "pocketbase";

import { pb_url } from "./consts";
import { Project, TypedPocketBase } from "./types";

export const pb = new PocketBase(pb_url) as TypedPocketBase;
pb.autoCancellation(false);

export function getFileUrl(
    record:
        | {
              [key: string]: string;
          }
        | Project,
    filename: string,
    queryParams?: FileOptions | undefined
) {
    return pb.files.getUrl(record, filename, queryParams);
}

/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticSitemap: MetadataRoute.Sitemap = [
		{
			url: process.env.SITE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1
		}
	];

	const thoughtsResponse = await getThoughts();

	if (isError(thoughtsResponse)) {
		console.error("Could not get thoughts while compiling sitemap.xml");
		return staticSitemap;
	}

	const thoughts = thoughtsResponse as Thought[];

	const withThoughts: MetadataRoute.Sitemap = thoughts.map((thought) => ({
		url: `${process.env.SITE_URL}/thoughts/${thought.slug}`,
		lastModified: thought.updated
	}));

	return staticSitemap.concat(withThoughts);
}

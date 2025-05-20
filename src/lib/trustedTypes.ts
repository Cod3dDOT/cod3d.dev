/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import DOMPurify from "isomorphic-dompurify";

if (typeof window !== "undefined") {
	window?.trustedTypes?.createPolicy("default", {
		createHTML: (input: string) => {
			return DOMPurify.sanitize(input, {
				USE_PROFILES: { html: true },
				PARSER_MEDIA_TYPE: "text/html",
				RETURN_TRUSTED_TYPE: false,
				FORCE_BODY: true,
				IN_PLACE: true,
				ADD_TAGS: ["script"]
			});
		},
		createScriptURL: (input: string) => {
			const allowed = ["/um.js"];
			if (!allowed.includes(input)) return "";

			return DOMPurify.sanitize(input, {
				USE_PROFILES: { html: true },
				PARSER_MEDIA_TYPE: "text/html",
				RETURN_TRUSTED_TYPE: false,
				FORCE_BODY: true
			});
		}
	});
}

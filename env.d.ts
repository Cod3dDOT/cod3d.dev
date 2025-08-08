/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POCKETBASE_HOST: string;
			POCKETBASE_USER: string;
			POCKETBASE_PASS: string;
			SITE_URL: string;
			SITE_NAME: string;
		}
	}
}

export {};

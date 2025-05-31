/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleConfigSeverity } from "@commitlint/types";

/*
 * https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional
 */
export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"body-max-line-length": [RuleConfigSeverity.Error, "always", 200] as const
	}
};

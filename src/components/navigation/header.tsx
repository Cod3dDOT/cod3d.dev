/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const SectionHeader: React.FC<{ section: string }> = ({ section }) => {
	return (
		<h2 className="hover:-skew-x-6 relative mb-8 cursor-default overflow-hidden text-[2.83rem] leading-none transition-all sm:text-[4rem] md:text-[5.65rem] hover:[text-shadow:4px_4px_0px_var(--accent-blue)] dark:hover:[text-shadow:4px_4px_0px_var(--accent-yellow)]">
			{section}
		</h2>
	);
};

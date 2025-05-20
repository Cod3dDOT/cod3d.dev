/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import NavContactsShowcase from "./contacts";
import { NavigationContainer } from "./container";
import NavProjectsShowcase from "./projects";
import NavThoughtsShowcase from "./thoughts";

export const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<NavThoughtsShowcase />
			<NavProjectsShowcase />
			<NavContactsShowcase />
		</NavigationContainer>
	);
};

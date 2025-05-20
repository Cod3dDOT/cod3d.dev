/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import {
	createContext,
	memo,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react";

interface NavigationContextType {
	isOpen: boolean;
	openNav: () => void;
	closeNav: () => void;
	toggleNav: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
	undefined
);

const NavigationProvider = memo(function NavigationProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const openNav = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeNav = useCallback(() => {
		setIsOpen(false);
	}, []);

	const toggleNav = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const contextValue = useMemo(
		() => ({
			isOpen,
			openNav,
			closeNav,
			toggleNav
		}),
		[isOpen, openNav, closeNav, toggleNav]
	);

	return (
		<NavigationContext.Provider value={contextValue}>
			{children}
		</NavigationContext.Provider>
	);
});

export { NavigationProvider };

export function useNavigation() {
	const context = useContext(NavigationContext);

	if (context === undefined) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}

	return context;
}

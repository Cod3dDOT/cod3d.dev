/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import type { RefObject } from "react";
import { useIntersection } from "react-use";

export function useIsVisible(ref: RefObject<HTMLElement>) {
	const intersection = useIntersection(ref, {
		root: null,
		rootMargin: "0px",
		threshold: 1
	});

	return intersection?.isIntersecting;
}

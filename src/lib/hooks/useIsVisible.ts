"use client";

import { RefObject } from "react";
import { useIntersection } from "react-use";

export default function useIsVisible(ref: RefObject<HTMLElement>) {
	const intersection = useIntersection(ref, {
		root: null,
		rootMargin: "0px",
		threshold: 1,
	});

	return intersection?.isIntersecting;
}

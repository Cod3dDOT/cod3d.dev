import { RefObject, useEffect, useMemo, useState } from 'react';

export default function useIsVisible(ref: RefObject<HTMLElement>) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useMemo(() => {
		if (!ref.current) return;

		return new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting)
		);
	}, [ref.current]);

	useEffect(() => {
		if (!ref.current) return;

		observer?.observe(ref.current);
		return () => observer?.disconnect();
	}, [ref.current]);

	return isIntersecting;
}

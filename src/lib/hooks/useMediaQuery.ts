import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
    const [isMatch, setIsMatch] = useState<boolean>();

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        function onChange() {
            setIsMatch(mediaQuery.matches);
        }

        mediaQuery.addEventListener("change", onChange, false);
        onChange();

        return () => mediaQuery.removeEventListener("change", onChange, false);
    }, [query]);

    return isMatch;
}

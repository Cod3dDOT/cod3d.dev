import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface NavigatorWithBattery extends Navigator {
    getBattery?: () => Promise<{ charging: boolean; level: number }>;
}

export function useDeviceDetection() {
    const breakpoint = 1024;
    const isMobile = useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
    const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`);
    const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const isWebGL = isDesktop && !isReducedMotion;

    // Check for low power mode with fallback for unsupported browsers
    const isLowPowerMode =
        useMediaQuery("(any-pointer: coarse) and (hover: none)") &&
        typeof (navigator as NavigatorWithBattery).getBattery === "function"
            ? (navigator as NavigatorWithBattery)
                  .getBattery?.()
                  .then(
                      (battery: { charging: boolean; level: number }) =>
                          battery.charging === false && battery.level <= 0.2
                  )
                  .catch(() => false)
            : false;

    return { isMobile, isDesktop, isReducedMotion, isWebGL, isLowPowerMode };
}

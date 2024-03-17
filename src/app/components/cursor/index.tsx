"use client";

import { useCallback, useEffect, useState } from "react";
import {
    m,
    useMotionValue,
    useSpring,
    LazyMotion,
    domAnimation,
} from "framer-motion";
import { clsx } from "clsx";
import useIsTouchdevice from "./util/useIsTouchDevice";

type CursorProps = {
    showSystemCursor: boolean;
};

let timeout: NodeJS.Timeout;

function map_range(
    value: number,
    low1: number,
    high1: number,
    low2: number,
    high2: number
) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export const Cursor: React.FC<CursorProps> = ({ showSystemCursor = false }) => {
    const [state, setState] = useState({
        isMoving: false,
        isHovered: false,
        dims: null as DOMRect | null,
    });

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const size = {
        w: useMotionValue(15),
        h: useMotionValue(15),
    };

    const smoothOptions = { damping: 200, stiffness: 5000, mass: 1 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };
    const smoothSize = {
        w: useSpring(size.w, smoothOptions),
        h: useSpring(size.h, smoothOptions),
    };

    const manageMouseMove = useCallback(
        (e: { clientX: number; clientY: number }) => {
            const { clientX, clientY } = e;
            const { isHovered, dims } = state;

            if (isHovered && dims) {
                const { left, top, height, width } = dims;
                const center = { x: left + width / 2, y: top + height / 2 };
                const distance = {
                    x: clientX - center.x,
                    y: clientY - center.y,
                };

                mouse.x.set(
                    center.x -
                        smoothSize.w.get() / 2 +
                        map_range(distance.x, 0, width, 0, width / 3)
                );
                mouse.y.set(
                    center.y -
                        smoothSize.h.get() / 2 +
                        map_range(distance.y, 0, height, 0, height / 3)
                );
            } else {
                mouse.x.set(clientX - smoothSize.w.get() / 2);
                mouse.y.set(clientY - smoothSize.h.get() / 2);
            }

            clearTimeout(timeout);
            if (!state.isMoving) setState({ ...state, isMoving: true });
            timeout = setTimeout(() => {
                if (state.isMoving) setState({ ...state, isMoving: false });
            }, 5000);
        },
        [mouse.x, mouse.y, smoothSize.h, smoothSize.w, state]
    );

    useEffect(() => {
        if (typeof window === "object" && !showSystemCursor) {
            document.body.style.cursor = "none";
        }
    }, [showSystemCursor]);

    useEffect(() => {
        const onMouseEnter = (
            el: HTMLElement,
            mode: "height" | "width" | "both"
        ) => {
            const dims = el.getBoundingClientRect();
            const w =
                mode == "width" || mode == "both" ? dims.width : dims.height;
            const h =
                mode == "height" || mode == "both" ? dims.height : dims.width;
            setState((prevState) => ({
                ...prevState,
                isHovered: true,
                dims: dims,
            }));
            size.w.set(w * 1.4);
            size.h.set(h * 1.4);
        };

        const onMouseLeave = () => {
            setState((prevState) => ({
                ...prevState,
                isHovered: false,
                dims: null,
            }));
            size.w.set(15);
            size.h.set(15);
        };

        window.addEventListener("mousemove", manageMouseMove);

        const clickableHeight = Array.from(
            document.querySelectorAll<HTMLElement>(".cursor-height")
        ).map((node) => {
            return { node: node, mode: "height" };
        });
        const clickableWidth = Array.from(
            document.querySelectorAll<HTMLElement>(".cursor-width")
        ).map((node) => {
            return { node: node, mode: "width" };
        });
        const clickable = Array.from(
            document.querySelectorAll<HTMLElement>(".cursor")
        ).map((node) => {
            return { node: node, mode: "both" };
        });

        const clickableEls = clickableHeight
            .concat(clickableWidth)
            .concat(clickable);

        clickableEls.forEach(({ node: el, mode }) => {
            if (!showSystemCursor) el.style.cursor = "none";

            el.addEventListener("mouseenter", () => {
                onMouseEnter(el, mode as "height" | "width" | "both");
            });

            el.addEventListener("mouseleave", () => {
                onMouseLeave();
            });
        });

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);

            clickableEls.forEach(({ node: el, mode }) => {
                el.removeEventListener("mouseenter", () => {
                    onMouseEnter(el, mode as "height" | "width" | "both");
                });

                el.removeEventListener("mouseleave", () => {
                    onMouseLeave();
                });
            });
        };
    }, [showSystemCursor, manageMouseMove, size.w, size.h]);

    const isTouchdevice = useIsTouchdevice();
    if (typeof window !== "undefined" && isTouchdevice) {
        return <></>;
    }

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                style={{
                    left: smoothMouse.x,
                    top: smoothMouse.y,
                    width: smoothSize.w,
                    height: smoothSize.h,
                }}
                animate={{
                    // width: state.cursorW,
                    // height: state.cursorH,
                    opacity: state.isMoving ? 1 : 0,
                }}
                className={clsx(
                    "opacity-0 z-50 fixed w-5 h-5 rounded-full bg-[var(--foreground)] border-[var(--foreground)] border-2 transition-colors duration-500 pointer-events-none",
                    state.isHovered && "bg-transparent"
                )}
            />
        </LazyMotion>
    );
};

export default Cursor;

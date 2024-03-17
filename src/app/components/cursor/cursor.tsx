"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";
import useIsTouchdevice from "./util/useIsTouchDevice";

type CursorProps = {
    showSystemCursor: boolean;
};

let timeout: NodeJS.Timeout;

export const Cursor: React.FC<CursorProps> = ({ showSystemCursor = false }) => {
    const [state, setState] = useState({
        isMoving: false,
        isHovered: false,
        dims: null as DOMRect | null,
        cursorW: 15,
        cursorH: 15,
    });

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 200, stiffness: 5000, mass: 1 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    const manageMouseMove = useCallback(
        (e: { clientX: number; clientY: number }) => {
            const { clientX, clientY } = e;
            const { isHovered, dims, cursorW, cursorH } = state;

            if (isHovered && dims) {
                const { left, top, height, width } = dims;
                const center = { x: left + width / 2, y: top + height / 2 };
                const distance = {
                    x: clientX - center.x,
                    y: clientY - center.y,
                };

                mouse.x.set(center.x - cursorW / 2 + distance.x * 0.2);
                mouse.y.set(center.y - cursorH / 2 + distance.y * 0.2);
            } else {
                mouse.x.set(clientX - cursorW / 2);
                mouse.y.set(clientY - cursorH / 2);
            }

            clearTimeout(timeout);
            if (!state.isMoving) setState({ ...state, isMoving: true });
            timeout = setTimeout(() => {
                if (state.isMoving) setState({ ...state, isMoving: false });
            }, 5000);
        },
        [mouse.x, mouse.y, state]
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
                cursorW: w * 1.5,
                cursorH: h * 1.5,
            }));
        };

        const onMouseLeave = () => {
            setState((prevState) => ({
                ...prevState,
                isHovered: false,
                dims: null,
                cursorW: 15,
                cursorH: 15,
            }));
        };

        window.addEventListener("mousemove", manageMouseMove);

        // const clickableEls = document.querySelectorAll<HTMLElement>(
        //     clickables.join(",")
        // );

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
    }, [showSystemCursor, manageMouseMove]);

    const isTouchdevice = useIsTouchdevice();
    if (typeof window !== "undefined" && isTouchdevice) {
        return <></>;
    }

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
            animate={{
                width: state.cursorW,
                height: state.cursorH,
                opacity: state.isMoving ? 1 : 0,
            }}
            className={clsx(
                "opacity-0 z-50 fixed w-5 h-5 rounded-full bg-[var(--foreground)] border-[var(--foreground)] border-2 transition-colors duration-500 pointer-events-none",
                state.isHovered && "bg-transparent"
            )}
        />
    );
};

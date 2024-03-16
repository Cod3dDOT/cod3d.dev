"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";

type CursorProps = {
    clickables: string[];
    showSystemCursor: boolean;
};

let timeout: NodeJS.Timeout;

export const Cursor: React.FC<CursorProps> = ({
    clickables,
    showSystemCursor = false,
}) => {
    const [state, setState] = useState({
        isMoving: false,
        isHovered: false,
        dims: null as DOMRect | null,
        cursorSize: 15,
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
            const { isHovered, dims, cursorSize } = state;

            if (isHovered && dims) {
                const { left, top, height, width } = dims;
                const center = { x: left + width / 2, y: top + height / 2 };
                const distance = {
                    x: clientX - center.x,
                    y: clientY - center.y,
                };

                mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.2);
                mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.2);
            } else {
                mouse.x.set(clientX - cursorSize / 2);
                mouse.y.set(clientY - cursorSize / 2);
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
        const onMouseEnter = (el: HTMLElement) => {
            setState((prevState) => ({
                ...prevState,
                isHovered: true,
                dims: el.getBoundingClientRect(),
                cursorSize: el.getBoundingClientRect().width * 2,
            }));
        };

        const onMouseLeave = () => {
            setState((prevState) => ({
                ...prevState,
                isHovered: false,
                dims: null,
                cursorSize: 15,
            }));
        };

        window.addEventListener("mousemove", manageMouseMove);

        const clickableEls = document.querySelectorAll<HTMLElement>(
            clickables.join(",")
        );

        clickableEls.forEach((el) => {
            if (!showSystemCursor) el.style.cursor = "none";

            el.addEventListener("mouseenter", () => {
                onMouseEnter(el);
            });

            el.addEventListener("mouseleave", () => {
                onMouseLeave();
            });
        });

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);

            clickableEls.forEach((el) => {
                el.removeEventListener("mouseenter", () => {
                    onMouseEnter(el);
                });

                el.removeEventListener("mouseleave", () => {
                    onMouseLeave();
                });
            });
        };
    }, [clickables, showSystemCursor, manageMouseMove]);

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
            animate={{
                width: state.cursorSize,
                height: state.cursorSize,
                opacity: state.isMoving ? 1 : 0,
            }}
            className={clsx(
                "opacity-0 z-50 fixed w-5 h-5 rounded-full bg-[var(--foreground)] border-[var(--foreground)] border-2 transition-colors duration-500 pointer-events-none",
                state.isHovered && "bg-transparent"
            )}
        />
    );
};

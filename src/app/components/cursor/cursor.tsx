"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";

type CursorProps = {
    clickables: string[];
    showSystemCursor: boolean;
};

export const Cursor: React.FC<CursorProps> = ({
    clickables,
    showSystemCursor = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [dims, setDims] = useState<DOMRect | null>(null);
    const cursorSize = isHovered ? 60 : 15;

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    // smooth out the mouse values
    const smoothOptions = { damping: 200, stiffness: 5000, mass: 1 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    const manageMouseMove = (e: { clientX: any; clientY: any }) => {
        const { clientX, clientY } = e;

        if (isHovered && dims) {
            const { left, top, height, width } = dims;
            //center position of the stickyElement
            const center = { x: left + width / 2, y: top + height / 2 };
            //distance between the mouse pointer and the center of the custom cursor and
            const distance = { x: clientX - center.x, y: clientY - center.y };

            //move mouse to center of stickyElement + slightly move it towards the mouse pointer
            mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
            mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
        } else {
            //move custom cursor to center of stickyElement
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        }
    };

    useEffect(() => {
        if (typeof window === "object" && !showSystemCursor) {
            document.body.style.cursor = "none";
        }
    }, [showSystemCursor]);

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove);

        const clickableEls = document.querySelectorAll<HTMLElement>(
            clickables.join(",")
        );

        console.log(clickables, clickableEls);

        clickableEls.forEach((el) => {
            if (!showSystemCursor) el.style.cursor = "none";

            el.addEventListener("mouseenter", () => {
                setIsHovered(true);
                setDims(el.getBoundingClientRect());
            });

            el.addEventListener("mouseleave", () => {
                setIsHovered(false);
                setDims(null);
            });
        });

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);

            clickableEls.forEach((el) => {
                el.removeEventListener("mouseover", () => {
                    setIsHovered(true);
                    setDims(el.getBoundingClientRect());
                });

                el.removeEventListener("mouseout", () => {
                    setIsHovered(false);
                    setDims(null);
                });
            });
        };
    }, [isHovered, clickables, showSystemCursor]);

    return (
        <div>
            <motion.div
                style={{
                    left: smoothMouse.x,
                    top: smoothMouse.y,
                }}
                animate={{
                    width: cursorSize,
                    height: cursorSize,
                }}
                className={clsx(
                    "z-50 fixed w-5 h-5 rounded-full bg-[var(--foreground)] border-[var(--foreground)] border-2 transition-colors duration-500 pointer-events-none",
                    isHovered && " bg-transparent"
                )}
            />
        </div>
    );
};

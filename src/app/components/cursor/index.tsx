"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import useIsTouchdevice from "./util/useIsTouchDevice";
import { usePathname } from "next/navigation";

type CursorProps = {
    showSystemCursor: boolean;
};

let timeout: NodeJS.Timeout;

const Cursor: React.FC<CursorProps> = ({ showSystemCursor = false }) => {
    const pathname = usePathname();
    const [state, setState] = useState({
        isMoving: false,
        isHovered: false,
        dims: null as DOMRect | null,
    });

    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const [coords, setCoords] = useState({
        x: 0,
        y: 0,
    });

    const [size] = useState({
        w: 15,
        h: 15,
    });

    const endX = useRef(0);
    const endY = useRef(0);
    const sizeW = useRef(15);
    const sizeH = useRef(15);

    const animateOuterCursor = useCallback(
        (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const { isHovered, dims } = state;
                if (isHovered && dims) {
                    const { left, top, height, width } = dims;
                    const center = { x: left + width / 2, y: top + height / 2 };
                    const distance = {
                        x: endX.current - center.x,
                        y: endY.current - center.y,
                    };

                    coords.x = center.x - size.w / 2 + distance.x * 0.5;
                    coords.y = center.y - size.h / 2 + distance.y * 0.5;
                } else {
                    // coords.x += (endX.current - coords.x) / 5;
                    // coords.y += (endY.current - coords.y) / 5;
                    coords.x = endX.current - size.w / 2;
                    coords.y = endY.current - size.h / 2;
                }

                size.w += (sizeW.current - size.w) / 15;
                size.h += (sizeH.current - size.h) / 15;

                if (cursorRef.current === null) return;
                cursorRef.current.style.top = `${coords.y}px`;
                cursorRef.current.style.left = `${coords.x}px`;
                cursorRef.current.style.width = `${size.w}px`;
                cursorRef.current.style.height = `${size.h}px`;
            }

            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animateOuterCursor);
        },
        [requestRef, state] // eslint-disable-line
    );

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateOuterCursor);
        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animateOuterCursor]);

    const manageMouseMove = useCallback(
        (event: MouseEvent) => {
            const { clientX, clientY } = event;

            // setCoords({
            //     x: clientX,
            //     y: clientY,
            // });
            endX.current = clientX;
            endY.current = clientY;

            clearTimeout(timeout);
            if (!state.isMoving) setState({ ...state, isMoving: true });
            timeout = setTimeout(() => {
                if (state.isMoving) setState({ ...state, isMoving: false });
            }, 5000);
        },
        [state]
    );

    useEffect(() => {
        if (typeof window === "object" && !showSystemCursor) {
            document.body.style.cursor = "none";
        }
    }, [showSystemCursor]);

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            isHovered: false,
            dims: null,
            cursorW: 15,
            cursorH: 15,
        }));
        sizeW.current = 15;
        sizeH.current = 15;
    }, [pathname]);

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
                cursorW: w,
                cursorH: h,
            }));
            sizeW.current = w * 1.5;
            sizeH.current = h * 1.5;
        };

        const onMouseLeave = () => {
            setState((prevState) => ({
                ...prevState,
                isHovered: false,
                dims: null,
                cursorW: 15,
                cursorH: 15,
            }));
            sizeW.current = 15;
            sizeH.current = 15;
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
    }, [showSystemCursor, manageMouseMove, pathname]);

    const isTouchdevice = useIsTouchdevice();
    if (typeof window !== "undefined" && isTouchdevice) {
        return <></>;
    }

    return (
        <div
            ref={cursorRef}
            style={{
                opacity: state.isMoving ? 1 : 0,
            }}
            className={clsx(
                "opacity-0 z-50 fixed w-5 h-5 rounded-full bg-[var(--foreground)] border-[var(--foreground)] border-2",
                "transition-[color,background,opacity] duration-500 pointer-events-none",
                state.isHovered && "bg-transparent"
            )}
        />
    );
};

export default Cursor;

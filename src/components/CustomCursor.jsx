import { useEffect, useRef, useState } from "react";

const lerp = (start, end, factor) => start + (end - start) * factor;

const CustomCursor = () => {
    const [enabled, setEnabled] = useState(false);
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const hoveredRef = useRef(false);
    const pointer = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updateEnabled = () => setEnabled(window.innerWidth > 768);
        updateEnabled();
        window.addEventListener("resize", updateEnabled);

        return () => {
            window.removeEventListener("resize", updateEnabled);
        };
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const previousCursor = document.body.style.cursor;
        document.body.style.cursor = "none";

        const handleMouseMove = (event) => {
            pointer.current.x = event.clientX;
            pointer.current.y = event.clientY;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
            }
        };

        const handleMouseOver = (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            hoveredRef.current = Boolean(target.closest("a, button, .hoverable"));
        };

        const animateRing = () => {
            ring.current.x = lerp(ring.current.x, pointer.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, pointer.current.y, 0.12);

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${hoveredRef.current ? 2 : 1})`;
                ringRef.current.style.borderColor = hoveredRef.current ? "#378ADD" : "rgba(255,255,255,0.8)";
            }

            frame = requestAnimationFrame(animateRing);
        };

        let frame = requestAnimationFrame(animateRing);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = previousCursor;
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={dotRef}
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    borderRadius: "50%",
                    background: "#ffffff",
                    zIndex: 9999,
                    pointerEvents: "none",
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: 32,
                    height: 32,
                    marginLeft: -16,
                    marginTop: -16,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.8)",
                    zIndex: 9999,
                    pointerEvents: "none",
                    transition: "border-color 180ms ease",
                }}
            />
        </>
    );
};

export default CustomCursor;

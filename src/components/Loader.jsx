import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Loader = ({ onComplete }) => {
    const overlayRef = useRef(null);
    const subtitleRef = useRef(null);
    const [text, setText] = useState("");

    useEffect(() => {
        const fullText = "Nisarg Patel";
        let index = 0;

        const typingTimer = setInterval(() => {
            index += 1;
            setText(fullText.slice(0, index));

            if (index >= fullText.length) {
                clearInterval(typingTimer);

                const timeline = gsap.timeline({
                    defaults: { ease: "power3.inOut" },
                    onComplete: onComplete,
                });

                timeline
                    .to(subtitleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                    })
                    .to({}, { duration: 0.75 })
                    .to(overlayRef.current, {
                        y: "-100%",
                        duration: 0.8,
                    });
            }
        }, 30);

        return () => {
            clearInterval(typingTimer);
        };
    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            style={{
                position: "fixed",
                inset: 0,
                background: "#050505",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                zIndex: 9998,
            }}
        >
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 700, letterSpacing: "0.04em" }}>{text}</h1>
            <p
                ref={subtitleRef}
                style={{
                    marginTop: "0.75rem",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    opacity: 0,
                    transform: "translateY(8px)",
                    color: "#9cb8d7",
                }}
            >
                Full Stack Developer
            </p>
        </div>
    );
};

export default Loader;

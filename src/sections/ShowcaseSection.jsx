import { forwardRef, useRef, useState } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = forwardRef(({ children, className = "" }, ref) => {
    const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const relativeX = (event.clientX - rect.left) / rect.width;
        const relativeY = (event.clientY - rect.top) / rect.height;

        const maxTilt = 12;
        const tiltX = (relativeX - 0.5) * maxTilt * 2;
        const tiltY = (0.5 - relativeY) * maxTilt * 2;

        setTransform(`perspective(800px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`);
        setGlare({ x: relativeX * 100, y: relativeY * 100, opacity: 0.35 });
    };

    const handleMouseLeave = () => {
        setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
        setGlare({ x: 50, y: 50, opacity: 0 });
    };

    return (
        <div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transformStyle: "preserve-3d",
                transition: "transform 0.4s ease",
                position: "relative",
            }}
        >
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), rgba(255,255,255,0) 46%)`,
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            />
            <div className="relative z-[1]">{children}</div>
        </div>
    );
});

TiltCard.displayName = "TiltCard";

const ProjectLinks = ({ githubUrl, liveUrl, liveLabel }) => (
    <div className="flex items-center justify-center gap-4 mt-3">
        <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white-50 hover:text-white transition-colors"
        >
            <FaGithub className="text-xl" />
            <span className="underline">GitHub</span>
        </a>
        <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-50 hover:text-blue-300 transition-colors underline"
        >
            {liveLabel}
        </a>
    </div>
);

const ShowcaseSection = () => {

    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);

    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current];
        projects.forEach((card, index) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: { trigger: card, start: 'top bottom = 100' }
                })
        });
        gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })
    }, []);

    return (
        <section id="showcase" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div className="project-card" ref={project1Ref}>
                        <TiltCard className="w-full">
                            <div className="image-wrapper group relative overflow-hidden">
                                <img
                                    src="/images/hero.png"
                                    alt="Splitzy"
                                    className="transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                                    <a
                                        href="https://github.com/Nisarg-13/Splitzy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-4xl hover:scale-110 transition-transform relative z-20"
                                    >
                                        <FaGithub />
                                    </a>
                                    <a
                                        href="https://splitzy-snowy.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-lg underline hover:text-blue-300 transition-colors relative z-20"
                                    >
                                        Open Splitzy
                                    </a>
                                </div>
                            </div>
                        </TiltCard>
                        <div className="text-content">
                            <h2 className='text-center'> Splitzy </h2>
                            <p className="text-center text-white-50 md:text-xl">Welcome to Splitzy – Effortlessly track, split, and settle personal and group expenses, all in one place.</p>
                            <ProjectLinks
                                githubUrl="https://github.com/Nisarg-13/Splitzy"
                                liveUrl="https://splitzy-snowy.vercel.app/"
                                liveLabel="Open Splitzy"
                            />
                        </div>
                    </div>

                    <div className="project-card" ref={project2Ref}>
                        <TiltCard className="w-full">
                            <div className="image-wrapper group relative overflow-hidden bg-[#070B11]">
                                <img
                                    src="/images/tradelab.png"
                                    alt="Nisarg's TradeLab"
                                    className="transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                                    <a
                                        href="https://github.com/Nisarg-13/Nisarg-TradeLab-Frontend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-4xl hover:scale-110 transition-transform relative z-20"
                                    >
                                        <FaGithub />
                                    </a>
                                    <a
                                        href="https://nisarg-trade-lab-frontend.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-lg underline hover:text-blue-300 transition-colors relative z-20"
                                    >
                                        Open TradeLab
                                    </a>
                                </div>
                            </div>
                        </TiltCard>
                        <div className="text-content">
                            <h2 className='text-center'> Nisarg&apos;s TradeLab </h2>
                            <p className="text-center text-white-50 md:text-xl">Track, analyze, and improve your trading with a personal journal, analytics dashboard, and AI-assisted insights.</p>
                            <ProjectLinks
                                githubUrl="https://github.com/Nisarg-13/Nisarg-TradeLab-Frontend"
                                liveUrl="https://nisarg-trade-lab-frontend.vercel.app/"
                                liveLabel="Open TradeLab"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection

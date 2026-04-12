import {words} from "../constants/index.js";
import Button from "../components/Button.jsx";
import HeroExperience from "../components/HeroModels/HeroExperience.jsx";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import {Canvas, useFrame} from "@react-three/fiber";
import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";

const HeroParticles = () => {
    const pointsRef = useRef(null);
    const mouseRef = useRef({x: 0, y: 0});

    const {geometry, basePositions} = useMemo(() => {
        const particleCount = 700;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 24;
            positions[i3 + 1] = (Math.random() - 0.5) * 14;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));

        return {geometry: particleGeometry, basePositions: positions};
    }, []);

    useEffect(() => {
        const onMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            geometry.dispose();
        };
    }, [geometry]);

    useFrame(({clock}) => {
        if (!pointsRef.current) return;

        const elapsed = clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < basePositions.length / 3; i++) {
            const i3 = i * 3;
            const baseX = basePositions[i3];
            const baseY = basePositions[i3 + 1];

            positions[i3] = baseX + mouseRef.current.x * 0.35;
            positions[i3 + 1] = baseY + Math.sin(elapsed * 0.55 + i * 0.12) * 0.2 + elapsed * 0.025;

            if (positions[i3 + 1] > 7) {
                positions[i3 + 1] = -7;
            }
        }

        pointsRef.current.rotation.y = mouseRef.current.x * 0.08;
        pointsRef.current.rotation.x = -mouseRef.current.y * 0.05;
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial color="#8ec5ff" size={0.028} sizeAttenuation transparent opacity={0.55}/>
        </points>
    );
};

const Hero = () => {

    useGSAP(() => {
        gsap.fromTo('.hero-text h1',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.inOut'
            }
        )
    })

    return (
        <section id="hero" className="relative overflow-hidden bg-[#0a0a0a]">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{position: [0, 0, 8], fov: 60}}>
                    <HeroParticles/>
                </Canvas>
            </div>

            <div className="absolute top-0 left-0 z-10 pointer-events-none opacity-35">
                <img src="/images/bg.png" alt="background"/>
            </div>

            <div className="hero-layout relative z-10">
                { /* LEFT: Hero content */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Turning
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word) => (
                                                <span key={word.text}
                                                      className="flex items-center md:gap-3 gap-1 pb-2">
                                                    <img src={word.imgPath} alt={word.text}
                                                         className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"/>
                                                    <span>
                                                        {word.text}
                                                    </span>
                                                </span>
                                            )
                                        )}
                                    </span>
                                </span>
                            </h1>
                            <h1>into Scalable Products</h1>
                            <h1>that Solve Problems</h1>
                        </div>
                        <div className="text-left max-w-xl w-full">
                            <p className="text-white-50 text-base md:text-xl relative z-10 pointer-events-none">
                                Hi, I'm Nisarg, a software developer focused on turning ideas into efficient, real-world
                                solutions.
                            </p>
                        </div>

                        <Button className="md:w-80 md:h-16 w-60 h-12" id="button" text="See My Work"/>
                    </div>

                </header>

                { /* RIGHT : 3D model */}

                <figure>
                    <div className="hero-3d-layout">
                        <HeroExperience/>
                    </div>
                </figure>

            </div>
            <AnimatedCounter/>
        </section>
    )
}

export default Hero

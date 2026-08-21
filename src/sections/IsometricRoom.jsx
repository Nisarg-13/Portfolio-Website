import { Canvas } from "@react-three/fiber";
import { Html, OrthographicCamera } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const OBJECT_LINKS = {
    monitor: "showcase",
    bookshelf: "skills",
    lamp: "contact",
    plant: "about",
};

const OBJECT_LABELS = {
    desk: "Workspace",
    monitor: "Projects",
    bookshelf: "Skills",
    lamp: "Contact",
    plant: "About",
    drawer: "Resume",
};

const RoomObject = ({
    name,
    label,
    position,
    tooltipOffset = 1.4,
    registerRef,
    onObjectClick,
    setHoveredLabel,
    children,
}) => {
    const groupRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (!groupRef.current) return;
        registerRef(groupRef.current);
    }, [registerRef]);

    useEffect(() => {
        if (!groupRef.current) return;
        gsap.to(groupRef.current.scale, {
            x: hovered ? 1.05 : 1,
            y: hovered ? 1.05 : 1,
            z: hovered ? 1.05 : 1,
            duration: 0.25,
            ease: "power2.out",
        });
    }, [hovered]);

    const isDesk = name === "desk";
    return (
        <group
            ref={groupRef}
            position={position}
            userData={{ name }}
            {...(!isDesk && {
                onPointerOver: (event) => {
                    event.stopPropagation();
                    setHovered(true);
                    setHoveredLabel(label);
                },
                onPointerOut: (event) => {
                    event.stopPropagation();
                    setHovered(false);
                    setHoveredLabel("");
                },
                onClick: (event) => {
                    event.stopPropagation();
                    onObjectClick(name);
                },
            })}
            {...(isDesk && { cursor: "default" })}
        >
            {children}
            {hovered && !isDesk && (
                <Html center position={[0, tooltipOffset, 0]}>
                    <div
                        style={{
                            background: "rgba(0, 0, 0, 0.72)",
                            border: "1px solid rgba(255,255,255,0.14)",
                            borderRadius: 8,
                            padding: "0.32rem 0.5rem",
                            fontSize: "0.72rem",
                            color: "#deebff",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
};

const RoomScene = ({ sectionRef, onObjectClick }) => {
    const cameraRef = useRef(null);
    const roomRef = useRef(null);
    const objectRefs = useRef([]);
    const [hoveredLabel, setHoveredLabel] = useState("");
    const bookshelfBooks = useMemo(
        () =>
            Array.from({ length: 12 }).map((_, idx) => ({
                x: -0.75 + (idx % 6) * 0.28,
                y: 0.65 - Math.floor(idx / 6) * 0.75,
                color: ["#417ed8", "#d95a5a", "#59b58c", "#cda54e"][idx % 4],
            })),
        []
    );

    const registerRef = (ref) => {
        if (!objectRefs.current.includes(ref)) {
            objectRefs.current.push(ref);
        }
    };

    useEffect(() => {
        objectRefs.current.forEach((group) => {
            group.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.transparent = true;
                    child.material.opacity = 0;
                }
            });
        });
    }, []);

    useGSAP(
        () => {
            if (!sectionRef.current || !cameraRef.current || !roomRef.current) return;

            cameraRef.current.position.set(20, 20, 20);
            cameraRef.current.lookAt(0, 0, 0);
            roomRef.current.rotation.y = 0.3;

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 35%",
                    scrub: 1,
                },
            });

            timeline
                .to(cameraRef.current.position, {
                    x: 10,
                    y: 10,
                    z: 10,
                    onUpdate: () => cameraRef.current.lookAt(0, 0, 0),
                })
                .to(roomRef.current.rotation, { y: 0 }, 0)
                .to(
                    objectRefs.current.flatMap((group) => {
                        const mats = [];
                        group.traverse((child) => {
                            if (child.isMesh && child.material) mats.push(child.material);
                        });
                        return mats;
                    }),
                    {
                        opacity: 1,
                        stagger: 0.1,
                    },
                    0.2
                );
        },
        { dependencies: [sectionRef] }
    );

    return (
        <>
            <OrthographicCamera ref={cameraRef} makeDefault position={[10, 10, 10]} zoom={80} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[8, 12, 7]} intensity={1.2} castShadow />

            <group ref={roomRef}>
                <mesh position={[0, -0.26, 0]} receiveShadow>
                    <boxGeometry args={[12, 0.5, 12]} />
                    <meshStandardMaterial color="#9d9084" roughness={0.8} />
                </mesh>

                <mesh position={[-5.9, 2, 0]}>
                    <boxGeometry args={[0.4, 4, 12]} />
                    <meshStandardMaterial color="#8f8f96" roughness={0.8} />
                </mesh>

                <mesh position={[0, 2, -5.9]}>
                    <boxGeometry args={[12, 4, 0.4]} />
                    <meshStandardMaterial color="#aaaaae" roughness={0.8} />
                </mesh>

                <RoomObject name="desk" label={OBJECT_LABELS.desk} position={[0, 0.9, 0]} registerRef={registerRef} onObjectClick={onObjectClick} setHoveredLabel={setHoveredLabel}>
                    <mesh castShadow>
                        <boxGeometry args={[3.8, 0.2, 2.2]} />
                        <meshStandardMaterial color="#503d2a" />
                    </mesh>
                    {[-1.6, 1.6].map((x) =>
                        [-0.9, 0.9].map((z) => (
                            <mesh key={`${x}-${z}`} position={[x, -0.9, z]} castShadow>
                                <boxGeometry args={[0.18, 1.8, 0.18]} />
                                <meshStandardMaterial color="#403224" />
                            </mesh>
                        ))
                    )}
                </RoomObject>

                <RoomObject name="monitor" label={OBJECT_LABELS.monitor} position={[0, 1.4, -0.25]} registerRef={registerRef} onObjectClick={onObjectClick} setHoveredLabel={setHoveredLabel}>
                    <mesh position={[0, 0.55, 0]} castShadow>
                        <boxGeometry args={[1.4, 0.85, 0.1]} />
                        <meshStandardMaterial color="#1a1d24" />
                    </mesh>
                    <mesh position={[0, 0.1, 0]}>
                        <boxGeometry args={[0.12, 0.45, 0.12]} />
                        <meshStandardMaterial color="#20242d" />
                    </mesh>
                    <mesh position={[0, -0.15, 0]}>
                        <boxGeometry args={[0.6, 0.08, 0.4]} />
                        <meshStandardMaterial color="#20242d" />
                    </mesh>
                </RoomObject>

                <RoomObject name="bookshelf" label={OBJECT_LABELS.bookshelf} position={[3.9, 1.2, -4.8]} registerRef={registerRef} onObjectClick={onObjectClick} setHoveredLabel={setHoveredLabel}>
                    <mesh>
                        <boxGeometry args={[2, 2.4, 0.5]} />
                        <meshStandardMaterial color="#6e5845" />
                    </mesh>
                    {[-0.8, -0.4, 0, 0.4, 0.8].map((y) => (
                        <mesh key={y} position={[0, y, 0]}>
                            <boxGeometry args={[1.85, 0.05, 0.48]} />
                            <meshStandardMaterial color="#4d3f31" />
                        </mesh>
                    ))}
                    {bookshelfBooks.map((book, idx) => (
                        <mesh key={idx} position={[book.x, book.y, 0.06]}>
                            <boxGeometry args={[0.16, 0.35, 0.25]} />
                            <meshStandardMaterial color={book.color} />
                        </mesh>
                    ))}
                </RoomObject>

                <RoomObject name="lamp" label={OBJECT_LABELS.lamp} position={[-1.8, 1.35, 0.5]} registerRef={registerRef} onObjectClick={onObjectClick} setHoveredLabel={setHoveredLabel}>
                    <mesh position={[0, 0.35, 0]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
                        <meshStandardMaterial color="#474f5f" />
                    </mesh>
                    <mesh position={[0, 0.8, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.25, 0.3, 16]} />
                        <meshStandardMaterial color="#d0c6ad" />
                    </mesh>
                    <pointLight position={[0, 0.67, 0]} color="#ffddaa" intensity={0.8} distance={4} />
                </RoomObject>

                <RoomObject name="plant" label={OBJECT_LABELS.plant} position={[1.9, 1.1, 0.72]} registerRef={registerRef} onObjectClick={onObjectClick} setHoveredLabel={setHoveredLabel}>
                    <mesh>
                        <cylinderGeometry args={[0.25, 0.32, 0.35, 20]} />
                        <meshStandardMaterial color="#67493c" />
                    </mesh>
                    <mesh position={[0, 0.35, 0]}>
                        <sphereGeometry args={[0.3, 20, 20]} />
                        <meshStandardMaterial color="#2f9b4a" />
                    </mesh>
                </RoomObject>

                <RoomObject name="drawer" label={OBJECT_LABELS.drawer} position={[1.1, 0.35, 0.65]} registerRef={registerRef} onObjectClick={onObjectClick} setHoveredLabel={setHoveredLabel}>
                    <mesh>
                        <boxGeometry args={[1.1, 0.7, 1.1]} />
                        <meshStandardMaterial color="#49382a" />
                    </mesh>
                    <mesh position={[0, 0.1, 0.58]}>
                        <boxGeometry args={[0.45, 0.1, 0.05]} />
                        <meshStandardMaterial color="#a5aab8" />
                    </mesh>
                </RoomObject>
            </group>

            {hoveredLabel && (
                <Html position={[0, -2.2, 0]} center>
                    <p style={{ color: "#91afcf", fontSize: "0.8rem" }}>Selected: {hoveredLabel}</p>
                </Html>
            )}
        </>
    );
};

const IsometricRoom = () => {
    const sectionRef = useRef(null);
    const isTabletOrBelow = useMediaQuery({ maxWidth: 1024 });

    const handleObjectClick = (objectName) => {
        if (objectName === "drawer") {
            const link = document.createElement("a");
            link.href = "/Nisarg_Patel_CV.pdf";
            link.download = "Nisarg_Patel_CV.pdf";
            link.click();
            return;
        }

        const targetId = OBJECT_LINKS[objectName];
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section ref={sectionRef} className="w-full min-h-[80vh] md:min-h-screen bg-[#070c14] px-4 sm:px-5 md:px-20 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center leading-tight">Inside My Workspace</h2>
                <p className="text-center text-sm sm:text-base text-[#8fa9c5] mt-3">Click objects to explore sections</p>

                {!isTabletOrBelow ? (
                    <div className="h-[60vh] xl:h-[68vh] mt-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0b1322]">
                        <Canvas shadows>
                            <RoomScene sectionRef={sectionRef} onObjectClick={handleObjectClick} />
                        </Canvas>
                    </div>
                ) : (
                    <div className="mt-8 space-y-4 sm:space-y-5">
                        <div className="h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 bg-[#0b1322] pointer-events-none">
                            <Canvas dpr={[1, 1.5]} shadows={false}>
                                <RoomScene sectionRef={sectionRef} onObjectClick={() => {}} />
                            </Canvas>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                                ["Projects", "monitor"],
                                ["Skills", "bookshelf"],
                                ["Contact", "lamp"],
                                ["About", "plant"],
                                ["Resume", "drawer"],
                            ].map(([label, key]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleObjectClick(key)}
                                    className="rounded-xl border border-white/10 bg-[#11213a] py-3.5 sm:py-4 px-4 text-[#d7e8ff] text-sm sm:text-base font-medium text-left sm:text-center"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default IsometricRoom;

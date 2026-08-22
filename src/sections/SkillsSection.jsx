import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const SKILLS = [
    { name: "React.js", category: "frontend", iconPack: "fa", iconKey: "FaReact" },
    { name: "Next.js", category: "frontend", iconPack: "si", iconKey: "SiNextdotjs" },
    { name: "React Native", category: "frontend", iconPack: "fa", iconKey: "FaReact" },
    { name: "TypeScript", category: "languages", iconPack: "si", iconKey: "SiTypescript" },
    { name: "JavaScript", category: "languages", iconPack: "si", iconKey: "SiJavascript" },
    { name: "Tailwind CSS", category: "frontend", iconPack: "si", iconKey: "SiTailwindcss" },
    { name: "HTML", category: "frontend", iconPack: "si", iconKey: "SiHtml5" },
    { name: "CSS", category: "frontend", iconPack: "si", iconKey: "SiCss3" },
    { name: "Node.js", category: "backend", iconPack: "fa", iconKey: "FaNodeJs" },
    { name: "Express.js", category: "backend", iconPack: "si", iconKey: "SiExpress" },
    { name: "Python", category: "backend", iconPack: "fa", iconKey: "FaPython" },
    { name: "FastAPI", category: "backend", iconPack: "si", iconKey: "SiFastapi" },
    { name: "C#", category: "languages", iconPack: "si", iconKey: "SiCsharp" },
    { name: ".NET Core", category: "backend", iconPack: "si", iconKey: "SiDotnet" },
    { name: "GraphQL", category: "backend", iconPack: "si", iconKey: "SiGraphql" },
    { name: "PostgreSQL", category: "databases", iconPack: "si", iconKey: "SiPostgresql" },
    { name: "Prisma", category: "databases", iconPack: "si", iconKey: "SiPrisma" },
    { name: "MongoDB", category: "databases", iconPack: "si", iconKey: "SiMongodb" },
    { name: "Redis", category: "databases", iconPack: "si", iconKey: "SiRedis" },
    { name: "RabbitMQ", category: "tools", iconPack: "si", iconKey: "SiRabbitmq" },
    { name: "AWS", category: "tools", iconPack: "fa", iconKey: "FaAws" },
    { name: "Docker", category: "tools", iconPack: "si", iconKey: "SiDocker" },
    { name: "Git", category: "tools", iconPack: "fa", iconKey: "FaGitAlt" },
    { name: "GitHub Actions", category: "tools", iconPack: "si", iconKey: "SiGithubactions" },
    { name: "Vercel", category: "tools", iconPack: "si", iconKey: "SiVercel" },
    { name: "Azure DevOps", category: "tools", iconPack: "si", iconKey: "SiAzuredevops" },
    { name: "OpenAI", category: "tools", iconPack: "si", iconKey: "SiOpenai" },
    { name: "Stripe", category: "tools", iconPack: "si", iconKey: "SiStripe" },
    { name: "Socket.IO", category: "backend", iconPack: "si", iconKey: "SiSocketdotio" },
    { name: "Jira", category: "tools", iconPack: "si", iconKey: "SiJira" },
];

const GROUPED_SKILLS = {
    Frontend: [
        "React.js",
        "Next.js",
        "React Native",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
    ],
    "Backend & APIs": [
        "Node.js",
        "Express.js",
        "Python",
        "FastAPI",
        "C#",
        ".NET Core",
        "REST APIs",
        "GraphQL",
        "Webhooks",
    ],
    "Databases & Data": [
        "PostgreSQL",
        "SQL",
        "Prisma ORM",
        "SQLAlchemy",
        "MongoDB",
        "Redis",
        "RabbitMQ",
    ],
    "Cloud & DevOps": [
        "AWS (EC2, RDS, S3)",
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "Git",
        "Azure DevOps",
        "Vercel",
    ],
    "AI & Integrations": [
        "OpenAI",
        "Agentic AI Workflows",
        "Stripe",
        "Shopify GraphQL APIs",
        "Clerk",
        "Vercel Blob",
        "Socket.IO",
    ],
    Engineering: [
        "Full-Stack Development",
        "Backend Development",
        "Mobile Development",
        "API Design",
        "Database Design",
        "Event-Driven Systems",
        "Production Deployments",
        "Database Migrations",
        "Agile/Scrum",
        "Jira",
        "Code Review",
    ],
};

const colorByCategory = {
    frontend: "#378ADD",
    backend: "#1D9E75",
    tools: "#7F77DD",
    languages: "#378ADD",
    databases: "#1D9E75",
};

const ORBIT_Z_SCALE = 0.72;

const buildAnchors = (skills) => {
    const orbitRadii = [4.6, 6.9, 9.2, 11.6];
    const buckets = orbitRadii.map(() => []);

    skills.forEach((_, index) => {
        buckets[index % orbitRadii.length].push(index);
    });

    const anchors = new Array(skills.length);

    buckets.forEach((bucket, orbitIndex) => {
        bucket.forEach((skillIndex, indexInOrbit) => {
            anchors[skillIndex] = {
                orbitIndex,
                radius: orbitRadii[orbitIndex],
                angle: ((Math.PI * 2) / bucket.length) * indexInOrbit + orbitIndex * 0.35,
                phase: skillIndex * 0.53,
                yBase: (orbitIndex - 1.5) * 0.95,
            };
        });
    });

    return anchors;
};

const SolarCore = () => {
    const coreRef = useRef(null);

    useFrame(({ clock }) => {
        if (!coreRef.current) return;
        const t = clock.getElapsedTime();
        coreRef.current.rotation.y += 0.003;
        const pulse = 1 + Math.sin(t * 1.5) * 0.04;
        coreRef.current.scale.set(pulse, pulse, pulse);
    });

    return (
        <group ref={coreRef}>
            <mesh>
                <sphereGeometry args={[1.05, 30, 30]} />
                <meshStandardMaterial color="#2f7fe0" emissive="#1e5fc6" emissiveIntensity={0.75} roughness={0.35} />
            </mesh>
            <mesh>
                <sphereGeometry args={[1.36, 28, 28]} />
                <meshBasicMaterial color="#8ec5ff" transparent opacity={0.12} />
            </mesh>
        </group>
    );
};

const FloatingSkill = ({ skill, anchor }) => {
    const ref = useRef(null);
    const ringRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const Icon = skill.iconKey
        ? (skill.iconPack === "fa" ? FaIcons[skill.iconKey] : SiIcons[skill.iconKey])
        : null;
    const fallbackBadge = skill.badge || skill.name.replace(/[^A-Za-z#+]/g, "").slice(0, 2).toUpperCase();
    const labelOffsetY = anchor.orbitIndex % 2 === 0 ? -0.98 : 0.9;
    const labelOffsetX = Math.cos(anchor.angle) * 0.18;
    const continentColor = "#0f1728";
    const continents = useMemo(() => {
        const chars = skill.name.split("").map((char) => char.charCodeAt(0));
        const len = chars.length || 1;

        return Array.from({ length: 3 }, (_, idx) => {
            const a = (((chars[idx % len] + idx * 57) % 360) * Math.PI) / 180;
            const b = ((((chars[(idx + 2) % len] + idx * 31) % 120) - 60) * Math.PI) / 180;
            const distance = 0.35;

            return {
                x: Math.cos(b) * Math.cos(a) * distance,
                y: Math.sin(b) * distance,
                z: Math.cos(b) * Math.sin(a) * distance,
                scale: 0.07 + ((chars[(idx + 1) % len] % 5) * 0.015),
            };
        });
    }, [skill.name]);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        const orbitSpeed = 0.03 + anchor.orbitIndex * 0.01;
        const orbitAngle = anchor.angle + t * orbitSpeed;

        ref.current.position.x = Math.cos(orbitAngle) * anchor.radius;
        ref.current.position.z = Math.sin(orbitAngle) * anchor.radius * ORBIT_Z_SCALE;
        ref.current.position.y = anchor.yBase;
        ref.current.rotation.y += 0.005;

        const targetScale = hovered ? 1.2 : 1;
        ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.14;
        ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.14;
        ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.14;

        if (ringRef.current) {
            ringRef.current.rotation.z += 0.01;
            ringRef.current.rotation.x = Math.sin(t * 0.7 + anchor.phase) * 0.3;
        }
    });

    return (
        <group
            ref={ref}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <mesh>
                <sphereGeometry args={[0.48, 26, 26]} />
                <meshStandardMaterial
                    color={colorByCategory[skill.category]}
                    roughness={0.55}
                    metalness={0.12}
                    emissive={colorByCategory[skill.category]}
                    emissiveIntensity={hovered ? 0.5 : 0.24}
                />
            </mesh>
            {continents.map((continent, idx) => (
                <mesh key={`${skill.name}-${idx}`} position={[continent.x, continent.y, continent.z]}>
                    <sphereGeometry args={[continent.scale, 10, 10]} />
                    <meshStandardMaterial color={continentColor} roughness={0.9} metalness={0.05} />
                </mesh>
            ))}
            <mesh>
                <sphereGeometry args={[0.58, 24, 24]} />
                <meshBasicMaterial color={colorByCategory[skill.category]} transparent opacity={0.14} />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 2.8, 0, 0]}>
                <torusGeometry args={[0.72, 0.03, 14, 40]} />
                <meshStandardMaterial color="#b8d7ff" emissive="#6fa7ff" emissiveIntensity={0.45} />
            </mesh>
            {Icon && (
                <Html center position={[0, 0.02, 0]} style={{ pointerEvents: "none" }}>
                    <div
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(5,12,24,0.75)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "#f4f8ff",
                            boxShadow: "0 0 12px rgba(92, 154, 255, 0.4)",
                        }}
                    >
                        <Icon size={12} />
                    </div>
                </Html>
            )}
            {!Icon && (
                <Html center position={[0, 0.02, 0]} style={{ pointerEvents: "none" }}>
                    <div
                        style={{
                            minWidth: 22,
                            height: 22,
                            padding: "0 4px",
                            borderRadius: "999px",
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(5,12,24,0.75)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "#f4f8ff",
                            fontSize: "10px",
                            fontWeight: 700,
                            boxShadow: "0 0 12px rgba(92, 154, 255, 0.4)",
                        }}
                    >
                        {fallbackBadge}
                    </div>
                </Html>
            )}
            <Html center position={[labelOffsetX, labelOffsetY, 0]}>
                <p
                    style={{
                        whiteSpace: "nowrap",
                        fontSize: "0.68rem",
                        color: "#dfe9f6",
                        fontWeight: hovered ? 700 : 500,
                        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                >
                    {skill.name}
                </p>
            </Html>
        </group>
    );
};

const SkillsScene = () => {
    const anchors = useMemo(() => buildAnchors(SKILLS), []);
    const orbitRings = [4.6, 6.9, 9.2, 11.6].map((radius, orbitIndex) => ({
        radius,
        y: (orbitIndex - 1.5) * 0.95,
    }));

    return (
        <>
            <color attach="background" args={["#0c1a2c"]} />
            <fog attach="fog" args={["#0c1a2c", 14, 34]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={22} color="#9dcbff" />
            <pointLight position={[8, 8, 8]} intensity={8} color="#bcd8ff" />
            <pointLight position={[-8, 4, -6]} color="#4ba7ff" intensity={5} />

            <group rotation={[0.46, 0, 0.26]} position={[0, -0.05, 0]}>
                <SolarCore />

                {orbitRings.map((orbit) => (
                    <group key={orbit.radius} position={[0, orbit.y, 0]} scale={[1, 1, ORBIT_Z_SCALE]}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[orbit.radius, 0.018, 8, 180]} />
                            <meshBasicMaterial color="#8ab5e6" transparent opacity={0.2} />
                        </mesh>
                    </group>
                ))}

                {SKILLS.map((skill, index) => (
                    <FloatingSkill key={skill.name} skill={skill} anchor={anchors[index]} />
                ))}
            </group>
        </>
    );
};

const SkillsSection = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <section id="skills" className="w-full mt-20 px-5 md:px-20 py-16 bg-[#090f18]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-3xl md:text-5xl font-semibold">What I work with</h2>

                {!isMobile && (
                    <div className="h-[460px] mt-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0d1726]">
                        <Canvas camera={{ position: [0, 1.2, 23], fov: 40 }}>
                            <SkillsScene />
                        </Canvas>
                    </div>
                )}

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Object.entries(GROUPED_SKILLS).map(([group, values]) => (
                        <div key={group} className="rounded-xl border border-white/10 bg-[#0f1d31] p-4">
                            <p className="text-sm tracking-wider uppercase text-[#8fb4df]">
                                {group}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {values.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 rounded-full bg-[#112742] text-sm text-[#d6e8ff]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

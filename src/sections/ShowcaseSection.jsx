import { useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {

    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];
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
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* LEFT SIDE */}

                    <div className="first-project-wrapper" ref={project1Ref}>
                        {/*<div className="image-wrapper">*/}
                        {/*    <img src="/images/Project_1.jpg" alt="TalentHub"/>*/}
                        {/*</div>*/}
                        <div className="image-wrapper group relative overflow-hidden">
                            <img
                                src="/images/hero.png"
                                alt="Splitzy"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a
                                    href="https://github.com/Nisarg-13/Splitzy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-4xl hover:scale-110 transition-transform"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href="https://splitzy-snowy.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-lg underline hover:text-blue-300 transition-colors"
                                >
                                    Open Splitzy
                                </a>
                            </div>
                        </div>
                        <div className="text-content">
                            <h2 className='text-center'> Splitzy </h2>
                            <p className="text-center text-white-50 md:text-xl">Welcome to Splitzy – Effortlessly track, split, and settle personal and group expenses, all in one place.</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}

                    <div className="project-list-wrapper overflow-hidden">
                        { /* Project_2 */}
                        <div className="project" ref={project2Ref}>
                            <div className="image-wrapper group relative overflow-hidden bg-[#ffefdb]">
                                <img
                                    src="/images/Project_1.jpg"
                                    alt="TalentHub"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <a
                                    href="https://github.com/Nisarg-13/TalentHub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <FaGithub className="text-black text-4xl" />
                                </a>
                            </div>
                            <h2 className='text-center'> TalentHub </h2>
                        </div>

                        { /* Project_3 */}
                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper group relative overflow-hidden bg-[#ffe7eb]">
                                <img
                                    src="/images/Project_2.png"
                                    alt="Task-Flow "
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <a
                                    href="https://github.com/Nisarg-13/TaskFlow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <FaGithub className="text-white text-4xl" />
                                </a>
                            </div>
                            <h2 className='text-center'> Task-Flow Web-Application </h2>
                        </div>



                    </div>
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection

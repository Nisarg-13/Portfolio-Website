import {useRef} from 'react'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {FaGithub} from 'react-icons/fa';

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
                {y: 50, opacity: 0},
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {trigger: card, start: 'top bottom = 100'}
                })
        });
        gsap.fromTo(sectionRef.current, {opacity: 0}, {opacity: 1, duration: 1.5})
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
                                <FaGithub className="text-black text-4xl"/>
                            </a>
                        </div>
                        <div className="text-content">
                            <h2> TalentHub – Your Gateway to Seamless Recruitment. </h2>
                            <p className="text-white-50 md:text-xl">A web app built with .NET Core, C#, Kendo UI, and
                                Git, leveraging Redis, RabbitMQ, Elasticsearch, dtSearch, PostgreSQL, and Azure DevOps
                                for a robust, scalable, and enterprise-ready recruitment solution.</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}

                    <div className="project-list-wrapper overflow-hidden">
                        { /* Project_2 */}
                        <div className="project" ref={project2Ref}>
                            <div className="image-wrapper group relative overflow-hidden bg-[#ffefdb]">
                                <img
                                    src="/images/Project_2.png"
                                    alt="Task-Flow"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <a
                                    href="https://github.com/Nisarg-13/TaskFlow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <FaGithub className="text-white text-4xl"/>
                                </a>
                            </div>
                            <h2> Task-Flow Web-Application </h2>
                        </div>

                        { /* Project_3 */}
                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper group relative overflow-hidden bg-[#ffe7eb]">
                                <img
                                    src="/images/Project_3.png"
                                    alt="Gmail-Clone"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <a
                                    href="https://github.com/Nisarg-13/Gmail-clone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <FaGithub className="text-black text-4xl"/>
                                </a>
                            </div>
                            <h2> Gmail-Clone Web-Application </h2>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection

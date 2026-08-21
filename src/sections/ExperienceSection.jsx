import TitleHeader from "../components/TitleHeader.jsx";
import {expCards} from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {

    useGSAP(() => {
        gsap.utils.toArray('.timeline-card').forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: 'left left',
                duration: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                }
            })
        })

        gsap.to('.timeline', {
            transformOrigin: 'bottom bottom',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.timeline-track',
                start: 'top center',
                end: 'bottom center',
                onUpdate: (self) => {
                    gsap.to('.timeline', {
                        scaleY: 1 - self.progress,
                    })
                }
            }
        })

        gsap.utils.toArray('.expText').forEach((text) => {
            gsap.from(text, {
                xPercent: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 60%'
                }
            })
        })
    }, []);

    return (
        <section id="experience" className="w-full md:mt-40 mt-20 section-padding xl:px-0">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Professional Work Experience" sub="🧑‍💻 My Career Overview"/>
                <div className="mt-32 relative">
                    <div className="timeline-track absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none">
                        <div className="gradient-line absolute left-1/2 top-0 h-full -translate-x-1/2"/>
                        <div className="timeline absolute left-1/2 top-0 h-full -translate-x-1/2"/>
                    </div>

                    <div className="relative z-30 xl:space-y-32 space-y-16">
                        {expCards.map((card, index) => (
                            <div key={`${card.title}-${card.date}`} className="exp-card-wrapper">
                                <div className="exp-card-review">
                                    <GlowCard card={card} index={index}>
                                        <div>
                                            <img src={card.imgPath} alt=""/>
                                        </div>
                                    </GlowCard>
                                </div>

                                <div className="exp-card-center">
                                    <div className="timeline-logo">
                                        <img src={card.logoPath} alt={`${card.title} logo`}/>
                                    </div>
                                </div>

                                <div className="expText exp-card-details">
                                    <h1 className="font-semibold text-2xl md:text-3xl">{card.title}</h1>
                                    <p className="text-white-50 my-5">📅 {card.date}</p>
                                    <p className="text-[#839cb5] italic">Responsibilities</p>
                                    <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                                        {card.responsibilities.map((responsibility) => (
                                            <li key={responsibility} className="text-base md:text-lg">
                                                {responsibility}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ExperienceSection

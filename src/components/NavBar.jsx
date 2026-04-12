import {navLinks} from "../constants/index.js";
import {useEffect, useState} from "react";

const NavBar = () => {

    const [scrolled, setScrolled] = useState(false);

    const scrollToSection = (sectionId) => {
        const targetSection = document.getElementById(sectionId);
        const navElement = document.querySelector(".navbar");
        const navHeight = navElement ? navElement.getBoundingClientRect().height : 0;

        if (targetSection) {
            const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
            const topOffset = 20;

            window.scrollTo({
                top: Math.max(sectionTop - navHeight - topOffset, 0),
                behavior: "smooth",
            });
        }
    };

    const handleSectionNavigation = (event, sectionId) => {
        event.preventDefault();
        scrollToSection(sectionId);
    };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <a className="logo" href="#hero" onClick={(event) => handleSectionNavigation(event, "hero")}>
                    Nisarg Patel
                </a>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({sectionId, name}) => (
                            <li key={name} className="group">
                                <a href={`#${sectionId}`} onClick={(event) => handleSectionNavigation(event, sectionId)}>
                                    <span> {name} </span>
                                    <span className="underline"/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a href="#contact" className="contact-btn group" onClick={(event) => handleSectionNavigation(event, "contact")}>
                    <div className="inner">
                        <span>Contact Me</span>
                    </div>
                </a>
            </div>
        </header>
    )

}

export default NavBar

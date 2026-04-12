import { useState } from "react";
import CustomCursor from "./components/CustomCursor.jsx";
import Loader from "./components/Loader.jsx";
import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import IsometricRoom from "./sections/IsometricRoom.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import SkillsSection from "./sections/SkillsSection.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

const App = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <CustomCursor />
            {!loaded && <Loader onComplete={() => setLoaded(true)} />}

            {loaded && (
                <>
                    <NavBar />
                    <Hero />
                    <IsometricRoom />
                    <ShowcaseSection />
                    <SkillsSection />
                    <FeatureCards />
                    <ExperienceSection />
                    <Contact />
                    <Footer />
                </>
            )}
        </>
    );
};

export default App;

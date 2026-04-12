# Portfolio Upgrade Guide — Nisarg Patel
> Copilot-ready instructions. Each section is a self-contained prompt you can paste directly into GitHub Copilot Chat.

---

## Stack Summary (already installed — no new installs needed)
- React 19 + Vite
- Three.js + React Three Fiber + Drei + Postprocessing
- GSAP + @gsap/react
- Tailwind CSS v4
- EmailJS, react-countup, react-icons, react-responsive

---

## Current Sections (in order)
```
NavBar → Hero → ShowcaseSection → FeatureCards → ExperienceSection → Contact → Footer
```

---

## Upgrade Plan Overview

| Priority | Change | Difficulty |
|----------|--------|------------|
| 🔴 High | 3D Particle / Canvas Hero background | Medium |
| 🔴 High | Isometric Room section (new) | Hard |
| 🔴 High | Scroll-driven camera animation | Medium |
| 🟡 Medium | 3D tilt cards on ShowcaseSection | Easy |
| 🟡 Medium | Skills section with 3D floating icons | Medium |
| 🟡 Medium | Testimonials / What people say section | Easy |
| 🟢 Low | Cursor glow / custom cursor | Easy |
| 🟢 Low | Dark/light mode toggle on lamp click | Easy |
| 🟢 Low | Page transition animations with GSAP | Easy |

---

## Change 1 — 3D Particle Background in Hero

**File to modify:** `src/sections/Hero.jsx`

### Copilot Prompt:
```
I have a React Three Fiber setup already installed (@react-three/fiber, @react-three/drei, three).
In my Hero.jsx section, add a full-screen Three.js canvas behind the existing hero content.

Requirements:
- Use @react-three/fiber Canvas with an OrthographicCamera or PerspectiveCamera
- Create a particle field of ~2000 small dots using BufferGeometry and Points
- Animate particles slowly drifting upward or floating in a breathing pattern using useFrame
- The canvas should be position: absolute, inset-0, z-index: 0
- Wrap existing hero text/button content in a relative z-10 div so it sits above the canvas
- Add mouse parallax: particles should subtly shift based on mouse position (useRef on mousemove)
- Use a dark color scheme (#0a0a0a background, white/blue tinted particles)
- Keep it performant: use useMemo for geometry, dispose on unmount
```

### What to add to App.jsx:
No changes needed — Hero already renders.

---

## Change 2 — 3D Isometric Room Section (New Section)

**New file to create:** `src/sections/IsometricRoom.jsx`
**Add to App.jsx:** `<IsometricRoom />` between `<Hero />` and `<ShowcaseSection />`

### Copilot Prompt:
```
Create a new React component src/sections/IsometricRoom.jsx using React Three Fiber and Drei.

This is an interactive isometric portfolio room. Requirements:

CAMERA:
- Use OrthographicCamera with isometric angle: position [10, 10, 10], looking at [0, 0, 0]
- Camera zoom ~80, no OrbitControls (camera is fixed)

ROOM STRUCTURE (build with Three.js primitives if no .glb available):
- Floor: large flat BoxGeometry, light grey or wooden color
- Back wall (left): BoxGeometry, slightly darker
- Back wall (right): BoxGeometry, slightly lighter
- All walls should use MeshStandardMaterial with roughness 0.8

ROOM OBJECTS (each is a named group with a userData.name property):
1. "desk" — wide flat box with 4 thin leg boxes
2. "monitor" — thin tall box on a stand on the desk
3. "bookshelf" — tall box with 5 horizontal shelf boxes, colored book boxes on each shelf
4. "lamp" — thin cylinder pole with a cone shade on top, emits a PointLight
5. "plant" — cylinder pot with a green sphere on top
6. "drawer" — small box under the desk

INTERACTION:
- Use raycasting via @react-three/fiber's onClick and onPointerOver / onPointerOut
- On hover: scale the hovered object up by 1.05 using GSAP (import gsap from 'gsap')
- On click: call a prop function onObjectClick(objectName) with the object's userData.name
- Show a tooltip above hovered object with the section name (use Html from @react-three/drei)

LIGHTING:
- AmbientLight intensity 0.4
- DirectionalLight from top-right, intensity 1.2, castShadow
- PointLight inside the lamp object, color warm yellow #ffddaa, intensity 0.8

OBJECT → SECTION MAPPING (pass as prop or hardcode):
- "monitor" → scrolls to #showcase (projects)
- "bookshelf" → scrolls to #skills
- "lamp" → scrolls to #contact
- "drawer" → triggers resume download
- "plant" → scrolls to #about

PARENT COMPONENT (IsometricRoom.jsx wrapper):
- Full-width section, min-height 100vh, dark background
- Canvas fills the section
- Add a small legend below: "Click objects to explore →"
- On mobile (use react-responsive useMediaQuery), hide the Canvas and show a simple 2D grid of buttons instead
```

### Add to App.jsx:
```jsx
import IsometricRoom from "./sections/IsometricRoom.jsx";

// Inside return, after <Hero/>:
<IsometricRoom />
```

---

## Change 3 — Scroll-Driven Camera Animation

**File to modify:** `src/sections/IsometricRoom.jsx` (or a new `src/sections/ScrollScene.jsx`)

### Copilot Prompt:
```
In my React Three Fiber scene, I want scroll-driven camera animation using GSAP ScrollTrigger.

Already installed: gsap, @gsap/react

Requirements:
- Register ScrollTrigger plugin: gsap.registerPlugin(ScrollTrigger)
- Use useGSAP from @gsap/react
- As the user scrolls into the IsometricRoom section, animate the camera from position [20, 20, 20] to [10, 10, 10] (a cinematic zoom-in)
- The room should start slightly rotated (Y axis 0.3) and settle to 0 on scroll-in
- Each room object should stagger-fade in (opacity 0 → 1) with a 0.1s stagger using GSAP timeline
- Use scrub: 1 for smooth scroll-linked animation
- Trigger: when the section is 80% into the viewport
```

---

## Change 4 — 3D Tilt Cards on ShowcaseSection

**File to modify:** `src/sections/ShowcaseSection.jsx`

### Copilot Prompt:
```
In my ShowcaseSection.jsx, upgrade the project cards to have a realistic 3D tilt effect on mouse move.

Do NOT use any external tilt library. Implement it with vanilla JS and CSS transforms only.

Requirements:
- On each card's onMouseMove event, calculate the mouse position relative to the card center
- Apply CSS transform: `perspective(800px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`
- Max tilt angle: 12 degrees
- Add a subtle glare effect: a semi-transparent white radial gradient that moves with the mouse, positioned as an ::after pseudo element or an absolute div inside the card
- On onMouseLeave, reset transform to identity using a CSS transition: 0.4s ease
- Wrap each card in a div with style set via useRef or inline state
- Keep all existing card content (image, title, description, links) intact
```

---

## Change 5 — Skills Section (New Section)

**New file to create:** `src/sections/SkillsSection.jsx`
**Add to App.jsx:** `<SkillsSection />` between `<FeatureCards />` and `<ExperienceSection />`

### Copilot Prompt:
```
Create src/sections/SkillsSection.jsx — a visually rich skills section using React Three Fiber.

LAYOUT:
- Full-width section, dark background, centered heading "What I work with"
- Below the heading: a Three.js Canvas (height 400px) showing floating 3D skill icons

3D SKILL ICONS:
- Create ~12 skill spheres floating in a circular orbit pattern
- Each sphere has a text label using Html from @react-three/drei (show skill name below sphere)
- Sphere colors mapped to category:
  - Frontend (React, Tailwind, Three.js): blue #378ADD
  - Backend (Node, Python, etc.): teal #1D9E75
  - Tools (Git, Vite, Figma, etc.): purple #7F77DD
- Animate: each sphere bobs up and down (sine wave) with a unique phase offset using useFrame
- On hover: sphere scale increases to 1.3, label becomes bold

BELOW THE CANVAS:
- A simple Tailwind grid of skill pill badges (text only) as a fallback/supplement
- Group them: Languages | Frameworks | Tools | Databases

MOBILE:
- Hide Canvas on mobile, show only the pill grid
```

### Add to App.jsx:
```jsx
import SkillsSection from "./sections/SkillsSection.jsx";

// Inside return, after <FeatureCards/>:
<SkillsSection />
```

---

## Change 6 — Custom Cursor Glow

**New file to create:** `src/components/CustomCursor.jsx`
**Add to App.jsx:** `<CustomCursor />` as first child inside the fragment

### Copilot Prompt:
```
Create src/components/CustomCursor.jsx — a custom animated cursor for desktop only.

Requirements:
- Two elements: a small dot (8px) and a larger ring (32px) that follows with a lag
- Track mousemove with useEffect and requestAnimationFrame
- The dot snaps instantly to cursor position
- The ring lerps toward cursor position (lerp factor 0.12) for a smooth trailing effect
- On hovering any <a>, <button>, or element with class "hoverable": ring scales to 2x and changes color to your accent blue
- Hide default cursor with cursor: none on body
- Only render on desktop: use window.innerWidth > 768 check
- Use position: fixed, z-index: 9999, pointer-events: none
- Style with inline styles or a CSS module — do not use Tailwind (needs precise pixel control)
```

### Add to App.jsx:
```jsx
import CustomCursor from "./components/CustomCursor.jsx";

// Inside return, as first child:
<CustomCursor />
```

---

## Change 7 — Page Load Intro Animation

**New file to create:** `src/components/Loader.jsx`
**Add to App.jsx:** Conditional render before all sections

### Copilot Prompt:
```
Create src/components/Loader.jsx — a cinematic intro animation that plays once on first load.

Requirements:
- Show a full-screen dark overlay on mount
- Animate: your name "Nisarg Patel" types itself out character by character (30ms per char)
- Then subtitle fades in: "Software Developer"
- Then the entire overlay slides up and out revealing the site (GSAP: y: 0 → -100%, duration 0.8, ease "power3.inOut")
- Use useEffect + GSAP timeline
- After animation completes, unmount the loader via a state setter passed from App.jsx
- Total duration: ~2.5 seconds

In App.jsx:
- Add state: const [loaded, setLoaded] = useState(false)
- Render <Loader onComplete={() => setLoaded(true)} /> when !loaded
- Render all sections only when loaded is true (or keep them mounted but hidden behind loader)
```

---

## Change 8 — Add Section IDs for Deep Linking

**Files to modify:** Each section component

### Copilot Prompt:
```
In each of these section files, add an id attribute to the outermost element so the IsometricRoom click navigation works:

- Hero.jsx → id="hero"
- ShowcaseSection.jsx → id="showcase"
- SkillsSection.jsx → id="skills"
- FeatureCards.jsx → id="about"
- ExperienceSection.jsx → id="experience"
- Contact.jsx → id="contact"

Also update NavBar.jsx: replace any existing nav links with smooth-scroll anchor links:
<a href="#showcase" onClick={(e) => { e.preventDefault(); document.querySelector('#showcase').scrollIntoView({ behavior: 'smooth' }) }}>
```

---

## Final App.jsx (after all changes)

```jsx
import CustomCursor from './components/CustomCursor.jsx'
import Loader from './components/Loader.jsx'
import NavBar from "./components/NavBar.jsx"
import Hero from './sections/Hero.jsx'
import IsometricRoom from "./sections/IsometricRoom.jsx"
import ShowcaseSection from "./sections/ShowcaseSection.jsx"
import SkillsSection from "./sections/SkillsSection.jsx"
import FeatureCards from "./sections/FeatureCards.jsx"
import ExperienceSection from "./sections/ExperienceSection.jsx"
import Contact from "./sections/Contact.jsx"
import Footer from "./sections/Footer.jsx"
import { useState } from 'react'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <CustomCursor />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
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
  )
}

export default App
```

---

## Recommended Order of Implementation

1. **Change 8** — Add section IDs (5 min, zero risk)
2. **Change 7** — Loader animation (30 min, high visual impact immediately)
3. **Change 6** — Custom cursor (20 min, makes it feel premium instantly)
4. **Change 4** — 3D tilt cards (30 min, upgrades existing content)
5. **Change 1** — Hero particle background (45 min)
6. **Change 5** — Skills section (45 min)
7. **Change 2** — Isometric Room (2–3 hours, the showstopper)
8. **Change 3** — Scroll camera animation (add on top of Change 2)

---

## Tips for Using with GitHub Copilot

- Open the relevant file first, then paste the Copilot prompt into **Copilot Chat** (`Ctrl+Shift+I`)
- Use `@workspace` prefix if Copilot needs context from other files
- For the Isometric Room, tell Copilot: `@workspace I have Three.js, R3F, Drei and GSAP already installed. No need to install anything.`
- After each change, test with `npm run dev` before moving to the next
- Commit each change separately so you can roll back cleanly

---

*Generated for: Nisarg Patel — Portfolio Upgrade*
*Stack: React 19 + Vite + Three.js + R3F + GSAP + Tailwind v4*

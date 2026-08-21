# Nisarg Patel — Portfolio Website

Personal portfolio site for **Nisarg Patel**, a Full Stack Developer. Built with React and Vite, featuring interactive 3D visuals, scroll-driven animations, and a responsive layout.

## Sections

| Section | Description |
| --- | --- |
| **Hero** | Intro with animated 3D room and headline |
| **Isometric Room** | Interactive 3D scene — click objects to navigate or download the CV |
| **Projects** | Showcase of selected work with tilt cards and live links |
| **Skills** | Tech stack with animated 3D icons |
| **About** | Strengths and capabilities |
| **Experience** | Professional timeline with centered layout |
| **Contact** | Email form powered by EmailJS |
| **Footer** | Social links |

## Tech Stack

- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS 4
- **Animation:** GSAP, ScrollTrigger
- **3D:** Three.js, React Three Fiber, Drei
- **Other:** EmailJS, React Icons, React CountUp

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/Nisarg-13/Portfolio-Website.git
cd Portfolio-Website
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
├── components/     # Reusable UI (NavBar, Loader, GlowCard, 3D models, etc.)
├── sections/       # Page sections (Hero, Projects, Experience, Contact, …)
├── constants/      # Nav links, experience, skills, social URLs
├── App.jsx         # Root layout and section composition
└── index.css       # Global styles and Tailwind theme

public/
├── Nisarg_Patel_CV.pdf   # Downloadable CV
└── images/               # Screenshots, logos, and icons
```

## CV / Resume

The CV is served from `public/Nisarg_Patel_CV.pdf`. It downloads when users click the **Resume** drawer in the Isometric Room scene.

To update the CV, replace that file or update the path in `src/sections/IsometricRoom.jsx`.

## Author

**Nisarg Patel** — Full Stack Developer

- [LinkedIn](https://www.linkedin.com/in/nisargkumarpatel/)
- [GitHub](https://github.com/Nisarg-13)
- [Email](mailto:patelnisarg1309@gmail.com)

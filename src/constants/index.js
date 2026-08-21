const navLinks = [
    {
        name: "Projects",
        sectionId: "showcase",
    },
    {
        name: "Skills",
        sectionId: "skills",
    },
    {
        name: "Experience",
        sectionId: "experience",
    }
];

const words = [
    {text: "Ideas", imgPath: "/images/ideas.svg"},
    {text: "Concepts", imgPath: "/images/concepts.svg"},
    {text: "Designs", imgPath: "/images/designs.svg"},
    {text: "Code", imgPath: "/images/code.svg"},
    {text: "Ideas", imgPath: "/images/ideas.svg"},
    {text: "Concepts", imgPath: "/images/concepts.svg"},
    {text: "Designs", imgPath: "/images/designs.svg"},
    {text: "Code", imgPath: "/images/code.svg"},
];

// const counterItems = [
//     {value: 15, suffix: "+", label: "Years of Experience"},
//     {value: 200, suffix: "+", label: "Satisfied Clients"},
//     {value: 108, suffix: "+", label: "Completed Projects"},
//     {value: 90, suffix: "%", label: "Client Retention Rate"},
// ];

const counterItems = [
    {value: 10, suffix: "+", label: "Technologies Mastered"},
    {value: 100, suffix: "%", label: "Commitment to Learning"},
    {value: 15, suffix: "+", label: "Hands-On Projects Built"},
    {value: 5, suffix: "+", label: "Self-Paced Courses Finished"},
];

const logoIconsList = [
    {
        imgPath: "/images/logos/TatvaSoft.png",
    },
    {
        imgPath: "/images/logos/CasePoint.png",
    }
];

const abilities = [
    {
        imgPath: "/images/creativity.png",
        title: "Innovative Thinking",
        desc: "Bringing fresh ideas and creative solutions to every project challenge.",
    },
    {
        imgPath: "/images/Adaptability.png",
        title: "Adaptability",
        desc: "Quickly adjusting to new requirements, tools, or changes in direction.",
    },
    {
        imgPath: "/images/problem-solving.png",
        title: "Problem Solving",
        desc: "Finding efficient, scalable solutions to complex development issues.",
    },
];

const techStackImgs = [
    {
        name: "React Developer",
        imgPath: "/images/logos/react.png",
    },
    {
        name: "Python Developer",
        imgPath: "/images/logos/python.svg",
    },
    {
        name: "Backend Developer",
        imgPath: "/images/logos/node.png",
    },
    {
        name: "Interactive Developer",
        imgPath: "/images/logos/three.png",
    },
    {
        name: "Project Manager",
        imgPath: "/images/logos/git.svg",
    },
];

const techStackIcons = [
    {
        name: "React Developer",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        rotation: [0, 0, 0],
    },
    {
        name: "Python Developer",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
    },
    {
        name: "Backend Developer",
        modelPath: "/models/node-transformed.glb",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Interactive Developer",
        modelPath: "/models/three.js-transformed.glb",
        scale: 0.05,
        rotation: [0, 0, 0],
    },
    {
        name: "Project Manager",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
    },
];

const expCards = [
    {
        review: "At EVER, I work as a Software Developer, developing scalable full-stack features and cross-platform mobile applications. I focus on building robust backend services, optimizing database performance, and creating intuitive user interfaces while collaborating in an Agile environment.",
        imgPath: "",
        logoPath: "/images/EVER.jpg",
        title: "Software Developer",
        date: "September 2025 - Present",
        responsibilities: [
            "Developed scalable full-stack features using Next.js, Node.js, React, and TypeScript, following clean architecture and best coding practices.",
            "Implemented and optimized backend services and RESTful APIs, improving system reliability, performance, and scalability.",
            "Designed and maintained PostgreSQL databases and used Prisma ORM for efficient data modeling, query optimization, and improved system responsiveness.",
            "Built reusable front-end components and enhanced UI workflows to ensure smooth and intuitive user experiences.",
            "Collaborated with cross-functional teams in an Agile environment, contributing to sprint planning, code reviews, and CI/CD processes.",
            "Developed a cross-platform mobile application using React Native for iOS and Android, expanding platform accessibility to mobile users.",
        ],
    },
    {
        review: "TalentHub is an internal recruitment system that automated and streamlined hiring workflows. I played a key role in both backend and frontend development, ensuring scalability and efficiency throughout the platform.",
        imgPath: "",
        logoPath: "/images/Casepoint.jpg",
        title: "Software Developer",
        date: "January 2024 - April 2024",
        responsibilities: [
            "Built scalable recruitment modules using .NET Core and PostgreSQL for seamless HR and interviewer workflows.",
            "Integrated Redis, RabbitMQ, and Elasticsearch to enhance performance, messaging, and search capabilities.",
            "Collaborated with UI/UX teams to deliver responsive, user-friendly interfaces using Kendo UI.",
        ],
    },
    {
        review: "Book Store Application is a role-based e-commerce platform for buying and selling books online. I led the frontend development, focusing on building a responsive interface and delivering a smooth user experience across all user roles.",
        imgPath: "",
        logoPath: "/images/Tatvasoft.jpg",
        title: "Software Developer",
        date: "July 2023 – August 2023",
        responsibilities: [
            "Designed and developed responsive user interfaces using React.js and Bootstrap.",
            "Implemented dynamic components and user flows for buyers, sellers, and admins with role-based access.",
            "Collaborated with backend developers to integrate APIs and ensure seamless data interaction.",
        ],
    }
];

const expLogos = [
    {
        name: "logo1",
        imgPath: "/images/logo1.png",
    },

    {
        name: "logo2",
        imgPath: "/images/logo2.png",
    },
    {
        name: "logo3",
        imgPath: "/images/logo3.png",
    },
];

const socialImgs = [
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/nisargkumarpatel/",
        imgPath: "/images/linkedin.png",
    },
    {
        name: "gmail",
        url: "mailto:patelnisargkumar1309@gmail.com",
        imgPath: "/images/gmail.png",
    },
    {
        name: "github",
        url: "https://github.com/Nisarg-13",
        imgPath: "/images/github.png",
    },
];

export {
    words,
    abilities,
    logoIconsList,
    counterItems,
    expCards,
    expLogos,
    socialImgs,
    techStackIcons,
    techStackImgs,
    navLinks,
};

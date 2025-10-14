
"use client";

import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiCode, FiBriefcase, FiHome, FiUser, FiPhone, FiCamera, FiFacebook, FiInstagram } from 'react-icons/fi';
import { SiNextdotjs, SiTypescript, SiSupabase, SiPhp, SiLaravel, SiMysql, SiTailwindcss, SiHtml5 } from 'react-icons/si';


const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AnimatedSection = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.section
            id={id}
            ref={ref}
            variants={sectionVariant}
            initial="hidden"
            animate={controls}
            className="py-24 px-5 relative z-10"
        >
            {children}
        </motion.section>
    );
};

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", to: "home", icon: <FiHome /> },
        { name: "About", to: "about", icon: <FiUser /> },
        { name: "Skills", to: "skills", icon: <FiCode /> },
        { name: "Projects", to: "projects", icon: <FiBriefcase /> },
        { name: "Gallery", to: "gallery", icon: <FiCamera /> },
        { name: "Contact", to: "contact", icon: <FiPhone /> },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md' : 'bg-transparent'}`}>
           <nav className="container mx-auto flex justify-between items-center p-4 text-text-light">
                <div className="text-2xl font-bold font-orbitron tracking-widest">
                    <Link to="home" smooth={true} duration={500} className="cursor-pointer">
                        {/* --- CHANGE: From accent-pink to text-light for a cleaner look --- */}
                        <span className="text-text-light">My Portfolio</span>
                    </Link>
                </div>
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                         <li key={link.name}>
                            {/* --- CHANGE: Hover color is now cyan --- */}
                            <Link to={link.to} smooth={true} duration={500} spy={true} activeClass="text-accent-cyan" className="cursor-pointer hover:text-accent-cyan transition-colors flex items-center gap-2">
                               {link.icon} {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

const HeroSection = () => {
    const heroImages = [
        { src: "/images/pic8.png", alt: "Professional Headshot", className: "z-10 w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 border-4 border-accent-cyan shadow-[0_0_20px_theme(colors.accent-cyan)]"},
        { src: "/images/pic5.png", alt: "Casual Portrait", className: "absolute z-20 top-[-25px] right-[-15px] md:top-[-35px] md:right-[-25px] lg:top-[-45px] lg:right-[-35px] w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl border-4 border-primary shadow-lg rotate-12" },
        { src: "/images/pic1.png", alt: "Hobby/Action Shot", className: "absolute z-0 bottom-[-25px] left-[-15px] md:bottom-[-35px] md:left-[-25px] lg:bottom-[-45px] lg:left-[-35px] w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-lg border-4 border-primary shadow-lg -rotate-12" },
    ];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div className="relative z-10 text-center md:text-left">
                    <motion.h1 
                        className="text-5xl md:text-7xl font-black font-orbitron mb-4 text-accent-cyan"
                        initial={{ y: -50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        CHRISTIAN MAGLANGIT
                    </motion.h1>
                    <TypeAnimation
                        sequence={[
                            'A Full Stack Developer', 2000,
                            'A Next.js Enthusiast', 2000,
                            'A Problem Solver', 2000,
                            'Ready to Build', 2000,
                        ]}
                        wrapper="p"
                        speed={50}
                        className="text-xl md:text-2xl text-text-light mb-8"
                        repeat={Infinity}
                    />
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
                        <Link to="projects" smooth={true} duration={500} className="glow-button inline-block bg-primary text-text-light font-semibold py-3 px-8 rounded-full border border-accent-cyan cursor-pointer">
                            <span className="flex items-center gap-2">View My Work <FiArrowRight/></span>
                        </Link>
                    </motion.div>
                </div>
                <div className="relative flex justify-center items-center h-64 md:h-80 lg:h-96">
                    {heroImages.map((image, index) => (
                        <motion.div
                            key={image.src}
                            className={image.className}
                            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                y: [0, -10, 0],
                            }}
                            transition={{ 
                                delay: 1.2 + index * 0.2, 
                                duration: 0.8, 
                                ease: "easeInOut",
                                y: {
                                    duration: 3 + index,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={256} // Updated to largest width for better quality
                                height={256} // Updated to largest height for better quality
                                className="object-cover w-full h-full"
                                priority={index === 0}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="text-4xl font-bold text-center mb-16 font-orbitron">
        <span className="text-accent-cyan">{title}</span>
    </h2>
);

const journey = [
    { year: "2021", title: "Started with HTML & CSS", description: "Began my coding journey by exploring classic HTML and CSS, building a strong foundation in web development." },
    { year: "2022", title: "PHP & XAMPP", description: "Dived deep into the Laravel framework, creating robust and scalable applications powered by MySQL." },
    { year: "2024", title: "Embraced the Modern Stack", description: "Transitioned to the JavaScript ecosystem, specializing in Next.js, TypeScript, and Tailwind CSS to deliver high-performance web experiences." },
    { year: "2025", title: "Work Experince", description: "Managed a team of developers for two website projects, ensuring quality, timely delivery, and efficient use of modern web technologies." },
    { year: "Today", title: "Full Stack", description: "Confidently building full-stack solutions using Supabase for backend services, combining the best of modern and traditional web technologies." }
];

const AboutMeSection = () => (
    <AnimatedSection id="about">
        <div className="container mx-auto">
            <SectionHeader title="My Journey" />
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="absolute border-opacity-20 border-accent-cyan/50 h-full border" style={{ left: '50%' }}></div>
                {journey.map((item, index) => (
                    <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-accent-cyan shadow-xl w-8 h-8 bg-gray-100 rounded-full">
                            <h1 className="mx-auto font-semibold text-lg text-black">{index + 1}</h1>
                        </div>
                        <div className="order-1 glass-card bg-gray-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-3 font-bold text-text-light text-xl">{item.title} - <span className="text-accent-cyan">{item.year}</span></h3>
                            <p className="text-sm leading-snug tracking-wide text-text-dark">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const skills = [
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Supabase', icon: <SiSupabase /> },
    { name: 'Laravel', icon: <SiLaravel /> },
    { name: 'PHP', icon: <SiPhp /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'HTML5', icon: <SiHtml5 /> },
];

const SkillsSection = () => (
    <AnimatedSection id="skills">
        <div className="container mx-auto">
            <SectionHeader title="Tech Arsenal" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        className="glass-card p-6 text-center rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:border-accent-cyan hover:shadow-[0_0_15px_theme(colors.accent-cyan)]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="text-5xl mb-4 text-accent-cyan">{skill.icon}</div>
                        <h3 className="text-xl font-semibold text-text-light">{skill.name}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);
const projects = [
    { title: "Student Activity Attendance", description: "A modern web app built with Next.js and Supabase that uses QR codes to record student attendance during school activities — eliminating the need for paper sheets.", image: "/images/SAA.png", liveUrl: "https://student-activity-attendance.vercel.app/" },
    { title: "DUGO (Donor Utility for Giving and Organizing)", description: "A mobile and web app that streamlines the blood donation process through smart tracking, AI support, predictive analytics, and efficient donor–blood bank coordination.", image: "/images/DUGO.png", liveUrl: "https://dugo-system-7ds9.vercel.app/" },
];

const ProjectsSection = () => (
  <AnimatedSection id="projects">
    <div className="container mx-auto">
      <SectionHeader title="Featured Projects" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="glass-card rounded-lg overflow-hidden group relative bg-gray-100"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-text-light">{project.title}</h3>
              <p className="text-text-dark mb-4">{project.description}</p>
              <div className="flex space-x-4">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">View Live</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const galleryImages = [
    { src: "/images/pic7.png", alt: "A scenic view from a hike" },
    { src: "/images/pic3.png", alt: "My coding setup" },
    { src: "/images/pic6.png", alt: "Attending a tech conference" },
    { src: "/images/pic4.png", alt: "Exploring a new city" },
];

const GallerySection = () => (
    <AnimatedSection id="gallery">
        <div className="container mx-auto">
            <SectionHeader title="Glimpses of My World" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {galleryImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="glass-card rounded-lg overflow-hidden group relative aspect-square"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);
const ContactSection = () => (
    <AnimatedSection id="contact">
        <div className="container mx-auto text-center">
            <SectionHeader title="Let's Build Together" />
            <p className="text-text-dark max-w-2xl mx-auto mb-12">
                I'm excited to connect and explore new opportunities. Drop me a message below, or find me on social media.
            </p>
            <motion.form
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for your message. Please note that this form is currently not operational. For any inquiries or correspondence, kindly reach out via my social media channels listed below.");
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        aria-label="Your Name"
                        className="glass-card w-full p-4 rounded-lg border border-accent-cyan/30 focus:border-accent-cyan focus:outline-none bg-primary text-text-light placeholder-text-dark transition-colors"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        aria-label="Your Email"
                        className="glass-card w-full p-4 rounded-lg border border-accent-cyan/30 focus:border-accent-cyan focus:outline-none bg-primary text-text-light placeholder-text-dark transition-colors"
                    />
                </div>
                <textarea
                    placeholder="Your Message"
                    aria-label="Your Message"
                    rows={5}
                    className="glass-card w-full p-4 rounded-lg border border-accent-cyan/30 focus:border-accent-cyan focus:outline-none bg-primary text-text-light placeholder-text-dark transition-colors mb-6"
                ></textarea>
                <button
                    type="submit"
                    className="glow-button w-full md:w-auto bg-primary text-text-light font-semibold py-3 px-10 rounded-full border border-accent-cyan cursor-pointer"
                >
                    <span className="flex items-center justify-center gap-3">
                        <FiMail /> Send Message
                    </span>
                </button>
            </motion.form>
            <div className="flex justify-center space-x-8 text-4xl mt-16">
              <a href="https://github.com/christianmaglangit" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-cyan transition-colors">
                  <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/christian-maglangit-8b65b8288/" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-cyan transition-colors">
                  <FiLinkedin />
              </a>
              <a href="https://www.facebook.com/christian.bmaglangit/" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-cyan transition-colors">
                  <FiFacebook />
              </a>
              <a href="https://www.instagram.com/chan_maglangit/" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-cyan transition-colors">
                  <FiInstagram />
              </a>
          </div>
        </div>
    </AnimatedSection>
);

const Footer = () => (
    <footer className="bg-primary py-6 text-center text-text-dark border-t border-accent-cyan/20">
        <p>&copy; {new Date().getFullYear()} Christian B. Maglangit. Designed & Built with Passion.</p>
    </footer>
);

const PortfolioPage: NextPage = () => {
    return (
        <div className="bg-gray-200 relative">
            <Header />
            <main>
                <HeroSection />
                <AboutMeSection />
                <SkillsSection />
                <ProjectsSection />
                <GallerySection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

export default PortfolioPage;
"use client";

import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiCode, FiBriefcase, FiHome, FiUser, FiPhone, FiCamera, FiFacebook, FiInstagram, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SiNextdotjs, SiTypescript, SiSupabase, SiPhp, SiLaravel, SiMysql, SiTailwindcss, SiHtml5 } from 'react-icons/si';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INITIALIZATION ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
                        <span className="text-text-light dark:text-black">My Portfolio</span>
                    </Link>
                </div>
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                         <li key={link.name}>
                            <Link to={link.to} smooth={true} duration={500} spy={true} activeClass="text-accent-cyan" className="cursor-pointer hover:text-accent-cyan transition-colors flex items-center gap-2 dark:text-black">
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
        <section id="home" className="dark:text-black min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
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
                                width={256}
                                height={256}
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
        <div className="container mx-auto dark:text-black">
            <SectionHeader title="My Journey" />
            <div className="relative wrap overflow-hidden p-4 md:p-10">
                <div className="absolute h-full border-2 border-opacity-20 border-accent-cyan/50 left-4 md:left-1/2 -translate-x-px md:-translate-x-1/2"></div>
                {journey.map((item, index) => (
                    <div 
                        key={index}
                        className={`mb-8 flex items-center w-full relative ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} md:justify-between`}
                    >
                        <div className="hidden md:block md:w-5/12"></div>
                        <div className="z-20 flex items-center justify-center order-1 dark:bg-gray-200 bg-accent-cyan shadow-xl w-8 h-8 rounded-full absolute left-4 -translate-x-4 md:relative md:left-auto md:translate-x-0">
                            <h1 className="mx-auto font-semibold text-lg text-white dark:text-black">{index + 1}</h1>
                        </div>
                        <div className="order-1 bg-white dark:bg-secondary rounded-lg shadow-xl w-full ml-10 md:w-5/12 md:ml-0 px-6 py-4">
                            <h3 className="mb-3 font-bold text-gray-900 dark:text-text-light text-xl">
                                {item.title} - <span className="text-accent-cyan">{item.year}</span>
                            </h3>
                            <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-black">
                                {item.description}
                            </p>
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
        <div className="container mx-auto dark:text-black">
            <SectionHeader title="Crafting with Code" />
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

// --- BUG FIXED: Gi-ilis ang `image` to `images` sa ika-3 nga project ---
const projects = [
    { 
        title: "Student Activity Attendance", 
        description: "A modern web app built with Next.js and Supabase that uses QR codes to record student attendance during school activities — eliminating the need for paper sheets.", 
        images: ["/images/SAA.png"],
        liveUrl: "https://attendance-portal-cheave.vercel.app/" 
    },
    { 
        title: "DUGO (Donor Utility for Giving and Organizing)", 
        description: "A mobile and web app that streamlines the blood donation process through smart tracking, AI support, predictive analytics, and efficient donor–blood bank coordination.", 
        images: ["/images/DUGO.png"],
        liveUrl: "https://dugosystem.vercel.app/" 
    },
    { 
        title: "Personal and Computer Parts Inventory System", 
        description: "A web-based inventory management system designed to organize and monitor personal items and computer parts efficiently. Features include stock tracking, item categorization, and real-time inventory updates using Next.js, tailwindcss for styling and Supabase for data storage.", 
        images: ["/images/mvcis.png", "/images/mvcis-login.png"], // <-- Dinhi to ang error sauna, fixed na!
        liveUrl: "https://mvc-is.vercel.app/" 
    },
];

const ProjectCard = ({ project, offset, nextSlide, prevSlide }: { project: any, offset: number, nextSlide: () => void, prevSlide: () => void }) => {
    const isCenter = offset === 0;
    const [imgIndex, setImgIndex] = useState(0);

    // Safety check just in case 'images' is empty or undefined
    const hasImages = project.images && project.images.length > 0;
    const currentImage = hasImages ? project.images[imgIndex] : "";

    const nextImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasImages) {
            setImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
        }
    };

    const prevImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasImages) {
            setImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
        }
    };

    return (
        <motion.div
            initial={false}
            animate={{
                x: offset === 0 ? "0%" : offset > 0 ? "55%" : "-55%",
                scale: offset === 0 ? 1 : 0.85,
                opacity: offset === 0 ? 1 : Math.abs(offset) > 1 ? 0 : 0.5,
                filter: offset === 0 ? "blur(0px)" : "blur(6px)",
                zIndex: offset === 0 ? 30 : 10,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute top-0 bottom-0 my-auto w-[85%] md:w-[600px] h-[400px] md:h-[500px] glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/40 cursor-pointer ${isCenter ? '' : 'hover:opacity-70'}`}
            onClick={() => {
                if (offset > 0) nextSlide();
                if (offset < 0) prevSlide();
            }}
        >
            <div className="flex flex-col h-full bg-white/40 backdrop-blur-md">
                
                {/* --- INNER IMAGE SLIDER --- */}
                <div className="relative w-full h-48 md:h-64 group bg-black/10">
                    {hasImages && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={imgIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image 
                                    src={currentImage} 
                                    alt={`${project.title} - Image ${imgIndex + 1}`} 
                                    fill
                                    className="object-cover" 
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {isCenter && hasImages && project.images.length > 1 && (
                        <>
                            <button 
                                onClick={prevImg} 
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-accent-cyan shadow-md"
                            >
                                <FiChevronLeft size={18} />
                            </button>
                            <button 
                                onClick={nextImg} 
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-accent-cyan shadow-md"
                            >
                                <FiChevronRight size={18} />
                            </button>
                            
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-10">
                                {project.images.map((_: any, idx: number) => (
                                    <div 
                                        key={idx} 
                                        className={`h-1.5 rounded-full shadow-md transition-all duration-300 ${idx === imgIndex ? 'w-4 bg-accent-cyan' : 'w-1.5 bg-white/70'}`} 
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* TEXT INFO */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{project.title}</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">{project.description}</p>
                    </div>
                    <div className={`transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent-cyan font-semibold hover:underline flex items-center gap-1 w-max">
                            View Live <FiArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
    };

    const getOffset = (index: number) => {
        let offset = index - currentIndex;
        const total = projects.length;
        if (offset > Math.floor(total / 2)) offset -= total;
        else if (offset < -Math.floor(total / 2)) offset += total;
        return offset;
    };

    return (
        <AnimatedSection id="projects">
            <div className="container mx-auto dark:text-black">
                <SectionHeader title="Featured Projects" />
                
                <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
                    
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            offset={getOffset(index)} 
                            nextSlide={nextSlide} 
                            prevSlide={prevSlide} 
                        />
                    ))}

                    <button 
                        onClick={prevSlide} 
                        className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-accent-cyan p-3 rounded-full shadow-lg border border-gray-200 hover:scale-110 hover:bg-accent-cyan hover:text-white transition-all z-40"
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    
                    <button 
                        onClick={nextSlide} 
                        className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-accent-cyan p-3 rounded-full shadow-lg border border-gray-200 hover:scale-110 hover:bg-accent-cyan hover:text-white transition-all z-40"
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>

                <div className="flex justify-center mt-6 space-x-3">
                    {projects.map((_, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setCurrentIndex(idx)} 
                            className={`h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-accent-cyan' : 'w-3 bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const galleryImages = [
    { src: "/images/pic7.png", alt: "A scenic view from a hike" },
    { src: "/images/pic3.png", alt: "My coding setup" },
    { src: "/images/pic6.png", alt: "Attending a tech conference" },
    { src: "/images/pic4.png", alt: "Exploring a new city" },
];

const GallerySection = () => (
    <AnimatedSection id="gallery">
        <div className="container mx-auto dark:text-black">
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

const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const emailResponse = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "IMONG_WEB3FORMS_ACCESS_KEY_DIRI", // I-PASTE DIRI ANG IMONG KEY
                    subject: `New Portfolio Message from ${name}`,
                    from_name: name,
                    email: email,
                    message: message,
                }),
            });

            const emailResult = await emailResponse.json();

            if (emailResult.success) {
                const { error: supabaseError } = await supabase
                    .from('messages') 
                    .insert([{ name, email, message }]);

                if (supabaseError) {
                    console.error('Email sent but Supabase backup failed:', supabaseError);
                }

                setSubmitStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                console.error('Error sending email:', emailResult);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('System error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatedSection id="contact">
            <div className="container mx-auto text-center dark:text-black">
                <SectionHeader title="Let's Build Together" />
                <p className="text-text-dark max-w-2xl mx-auto mb-12">
                    I&apos;m excited to connect and explore new opportunities. Drop me a message below, or find me on social media.
                </p>
                <motion.form
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            aria-label="Your Name"
                            className="dark:text-black glass-card w-full p-4 rounded-lg border border-accent-cyan/30 focus:border-accent-cyan focus:outline-none bg-primary text-text-light placeholder-text-dark transition-colors"
                        />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            aria-label="Your Email"
                            className="glass-card w-full p-4 rounded-lg border border-accent-cyan/30 focus:border-accent-cyan focus:outline-none bg-primary text-text-light placeholder-text-dark transition-colors"
                        />
                    </div>
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Message"
                        aria-label="Your Message"
                        rows={5}
                        className="glass-card w-full p-4 rounded-lg border border-accent-cyan/30 focus:border-accent-cyan focus:outline-none bg-primary text-text-light placeholder-text-dark transition-colors mb-6"
                    ></textarea>
                    
                    {submitStatus === 'success' && (
                        <p className="text-green-500 mb-4 font-semibold">Message sent successfully! I'll get back to you soon.</p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="text-red-500 mb-4 font-semibold">Oops! Something went wrong. Please try again.</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`glow-button w-full md:w-auto bg-primary text-text-light font-semibold py-3 px-10 rounded-full border border-accent-cyan transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-accent-cyan hover:text-white'}`}
                    >
                        <span className="flex items-center justify-center gap-3">
                            <FiMail /> {isSubmitting ? 'Sending...' : 'Send Message'}
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
};

const Footer = () => (
    <footer className="dark:text-black bg-primary py-6 text-center text-text-dark border-t border-accent-cyan/20">
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
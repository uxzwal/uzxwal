import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  FaGithub, FaInstagram, FaLinkedin, FaBriefcase, FaCode, FaCertificate,
  FaTelegram, FaDiscord, FaReddit, FaStackOverflow, FaDev, FaQuora, 
  FaMedium, FaFacebook, FaTumblr
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiNotion } from 'react-icons/si';
import Spline from '@splinetool/react-spline';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import Lanyard from '../components/Lanyard/Lanyard';
import { VelocityScroll } from '../components/VelocityScroll';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';

const socialHandles = [
  { name: 'GitHub', url: 'https://github.com/uxzwal', icon: <FaGithub />, color: '#ffffff', glow: '#ffffff' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/uxzwal', icon: <FaLinkedin />, color: '#0077b5', glow: '#0077b5' },
  { name: 'Twitter/X', url: 'https://x.com/uxzwalll', icon: <FaXTwitter />, color: '#ffffff', glow: '#ffffff' },
  { name: 'Instagram', url: 'https://www.instagram.com/uxzwal/', icon: <FaInstagram />, color: '#e1306c', glow: '#e1306c' },
  { name: 'Discord', url: 'https://discord.com/users/1196009261612933150', icon: <FaDiscord />, color: '#5865f2', glow: '#5865f2' },
  { name: 'Telegram', url: 'https://t.me/uxwal', icon: <FaTelegram />, color: '#0088cc', glow: '#0088cc' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/Historical-Pie-9196/', icon: <FaReddit />, color: '#ff4500', glow: '#ff4500' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/29480233/ujjwal', icon: <FaStackOverflow />, color: '#f48024', glow: '#f48024' },
  { name: 'Dev.to', url: 'https://dev.to/uxzwal', icon: <FaDev />, color: '#ffffff', glow: '#ffffff' },
  { name: 'Notion', url: 'https://uxzwal.notion.site/About-Ujjwal-2e92217839ed808499e3f23ff8e9434f', icon: <SiNotion />, color: '#ffffff', glow: '#ffffff' },
  { name: 'Quora', url: 'https://www.quora.com/profile/Ghost-8186', icon: <FaQuora />, color: '#b92b27', glow: '#b92b27' },
  { name: 'Medium', url: 'https://medium.com/@uxzwal', icon: <FaMedium />, color: '#ffffff', glow: '#ffffff' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100070625400647', icon: <FaFacebook />, color: '#1877f2', glow: '#1877f2' },
  { name: 'Tumblr', url: 'https://www.tumblr.com/blog/uxzwal', icon: <FaTumblr />, color: '#35465c', glow: '#35465c' }
];

const Home = () => {
    const { theme } = useTheme();

    const [is3dEnabled, setIs3dEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth < 1024;
            return !isMobile && !isSmallScreen;
        }
        return true;
    });

    const toggle3dAssets = () => {
        setIs3dEnabled(prev => !prev);
    };

    const stats = [
        { icon: <FaCode />, value: "5+", title: "IBM CERTIFICATES", description: "Containers, Kubernetes & Istio" },
        { icon: <FaCertificate />, value: "3+", title: "DEVOPS PROJECTS", description: "CI/CD, Docker & Cloud" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-8 max-w-7xl mx-auto"
        >
            <button
                onClick={toggle3dAssets}
                title={`Toggle 3D Assets (${is3dEnabled ? 'On' : 'Off'})`}
                className={`fixed top-24 right-4 z-50 p-3 rounded-full border backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110
          ${is3dEnabled
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_2px_#00ffdc80]'
                        : 'dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400 bg-white border-slate-200 text-slate-600 shadow-sm'
                    }`}
            >
                <FaCube className="h-5 w-5" />
            </button>

            <section id="home" className="flex flex-col md:flex-row items-center gap-10 pt-20 pb-16 lg:pt-0 lg:pb-20">
                <div className="flex-1 dark:text-white text-slate-800 space-y-6 pt-16 md:pt-40 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
                        <AnimatedGradientTextDemo />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                        className="text-4xl md:text-4xl font-moderniz font-bold leading-tight select-none main-heading"
                        style={{
                            color: theme === 'dark' ? "#00ffdc" : "#0f172a",
                            textShadow: theme === 'dark'
                                ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc"
                                : "none"
                        }}
                    >
                        WELCOME TO MY
                        <span style={{ display: 'block', marginTop: '0.4em' }}>PORTFOLIO</span>
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <GradientText colors={["#40f2ffff", "#4079ff", "#40fffcff", "#4079ff", "#40f9ffff"]} animationSpeed={3} className="custom-class font-cascadia font-bold" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}>
                        <TextGenerateEffect words={'Containers | CI/CD | Cloud Infrastructure | Linux'} />
                    </motion.div>
                    {/* 3D Social Badge Deck */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-8 w-full max-w-2xl px-2">
                        {socialHandles.map((handle, index) => (
                            <motion.a
                                key={handle.name}
                                href={handle.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={handle.name}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 + index * 0.04 }}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.08,
                                    rotateX: 10,
                                    rotateY: -10,
                                    boxShadow: `0 15px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${handle.glow}40`
                                }}
                                className="group relative flex flex-col items-center justify-center p-3 rounded-xl border dark:border-white/10 border-slate-200 dark:bg-[#070708]/85 bg-white backdrop-blur-md transition-all duration-300 dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)] shadow-md text-slate-400 dark:text-slate-300 hover:text-white dark:hover:border-cyan-400 hover:border-cyan-500 cursor-pointer"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px'
                                }}
                            >
                                <div 
                                    className="text-2xl mb-1.5 transition-transform duration-300 group-hover:scale-110"
                                    style={{ 
                                        color: handle.color,
                                        filter: `drop-shadow(0 0 6px ${handle.glow}60)`
                                    }}
                                >
                                    {handle.icon}
                                </div>
                                <span className="text-[9px] font-cascadia tracking-wider uppercase font-semibold text-slate-500 group-hover:text-white transition-colors duration-300">
                                    {handle.name}
                                </span>
                                {/* Glossy Sheen Overlay */}
                                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* 3. Render Lanyard secara kondisional */}
                <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full order-first lg:order-none">
                    {is3dEnabled && (
                        <ErrorBoundary fallback={<div className="flex items-center justify-center text-slate-400 text-sm font-cascadia border border-slate-800/30 rounded-2xl w-full h-[500px]">3D visualizer loading error</div>}>
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                        </ErrorBoundary>
                    )}
                </div>
            </section>

            <section
                id="about"
                className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
                style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
            >
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-20">
                        <VelocityScroll defaultVelocity={3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#00ffdc" : "#0891b2", textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                ABOUT <span style={{ color: theme === 'dark' ? "#fff" : "#0891b2" }}>ME</span>
                            </span>
                        </VelocityScroll>
                        <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r ${theme === 'dark' ? 'from-[#000000]' : 'from-slate-50'}`}></div>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l ${theme === 'dark' ? 'from-[#000000]' : 'from-slate-50'}`}></div>
                        <VelocityScroll defaultVelocity={-3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#00ffdc" : "#0891b2", textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                ABOUT <span style={{ color: theme === 'dark' ? "#fff" : "#0891b2" }}>ME</span>
                            </span>
                        </VelocityScroll>
                    </div>
                    <p className="text-lg dark:text-cyan-200/70 text-slate-600 mt-2 font-cascadia px-1 mb-20">
                        ✧ Passionate about coding and creative technology ✧
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    {is3dEnabled && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            className="md:w-1/3 flex justify-center"
                        >
                            <div className="w-full h-[420px] md:h-[530px] flex items-center justify-center relative overflow-hidden">
                                <ErrorBoundary fallback={<div className="flex items-center justify-center text-slate-400 text-sm font-cascadia border border-slate-800/30 rounded-2xl w-full h-[400px]">3D model loading error</div>}>
                                    <Spline scene="https://prod.spline.design/FcZ66SFMX1YbF-0I/scene.splinecode" />
                                </ErrorBoundary>
                                {/* Hide Spline watermark */}
                                <div className="absolute bottom-0 right-0 w-52 h-10 dark:bg-[#000000] bg-slate-50 z-10" />
                            </div>
                        </motion.div>
                    )}


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className={`dark:text-white text-slate-800 text-center md:text-left px-4 md:px-8 transition-all duration-700 ${is3dEnabled ? 'md:w-1/2' : 'md:w-2/3'}`}
                    >
                        <p className="text-2xl dark:text-gray-300 text-slate-500 font-moderniz my" style={{ textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none" }}>hello i'm</p>
                        <h3 className="text-4xl font-bold dark:text-white text-slate-900 my-2 font-moderniz" style={{ textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none" }}>ujjwal</h3>
                        <p className="dark:text-white/80 text-slate-600 leading-relaxed mt-4 font-cascadia text-justify">
                            DevOps Engineer with hands-on experience in containerization, CI/CD automation, and cloud-native technologies. Proficient in Docker, GitHub Actions, Linux administration, and Kubernetes fundamentals, with IBM-certified expertise in Containers, Kubernetes, and Istio on IBM Cloud.
                        </p>
                        <div className="my-6 dark:bg-slate-900/50 bg-slate-50 border-l-4 dark:border-[#00ffdc] border-cyan-600 p-4 rounded-r-lg italic dark:text-white/70 text-slate-700 font-cascadia dark:shadow-none shadow-md">
                            "Automate everything. Reliable infrastructure is the foundation of great software."
                        </div>
                        <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                            <ButtonMovingBorder as="a" href="#projects" duration={3000} borderRadius="0.75rem" className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]">
                                <FaBriefcase /> View Projects
                            </ButtonMovingBorder>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10 px-4 md:px-0">
                    {stats.map((stat, index) => (
                        <div key={index} className="group relative p-6 rounded-2xl dark:bg-slate-900/90 bg-white border dark:border-slate-700/50 border-slate-200 dark:shadow-none shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-xl dark:hover:shadow-[0_0_24px_0px_#00ffdc50] cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <div className="p-3 mb-4 rounded-full dark:bg-slate-800/80 bg-slate-50 border dark:border-slate-700/60 border-slate-100 w-max dark:group-hover:bg-cyan-900/50 group-hover:bg-cyan-50 group-hover:border-cyan-200 transition-all duration-300">
                                        <div className="text-2xl dark:text-slate-400 text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">{stat.icon}</div>
                                    </div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 group-hover:text-cyan-700 dark:group-hover:text-slate-300 transition-colors duration-300">{stat.title}</h3>
                                    <p className="text-xs dark:text-slate-500 text-slate-400 mt-1">{stat.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-5xl font-bold dark:text-white text-slate-900 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300">{stat.value}</p>
                                    <FaArrowRight className="text-slate-400 mt-auto group-hover:text-cyan-500 transition-all duration-300 -rotate-45" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            <section id="projects" className="md:py-18">
                <ProjectSection />
            </section>

            <section id="contact" className="py-20 pb-16">
                <Contact />
            </section>

            <footer className="py-12 pb-16 text-center text-gray-400 dark:bg-gradient-to-t dark:from-slate-900/50 dark:to-transparent bg-gradient-to-t from-slate-100/50 to-transparent">
                <div className="text-sm">© {new Date().getFullYear()} Ujjwal Kumar. All rights reserved.</div>
                <div className="text-xs mt-2">Built with <span className="text-red-500">♥</span> using React, Tailwind CSS, and Framer Motion.</div>
            </footer>
        </motion.div>
    );
};

export default Home;

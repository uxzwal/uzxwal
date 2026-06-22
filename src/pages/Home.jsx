import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';

gsap.registerPlugin(ScrollTrigger);

const BracketButton = ({ children, href }) => {
  const btnRef = useRef(null);
  
  useGSAP(() => {
    const btn = btnRef.current;
    
    // Add hover animation with GSAP for extreme smoothness
    const hoverTl = gsap.timeline({ paused: true })
      .to(btn, { paddingLeft: "40px", paddingRight: "40px", duration: 0.4, ease: "power3.out" })
      .to(btn.querySelectorAll('.bracket'), { borderColor: "#f3f3f3", duration: 0.3 }, 0);

    btn.addEventListener("mouseenter", () => hoverTl.play());
    btn.addEventListener("mouseleave", () => hoverTl.reverse());
    
    return () => {
      btn.removeEventListener("mouseenter", () => hoverTl.play());
      btn.removeEventListener("mouseleave", () => hoverTl.reverse());
    };
  }, { scope: btnRef });

  return (
    <a ref={btnRef} href={href} className="relative inline-flex items-center justify-center px-8 py-4 text-[#f3f3f3] uppercase tracking-widest text-[14px]">
      <div className="bracket absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f3f3f3]/30 rounded-tl"></div>
      <div className="bracket absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f3f3f3]/30 rounded-tr"></div>
      <div className="bracket absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f3f3f3]/30 rounded-bl"></div>
      <div className="bracket absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f3f3f3]/30 rounded-br"></div>
      <span className="font-semibold z-10">{children}</span>
    </a>
  );
};

const Home = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Hero Animation
        const tl = gsap.timeline();
        
        tl.from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        })
        .from(".hero-title-char", {
            y: 150,
            opacity: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
            clipPath: "inset(100% 0 0 0)"
        }, "-=0.8")
        .from(".hero-desc", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".hero-btns", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".global-bracket", {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.5)"
        }, "-=1");

        // Scroll Animations for sections
        const sections = gsap.utils.toArray('.scroll-section');
        sections.forEach(sec => {
            gsap.from(sec, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Parallax for hero text on scroll
        gsap.to(".hero-content", {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: containerRef });

    // Split text into letters for the Loris Bukvic effect
    const heroTitle = "Ujjwal Kumar".split("");

    return (
        <div ref={containerRef} className="w-full bg-[#000000] min-h-screen text-[#a6a6a6] font-sans">
            {/* Hero Section */}
            <section id="home" className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
                <div className="hero-content flex flex-col items-center gap-12 w-full max-w-7xl relative z-10">
                    <div className="space-y-4">
                        <h2 className="hero-subtitle text-[14px] md:text-[18px] text-[#808080] uppercase tracking-[0.2em] font-medium">
                            DevOps Engineer
                        </h2>
                        <h1 className="flex justify-center text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-bold text-[#f3f3f3] leading-[0.85] tracking-tighter uppercase whitespace-nowrap overflow-hidden py-4">
                            {heroTitle.map((char, index) => (
                                <span key={index} className="hero-title-char inline-block" style={{ clipPath: "inset(0 0 0 0)" }}>
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </h1>
                    </div>
                    
                    <p className="hero-desc max-w-2xl text-[18px] md:text-[23px] text-[#a6a6a6] leading-[1.4] font-light">
                        Containers | CI/CD | Cloud Infrastructure | Linux
                    </p>

                    <div className="hero-btns flex flex-col sm:flex-row gap-8 mt-8">
                        <BracketButton href="#projects">View Projects</BracketButton>
                        <BracketButton href="#contact">Get In Touch</BracketButton>
                    </div>
                </div>

                {/* Corner Frame Global */}
                <div className="global-bracket absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-[#f3f3f3]/20 hidden md:block"></div>
                <div className="global-bracket absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-[#f3f3f3]/20 hidden md:block"></div>
                <div className="global-bracket absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-[#f3f3f3]/20 hidden md:block"></div>
                <div className="global-bracket absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-[#f3f3f3]/20 hidden md:block"></div>
            </section>

            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <section id="about" className="scroll-section py-32 border-t border-[#e5e7eb]/20">
                    <div className="flex flex-col md:flex-row gap-16 md:gap-32">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[14px] text-[#808080] uppercase tracking-widest sticky top-32">
                                (01) — About
                            </h2>
                        </div>
                        <div className="w-full md:w-2/3 space-y-10">
                            <h3 className="text-[28px] md:text-[42px] text-[#f3f3f3] leading-[1.1] font-semibold tracking-tight">
                                Automate everything. Reliable infrastructure is the foundation of great software.
                            </h3>
                            <p className="text-[18px] text-[#a6a6a6] leading-[1.5] max-w-2xl">
                                DevOps Engineer with hands-on experience in containerization, CI/CD automation, and cloud-native technologies. Proficient in Docker, GitHub Actions, Linux administration, and Kubernetes fundamentals, with IBM-certified expertise in Containers, Kubernetes, and Istio on IBM Cloud.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="projects" className="scroll-section py-32 border-t border-[#e5e7eb]/20">
                    <ProjectSection />
                </section>

                <section id="contact" className="scroll-section py-32 border-t border-[#e5e7eb]/20">
                    <Contact />
                </section>
            </div>
            
            <footer className="py-8 border-t border-[#e5e7eb]/20 flex items-center justify-center">
                <p className="text-[12px] text-[#808080] uppercase tracking-widest">
                    © {new Date().getFullYear()} Ujjwal Kumar. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Home;

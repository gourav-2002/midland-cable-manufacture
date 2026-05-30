import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Award, 
  Globe, 
  Users, 
  Leaf, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Package, 
  Flame, 
  Settings2, 
  Truck, 
  ArrowRight 
} from 'lucide-react';

// Reusable Count-up animation using Intersection Observer for statistics
const InlineCounter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start: number | null = null;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / 2000, 1);
            // Cubic ease-out calculation for premium ease transition
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.1 });

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [target, hasAnimated]);

  return <span ref={elementRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Stateless component wrapper for specific timeline event interactions
const TimelineEvent: React.FC<{ event: { year: string; title: string; desc: string }; index: number }> = ({ event, index }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={elementRef}
      className={`relative flex flex-col md:grid md:grid-cols-9 md:gap-8 items-center py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Desktop Left Side */}
      <div className={`md:col-span-4 ${isLeft ? 'md:text-right' : 'hidden md:block'}`} id={`timeline-card-left-${index}`}>
        {isLeft && (
          <div className="space-y-2">
            <span className="bg-[#B08D57] text-white text-xs font-bold px-4 py-1.5 inline-block font-display uppercase tracking-[0.2em] rounded-none shadow-sm">
              {event.year}
            </span>
            <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
              {event.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-body max-w-sm md:ml-auto">
              {event.desc}
            </p>
          </div>
        )}
      </div>

      {/* Middle Dot / Connector */}
      <div className="md:col-span-1 flex justify-center sticky" id={`timeline-dot-container-${index}`}>
        <div 
          className={`w-4 h-4 rounded-full bg-[#B08D57] border-4 border-[#F7F7F7] z-10 shadow transition-transform duration-700 ${isVisible ? 'scale-100' : 'scale-0'}`}
        />
      </div>

      {/* Desktop Right Side / Mobile Layout wrapper */}
      <div className={`col-span-1 md:col-span-4 pl-12 md:pl-0 ${!isLeft ? '' : 'md:hidden'}`} id={`timeline-card-right-${index}`}>
        {!isLeft ? (
          <div className="space-y-2">
            <span className="bg-[#B08D57] text-white text-xs font-bold px-4 py-1.5 inline-block font-display uppercase tracking-[0.2em] rounded-none shadow-sm">
              {event.year}
            </span>
            <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
              {event.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-body max-w-sm">
              {event.desc}
            </p>
          </div>
        ) : (
          /* Mobile output fall-through for Left items */
          <div className="space-y-2">
            <span className="bg-[#B08D57] text-white text-xs font-bold px-4 py-1.5 inline-block font-display uppercase tracking-[0.2em] rounded-none shadow-sm">
              {event.year}
            </span>
            <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
              {event.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-body max-w-sm">
              {event.desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function About() {
  // Intersection Observer for the overall scroll reveal sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleScrollToContent = () => {
    const targetElement = document.getElementById('company-intro-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const timelineEvents = [
    { year: '1999', title: 'The Beginning', desc: 'Midland Cable Manufacture founded with a single copper rod drawing machine and a vision for quality.' },
    { year: '2003', title: 'First Export', desc: 'Expanded beyond domestic markets with our first international export order to the Middle East.' },
    { year: '2008', title: 'ISO Certification', desc: 'Achieved ISO 9001 certification marking our commitment to international quality management standards.' },
    { year: '2012', title: 'Facility Expansion', desc: 'Doubled our manufacturing capacity with a state-of-the-art new production facility and modern equipment.' },
    { year: '2016', title: 'Global Reach', desc: 'Crossed the milestone of exporting to 25+ countries with a dedicated global logistics and documentation team.' },
    { year: '2020', title: 'Product Range Expansion', desc: 'Launched complete copper products range including sheets, tubes, coils and precision components.' },
    { year: '2024', title: '40+ Countries', desc: 'Today Midland serves 500+ clients across 40+ countries as a globally recognized premium copper manufacturer.' }
  ];

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="about-us-overall-container">
      {/* Absolute CSS styled animations injection for bulletproof performance */}
      <style>{`
        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes downBounce {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(10px); 
          }
        }

        .animate-fade-up-0 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0ms;
        }

        .animate-fade-up-100 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 100ms;
          opacity: 0;
        }

        .animate-fade-up-200 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 200ms;
          opacity: 0;
        }

        .animate-fade-up-300 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 300ms;
          opacity: 0;
        }

        .animate-fade-up-400 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 400ms;
          opacity: 0;
        }

        .animate-fade-up-500 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 500ms;
          opacity: 0;
        }

        .animate-fade-up-600 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 600ms;
          opacity: 0;
        }

        .lh-bounce {
          animation: downBounce 2s infinite ease-in-out;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* SECTION 1 - CINEMATIC HERO */}
      <section className="relative min-h-screen bg-[#111111] grid grid-cols-1 lg:grid-cols-2" id="about-hero">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-24 relative select-none" id="hero-left">
          <div className="max-w-xl space-y-6" id="hero-left-vertical-center">
            {/* Small Top Breadcrumb */}
            <div className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold animate-fade-up-0" id="hero-meta-breadcrumb">
              HOME &gt; ABOUT US
            </div>

            {/* H1 Stacked Editorial Lines */}
            <h1 className="font-display font-black leading-none uppercase tracking-tight" id="hero-main-title">
              <span className="block text-2xl text-gray-400 font-semibold animate-fade-up-100 mb-1">
                Our Story
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white animate-fade-up-200">
                Built on
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white animate-fade-up-300">
                25 Years of
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#B08D57] animate-fade-up-400 mt-1">
                Excellence.
              </span>
            </h1>

            {/* Bronze Divider */}
            <div className="w-16 h-px bg-[#B08D57] my-10 animate-fade-up-500" id="about-divider" />

            {/* Paragraph Text */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-sm font-body animate-fade-up-600 font-light" id="about-hero-paragraph">
              From a single workshop to a globally recognized copper manufacturer — our journey has been defined by relentless pursuit of quality.
            </p>
          </div>

          {/* Absolute bottom scrolling pointer */}
          <button 
            onClick={handleScrollToContent}
            className="absolute bottom-10 left-8 sm:left-16 lg:left-20 lh-bounce flex items-center gap-1.5 cursor-pointer text-[#B08D57] hover:scale-105 transition-transform"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-5 h-5 text-[#B08D57]" />
            <span className="text-[10px] tracking-widest font-display font-semibold uppercase">Scroll Down</span>
          </button>
        </div>

        {/* Right Side Image (Full block h-full w-full) */}
        <div className="relative h-96 lg:h-full w-full" id="hero-right">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200" 
            alt="Midland heavy production hot mill casting"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* SECTION 2 - COMPANY INTRO FULL WIDTH */}
      <section className="bg-white py-32 px-6 reveal" id="company-intro-section">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold block" id="intro-subtitle">
            Who We Are
          </span>
          
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#111111] leading-tight max-w-4xl mx-auto uppercase tracking-wide" id="intro-editorial-head">
            Midland Cable Manufacture is a premium global copper products manufacturer delivering quality, precision and reliability to industries across 40+ countries worldwide.
          </h2>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-body font-light" id="intro-descriptive-body">
            Founded with a vision to set new standards in copper manufacturing, we have grown into a trusted partner for electrical contractors, construction companies, automotive manufacturers, energy providers and infrastructure developers around the world.
          </p>

          <div className="w-16 h-px bg-[#B08D57] mx-auto mt-12" id="intro-closing-line" />
        </div>
      </section>

      {/* SECTION 3 - STORY TIMELINE */}
      <section className="bg-[#F7F7F7] py-24 px-6 reveal" id="story-timeline-section">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Section Headers */}
          <div className="text-center mb-20 space-y-3" id="timeline-decor">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold block uppercase">
              OUR JOURNEY
            </span>
            <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
              Two Decades of Growth
            </h2>
          </div>

          {/* Alternating vertical connection line */}
          <div className="relative" id="journey-timeline-rail">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#B08D57]/30" />

            {/* Timeline Row blocks Alternator */}
            <div className="space-y-4" id="timeline-events-deck">
              {timelineEvents.map((ev, index) => (
                <TimelineEvent key={ev.year} event={ev} index={index} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 - SPLIT IMAGE CONTENT */}
      <section className="bg-white py-0 overflow-hidden" id="about-split-image-content-deck">
        
        {/* ROW 1: Image left, Content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch reveal" id="split-row-1">
          {/* Image Side */}
          <div className="relative h-[400px] lg:h-auto min-h-[500px]" id="row-1-image">
            <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900" 
              alt="Midland Grade A copper drawing"
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Content Side */}
          <div className="bg-white px-8 sm:px-16 lg:px-24 py-20 flex flex-col justify-center" id="row-1-content">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold font-display block">
              OUR MISSION
            </span>
            
            <h2 className="font-display font-black text-4xl text-[#111111] leading-tight mt-4 uppercase tracking-tight">
              Powering the World with Premium Copper
            </h2>

            <div className="w-12 h-1 bg-[#B08D57] my-8" id="row-1-divider" />

            <div className="space-y-4 text-gray-600 leading-relaxed font-body text-sm sm:text-base font-light" id="row-1-paragraphs">
              <p>
                Our mission is to be the most trusted copper manufacturer in the world by delivering products that exceed international quality standards on every order.
              </p>
              <p>
                We achieve this through continuous investment in technology, people and processes — ensuring every copper rod, wire, sheet, tube, coil and component that leaves our facility is perfect.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-3 mt-10" id="row-1-checklist">
              <div className="flex items-center gap-4 py-1">
                <CheckCircle className="w-5 h-5 text-[#B08D57] shrink-0" />
                <span className="text-gray-700 text-sm font-body font-medium uppercase tracking-wide">Grade A copper materials only</span>
              </div>
              <div className="flex items-center gap-4 py-1">
                <CheckCircle className="w-5 h-5 text-[#B08D57] shrink-0" />
                <span className="text-gray-700 text-sm font-body font-medium uppercase tracking-wide">100% quality tested before dispatch</span>
              </div>
              <div className="flex items-center gap-4 py-1">
                <CheckCircle className="w-5 h-5 text-[#B08D57] shrink-0" />
                <span className="text-gray-700 text-sm font-body font-medium uppercase tracking-wide">Full material test certificates provided</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Content left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch reveal" id="split-row-2">
          {/* Content Side (Dark style #111111) */}
          <div className="bg-[#111111] px-8 sm:px-16 lg:px-24 py-20 flex flex-col justify-center order-2 lg:order-1" id="row-2-content">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold font-display block">
              OUR VISION
            </span>

            <h2 className="font-display font-black text-4xl text-white leading-tight mt-4 uppercase tracking-tight">
              A Global Leader in Copper Innovation
            </h2>

            <div className="w-12 h-1 bg-[#B08D57] my-8" id="row-2-divider" />

            <p className="text-gray-300 leading-relaxed font-body text-sm sm:text-base font-light mb-10">
              Our vision is to be the global benchmark for copper manufacturing excellence — setting standards that others aspire to and building partnerships that last decades.
            </p>

            {/* Vision points grid */}
            <div className="space-y-6" id="row-2-vision-points">
              {/* Point 1 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#B08D57] text-[#B08D57] text-xs font-bold flex items-center justify-center flex-shrink-0 font-display">
                  01
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">
                    Innovation First
                  </h4>
                  <p className="text-gray-400 text-xs mt-1 font-body">
                    Continuously investing in technology and processes for better products.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#B08D57] text-[#B08D57] text-xs font-bold flex items-center justify-center flex-shrink-0 font-display">
                  02
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">
                    Sustainability
                  </h4>
                  <p className="text-gray-400 text-xs mt-1 font-body">
                    Building eco-responsible manufacturing practices for future generations.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#B08D57] text-[#B08D57] text-xs font-bold flex items-center justify-center flex-shrink-0 font-display">
                  03
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm uppercase tracking-wide">
                    Global Partnerships
                  </h4>
                  <p className="text-gray-400 text-xs mt-1 font-body">
                    Creating long-term value for clients across every continent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-[400px] lg:h-auto min-h-[500px] order-1 lg:order-2" id="row-2-image">
            <img 
              src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900" 
              alt="Midland international logistics and packaging"
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* SECTION 5 - CORE VALUES */}
      <section className="bg-[#F7F7F7] py-24 px-6 reveal" id="core-values-section">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3" id="values-headline">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold block">
              CORE VALUES
            </span>
            <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
              What We Stand For
            </h2>
          </div>

          {/* Cards setup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="values-deck">
            
            {/* Card 1: Integrity */}
            <div className="bg-white p-10 group border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 relative overflow-hidden rounded-none" id="val-card-integrity">
              {/* Slide-up bronze anchor flag */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] group-hover:h-full transition-all duration-500" />
              <div className="text-[#B08D57] mb-6" id="val-icon-1">
                <Shield className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide mb-3">
                Integrity
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-body">
                We operate with complete transparency and honesty in every business dealing with clients, suppliers and partners.
              </p>
            </div>

            {/* Card 2: Excellence */}
            <div className="bg-white p-10 group border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 relative overflow-hidden rounded-none" id="val-card-excellence">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] group-hover:h-full transition-all duration-500" />
              <div className="text-[#B08D57] mb-6" id="val-icon-2">
                <Award className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide mb-3">
                Excellence
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-body">
                We never settle for good enough. Every product, process and interaction reflects our pursuit of perfection.
              </p>
            </div>

            {/* Card 3: Partnership */}
            <div className="bg-white p-10 group border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 relative overflow-hidden rounded-none" id="val-card-partnership">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] group-hover:h-full transition-all duration-500" />
              <div className="text-[#B08D57] mb-6" id="val-icon-3">
                <Users className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide mb-3">
                Partnership
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-body">
                We build long-term relationships not just transactions. Your success is our success.
              </p>
            </div>

            {/* Card 4: Global Thinking */}
            <div className="bg-white p-10 group border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 relative overflow-hidden rounded-none" id="val-card-global">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] group-hover:h-full transition-all duration-500" />
              <div className="text-[#B08D57] mb-6" id="val-icon-4">
                <Globe className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide mb-3">
                Global Thinking
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-body">
                We think globally in every decision — from product design to delivery and customer support.
              </p>
            </div>

            {/* Card 5: Sustainability */}
            <div className="bg-white p-10 group border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 relative overflow-hidden rounded-none" id="val-card-sustainability">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] group-hover:h-full transition-all duration-500" />
              <div className="text-[#B08D57] mb-6" id="val-icon-5">
                <Leaf className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide mb-3">
                Sustainability
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-body">
                We are committed to responsible manufacturing that respects the environment and future generations.
              </p>
            </div>

            {/* Card 6: Innovation */}
            <div className="bg-white p-10 group border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 relative overflow-hidden rounded-none" id="val-card-innovation">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] group-hover:h-full transition-all duration-500" />
              <div className="text-[#B08D57] mb-6" id="val-icon-6">
                <TrendingUp className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide mb-3">
                Innovation
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-body">
                We continuously invest in new technology and processes to stay ahead and deliver better products.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 - MANUFACTURING STRENGTH */}
      <section className="bg-[#111111] py-24 px-6 reveal" id="manufacturing-strength-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" id="m-strength-grid">
            
            {/* Left Column Content */}
            <div className="space-y-6" id="m-strength-left">
              <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold block">
                MANUFACTURING STRENGTH
              </span>

              <h2 className="font-display font-black text-4xl text-white leading-tight uppercase tracking-tight">
                World-Class Facility. Precision Engineering.
              </h2>

              <div className="w-12 h-1 bg-[#B08D57] my-8" id="m-strength-divider" />

              <p className="text-gray-400 leading-relaxed font-body text-base font-light">
                Our manufacturing facility is equipped with state-of-the-art copper processing machinery capable of producing the full range of copper products to exact international specifications.
              </p>

              {/* Incremental stateful inline statistics rows */}
              <div className="space-y-4 pt-4" id="m-capacity-rows">
                {/* Row 1 */}
                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <span className="text-gray-400 text-sm font-body">Annual Production Capacity</span>
                  <span className="text-white font-display font-bold text-sm uppercase tracking-wider">
                    <InlineCounter target={50000} suffix="+ MT" />
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <span className="text-gray-400 text-sm font-body">Product Range</span>
                  <span className="text-white font-display font-bold text-sm uppercase tracking-wider">
                    <InlineCounter target={6} suffix=" Categories" />
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <span className="text-gray-400 text-sm font-body">Quality Tests Per Batch</span>
                  <span className="text-white font-display font-bold text-sm uppercase tracking-wider">
                    <InlineCounter target={12} suffix=" Parameters" />
                  </span>
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <span className="text-gray-400 text-sm font-body">On-Time Delivery Rate</span>
                  <span className="text-white font-display font-bold text-sm uppercase tracking-wider">
                    <InlineCounter target={98} suffix=".5%" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column Grid 2x2 collage */}
            <div className="grid grid-cols-2 gap-3" id="m-strength-collage">
              {/* Image 1 full width header equivalent */}
              <div className="col-span-2 overflow-hidden" id="collage-img-1">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
                  alt="Midland machinery automation panel"
                  className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Column splits */}
              <div className="overflow-hidden" id="collage-img-2">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400"
                  alt="Copper drawing calibration"
                  className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="overflow-hidden" id="collage-img-3">
                <img 
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400"
                  alt="Industrial delivery preparation"
                  className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7 - TEAM / LEADERSHIP */}
      <section className="bg-white py-24 px-6 reveal" id="leadership-section">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3" id="leadership-headline">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold block">
              LEADERSHIP
            </span>
            <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
              The People Behind Midland
            </h2>
          </div>

          {/* Leaders profiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12" id="leadership-cards-deck">
            
            {/* Person 1 */}
            <div className="text-center group" id="leader-1">
              <div className="w-32 h-32 rounded-full mx-auto object-cover overflow-hidden border-4 border-transparent group-hover:border-[#B08D57] transition-all duration-500 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300"
                  alt="Arjun Midland portrait"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] mt-6 uppercase tracking-wide">
                Arjun Midland
              </h3>
              <p className="text-[#B08D57] text-sm font-medium uppercase tracking-wider mt-1 font-body">
                Founder &amp; CEO
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-xs mx-auto font-body font-light">
                25+ years in copper manufacturing. Visionary leader who built Midland from the ground up.
              </p>
            </div>

            {/* Person 2 */}
            <div className="text-center group" id="leader-2">
              <div className="w-32 h-32 rounded-full mx-auto object-cover overflow-hidden border-4 border-transparent group-hover:border-[#B08D57] transition-all duration-500 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
                  alt="Priya Sharma portrait"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] mt-6 uppercase tracking-wide">
                Priya Sharma
              </h3>
              <p className="text-[#B08D57] text-sm font-medium uppercase tracking-wider mt-1 font-body">
                Head of Quality
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-xs mx-auto font-body font-light">
                Expert in international copper standards with 15 years of quality management experience.
              </p>
            </div>

            {/* Person 3 */}
            <div className="text-center group" id="leader-3">
              <div className="w-32 h-32 rounded-full mx-auto object-cover overflow-hidden border-4 border-transparent group-hover:border-[#B08D57] transition-all duration-500 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300"
                  alt="David Chen portrait"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] mt-6 uppercase tracking-wide">
                David Chen
              </h3>
              <p className="text-[#B08D57] text-sm font-medium uppercase tracking-wider mt-1 font-body">
                Global Sales Director
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-xs mx-auto font-body font-light">
                Managing international client relationships across 40+ countries for over 12 years.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 - CERTIFICATIONS */}
      <section className="bg-[#F7F7F7] py-20 px-6 reveal" id="certifications-section">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3" id="certifications-title-block">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold block">
              CERTIFICATIONS
            </span>
            <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
              Internationally Certified
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" id="certifications-grid">
            
            {/* Card 1 */}
            <div className="bg-white p-10 text-center border border-gray-100 hover:border-[#B08D57] hover:shadow-lg transition-all duration-500 rounded-none" id="cert-card-1">
              <CheckCircle className="w-14 h-14 text-[#B08D57] mb-6 mx-auto stroke-[1.5]" />
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wider">
                ISO 9001:2015
              </h3>
              <p className="text-gray-400 text-sm mt-3 font-body font-light">
                Quality Management System
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 text-center border border-gray-100 hover:border-[#B08D57] hover:shadow-lg transition-all duration-500 rounded-none" id="cert-card-2">
              <CheckCircle className="w-14 h-14 text-[#B08D57] mb-6 mx-auto stroke-[1.5]" />
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wider">
                ASTM Standards
              </h3>
              <p className="text-gray-400 text-sm mt-3 font-body font-light">
                American Material Standards
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 text-center border border-gray-100 hover:border-[#B08D57] hover:shadow-lg transition-all duration-500 rounded-none" id="cert-card-3">
              <CheckCircle className="w-14 h-14 text-[#B08D57] mb-6 mx-auto stroke-[1.5]" />
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wider">
                BS Standards
              </h3>
              <p className="text-gray-400 text-sm mt-3 font-body font-light">
                British Standards Compliant
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-10 text-center border border-gray-100 hover:border-[#B08D57] hover:shadow-lg transition-all duration-500 rounded-none" id="cert-card-4">
              <CheckCircle className="w-14 h-14 text-[#B08D57] mb-6 mx-auto stroke-[1.5]" />
              <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wider">
                IS Standards
              </h3>
              <p className="text-gray-400 text-sm mt-3 font-body font-light">
                Indian Standards Certified
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9 - FINAL CTA */}
      <section className="bg-[#111111] py-32 px-6 relative overflow-hidden reveal" id="cinematic-footer-panel">
        {/* Extreme dark background image layout */}
        <div className="absolute inset-0 w-full" id="final-cta-visual">
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920" 
            alt="Midland heavy duty warehouse copper rows"
            className="w-full h-full object-cover opacity-15"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 inset-y-0 bg-[#111111]/85" />
        </div>

        {/* Action content panel */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6" id="final-cta-body">
          <div className="inline-block" id="final-cta-badge">
            <span className="bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-xs tracking-[0.3em] uppercase px-6 py-2 block font-body font-semibold rounded-none">
              OUR STORY CONTINUES
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
            Be Part of the <br />
            <span className="text-[#B08D57]">Midland Legacy</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-body font-light">
            Join 500+ global clients who trust Midland for premium copper products and unmatched quality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8" id="final-cta-buttons">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[#B08D57] text-white px-12 py-5 font-semibold text-xs tracking-widest hover:bg-[#8C6A43] transition-all duration-500 uppercase rounded-none text-center"
            >
              Get a Quote &rarr;
            </Link>

            <Link 
              to="/products"
              className="w-full sm:w-auto border border-white/40 text-white px-12 py-5 font-semibold text-xs tracking-widest hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-500 uppercase rounded-none text-center"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown,
  Award, 
  Globe, 
  Factory, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Package, 
  Flame, 
  Settings2, 
  Truck, 
  ArrowRight
} from 'lucide-react';

// Type definitions
interface StatCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

// Stateful Animated Stat Counter with Easing & Intersection Observer
const StatCounter: React.FC<StatCounterProps> = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              // Cubic ease-out calculation for premium fluid transition
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeProgress * target));
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            window.requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [target, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="text-7xl font-black text-[#B08D57] font-display">
      {count}{suffix}
    </div>
  );
};

export default function WhyMidland() {
  // Intersection Observer for scroll-reveal classes
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
    const targetElement = document.getElementById('animated-stats-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen overflow-hidden" id="why-midland-container">
      {/* Absolute CSS styled animations injection for bulletproof HMR-safe rendering */}
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
        
        @keyframes customDownBounce {
          0%, 100% { 
            transform: translateY(0) translateX(-50%); 
          }
          50% { 
            transform: translateY(10px) translateX(-50%); 
          }
        }

        .animate-fade-up-0 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0ms;
        }

        .animate-fade-up-200 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 200ms;
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

        .animate-fade-up-700 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 700ms;
          opacity: 0;
        }

        .animate-fade-up-800 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 800ms;
          opacity: 0;
        }

        .animate-custom-bounce {
          animation: customDownBounce 2s infinite ease-in-out;
        }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* SECTION 1 - CINEMATIC HERO */}
      <section className="relative bg-[#111111] min-h-screen flex items-center justify-center overflow-hidden px-6" id="cinematic-hero">
        {/* Full Bleed Image Background */}
        <div className="absolute inset-0" id="hero-bg-visual">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920" 
            alt="Midland heavy machinery copper manufacturing"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          {/* Intense Dark Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/85 to-[#111111]/60" />
        </div>

        {/* Foreground Centered Content Stack */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8" id="hero-content">
          
          {/* Badge Pill */}
          <div className="inline-block animate-fade-up-0" id="hero-badge">
            <span className="bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-xs tracking-[0.3em] uppercase px-6 py-2 block font-body font-semibold">
              TRUSTED SINCE 1999
            </span>
          </div>

          {/* Heading Lines */}
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white uppercase" id="hero-title">
            <span className="block animate-fade-up-200">THE STANDARD OF</span>
            <span className="block text-[#B08D57] animate-fade-up-400 mt-2">COPPER EXCELLENCE</span>
          </h1>

          {/* Thin Bronze Divider */}
          <div className="w-24 h-px bg-[#B08D57] mx-auto animate-fade-up-500 my-8" id="hero-divider" />

          {/* Luxury Copy Subtext */}
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-body text-center animate-fade-up-600 font-light" id="hero-desc">
            We don't just manufacture copper products. We engineer trust, precision, and performance for industries that power India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-up-700" id="hero-buttons">
            <button 
              onClick={handleScrollToContent}
              className="w-full sm:w-auto bg-[#B08D57] text-white px-10 py-5 font-semibold text-xs tracking-widest hover:bg-[#8C6A43] transition-all duration-500 uppercase rounded-none cursor-pointer"
            >
              Discover Our Story
            </button>

            <Link 
              to="/products"
              className="w-full sm:w-auto border border-white/40 text-white px-10 py-5 font-semibold text-xs tracking-widest hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-500 uppercase rounded-none text-center"
            >
              View Products &rarr;
            </Link>
          </div>
        </div>

        {/* Scroll Indicator bouncing chevron */}
        <button 
          onClick={handleScrollToContent}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-custom-bounce cursor-pointer group hover:scale-110 transition-transform duration-300 z-10" 
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-8 h-8 text-[#B08D57] stroke-[1.5]" />
        </button>
      </section>

      {/* SECTION 2 - ANIMATED STATS */}
      <section className="bg-[#111111] py-24 px-6 border-b border-white/5" id="animated-stats-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10" id="stats-counter-layout">
            
            {/* Stat Item 1 */}
            <div className="text-center p-4" id="counter-experience">
              <StatCounter target={25} suffix="+" />
              <div className="text-white text-sm uppercase tracking-[0.2em] mt-4 font-body font-bold">
                YEARS OF EXPERTISE
              </div>
              <div className="w-8 h-px bg-[#B08D57] mx-auto mt-4" />
            </div>

            {/* Stat Item 2 */}
            <div className="text-center p-4" id="counter-clients">
              <StatCounter target={500} suffix="+" />
              <div className="text-white text-sm uppercase tracking-[0.2em] mt-4 font-body font-bold">
                INDIAN CLIENTS
              </div>
              <div className="w-8 h-px bg-[#B08D57] mx-auto mt-4" />
            </div>

            {/* Stat Item 3 */}
            <div className="text-center p-4" id="counter-countries">
              <StatCounter target={15} suffix="+" />
              <div className="text-white text-sm uppercase tracking-[0.2em] mt-4 font-body font-bold">
                STATES SERVED
              </div>
              <div className="w-8 h-px bg-[#B08D57] mx-auto mt-4" />
            </div>

            {/* Stat Item 4 */}
            <div className="text-center p-4" id="counter-assurance">
              <StatCounter target={100} suffix="%" />
              <div className="text-white text-sm uppercase tracking-[0.2em] mt-4 font-body font-bold">
                QUALITY ASSURED
              </div>
              <div className="w-8 h-px bg-[#B08D57] mx-auto mt-4" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 - SPLIT STATEMENT SECTION */}
      <section className="bg-white py-32 px-6 reveal" id="split-statement">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center" id="split-layout-grid">
            
            {/* Left large typography statement block */}
            <div className="space-y-8" id="split-left-column">
              <h2 className="font-display font-black text-5xl lg:text-6xl text-[#111111] leading-tight uppercase tracking-tight">
                We Don't Just<br />
                Make Copper.<br />
                We Make It<br />
                <span className="text-[#B08D57]">Better.</span>
              </h2>

              <div className="border-l-4 border-[#B08D57] pl-6 mt-8" id="bronze-bracket-quote">
                <p className="text-gray-500 text-base leading-relaxed font-body">
                  For over 25 years Midland has set the benchmark for copper manufacturing excellence across Indian industrial markets.
                </p>
              </div>
            </div>

            {/* Right Stacked premium feature rows */}
            <div className="space-y-8 divide-y divide-gray-100" id="split-right-column">
              
              {/* Feature Row 1 */}
              <div className="flex gap-6 pb-6" id="feat-row-1">
                <span className="text-[#B08D57]/30 text-5xl font-black font-display leading-none shrink-0 pt-1">
                  01
                </span>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
                    Grade A Copper Only
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">
                    We source exclusively Grade A electrolytic copper cathodes meeting Indian Standards (IS) purity requirements.
                  </p>
                </div>
              </div>

              {/* Feature Row 2 */}
              <div className="flex gap-6 pt-6 pb-6" id="feat-row-2">
                <span className="text-[#B08D57]/30 text-5xl font-black font-display leading-none shrink-0 pt-1">
                  02
                </span>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
                    Zero Compromise Quality
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">
                    Every product undergoes multi-stage quality testing before leaving our facility.
                  </p>
                </div>
              </div>

              {/* Feature Row 3 */}
              <div className="flex gap-6 pt-6 pb-6" id="feat-row-3">
                <span className="text-[#B08D57]/30 text-5xl font-black font-display leading-none shrink-0 pt-1">
                  03
                </span>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
                    Pan-India Delivery Network
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">
                    Reliable logistics across 15+ Indian states with full documentation and insurance.
                  </p>
                </div>
              </div>

              {/* Feature Row 4 */}
              <div className="flex gap-6 pt-6" id="feat-row-4">
                <span className="text-[#B08D57]/30 text-5xl font-black font-display leading-none shrink-0 pt-1">
                  04
                </span>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-[#111111] uppercase tracking-wide">
                    Dedicated Account Support
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">
                    Personal account managers for every client ensuring seamless experience.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4 - FULL WIDTH DARK BANNER */}
      <section className="bg-[#1F1F1F] py-24 px-6 relative reveal" id="promise-quote-banner">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="font-display font-black text-4xl lg:text-5xl text-white text-center italic leading-tight" id="promise-quote">
            "Quality is not an act. It is a habit."
          </p>
          <div className="text-[#B08D57] text-xs md:text-sm tracking-[0.3em] uppercase text-center mt-6 font-display font-semibold" id="promise-signature">
            — The Midland Promise
          </div>
          <div className="w-16 h-px bg-[#B08D57] mx-auto mt-8" id="promise-line" />
        </div>
      </section>

      {/* SECTION 5 - ADVANTAGES BENTO GRID */}
      <section className="bg-white py-24 px-6 reveal border-b border-gray-100" id="advantages-bento-section">
        <div className="max-w-6xl mx-auto">
          {/* Bento Header */}
          <div className="text-center mb-16 space-y-3" id="bento-header">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold font-body block">
              OUR EDGE
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#111111] uppercase tracking-tight">
              Why Industry Leaders Choose Midland
            </h2>
          </div>

          {/* Dynamic Bento Box layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="bento-layout-grid-inner">
            
            {/* CARD 1 (col-span-2) */}
            <div className="lg:col-span-2 bg-[#F7F7F7] p-10 group hover:bg-[#111111] transition-all duration-500 cursor-pointer overflow-hidden relative rounded-none flex flex-col justify-between min-h-[300px]" id="bento-card-quality">
              <div>
                <div className="text-[#B08D57] mb-6" id="b-icon-1">
                  <Award className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-white transition-colors duration-500 uppercase tracking-wide mb-4">
                  Uncompromising Quality Standards
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed font-body">
                  Every copper product manufactured at Midland undergoes rigorous multi-stage quality control. From raw material inspection to final dispatch each batch is tested for conductivity, tensile strength, dimensional accuracy and surface finish to meet ASTM BS and IS standards.
                </p>
              </div>
              <div className="w-0 h-0.5 bg-[#B08D57] group-hover:w-full transition-all duration-700 absolute bottom-0 left-0" />
            </div>

            {/* CARD 2 (col-span-1) */}
            <div className="lg:col-span-1 bg-[#F7F7F7] p-10 group hover:bg-[#111111] transition-all duration-500 cursor-pointer overflow-hidden relative rounded-none flex flex-col justify-between min-h-[300px]" id="bento-card-reach">
              <div>
                <div className="text-[#B08D57] mb-6" id="b-icon-2">
                  <Globe className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-white transition-colors duration-500 uppercase tracking-wide mb-4">
                  Pan-India Reach
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed font-body">
                  Serving 15+ Indian states with trusted freight partners. We manage secure logistics and document dispatches perfectly.
                </p>
              </div>
              <div className="w-0 h-0.5 bg-[#B08D57] group-hover:w-full transition-all duration-700 absolute bottom-0 left-0" />
            </div>

            {/* CARD 3 (col-span-1) */}
            <div className="lg:col-span-1 bg-[#F7F7F7] p-10 group hover:bg-[#111111] transition-all duration-500 cursor-pointer overflow-hidden relative rounded-none flex flex-col justify-between min-h-[300px]" id="bento-card-facility">
              <div>
                <div className="text-[#B08D57] mb-6" id="b-icon-3">
                  <Factory className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-white transition-colors duration-500 uppercase tracking-wide mb-4">
                  Modern Facility
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed font-body">
                  State-of-the-art manufacturing plant running German and Italian drawing, rolling, and extrusion machinery for zero defect outputs.
                </p>
              </div>
              <div className="w-0 h-0.5 bg-[#B08D57] group-hover:w-full transition-all duration-700 absolute bottom-0 left-0" />
            </div>

            {/* CARD 4 (col-span-1) */}
            <div className="lg:col-span-1 bg-[#F7F7F7] p-10 group hover:bg-[#111111] transition-all duration-500 cursor-pointer overflow-hidden relative rounded-none flex flex-col justify-between min-h-[300px]" id="bento-card-certified">
              <div>
                <div className="text-[#B08D57] mb-6" id="b-icon-4">
                  <ShieldCheck className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-white transition-colors duration-500 uppercase tracking-wide mb-4">
                  Certified Products
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed font-body">
                  All items are ASTM, BS, and IS standard certified. Full mill test reports and metallurgical quality guarantee documentation with every delivery.
                </p>
              </div>
              <div className="w-0 h-0.5 bg-[#B08D57] group-hover:w-full transition-all duration-700 absolute bottom-0 left-0" />
            </div>

            {/* CARD 5 (col-span-2) */}
            <div className="lg:col-span-2 bg-[#F7F7F7] p-10 group hover:bg-[#111111] transition-all duration-500 cursor-pointer overflow-hidden relative rounded-none flex flex-col justify-between min-h-[300px]" id="bento-card-competitive">
              <div>
                <div className="text-[#B08D57] mb-6" id="b-icon-5">
                  <TrendingUp className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-white transition-colors duration-500 uppercase tracking-wide mb-4">
                  Competitive Value
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed font-body">
                  Direct manufacturer pricing eliminates middlemen giving you the best value without compromising quality. Bulk order discounts and structured raw copper hedging contracts available for reliable long-term partners across India.
                </p>
              </div>
              <div className="w-0 h-0.5 bg-[#B08D57] group-hover:w-full transition-all duration-700 absolute bottom-0 left-0" />
            </div>

            {/* CARD 6 (col-span-3 - full width layout) */}
            <Link 
              to="/contact"
              className="lg:col-span-3 bg-[#F7F7F7] p-10 group hover:bg-[#111111] transition-all duration-500 cursor-pointer overflow-hidden relative rounded-none flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 min-h-[160px]" 
              id="bento-card-cta"
            >
              <div className="flex items-start gap-6" id="bento-cta-left">
                <div className="text-[#B08D57] shrink-0 fill-[#B08D57]/5" id="b-icon-6">
                  <Users className="w-12 h-12 stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-white transition-colors duration-500 uppercase tracking-wide">
                    500+ Satisfied Clients Across 15+ Indian States
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm font-body">
                    From electrical contractors to infrastructure giants, our client base spans industries across India. Build your custom catalog with our desk today.
                  </p>
                </div>
              </div>
              <div className="text-[#B08D57] font-display font-bold text-sm tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300 shrink-0 self-end lg:self-auto" id="bento-cta-action">
                Get Started &rarr;
              </div>
              <div className="w-0 h-0.5 bg-[#B08D57] group-hover:w-full transition-all duration-700 absolute bottom-0 left-0" />
            </Link>

          </div>
        </div>
      </section>

      {/* SECTION 6 - PROCESS TIMELINE */}
      <section className="bg-[#111111] py-24 px-6 reveal" id="process-timeline-section">
        <div className="max-w-5xl mx-auto">
          {/* Timeline Header */}
          <div className="text-center mb-20 space-y-3" id="timeline-header">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold font-body block">
              OUR PROCESS
            </span>
            <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight">
              From Raw Material to Your Doorstep
            </h2>
          </div>

          {/* Dotted Connection line (desktop) */}
          <div className="relative" id="timeline-interactive-track">
            
            {/* Horizontal Line behind items */}
            <div className="absolute top-24 left-16 right-16 h-0.5 border-t-2 border-dashed border-[#B08D57]/30 hidden lg:block" />

            {/* Process grid splits */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10" id="steps-grid">
              
              {/* Step 1 */}
              <div className="text-center space-y-4" id="p-step-1">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-md border-4 border-[#111111]" id="dot-1">
                  01
                </div>
                <div className="text-[#B08D57] mx-auto pt-2" id="icon-proc-1">
                  <Package className="w-7 h-7 stroke-[1.5] mx-auto" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                    Raw Material
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-body px-4">
                    Grade A copper cathodes sourced from certified miners
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4" id="p-step-2">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-md border-4 border-[#111111]" id="dot-2">
                  02
                </div>
                <div className="text-[#B08D57] mx-auto pt-2" id="icon-proc-2">
                  <Flame className="w-7 h-7 stroke-[1.5] mx-auto" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                    Melting & Casting
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-body px-4">
                    Precision temperature control furnace casting
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4" id="p-step-3">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-md border-4 border-[#111111]" id="dot-3">
                  03
                </div>
                <div className="text-[#B08D57] mx-auto pt-2" id="icon-proc-3">
                  <Settings2 className="w-7 h-7 stroke-[1.5] mx-auto" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                    Drawing & Rolling
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-body px-4">
                    Exact dimensional rolling with tight tolerances
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="text-center space-y-4" id="p-step-4">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-md border-4 border-[#111111]" id="dot-4">
                  04
                </div>
                <div className="text-[#B08D57] mx-auto pt-2" id="icon-proc-4">
                  <ShieldCheck className="w-7 h-7 stroke-[1.5] mx-auto" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                    Quality Testing
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-body px-4">
                    100% test batch inspection and conductivity report
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="text-center space-y-4" id="p-step-5">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center mx-auto shadow-md border-4 border-[#111111]" id="dot-5">
                  05
                </div>
                <div className="text-[#B08D57] mx-auto pt-2" id="icon-proc-5">
                  <Truck className="w-7 h-7 stroke-[1.5] mx-auto" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                    Dispatch
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-body px-4">
                    Pan-India delivery or secure corporate dispatch
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7 - TESTIMONIALS */}
      <section className="bg-[#F7F7F7] py-24 px-6 reveal" id="testimonials-opinions-section">
        <div className="max-w-6xl mx-auto">
          {/* Testimonial Header */}
          <div className="text-center mb-16 space-y-3" id="testimonials-head-block">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-semibold font-body block">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid-deck">
            
            {/* Card 1 */}
            <div className="bg-white p-10 border-b-4 border-transparent hover:border-[#B08D57] transition-all duration-500 shadow-sm hover:shadow-lg rounded-none relative flex flex-col justify-between" id="opinion-card-1">
              <div>
                <span className="text-[#B08D57] text-8xl font-serif leading-none mb-4 opacity-30 block">
                  "
                </span>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed italic font-body mb-8">
                  Midland has been our trusted copper supplier for over 8 years. Consistent quality and on-time delivery every single time. They understand what industrial buyers need.
                </p>
              </div>
              <div>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <div className="flex items-center justify-between gap-4 mt-auto" id="opinion-user-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B08D57] text-white font-bold font-display flex items-center justify-center rounded-none shrink-0 text-sm">
                      RK
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#111111] text-sm tracking-wide">
                        Rajesh Kumar
                      </h4>
                      <p className="text-gray-400 text-xs font-body mt-1">
                        Director, Kumar Electricals Ltd
                      </p>
                    </div>
                  </div>
                  <div className="text-[#B08D57] text-sm shrink-0 whitespace-nowrap">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 border-b-4 border-transparent hover:border-[#B08D57] transition-all duration-500 shadow-sm hover:shadow-lg rounded-none relative flex flex-col justify-between" id="opinion-card-2">
              <div>
                <span className="text-[#B08D57] text-8xl font-serif leading-none mb-4 opacity-30 block">
                  "
                </span>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed italic font-body mb-8">
                  The copper rods and wires from Midland consistently meet our strict Indian Standards (IS) specifications. Their quality control process is genuinely best-in-class.
                </p>
              </div>
              <div>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <div className="flex items-center justify-between gap-4 mt-auto" id="opinion-user-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B08D57] text-white font-bold font-display flex items-center justify-center rounded-none shrink-0 text-sm">
                      AS
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#111111] text-sm tracking-wide">
                        Anita Sharma
                      </h4>
                      <p className="text-gray-400 text-xs font-body mt-1">
                        Procurement Head, Shree Industries, Gujarat
                      </p>
                    </div>
                  </div>
                  <div className="text-[#B08D57] text-sm shrink-0 whitespace-nowrap">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 border-b-4 border-transparent hover:border-[#B08D57] transition-all duration-500 shadow-sm hover:shadow-lg rounded-none relative flex flex-col justify-between" id="opinion-card-3">
              <div>
                <span className="text-[#B08D57] text-8xl font-serif leading-none mb-4 opacity-30 block">
                  "
                </span>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed italic font-body mb-8">
                  Midland handled all our delivery documentation perfectly. Products arrived on time in perfect condition. Our go-to copper manufacturer without question.
                </p>
              </div>
              <div>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <div className="flex items-center justify-between gap-4 mt-auto" id="opinion-user-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B08D57] text-white font-bold font-display flex items-center justify-center rounded-none shrink-0 text-sm">
                      VP
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#111111] text-sm tracking-wide">
                        Vikram Patel
                      </h4>
                      <p className="text-gray-400 text-xs font-body mt-1">
                        Operations Manager, Patel Cable Industries, Maharashtra
                      </p>
                    </div>
                  </div>
                  <div className="text-[#B08D57] text-sm shrink-0 whitespace-nowrap">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 - FINAL CTA */}
      <section className="bg-[#111111] py-32 px-6 relative overflow-hidden reveal" id="cinematic-cta-footer">
        {/* Dark overlay image cover style */}
        <div className="absolute inset-x-0 inset-y-0 w-full" id="cta-bg-image-box">
          <img 
            src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920" 
            alt="Copper tubes warehouse raw metals stocks" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          {/* Solid 85% back overlay layer */}
          <div className="absolute inset-0 bg-[#111111]/85" />
        </div>

        {/* Action content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6" id="cta-inner-panel">
          <div className="inline-block" id="cta-badge-pill">
            <span className="bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-xs tracking-[0.3em] uppercase px-6 py-2 block font-body font-semibold rounded-none">
              JOIN 500+ INDIAN CLIENTS
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
            Ready to Experience <br />
            <span className="text-[#B08D57]">The Midland Standard?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-body font-light">
            Partner with a manufacturer that delivers quality, reliability and performance on every order. Every time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8" id="cta-action-links">
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

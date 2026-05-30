import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Cpu, 
  Globe, 
  Award, 
  Trophy, 
  Users, 
  Check, 
  FileSpreadsheet, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Tag, 
  Zap, 
  Hammer, 
  Car, 
  BatteryCharging, 
  Building, 
  Snowflake, 
  Radio, 
  CheckCircle2, 
  ShieldAlert, 
  Milestone, 
  RefreshCw, 
  TrendingUp, 
  Mail,
  X,
  Calculator,
  Phone,
  User,
  ChevronRight as ChevronRightIcon,
  Package,
  Flame,
  Settings2,
  Truck,
  Factory,
  CheckCircle
} from 'lucide-react';
import { HERO_SLIDES, TRUST_ITEMS, STATS, PRODUCTS, INDUSTRIES } from '../data';
import { Product } from '../types';

interface HomeProps {
  quoteOpen: boolean;
  onCloseQuote: () => void;
  preselectedProduct?: string;
  onOpenQuote: (productId?: string) => void;
  onOpenContact: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Home({ 
  quoteOpen, 
  onCloseQuote, 
  preselectedProduct, 
  onOpenQuote, 
  onOpenContact, 
  onNavigateToSection 
}: HomeProps) {
  // --- QuoteDialog States ---
  const [quoteStep, setQuoteStep] = useState<1 | 2 | 3>(1);
  const [quoteProductId, setQuoteProductId] = useState(preselectedProduct || PRODUCTS[0].id);
  const [quoteAlloyGrade, setQuoteAlloyGrade] = useState('');
  
  // Dimensional inputs for real-time weights calculation
  const [quoteLength, setQuoteLength] = useState<number>(100); // meters or mm based on product
  const [quoteDiameter, setQuoteDiameter] = useState<number>(8); // mm for rods/wires
  const [quoteWidth, setQuoteWidth] = useState<number>(1000); // mm for sheets
  const [quoteThickness, setQuoteThickness] = useState<number>(2); // mm for sheets
  const [quoteWallThickness, setQuoteWallThickness] = useState<number>(1); // mm for tubes
  const [quoteQuantityCount, setQuoteQuantityCount] = useState<number>(1); // count of items
  
  // Calculated Weight & Price parameters
  const [quoteCalculatedWeight, setQuoteCalculatedWeight] = useState<number>(0);
  const [quoteFormSubmitted, setQuoteFormSubmitted] = useState(false);
  const [quoteErrors, setQuoteErrors] = useState<Record<string, string>>({});

  // Client Details
  const [quoteFullName, setQuoteFullName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteCompany, setQuoteCompany] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  // Auto-fill grade depending on product selection
  useEffect(() => {
    const selectedProd = PRODUCTS.find(p => p.id === quoteProductId);
    if (selectedProd && selectedProd.alloyGrades.length > 0) {
      setQuoteAlloyGrade(selectedProd.alloyGrades[0]);
    }
  }, [quoteProductId]);

  // Sync preselected product if changed by props
  useEffect(() => {
    if (preselectedProduct) {
      setQuoteProductId(preselectedProduct);
    }
  }, [preselectedProduct]);

  // Real-time pure copper weight calculator
  // Pure Copper Density ≈ 8.96 g/cm³ = 8960 kg/m³
  useEffect(() => {
    let weightInKg = 0;
    
    switch (quoteProductId) {
      case 'copper-rods':
      case 'copper-wires': {
        // Rod/Wire is a cylinder: Volume = pi * r^2 * length
        // Length in meters, diameter in mm
        const r_m = (quoteDiameter / 2) / 1000;
        const vol_m3 = Math.PI * Math.pow(r_m, 2) * quoteLength;
        weightInKg = vol_m3 * 8960 * quoteQuantityCount;
        break;
      }
      case 'copper-sheets': {
        // Sheet: Volume = thickness(m) * width(m) * length(m)
        // input thickness in mm, width in mm, length in mm (or meters)
        // Let's assume length input is in meters, width in mm, thickness in mm
        const t_m = quoteThickness / 1000;
        const w_m = quoteWidth / 1000;
        const vol_m3 = t_m * w_m * quoteLength * quoteQuantityCount;
        weightInKg = vol_m3 * 8960;
        break;
      }
      case 'copper-tubes': {
        // Tube: Volume of outer cylinder - volume of inner cylinder
        // OD in mm, wall thickness in mm, length in meters
        const R_m = (quoteDiameter / 2) / 1000;
        const r_m = ((quoteDiameter / 2) - quoteWallThickness) / 1000;
        const outerVol = Math.PI * Math.pow(R_m, 2) * quoteLength;
        const innerVol = Math.PI * Math.pow(r_m, 2) * quoteLength;
        weightInKg = Math.max(0, outerVol - innerVol) * 8960 * quoteQuantityCount;
        break;
      }
      case 'copper-coils':
      case 'copper-components':
      default:
        // Basic static estimate based on custom count
        weightInKg = 15.5 * quoteQuantityCount;
        break;
    }

    setQuoteCalculatedWeight(Math.round(weightInKg * 100) / 100);
  }, [quoteProductId, quoteLength, quoteDiameter, quoteWidth, quoteThickness, quoteWallThickness, quoteQuantityCount]);

  const currentProductInfoForQuote = PRODUCTS.find(p => p.id === quoteProductId);

  // Copper Price per KG estimate ($9.74 USD)
  const USD_PER_KG = 9.74;
  const estimatedPriceRange = {
    min: Math.round(quoteCalculatedWeight * USD_PER_KG * 0.95),
    max: Math.round(quoteCalculatedWeight * USD_PER_KG * 1.12),
  };

  const handleNextStep = () => {
    if (quoteStep === 1) {
      if (quoteCalculatedWeight <= 0) {
        setQuoteErrors({ calculator: 'Please input valid non-zero measurements to compute copper weight.' });
        return;
      }
      setQuoteErrors({});
      setQuoteStep(2);
    }
  };

  const validateEmail = (e: string) => {
    return /\S+@\S+\.\S+/.test(e);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!quoteFullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!quoteEmail.trim() || !validateEmail(quoteEmail)) newErrors.email = 'Valid email address is required';
    if (!quoteCompany.trim()) newErrors.company = 'Company Name is required';
    if (!quotePhone.trim()) newErrors.phone = 'Contact number is required';

    if (Object.keys(newErrors).length > 0) {
      setQuoteErrors(newErrors);
      return;
    }

    setQuoteErrors({});
    setQuoteStep(3);
    setQuoteFormSubmitted(true);
  };

  const resetQuoteForm = () => {
    setQuoteStep(1);
    setQuoteFormSubmitted(false);
    setQuoteFullName('');
    setQuoteEmail('');
    setQuoteCompany('');
    setQuotePhone('');
    setQuoteNotes('');
    setQuoteQuantityCount(1);
  };
  // --- Hero Section States & Handlers ---
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // --- TrustBar Section Help Function ---
  const getTrustIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-8 h-8 text-bronze-primary stroke-[1.25]" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-bronze-primary stroke-[1.25]" />;
      case 'Globe':
        return <Globe className="w-8 h-8 text-bronze-primary stroke-[1.25]" />;
      case 'Award':
      default:
        return <Award className="w-8 h-8 text-bronze-primary stroke-[1.25]" />;
    }
  };

  // --- AboutSnippet Section States ---
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // --- StatsBar Section States & Help Function ---
  const [activeStatId, setActiveStatId] = useState<string | null>(null);

  const getStatsIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-7 h-7 text-bronze-primary stroke-[1.5]" />;
      case 'Users':
        return <Users className="w-7 h-7 text-bronze-primary stroke-[1.5]" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-bronze-primary stroke-[1.5]" />;
      case 'Award':
      default:
        return <Award className="w-7 h-7 text-bronze-primary stroke-[1.5]" />;
    }
  };

  // --- ProductsShowcase Section States ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- Industries Section States & Help Function ---
  const [activeIndex, setActiveIndex] = useState(0);

  const getIndustryIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-7 h-7 transition-all duration-300 ${
      isActive ? 'text-white' : 'text-bronze-primary group-hover:scale-110'
    }`;
    
    switch (iconName) {
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Hammer':
        return <Hammer className={iconClass} />;
      case 'Car':
        return <Car className={iconClass} />;
      case 'BatteryCharging':
        return <BatteryCharging className={iconClass} />;
      case 'Building':
        return <Building className={iconClass} />;
      case 'Snowflake':
        return <Snowflake className={iconClass} />;
      case 'Radio':
      default:
        return <Radio className={iconClass} />;
    }
  };

  // --- Scroll Animations & Stats Counters Refs & States ---
  const statsBannerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);

  const [yearsCount, setYearsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [qualityCount, setQualityCount] = useState(0);
  const [animateStatsTriggered, setAnimateStatsTriggered] = useState(false);

  const getAnimatedStatNumber = (id: string, original: string) => {
    switch (id) {
      case 'exp':
        return `${yearsCount}+`;
      case 'clients':
        return `${clientsCount}+`;
      case 'countries':
        return `${countriesCount}+`;
      case 'quality':
        return `${qualityCount}%`;
      default:
        return original;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target === section3Ref.current || entry.target === statsBannerRef.current) {
              setAnimateStatsTriggered(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    if (statsBannerRef.current) {
      observer.observe(statsBannerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!animateStatsTriggered) return;

    const duration = 2000; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = progress * (2 - progress);

      setYearsCount(Math.min(25, Math.floor(easeProgress * 25)));
      setClientsCount(Math.min(500, Math.floor(easeProgress * 500)));
      setCountriesCount(Math.min(40, Math.floor(easeProgress * 40)));
      setQualityCount(Math.min(100, Math.floor(easeProgress * 100)));

      if (frame >= totalFrames) {
        clearInterval(timer);
        setYearsCount(25);
        setClientsCount(500);
        setCountriesCount(40);
        setQualityCount(100);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [animateStatsTriggered]);

  // --- Scroll-based Copper Wires Animation Hooks ---
  useEffect(() => {
    const wires = document.querySelectorAll('.copper-wire');
    wires.forEach((wire) => {
      const el = wire as SVGPathElement;
      try {
        const length = el.getTotalLength();
        el.style.strokeDasharray = String(length);
        el.style.strokeDashoffset = String(length); // hidden at start
      } catch (e) {
        // Fallback for environments where getTotalLength is not supported
        el.style.strokeDasharray = "1000";
        el.style.strokeDashoffset = "1000";
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0; // 0 to 1

      const wires = document.querySelectorAll('.copper-wire');
      wires.forEach((wire, index) => {
        const el = wire as SVGPathElement;
        try {
          const length = el.getTotalLength();
          const delay = index * 0.15;
          const adjustedProgress = Math.max(0, progress - delay);
          el.style.strokeDashoffset = String(length * (1 - Math.min(adjustedProgress * 1.8, 1)));
        } catch (e) {
          // Fallback if getTotalLength is not available
          const delay = index * 0.15;
          const adjustedProgress = Math.max(0, progress - delay);
          el.style.strokeDashoffset = String(1000 * (1 - Math.min(adjustedProgress * 1.8, 1)));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Position lines according to initial scroll state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- WhyMidland Section Static Values ---
  const whyMidlandValues = [
    {
      icon: <Award className="w-6 h-6 text-bronze-primary" />,
      title: "ISO 9001 & 14001 Standards",
      desc: "Our processing cells operate strictly under standard global guidelines for total quality assurance and eco-sensitive manufacturing compliance."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-bronze-primary" />,
      title: "Continuous Smelting Purity",
      desc: "We process primary Grade A copper cathodes with oxygen counts kept below 10ppm to maintain conductivity thresholds over 101% IACS."
    },
    {
      icon: <Milestone className="w-6 h-6 text-bronze-primary" />,
      title: "Global Supply Corridors",
      desc: "Operating responsive custom packaging logistics covering North America, Central Europe, and rapid East Asian trade gateways."
    }
  ];

  return (
    <main className="relative">
      {/* Scroll-based Copper Wires Animation SVG */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wire 1 — top left flowing right */}
        <path
          className="copper-wire"
          d="M -100 150 C 200 120, 400 300, 700 200 S 1100 80, 1540 180"
          fill="none"
          stroke="url(#copperGrad1)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Wire 2 — middle diagonal */}
        <path
          className="copper-wire"
          d="M -100 420 C 300 380, 500 520, 800 450 S 1200 320, 1540 430"
          fill="none"
          stroke="url(#copperGrad2)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Wire 3 — lower wave */}
        <path
          className="copper-wire"
          d="M -100 680 C 250 640, 600 750, 900 680 S 1300 580, 1540 700"
          fill="none"
          stroke="url(#copperGrad1)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Wire 4 — thin accent top right */}
        <path
          className="copper-wire"
          d="M 1540 80 C 1200 100, 900 50, 600 130 S 200 220, -100 100"
          fill="none"
          stroke="url(#copperGrad3)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Wire 5 — bottom full sweep */}
        <path
          className="copper-wire"
          d="M -100 820 C 400 780, 700 860, 1000 800 S 1300 740, 1540 830"
          fill="none"
          stroke="url(#copperGrad2)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="copperGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B08D57" stopOpacity="0" />
            <stop offset="30%" stopColor="#B08D57" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#D4A857" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8C6A43" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="copperGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6A43" stopOpacity="0" />
            <stop offset="40%" stopColor="#C49A3C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="copperGrad3" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#B08D57" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A857" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8C6A43" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[calc(100vh-80px)] bg-industrial-black text-white flex items-center overflow-hidden" id="home">
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 lg:left-[40%] bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-industrial-black via-industrial-black/80 lg:via-industrial-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-transparent to-industrial-black"></div>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[45%] bg-industrial-black z-[-1]" />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 col-span-12 space-y-6 md:space-y-8 max-w-2xl pointer-events-auto">
              <div className="flex items-center gap-3 animate-fade-in">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-bronze-primary font-bold">
                  {HERO_SLIDES[activeSlide].tagline}
                </span>
                <div className="h-[1px] w-12 bg-bronze-primary" />
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase animate-slide-up">
                {HERO_SLIDES[activeSlide].titleLine1 === 'DRIVEN BY' ? (
                  <>
                    DRIVEN BY <br className="hidden sm:inline" />
                    <span className="text-bronze-primary font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-bronze-primary to-[#d2b48c]">EXCELLENCE.</span>
                  </>
                ) : HERO_SLIDES[activeSlide].titleLine1 === 'ENGINEERED' ? (
                  <>
                    ENGINEERED <br className="hidden sm:inline" />
                    <span className="text-bronze-primary font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-bronze-primary to-[#d2b48c]">FOR FUTURE.</span>
                  </>
                ) : (
                  <>
                    PRECISION <br className="hidden sm:inline" />
                    <span className="text-bronze-primary font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-bronze-primary to-[#d2b48c]">COMMITTED.</span>
                  </>
                )}
              </h1>

              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-sans tracking-wide">
                {HERO_SLIDES[activeSlide].subtext}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigateToSection('products')}
                  className="px-8 py-4 bg-bronze-primary hover:bg-bronze-secondary text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-[4px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-bronze-primary/20 hover:-translate-y-0.5"
                >
                  Explore Products <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigateToSection('about')}
                  className="px-8 py-4 border border-white/60 hover:border-white hover:bg-white hover:text-industrial-black text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-[4px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-25 flex items-center gap-2">
          <button 
            onClick={handlePrevSlide}
            className="p-2 border border-white/10 rounded-[4px] hover:bg-white/5 text-gray-400 hover:text-white transition-all focus:outline-none"
            aria-label="Previous Hero Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNextSlide}
            className="p-2 border border-white/10 rounded-[4px] hover:bg-white/5 text-gray-400 hover:text-white transition-all focus:outline-none"
            aria-label="Next Hero Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3" id="hero-carousel-indicators">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-[2px] transition-all duration-350 cursor-pointer ${
                index === activeSlide ? 'w-8 bg-bronze-primary' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Show slide details ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================= TRUST BAR SECTION ================= */}
      <section className="bg-industrial-gray-dark py-12 md:py-16 border-b border-white/5" id="trust-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
            {TRUST_ITEMS.map((item, index) => (
              <div 
                key={item.id}
                className={`flex items-start gap-4 p-4 lg:px-8 relative ${
                  index !== 0 ? 'lg:border-l lg:border-white/10' : ''
                }`}
                id={`trust-card-${item.id}`}
              >
                <div className="p-3 bg-white/5 rounded-[4px] border border-white/10 shrink-0">
                  {getTrustIcon(item.iconName)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT SNIPPET SECTION ================= */}
      <section className="bg-white py-20 md:py-28" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-bronze-primary font-bold">
                    ABOUT MIDLAND ——
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-industrial-black uppercase">
                  A Legacy of Quality <br />
                  <span className="text-bronze-primary">and Innovation</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-sans font-light">
                <p>
                  With decades of expertise in the copper metallurgy industry, Midland Cable Manufacture is committed to producing high-quality copper products and cables that meet rigorous international specifications.
                </p>
                <p>
                  Our relentless focus on technical innovation, precision engineering, and complete customer satisfaction has helped us expand from a regional drawing facility into a preferred primary partner for major utilities, infrastructure creators, and heavy industrial groups globally.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="px-6 py-3 border border-bronze-primary text-bronze-primary hover:bg-bronze-primary hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-widest rounded-[4px] flex items-center gap-2 cursor-pointer"
                >
                  Our Journey <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-12 gap-3 md:gap-4 relative">
              <div className="col-span-7 h-[280px] sm:h-[400px] overflow-hidden rounded-[4px] relative group hover:shadow-xl transition-all duration-300">
                <img 
                  src="/src/assets/images/factory_hq_1779552956267.png" 
                  alt="Midland Corporate Headquarters"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-[10px] font-mono text-white tracking-widest uppercase bg-industrial-black/85 px-2.5 py-1 rounded-[4px]">
                  CORPORATE HQ
                </span>
              </div>

              <div className="col-span-5 flex flex-col gap-3 md:gap-4 justify-between h-[280px] sm:h-[400px]">
                <div className="h-[29%] overflow-hidden rounded-[4px] relative group">
                  <img 
                    src="/src/assets/images/copper_rods_1779552976090.png" 
                    alt="High purity copper rods stack"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>

                <div className="h-[29%] overflow-hidden rounded-[4px] relative group">
                  <img 
                    src="/src/assets/images/copper_coils_1779552995494.png" 
                    alt="Heavy wiring copper coils"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>

                <div className="h-[29%] overflow-hidden rounded-[4px] relative group">
                  <img 
                    src="https://picsum.photos/seed/factoryfloor/400/300" 
                    alt="Midland manufacturing plant floor"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showHistoryModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/85 transition-opacity" onClick={() => setShowHistoryModal(false)} />
            <div className="relative bg-white text-industrial-black max-w-2xl w-full rounded-[4px] shadow-2xl p-6 sm:p-8 z-10 border border-bronze-primary/25">
              <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-industrial-black border-b border-gray-200 pb-4 mb-6 flex justify-between items-center">
                <span>Our Corporate Chapters</span>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-400 hover:text-industrial-black text-sm font-mono"
                >
                  [ CLOSE X ]
                </button>
              </h3>

              <div className="space-y-6 relative border-l border-bronze-primary/30 ml-4 pl-6">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-bronze-primary border-4 border-white"></div>
                  <h4 className="font-display text-base font-bold text-industrial-black">2001 — Founding Foundations</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans mt-1">
                    Midland enters the market with single smelting line in central zone. Gained ISO standards in continuous casting.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-bronze-primary border-4 border-white"></div>
                  <h4 className="font-display text-base font-bold text-industrial-black">2010 — International Expansion</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans mt-1">
                    Pioneered Oxygen-free high-conductivity electrolytic copper sheets and vacuum draw. Dispatched initial freights to Europe.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-bronze-primary border-4 border-white"></div>
                  <h4 className="font-display text-base font-bold text-industrial-black">2020 — Ultra-Modern Automation</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans mt-1">
                    Installed custom German-engineered continuous hot rolling mills. Expanded capabilities of custom copper component stamping.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-bronze-primary border-4 border-white"></div>
                  <h4 className="font-display text-base font-bold text-industrial-black">2026 — Decarbonization Milestones</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans mt-1">
                    Converting 80% of factory heating power consumption into renewable energy equivalents, safeguarding pristine green supply chains.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-5 py-2 bg-industrial-black text-white hover:bg-bronze-primary text-xs font-mono uppercase tracking-widest rounded-[4px] transition-colors cursor-pointer"
                >
                  Acknowledge Journey
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= STATS BAR SECTION ================= */}
      <section ref={statsBannerRef} className="bg-industrial-gray-light py-16 border-t border-b border-gray-200/50 animate-stats-section" id="stats-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.id}
                onClick={() => setActiveStatId(activeStatId === stat.id ? null : stat.id)}
                className={`flex flex-col items-center justify-center text-center px-6 py-4 cursor-pointer group transition-all duration-300 relative ${
                  index !== 0 ? 'lg:border-l lg:border-gray-200' : ''
                }`}
                id={`stat-column-${stat.id}`}
              >
                <div className="mb-3.5 p-3.5 bg-white rounded-[4px] shadow-sm border border-gray-100 group-hover:scale-110 group-hover:bg-bronze-primary/10 transition-all duration-300">
                  {getStatsIcon(stat.iconName)}
                </div>

                <div className="font-display font-extrabold text-4xl sm:text-5xl text-industrial-black tracking-tight mb-1 font-sans">
                  {getAnimatedStatNumber(stat.id, stat.number)}
                </div>

                <div className="text-xs font-mono font-bold uppercase tracking-widest text-bronze-secondary">
                  {stat.label}
                </div>

                <p className="mt-2 text-[11px] text-gray-500 font-sans max-w-xs leading-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                  {stat.description}
                </p>

                <div className="absolute bottom-1 w-5 h-0.5 bg-bronze-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEW SECTION 1 - MANUFACTURING PROCESS ================= */}
      <div ref={section1Ref} className="reveal font-body">
        <section className="bg-[#F7F7F7] py-24" id="manufacturing-process">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-4 block">
                HOW WE WORK
              </span>
              <h2 className="font-display font-black text-4xl text-[#111111] mb-4">
                From Raw Copper to World-Class Products
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto font-body text-center leading-relaxed">
                Every Midland product goes through a rigorous 5-stage manufacturing process to ensure uncompromising quality.
              </p>
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
              {/* Connecting line between steps */}
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px border-t-2 border-dashed border-[#B08D57]/30 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 text-center flex-1 px-4" id="process-step-1">
                <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#B08D57] text-[#B08D57] font-display font-black text-xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  01
                </div>
                <Package className="w-7 h-7 text-[#B08D57] mx-auto mb-4" />
                <h4 className="font-display font-bold text-[#111111] text-base mb-2">Raw Material</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-body max-w-[140px] mx-auto">
                  Grade A copper cathodes sourced from certified global suppliers
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 text-center flex-1 px-4" id="process-step-2">
                <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#B08D57] text-[#B08D57] font-display font-black text-xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  02
                </div>
                <Flame className="w-7 h-7 text-[#B08D57] mx-auto mb-4" />
                <h4 className="font-display font-bold text-[#111111] text-base mb-2">Melting & Casting</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-body max-w-[140px] mx-auto">
                  Precision temperature controlled melting and continuous casting
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 text-center flex-1 px-4" id="process-step-3">
                <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#B08D57] text-[#B08D57] font-display font-black text-xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  03
                </div>
                <Settings2 className="w-7 h-7 text-[#B08D57] mx-auto mb-4" />
                <h4 className="font-display font-bold text-[#111111] text-base mb-2">Drawing & Rolling</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-body max-w-[140px] mx-auto">
                  Multi-pass drawing to achieve exact dimensions and tolerances
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 text-center flex-1 px-4" id="process-step-4">
                <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#B08D57] text-[#B08D57] font-display font-black text-xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  04
                </div>
                <ShieldCheck className="w-7 h-7 text-[#B08D57] mx-auto mb-4" />
                <h4 className="font-display font-bold text-[#111111] text-base mb-2">Quality Testing</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-body max-w-[140px] mx-auto">
                  12-parameter quality inspection on every single batch
                </p>
              </div>

              {/* Step 5 */}
              <div className="relative z-10 text-center flex-1 px-4" id="process-step-5">
                <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#B08D57] text-[#B08D57] font-display font-black text-xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  05
                </div>
                <Truck className="w-7 h-7 text-[#B08D57] mx-auto mb-4" />
                <h4 className="font-display font-bold text-[#111111] text-base mb-2">Global Dispatch</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-body max-w-[140px] mx-auto">
                  Professional packaging and worldwide delivery with full docs
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link
                to="/why-midland"
                className="inline-block border border-[#B08D57] text-[#B08D57] px-8 py-3 font-body font-semibold text-sm hover:bg-[#B08D57] hover:text-white transition-all duration-300"
                id="see-full-process-btn"
              >
                See Full Process →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ================= PRODUCTS SHOWCASE SECTION ================= */}
      <section className="bg-white py-20 md:py-28" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-bronze-primary font-bold">
              OUR PRODUCTS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-industrial-black uppercase">
              High Quality Copper Products
            </h2>
            <div className="h-[2px] w-16 bg-bronze-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="products-catalog-grid">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="bg-white border border-gray-150 rounded-[4px] border-b-[3px] border-b-bronze-primary overflow-hidden cursor-pointer group hover:shadow-2xl hover:border-bronze-primary/20 transition-all duration-300 flex flex-col h-full"
                id={`product-card-${prod.id}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-industrial-black">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors" />
                  <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-white uppercase bg-bronze-primary/90 px-2 py-0.5 rounded-[4px] font-semibold">
                    {prod.alloyGrades[0]}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base tracking-wider text-industrial-black uppercase group-hover:text-bronze-primary transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-sans font-light leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-auto">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-secondary font-bold flex items-center gap-1.5">
                      DATASHEET SPECIFICATIONS
                    </span>
                    <div className="p-1 px-1.5 bg-gray-50 border border-gray-200 group-hover:border-bronze-primary/30 group-hover:bg-bronze-primary/5 rounded-[4px] text-gray-500 group-hover:text-bronze-primary transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => onOpenQuote(PRODUCTS[0].id)}
              className="px-8 py-3.5 border border-bronze-primary text-bronze-primary hover:bg-bronze-primary hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-widest rounded-[4px] inline-flex items-center gap-2 cursor-pointer"
            >
              View All Products & Estimate Materials <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="datasheet-modal">
            <div className="fixed inset-0 bg-black/90 transition-opacity" onClick={() => setSelectedProduct(null)} />
            
            <div className="relative bg-white text-industrial-black max-w-4xl w-full rounded-[4px] shadow-2xl overflow-hidden z-10 border border-bronze-primary/20 flex flex-col lg:flex-row h-[90vh] lg:h-auto max-h-[750px] animate-fade-in">
              <div className="lg:w-1/2 bg-industrial-black text-white relative h-64 lg:h-auto">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover absolute inset-0 opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-black via-industrial-black/60 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 space-y-3 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-primary font-bold">
                    METALLURGICAL OVERVIEW
                  </span>
                  <h4 className="font-display font-bold text-2xl uppercase tracking-wide text-white">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">
                    {selectedProduct.longDescription}
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {selectedProduct.alloyGrades.map((grade) => (
                      <span key={grade} className="text-[10px] font-mono bg-white/10 text-white border border-white/10 px-2 py-0.5 rounded-[2px]">
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-[4px] lg:hidden z-20"
                >
                  ✕ Close
                </button>
              </div>

              <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-bronze-primary">TECHNICAL SPECIFICATION BOOKLET</h4>
                    <span className="font-display text-sm font-bold text-gray-400">Class 1 Electrolytic Castings</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    className="hidden lg:block text-xs font-mono text-gray-400 hover:text-industrial-black hover:font-bold"
                  >
                    [ CLOSE X ]
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-industrial-black">
                      <Activity className="w-4 h-4 text-bronze-primary" /> Verified Certifications compliance
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedProduct.specs.map((sp) => (
                        <div key={sp.label} className="flex justify-between text-xs py-1 px-2 border-b border-gray-50">
                          <span className="text-gray-500 font-mono">{sp.label}</span>
                          <span className="font-semibold text-industrial-black text-right">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-industrial-black">
                      <Layers className="w-4 h-4 text-bronze-primary" /> Key Performance Features
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1.5 font-sans font-light pl-6 list-disc">
                      {selectedProduct.features.map((feat, idx) => (
                        <li key={idx}>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-industrial-black">
                      <Tag className="w-4 h-4 text-bronze-primary" /> Premium Applications
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedProduct.applications.map((app) => (
                        <span key={app} className="text-[10px] font-sans font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-[2px]">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      onOpenQuote(selectedProduct.id);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-bronze-primary hover:bg-bronze-secondary text-white font-semibold py-3.5 rounded-[4px] text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    Configure Spec & Estimate Quotes <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-[10px] text-gray-400 font-mono text-center">
                    * ALL DATA COMPILATIONS COVERED BY MIDLAND STRUCTURAL WARRANTY DECALS
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= NEW SECTION 2 - FEATURED PRODUCT SPOTLIGHT ================= */}
      <div ref={section2Ref} className="reveal font-body">
        <section className="bg-[#111111] py-0" id="featured-product-spotlight">
          <div className="w-full flex flex-col lg:flex-row items-stretch min-h-[600px]">
            {/* Left Col (45%) */}
            <div className="w-full lg:w-[45%] bg-[#1F1F1F] p-12 sm:p-16 lg:p-24 flex flex-col justify-center">
              <div>
                <span className="bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-[10px] md:text-xs tracking-[0.3em] uppercase px-4 py-2 inline-block mb-8">
                  FEATURED PRODUCT
                </span>
                <h3 className="font-display font-black text-5xl text-white mb-2 leading-tight">
                  Copper Rods
                </h3>
                <p className="text-[#B08D57] text-lg font-body mb-8">
                  The Backbone of Industry
                </p>
                <div className="w-12 h-px bg-[#B08D57] mb-8"></div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div id="spec-1">
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider font-body mb-1">GRADE</div>
                    <div className="text-white font-display font-bold text-sm">Grade A ETP Copper</div>
                  </div>
                  <div id="spec-2">
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider font-body mb-1">PURITY</div>
                    <div className="text-white font-display font-bold text-sm">99.9% Pure</div>
                  </div>
                  <div id="spec-3">
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider font-body mb-1">STANDARD</div>
                    <div className="text-white font-display font-bold text-sm">ASTM B49 / IS 613</div>
                  </div>
                  <div id="spec-4">
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider font-body mb-1">SIZE RANGE</div>
                    <div className="text-white font-display font-bold text-sm">6mm to 50mm dia</div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-10">
                  <li className="flex items-center gap-3 text-gray-300 text-sm font-body">
                    <CheckCircle className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>Minimum 100% IACS electrical conductivity</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-sm font-body">
                    <CheckCircle className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>Superior tensile strength and flexibility</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-sm font-body">
                    <CheckCircle className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>Tight dimensional tolerance control</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-sm font-body">
                    <CheckCircle className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>Material test certificate with every order</span>
                  </li>
                </ul>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Link
                    to="/contact"
                    className="bg-[#B08D57] text-white px-8 py-4 font-semibold font-body text-center hover:bg-[#8C6A43] transition-all duration-300 text-sm"
                    id="request-quote-spotlight-btn"
                  >
                    Request Quote →
                  </Link>
                  <Link
                    to="/products"
                    className="border border-white/30 text-white px-8 py-4 text-center hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 font-body text-sm"
                    id="view-all-spotlight-btn"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Col (55%) */}
            <div className="w-full lg:w-[55%] relative min-h-[400px] lg:min-h-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618090584176-7132b9911657?w=900"
                alt="Copper Rods Spotlight"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/60 to-transparent"></div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= INDUSTRIES WE SERVE SECTION ================= */}
      <section className="bg-white py-20 md:py-28 border-t border-gray-150" id="industries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-bronze-primary font-bold">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-industrial-black uppercase">
              Powering Industries. Building Tomorrow.
            </h2>
            <div className="h-[2px] w-16 bg-bronze-primary mx-auto" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 mb-8" id="industry-nodes-horizontal">
            {INDUSTRIES.map((ind, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex flex-col items-center justify-center p-5 rounded-[4px] border transition-all duration-300 group cursor-pointer ${
                    isActive 
                      ? 'bg-industrial-black border-bronze-primary shadow-lg scale-105'
                      : 'border-gray-200 hover:border-bronze-primary/40 hover:bg-industrial-gray-light/30'
                  }`}
                  aria-label={`Select industry details for ${ind.name}`}
                >
                  <div className={`mb-3 p-2.5 rounded-[4px] transition-colors ${
                    isActive ? 'bg-bronze-primary' : 'bg-bronze-primary/5'
                  }`}>
                    {getIndustryIcon(ind.iconName, isActive)}
                  </div>
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider text-center ${
                    isActive ? 'text-white' : 'text-industrial-black'
                  }`}>
                    {ind.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div 
            className="bg-industrial-gray-light p-6 sm:p-10 rounded-[4px] border border-gray-200 transition-all duration-500 flex flex-col md:flex-row justify-between gap-8 items-center" 
            id="industry-details-panel"
          >
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-xs bg-bronze-primary/10 text-bronze-secondary font-mono font-bold uppercase py-1 px-3 rounded-[4px]">
                  {INDUSTRIES[activeIndex].name} DIVISION
                </span>
                <div className="h-[1px] w-12 bg-gray-300" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-industrial-black uppercase tracking-wide">
                INTEGRATION EXCELLENCE
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans font-light">
                {INDUSTRIES[activeIndex].description}
              </p>
            </div>

            <div className="bg-white p-6 rounded-[4px] border border-gray-150 shadow-sm w-full md:w-auto min-w-[240px] shrink-0 border-l-4 border-l-bronze-primary">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">KEY DESIGN METRIC</span>
              <div className="font-display font-bold text-lg text-industrial-black uppercase">
                {INDUSTRIES[activeIndex].stats.split(':')[0]}
              </div>
              <div className="font-sans font-bold text-xl text-bronze-primary mt-1">
                {INDUSTRIES[activeIndex].stats.split(':')[1]?.trim() || INDUSTRIES[activeIndex].stats}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-green-700 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> SECURE GRID STANDARD APPLIED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW STYLE INJECTION FOR PULSE & REVEALS ================= */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(2); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* ================= NEW SECTION 3 - WHY CHOOSE MIDLAND ================= */}
      <div ref={section3Ref} className="reveal font-body">
        <section className="bg-white py-24" id="why-choose-us">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-4 block">
                WHY MIDLAND
              </span>
              <h2 className="font-display font-black text-4xl text-[#111111] mt-3 mb-4">
                The Midland Advantage
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto font-body text-center leading-relaxed">
                What separates Midland from every other copper manufacturer.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" id="bento-grid">
              {/* Card 1 - Tall, span-1 tall */}
              <div 
                className="bg-[#111111] p-10 flex flex-col justify-between rounded-none shadow-sm relative overflow-hidden" 
                style={{ minHeight: '480px' }}
                id="bento-card-1"
              >
                <div>
                  <Award className="w-12 h-12 text-[#B08D57] mb-8 stroke-[1.25]" />
                  <h3 className="font-display font-black text-2xl text-white mb-4 leading-tight">
                    {yearsCount}+ Years of Proven Excellence
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-body font-light">
                    Since 1999 Midland has been setting the benchmark for copper manufacturing quality. Two and a half decades of experience means we have seen every challenge and perfected every process.
                  </p>
                </div>
                <div className="font-display font-black text-7xl text-[#B08D57]/20 mt-auto leading-none select-none">
                  {yearsCount}+
                </div>
              </div>

              {/* Column containing Card 2 & Card 3 */}
              <div className="flex flex-col gap-4">
                {/* Card 2 */}
                <div 
                  className="bg-[#F7F7F7] p-8 hover:bg-[#B08D57] group transition-all duration-500 flex flex-col justify-between flex-1 rounded-none"
                  id="bento-card-2"
                >
                  <div>
                    <Globe className="w-9 h-9 text-[#B08D57] mb-4 group-hover:text-white transition-colors duration-500 stroke-[1.25]" />
                    <h3 className="font-display font-bold text-xl text-[#111111] mb-3 group-hover:text-white transition-colors duration-500">
                      {countriesCount}+ Countries Served
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-body font-light group-hover:text-white/80 transition-colors duration-500">
                      From India to UAE to Europe and Americas our global logistics network delivers reliably to 40+ countries worldwide.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div 
                  className="bg-[#B08D57] p-8 flex flex-col justify-between flex-1 rounded-none shadow-sm"
                  id="bento-card-3"
                >
                  <div>
                    <ShieldCheck className="w-9 h-9 text-white mb-4 stroke-[1.25]" />
                    <h3 className="font-display font-bold text-xl text-white mb-3">
                      {qualityCount}% Quality Guaranteed
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed font-body font-light">
                      Every batch passes 12-point quality inspection. Material test certificates provided with every single shipment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 - Mini Stats Row & Happy Clients */}
              <div 
                className="bg-[#111111] p-8 flex flex-col justify-between rounded-none shadow-sm"
                id="bento-card-5"
              >
                <div>
                  <Users className="w-9 h-9 text-[#B08D57] mb-4 stroke-[1.25]" />
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {clientsCount}+ Happy Clients
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-body font-light mb-6">
                    From electrical contractors to infrastructure giants — 500+ clients trust Midland for consistent quality and reliable supply.
                  </p>
                </div>
                
                <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-white/5">
                  <div className="flex gap-1 text-[#B08D57] text-lg select-none">★★★★★</div>
                  <div className="text-gray-500 text-xs font-body font-medium">Rated 4.9/5 by our clients</div>
                  <a href="#testimonials-section" className="text-[#B08D57] text-xs font-body font-bold hover:underline mt-4 inline-block">
                    Read Testimonials →
                  </a>
                </div>
              </div>

              {/* Card 4 - Full wide on bottom row (colspan-2) inside lg:grid */}
              <div 
                className="col-span-1 lg:col-span-3 bg-[#F7F7F7] p-8 flex flex-col lg:flex-row items-center justify-between gap-12 rounded-none shadow-xs"
                id="bento-card-4"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <Factory className="w-16 h-16 text-[#B08D57] flex-shrink-0 stroke-[1.25]" />
                  <div className="space-y-3 text-center sm:text-left">
                    <h3 className="font-display font-bold text-2xl text-[#111111]">
                      State-of-the-Art Manufacturing Facility
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-body font-light max-w-lg">
                      Our modern production facility is equipped with the latest copper processing technology capable of producing 50,000+ metric tonnes annually across 6 product categories to exact international specifications.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 w-full lg:w-auto flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200/60 pt-6 lg:pt-0 lg:pl-8 text-center sm:text-left">
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-[#B08D57]">50K+</div>
                    <div className="text-gray-500 text-[10px] font-body mt-1 leading-tight uppercase tracking-wider">MT Annual Capacity</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-[#B08D57]">12</div>
                    <div className="text-gray-500 text-[10px] font-body mt-1 leading-tight uppercase tracking-wider">Quality Parameters</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-[#B08D57]">98.5%</div>
                    <div className="text-gray-500 text-[10px] font-body mt-1 leading-tight uppercase tracking-wider">On-Time Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= NEW SECTION 4 - TESTIMONIALS ================= */}
      <div ref={section4Ref} className="reveal font-body" id="testimonials-section">
        <section className="bg-[#F7F7F7] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-4 block">
                CLIENT TESTIMONIALS
              </span>
              <h2 className="font-display font-black text-4xl text-[#111111] mt-3 mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto font-body text-center leading-relaxed">
                What our clients say about working with Midland.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-10 border-b-4 border-transparent hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 group flex flex-col justify-between" id="testimonial-card-1">
                <div>
                  <div className="text-[#B08D57] font-serif text-8xl leading-none -mt-4 mb-2 opacity-20 select-none">“</div>
                  <div className="flex text-[#B08D57] text-sm mb-6 select-none">★★★★★</div>
                  <p className="text-gray-600 text-[15px] leading-relaxed italic font-body mb-8">
                    "Midland has been our trusted copper supplier for over 8 years. Their consistency in quality and on-time delivery is unmatched. We have never had a single quality rejection in all our years of working together."
                  </p>
                </div>
                <div>
                  <div className="w-full h-px bg-gray-100 mb-6"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#111111] text-white font-display font-bold flex items-center justify-center text-sm border-2 border-[#B08D57] flex-shrink-0">
                      RK
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#111111] text-sm">Rajesh Kumar</h4>
                      <p className="text-gray-400 text-xs font-body mt-1">Director, Kumar Electricals Ltd, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-10 border-b-4 border-transparent hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 group flex flex-col justify-between" id="testimonial-card-2">
                <div>
                  <div className="text-[#B08D57] font-serif text-8xl leading-none -mt-4 mb-2 opacity-20 select-none">“</div>
                  <div className="flex text-[#B08D57] text-sm mb-6 select-none">★★★★★</div>
                  <p className="text-gray-600 text-[15px] leading-relaxed italic font-body mb-8">
                    "We source all our copper rods and wires exclusively from Midland. The material quality consistently meets our strict international specifications and their export documentation is always perfect."
                  </p>
                </div>
                <div>
                  <div className="w-full h-px bg-gray-100 mb-6"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#111111] text-white font-display font-bold flex items-center justify-center text-sm border-2 border-[#B08D57] flex-shrink-0">
                      AA
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#111111] text-sm">Ahmed Al-Rashid</h4>
                      <p className="text-gray-400 text-xs font-body mt-1">Procurement Head, Gulf Industries, UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-10 border-b-4 border-transparent hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 group flex flex-col justify-between" id="testimonial-card-3">
                <div>
                  <div className="text-[#B08D57] font-serif text-8xl leading-none -mt-4 mb-2 opacity-20 select-none">“</div>
                  <div className="flex text-[#B08D57] text-sm mb-6 select-none">★★★★★</div>
                  <p className="text-gray-600 text-[15px] leading-relaxed italic font-body mb-8">
                    "Midland's technical team helped us specify the exact copper grade for our heat exchanger application. Products arrived on time in perfect condition with full MTC. Exceptional partner."
                  </p>
                </div>
                <div>
                  <div className="w-full h-px bg-gray-100 mb-6"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#111111] text-white font-display font-bold flex items-center justify-center text-sm border-2 border-[#B08D57] flex-shrink-0">
                      TW
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#111111] text-sm">Thomas Weber</h4>
                      <p className="text-gray-400 text-xs font-body mt-1">Operations Manager, EuroCopper GmbH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= NEW SECTION 5 - GLOBAL PRESENCE ================= */}
      <div ref={section5Ref} className="reveal font-body" id="global-presence">
        <section className="bg-[#111111] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Content Column (7 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-4 block">
                    GLOBAL PRESENCE
                  </span>
                  <h2 className="font-display font-black text-4xl text-white leading-tight mb-6">
                    Serving Industries Across 40+ Countries
                  </h2>
                  <div className="w-12 h-px bg-[#B08D57] mb-8"></div>
                </div>

                <p className="text-gray-400 leading-relaxed font-body font-light text-sm sm:text-base">
                  From our manufacturing facility we ship premium copper products to clients across Asia, Middle East, Europe, Africa and the Americas. Our global logistics network ensures reliable on-time delivery with complete documentation to any destination.
                </p>

                {/* Region tags */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="border border-white/20 text-gray-300 px-4 py-2 text-xs font-body hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 rounded-sm select-none">
                    🌏 South Asia
                  </span>
                  <span className="border border-white/20 text-gray-300 px-4 py-2 text-xs font-body hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 rounded-sm select-none">
                    🌍 Middle East
                  </span>
                  <span className="border border-white/20 text-gray-300 px-3.5 py-2 text-xs font-body hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 rounded-sm select-none">
                    🌍 Africa
                  </span>
                  <span className="border border-white/20 text-gray-300 px-3.5 py-2 text-xs font-body hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 rounded-sm select-none">
                    🌍 Europe
                  </span>
                  <span className="border border-white/20 text-gray-300 px-3.5 py-2 text-xs font-body hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 rounded-sm select-none">
                    🌎 Americas
                  </span>
                  <span className="border border-white/20 text-gray-300 px-3.5 py-2 text-xs font-body hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 rounded-sm select-none">
                    🌏 Southeast Asia
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#1F1F1F] border border-white/10 p-5 rounded-sm">
                    <div className="font-display font-black text-3xl text-[#B08D57]">40+</div>
                    <div className="text-gray-500 text-xs font-body mt-2">Countries Exported To</div>
                  </div>
                  <div className="bg-[#1F1F1F] border border-white/10 p-5 rounded-sm">
                    <div className="font-display font-black text-3xl text-[#B08D57]">500+</div>
                    <div className="text-gray-500 text-xs font-body mt-2">Global Clients</div>
                  </div>
                  <div className="bg-[#1F1F1F] border border-white/10 p-5 rounded-sm">
                    <div className="font-display font-black text-3xl text-[#B08D57]">98.5%</div>
                    <div className="text-gray-500 text-xs font-body mt-2">On-Time Delivery Rate</div>
                  </div>
                  <div className="bg-[#1F1F1F] border border-white/10 p-5 rounded-sm">
                    <div className="font-display font-black text-3xl text-[#B08D57]">24hrs</div>
                    <div className="text-gray-500 text-xs font-body mt-2">Quote Response Time</div>
                  </div>
                </div>
              </div>

              {/* Right Map Column (5 cols) */}
              <div className="lg:col-span-6">
                <div className="bg-[#1F1F1F] border border-white/10 p-8 flex flex-col justify-center min-h-[400px] relative overflow-hidden rounded-sm w-full h-full">
                  
                  {/* SVG Simplified Continent Map */}
                  <svg viewBox="0 0 1000 500" className="w-full h-full opacity-35 pointer-events-none select-none z-0">
                    <path d="M50 150 L100 120 L150 100 L200 90 L250 110 L300 120 L350 130 L380 180 L350 250 L300 280 L250 250 L200 230 L150 240 L100 220 Z" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="3 4" fill="#B08D57" fillOpacity="0.08" />
                    <path d="M250 260 L280 280 L300 320 L280 380 L250 450 L240 470 L220 440 L210 380 L200 320 L230 280 Z" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="3 4" fill="#B08D57" fillOpacity="0.08" />
                    <path d="M400 100 L450 80 L500 70 L600 60 L700 70 L800 80 L850 100 L800 180 L750 200 L700 220 L650 200 L600 240 L550 250 L500 250 L450 220 L400 180 Z" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="3 4" fill="#B08D57" fillOpacity="0.08" />
                    <path d="M420 230 L480 220 L530 250 L560 280 L540 330 L520 380 L480 430 L460 410 L440 350 L400 300 Z" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="3 4" fill="#B08D57" fillOpacity="0.08" />
                    <path d="M580 230 L620 220 L660 250 L700 260 L680 300 L650 320 L600 300 Z" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="3 4" fill="#B08D57" fillOpacity="0.08" />
                    <path d="M720 350 L780 340 L820 360 L800 420 L760 410 L730 380 Z" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="3 4" fill="#B08D57" fillOpacity="0.08" />
                  </svg>

                  {/* Animated Pulse Dots */}
                  
                  {/* India */}
                  <div className="absolute top-[40%] left-[62%] group cursor-pointer" id="dot-india">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      India
                    </div>
                  </div>

                  {/* UAE */}
                  <div className="absolute top-[38%] left-[57%] group cursor-pointer" id="dot-uae">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      UAE
                    </div>
                  </div>

                  {/* Germany */}
                  <div className="absolute top-[25%] left-[48%] group cursor-pointer" id="dot-germany">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      Germany
                    </div>
                  </div>

                  {/* UK */}
                  <div className="absolute top-[22%] left-[45%] group cursor-pointer" id="dot-uk">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      United Kingdom
                    </div>
                  </div>

                  {/* USA */}
                  <div className="absolute top-[32%] left-[20%] group cursor-pointer" id="dot-usa">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      United States
                    </div>
                  </div>

                  {/* Singapore */}
                  <div className="absolute top-[52%] left-[72%] group cursor-pointer" id="dot-singapore">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      Singapore
                    </div>
                  </div>

                  {/* Australia */}
                  <div className="absolute top-[65%] left-[75%] group cursor-pointer" id="dot-australia">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      Australia
                    </div>
                  </div>

                  {/* Nigeria */}
                  <div className="absolute top-[48%] left-[47%] group cursor-pointer" id="dot-nigeria">
                    <div className="absolute inset-0 rounded-full w-3.5 h-3.5 bg-[#B08D57] animate-pulse-custom"></div>
                    <div className="relative w-3.5 h-3.5 rounded-full bg-[#B08D57] border border-white"></div>
                    <div className="absolute bg-white text-[#111111] text-[10px] px-2.5 py-1 font-body whitespace-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm shadow-md font-bold font-mono z-50">
                      Nigeria
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <span className="font-display font-semibold text-white text-sm bg-[#111111]/90 px-3 py-1.5 border border-white/10 rounded-sm">
                      40+ Countries
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= WHY MIDLAND SECTION ================= */}
      <section className="bg-industrial-gray-light py-20 md:py-28 text-industrial-black border-t border-b border-gray-200" id="why-midland">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-bronze-primary font-bold block">
                ENGINEERING INTEGRITY
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-industrial-black uppercase">
                The Metallurgy of Uncompromised Trust
              </h2>
              <div className="h-[2px] w-12 bg-bronze-primary" />
              
              <p className="text-sm text-gray-500 leading-relaxed font-sans font-light">
                We understand that industrial infrastructure demands flawless core conductors. A single micro-pocket of oxidation can compromise entire regional grids. This is why Midland employs physical laser profiling and ultrasound integrity checking on every metric ton shipped.
              </p>

              <div className="p-4 bg-white rounded-[4px] border border-gray-200 flex gap-3 text-xs text-gray-600 font-sans leading-normal">
                <Zap className="w-5 h-5 text-bronze-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Premium Conductivity Guarantee:</strong> Every batch is double-tested and shipped with its certified copper test certificate.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-1 gap-6">
              {whyMidlandValues.map((v, i) => (
                <div 
                  key={i}
                  className="bg-white p-6 sm:p-8 rounded-[4px] border border-gray-150 shadow-sm flex flex-col sm:flex-row gap-5 items-start hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-industrial-gray-light rounded-[4px] text-bronze-primary shrink-0">
                    {v.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-base text-industrial-black uppercase tracking-wider">
                      {v.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed font-light">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW SECTION 6 - LATEST BLOG PREVIEW ================= */}
      <div ref={section6Ref} className="reveal font-body">
        <section className="bg-white py-24" id="latest-blog-preview">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-4 block">
                LATEST NEWS
              </span>
              <h2 className="font-display font-black text-4xl text-[#111111] mt-3 mb-4">
                Industry Insights & Market Updates
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto font-body text-center leading-relaxed">
                Stay informed with the latest updates from the copper world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Blog Post 1 */}
              <div className="group cursor-pointer" id="blog-preview-card-1">
                <Link to="/blog/copper-market-outlook-2025" className="block">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900"
                      alt="Copper Market Outlook 2025"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#B08D57] font-bold tracking-widest uppercase block mb-2">
                      MARKET OUTLOOK
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-[#B08D57] transition-colors duration-300 leading-snug mb-3">
                      Copper Market Outlook: Key Trends for 2025
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-body font-light mb-4 line-clamp-2">
                      As global demand for high-purity copper escalates in response to renewable energy acceleration, we explore the macroeconomic and technical drivers influencing prices and availability key updates.
                    </p>
                    <span className="inline-block text-[#B08D57] font-body text-xs font-bold group-hover:translate-x-2 transition-transform duration-300">
                      Read Article →
                    </span>
                  </div>
                </Link>
              </div>

              {/* Blog Post 2 */}
              <div className="group cursor-pointer" id="blog-preview-card-2">
                <Link to="/blog/etp-vs-dhp-copper-grades" className="block">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900"
                      alt="Understanding Copper Grades"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#B08D57] font-bold tracking-widest uppercase block mb-2">
                      TECHNICAL GUIDE
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#111111] group-hover:text-[#B08D57] transition-colors duration-300 leading-snug mb-3">
                      Understanding Copper Grades: ETP vs. DHP Copper
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-body font-light mb-4 line-clamp-2">
                      Choosing the right grade of copper can make or break an engineering project. In this technical bulletin, we discuss key metallurgical differences defining Electrolytic-Tough-Pitch and Deoxidized-High-Phosphorous.
                    </p>
                    <span className="inline-block text-[#B08D57] font-body text-xs font-bold group-hover:translate-x-2 transition-transform duration-300">
                      Read Article →
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link 
                to="/blog" 
                className="inline-block bg-[#111111] hover:bg-[#B08D57] text-white px-8 py-3.5 font-body font-semibold text-sm transition-all duration-300"
                id="view-all-insights-btn"
              >
                View All Insights →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ================= CTA BANNER SECTION ================= */}
      <section className="bg-industrial-black py-16 md:py-24 border-t border-b border-white/5 relative overflow-hidden" id="contact">
        <div 
          className="absolute left-0 top-0 bottom-0 w-full lg:w-1/2 opacity-15 pointer-events-none mix-blend-screen z-0 bg-cover bg-left-center"
          style={{ 
            backgroundImage: `url('/src/assets/images/copper_coils_1779552995494.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-industrial-black/80 to-industrial-black z-1 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze-primary font-bold block">
                GLOBAL PARTNERSHIPS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase leading-tight">
                Let's Build a Stronger Tomorrow, <br className="hidden sm:inline" />
                <span className="text-bronze-primary">Together.</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-sans font-light leading-relaxed">
                Partner with Midland for premium copper products and cables. We supply certified metallurgical materials optimized for modern heavy-engineering grid pipelines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto shrink-0">
              <button
                onClick={onOpenContact}
                className="px-6 py-4 border border-bronze-primary text-bronze-primary hover:text-white hover:bg-bronze-primary rounded-[4px] font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-bronze-primary/15"
              >
                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-[4px] font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
              >
                Configure RFQ Spec
              </button>
            </div>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="quote-drawer-container">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 transition-opacity duration-300" 
            onClick={onCloseQuote}
            id="quote-drawer-backdrop"
          />

          {/* Panel Centering Wrapper */}
          <div className="flex min-h-screen items-center justify-end p-0 sm:p-4">
            {/* Slidout Drawer Body */}
            <div 
              className="relative w-full max-w-2xl bg-white text-industrial-black shadow-2xl min-h-screen sm:min-h-0 sm:rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 transform translate-x-0"
              id="quote-calculator-panel"
            >
              {/* Header */}
              <div className="bg-industrial-black text-white p-6 border-b border-bronze-primary/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-bronze-primary/10 rounded-[4px] border border-bronze-primary/30">
                    <Calculator className="w-5 h-5 text-bronze-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-wide uppercase">Industrial Quote Architect</h3>
                    <p className="text-xs text-gray-400 font-mono">LIVE COPPER WEIGHT & RFQ ENGINE</p>
                  </div>
                </div>
                <button 
                  onClick={onCloseQuote}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-1 bg-white/5 rounded-[4px] hover:bg-white/10"
                  aria-label="Close quote drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Stepper Progress */}
              <div className="bg-industrial-gray-light px-6 py-3 border-b border-gray-200 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-[4px] ${quoteStep >= 1 ? 'bg-bronze-primary text-white font-bold' : 'bg-gray-200 text-gray-500'}`}>1</span>
                  <span className={quoteStep >= 1 ? 'text-industrial-black font-semibold' : 'text-gray-400'}>Specifications</span>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-300" />
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-[4px] ${quoteStep >= 2 ? 'bg-bronze-primary text-white font-bold' : 'bg-gray-200 text-gray-500'}`}>2</span>
                  <span className={quoteStep >= 2 ? 'text-industrial-black font-semibold' : 'text-gray-400'}>Corporate Info</span>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-300" />
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-[4px] ${quoteStep === 3 ? 'bg-green-600 text-white font-bold' : 'bg-gray-200 text-gray-500'}`}>3</span>
                  <span className={quoteStep === 3 ? 'text-industrial-black font-semibold' : 'text-gray-400'}>Complete</span>
                </div>
              </div>

              {/* Step Contents Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {quoteStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-bronze-primary tracking-widest mb-2">1. SELECT METAL PRODUCT</label>
                      <select 
                        value={quoteProductId}
                        onChange={(e) => setQuoteProductId(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-[4px] p-3 text-sm font-semibold tracking-wide text-industrial-black focus:outline-none focus:border-bronze-primary transition-colors"
                      >
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.id}>{p.name} — {p.tagline}</option>
                        ))}
                      </select>
                    </div>

                    {/* Alloy Grade */}
                    {currentProductInfoForQuote && (
                      <div>
                        <label className="block text-xs font-mono uppercase text-bronze-primary tracking-widest mb-2">2. SELECT METALLURGICAL GRADE</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {currentProductInfoForQuote.alloyGrades.map(grade => (
                            <button
                              key={grade}
                              type="button"
                              onClick={() => setQuoteAlloyGrade(grade)}
                              className={`p-3 text-xs font-mono rounded-[4px] text-center border transition-all duration-200 ${
                                quoteAlloyGrade === grade 
                                  ? 'bg-industrial-black border-bronze-primary text-bronze-primary font-bold shadow-sm'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                            >
                              {grade}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications Parameters Input Column */}
                    <div className="bg-industrial-gray-light p-5 rounded-[4px] border border-gray-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <span className="font-display font-semibold text-sm tracking-wide text-industrial-black">METRIC DIMENSIONS CALCULATOR</span>
                        <span className="text-[10px] bg-bronze-primary/20 text-bronze-secondary font-mono px-2 py-0.5 rounded-[4px] uppercase font-bold">Cu Grade A</span>
                      </div>

                      {quoteErrors.calculator && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[4px] font-mono">
                          {quoteErrors.calculator}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Dynamic fields dependent on Product Selection */}
                        {(quoteProductId === 'copper-rods' || quoteProductId === 'copper-wires' || quoteProductId === 'copper-tubes') && (
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              {quoteProductId === 'copper-tubes' ? 'Outer Diameter (mm)' : 'Diameter (mm)'}
                            </label>
                            <div className="relative">
                              <input 
                                type="number" 
                                value={quoteDiameter}
                                min={0.1}
                                max={200}
                                step={0.1}
                                onChange={(e) => setQuoteDiameter(Math.max(0.1, Number(e.target.value)))}
                                className="w-full bg-white border border-gray-300 rounded-[4px] p-2 text-sm text-industrial-black font-semibold pr-10 focus:outline-none focus:border-bronze-primary"
                              />
                              <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">mm</span>
                            </div>
                          </div>
                        )}

                        {quoteProductId === 'copper-sheets' && (
                          <>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Width (mm)</label>
                              <div className="relative">
                                <input 
                                  type="number" 
                                  value={quoteWidth}
                                  min={10}
                                  max={3000}
                                  onChange={(e) => setQuoteWidth(Math.max(10, Number(e.target.value)))}
                                  className="w-full bg-white border border-gray-300 rounded-[4px] p-2 text-sm text-industrial-black font-semibold pr-10 focus:outline-none focus:border-bronze-primary"
                                />
                                <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">mm</span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Thickness (mm)</label>
                              <div className="relative">
                                <input 
                                  type="number" 
                                  value={quoteThickness}
                                  min={0.1}
                                  max={100}
                                  step={0.1}
                                  onChange={(e) => setQuoteThickness(Math.max(0.1, Number(e.target.value)))}
                                  className="w-full bg-white border border-gray-300 rounded-[4px] p-2 text-sm text-industrial-black font-semibold pr-10 focus:outline-none focus:border-bronze-primary"
                                />
                                <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">mm</span>
                              </div>
                            </div>
                          </>
                        )}

                        {quoteProductId === 'copper-tubes' && (
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Wall Thickness (mm)</label>
                            <div className="relative">
                              <input 
                                type="number" 
                                value={quoteWallThickness}
                                min={0.1}
                                max={quoteDiameter / 2 - 0.1}
                                step={0.1}
                                onChange={(e) => setQuoteWallThickness(Math.max(0.1, Math.min(quoteDiameter / 2 - 0.1, Number(e.target.value))))}
                                className="w-full bg-white border border-gray-300 rounded-[4px] p-2 text-sm text-industrial-black font-semibold pr-10 focus:outline-none focus:border-bronze-primary"
                              />
                              <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">mm</span>
                            </div>
                          </div>
                        )}

                        {/* Standard Length Input (applicable to wires, rods, tubes, sheets) */}
                        {(quoteProductId !== 'copper-coils' && quoteProductId !== 'copper-components') && (
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              {quoteProductId === 'copper-sheets' ? 'Length (m)' : 'Total Segment Length (m)'}
                            </label>
                            <div className="relative">
                              <input 
                                type="number" 
                                value={quoteLength}
                                min={1}
                                onChange={(e) => setQuoteLength(Math.max(1, Number(e.target.value)))}
                                className="w-full bg-white border border-gray-300 rounded-[4px] p-2 text-sm text-industrial-black font-semibold pr-10 focus:outline-none focus:border-bronze-primary"
                              />
                              <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">m</span>
                            </div>
                          </div>
                        )}

                        {/* Package item count */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Total Pieces / Batches</label>
                          <input 
                            type="number" 
                            value={quoteQuantityCount}
                            min={1}
                            onChange={(e) => setQuoteQuantityCount(Math.max(1, Number(e.target.value)))}
                            className="w-full bg-white border border-gray-300 rounded-[4px] p-2 text-sm text-industrial-black font-semibold focus:outline-none focus:border-bronze-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Calculation Outputs Panel */}
                    <div className="border border-bronze-primary/30 bg-industrial-black text-white p-6 rounded-[4px] shadow-inner relative overflow-hidden">
                      <div className="absolute right-0 top-0 opacity-10">
                        <Globe className="w-48 h-48 -mr-10 -mt-10 text-white" />
                      </div>
                      
                      <div className="relative space-y-4">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-bronze-primary">DYNAMIC VOLUMETRIC EXTRAPOLATION</h4>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                          <div>
                            <span className="text-sm text-gray-400 block font-mono">ESTIMATED NET WEIGHT</span>
                            <div className="text-3xl font-display font-bold text-white flex items-baseline gap-1">
                              {quoteCalculatedWeight.toLocaleString()} <span className="text-lg text-bronze-primary font-normal">kg</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-400 block font-mono">GLOBAL SURCHARGE EST.</span>
                            <span className="text-xs bg-bronze-primary/20 text-bronze-primary font-semibold px-2 py-1 rounded-[4px]">
                              $ {USD_PER_KG} USD/kg index
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-300 font-mono">
                          <span>PROJECTED PRICING:</span>
                          <span className="text-white font-bold text-sm">
                            ${estimatedPriceRange.min.toLocaleString()} – ${estimatedPriceRange.max.toLocaleString()} USD
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal italic">
                          * This value includes base copper grade index and standard hot-extrusion casting charges. Shipping and logistics tariffs custom-applied on subsequent step.
                        </p>
                      </div>
                    </div>

                    {/* Footer Proceed button */}
                    <div className="pt-2">
                       <button
                        onClick={handleNextStep}
                        className="w-full bg-bronze-primary hover:bg-bronze-secondary text-white font-semibold py-4 rounded-[4px] text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all"
                      >
                        Proceed to Corporate Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {quoteStep === 2 && (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    <div className="bg-industrial-gray-light p-4 rounded-[4px] border border-gray-200">
                      <span className="text-[10px] font-mono text-bronze-primary uppercase block tracking-widest mb-2">QUOTATION SUMMARY</span>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-gray-600 uppercase font-bold">{currentProductInfoForQuote?.name} ({quoteAlloyGrade})</span>
                        <span className="text-industrial-black font-bold font-mono">Weight: {quoteCalculatedWeight.toLocaleString()} kg</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-gray-600 tracking-wider mb-1.5 flex justify-between">
                          <span>Full Name</span>
                          {quoteErrors.fullName && <span className="text-red-500 font-normal">{quoteErrors.fullName}</span>}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400"><User className="w-4 h-4" /></span>
                          <input 
                            type="text" 
                            value={quoteFullName}
                            onChange={(e) => setQuoteFullName(e.target.value)}
                            placeholder="John Doe"
                            className={`w-full bg-white border rounded-[4px] pl-10 pr-4 py-2.5 text-sm ${quoteErrors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-bronze-primary'} focus:outline-none text-industrial-black font-semibold`}
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-gray-600 tracking-wider mb-1.5 flex justify-between">
                          <span>Company Name</span>
                          {quoteErrors.company && <span className="text-red-500 font-normal">{quoteErrors.company}</span>}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400"><Building className="w-4 h-4" /></span>
                          <input 
                            type="text" 
                            value={quoteCompany}
                            onChange={(e) => setQuoteCompany(e.target.value)}
                            placeholder="Industrial Power Grid Corp"
                            className={`w-full bg-white border rounded-[4px] pl-10 pr-4 py-2.5 text-sm ${quoteErrors.company ? 'border-red-500' : 'border-gray-300 focus:border-bronze-primary'} focus:outline-none text-industrial-black font-semibold`}
                          />
                        </div>
                      </div>

                      {/* Split Row for Business Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-gray-600 tracking-wider mb-1.5 flex justify-between">
                            <span>Work Email</span>
                            {quoteErrors.email && <span className="text-red-500 font-normal">{quoteErrors.email}</span>}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400"><Mail className="w-4 h-4" /></span>
                            <input 
                              type="email" 
                              value={quoteEmail}
                              onChange={(e) => setQuoteEmail(e.target.value)}
                              placeholder="procurement@company.com"
                              className={`w-full bg-white border rounded-[4px] pl-10 pr-4 py-2.5 text-sm ${quoteErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-bronze-primary'} focus:outline-none text-industrial-black font-semibold`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-gray-600 tracking-wider mb-1.5 flex justify-between">
                            <span>Phone No</span>
                            {quoteErrors.phone && <span className="text-red-500 font-normal">{quoteErrors.phone}</span>}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400"><Phone className="w-4 h-4" /></span>
                            <input 
                              type="tel" 
                              value={quotePhone}
                              onChange={(e) => setQuotePhone(e.target.value)}
                              placeholder="+1 (555) 019-2834"
                              className={`w-full bg-white border rounded-[4px] pl-10 pr-4 py-2.5 text-sm ${quoteErrors.phone ? 'border-red-500' : 'border-gray-300 focus:border-bronze-primary'} focus:outline-none text-industrial-black font-semibold`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Notes / Technical Specs details */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-gray-600 tracking-wider mb-1.5">Custom metallurgical requirements / tolerances</label>
                        <textarea 
                          value={quoteNotes}
                          onChange={(e) => setQuoteNotes(e.target.value)}
                          placeholder="Specify if tinned or silver plated finishes, specific continuous casting temper specifications, or custom length packaging are wanted."
                          rows={3}
                          className="w-full bg-white border border-gray-300 rounded-[4px] p-3 text-sm text-industrial-black focus:outline-none focus:border-bronze-primary font-sans leading-normal"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setQuoteStep(1)}
                        className="w-full sm:w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-4 rounded-[4px] text-sm uppercase tracking-wider transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-2/3 bg-industrial-black hover:bg-bronze-primary text-white font-semibold py-4 rounded-[4px] text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
                      >
                        Submit RFQ Request <ShieldCheck className="w-4 h-4 text-bronze-primary" />
                      </button>
                    </div>
                  </form>
                )}

                {quoteStep === 3 && quoteFormSubmitted && (
                  <div className="py-8 text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-[4px] text-green-600 mb-2">
                      <CheckCircle2 className="w-16 h-16 stroke-[1.5]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-display text-2xl font-bold uppercase tracking-wide text-industrial-black">RFQ Sent Successfully!</h4>
                      <p className="text-gray-500 text-sm max-w-md mx-auto">
                        Your request has been filed in the Midland Central Enterprise ERP under Reference Code: 
                        <span className="font-mono text-bronze-secondary font-bold ml-1">MCM-2026-{(Math.floor(Math.random() * 90000) + 10000)}</span>.
                      </p>
                    </div>

                    {/* Printable/Readable breakdown details */}
                    <div className="bg-industrial-gray-light p-6 rounded-[4px] text-left border border-gray-200 max-w-md mx-auto font-mono text-xs text-gray-700 leading-relaxed divide-y divide-gray-200 font-semibold">
                      <div className="pb-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        OFFICIAL QUOTATION RECEIPT
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span>COMPANY:</span>
                        <span className="font-bold text-industrial-black">{quoteCompany}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span>PROCUREMENT CONTACT:</span>
                        <span className="font-bold text-industrial-black">{quoteFullName}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span>PRODUCT LINE:</span>
                        <span className="font-bold text-industrial-black uppercase">{currentProductInfoForQuote?.name}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span>METALLURGICAL ALLOY:</span>
                        <span className="font-bold text-bronze-secondary font-mono">{quoteAlloyGrade}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span>TOTAL MASS DEMAND:</span>
                        <span className="font-bold text-industrial-black">{quoteCalculatedWeight.toLocaleString()} kg</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-baseline bg-industrial-black/5 -mx-6 px-6 font-bold">
                        <span className="text-industrial-black">EST. MATERIAL INDEX VALUE:</span>
                        <span className="text-bronze-secondary text-sm">
                          ${estimatedPriceRange.min.toLocaleString()} - ${estimatedPriceRange.max.toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-400 max-w-xs mx-auto leading-normal font-sans">
                      A metallurgical sales engineer from our international logistics desk will call you at <span className="font-semibold">{quotePhone}</span> within 2 hours.
                    </p>

                    <div className="pt-4 max-w-xs mx-auto">
                      <button
                        onClick={resetQuoteForm}
                        className="w-full bg-industrial-black hover:bg-bronze-primary text-white font-semibold py-3.5 rounded-[4px] text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Calculate Another Product
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Secure disclaimer footnote */}
              <div className="p-4 bg-industrial-gray-light/50 border-t border-gray-200 text-[10px] text-gray-400 text-center flex items-center justify-center gap-2 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-bronze-primary" /> SECURED WITH MILITARY-GRADE AES-256 TRANSIT ENCRYPTION
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  ChevronRight, 
  Download, 
  Award, 
  ShieldCheck, 
  FileCheck, 
  Globe, 
  X 
} from 'lucide-react';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Intersection Observer for scroll reveal animations
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
  }, [activeCategory, isTransitioning]);

  const handleCategoryChange = (category: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsTransitioning(false);
    }, 250);
  };

  const categories = [
    "All Products",
    "Copper Rods",
    "Copper Wires",
    "Copper Sheets",
    "Copper Tubes",
    "Copper Coils",
    "Copper Components"
  ];

  const productsData = [
    {
      id: 1,
      category: "Copper Rods",
      name: "Copper Rods",
      tagline: "High Conductivity Industrial Rods",
      image: "https://images.unsplash.com/photo-1618090584176-7132b9911657?w=800",
      grade: "Grade A ETP Copper",
      standard: "ASTM B49 / IS 613",
      purity: "99.9% Pure Copper",
      sizes: "6mm to 50mm diameter",
      applications: [
        "Electrical conductors",
        "Motor windings",
        "Transformer components",
        "Bus bars"
      ],
      features: [
        "High electrical conductivity",
        "Excellent thermal conductivity",
        "Superior corrosion resistance",
        "Precise dimensional tolerance"
      ],
      badge: "BESTSELLER"
    },
    {
      id: 2,
      category: "Copper Wires",
      name: "Copper Wires",
      tagline: "Flexible High-Performance Wires",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      grade: "Grade A ETP Copper",
      standard: "ASTM B3 / IS 8130",
      purity: "99.9% Pure Copper",
      sizes: "0.1mm to 8mm diameter",
      applications: [
        "Power cables",
        "Telecommunications",
        "Electronics",
        "Automotive wiring"
      ],
      features: [
        "Excellent flexibility",
        "High tensile strength",
        "Low electrical resistance",
        "Consistent diameter"
      ],
      badge: "POPULAR"
    },
    {
      id: 3,
      category: "Copper Sheets",
      name: "Copper Sheets",
      tagline: "Premium Flat Rolled Copper Sheets",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800",
      grade: "Grade A DHP Copper",
      standard: "ASTM B152 / IS 1897",
      purity: "99.9% Pure Copper",
      sizes: "0.3mm to 10mm thickness",
      applications: [
        "Roofing and cladding",
        "Electrical busbars",
        "Heat exchangers",
        "Decorative applications"
      ],
      features: [
        "Smooth surface finish",
        "Uniform thickness",
        "Excellent formability",
        "Weather resistant"
      ],
      badge: null
    },
    {
      id: 4,
      category: "Copper Tubes",
      name: "Copper Tubes",
      tagline: "Seamless Precision Copper Tubes",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
      grade: "Grade A DHP Copper",
      standard: "ASTM B88 / IS 7291",
      purity: "99.9% Pure Copper",
      sizes: "6mm to 108mm OD",
      applications: [
        "Plumbing systems",
        "HVAC refrigeration",
        "Medical gas lines",
        "Industrial heat exchangers"
      ],
      features: [
        "Seamless construction",
        "Pressure tested",
        "Corrosion resistant",
        "Precise wall thickness"
      ],
      badge: "NEW"
    },
    {
      id: 5,
      category: "Copper Coils",
      name: "Copper Coils",
      tagline: "High Grade Copper Coils & Strips",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      grade: "Grade A ETP Copper",
      standard: "ASTM B272 / IS 1897",
      purity: "99.9% Pure Copper",
      sizes: "0.1mm to 5mm thickness",
      applications: [
        "Transformer windings",
        "Motor coils",
        "Electronics",
        "Flexible connectors"
      ],
      features: [
        "Tight winding tension",
        "No surface defects",
        "Consistent strip width",
        "High conductivity"
      ],
      badge: null
    },
    {
      id: 6,
      category: "Copper Components",
      name: "Copper Components",
      tagline: "Precision Engineered Copper Parts",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800",
      grade: "Grade A ETP / DHP Copper",
      standard: "Custom to Specification",
      purity: "99.9% Pure Copper",
      sizes: "Custom dimensions available",
      applications: [
        "Electrical terminals",
        "Switchgear components",
        "Industrial connectors",
        "Custom fabrications"
      ],
      features: [
        "CNC precision machined",
        "Custom specifications",
        "Tight tolerances",
        "Surface treated options"
      ],
      badge: "CUSTOM"
    }
  ];

  const filteredProducts = activeCategory === "All Products"
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="products-catalog-overall-view">
      {/* Absolute CSS styled animations injection */}
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
        
        .animate-fade-up-0 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0ms;
        }

        .animate-fade-up-150 {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 150ms;
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

        @keyframes modalIn {
          from { 
            opacity: 0; 
            transform: scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hidden {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* SECTION 1 - CINEMATIC HERO */}
      <section className="relative min-h-[70vh] flex items-center bg-[#111111] overflow-hidden" id="products-hero">
        {/* Full bleed background image right side */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 select-none z-0" id="hero-img-overlay-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1618090584176-7132b9911657?w=1920" 
            alt="Midland cinematic production"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Overlay left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/40" />
        </div>

        {/* Large screen overlay for pristine integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/95 to-transparent hidden lg:block z-5" />

        {/* Safe overlay for readability across mobile screen variants */}
        <div className="absolute inset-0 bg-[#111111]/80 lg:hidden z-5" />

        {/* Hero content vertically centered */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 lg:px-24 py-20 w-full flex items-center" id="hero-middle-body">
          <div className="max-w-3xl text-left" id="hero-text-and-items">
            <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-6 block animate-fade-up-0" id="hero-breadcrumb">
              HOME &gt; PRODUCTS
            </span>

            <h1 className="font-display font-black leading-none uppercase tracking-tight mb-2" id="hero-editorial-lines">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white animate-fade-up-150">
                Premium Copper
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#B08D57] animate-fade-up-300">
                Products.
              </span>
            </h1>

            <div className="w-16 h-px bg-[#B08D57] my-8 animate-fade-up-400" id="hero-copper-separator" />

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-lg font-body font-light animate-fade-up-500 mb-10" id="hero-brief-subtext">
              Six categories of precision-engineered copper products meeting the highest national standards — crafted for industries that demand the best.
            </p>

            <div className="flex gap-12 animate-fade-up-600" id="hero-mini-statistics-deck">
              <div className="flex flex-col" id="stat-category-count">
                <span className="text-3xl font-black text-[#B08D57] font-display">6</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider font-body mt-1">Product Categories</span>
              </div>
              <div className="flex flex-col" id="stat-specs-count">
                <span className="text-3xl font-black text-[#B08D57] font-display">50+</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider font-body mt-1">Specifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - PRODUCT CATEGORY TABS */}
      <div className="sticky top-[70px] z-40 bg-white border-b border-gray-200 shadow-sm" id="category-tabs-sticky-strip">
        <div className="max-w-7xl mx-auto px-6 py-6" id="sticky-strip-nested-container">
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden" id="horizontal-scrollable-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-3 text-sm font-medium font-body whitespace-nowrap transition-all duration-300 rounded-none border ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                id={`cat-tab-button-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 - PRODUCTS GRID */}
      <section className="bg-[#F7F7F7] py-20" id="products-grid-view">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-gray-500 font-body mb-8" id="products-count-line">
            Showing <span className="font-bold text-[#111111]">{filteredProducts.length}</span> products
          </div>

          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
            id="products-grid-deck"
          >
            {filteredProducts.map((prod, index) => (
              <div 
                key={prod.id}
                style={{ transitionDelay: `${index * 100}ms` }}
                className="bg-white group cursor-pointer border border-gray-100 hover:border-[#B08D57] hover:shadow-2xl transition-all duration-500 overflow-hidden reveal"
                id={`product-card-${prod.id}`}
                onClick={() => setSelectedProduct(prod)}
              >
                {/* TOP - Image Section */}
                <div className="relative h-64 overflow-hidden bg-[#111111]" id={`product-img-box-${prod.id}`}>
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/30 transition-all duration-500" />
                  
                  {/* Badge top-left if exists */}
                  {prod.badge && (
                    <div className="absolute top-4 left-4 bg-[#B08D57] text-white text-xs font-bold tracking-wider px-3 py-1 font-body">
                      {prod.badge}
                    </div>
                  )}

                  {/* Category tag top-right */}
                  <div className="absolute top-4 right-4 bg-white/90 text-[#111111] text-xs font-medium px-3 py-1 font-body">
                    {prod.category}
                  </div>

                  {/* Bottom overlay slide up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-6">
                    <span className="text-white text-sm font-medium font-body flex items-center gap-2">
                      View Details &rarr;
                    </span>
                  </div>
                </div>

                {/* BOTTOM - Content Section */}
                <div className="p-6 flex flex-col justify-between" id={`product-content-box-${prod.id}`}>
                  <div>
                    <h3 className="font-display font-black text-xl text-[#111111] mb-1">
                      {prod.name}
                    </h3>
                    <div className="text-[#B08D57] text-xs font-medium uppercase tracking-wider font-body mb-4">
                      {prod.tagline}
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-4" />

                    {/* Two column mini specifications */}
                    <div className="grid grid-cols-2 gap-3 mb-4" id={`specs-grid-${prod.id}`}>
                      <div>
                        <div className="text-gray-400 text-[10px] font-body uppercase">Grade</div>
                        <div className="text-[#111111] text-xs font-bold font-display mt-0.5 truncate">{prod.grade}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] font-body uppercase">Standard</div>
                        <div className="text-[#111111] text-xs font-bold font-display mt-0.5 truncate">{prod.standard}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] font-body uppercase">Purity</div>
                        <div className="text-[#111111] text-xs font-bold font-display mt-0.5 truncate">{prod.purity}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] font-body uppercase">Sizes</div>
                        <div className="text-[#111111] text-xs font-bold font-display mt-0.5 truncate">{prod.sizes}</div>
                      </div>
                    </div>

                    {/* Applications Row tag elements */}
                    <div className="flex flex-wrap gap-1 mt-4" id={`tags-deck-${prod.id}`}>
                      {prod.applications.slice(0, 3).map((app, appIdx) => (
                        <span key={appIdx} className="bg-[#F7F7F7] text-gray-600 text-[10px] px-2.5 py-1 font-body">
                          {app}
                        </span>
                      ))}
                      {prod.applications.length > 3 && (
                        <span className="bg-[#F7F7F7] text-gray-400 text-[10px] px-2.5 py-1 font-body">
                          +{prod.applications.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom CTA row */}
                  <div 
                    className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100" 
                    id={`card-cta-row-${prod.id}`}
                    onClick={(e) => e.stopPropagation()} // Stop propagation from parent card click trigger
                  >
                    <Link
                      to="/contact"
                      className="bg-[#B08D57] text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2.5 hover:bg-[#8C6A43] transition-all duration-300 font-body"
                    >
                      Get Quote
                    </Link>
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="text-[#B08D57] text-xs font-medium font-body hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Specifications &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-[#111111]/90 z-50 flex items-center justify-center p-4 sm:p-6"
          id="product-detail-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-[modalIn_0.35s_cubic-bezier(0.16,1,0.3,1)] shadow-2xl"
            id="product-detail-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#111111] transition-colors cursor-pointer z-10 p-2"
              aria-label="Close modal"
              id="details-modal-close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content Structure Split */}
            <div className="grid grid-cols-1 md:grid-cols-2" id="modal-grid-container">
              
              {/* LEFT Column Image */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-[#111111]" id="modal-left-viewport">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover absolute inset-0"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* RIGHT Column Content */}
              <div className="p-8 sm:p-10 flex flex-col justify-between" id="modal-right-viewport">
                <div>
                  <span className="bg-[#B08D57]/10 text-[#B08D57] text-[10px] tracking-widest font-bold uppercase px-3 py-1 inline-block mb-4">
                    {selectedProduct.category}
                  </span>

                  <h2 className="font-display font-black text-3xl text-[#111111] mb-2 uppercase tracking-wide">
                    {selectedProduct.name}
                  </h2>

                  <p className="text-gray-500 text-sm font-body mb-6 font-light leading-relaxed">
                    {selectedProduct.tagline}
                  </p>

                  <div className="w-12 h-px bg-[#B08D57] mb-6" id="modal-bronze-bar" />

                  {/* Specifications Table */}
                  <div className="border border-gray-100 flex flex-col text-sm mb-6" id="modal-specs-table">
                    <div className="flex justify-between border-b border-gray-100 py-3 px-4">
                      <span className="text-gray-500 font-body">Grade</span>
                      <span className="text-[#111111] font-bold font-display">{selectedProduct.grade}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-3 px-4 bg-[#F7F7F7]">
                      <span className="text-gray-500 font-body">Standard Reference</span>
                      <span className="text-[#111111] font-bold font-display">{selectedProduct.standard}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-3 px-4">
                      <span className="text-gray-500 font-body">Material Purity</span>
                      <span className="text-[#111111] font-bold font-display">{selectedProduct.purity}</span>
                    </div>
                    <div className="flex justify-between py-3 px-4 bg-[#F7F7F7]">
                      <span className="text-gray-500 font-body">Size Range Available</span>
                      <span className="text-[#111111] font-bold font-display">{selectedProduct.sizes}</span>
                    </div>
                  </div>

                  {/* Key Applications section */}
                  <div className="mt-8" id="modal-applications-section">
                    <h4 className="font-display font-bold text-base text-[#111111] uppercase tracking-wider mb-3">
                      Key Applications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="modal-applications-bullet-grid">
                      {selectedProduct.applications.map((app: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#B08D57] shrink-0" />
                          <span className="text-gray-600 text-sm font-body font-light">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features section */}
                  <div className="mt-8" id="modal-features-section">
                    <h4 className="font-display font-bold text-base text-[#111111] uppercase tracking-wider mb-3">
                      Key Features & Quality
                    </h4>
                    <div className="space-y-2" id="modal-features-list">
                      {selectedProduct.features.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-[#B08D57] shrink-0" />
                          <span className="text-gray-600 text-sm font-body font-light">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Closing CTA Trigger */}
                <Link
                  to="/contact"
                  className="bg-[#B08D57] text-white w-full py-4 font-semibold text-xs tracking-widest uppercase hover:bg-[#8C6A43] transition-all font-body text-center block mt-10 active:scale-[0.99]"
                  onClick={() => setSelectedProduct(null)}
                >
                  Request Quote for This Product &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5 - WHY OUR PRODUCTS */}
      <section className="bg-[#111111] py-24" id="quality-features-banner">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-[#B08D57] text-center text-xs tracking-[0.3em] font-semibold block uppercase mb-3">
            PRODUCT QUALITY
          </span>
          <h2 className="font-display font-black text-4xl text-white text-center mb-4 uppercase tracking-wide">
            Every Product. Every Time.
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto font-body font-light text-sm sm:text-base leading-relaxed">
            Zero compromise on quality across our entire product range. Specially built for extreme industrial demands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" id="why-products-deck">
            {/* Feature 1 */}
            <div className="text-center p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0" id="quality-column-1">
              <div className="text-6xl font-black text-[#B08D57]/20 font-display leading-none">
                01
              </div>
              <Award className="w-9 h-9 text-[#B08D57] mx-auto mt-4" />
              <h3 className="text-white font-display font-bold text-lg mt-4 uppercase tracking-wide">
                Grade A Only
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-body mt-2 max-w-[200px] mx-auto font-light">
                We use exclusively Grade A electrolytic copper in all products.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 border-b md:border-b-0 lg:border-r border-white/10 last:border-0" id="quality-column-2">
              <div className="text-6xl font-black text-[#B08D57]/20 font-display leading-none">
                02
              </div>
              <ShieldCheck className="w-9 h-9 text-[#B08D57] mx-auto mt-4" />
              <h3 className="text-white font-display font-bold text-lg mt-4 uppercase tracking-wide">
                12-Point Testing
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-body mt-2 max-w-[200px] mx-auto font-light">
                Every batch passes 12 quality parameters before dispatch.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0" id="quality-column-3">
              <div className="text-6xl font-black text-[#B08D57]/20 font-display leading-none">
                03
              </div>
              <FileCheck className="w-9 h-9 text-[#B08D57] mx-auto mt-4" />
              <h3 className="text-white font-display font-bold text-lg mt-4 uppercase tracking-wide">
                MTC Provided
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-body mt-2 max-w-[200px] mx-auto font-light">
                Full material test certificates with every shipment.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-8" id="quality-column-4">
              <div className="text-6xl font-black text-[#B08D57]/20 font-display leading-none">
                04
              </div>
              <Globe className="w-9 h-9 text-[#B08D57] mx-auto mt-4" />
              <h3 className="text-white font-display font-bold text-lg mt-4 uppercase tracking-wide">
                Certified Standards
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-body mt-2 max-w-[200px] mx-auto font-light">
                ASTM, BS and IS certified across all product lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - SPECIFICATIONS TABLE */}
      <section className="bg-white py-24" id="tech-specs-table-block">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-[#B08D57] text-center text-xs tracking-[0.3em] font-semibold block uppercase mb-3">
            TECHNICAL SPECS
          </span>
          <h2 className="font-display font-black text-4xl text-[#111111] text-center mb-16 uppercase tracking-tight">
            Product Specifications Overview
          </h2>

          <div className="overflow-x-auto border border-gray-200" id="comparison-table-scroller">
            <table className="w-full text-left border-collapse min-w-[800px]" id="comparison-table">
              <thead>
                <tr className="bg-[#111111] text-white font-display uppercase text-[10px] tracking-widest border-b border-gray-300">
                  <th className="py-5 px-6 font-bold">Product</th>
                  <th className="py-5 px-6 font-bold">Grade</th>
                  <th className="py-5 px-6 font-bold">Standard</th>
                  <th className="py-5 px-6 font-bold">Purity</th>
                  <th className="py-5 px-6 font-bold">Size Range</th>
                  <th className="py-5 px-6 font-bold">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-[#B08D57]/5 transition-colors duration-200" id="row-rods">
                  <td className="py-5 px-6 font-display font-bold text-[#111111] text-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] shrink-0" />
                    Copper Rods
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Grade A ETP</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">ASTM B49 / IS 613</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">99.9%</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">6-50mm dia</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Electrical</td>
                </tr>
                <tr className="bg-[#F7F7F7] hover:bg-[#B08D57]/5 transition-colors duration-200" id="row-wires">
                  <td className="py-5 px-6 font-display font-bold text-[#111111] text-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] shrink-0" />
                    Copper Wires
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Grade A ETP</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">ASTM B3 / IS 8130</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">99.9%</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">0.1-8mm dia</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Power/Telecom</td>
                </tr>
                <tr className="hover:bg-[#B08D57]/5 transition-colors duration-200" id="row-sheets">
                  <td className="py-5 px-6 font-display font-bold text-[#111111] text-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] shrink-0" />
                    Copper Sheets
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Grade A DHP</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">ASTM B152 / IS 1897</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">99.9%</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">0.3-10mm thick</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Construction</td>
                </tr>
                <tr className="bg-[#F7F7F7] hover:bg-[#B08D57]/5 transition-colors duration-200" id="row-tubes">
                  <td className="py-5 px-6 font-display font-bold text-[#111111] text-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] shrink-0" />
                    Copper Tubes
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Grade A DHP</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">ASTM B88 / IS 7291</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">99.9%</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">6-108mm OD</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Plumbing/HVAC</td>
                </tr>
                <tr className="hover:bg-[#B08D57]/5 transition-colors duration-150" id="row-coils">
                  <td className="py-5 px-6 font-display font-bold text-[#111111] text-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] shrink-0" />
                    Copper Coils
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Grade A ETP</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">ASTM B272 / IS 1897</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">99.9%</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">0.1-5mm thick</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Transformers</td>
                </tr>
                <tr className="bg-[#F7F7F7] hover:bg-[#B08D57]/5 transition-colors duration-150" id="row-components">
                  <td className="py-5 px-6 font-display font-bold text-[#111111] text-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] shrink-0" />
                    Copper Components
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Grade A ETP/DHP</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Custom Spec</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">99.9%</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Custom</td>
                  <td className="py-5 px-6 text-gray-600 font-body text-xs">Industrial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7 - CATALOG DOWNLOAD */}
      <section className="bg-[#1F1F1F] py-20" id="catalog-download-block">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="w-20 h-20 bg-[#B08D57]/10 border border-[#B08D57]/30 text-[#B08D57] p-5 mx-auto mb-8 flex items-center justify-center">
            <Download className="w-10 h-10" />
          </div>

          <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">
            Download Our Product Catalog
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-4 max-w-lg mx-auto font-body font-light">
            Get complete specifications, size charts and technical data for all Midland copper products in one comprehensive PDF catalog.
          </p>

          <div className="flex gap-12 justify-center mt-8 mb-10" id="catalog-download-stats">
            <div className="text-center">
              <span className="text-2xl font-black text-[#B08D57] font-display block">24 Pages</span>
              <span className="text-gray-500 text-xs mt-1 font-body uppercase tracking-wider block">Complete Catalog</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-[#B08D57] font-display block">6 Categories</span>
              <span className="text-gray-500 text-xs mt-1 font-body uppercase tracking-wider block">All Products</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-[#B08D57] font-display block">PDF Format</span>
              <span className="text-gray-500 text-xs mt-1 font-body uppercase tracking-wider block">Easy to Share</span>
            </div>
          </div>

          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Your Midland Cable Manufacture full product catalog PDF download has started successfully.");
            }}
            className="bg-[#B08D57] text-white px-12 py-5 font-semibold font-body hover:bg-[#8C6A43] transition-all duration-300 flex items-center gap-3 mx-auto uppercase text-xs tracking-widest cursor-pointer w-fit"
            id="catalog-download-action-btn"
          >
            <Download className="w-[18px] h-[18px]" />
            Download Catalog PDF
          </a>

          <p className="text-gray-600 text-xs mt-4 font-body font-light">
            Free download. No registration required.
          </p>
        </div>
      </section>

      {/* SECTION 8 - CTA BANNER */}
      <section className="bg-[#111111] py-32 px-6 relative overflow-hidden" id="cta-footer-banner">
        {/* Extreme dark background image layout */}
        <div className="absolute inset-0 w-full select-none" id="cta-banner-bg-container">
          <img 
            src="https://images.unsplash.com/photo-1618090584176-7132b9911657?w=1920" 
            alt="Midland heavy duty warehouse copper"
            className="w-full h-full object-cover opacity-15"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#111111]/85" />
        </div>

        {/* Action content panel */}
        <div className="relative z-10 max-w-4xl mx-auto text-center" id="cta-text-content">
          <div className="inline-block mb-8" id="cta-badge">
            <span className="bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#B08D57] text-xs tracking-[0.3em] uppercase px-6 py-2 block font-body font-semibold">
              READY TO ORDER?
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
            Get a Quote for <br />
            <span className="text-[#B08D57]">Your Requirements</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed font-body font-light">
            Tell us your specifications and our team will get back to you within 24 hours with the best price.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12" id="cta-buttons-deck">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[#B08D57] text-white px-12 py-5 font-semibold text-xs tracking-widest hover:bg-[#8C6A43] transition-all duration-500 uppercase text-center"
            >
              Request a Quote &rarr;
            </Link>

            <Link 
              to="/contact"
              className="w-full sm:w-auto border border-white/40 text-white px-12 py-5 font-semibold text-xs tracking-widest hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-500 uppercase text-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

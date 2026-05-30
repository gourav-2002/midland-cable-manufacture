import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  ChevronRight, 
  Linkedin, 
  Twitter, 
  Facebook 
} from 'lucide-react';

export default function BlogPost2() {
  // Scroll reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => observer.observe(el));

    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      elementsToReveal.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="blogpost2-root">
      
      {/* Styles injection for reveal and animations */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* SECTION 1 - BREADCRUMB */}
      <nav 
        className="max-w-6xl mx-auto px-6 pt-24" 
        id="bp2-breadcrumb-nav"
      >
        <div className="flex items-center gap-2 font-body text-sm text-gray-500 py-4 border-b border-gray-100 flex-wrap">
          <Link to="/" className="text-gray-500 hover:text-[#B08D57] transition-colors duration-300">
            Home
          </Link>
          <span className="text-gray-300 mx-1">/</span>
          <Link to="/blog" className="text-gray-500 hover:text-[#B08D57] transition-colors duration-300">
            Blog
          </Link>
          <span className="text-gray-300 mx-1">/</span>
          <span className="text-[#111111] font-medium max-w-xs truncate" title="Understanding Copper Grades: ETP vs DHP — Which is Right for Your Application?">
            Understanding Copper Grades: ETP vs DHP
          </span>
        </div>
      </nav>

      {/* TWO COLUMN CONTENT LAYOUT */}
      <div className="max-w-6xl mx-auto px-6 py-12" id="bp2-main-layout">
        <div className="flex flex-col lg:flex-row gap-16 items-start" id="bp2-grid-wrapper">
          
          {/* LEFT COLUMN CONTENT */}
          <article className="flex-1 max-w-3xl w-full" id="bp2-left-col">
            
            {/* TOP META ROW */}
            <div className="flex items-center gap-4 mb-6 flex-wrap" id="bp2-meta-row">
              <span className="bg-[#B08D57]/10 text-[#B08D57] text-xs font-bold tracking-wider uppercase px-4 py-2 font-body border border-[#B08D57]/30">
                PRODUCT KNOWLEDGE
              </span>
              <span className="flex items-center gap-2 text-gray-400 text-xs font-body">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>6 MIN READ</span>
              </span>
              <span className="text-gray-400 text-xs font-body">
                November 28, 2024
              </span>
            </div>

            {/* H1 TITLE */}
            <h1 className="font-display font-black text-4xl lg:text-5xl text-[#111111] leading-tight mb-8 mt-4">
              Understanding Copper Grades: ETP vs DHP — Which is Right for Your Application?
            </h1>

            {/* HERO IMAGE */}
            <div className="w-full h-80 overflow-hidden mb-10 select-none bg-gray-100" id="bp2-hero-img-box">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200" 
                alt="Understanding Copper Grades" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* INTRO BLOCKQUOTE */}
            <div className="border-l-4 border-[#B08D57] pl-6 py-2 mb-10 bg-[#F7F7F7]" id="bp2-intro-quote-box">
              <blockquote className="font-body italic text-gray-600 text-lg leading-relaxed">
                "Specifying the wrong copper grade for your application is a costly mistake. The difference between ETP and DHP copper is not just technical — it directly affects performance, longevity and safety of your end product."
              </blockquote>
            </div>

            {/* ARTICLE BODY */}
            <div className="font-body text-gray-600 text-base leading-[1.9] space-y-6" id="bp2-markdown-equivalent">
              
              {/* SECTION 1 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                Why Copper Grade Selection Matters
              </h2>
              <p>
                When most people think about copper they think of a single material. In reality copper products come in multiple grades with meaningfully different properties and performance characteristics. Selecting the wrong grade for your application can result in premature product failure, safety risks and significant rework costs.
              </p>
              <p>
                The two most important copper grades for industrial applications are Electrolytic Tough Pitch copper — known as ETP — and Deoxidized High Phosphorus copper — known as DHP. Understanding the difference between these two grades is fundamental knowledge for any engineer, procurement manager or technical buyer working with copper products.
              </p>
              <p>
                Both grades contain a minimum of 99.9% copper by weight making them both high-purity materials. The critical difference lies in what else is present in tiny but significant quantities — and how that affects performance in different conditions.
              </p>

              {/* CALLOUT BOX 1 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp2-callout-1">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  QUICK SUMMARY
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  ETP copper: maximum electrical conductivity — choose for electrical and electronic applications. <br />
                  DHP copper: excellent for heat and welding resistance — choose for plumbing, HVAC and brazed assemblies.
                </div>
              </div>

              {/* SECTION 2 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                What is ETP Copper? Properties and Applications
              </h2>
              <p>
                Electrolytic Tough Pitch copper is produced through an electrolytic refining process that yields copper of exceptional purity — typically 99.95% copper or higher. The term tough pitch refers to the controlled presence of a small amount of oxygen — typically between 100 and 650 parts per million — in the form of cuprous oxide.
              </p>
              <p>
                This oxygen content is not an impurity in the negative sense. In fact it is carefully controlled during the refining process and gives ETP copper its characteristic combination of high electrical conductivity and good mechanical strength.
              </p>
              <p>
                ETP copper achieves electrical conductivity of at least 100% IACS — the International Annealed Copper Standard — making it the benchmark against which all other conductive materials are measured. This exceptional conductivity combined with good formability makes ETP the dominant grade for electrical and electronic applications worldwide.
              </p>

              {/* BULLET LIST */}
              <div className="my-6" id="bp2-bullet-list-1">
                <div className="font-display font-bold text-base text-[#111111] mb-3">
                  Best applications for ETP copper:
                </div>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Motor and transformer windings — copper rods and wires
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Power distribution bus bars and conductors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Electronics and printed circuit board components
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Telecommunications cables and connectors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Automotive electrical systems excluding high-heat zones
                    </span>
                  </li>
                </ul>
              </div>

              {/* CALLOUT BOX 2 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp2-callout-2">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  ETP COPPER KEY FACTS
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  Purity: minimum 99.9% copper. Conductivity: minimum 100% IACS. Oxygen content: 100-650 ppm. Standards: ASTM B49, BS EN 13599, IS 613. Best for: electrical and electronic applications.
                </div>
              </div>

              {/* SECTION 3 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                What is DHP Copper? Properties and Applications
              </h2>
              <p>
                Deoxidized High Phosphorus copper is produced by adding phosphorus to molten copper during the manufacturing process. The phosphorus acts as a deoxidizer — removing the oxygen that is present in ETP copper. The result is a virtually oxygen-free copper that contains between 0.015% and 0.040% phosphorus.
              </p>
              <p>
                This deoxidization process fundamentally changes the behavior of the copper at elevated temperatures. Without oxygen DHP copper is completely immune to hydrogen embrittlement — the phenomenon where copper in a hydrogen-containing atmosphere at high temperature becomes brittle and prone to cracking.
              </p>
              <p>
                The trade-off is a slight reduction in electrical conductivity — DHP copper achieves approximately 85-90% IACS compared to 100% for ETP. For most non-electrical applications this difference is irrelevant. But for electrical applications where every percentage point of conductivity matters ETP remains the preferred choice.
              </p>

              {/* BULLET LIST 2 */}
              <div className="my-6" id="bp2-bullet-list-2">
                <div className="font-display font-bold text-base text-[#111111] mb-3">
                  Best applications for DHP copper:
                </div>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Plumbing tubes and fittings — brazed and soldered connections
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      HVAC and refrigeration tubing — brazed joints in systems
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Heat exchangers and condensers — high temperature environments
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Roofing and architectural copper sheets — weathering applications
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Medical gas pipeline systems — welded and brazed assemblies
                    </span>
                  </li>
                </ul>
              </div>

              {/* CALLOUT BOX 3 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp2-callout-3">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  DHP COPPER KEY FACTS
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  Purity: minimum 99.9% copper. Conductivity: approximately 85-90% IACS. Phosphorus content: 0.015-0.040%. Standards: ASTM B88, BS EN 1057, IS 7291. Best for: plumbing, HVAC, heat exchangers and brazed assemblies.
                </div>
              </div>

              {/* SECTION 4 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                ETP vs DHP — Side by Side Comparison
              </h2>
              <p>
                The most critical difference between ETP and DHP copper comes down to one word: hydrogen. ETP copper contains trace amounts of oxygen in the form of cuprous oxide distributed throughout the metal. When ETP copper is heated in a hydrogen-containing atmosphere — during brazing, welding or in certain industrial processes — the hydrogen reacts with the cuprous oxide to form steam inside the metal. This steam creates internal pressure that causes cracking and embrittlement.
              </p>
              <p>
                DHP copper eliminates this risk entirely because there is no oxygen for the hydrogen to react with. This makes DHP the mandatory choice for any application where the copper will be joined by brazing or soldering, or where it will operate at elevated temperatures in environments containing hydrogen.
              </p>
              <p>
                For applications that never involve heat joining and operate at normal temperatures — the vast majority of electrical conductor applications — ETP copper is the superior choice due to its higher conductivity. The oxygen content that makes ETP unsuitable for brazing has no negative effect in standard electrical applications.
              </p>

              {/* SECTION 5 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                How to Specify the Right Grade for Your Project
              </h2>
              <p>
                The decision tree is straightforward once you understand the key properties. Start by asking two questions: Will this copper be joined by brazing, soldering or welding? Will it operate in a high-temperature environment containing hydrogen? If the answer to either question is yes — specify DHP copper.
              </p>
              <p>
                If your application is purely electrical — conductors, windings, bus bars, cables — and involves no heat joining then ETP copper will give you maximum conductivity and optimal performance.
              </p>

              {/* BULLET LIST 3 */}
              <div className="my-6" id="bp2-bullet-list-3">
                <div className="font-display font-bold text-base text-[#111111] mb-3">
                  Quick selection guide:
                </div>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Electrical conductors and cables → ETP copper every time
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Motor and transformer windings → ETP copper for maximum conductivity
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Plumbing and water supply tubes → DHP copper for brazed joints
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      HVAC refrigeration tubing → DHP copper for system integrity
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Heat exchangers → DHP copper for high temperature performance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Architectural copper sheets → DHP copper for weathering resistance
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                If you are uncertain about which grade is correct for your specific application our technical team at Midland is available to advise. With 25 years of copper manufacturing experience we have helped hundreds of clients select the optimal grade and specification for their requirements. The right advice at the specification stage saves significant cost and rework downstream.
              </p>

              {/* CALLOUT BOX 4 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp2-callout-4">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  MIDLAND SUPPLIES BOTH GRADES
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  All Midland copper products are available in both ETP and DHP grades where applicable. Every product comes with a material test certificate confirming grade, purity and compliance with ASTM, BS and IS standards. Contact our sales team to discuss your specific requirements.
                </div>
              </div>

            </div>

            {/* ARTICLE BOTTOM: TAGS ROW */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-3 flex-wrap" id="bp2-tags-row">
              <span className="text-gray-500 text-sm font-body">Tags:</span>
              {["Copper Grades", "ETP Copper", "DHP Copper", "Technical Guide", "Material Selection", "Quality"].map((tag) => (
                <span 
                  key={tag} 
                  className="bg-[#F7F7F7] text-gray-600 text-xs px-3 py-2 font-body hover:bg-[#B08D57]/10 hover:text-[#B08D57] transition-all duration-300 pointer-events-none"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* SHARE ROW */}
            <div className="mt-6 flex items-center gap-4" id="bp2-share-row">
              <span className="text-gray-500 text-sm font-body">Share:</span>
              <div className="flex gap-2">
                <button 
                  className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 bg-white cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 bg-white cursor-pointer"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300 bg-white cursor-pointer"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>

          </article>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28 space-y-8" id="bp2-aside-sidebar">
            
            {/* AUTHOR CARD */}
            <div className="bg-[#F7F7F7] p-6 border border-gray-100" id="bp2-author-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center flex-shrink-0 select-none">
                  MT
                </div>
                <div className="text-block leading-tight">
                  <div className="font-display font-bold text-[#111111] text-base">
                    Midland Technical Team
                  </div>
                  <div className="text-[#B08D57] text-xs font-medium uppercase tracking-wider font-body mt-1">
                    Product & Quality Specialists
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed font-body mt-4">
                Our technical team brings decades of copper metallurgy expertise to help clients select the right grade, specification and form for their specific application requirements.
              </p>
              <Link 
                to="/blog" 
                className="text-[#B08D57] text-xs font-bold tracking-wider font-body mt-6 block hover:underline"
              >
                VIEW ALL ARTICLES &gt;
              </Link>
            </div>

            {/* RELATED ARTICLES CARD */}
            <div className="bg-white border border-gray-100 p-6" id="bp2-related-sidebar-card">
              <div className="text-xs tracking-[0.2em] uppercase text-[#B08D57] font-bold font-body mb-4">
                RELATED ARTICLES
              </div>
              <Link 
                to="/blog/copper-market-outlook-2025" 
                className="border border-gray-100 p-4 mb-3 hover:border-[#B08D57] transition-all duration-300 cursor-pointer group block"
              >
                <div className="text-[#B08D57] text-[10px] uppercase tracking-wider font-body mb-2">
                  MARKET TRENDS
                </div>
                <h4 className="font-display font-bold text-sm text-[#111111] leading-tight group-hover:text-[#B08D57] transition-colors duration-300">
                  Global Copper Market Outlook 2025: Trends, Prices and Opportunities for Industrial Buyers
                </h4>
                <div className="text-gray-400 text-[11px] font-body mt-2">
                  8 min read
                </div>
              </Link>
            </div>

            {/* PRODUCTS CTA CARD */}
            <div className="bg-[#111111] p-6 text-white" id="bp2-products-cta">
              <h3 className="font-display font-bold text-white text-lg mb-3">
                Explore Our Products
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                Premium copper rods, wires, sheets, tubes, coils and components for industrial applications worldwide.
              </p>
              <div className="space-y-1">
                {[
                  { name: "Copper Rods", to: "/products" },
                  { name: "Copper Wires", to: "/products" },
                  { name: "Copper Sheets", to: "/products" },
                  { name: "Copper Tubes", to: "/products" }
                ].map((prod) => (
                  <Link 
                    key={prod.name}
                    to={prod.to} 
                    className="flex items-center justify-between border-b border-white/10 py-3 text-gray-300 text-sm font-body hover:text-[#B08D57] transition-colors duration-300"
                  >
                    <span>{prod.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
              <Link 
                to="/contact" 
                className="w-full mt-6 bg-[#B08D57] text-white py-3 font-semibold font-body text-sm hover:bg-[#8C6A43] transition-all duration-300 text-center block"
              >
                Get a Quote &rarr;
              </Link>
            </div>

            {/* GET QUOTE CTA CARD */}
            <div className="bg-[#B08D57] p-6 text-white" id="bp2-quote-banner-card">
              <h3 className="font-display font-bold text-white text-lg mb-3">
                Need Copper Products?
              </h3>
              <p className="text-white/80 text-sm font-body leading-relaxed mb-6">
                Tell us your specifications and we will get back to you within 24 hours.
              </p>
              <Link 
                to="/contact" 
                className="w-full bg-white text-[#B08D57] py-4 font-semibold font-body text-center block hover:bg-gray-100 transition-all duration-300"
              >
                Request a Quote
              </Link>
            </div>

          </aside>

        </div>
      </div>

      {/* BOTTOM SECTION - MORE ARTICLES */}
      <section className="bg-white border-t border-gray-100" id="bp2-more-articles-sec">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-display font-bold text-2xl text-[#111111] mb-8">
            More Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="bp2-more-articles-grid">
            
            {/* Related article 1 layout styled exactly like main blog list */}
            <Link 
              to="/blog/copper-market-outlook-2025"
              className="flex flex-col sm:flex-row items-stretch bg-white border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden rounded-none reveal"
              id="bp2-related-more-card"
            >
              {/* LEFT - Image */}
              <div className="w-full sm:w-[220px] h-48 sm:h-auto flex-shrink-0 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600" 
                  alt="Global Copper Market Outlook 2025" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#B08D57] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider font-body rounded-sm shadow-sm select-none">
                  MARKET TRENDS
                </div>
              </div>

              {/* RIGHT - Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-gray-400 text-xs font-body">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>DEC 15, 2024</span>
                    <span className="text-gray-300">•</span>
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>8 MIN READ</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#111111] leading-tight mb-3 line-clamp-2 hover:text-[#B08D57] transition-colors duration-300">
                    Global Copper Market Outlook 2025: Trends, Prices and Opportunities for Industrial Buyers
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body line-clamp-3 mb-4 font-light">
                    The global copper market is entering a transformative phase in 2025 driven by the electric vehicle revolution, renewable energy expansion and infrastructure development across emerging markets.
                  </p>
                </div>
                <div className="text-[#B08D57] text-xs font-bold tracking-wider font-body flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto pt-2">
                  <span>READ MORE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}

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

export default function BlogPost1() {
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
    <div className="bg-white text-[#111111] min-h-screen" id="blogpost1-root">
      
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
        id="bp1-breadcrumb-nav"
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
          <span className="text-[#111111] font-medium max-w-xs truncate" title="Global Copper Market Outlook 2025: Trends, Prices and Opportunities for Industrial Buyers">
            Global Copper Market Outlook 2025: Trends, Prices and Opportunities
          </span>
        </div>
      </nav>

      {/* TWO COLUMN CONTENT LAYOUT */}
      <div className="max-w-6xl mx-auto px-6 py-12" id="bp1-main-layout">
        <div className="flex flex-col lg:flex-row gap-16 items-start" id="bp1-grid-wrapper">
          
          {/* LEFT COLUMN CONTENT */}
          <article className="flex-1 max-w-3xl w-full" id="bp1-left-col">
            
            {/* TOP META ROW */}
            <div className="flex items-center gap-4 mb-6 flex-wrap" id="bp1-meta-row">
              <span className="bg-[#B08D57]/10 text-[#B08D57] text-xs font-bold tracking-wider uppercase px-4 py-2 font-body border border-[#B08D57]/30">
                MARKET TRENDS
              </span>
              <span className="flex items-center gap-2 text-gray-400 text-xs font-body">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>8 MIN READ</span>
              </span>
              <span className="text-gray-400 text-xs font-body">
                December 15, 2024
              </span>
            </div>

            {/* H1 TITLE */}
            <h1 className="font-display font-black text-4xl lg:text-5xl text-[#111111] leading-tight mb-8 mt-4">
              Grid Copper Market Outlook 2025: Trends, Prices and Opportunities for Industrial Buyers
            </h1>

            {/* HERO IMAGE */}
            <div className="w-full h-80 overflow-hidden mb-10 select-none bg-gray-100" id="bp1-hero-img-box">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200" 
                alt="Global Copper Market Outlook 2025" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* INTRO BLOCKQUOTE */}
            <div className="border-l-4 border-[#B08D57] pl-6 py-2 mb-10 bg-[#F7F7F7]" id="bp1-intro-quote-box">
              <blockquote className="font-body italic text-gray-600 text-lg leading-relaxed">
                "The copper market in 2025 is not just about price — it is about supply security, strategic procurement and understanding the mega-trends that are reshaping demand for this essential industrial metal."
              </blockquote>
            </div>

            {/* ARTICLE BODY */}
            <div className="font-body text-gray-600 text-base leading-[1.9] space-y-6" id="bp1-markdown-equivalent">
              
              {/* SECTION 1 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                Why 2025 is a Pivotal Year for Copper
              </h2>
              <p>
                Copper has long been called the metal with a PhD in economics because its price movements reliably reflect the health of the global economy. But 2025 is different. For the first time in decades structural demand shifts — not just economic cycles — are driving copper consumption to new highs. The convergence of the electric vehicle revolution, renewable energy expansion and global infrastructure development is creating a demand environment unlike anything the copper industry has seen before.
              </p>
              <p>
                For industrial buyers, manufacturers and procurement managers understanding these forces is no longer optional. It is essential for cost management, supply security and competitive advantage in your industry.
              </p>
              <p>
                Supply is not keeping up. Major copper-producing nations face declining ore grades, regulatory challenges and underinvestment in new mines. The result is a structural supply deficit that analysts project will persist through the end of the decade. This makes strategic procurement more important than ever for businesses that depend on copper.
              </p>

              {/* CALLOUT BOX 1 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp1-callout-1">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  KEY MARKET STAT
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  Global copper demand is forecast to reach 36 million metric tonnes by 2031 — up from 25 million metric tonnes in 2023. This 44% demand increase against constrained supply is the defining market dynamic for the next decade.
                </div>
              </div>

              {/* SECTION 2 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                The Electric Vehicle Revolution and Copper Demand
              </h2>
              <p>
                The numbers are staggering. A conventional internal combustion engine vehicle uses approximately 23 kilograms of copper. A battery electric vehicle uses 83 kilograms — more than three times as much. Plug-in hybrid vehicles fall in between at around 60 kilograms. With global EV sales projected to reach 40 million units annually by 2025 the incremental copper demand from this sector alone is measured in millions of metric tonnes per year.
              </p>
              <p>
                Copper is found throughout the electric vehicle — in the battery cells, motor windings, charging systems, wiring harnesses and thermal management systems. There is no substitute that matches copper's combination of conductivity, flexibility and cost-effectiveness at scale.
              </p>
              <p>
                For copper wire and rod manufacturers like Midland this represents a generational opportunity. The specifications required for EV applications demand the highest grade copper with exceptional conductivity and dimensional precision — exactly the quality standards we have maintained throughout our 25 years of manufacturing.
              </p>

              {/* BULLET LIST */}
              <div className="my-6" id="bp1-bullet-list">
                <div className="font-display font-bold text-base text-[#111111] mb-3">
                  Copper applications in EVs:
                </div>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Battery cell current collectors and busbars
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Motor stator and rotor windings
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      High-voltage wiring harnesses
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      On-board chargers and power electronics
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-[#B08D57] mt-1 shrink-0" />
                    <span className="text-gray-600 font-body text-base leading-relaxed">
                      Thermal management heat exchangers
                    </span>
                  </li>
                </ul>
              </div>

              {/* SECTION 3 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                Renewable Energy — The Other Demand Mega-Trend
              </h2>
              <p>
                Solar and wind energy are copper intensive by nature. A single utility-scale solar farm requires approximately 5 tonnes of copper per megawatt of capacity. An offshore wind turbine needs up to 8 tonnes. With governments worldwide committing to aggressive renewable energy targets the scale of copper demand from this sector is extraordinary.
              </p>
              <p>
                The International Energy Agency projects that clean energy transitions will require copper demand growth of over 40% by 2040. Grid infrastructure upgrades alone — the transmission lines, transformers and substations needed to carry renewable electricity — will consume copper at unprecedented rates for the next two decades.
              </p>

              {/* CALLOUT BOX 2 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp1-callout-2">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  RENEWABLE ENERGY COPPER DEMAND
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  A single offshore wind turbine requires up to 8 tonnes of copper. With thousands of turbines planned globally through 2030 the sector represents one of the largest structural demand drivers in copper market history.
                </div>
              </div>

              {/* SECTION 4 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                Copper Price Outlook and What to Expect in 2025
              </h2>
              <p>
                After touching multi-year highs in 2024 copper prices are expected to remain elevated through 2025. Most commodity analysts project prices trading in the range of USD 8,500 to USD 10,500 per metric tonne on the London Metal Exchange through the year.
              </p>
              <p>
                Supply disruptions from major producing nations including Chile and Peru — which together account for nearly 40% of global mine supply — add upside risk to these forecasts. Any significant production disruption could push prices sharply higher.
              </p>
              <p>
                For industrial buyers the implications are clear. Waiting for lower prices is a risky strategy in this environment. Companies that lock in supply agreements and manage inventory strategically will be better positioned than those reacting to spot market volatility.
              </p>

              {/* CALLOUT BOX 3 */}
              <div className="bg-[#F7F7F7] border-l-4 border-[#B08D57] p-6 my-8" id="bp1-callout-3">
                <div className="font-display font-bold text-xs text-[#B08D57] uppercase tracking-wider mb-2">
                  PROCUREMENT RECOMMENDATION
                </div>
                <div className="font-body text-gray-700 text-sm leading-relaxed">
                  Consider 6 to 12 month forward supply agreements with trusted manufacturers like Midland to secure pricing certainty and supply continuity. Spot buying in a supply-constrained market exposes your business to both price risk and availability risk.
                </div>
              </div>

              {/* SECTION 5 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                Infrastructure Development Driving Global Demand
              </h2>
              <p>
                Beyond EVs and renewables traditional infrastructure development continues to be a major copper demand driver. Government infrastructure programs across Asia, the Middle East and Africa are at various stages of massive expansion. Power grid modernization in developed markets and greenfield grid construction in emerging markets both require enormous quantities of copper conductors, cables, tubes and components.
              </p>
              <p>
                Smart city projects, 5G telecommunications network rollouts and data center construction are additional demand drivers that are accelerating. Each of these sectors depends on high-quality copper products for their core infrastructure.
              </p>

              {/* SECTION 6 */}
              <h2 className="font-display font-bold text-2xl text-[#111111] mb-4 mt-10 leading-tight">
                What This Means for Midland Clients
              </h2>
              <p>
                At Midland we have been monitoring these market developments closely and have taken proactive steps to protect our clients from supply disruptions and price volatility. We have expanded our raw material inventory positions, diversified our copper cathode sourcing and increased our production capacity to ensure we can meet growing demand from our clients across 15+ Indian states.
              </p>
              <p>
                We strongly recommend that procurement managers and operations teams review their copper supply strategy for 2025. The clients who will be best positioned are those who treat copper procurement as a strategic function — not a transactional afterthought.
              </p>
              <p>
                Our sales team is available to discuss supply agreements, pricing structures and technical specifications for your specific requirements. Whether you need copper rods for motor manufacturing, wires for cable production, tubes for HVAC systems or custom components for specialized applications — Midland has the products, capacity and expertise to be your trusted partner.
              </p>

            </div>

            {/* ARTICLE BOTTOM: TAGS ROW */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-3 flex-wrap" id="bp1-tags-row">
              <span className="text-gray-500 text-sm font-body">Tags:</span>
              {["Copper Prices", "Market Analysis", "2025 Trends", "Industrial Procurement", "EV Demand", "Renewable Energy"].map((tag) => (
                <span 
                  key={tag} 
                  className="bg-[#F7F7F7] text-gray-600 text-xs px-3 py-2 font-body hover:bg-[#B08D57]/10 hover:text-[#B08D57] transition-all duration-300 pointer-events-none"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* SHARE ROW */}
            <div className="mt-6 flex items-center gap-4" id="bp1-share-row">
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
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28 space-y-8" id="bp1-aside-sidebar">
            
            {/* AUTHOR CARD */}
            <div className="bg-[#F7F7F7] p-6 border border-gray-100" id="bp1-author-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#B08D57] text-white font-display font-black text-lg flex items-center justify-center flex-shrink-0 select-none">
                  MR
                </div>
                <div className="text-block leading-tight">
                  <div className="font-display font-bold text-[#111111] text-base">
                    Midland Research Team
                  </div>
                  <div className="text-[#B08D57] text-xs font-medium uppercase tracking-wider font-body mt-1">
                    Market Intelligence
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed font-body mt-4">
                Our research team tracks global copper markets, pricing trends and industry developments to keep our clients informed and ahead of the curve.
              </p>
              <Link 
                to="/blog" 
                className="text-[#B08D57] text-xs font-bold tracking-wider font-body mt-6 block hover:underline"
              >
                VIEW ALL ARTICLES &gt;
              </Link>
            </div>

            {/* RELATED ARTICLES CARD */}
            <div className="bg-white border border-gray-100 p-6" id="bp1-related-sidebar-card">
              <div className="text-xs tracking-[0.2em] uppercase text-[#B08D57] font-bold font-body mb-4">
                RELATED ARTICLES
              </div>
              <Link 
                to="/blog/etp-vs-dhp-copper-grades" 
                className="border border-gray-100 p-4 mb-3 hover:border-[#B08D57] transition-all duration-300 cursor-pointer group block"
              >
                <div className="text-[#B08D57] text-[10px] uppercase tracking-wider font-body mb-2">
                  PRODUCT KNOWLEDGE
                </div>
                <h4 className="font-display font-bold text-sm text-[#111111] leading-tight group-hover:text-[#B08D57] transition-colors duration-300">
                  Understanding Copper Grades: ETP vs DHP — Which is Right for Your Application?
                </h4>
                <div className="text-gray-400 text-[11px] font-body mt-2">
                  6 min read
                </div>
              </Link>
            </div>

            {/* PRODUCTS CTA CARD */}
            <div className="bg-[#111111] p-6 text-white" id="bp1-products-cta">
              <h3 className="font-display font-bold text-white text-lg mb-3">
                Explore Our Products
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                Premium copper rods, wires, sheets, tubes, coils and components for industrial applications across India.
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
            <div className="bg-[#B08D57] p-6 text-white" id="bp1-quote-banner-card">
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
      <section className="bg-white border-t border-gray-100" id="bp1-more-articles-sec">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-display font-bold text-2xl text-[#111111] mb-8">
            More Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="bp1-more-articles-grid">
            
            {/* Related article 2 layout styled exactly like main blog list */}
            <Link 
              to="/blog/etp-vs-dhp-copper-grades"
              className="flex flex-col sm:flex-row items-stretch bg-white border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden rounded-none reveal"
              id="bp1-related-more-card"
            >
              {/* LEFT - Image */}
              <div className="w-full sm:w-[220px] h-48 sm:h-auto flex-shrink-0 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" 
                  alt="Understanding copper grades" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#B08D57] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider font-body rounded-sm shadow-sm select-none">
                  PRODUCT KNOWLEDGE
                </div>
              </div>

              {/* RIGHT - Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-gray-400 text-xs font-body">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>NOV 28, 2024</span>
                    <span className="text-gray-300">•</span>
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>6 MIN READ</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#111111] leading-tight mb-3 line-clamp-2 hover:text-[#B08D57] transition-colors duration-300">
                    Understanding Copper Grades: ETP vs DHP — Which is Right for Your Application?
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body line-clamp-3 mb-4 font-light">
                    Choosing the right copper grade is critical for performance and cost efficiency. This guide breaks down the key differences between ETP and DHP copper and helps you make the right choice.
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

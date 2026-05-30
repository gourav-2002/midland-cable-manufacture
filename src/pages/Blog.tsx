import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  X,
  Mail 
} from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    category: "Market Trends",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
    date: "DEC 15, 2024",
    readTime: "8 MIN READ",
    title: "Global Copper Market Outlook 2025: Trends, Prices and Opportunities for Industrial Buyers",
    excerpt: "The global copper market is entering a transformative phase in 2025 driven by the electric vehicle revolution, renewable energy expansion and infrastructure development across emerging markets."
  },
  {
    id: 2,
    category: "Product Knowledge",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    date: "NOV 28, 2024",
    readTime: "6 MIN READ",
    title: "Understanding Copper Grades: ETP vs DHP — Which is Right for Your Application?",
    excerpt: "Choosing the right copper grade is critical for performance and cost efficiency. This guide breaks down the key differences between ETP and DHP copper and helps you make the right choice."
  }
];

const CATEGORIES = [
  "All", 
  "Market Trends", 
  "Product Knowledge", 
  "Manufacturing", 
  "Export & Trade", 
  "Sustainability", 
  "Industry News"
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openModal, setOpenModal] = useState<null | 1 | 2>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Intersection Observer for scroll reveal effect
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

    return () => {
      elementsToReveal.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [activeCategory]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openModal]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Filter articles based on active category
  const filteredArticles = ARTICLES.filter((article) => {
    if (activeCategory === "All") return true;
    return article.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="blog-page-root">
      
      {/* Dynamic Keyframes injection inside standard layout */}
      <style>{`
        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
          }
          to { 
            opacity: 1; 
          }
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* SECTION 1 - HERO */}
      <section 
        className="relative h-[350px] flex items-center bg-[#111111] overflow-hidden" 
        id="blog-hero"
      >
        {/* Full bleed background image */}
        <div className="absolute inset-0 select-none z-0" id="hero-bg-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920" 
            alt="Midland heavy duty cable manufacturing background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Strict Dark overlay */}
          <div className="absolute inset-0 bg-[#111111]/75" />
        </div>

        {/* Center aligned content */}
        <div 
          className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center h-full"
          id="hero-content"
        >
          {/* Breadcrumb top */}
          <div 
            className="text-xs tracking-[0.2em] uppercase text-gray-300 font-body mb-6 animate-fade-up" 
            style={{ animationDelay: '0ms' }}
            id="blog-breadcrumb"
          >
            HOME <span className="text-[#B08D57] px-1 font-semibold">/</span> BLOG
          </div>

          {/* H1 Title */}
          <h1 
            className="font-display font-black text-5xl lg:text-6xl text-center leading-none uppercase tracking-tight animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            <span className="text-white">The Copper </span>
            <span className="text-[#B08D57]">Intelligence.</span>
          </h1>

          {/* Subtext */}
          <p 
            className="text-gray-300 text-base mt-4 max-w-xl mx-auto text-center leading-relaxed font-body animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            Industry insights, market trends and product knowledge from the experts at Midland Cable Manufacture.
          </p>
        </div>
      </section>

      {/* SECTION 2 - BLOG CONTENT */}
      <section className="bg-white py-20 px-6 relative" id="blog-content-view">
        <div className="max-w-6xl mx-auto" id="blog-content-container">
          
          {/* Header */}
          <div className="text-center" id="blog-section-header">
            <h2 className="font-display font-black text-4xl text-[#111111] text-center mb-3">
              Latest Insights
            </h2>
            {/* Bronze Underline */}
            <div className="w-16 h-1 bg-[#B08D57] mx-auto mb-12" />
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div className="flex flex-wrap gap-3 justify-center mb-16" id="category-filter-pills">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium font-body transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-[#111111] text-white hover:bg-black/90' 
                      : 'border border-gray-300 text-gray-600 hover:border-[#B08D57] hover:text-[#B08D57]'
                  }`}
                  id={`filter-pill-${category.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* BLOG CARDS GRID or COMING SOON MESSAGE */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="blog-cards-grid">
              {filteredArticles.map((article) => {
                const articleLink = article.id === 1 ? "/blog/copper-market-outlook-2025" : "/blog/etp-vs-dhp-copper-grades";
                return (
                  <Link 
                    key={article.id}
                    to={articleLink}
                    className="flex flex-col sm:flex-row items-stretch bg-white border border-gray-100 hover:border-[#B08D57] hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden rounded-none reveal"
                    id={`blog-card-${article.id}`}
                  >
                    {/* LEFT - Image */}
                    <div 
                      className="w-full sm:w-[220px] h-48 sm:h-auto flex-shrink-0 relative overflow-hidden" 
                      id={`blog-card-img-container-${article.id}`}
                    >
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-[#B08D57] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider font-body rounded-sm shadow-sm select-none">
                        {article.category}
                      </div>
                    </div>

                    {/* RIGHT - Content detailing */}
                    <div className="flex-1 p-6 flex flex-col justify-between" id={`blog-card-info-box-${article.id}`}>
                      <div>
                        {/* Date & Read time */}
                        <div className="flex items-center gap-2 mb-3 text-gray-400 text-xs font-body">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{article.date}</span>
                          <span className="text-gray-300">•</span>
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{article.readTime}</span>
                        </div>

                        {/* H3 Heading */}
                        <h3 className="font-display font-bold text-lg text-[#111111] leading-tight mb-3 line-clamp-2 hover:text-[#B08D57] transition-colors duration-300">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-500 text-sm leading-relaxed font-body line-clamp-3 mb-4 font-light">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Footer CTA */}
                      <div className="text-[#B08D57] text-xs font-bold tracking-wider font-body flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto pt-2">
                        <span>READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div 
              className="text-gray-400 text-center py-20 font-body animate-fade-in" 
              id="no-articles-message"
            >
              <p className="text-lg font-medium text-[#111111]">Coming Soon</p>
              <p className="text-sm mt-2 text-gray-400 max-w-md mx-auto">
                More articles on this topic will be published soon.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 4 - NEWSLETTER */}
      <section className="bg-[#111111] py-20 px-6 relative" id="newsletter-view">
        <div className="max-w-2xl mx-auto text-center reveal" id="newsletter-interior">
          
          {/* Mail icon */}
          <div className="w-14 h-14 border border-[#B08D57]/40 text-[#B08D57] p-4 mx-auto mb-8 flex items-center justify-center bg-transparent shrink-0">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="font-display font-black text-3xl text-white text-center mb-4">
            Stay Ahead of the Market
          </h2>

          <p className="text-gray-400 text-center font-body mb-10 max-w-md mx-auto font-light leading-relaxed">
            Copper market insights delivered to your inbox. No spam ever.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex gap-0 max-w-md mx-auto border border-white/20" id="newsletter-form">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-4 bg-[#1F1F1F] border-0 text-white text-sm font-body focus:outline-none focus:ring-1 focus:ring-[#B08D57] placeholder:text-gray-500 rounded-none w-full"
                id="newsletter-email"
              />
              <button 
                type="submit"
                className="bg-[#B08D57] text-white px-8 py-4 font-semibold font-body cursor-pointer hover:bg-[#8C6A43] transition-all rounded-none shrink-0"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-center py-2 px-4 animate-fade-in" id="subscription-success">
              <p className="text-[#B08D57] text-sm text-center mt-4 font-body font-bold">
                Thank you! You are now subscribed.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 5 - CTA BANNER */}
      <section className="bg-[#B08D57] py-16 px-6" id="cta-bottom-banner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8" id="cta-banner-content">
          
          <div className="text-center md:text-left">
            <h2 className="font-display font-black text-3xl text-white uppercase tracking-normal">
              Ready to Partner with Midland?
            </h2>
            <p className="text-white/80 mt-2 font-body text-base">
              Premium copper products for industries worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0" id="cta-buttons">
            <Link 
              to="/contact" 
              className="bg-white text-[#B08D57] px-8 py-4 font-semibold font-body text-sm hover:bg-gray-100 transition-all duration-300 text-center rounded-none block min-w-[160px]"
            >
              Get a Quote &rarr;
            </Link>
            <Link 
              to="/products"
              className="border border-white text-white px-8 py-4 font-semibold font-body text-sm hover:bg-white/10 transition-all duration-300 text-center rounded-none block min-w-[160px]"
            >
              View Products
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 3 - FULL ARTICLE MODALS */}
      {openModal !== null && (
        <div 
          className="fixed inset-0 bg-[#111111]/95 z-50 overflow-y-auto animate-fade-in"
          id="article-modal-overlay"
          onClick={() => setOpenModal(null)}
        >
          {/* Close button top right */}
          <button 
            onClick={() => setOpenModal(null)}
            className="fixed top-8 right-8 text-white hover:text-[#B08D57] transition-colors cursor-pointer z-50 p-2 bg-[#1F1F1F] select-none"
            aria-label="Close modal"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Modal content viewport */}
          <div 
            className="max-w-3xl mx-auto py-20 px-6 cursor-default"
            id="article-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            
            {openModal === 1 ? (
              <div id="modal-article-1-content">
                {/* Category badge */}
                <span className="bg-[#B08D57] text-white text-xs px-4 py-2 uppercase tracking-wider font-body inline-block mb-6 select-none font-bold">
                  Market Trends
                </span>

                {/* Date and Read Time Bar */}
                <div className="text-gray-400 text-sm font-body mb-6 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#B08D57]" />
                  <span>DEC 15, 2024</span>
                  <span className="text-gray-600">|</span>
                  <Clock className="w-4 h-4 text-[#B08D57]" />
                  <span>8 MIN READ</span>
                </div>

                {/* H1 Title */}
                <h1 className="font-display font-black text-4xl text-white leading-tight mb-8">
                  Global Copper Market Outlook 2025: Trends, Prices and Opportunities for Industrial Buyers
                </h1>

                {/* Bronze divider line */}
                <div className="w-16 h-px bg-[#B08D57] mb-8" />

                {/* Hero image */}
                <div className="w-full h-72 mb-12 select-none overflow-hidden" id="modal-1-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200" 
                    alt="Industrial copper market production"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content Sections */}
                <div className="space-y-10 text-gray-300 font-body leading-relaxed text-base" id="modal-1-body-content">
                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      The Electric Vehicle Revolution
                    </h3>
                    <p className="font-light">
                      Electric vehicles require approximately 83kg of copper per vehicle compared to just 23kg for conventional cars. With EV sales projected to reach 40 million units by 2025 the demand surge for high quality copper wires, rods and components is unprecedented. For manufacturers and industrial buyers this represents both a challenge and a significant procurement opportunity.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      Renewable Energy Driving Demand
                    </h3>
                    <p className="font-light">
                      Solar and wind energy installations are driving massive copper consumption. A single offshore wind turbine requires up to 8 tonnes of copper. With governments worldwide committing to net-zero targets renewable energy infrastructure investment will accelerate significantly through 2025 creating sustained long-term copper demand.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      Price Outlook 2025
                    </h3>
                    <p className="font-light">
                      Copper prices are expected to trade between USD 8,500 and USD 10,000 per metric tonne in 2025. Supply constraints combined with growing demand suggest prices will remain elevated. Industrial buyers should consider forward contracts and strategic inventory building to manage costs.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      What This Means for Midland Clients
                    </h3>
                    <p className="font-light">
                      At Midland we have expanded our production capacity and raw material sourcing to ensure uninterrupted supply. We recommend clients consider longer-term supply agreements to lock in favorable pricing and ensure production continuity throughout 2025 and beyond.
                    </p>
                  </section>
                </div>

              </div>
            ) : (
              <div id="modal-article-2-content">
                {/* Category badge */}
                <span className="bg-[#B08D57] text-white text-xs px-4 py-2 uppercase tracking-wider font-body inline-block mb-6 select-none font-bold">
                  Product Knowledge
                </span>

                {/* Date and Read Time Bar */}
                <div className="text-gray-400 text-sm font-body mb-6 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#B08D57]" />
                  <span>NOV 28, 2024</span>
                  <span className="text-gray-600">|</span>
                  <Clock className="w-4 h-4 text-[#B08D57]" />
                  <span>6 MIN READ</span>
                </div>

                {/* H1 Title */}
                <h1 className="font-display font-black text-4xl text-white leading-tight mb-8">
                  Understanding Copper Grades: ETP vs DHP — Which is Right for Your Application?
                </h1>

                {/* Bronze divider line */}
                <div className="w-16 h-px bg-[#B08D57] mb-8" />

                {/* Hero image */}
                <div className="w-full h-72 mb-12 select-none overflow-hidden" id="modal-2-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200" 
                    alt="Analyzing copper grades"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content Sections */}
                <div className="space-y-10 text-gray-300 font-body leading-relaxed text-base" id="modal-2-body-content">
                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      What is ETP Copper?
                    </h3>
                    <p className="font-light">
                      Electrolytic Tough Pitch copper contains a minimum of 99.9% copper and is the most widely used grade in electrical applications. It offers excellent electrical conductivity of at least 100% IACS making it ideal for rods, wires and coils used in motors, transformers and power distribution systems.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      What is DHP Copper?
                    </h3>
                    <p className="font-light">
                      Deoxidized High Phosphorus copper contains 99.9% copper with added phosphorus as a deoxidizer. This makes it highly resistant to hydrogen embrittlement and ideal for applications involving heat and welding. It is the preferred choice for copper tubes, sheets and plumbing applications.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      Key Differences Explained
                    </h3>
                    <p className="font-light">
                      The primary difference lies in oxygen content and application suitability. ETP copper has trace oxygen making it unsuitable for welding or brazing at high temperatures. DHP copper eliminates this risk making it the go-to choice for plumbing, HVAC and heat exchanger applications.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-display font-bold text-xl text-white mb-4 border-l-4 border-[#B08D57] pl-4">
                      Choosing the Right Grade for You
                    </h3>
                    <p className="font-light">
                      For electrical applications — motors, transformers, cables and bus bars — always specify ETP copper for maximum conductivity. For plumbing, HVAC, refrigeration and any application involving brazing choose DHP. When in doubt contact our technical team for a recommendation.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* Bottom CTA Box */}
            <div className="bg-[#1F1F1F] p-8 mt-12 border border-white/5" id="modal-cta-box">
              <h3 className="font-display font-bold text-white text-xl mb-4">
                Have Questions About Our Products?
              </h3>
              <p className="text-gray-400 font-body font-light text-sm mb-6 leading-relaxed">
                Connect with our technical advisory group to select the accurate copper grade, check certified metallurgical specs, or order custom runs.
              </p>
              <Link
                to="/contact"
                onClick={() => setOpenModal(null)}
                className="bg-[#B08D57] text-white px-8 py-4 uppercase text-xs font-bold tracking-widest font-body hover:bg-[#8C6A43] transition-all duration-300 inline-block text-center rounded-none"
              >
                Talk to Our Team &rarr;
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

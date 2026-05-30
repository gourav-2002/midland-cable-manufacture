import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface PolicySection {
  id: string;
  title: string;
  shortTitle?: string;
  content: string[];
}

const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    shortTitle: "Introduction",
    content: [
      "Welcome to Midland Cable Manufacture. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services.",
      "Please read this policy carefully. If you disagree with its terms, please discontinue use of our site."
    ]
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    shortTitle: "Information We Collect",
    content: [
      "We collect information that you voluntarily provide to us when you fill out our contact forms, request a quote, subscribe to our newsletter, or communicate with us directly.",
      "Personal information we may collect includes:\n• Full name and job title\n• Company name and industry\n• Email address and phone number\n• Shipping and billing address\n• Product inquiry details and specifications\n• Communication preferences",
      "We also automatically collect certain technical information when you visit our website including IP address, browser type, operating system, referring URLs, and pages visited."
    ]
  },
  {
    id: "how-we-use-your-information",
    title: "3. How We Use Your Information",
    shortTitle: "How We Use It",
    content: [
      "We use the information we collect to:\n• Process and fulfill your product orders and inquiries\n• Send you quotes, invoices, and order confirmations\n• Communicate about your orders and our services\n• Send promotional communications if you opted in\n• Improve our website and user experience\n• Comply with legal obligations\n• Prevent fraud and ensure website security",
      "We will never sell your personal information to third parties for their marketing purposes."
    ]
  },
  {
    id: "cookies-and-tracking",
    title: "4. Cookies and Tracking",
    shortTitle: "Cookies",
    content: [
      "Our website uses cookies and similar tracking technologies to enhance your browsing experience.",
      "Types of cookies we use:\n• Essential cookies: Required for website functionality\n• Analytics cookies: Help us understand website usage\n• Preference cookies: Remember your settings",
      "You can control cookies through your browser settings. Disabling cookies may affect some website functionality. By continuing to use our website you consent to our use of cookies as described in this policy."
    ]
  },
  {
    id: "third-party-sharing",
    title: "5. Third Party Sharing",
    shortTitle: "Third Parties",
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners only in these circumstances:",
      "• Service providers who assist in our operations such as shipping companies and payment processors\n• Professional advisors including lawyers and accountants under confidentiality obligations\n• Government authorities when required by law\n• Business partners with your explicit consent",
      "All third parties are required to protect your information and use it only for the specified purpose."
    ]
  },
  {
    id: "data-security",
    title: "6. Data Security",
    shortTitle: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information including:",
      "• SSL encryption for all data transmission\n• Secure servers with restricted access\n• Regular security audits and updates\n• Employee training on data protection\n• Access controls and authentication",
      "While we take all reasonable precautions, no internet transmission is 100% secure. We encourage you to use strong passwords and be cautious about what information you share online."
    ]
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    shortTitle: "Data Retention",
    content: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required by law.",
      "Inquiry and quote data: 3 years\nOrder and transaction records: 7 years\nNewsletter subscription: Until you unsubscribe\nWebsite analytics: 26 months",
      "You may request deletion of your data at any time subject to our legal obligations."
    ]
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    shortTitle: "Your Rights",
    content: [
      "Depending on your location you may have the following rights regarding your personal data:",
      "• Right to access your personal information\n• Right to correct inaccurate information\n• Right to request deletion of your data\n• Right to object to processing of your data\n• Right to data portability\n• Right to withdraw consent at any time",
      "To exercise any of these rights please contact us at privacy@midlandcable.com. We will respond to your request within 30 days."
    ]
  },
  {
    id: "international-transfers",
    title: "9. International Transfers",
    shortTitle: "International Transfers",
    content: [
      "Midland Cable Manufacture operates globally and your information may be transferred to and processed in countries other than your own. We ensure all international transfers comply with applicable data protection laws and that appropriate safeguards are in place to protect your information."
    ]
  },
  {
    id: "childrens-privacy",
    title: "10. Children's Privacy",
    shortTitle: "Children's Privacy",
    content: [
      "Our website and services are intended for business and commercial use by adults only. We do not knowingly collect personal information from anyone under 18 years of age. If you believe we have inadvertently collected such information please contact us immediately."
    ]
  },
  {
    id: "changes-to-this-policy",
    title: "11. Changes to This Policy",
    shortTitle: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically."
    ]
  },
  {
    id: "contact-us",
    title: "12. Contact Us",
    shortTitle: "Contact Us",
    content: [
      "If you have questions or concerns about this Privacy Policy or our data practices please contact us:",
      "Midland Cable Manufacture\nPrivacy Officer\n88 Industrial Road, Midland\nEmail: privacy@midlandcable.com\nPhone: +1 (800) 555-CUPRUM\nMon - Fri: 8:00 AM - 5:00 PM EST"
    ]
  }
];

const QUICK_NAV_ITEMS = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-your-information", label: "How We Use It" },
  { id: "cookies-and-tracking", label: "Cookies" },
  { id: "third-party-sharing", label: "Third Parties" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact-us", label: "Contact Us" }
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Monitor sections in view to update sidebar active highlight status dynamically
    const elements = PRIVACY_SECTIONS.map(s => document.getElementById(s.id));
    
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px" // Trigger as segments pass upper viewport quadrants
    });

    elements.forEach(el => {
      if (el) observer.current?.observe(el);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 100; // Header offset
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="privacy-policy-page">
      {/* SECTION 1 - Hero Banner */}
      <section className="bg-[#111111] py-20 text-center px-6" id="privacy-hero-banner">
        <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
          <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-body flex items-center justify-center gap-1">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="text-[#B08D57] font-semibold font-body">&gt;</span>
            <span className="text-gray-400">PRIVACY POLICY</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl font-black uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm mt-3 font-body">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* SECTION 2 - Quick Navigation */}
      <section className="bg-[#F7F7F7] py-10" id="privacy-quick-navigation">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-6 font-display">
            QUICK NAVIGATION
          </h2>
          <div className="flex flex-wrap items-center gap-y-4 gap-x-3 font-body text-sm">
            {QUICK_NAV_ITEMS.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => handleScrollToSection(item.id)}
                  className="text-gray-600 hover:text-[#B08D57] transition-colors duration-300 border-b border-gray-300 hover:border-[#B08D57] pb-1 cursor-pointer font-medium"
                >
                  {item.label}
                </button>
                {idx < QUICK_NAV_ITEMS.length - 1 && (
                  <span className="text-gray-300 font-light font-body select-none">&bull;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Privacy Content (Two column layout on desktop) */}
      <section className="bg-white py-16 px-6" id="privacy-content-section">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDEBAR (Sticky on desktop, hidden on mobile) */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0" id="privacy-desktop-sidebar">
            <div className="sticky top-28 space-y-1">
              <span className="block text-[10px] tracking-widest font-mono text-gray-400 uppercase font-bold mb-4">
                DOCUMENT INDEX
              </span>
              {PRIVACY_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleScrollToSection(section.id)}
                    className={`w-full text-left text-sm cursor-pointer py-2 border-l-2 pl-4 transition-all duration-300 font-body ${
                      isActive 
                        ? "border-[#B08D57] text-[#B08D57] font-bold bg-[#B08D57]/5" 
                        : "border-transparent text-gray-500 hover:text-[#B08D57] hover:border-[#B08D57]/50"
                    }`}
                  >
                    {section.shortTitle || section.title}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT CONTENT WORKSPACE */}
          <div className="flex-1" id="privacy-right-markdown-workspace">
            {PRIVACY_SECTIONS.map((section) => (
              <div 
                key={section.id}
                id={section.id}
                className="mb-16 scroll-mt-28"
              >
                <h2 className="font-display font-black text-2xl text-[#111111] mb-6 border-l-4 border-[#B08D57] pl-4">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIdx) => (
                    <p 
                      key={pIdx} 
                      className="text-gray-600 leading-relaxed text-base font-body whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4 - CTA Banner */}
      <section className="bg-[#111111] py-16 text-center px-6" id="privacy-cta-banner">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Have Privacy Concerns?
          </h3>
          <p className="text-gray-400 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Our team is ready to answer any questions about your data.
          </p>
          <div className="pt-4">
            <Link 
              to="/contact" 
              className="inline-block border border-[#B08D57] text-[#B08D57] px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#B08D57] hover:text-white transition-all duration-300 rounded-none cursor-pointer"
            >
              Contact Us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

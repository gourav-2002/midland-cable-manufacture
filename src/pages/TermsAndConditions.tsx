import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

const TERMS_DATA = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using the Midland Cable Manufacture website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
  },
  {
    title: "2. Use of Website",
    content: "This website is intended for business and commercial use by manufacturers, contractors, and industrial buyers. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of this website."
  },
  {
    title: "3. Products and Services",
    content: "All copper products including Copper Rods, Copper Wires, Copper Sheets, Copper Tubes, Copper Coils, and Copper Components are subject to availability. Specifications, pricing, and availability are subject to change without notice. We reserve the right to modify or discontinue any product at any time."
  },
  {
    title: "4. Pricing and Payment Terms",
    content: "All prices are quoted in USD unless otherwise stated. Payment terms are agreed upon at the time of purchase order. Midland Cable Manufacture reserves the right to modify pricing at any time. Bulk orders may qualify for special pricing — contact us for details."
  },
  {
    title: "5. Intellectual Property",
    content: "All content on this website including text, graphics, logos, images, and software is the property of Midland Cable Manufacture and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission."
  },
  {
    title: "6. Limitation of Liability",
    content: "Midland Cable Manufacture shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product or service in question."
  },
  {
    title: "7. Privacy Policy",
    content: "Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms and Conditions by reference. Please review our Privacy Policy to understand our practices."
  },
  {
    title: "8. Governing Law",
    content: "These Terms and Conditions shall be governed by and construed in accordance with applicable commercial laws. Any disputes arising from these terms shall be resolved through mutual negotiation or appropriate legal channels."
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions about these Terms and Conditions, please contact us at:

Email: legal@midlandcable.com
Phone: +1 (800) 555-CUPRUM
Address: 88 Industrial Road, Midland`
  }
];

export default function TermsAndConditions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="terms-conditions-page">
      {/* SECTION 1 - Hero Banner */}
      <section className="bg-[#111111] py-20 text-center px-6" id="terms-hero-banner">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-body flex items-center justify-center gap-1">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="text-[#B08D57] font-semibold font-body">&gt;</span>
            <span className="text-gray-400">TERMS & CONDITIONS</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl font-black uppercase tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-sm mt-3 font-body">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* SECTION 2 - Intro paragraph */}
      <section className="bg-white py-12 px-6" id="terms-intro-section">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 leading-relaxed text-base font-body">
            Welcome to Midland Cable Manufacture. These Terms & Conditions govern your access to and use of our digital platforms, calculation engines, specification estimators, and commercial metal procurement services. By accessing, browsing, or placing manufacturing orders through our website, you acknowledge that you have read, understood, and agreed to be fully bound by these operational policies and compliance statements.
          </p>
        </div>
      </section>

      {/* SECTION 3 - Accordion Terms */}
      <section className="bg-white pb-20 px-6" id="terms-accordion-section">
        <div className="max-w-4xl mx-auto">
          {TERMS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border border-gray-200 rounded-none mb-3 overflow-hidden"
              >
                {/* Accordion Trigger row */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50/50 transition-colors duration-200 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-[#111111] text-lg pr-4">
                    {item.title}
                  </span>
                  <span className="text-[#B08D57] flex-shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2]" />
                    )}
                  </span>
                </button>

                {/* Collapsible Content wrapper with standard CSS height transition */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <div className="text-gray-600 leading-relaxed text-sm p-6 font-body whitespace-pre-line">
                    {item.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className={pIdx > 0 ? "mt-4" : ""}>
                        {paragraph.split('\n').map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {line}
                            {lIdx < paragraph.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 - CTA Banner */}
      <section className="bg-[#111111] py-16 text-center px-6" id="terms-cta-banner">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Have Questions About Our Terms?
          </h3>
          <p className="text-gray-400 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Our team is ready to help clarify anything you need.
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // GENERAL
  {
    category: "General",
    question: "What is Midland Cable Manufacture?",
    answer: "Midland Cable Manufacture is a globally recognized premium manufacturer of copper products and cables. We serve industries worldwide including electrical, construction, automotive, energy, infrastructure, HVAC and telecommunications."
  },
  {
    category: "General",
    question: "Where is Midland Cable Manufacture located?",
    answer: "Our manufacturing facility is located at 88 Industrial Road, Midland. We serve clients across 40+ countries worldwide."
  },
  {
    category: "General",
    question: "How many years of experience does Midland have?",
    answer: "Midland Cable Manufacture has over 25 years of experience in the copper manufacturing industry, serving 500+ happy clients globally."
  },
  {
    category: "General",
    question: "Is Midland Cable Manufacture ISO certified?",
    answer: "Yes, Midland Cable Manufacture maintains strict quality certifications and complies with international manufacturing standards to ensure premium quality across all our products."
  },

  // PRODUCTS
  {
    category: "Products",
    question: "What copper products does Midland manufacture?",
    answer: "We manufacture a complete range of copper products including Copper Rods, Copper Wires, Copper Sheets, Copper Tubes, Copper Coils, and precision engineered Copper Components for specialized applications."
  },
  {
    category: "Products",
    question: "What grades of copper do you use?",
    answer: "We use Grade A high conductivity electrolytic copper that meets international standards for purity and performance. All our products are tested for conductivity, tensile strength, and dimensional accuracy."
  },
  {
    category: "Products",
    question: "Can you manufacture custom copper products?",
    answer: "Yes, we offer custom manufacturing solutions based on client specifications. Contact our sales team with your requirements and we will provide a tailored solution."
  },
  {
    category: "Products",
    question: "What are the available sizes and specifications?",
    answer: "We offer a wide range of sizes and specifications for each product category. Please visit our Products page or contact us to download our full product catalog with complete specifications."
  },

  // ORDERING
  {
    category: "Ordering",
    question: "How can I place an order?",
    answer: "You can place an order by filling out our Get a Quote form on the website, emailing us at procurement@midlandcable.com, or calling us directly at +1 (800) 555-CUPRUM. Our sales team will respond within 24 hours."
  },
  {
    category: "Ordering",
    question: "What is the minimum order quantity?",
    answer: "Minimum order quantities vary by product type. Generally we accept bulk orders for industrial and commercial buyers. Contact our sales team for specific MOQ details for your required product."
  },
  {
    category: "Ordering",
    question: "Can I get a sample before placing a bulk order?",
    answer: "Yes, we provide product samples for qualified buyers. Please contact our sales team with your requirements and company details to request samples."
  },
  {
    category: "Ordering",
    question: "How long does order processing take?",
    answer: "Standard orders are processed within 3-5 business days after order confirmation and payment clearance. Large or custom orders may require additional lead time. Our team will provide exact timelines at the time of order."
  },

  // SHIPPING
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer: "Yes, we ship to 40+ countries worldwide. We work with trusted freight partners to ensure safe and timely delivery of all copper products globally."
  },
  {
    category: "Shipping",
    question: "What shipping methods do you use?",
    answer: "We use sea freight for large bulk orders and air freight for smaller urgent shipments. All shipments are fully insured and tracked. We provide complete shipping documentation for customs clearance."
  },
  {
    category: "Shipping",
    question: "Who is responsible for customs and import duties?",
    answer: "Import duties, taxes, and customs clearance fees are the responsibility of the buyer unless otherwise agreed in the purchase contract. We provide all necessary export documentation to assist with customs clearance."
  },
  {
    category: "Shipping",
    question: "How is the copper packaged for shipping?",
    answer: "All products are professionally packaged to prevent damage during transit. Copper rods and tubes are bundled and wrapped, coils are on wooden spools, and sheets are packed in wooden crates with protective padding."
  },

  // QUALITY
  {
    category: "Quality",
    question: "What quality standards do your products meet?",
    answer: "Our copper products meet international standards including ASTM, BS, and IS specifications. We maintain 100% quality assurance through rigorous testing at every stage of the manufacturing process."
  },
  {
    category: "Quality",
    question: "Do you provide material test certificates?",
    answer: "Yes, we provide material test certificates (MTC) with all our shipments confirming the chemical composition, mechanical properties, and compliance with the specified standards."
  },
  {
    category: "Quality",
    question: "What is your quality control process?",
    answer: "Our quality control process includes raw material inspection, in-process checks, and final product testing. Each batch is tested for conductivity, tensile strength, hardness, and dimensional accuracy before dispatch."
  },
  {
    category: "Quality",
    question: "What if I receive a defective product?",
    answer: "We stand behind the quality of our products. If you receive a defective product, contact us within 7 days of receipt with photos and details. We will investigate and provide a replacement or full refund as appropriate."
  },

  // EXPORT & TRADE
  {
    category: "Export & Trade",
    question: "Which countries do you export to?",
    answer: "We export to 40+ countries across Asia, Middle East, Europe, Africa, and Americas. Our global logistics network ensures reliable delivery worldwide."
  },
  {
    category: "Export & Trade",
    question: "Do you have experience with export documentation?",
    answer: "Yes, our export team handles all necessary documentation including Certificate of Origin, Packing List, Commercial Invoice, Bill of Lading, and any country-specific certificates required."
  },
  {
    category: "Export & Trade",
    question: "Can you work with Letters of Credit (LC)?",
    answer: "Yes, we accept Letters of Credit from reputed banks as a payment method for international orders. We also accept T/T bank transfers and other agreed payment terms for established clients."
  },
  {
    category: "Export & Trade",
    question: "Do you offer trade financing or credit terms?",
    answer: "Credit terms are available for established clients with a proven track record. New clients typically start with advance payment or LC terms. Contact our finance team to discuss options."
  }
];

const CATEGORIES = ["All", "General", "Products", "Ordering", "Shipping", "Quality", "Export & Trade"];

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = FAQ_DATA.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  const handleTabChange = (category: string) => {
    setActiveCategory(category);
    setOpenIndex(null); // Reset open accordion items on category filter switch
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="faqs-page">
      {/* SECTION 1 - Hero Banner */}
      <section className="bg-[#111111] py-20 text-center px-6" id="faqs-hero-banner">
        <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
          <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-body flex items-center justify-center gap-1">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="text-[#B08D57] font-semibold font-body">&gt;</span>
            <span className="text-gray-400">FAQs</span>
          </div>
          <h1 className="font-display font-bold text-white text-5xl font-black uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-sm mt-3 font-body max-w-xl mx-auto leading-relaxed">
            Find answers to the most common questions about our products and services.
          </p>
        </div>
      </section>

      {/* SECTION 2 - Category Tabs */}
      <section className="bg-white pt-16 pb-8" id="faqs-categories-section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start sm:justify-center">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleTabChange(category)}
                  className={`px-6 py-2 text-sm font-medium font-body whitespace-nowrap transition-all duration-300 rounded-none cursor-pointer border ${
                    isActive
                      ? "bg-[#B08D57] text-white border-[#B08D57]"
                      : "border-gray-300 text-gray-600 hover:border-[#B08D57] hover:text-[#B08D57]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 - FAQ Accordion */}
      <section className="bg-white pb-20 px-6" id="faqs-accordion-section">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="transition-all duration-300 ease-in-out">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-gray-200 rounded-none mb-3 overflow-hidden transition-all duration-200"
                  >
                    {/* Accordion Trigger row */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50/50 transition-colors duration-200 text-left focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-display font-bold text-[#111111] text-lg pr-4 leading-snug">
                        {faq.question}
                      </h3>
                      <span className="text-[#B08D57] flex-shrink-0 transition-transform duration-200">
                        {isOpen ? (
                          <Minus className="w-5 h-5 stroke-[2]" />
                        ) : (
                          <Plus className="w-5 h-5 stroke-[2]" />
                        )}
                      </span>
                    </button>

                    {/* Collapsible Content envelope */}
                    <div 
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"
                      } overflow-hidden`}
                    >
                      <div className="text-gray-600 leading-relaxed text-sm p-6 font-body whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300">
              <p className="text-gray-500 font-body text-sm">No questions found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 - Still Have Questions Banner */}
      <section className="bg-[#1F1F1F] py-20 px-6 text-center" id="faqs-still-questions-banner">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-display text-3xl font-black text-white uppercase tracking-wider">
            Still Have Questions?
          </h2>
          <p className="text-gray-400 font-body text-sm leading-relaxed max-w-xl mx-auto">
            Our team is available Mon-Fri 8:00 AM to 5:00 PM EST. We typically respond within 24 hours.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[#B08D57] hover:bg-[#8C6A43] text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 rounded-none cursor-pointer"
            >
              Contact Us &rarr;
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 rounded-none cursor-pointer"
            >
              Get a Quote &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 - CTA Banner */}
      <section className="bg-[#111111] py-16 text-center px-6" id="faqs-explore-cta-banner">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Ready to Work With Midland?
          </h3>
          <p className="text-gray-400 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Partner with us for premium copper products and cables delivered worldwide.
          </p>
          <div className="pt-4">
            <Link 
              to="/products" 
              className="inline-block border border-[#B08D57] text-[#B08D57] px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#B08D57] hover:text-white transition-all duration-300 rounded-none cursor-pointer"
            >
              Explore Products &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

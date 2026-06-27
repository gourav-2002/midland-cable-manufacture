import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenQuote: () => void;
}

export default function Footer({ onNavigateToSection, onOpenQuote }: FooterProps) {
  return (
    <footer 
      className="bg-[#0D0D0D] text-white border-t border-[#B08D57]/30 py-20 px-16" 
      id="main-footer"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Column 1 — Brand (wider) */}
          <div className="lg:col-span-5 space-y-6" id="footer-col-brand">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Midland Cable Manufacture logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            
            <p className="text-sm text-gray-400 font-body font-light leading-relaxed max-w-xs">
              Midland is an international leader in smelting Grade A copper cathodes into high-purity wires, rods, sheets, and tubes, compliance-certified for electric vehicles, telecom relays, and national energy grid arrays.
            </p>

            <div className="text-sm font-body text-gray-400 space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B08D57] mt-0.5 flex-shrink-0" />
                <span>PRIMARY COLD MILLS: 88 INDUSTRIAL ROAD, MIDLAND</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>OFFICE LINE: +1 (800) 555-CUPRUM</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Corporate */}
          <div className="lg:col-span-3 space-y-5" id="footer-col-corporate">
            <h4 className="font-display text-xs tracking-[0.25em] uppercase font-semibold text-[#B08D57]">
              CORPORATE
            </h4>
            <div className="flex flex-col gap-1 text-base text-gray-300 font-body font-light">
              <button 
                onClick={() => onNavigateToSection('home')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigateToSection('about')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                About Us
              </button>
              <button 
                onClick={() => onNavigateToSection('why-midland')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                Why Midland
              </button>
              <button 
                onClick={() => onNavigateToSection('contact')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Column 3 — Product Lines */}
          <div className="lg:col-span-4 space-y-5" id="footer-col-product-lines">
            <h4 className="font-display text-xs tracking-[0.25em] uppercase font-semibold text-[#B08D57]">
              PRODUCT LINES
            </h4>
            <div className="flex flex-col gap-1 text-base text-gray-300 font-body font-light">
              <button 
                onClick={() => onNavigateToSection('products')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                Copper Continuous Rods
              </button>
              <button 
                onClick={() => onNavigateToSection('products')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                Electrolytic Drawn Wires
              </button>
              <button 
                onClick={() => onNavigateToSection('products')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                High Oxidation Sheets
              </button>
              <button 
                onClick={() => onNavigateToSection('products')} 
                className="text-[#B08D57] hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block font-semibold"
              >
                Seamless Plumbing Tubes
              </button>
              <button 
                onClick={() => onNavigateToSection('products')} 
                className="hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block"
              >
                Continuous Wound Coils
              </button>
              <button 
                onClick={() => onNavigateToSection('products')} 
                className="text-[#B08D57] hover:text-[#B08D57] hover:translate-x-1 transition-all duration-300 text-left py-1.5 cursor-pointer block font-semibold"
              >
                Machined Custom Fittings
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Navigation Links */}
        <div className="pt-8 border-t border-[#B08D57]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="text-sm font-body text-gray-500 tracking-wider">
            © 2026 MIDLAND CABLE MANUFACTURE S.A. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center justify-center flex-wrap font-body text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-[#B08D57] transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-gray-600 mx-3 select-none">·</span>
            <Link to="/faqs" className="hover:text-[#B08D57] transition-colors duration-300">
              FAQs
            </Link>
            <span className="text-gray-600 mx-3 select-none">·</span>
            <Link to="/terms" className="hover:text-[#B08D57] transition-colors duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../data';

interface NavbarProps {
  onOpenQuote: (productId?: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onOpenQuote, activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'About Us', id: 'about', path: '/about' },
    { name: 'Products', id: 'products', path: '/products' },
    { name: 'Blog', id: 'blog', path: '/blog' },
    { name: 'Why Midland', id: 'why-midland', path: '/why-midland' },
    { name: 'Contact Us', id: 'contact', path: '/contact' },
  ];

  const handleLinkClick = (id: string, isFromMobile = false) => {
    if (isFromMobile) {
      setMobileMenuOpen(false);
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      onNavigate(id);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-industrial-black border-b border-white/10 backdrop-blur-md" id="main-navigation-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Group */}
          <Link 
            to="/" 
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-container"
          >
            <img
              src="/images/logo.png"
              alt="Midland Cable Manufacture logo"
              className="h-14 w-auto object-contain"
            />
           
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8" id="desktop-nav-menu">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <Link
                  to={link.path || '/'}
                  className={`text-xs font-display uppercase tracking-widest py-2 transition-colors relative block cursor-pointer ${
                    activeSection === link.id ? 'text-bronze-primary font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Premium Underline Hover effect */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-bronze-primary transform transition-transform duration-300 origin-left ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              </div>
            ))}
          </div>

          {/* Right CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-5 py-2.5 border border-bronze-primary text-white hover:bg-bronze-primary hover:text-white text-xs font-display uppercase tracking-widest rounded-[4px] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Get a Quote <ArrowRight className="w-3.5 h-3.5 text-bronze-primary" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu panel */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out border-b border-white/10 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-industrial-black`}
        id="mobile-nav-panel"
      >
        <div className="px-4 pt-2 pb-6 space-y-2 font-display">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path || '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-3 py-3 rounded-[4px] text-xs uppercase tracking-widest transition-colors ${
                activeSection === link.id 
                  ? 'bg-white/5 text-bronze-primary font-bold border-l-2 border-bronze-primary' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <Link
              to="/contact"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="block w-full text-center py-3 bg-bronze-primary hover:bg-bronze-secondary text-white text-xs uppercase tracking-widest rounded-[4px] font-semibold font-display transition-colors"
            >
              Get a Quote →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

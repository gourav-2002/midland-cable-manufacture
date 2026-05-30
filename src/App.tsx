import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import modularized page files
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Industries from './pages/Industries';
import Blog from './pages/Blog';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQs from './pages/FAQs';
import TermsAndConditions from './pages/TermsAndConditions';
import WhyMidland from './pages/WhyMidland';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string | undefined>(undefined);

  // Scroll tracking to automatically highlight active navigational sections in the header
  useEffect(() => {
    // Only track scroll on the home page /
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'industries', 'why-midland', 'contact'];
      const scrollPos = window.scrollY + 200; // Offset for sticky navbar triggers

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleOpenQuote = (productId?: string) => {
    setPreselectedProduct(productId);
    setQuoteOpen(true);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleCloseQuote = () => {
    setQuoteOpen(false);
    setPreselectedProduct(undefined);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-industrial-black selection:bg-bronze-primary selection:text-white" id="main-application-view">
      {/* Navbar segment */}
      <Navbar 
        onOpenQuote={handleOpenQuote} 
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main id="app-viewport-contents">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                quoteOpen={quoteOpen}
                onCloseQuote={handleCloseQuote}
                preselectedProduct={preselectedProduct}
                onOpenQuote={handleOpenQuote}
                onOpenContact={() => navigate('/contact')}
                onNavigateToSection={handleNavigate}
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/copper-market-outlook-2025" element={<BlogPost1 />} />
          <Route path="/blog/etp-vs-dhp-copper-grades" element={<BlogPost2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/why-midland" element={<WhyMidland />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer 
        onNavigateToSection={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

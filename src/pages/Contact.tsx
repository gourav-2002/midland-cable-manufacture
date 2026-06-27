import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  Headphones, 
  MessageCircle 
} from 'lucide-react';

interface FormState {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  country: '',
  subject: '',
  message: ''
};

export default function Contact() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Partial<Record<keyof FormState, boolean>> = {};
    let hasErrors = false;

    const requiredFields: (keyof FormState)[] = ['name', 'email', 'phone', 'country', 'subject', 'message'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    // Success response trigger
    setErrors({});
    setSubmitted(true);
    setFormData(INITIAL_FORM_STATE);
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen" id="contact-page-wrapper">
      
      {/* SECTION 1 - Hero Banner */}
      <section className="relative bg-[#111111] min-h-[500px] flex items-center overflow-hidden" id="contact-hero-banner">
        {/* Absolute Background Image (Right side) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2" id="hero-image-overlay-bg">
          <img 
            src="/images/contact-us.webp" 
            alt="Copper coils and industrial copper production" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay Gradient (Left to Right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/40 to-transparent" />
        </div>

        {/* Foreground Content */}
        <div className="relative max-w-6xl mx-auto w-full px-6 py-20 lg:py-32 z-10" id="hero-foreground-content">
          <div className="max-w-xl space-y-4">
            <div className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium mb-4 font-body">
              HOME &gt; CONTACT US
            </div>
            
            <h1 className="font-display font-black text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
              Let's Build a Stronger <br />
              Future, <span className="text-[#B08D57]">Together.</span>
            </h1>

            <div className="w-16 h-1 bg-[#B08D57] mt-6" />

            <p className="text-gray-300 mt-6 max-w-lg leading-relaxed font-body text-sm sm:text-base">
              Have a requirement or need more information about our copper products? Our team is here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 - Contact Info Cards (Overlapping Hero Banner) */}
      <section className="relative z-20 px-6 bg-white" id="contact-info-cards-section">
        <div className="max-w-6xl mx-auto -mt-16 lg:-mt-20">
          <div className="bg-white shadow-xl border border-gray-100 rounded-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-100" id="cards-grid-inner">
            
            {/* Card 1: Office Address */}
            <div className="p-8 flex flex-col items-start space-y-4 bg-white" id="card-visit-office">
              <div className="p-3 bg-gray-50 text-[#B08D57] rounded-none">
                <MapPin className="w-[28px] h-[28px] stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-[#111111] text-base uppercase tracking-wider">
                Visit Our Office
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mt-3 font-body">
                <p>123 Industrial Area,</p>
                <p>Phase 2, City - 00000,</p>
                <p>Country</p>
              </div>
            </div>

            {/* Card 2: Telephone Line */}
            <div className="p-8 flex flex-col items-start space-y-4 bg-white" id="card-call-us">
              <div className="p-3 bg-gray-50 text-[#B08D57] rounded-none">
                <Phone className="w-[28px] h-[28px] stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-[#111111] text-base uppercase tracking-wider">
                Call Us
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mt-3 font-body">
                <p className="font-semibold text-gray-800 text-base">+1 (234) 567 8900</p>
                <p className="text-gray-500 mt-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Card 3: Mail Desk */}
            <div className="p-8 flex flex-col items-start space-y-4 bg-white" id="card-email-us">
              <div className="p-3 bg-gray-50 text-[#B08D57] rounded-none">
                <Mail className="w-[28px] h-[28px] stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-[#111111] text-base uppercase tracking-wider">
                Email Us
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mt-3 font-body">
                <p className="font-semibold text-gray-800">info@midlandcable.com</p>
                <p className="text-gray-500 mt-1">sales@midlandcable.com</p>
              </div>
            </div>

            {/* Card 4: Pan-India Presence */}
            <div className="p-8 flex flex-col items-start space-y-4 bg-white" id="card-global-presence">
              <div className="p-3 bg-gray-50 text-[#B08D57] rounded-none">
                <Globe className="w-[28px] h-[28px] stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-[#111111] text-base uppercase tracking-wider">
                Pan-India Presence
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mt-3 font-body">
                <p className="font-semibold text-gray-800">Serving 15+ States</p>
                <p className="text-gray-500 mt-1">Across India</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 - Contact Form + Office Locations */}
      <section className="bg-white py-24 px-6 border-b border-gray-100" id="contact-form-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start" id="form-offices-split">
            
            {/* LEFT COLUMN: CONTACT FORM */}
            <div className="lg:col-span-7 space-y-8" id="form-column">
              <div className="space-y-3">
                <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium font-body block">
                  GET IN TOUCH
                </span>
                <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
                  Send Us a <span className="text-[#B08D57]">Message</span>
                </h2>
                <div className="w-16 h-1 bg-[#B08D57] mt-4 mb-6" />
                <p className="text-gray-500 text-sm leading-relaxed font-body max-w-xl">
                  Fill out the form and our expert team will get back to you as soon as possible.
                </p>
              </div>

              {/* Submitted success state feedback */}
              {submitted ? (
                <div className="p-6 bg-[#B08D57]/5 border border-[#B08D57]/30 text-center space-y-2 animate-fade-in" id="form-success-feedback">
                  <ShieldCheck className="w-8 h-8 text-[#B08D57] mx-auto" />
                  <p className="font-display font-bold text-[#B08D57] text-lg">
                    Thank you! We will get back to you within 24 hours.
                  </p>
                  <p className="text-gray-500 text-xs font-body">
                    Your inquiry details have been forwarded to our corporate procurement desk.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#B08D57] underline hover:text-[#8C6A43]"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} id="actual-contact-form">
                  {/* Row 1 - two columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-body font-medium text-gray-500">Your Name *</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`border w-full px-4 py-3 text-sm font-body text-gray-700 focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-body font-medium text-gray-500">Company Name</label>
                      <input 
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Midland Cable Partners"
                        className="border border-gray-300 w-full px-4 py-3 text-sm font-body text-gray-700 focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none"
                      />
                    </div>
                  </div>

                  {/* Row 2 - two columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-body font-medium text-gray-500">Email Address *</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`border w-full px-4 py-3 text-sm font-body text-gray-700 focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-body font-medium text-gray-500">Phone Number *</label>
                      <input 
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className={`border w-full px-4 py-3 text-sm font-body text-gray-700 focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 3 - Country dropdown */}
                  <div className="space-y-1">
                    <label className="text-xs font-body font-medium text-gray-500">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`border w-full px-4 py-3 text-sm font-body text-gray-700 bg-white focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none ${
                        errors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="UAE">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Canada">Canada</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Row 4 - Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-body font-medium text-gray-500">Subject *</label>
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Pricing inquiry for bulk copper tubes"
                      className={`border w-full px-4 py-3 text-sm font-body text-gray-700 focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none ${
                        errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Row 5 - Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-body font-medium text-gray-500">Your Message *</label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please layout your order specifications, quantity targets, and scheduling corridors here."
                      className={`border w-full px-4 py-3 text-sm font-body text-gray-700 focus:outline-none focus:border-[#B08D57] transition-colors duration-300 rounded-none ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Submit Trigger Actions */}
                  <div>
                    <button 
                      type="submit"
                      className="bg-[#B08D57] text-white px-8 py-4 font-semibold font-body hover:bg-[#8C6A43] transition-all duration-300 flex items-center gap-2 uppercase tracking-wider text-xs cursor-pointer rounded-none"
                    >
                      Send Message &rarr;
                    </button>

                    <div className="text-gray-400 text-xs mt-4 flex items-center gap-2 font-body" id="privacy-guarantee-note">
                      <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                      <span>Your information is safe with us. We never share your data.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: OUR OFFICES */}
            <div className="lg:col-span-5 space-y-8" id="offices-column">
              <div className="space-y-3">
                <span className="text-xs tracking-[0.3em] uppercase text-[#B08D57] font-medium font-body block">
                  WE ARE HERE
                </span>
                <h2 className="font-display font-black text-4xl text-[#111111] uppercase tracking-tight">
                  Our Offices
                </h2>
              </div>

              {/* Office lists */}
              <div className="space-y-4" id="office-cards-list">
                
                {/* Office 1 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 hover:border-[#B08D57] transition-all duration-300 bg-white shadow-sm hover:shadow" id="office-head-hq">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200" 
                    alt="Head Office location" 
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="space-y-1 flex-1 font-body">
                    <h4 className="font-display font-bold text-[#111111] text-base uppercase tracking-wide">
                      Head Office
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      123 Industrial Area, Phase 2, City - 00000, Country
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Phone: +1 (234) 567 8900
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Email: info@midlandcable.com
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#B08D57] shrink-0 ml-auto hidden sm:block" />
                </div>

                {/* Office 2 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 hover:border-[#B08D57] transition-all duration-300 bg-white shadow-sm hover:shadow" id="office-manufacturing-plant">
                  <img 
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200" 
                    alt="Manufacturing Plant location" 
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="space-y-1 flex-1 font-body">
                    <h4 className="font-display font-bold text-[#111111] text-base uppercase tracking-wide">
                      Manufacturing Plant
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      45 Manufacturing Zone, Phase 3, City - 00000, Country
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Phone: +1 (234) 567 8901
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Email: plant@midlandcable.com
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#B08D57] shrink-0 ml-auto hidden sm:block" />
                </div>

                {/* Office 3 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 hover:border-[#B08D57] transition-all duration-300 bg-white shadow-sm hover:shadow" id="office-export-terminal">
                  <img
                    src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=200"
                    alt="Sales and Logistics Office location"
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="space-y-1 flex-1 font-body">
                    <h4 className="font-display font-bold text-[#111111] text-base uppercase tracking-wide">
                      Sales &amp; Logistics Office
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      78 Logistics Park, City - 00000, India
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Phone: +1 (234) 567 8902
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Email: sales@midlandcable.com
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#B08D57] shrink-0 ml-auto hidden sm:block" />
                </div>

                {/* Office 4 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 hover:border-[#B08D57] transition-all duration-300 bg-white shadow-sm hover:shadow" id="office-sales-hub">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=200" 
                    alt="Sales Office location" 
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="space-y-1 flex-1 font-body">
                    <h4 className="font-display font-bold text-[#111111] text-base uppercase tracking-wide">
                      Sales Office
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      9 Business Park, City - 00000, Country
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Phone: +1 (234) 567 8903
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Email: sales@midlandcable.com
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#B08D57] shrink-0 ml-auto hidden sm:block" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4 - Map Section */}
      <section className="relative w-full h-[400px] bg-gray-100" id="office-interactive-map">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.8,18.9,73.0,19.1&layer=mapnik"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          title="Midland Cable Manufacture Head Office Location Map"
        />
        
        {/* Overlay card in top right of map */}
        <div className="absolute top-8 right-8 bg-white shadow-xl p-6 max-w-xs z-10 border border-gray-100 font-body" id="map-address-overlay-card">
          <h4 className="font-display font-bold text-[#111111] text-base uppercase tracking-wide">
            Midland Head Office
          </h4>
          <p className="text-gray-500 text-sm mt-2">
            123 Industrial Area, Phase 2, <br />
            City - 00000, Country
          </p>
          <a 
            href="https://www.openstreetmap.org/#map=13/19.0/72.9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-[#B08D57] text-sm font-semibold mt-4 hover:underline uppercase tracking-wider"
          >
            Get Directions &rarr;
          </a>
        </div>
      </section>

      {/* SECTION 5 - Quick Contact Banner */}
      <section className="bg-[#1F1F1F] py-12 px-6 text-[#111111]" id="quick-leads-hotbar">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          {/* Left Block */}
          <div className="flex items-center gap-4" id="assist-headline-block">
            <div className="bg-[#B08D57] p-4 text-white shrink-0">
              <Headphones className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1 font-body">
              <h3 className="font-display font-bold text-white text-xl uppercase tracking-wider">
                Need Immediate Assistance?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team is ready to help you with your requirements.
              </p>
            </div>
          </div>

          {/* Call block */}
          <div className="flex items-center gap-3 font-body" id="quick-tel-lead">
            <Phone className="w-5 h-5 text-[#B08D57] transform rotate-[15deg]" />
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider block">Quick Call</span>
              <span className="text-white font-bold text-lg font-mono">+1 (234) 567 8900</span>
            </div>
          </div>

          {/* WhatsApp block */}
          <div className="flex items-center gap-3 font-body" id="quick-whatsapp-lead">
            <MessageCircle className="w-5 h-5 text-[#B08D57]" />
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider block">WhatsApp Us</span>
              <span className="text-white font-bold text-lg font-mono">+1 (234) 567 8900</span>
            </div>
          </div>

          {/* CTA Action button */}
          <div id="leads-hotbar-action">
            <a 
              href="mailto:info@midlandcable.com?subject=Rapid%20Corporate%20Procurement%20Dispatch"
              className="inline-block bg-[#B08D57] text-white px-8 py-4 hover:bg-[#8C6A43] transition-all duration-300 font-semibold font-body uppercase tracking-widest text-xs whitespace-nowrap rounded-none"
            >
              Chat Now &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 6 - CTA Banner (Matches homepage CTA styles) */}
      <section className="bg-[#111111] py-20 text-center px-6" id="contact-explore-projects-cta">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Ready to Start a Project?
          </h3>
          <p className="text-gray-400 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Partner with Midland for premium copper products and cables.
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

import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Users,
  Network,
  Presentation,
  ArrowRight,
  Calendar,
  Send,
  X,
  ChevronDown,
  Menu,
  CheckCircle
} from 'lucide-react';

const ACTIVE_H = 6.8;
const SMALL_H = 3.2;
const TRANSITION = 'top 1.8s cubic-bezier(0.65,0,0.35,1), opacity 1.8s ease, font-size 1.8s cubic-bezier(0.65,0,0.35,1), color 1.8s ease';

function getSlotStyle(slot, total) {
  if (slot === 0) {
    return { top: '0rem', fontSize: 'clamp(2.25rem, 6vw, 4.25rem)', opacity: 1, weight: 800 };
  }
  const top = ACTIVE_H + (slot - 1) * SMALL_H;
  const opacity = Math.max(0.18, 0.85 - (slot - 1) * (0.65 / Math.max(total - 1, 1)));
  return { top: `${top}rem`, fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)', opacity, weight: 600 };
}

function ExpertiseCarousel({ items, activeIndex }) {
  const total = items.length;
  const containerHeightRem = ACTIVE_H + (total - 1) * SMALL_H + 2.4;

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center mt-40 sm:mt-56"
      style={{ height: `${containerHeightRem}rem` }}
    >
      {items.map((label, i) => {
        const slot = (i - activeIndex + total) % total;
        const style = getSlotStyle(slot, total);
        const isActive = slot === 0;

        return (
          <div
            key={label}
            className="absolute font-heading tracking-tight text-center whitespace-nowrap"
            style={{
              top: style.top,
              fontSize: style.fontSize,
              fontWeight: style.weight,
              opacity: style.opacity,
              color: isActive ? 'var(--color-brand-accent)' : '#ffffff',
              transition: TRANSITION,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

const ribbonItems = [
  "SAP Analytics Cloud",
  "SAP Datasphere",
  "Business Data Cloud",
];

function HeroRibbon() {
  const doubled = [...ribbonItems, ...ribbonItems];
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[85%] sm:max-w-md overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-0">
          {doubled.map((item, i) => (
            <span key={i} className="font-heading text-xs font-medium text-white/60 tracking-widest uppercase">
              {item}
              <span className="mx-3 text-white/20">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificationsSlider({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-6 w-max animate-cert-scroll">
        {doubled.map((cert, i) => (
          <div
            key={i}
            className="w-[260px] sm:w-[320px] lg:w-[380px] flex-shrink-0 bg-brand-surface/60 border border-brand-accent/10 rounded-2xl overflow-hidden hover:border-brand-accent/30 transition-colors duration-300"
          >
            <div className="aspect-square">
              <img src={cert.img} alt={cert.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h4 className="font-heading font-bold text-lg leading-snug">{cert.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const certificates = [
  { name: 'SAP S/4HANA Cloud Private Edition, Financial Accounting', img: '/images/certificate-01.png' },
  { name: 'Data Architect - SAP Business Data Cloud', img: '/images/certificate-02.png' },
  { name: 'Data Engineer - SAP BW/4HANA', img: '/images/certificate-03.png' },
  { name: 'Project Manager - SAP Activate', img: '/images/certificate-04.png' },
  { name: 'SAP S/4HANA Cloud Private Edition, Management Accounting', img: '/images/certificate-05.png' },
  { name: 'Data Analyst - SAP Analytics Cloud', img: '/images/certificate-06.png' },
  { name: 'SAP Business Data Cloud', img: '/images/certificate-07.png' },
];

const caseStudies = [
  { icon: <Network className="text-brand-accent w-5 h-5" />, title: 'Case Study One', desc: 'Short description coming soon.' },
  { icon: <Users className="text-brand-accent w-5 h-5" />, title: 'Case Study Two', desc: 'Short description coming soon.' },
  { icon: <Presentation className="text-brand-accent w-5 h-5" />, title: 'Case Study Three', desc: 'Short description coming soon.' },
];

const SHOW_BLOG = false;
const blogPosts = [];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', service: 'Agentic AI Consulting', message: ''
  });

  const expertiseList = [
    "Enterprise Analytics",
    "SAP Analytics Cloud",
    "SAP Datasphere & Business Data Cloud",
    "Consulting & Advisory",
  ];
  const [expertiseIndex, setExpertiseIndex] = useState(0);

  const [imageIndex, setImageIndex] = useState(0);
  const heroImages = [
    '/images/hero-image-1.png',
    '/images/hero-image-2.png',
    '/images/hero-image-3.png',
  ];

  useEffect(() => {
    const expTimer = setInterval(() => {
      setExpertiseIndex(prev => (prev + 1) % expertiseList.length);
    }, 4200);
    const imgTimer = setInterval(() => {
      setImageIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => { clearInterval(expTimer); clearInterval(imgTimer); };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    setTimeout(() => setBookingStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body">

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-brand-dark/95 border-b border-brand-accent/10' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-heading font-extrabold text-2xl tracking-tight">
            WAJAHAT<span className="text-brand-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Home</a>

            {/* Case Studies trigger */}
            <button
              onMouseEnter={() => setIsCaseStudiesOpen(true)}
              onMouseLeave={() => setIsCaseStudiesOpen(false)}
              className={`flex items-center gap-1 font-heading font-medium text-sm transition-colors ${isCaseStudiesOpen ? 'text-brand-accent' : 'text-slate-300 hover:text-brand-accent'}`}
            >
              Case Studies
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isCaseStudiesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <a href="#trainings" className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Trainings</a>
            <a href="#blogs" className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Blogs</a>
            <a href="#booking" className="px-5 py-2.5 bg-brand-accent text-brand-dark font-heading font-semibold text-sm rounded-full hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(203,255,84,0.3)] hover:-translate-y-0.5">
              Book E-Meeting
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-accent transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ── CASE STUDIES full-width mega menu ── */}
        <div
          onMouseEnter={() => setIsCaseStudiesOpen(true)}
          onMouseLeave={() => setIsCaseStudiesOpen(false)}
          style={{
            position: 'absolute',
            top: 'calc(100% - 1px)',
            left: 0,
            width: '100%',
            opacity: isCaseStudiesOpen ? 1 : 0,
            visibility: isCaseStudiesOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.2s ease, visibility 0.2s ease',
            zIndex: 50,
          }}
        >
          <div className="w-full bg-brand-dark border-b border-brand-accent/10 shadow-2xl"
            style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(3,20,20,0.98)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-8">

              {/* Heading + divider */}
              <h3 className="font-heading font-extrabold text-xl text-white mb-3 tracking-tight">
                Case Studies
              </h3>
              <div className="w-full h-px mb-6" style={{ backgroundColor: 'rgba(203,255,84,0.15)' }}></div>

              {/* Tiles + quote panel */}
              <div className="grid gap-8 items-start" style={{ gridTemplateColumns: '1fr auto' }}>

                {/* 3 tiles */}
                <div className="grid grid-cols-3 gap-4">
                  {caseStudies.map((cs, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex flex-col items-start gap-4 p-5 rounded-2xl border transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(6,36,35,0.6)',
                        borderColor: 'rgba(203,255,84,0.1)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(203,255,84,0.4)';
                        e.currentTarget.style.backgroundColor = 'rgba(203,255,84,0.04)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(203,255,84,0.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(6,36,35,0.6)';
                      }}
                    >
                      <span
                        className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                        style={{ backgroundColor: 'rgba(6,50,49,0.6)', border: '1px solid rgba(203,255,84,0.15)' }}
                      >
                        {cs.icon}
                      </span>
                      <span>
                        <span className="block font-heading font-bold text-sm text-white leading-snug mb-1">{cs.title}</span>
                        <span className="block text-xs text-slate-400 leading-relaxed">{cs.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>

                {/* Quote panel */}
                <div
                  className="w-56 flex-shrink-0 rounded-2xl p-6 flex items-center justify-center text-center self-stretch"
                  style={{ background: 'radial-gradient(circle at 50% 30%, rgba(11,74,72,0.7) 0%, rgba(3,20,20,0.98) 80%)' }}
                >
                  <p className="font-heading text-sm leading-relaxed text-white">
                    "Every case study here is proof that the right strategy turns into{' '}
                    <span className="font-extrabold text-brand-accent">measurable impact</span>."
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden fixed top-[73px] left-0 w-full bg-brand-dark/97 backdrop-blur-lg border-b border-brand-accent/10 flex flex-col gap-6 p-8 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-4'}`}>
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-lg text-slate-300 hover:text-brand-accent">Home</a>
          <div className="flex flex-col gap-3 pl-4 border-l border-brand-accent/20">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-slate-400 hover:text-brand-accent">My Story</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-slate-400 hover:text-brand-accent">Certifications</a>
          </div>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-lg text-slate-300 hover:text-brand-accent">Services</a>
          {SHOW_BLOG && (
            <a href="#resources" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-lg text-slate-300 hover:text-brand-accent">Blog</a>
          )}
          <a href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-brand-accent text-brand-dark font-heading font-semibold rounded-full">
            Book E-Meeting
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(6,50,49,0.55) 0%, #031414 70%)' }}
      >
        <div key={imageIndex} className="hero-image-slot absolute inset-0 z-0">
          <img
            src={heroImages[imageIndex]}
            alt=""
            className="w-full h-full object-cover object-top"
            style={{ transform: 'scale(1.06) translateY(-3%)' }}
          />
        </div>
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(3,20,20,0.55) 0%, rgba(3,20,20,0.93) 75%)' }}
        ></div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 pb-4 px-6">
          <ExpertiseCarousel items={expertiseList} activeIndex={expertiseIndex} />
        </div>

        <div className="relative z-10 w-full pb-8">
          <HeroRibbon />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div
              className="rounded-3xl overflow-hidden border border-brand-accent/10 aspect-[4/5] md:aspect-auto md:h-[480px]"
              style={{ background: 'radial-gradient(circle at 50% 32%, rgba(11,74,72,0.45) 0%, rgba(3,20,20,0.95) 70%)' }}
            >
              <img src="/images/profile-image.png" alt="Wajahat" className="w-full h-full object-contain p-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="relative flex items-center justify-center w-4 h-4">
                  <span className="absolute inset-0 rounded-full border-2 border-brand-accent"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                </span>
                <span className="font-heading text-sm font-medium text-slate-300 tracking-wide">About Wajahat</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
                A Journey Guided by <span className="text-brand-accent">Purpose</span>
              </h2>

              <p className="text-slate-300 leading-relaxed mb-4">
                I'm Wajahat Siddique, a technology consultant specializing in SAP Analytics Cloud, SAP Datasphere, Business Data Cloud, enterprise reporting, planning, and analytics transformation.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                My focus is helping organizations build scalable data-driven decision-making capabilities through modern analytics architectures, executive dashboards, and business intelligence solutions.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                With deep expertise across the SAP analytics ecosystem, I bridge the gap between raw data and strategic insight — designing solutions that empower leadership teams to act with clarity and confidence.
              </p>
              <p className="text-slate-300 leading-relaxed">
                From greenfield implementations to complex migrations and governance frameworks, I work with enterprises to future-proof their analytics infrastructure and unlock the full value of their data investments.
              </p>
            </div>
          </div>

          <h3 className="font-heading font-bold text-2xl mb-6">Certifications</h3>
          <CertificationsSlider items={certificates} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-brand-surface/25 border-y border-brand-accent/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mb-12">
            Case Studies and <span className="text-brand-accent">Experience</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Users className="text-brand-accent w-12 h-12 mb-6" />, title: 'Agentic AI Consulting', desc: 'Develop custom multi-agent networks, autonomous reasoning models, and agent workflows optimized for secure enterprise execution.' },
              { icon: <Network className="text-brand-accent w-12 h-12 mb-6" />, title: 'Digital Transformation', desc: 'Redesign core cloud structures, replace legacy frameworks, and build modern digital infrastructure with modular flexibility.' },
              { icon: <Presentation className="text-brand-accent w-12 h-12 mb-6" />, title: 'Workshops & Speaking', desc: 'Book personalized seminars, deep-dive AI engineering bootcamps, and masterclass sessions for developers or leadership groups.' },
            ].map((s, i) => (
              <div key={i} className="bg-brand-surface/60 border border-brand-accent/10 rounded-2xl p-8 backdrop-blur-md hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1">
                {s.icon}
                <h3 className="font-heading font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{s.desc}</p>
                <a href="#booking" className="inline-flex items-center gap-2 text-brand-accent font-heading font-semibold text-sm hover:underline">
                  Request Service <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      {SHOW_BLOG && (
        <section id="resources" className="py-24 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mb-12">
              From the <span className="text-brand-accent">Blog</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <div key={i} className="bg-brand-surface/60 border border-brand-accent/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-brand-accent/30 transition-all duration-300">
                  <div className="aspect-[16/10] bg-brand-primary/40">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{post.date}</span>
                    <h3 className="font-heading font-bold text-xl mt-2 mb-2">{post.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <a href={post.link} className="inline-flex items-center gap-2 text-brand-accent font-heading font-semibold text-sm hover:underline">
                      Read Post <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOOKING ── */}
      <section id="booking" className="py-24 bg-brand-surface/25 border-t border-brand-accent/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">
              Book an <span className="text-brand-accent">E-Meeting</span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Discuss enterprise integration, request speaking engagements, or setup a one-on-one consulting audit for your technology pipeline.
            </p>
            <div className="bg-brand-surface/60 border border-brand-accent/10 rounded-2xl p-6 flex gap-4 items-center">
              <CheckCircle className="text-brand-accent w-10 h-10 flex-shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-base">Actionable Consulting</h4>
                <p className="text-slate-400 text-xs mt-1">Get strategic planning, system audits, and implementation pathways directly from Wajahat.</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-surface/60 border border-brand-accent/10 rounded-3xl p-8 backdrop-blur-md">
            {bookingStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="text-brand-accent w-16 h-16 mx-auto mb-4 stroke-[1.5]" />
                <h3 className="font-heading font-bold text-2xl text-brand-accent mb-2">E-Meeting Scheduled</h3>
                <p className="text-slate-300 text-sm max-w-xs mx-auto">
                  Thank you, {formData.name}. Wajahat's team will reach out at {formData.email} to confirm your slot.
                </p>
                <button
                  onClick={() => { setBookingStatus(null); setFormData({ name: '', email: '', service: 'Agentic AI Consulting', message: '' }); }}
                  className="mt-6 px-6 py-2 bg-brand-accent text-brand-dark rounded-full font-heading font-bold text-sm"
                >
                  Book Another Meeting
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-5">
                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Wajahat Ali' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'wajahat@domain.com' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label htmlFor={f.id} className="font-heading font-semibold text-sm text-slate-300">{f.label}</label>
                    <input
                      type={f.type}
                      id={f.id}
                      required
                      value={formData[f.id]}
                      onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                      placeholder={f.placeholder}
                      className="bg-brand-dark/50 border border-brand-accent/10 focus:border-brand-accent rounded-xl p-3.5 outline-none text-white text-sm transition-all"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="font-heading font-semibold text-sm text-slate-300">Service Category</label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="bg-brand-dark/50 border border-brand-accent/10 focus:border-brand-accent rounded-xl p-3.5 outline-none text-white text-sm"
                  >
                    <option>Agentic AI Consulting</option>
                    <option>Digital Transformation Strategy</option>
                    <option>Workshop or Seminar Booking</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-heading font-semibold text-sm text-slate-300">Project Objective</label>
                  <textarea
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements..."
                    className="bg-brand-dark/50 border border-brand-accent/10 focus:border-brand-accent rounded-xl p-3.5 outline-none text-white text-sm resize-none transition-all"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={bookingStatus === 'loading'}
                  className="w-full py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {bookingStatus === 'loading' ? (
                    <>Scheduling... <span className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></span></>
                  ) : (
                    <>Send Consultation Request <Send size={15} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-dark border-t border-brand-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
            <div>
              <h3 className="font-heading font-extrabold text-2xl mb-4">WAJAHAT<span className="text-brand-accent">.</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Specialized consultation and enterprise strategy for AI integration and multi-agent system delivery.
              </p>
              <div className="flex gap-3">
                {['fa-linkedin-in', 'fa-github', 'fa-x-twitter'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 rounded-full bg-brand-surface border border-brand-accent/10 flex items-center justify-center hover:border-brand-accent transition-all">
                    <i className={`fa-brands ${icon} text-slate-400`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Sitemap</h4>
              <div className="flex flex-col gap-2.5 text-sm text-slate-400">
                {['home', 'about', 'services', 'resources'].map(s => (
                  <a key={s} href={`#${s}`} className="capitalize hover:text-brand-accent transition-colors">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
              <div className="flex flex-col gap-2.5 text-sm text-slate-400">
                <a href="#booking" className="hover:text-brand-accent transition-colors">Book E-Meeting</a>
                <span>info@wajahat.com</span>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-accent/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Wajahat. All rights reserved.</p>
            <p>Built with React + Tailwind CSS v4</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import { caseStudyMeta } from './data/caseStudies.jsx';
import { trainingMeta } from './data/trainings.jsx';
import {
  Send,
  CheckCircle
} from 'lucide-react';

const TRANSITION = 'top 1.8s cubic-bezier(0.65,0,0.35,1), opacity 1.8s ease, font-size 1.8s cubic-bezier(0.65,0,0.35,1), color 1.8s ease';

function getSlotStyle(slot, total, isMobile) {
  const activeH = isMobile ? 3 : 6;
  const smallH = isMobile ? 2 : 3.2;
  if (slot === 0) {
    return { top: '0rem', fontSize: isMobile ? 'clamp(0.85rem, 4vw, 1.1rem)' : 'clamp(1.25rem, 3.5vw, 2.5rem)', opacity: 1, weight: 700 };
  }
  const top = activeH + (slot - 1) * smallH;
  const opacity = Math.max(0.15, 0.75 - (slot - 1) * (0.55 / Math.max(total - 1, 1)));
  return { top: `${top}rem`, fontSize: isMobile ? 'clamp(0.6rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.6vw, 1rem)', opacity, weight: 500 };
}

function ExpertiseCarousel({ items, activeIndex }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const total = items.length;
  const activeH = isMobile ? 3 : 6;
  const smallH = isMobile ? 2 : 3.2;
  const containerHeightRem = activeH + (total - 1) * smallH + 1.6;

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center mt-8 sm:mt-32 px-4"
      style={{ height: `${containerHeightRem}rem` }}
    >
      {items.map((label, i) => {
        const slot = (i - activeIndex + total) % total;
        const style = getSlotStyle(slot, total, isMobile);
        const isActive = slot === 0;

        return (
          <div
            key={label}
            className={`absolute left-0 right-0 font-heading tracking-tight text-center px-2 sm:px-4 sm:whitespace-nowrap ${isActive ? 'expertise-active' : 'expertise-inactive'}`}
            style={{
              top: style.top,
              fontSize: style.fontSize,
              fontWeight: style.weight,
              opacity: style.opacity,
              color: isActive ? 'var(--color-brand-accent)' : '#ffffff',
              transition: TRANSITION,
              maxWidth: '100%',
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
  "SAP Business Data Cloud",
  "SAP Analytics Cloud",
  "SAP Datasphere",
  "SAP HANA Cloud",
  "SAP IBP",
  "MS Power BI",
  "Tableau",
  "MS Excel",
];

function HeroRibbon() {
  const doubled = [...ribbonItems, ...ribbonItems];
  return (
    <div className="flex justify-center w-full px-4">
      <div className="max-w-full sm:max-w-5xl overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-0">
          {doubled.map((item, i) => (
            <span key={i} className="font-heading text-[10px] sm:text-xs font-medium text-white/60 tracking-widest uppercase">
              {item}
              <span className="mx-2 sm:mx-3 text-white/20">|</span>
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
      <div className="flex gap-3 sm:gap-4 w-max animate-cert-scroll">
        {doubled.map((cert, i) => (
          <div
            key={i}
            className="w-[180px] sm:w-[220px] lg:w-[250px] flex-shrink-0 bg-brand-surface/60 border border-brand-accent/10 rounded-2xl overflow-hidden hover:border-brand-accent/30 transition-colors duration-300"
          >
            <div className="aspect-square">
              <img src={cert.img} alt={cert.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 sm:p-4">
              <h4 className="font-heading font-bold text-xs sm:text-sm leading-snug">{cert.name}</h4>
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

export default function Home({ bookingStatus, setBookingStatus, formData, setFormData, handleBookingSubmit }) {
  const navigate = useNavigate();
  const [expertiseIndex, setExpertiseIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const imageRef = useRef(0);

  const expertiseList = [
    "Transforming Data into Business Decisions",
    "Building AI-Ready Enterprises",
    "Connecting Strategy, Planning & Analytics",
    "Delivering Insights That Drive Action",
    "Modernizing Data Platforms with SAP Business Data Cloud",
  ];

  const heroImages = [
    '/images/hero-image-1.png',
    '/images/hero-image-2.png',
    '/images/hero-image-3.png',
    '/images/hero-image-4.png',
  ];

  useEffect(() => {
    const expTimer = setInterval(() => {
      setExpertiseIndex(prev => (prev + 1) % expertiseList.length);
    }, 4200);
    const imgTimer = setInterval(() => {
      const current = imageRef.current;
      const next = (current + 1) % heroImages.length;
      setExitingIndex(current);
      setImageIndex(next);
      imageRef.current = next;
      setTimeout(() => setExitingIndex(null), 1000);
    }, 4500);
    return () => { clearInterval(expTimer); clearInterval(imgTimer); };
  }, []);

  const headerCaseStudies = caseStudyMeta.map(cs => ({
    ...cs,
    onClick: () => navigate(cs.path)
  }));

  const headerTrainings = trainingMeta.map(tr => ({ ...tr, onClick: () => navigate(tr.path) }));

  return (
    <>
      <Header
        caseStudies={headerCaseStudies}
        trainings={headerTrainings}
      />

      <section
        id="home"
        className="relative min-h-[100vw] sm:min-h-screen flex flex-col overflow-hidden mt-16 sm:mt-20"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(6,50,49,0.55) 0%, #031414 70%)' }}
      >
        <div className="hero-image-slot absolute inset-0 z-0">
          <img
            src={heroImages[imageIndex]}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        {exitingIndex !== null && (
          <div className="hero-image-exit absolute inset-0 z-0">
            <img
              src={heroImages[exitingIndex]}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(3,20,20,0.55) 0%, rgba(3,20,20,0.93) 75%)' }}
        ></div>

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center pt-8 sm:pt-16 lg:pt-24 pb-4 sm:pb-6 px-6">
            <ExpertiseCarousel items={expertiseList} activeIndex={expertiseIndex} />
          </div>
          <div className="w-full pb-4 sm:pb-6 hidden sm:block">
            <HeroRibbon />
          </div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
            <Reveal direction="left">
              <div
                className="rounded-3xl overflow-hidden border border-brand-accent/10 aspect-[4/5] md:aspect-auto md:h-[500px] lg:h-[580px]"
                style={{ background: 'radial-gradient(circle at 50% 32%, rgba(203,255,84,0.15) 0%, rgba(203,255,84,0.05) 70%)' }}
              >
                <img src="/images/profile-image.png" alt="Wajahat" className="w-full h-full object-cover p-2 sm:p-8" />
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex items-center justify-center w-4 h-4">
                    <span className="absolute inset-0 rounded-full border-2 border-brand-accent"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                  </span>
                  <span className="font-heading text-sm font-medium text-slate-300 tracking-wide">About Wajahat</span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
                  Building the Foundation for <span className="text-brand-accent">Data-Driven Enterprises</span>
                </h2>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  Organizations do not become data-driven by implementing technology alone. They become data-driven when the right data, analytics, planning processes, and people come together to support better decisions.
                </p>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  I help organizations build that foundation.
                </p>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  From executive analytics and enterprise planning to cloud data platforms and AI-ready architectures, I work with business and technology leaders to transform data into a strategic asset.
                </p>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  My experience spans Retail, FMCG, Manufacturing, Telecommunications, Utilities, and Public Sector organizations, delivering solutions that improve visibility, accelerate decision-making, and create long-term business value.
                </p>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  By combining business understanding with deep expertise across the SAP Data & Analytics ecosystem, I help organizations move beyond reporting and toward intelligent, insight-driven decision-making.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <h3 className="font-heading font-bold text-xl sm:text-2xl mb-6">Featured Certifications</h3>
            <CertificationsSlider items={certificates} />
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate('/certifications')}
                className="px-5 sm:px-6 py-3 border border-brand-accent/30 text-brand-accent font-heading font-semibold text-sm rounded-full hover:bg-brand-accent/10 transition-all duration-300 flex items-center gap-2"
              >
                See All Certifications
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-24 bg-brand-surface/25 border-y border-brand-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal direction="left">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mb-10 sm:mb-12">
              Case Studies and <span className="text-brand-accent">Experience</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {caseStudyMeta.map((cs) => (
                <div key={cs.id} className="bg-brand-surface/60 border border-brand-accent/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-5 sm:mb-6">
                    {cs.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl mb-3">{cs.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-5 sm:mb-6">{cs.desc}</p>
                  <button
                    onClick={() => navigate(cs.path)}
                    className="inline-flex items-center gap-2 text-brand-accent font-heading font-semibold text-sm hover:underline"
                  >
                    View Case Study
                  </button>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="booking" className="relative py-8 sm:py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/contact-image.png" alt="" className="w-full h-full object-cover object-[center_70%]" />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(3,20,20,0.4) 0%, rgba(3,20,20,0.9) 75%)' }}></div>
        <div className="relative z-10">
        <Reveal direction="right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-16 items-center">
            <div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">
                Book an <span className="text-brand-accent">Appointment</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">
                Discuss enterprise integration, request speaking engagements, or setup a one-on-one consulting audit for your technology pipeline.
              </p>
              <div className="bg-brand-surface/60 border border-brand-accent/10 rounded-2xl p-5 sm:p-6 flex gap-4 items-center">
                <CheckCircle className="text-brand-accent w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base">Actionable Consulting</h4>
                  <p className="text-slate-400 text-xs mt-1">Get strategic planning, system audits, and implementation pathways directly from Wajahat.</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-surface/60 border border-brand-accent/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              {bookingStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="text-brand-accent w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 stroke-[1.5]" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-accent mb-2">Appointment Scheduled</h3>
                  <p className="text-slate-300 text-sm max-w-xs mx-auto">
                    Thank you, {formData.name}. Wajahat's team will reach out at {formData.email} to confirm your slot.
                  </p>
                  <button onClick={() => { setBookingStatus(null); setFormData({ name: '', email: '', service: 'Agentic AI Consulting', message: '' }); }}
                    className="mt-6 px-6 py-2 bg-brand-accent text-brand-dark rounded-full font-heading font-bold text-sm">
                    Book Another Meeting
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 sm:gap-5">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your name' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email' },
                  ].map(f => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label htmlFor={f.id} className="font-heading font-semibold text-sm text-slate-300">{f.label}</label>
                      <input type={f.type} id={f.id} required value={formData[f.id]}
                        onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                        placeholder={f.placeholder}
                        className="bg-brand-dark/50 border border-brand-accent/10 focus:border-brand-accent rounded-xl p-3.5 outline-none text-white text-sm transition-all" />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="font-heading font-semibold text-sm text-slate-300">Service Category</label>
                    <select id="service" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="bg-brand-dark/50 border border-brand-accent/10 focus:border-brand-accent rounded-xl p-3.5 outline-none text-white text-sm">
                      <option>Agentic AI Consulting</option>
                      <option>Digital Transformation Strategy</option>
                      <option>Workshop or Seminar Booking</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-heading font-semibold text-sm text-slate-300">Project Objective</label>
                    <textarea id="message" required rows="4" value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your requirements..."
                      className="bg-brand-dark/50 border border-brand-accent/10 focus:border-brand-accent rounded-xl p-3.5 outline-none text-white text-sm resize-none transition-all"></textarea>
                  </div>
                  <button type="submit" disabled={bookingStatus === 'loading'}
                    className="w-full py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300">
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
        </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}

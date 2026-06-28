import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ArrowUp, Clock } from 'lucide-react';
import './App.css';
import Home from './Home.jsx';
import CaseStudy1 from './CaseStudy1';
import CaseStudy2 from './CaseStudy2';
import CaseStudy3 from './CaseStudy3';
import Certifications from './Certifications';
import TrainingSAC from './TrainingSAC';
import Gallery from './Gallery';

function PlaceholderPage({ title, subtitle }) {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-body flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        <div className="w-20 h-20 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-6">
          <Clock className="text-brand-accent w-10 h-10" />
        </div>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
          <span className="text-brand-accent">{title}</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8">{subtitle}</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-brand-accent text-brand-dark flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-[0_0_20px_rgba(203,255,84,0.3)] ${show ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let mouseX = -100, mouseY = -100;
    const trail = [];
    const TRAIL_LENGTH = 4;

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('div');
      el.className = 'fixed top-0 left-0 w-[10px] h-[10px] bg-brand-accent rounded-full pointer-events-none z-[9998]';
      el.style.transform = 'translate(-100px, -100px)';
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.15s ease-out';
      document.body.appendChild(el);
      trail.push({ el, x: -100, y: -100 });
    }
    trailRef.current = trail;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
      }
    };

    const animate = () => {
      for (let i = trail.length - 1; i >= 0; i--) {
        const prev = i === 0 ? { x: mouseX, y: mouseY } : trail[i - 1];
        trail[i].x += (prev.x - trail[i].x) * 0.25;
        trail[i].y += (prev.y - trail[i].y) * 0.25;
        const dist = Math.hypot(trail[i].x - mouseX, trail[i].y - mouseY);
        const opacity = Math.max(0, 0.5 - i * 0.12) * Math.min(1, dist / 10);
        trail[i].el.style.transform = `translate(${trail[i].x - 5}px, ${trail[i].y - 5}px)`;
        trail[i].el.style.opacity = opacity;
      }
      raf = requestAnimationFrame(animate);
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', onMove);
    let raf = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      trailRef.current.forEach(t => t.el.remove());
      trailRef.current = [];
    };
  }, []);

  return (
    <div ref={dotRef} className="fixed top-0 left-0 w-[10px] h-[10px] bg-brand-accent rounded-full pointer-events-none z-[9999]" style={{ transform: 'translate(-100px, -100px)' }} />
  );
}

export default function App() {
  const [bookingStatus, setBookingStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', service: 'Agentic AI Consulting', message: ''
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('loading');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.service,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send email');
      }

      setBookingStatus('success');
    } catch (err) {
      alert('Failed to send. Please email contact@wajahatsiddique.com directly.');
      setBookingStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body">
      <Routes>
        <Route path="/" element={
          <Home
            bookingStatus={bookingStatus}
            setBookingStatus={setBookingStatus}
            formData={formData}
            setFormData={setFormData}
            handleBookingSubmit={handleBookingSubmit}
          />
        } />
        <Route path="/case-study/integrated-planning" element={<CaseStudy1 />} />
        <Route path="/case-study/executive-analytics" element={<CaseStudy2 />} />
        <Route path="/case-study/data-modernization" element={<CaseStudy3 />} />
        <Route path="/blogs" element={<PlaceholderPage title="Blogs" subtitle="Coming soon — insights on data, analytics & AI." />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/trainings/sac-bi-consultant" element={<TrainingSAC />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/trainings/sac-planning-bootcamp" element={<PlaceholderPage title="Coming Soon" subtitle="SAP Analytics Cloud (SAC) Planning Bootcamp — Details are on the way." />} />
        <Route path="/trainings/datasphere-bootcamp" element={<PlaceholderPage title="Coming Soon" subtitle="SAP DataSphere Bootcamp — Details are on the way." />} />
      </Routes>
      <ScrollToTop />
      <CustomCursor />
    </div>
  );
}

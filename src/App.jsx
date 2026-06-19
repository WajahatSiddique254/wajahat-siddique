import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';
import Home from './Home.jsx';
import CaseStudy1 from './CaseStudy1';
import CaseStudy2 from './CaseStudy2';
import CaseStudy3 from './CaseStudy3';

function PlaceholderPage({ title, subtitle }) {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-body flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
          <span className="text-brand-accent">{title}</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8">{subtitle}</p>
      </div>
    </div>
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
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'contact@wajahatsiddique.com',
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
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
            formData={formData}
            setFormData={setFormData}
            handleBookingSubmit={handleBookingSubmit}
          />
        } />
        <Route path="/case-study/integrated-planning" element={<CaseStudy1 />} />
        <Route path="/case-study/executive-analytics" element={<CaseStudy2 />} />
        <Route path="/case-study/data-modernization" element={<CaseStudy3 />} />
        <Route path="/blogs" element={<PlaceholderPage title="Blogs" subtitle="Coming soon — insights on data, analytics & AI." />} />
        <Route path="/certifications" element={<PlaceholderPage title="Certifications" subtitle="Full certification catalog coming soon." />} />
      </Routes>
    </div>
  );
}

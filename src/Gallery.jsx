import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import { caseStudyMeta } from './data/caseStudies.jsx';
import { trainingMeta } from './data/trainings.jsx';
import { galleryImages } from './data/gallery.jsx';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Gallery() {
  const navigate = useNavigate();
  const [modalImg, setModalImg] = useState(null);
  const [animState, setAnimState] = useState('');

  const openModal = useCallback((src) => {
    setModalImg(src);
  }, []);

  useEffect(() => {
    if (!modalImg) return;
    const frame = requestAnimationFrame(() => {
      setAnimState('open');
    });
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey);
    };
  }, [modalImg]);

  const closeModal = useCallback(() => {
    setAnimState('closing');
    setTimeout(() => {
      setModalImg(null);
      setAnimState('');
    }, 400);
  }, []);

  const headerCaseStudies = caseStudyMeta.map(cs => ({
    ...cs,
    onClick: () => navigate(cs.path)
  }));

  const headerTrainings = trainingMeta.map(tr => ({ ...tr, onClick: () => navigate(tr.path) }));

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body overflow-x-hidden">
      <Header caseStudies={headerCaseStudies} trainings={headerTrainings} />

      <section className="mt-16 sm:mt-20 pt-32 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] flex items-center">
        <img src="/images/gallery-cover.png" alt="" className="absolute inset-0 z-0 w-full h-full object-cover" />
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(3,20,20,0.7) 0%, rgba(6,36,35,0.85) 100%)' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4 sm:mb-6">
            Photo <span className="text-brand-accent">Gallery</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Moments and milestones from the journey.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={100}>
            <div className="gallery-wall">
              {galleryImages.map((src, i) => (
                <div key={i} className="gallery-item cursor-pointer" onClick={() => openModal(src)}>
                  <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {modalImg && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 modal-overlay ${animState}`}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/60 hover:text-brand-accent transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
          <img
            src={modalImg}
            alt="Gallery"
            className={`max-w-full max-h-full object-contain rounded-2xl modal-image ${animState}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

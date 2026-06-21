import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import { caseStudyMeta } from './data/caseStudies.jsx';
import { trainingMeta } from './data/trainings.jsx';
import { useNavigate } from 'react-router-dom';

const sapCerts = [
  { title: 'SAP S/4HANA Cloud Private Edition, Financial Accounting', issuer: 'SAP', img: '/images/certificate-01.png' },
  { title: 'Data Architect – SAP Business Data Cloud', issuer: 'SAP', img: '/images/certificate-02.png' },
  { title: 'Data Engineer – SAP BW/4HANA', issuer: 'SAP', img: '/images/certificate-03.png' },
  { title: 'Project Manager – SAP Activate', issuer: 'SAP', img: '/images/certificate-04.png' },
  { title: 'SAP S/4HANA Cloud Private Edition, Management Accounting', issuer: 'SAP', img: '/images/certificate-05.png' },
  { title: 'Data Analyst – SAP Analytics Cloud', issuer: 'SAP', img: '/images/certificate-06.png' },
  { title: 'SAP Business Data Cloud', issuer: 'SAP', img: '/images/certificate-07.png' },
];

const nlpHeroImages = [
  { title: 'Certified Practitioner of Neuro Linguistic Programming', issuer: 'The American Board of NLP (ABNLP), in partnership with AL&CO (Arslan Larik & Company)', img: '/images/NLP-Certificate-1.png' },
  { title: 'Certified NLP Coach', issuer: 'The American Board of NLP (ABNLP), Coaching Division, in partnership with AL&CO (Arslan Larik & Company)', img: '/images/NLP-Certificate-2.png' },
  { title: 'Certified Practitioner of Time Line Therapy', issuer: 'issued by Time Line Therapy Association (TLTA), in partnership with AL&CO (Arslan Larik & Company)', img: '/images/NLP-Certificate-3.png' },
];

export default function Certifications() {
  const navigate = useNavigate();

  const headerCaseStudies = caseStudyMeta.map(cs => ({
    ...cs,
    onClick: () => navigate(cs.path)
  }));

  const headerTrainings = trainingMeta.map(tr => ({ ...tr, onClick: () => { } }));

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body overflow-x-hidden">
      <Header caseStudies={headerCaseStudies} trainings={headerTrainings} />

      <section className="mt-16 sm:mt-20 pt-32 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] flex items-center">
        <img src="/images/certifications-cover.png" alt="" className="absolute inset-0 z-0 w-full h-full object-cover" />
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/80"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4 sm:mb-6 max-w-5xl mx-auto">
            <span className="text-brand-accent">Certifications</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            SAP &amp; AI certifications demonstrating expertise in enterprise data, analytics, and intelligent technologies.
          </p>
        </div>
      </section>

      <Reveal direction="left">
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-dark">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
              SAP <span className="text-brand-accent">Certifications</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-8 sm:mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sapCerts.map((cert, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div>
                    <div className="aspect-[4/3]">
                      <img src={cert.img} alt={cert.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-snug">{cert.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal direction="right">
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-surface/10 border-y border-brand-accent/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
              NLP <span className="text-brand-accent">Certifications</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-8 sm:mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {nlpHeroImages.map((cert, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div>
                    <div className="aspect-[4/3]">
                      <img src={cert.img} alt={cert.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-snug">{cert.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Footer />
    </div>
  );
}

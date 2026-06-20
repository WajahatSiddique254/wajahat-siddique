import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-accent/10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10 sm:gap-12 mb-10 sm:mb-12">
          <div>
            <h3 className="inline-flex items-center font-heading font-extrabold text-xl sm:text-2xl tracking-tight mb-4">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent font-bold text-[0.55rem] sm:text-xs flex-shrink-0">WS</span>
              <span className="ml-2.5">WAJAHAT SIDDIQUE<span className="bg-brand-accent inline-block" style={{ width: 7, height: 7, borderRadius: '1px', marginLeft: 2, verticalAlign: 'baseline' }}></span></span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Specialized consultation and enterprise strategy for data & analytics transformation using SAP technologies.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-surface border border-brand-accent/10 flex items-center justify-center hover:border-brand-accent transition-all">
                <i className="fa-brands fa-linkedin-in text-slate-400"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              <a href="/#about" className="hover:text-brand-accent transition-colors">About</a>
              <a href="/#services" className="hover:text-brand-accent transition-colors">Case Studies</a>
              <a href="/#booking" className="hover:text-brand-accent transition-colors">Book E-Meeting</a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              <a href="/#booking" className="hover:text-brand-accent transition-colors">Schedule a Meeting</a>
              <span>contact@wajahatsiddique.com</span>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-accent/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Wajahat Siddique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

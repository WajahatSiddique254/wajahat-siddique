import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronDown, X, Menu } from 'lucide-react';

export default function Header({ caseStudies, trainings }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCsOpen, setMobileCsOpen] = useState(false);
  const [mobileTrOpen, setMobileTrOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      setPrevScrollY(prev => {
        if (sy > 80 && sy > prev) setVisible(false);
        else setVisible(true);
        return sy;
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDropdown = (name) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  };

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const bgOpacity = Math.min(0.82 + scrollY / 400, 0.96);
  const headerBg = `rgba(3, 20, 20, ${bgOpacity})`;
  const headerBorder = scrollY > 50
    ? 'rgba(203, 255, 84, 0.1)'
    : 'transparent';
  const headerPy = scrollY > 50 ? '0.75rem' : '1.25rem';

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setMobileCsOpen(false);
    setMobileTrOpen(false);
    setActiveDropdown(null);
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
  };

  const handleHome = (e) => {
    e.preventDefault();
    closeAll();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (sectionId) => {
    closeAll();
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const sharedCs = caseStudies && caseStudies.length > 0;
  const sharedTr = trainings && trainings.length > 0;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        backgroundColor: headerBg,
        borderBottom: `1px solid ${headerBorder}`,
        paddingTop: headerPy,
        paddingBottom: headerPy,
      }}
    >
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="/" onClick={handleHome} className="inline-flex items-center font-heading font-extrabold text-xl sm:text-2xl tracking-tight whitespace-nowrap">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent font-bold text-[0.55rem] sm:text-xs flex-shrink-0">WS</span>
            <span className="ml-2.5">WAJAHAT SIDDIQUE<span className="bg-brand-accent inline-block" style={{ width: 7, height: 7, borderRadius: '1px', marginLeft: 2, verticalAlign: 'baseline' }}></span></span>
          </a>

          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            <Link to="/" onClick={closeAll} className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Home</Link>

            {sharedCs && (
              <button
                onMouseEnter={() => openDropdown('cs')}
                onMouseLeave={closeDropdown}
                onClick={() => setActiveDropdown(activeDropdown === 'cs' ? null : 'cs')}
                className="flex items-center gap-1 font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors"
              >
                Case Studies <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'cs' ? 'rotate-180' : ''}`} />
              </button>
            )}

            {sharedTr && (
              <button
                onMouseEnter={() => openDropdown('tr')}
                onMouseLeave={closeDropdown}
                onClick={() => setActiveDropdown(activeDropdown === 'tr' ? null : 'tr')}
                className="flex items-center gap-1 font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors"
              >
                Trainings <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'tr' ? 'rotate-180' : ''}`} />
              </button>
            )}

            <Link to="/blogs" onClick={closeAll} className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Blogs</Link>
            <Link to="/certifications" onClick={closeAll} className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Certifications</Link>
            <Link to="/gallery" onClick={closeAll} className="font-heading font-medium text-sm text-slate-300 hover:text-brand-accent transition-colors">Gallery</Link>

            <button
              onClick={(e) => { e.preventDefault(); closeAll(); handleNav('booking'); }}
              className="px-4 lg:px-5 py-2.5 bg-brand-accent text-brand-dark font-heading font-semibold text-sm rounded-full hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(203,255,84,0.3)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book Appointment
            </button>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-accent transition-colors" aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ── CASE STUDIES DROPDOWN ── */}
        {sharedCs && (
          <div
            onMouseEnter={() => openDropdown('cs')}
            onMouseLeave={closeDropdown}
            className={`absolute top-full left-0 w-full pt-4 transition-all duration-300 hidden md:block ${activeDropdown === 'cs' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
          >
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
              <div className="bg-brand-surface/95 backdrop-blur-xl border border-brand-accent/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
                  {caseStudies.map((cs, i) => (
                    <button
                      key={i}
                      onClick={() => { closeAll(); cs.onClick(); }}
                      className="flex-1 min-w-0 flex flex-row sm:flex-col items-center sm:items-start gap-3 p-4 sm:p-5 rounded-xl bg-brand-dark/60 border border-brand-accent/10 hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-300 text-left"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                        {cs.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-heading font-bold text-xs sm:text-sm text-white mb-0.5 sm:mb-1">{cs.title}</span>
                        <span className="block text-xs text-slate-400 leading-relaxed">{cs.desc}</span>
                      </div>
                    </button>
                  ))}
                  <div
                    className="hidden sm:flex w-[160px] lg:w-[200px] flex-shrink-0 rounded-xl p-4 lg:p-5 flex-col items-center justify-center text-center"
                    style={{ background: 'radial-gradient(circle at 50% 30%, rgba(11,74,72,0.6) 0%, rgba(3,20,20,0.95) 80%)' }}
                  >
                    <p className="font-heading text-xs lg:text-sm leading-relaxed text-white">
                      "Every case study here is proof that the right strategy turns into <span className="font-extrabold text-brand-accent">measurable impact</span>."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TRAININGS DROPDOWN ── */}
        {sharedTr && (
          <div
            onMouseEnter={() => openDropdown('tr')}
            onMouseLeave={closeDropdown}
            className={`absolute top-full left-0 w-full pt-4 transition-all duration-300 hidden md:block ${activeDropdown === 'tr' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
          >
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
              <div className="bg-brand-surface/95 backdrop-blur-xl border border-brand-accent/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
                  {trainings.map((tr, i) => (
                    <button
                      key={i}
                      onClick={() => { closeAll(); tr.onClick && tr.onClick(); }}
                      className="flex-1 min-w-0 flex flex-row sm:flex-col items-center sm:items-start gap-3 p-4 sm:p-5 rounded-xl bg-brand-dark/60 border border-brand-accent/10 hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-300 text-left"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                        {tr.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-heading font-bold text-xs sm:text-sm text-white mb-0.5 sm:mb-1">{tr.title}</span>
                        <span className="block text-xs text-slate-400 leading-relaxed">{tr.desc}</span>
                      </div>
                    </button>
                  ))}
                  <div
                    className="hidden sm:flex w-[160px] lg:w-[200px] flex-shrink-0 rounded-xl p-4 lg:p-5 flex-col items-center justify-center text-center"
                    style={{ background: 'radial-gradient(circle at 50% 30%, rgba(11,74,72,0.6) 0%, rgba(3,20,20,0.95) 80%)' }}
                  >
                    <p className="font-heading text-xs lg:text-sm leading-relaxed text-white">
                      "Equip your team with the skills to lead <span className="font-extrabold text-brand-accent">data-driven transformation</span>."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MOBILE MENU ── */}
      <div className={`md:hidden fixed top-[57px] left-0 w-full bg-brand-dark/97 backdrop-blur-lg border-b border-brand-accent/10 flex flex-col gap-5 p-6 transition-all duration-300 overflow-y-auto max-h-[calc(100vh-57px)] ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none -translate-y-4'}`}>
        <Link to="/" onClick={closeAll} className="font-heading text-base text-slate-300 hover:text-brand-accent">Home</Link>

        <div>
          <button
            onClick={() => setMobileCsOpen(!mobileCsOpen)}
            className="flex items-center gap-1 font-heading text-base text-slate-300 hover:text-brand-accent transition-colors w-full text-left"
          >
            Case Studies <ChevronDown size={14} className={`transition-transform duration-200 ${mobileCsOpen ? 'rotate-180' : ''}`} />
          </button>
          {sharedCs && mobileCsOpen && (
            <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-brand-accent/20">
              {caseStudies.map((cs, i) => (
                <button key={i} onClick={() => { closeAll(); cs.onClick(); }} className="block w-full text-left text-sm text-slate-400 hover:text-brand-accent py-1.5 transition-colors">
                  {cs.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setMobileTrOpen(!mobileTrOpen)}
            className="flex items-center gap-1 font-heading text-base text-slate-300 hover:text-brand-accent transition-colors w-full text-left"
          >
            Trainings <ChevronDown size={14} className={`transition-transform duration-200 ${mobileTrOpen ? 'rotate-180' : ''}`} />
          </button>
          {sharedTr && mobileTrOpen && (
            <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-brand-accent/20">
              {trainings.map((tr, i) => (
                <button key={i} onClick={() => { closeAll(); tr.onClick && tr.onClick(); }} className="block w-full text-left text-sm text-slate-400 hover:text-brand-accent py-1.5 transition-colors">
                  {tr.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link to="/blogs" onClick={closeAll} className="font-heading text-base text-left text-slate-300 hover:text-brand-accent">Blogs</Link>
        <Link to="/certifications" onClick={closeAll} className="font-heading text-base text-left text-slate-300 hover:text-brand-accent">Certifications</Link>
        <Link to="/gallery" onClick={closeAll} className="font-heading text-base text-left text-slate-300 hover:text-brand-accent">Gallery</Link>
        <button onClick={(e) => { handleNav('booking'); }} className="w-full text-center py-3 bg-brand-accent text-brand-dark font-heading font-semibold rounded-full text-sm">Book Appointment</button>
      </div>
    </header>
  );
}

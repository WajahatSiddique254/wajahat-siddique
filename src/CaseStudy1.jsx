import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BarChart3, TrendingUp, GitBranch, LayoutDashboard, Building2, Lightbulb, Cpu, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import { caseStudyMeta } from './data/caseStudies.jsx';
import { trainingMeta } from './data/trainings.jsx';

export default function CaseStudy1() {
  const navigate = useNavigate();

  const challenges = [
    'Manual spreadsheet-based budgeting processes',
    'Limited visibility into planning assumptions',
    'Disconnected planning across departments',
    'Time-consuming budget consolidation',
    'Lack of forecast accuracy and scenario analysis',
    'Difficulties in performance monitoring and variance analysis',
  ];

  const solutions = [
    {
      title: 'Enterprise Budgeting',
      desc: 'Implemented structured budgeting processes that enable organizations to plan and manage financial performance with greater accuracy and transparency.',
      icon: <BarChart3 className="text-brand-accent w-5 h-5" />,
    },
    {
      title: 'Forecasting & Scenario Planning',
      desc: 'Enabled rolling forecasts and scenario-based planning to support proactive business decision-making.',
      icon: <TrendingUp className="text-brand-accent w-5 h-5" />,
    },
    {
      title: 'Financial Planning',
      desc: 'Designed planning solutions supporting annual budgets, forecasts, and management review cycles.',
      icon: <LayoutDashboard className="text-brand-accent w-5 h-5" />,
    },
    {
      title: 'Integrated Business Planning',
      desc: 'Connected planning processes across Finance, Sales, and Operations to improve alignment and collaboration.',
      icon: <GitBranch className="text-brand-accent w-5 h-5" />,
    },
  ];

  const engagements = [
    {
      org: 'Leading FMCG Manufacturer',
      desc: 'Implemented SAP Analytics Cloud Planning to support integrated planning and budgeting processes across business functions while enabling future integration with SAP S/4HANA.',
    },
    {
      org: 'Leading Manufacturing Group',
      desc: 'Delivered enterprise financial planning capabilities replacing spreadsheet-driven budgeting processes and improving management visibility into performance.',
    },
    {
      org: 'Regional Telecommunications Operator',
      desc: 'Supported planning transformation initiatives involving budgeting, forecasting, and performance management capabilities.',
    },
  ];

  const contributions = [
    'Business Process Discovery', 'Planning Process Design', 'Requirement Workshops',
    'Planning Model Architecture', 'Solution Design', 'Stakeholder Management',
    'User Acceptance Testing', 'User Training & Adoption',
  ];

  const technologies = ['SAP Analytics Cloud Planning', 'SAP S/4HANA', 'SAP Datasphere'];

  const headerCaseStudies = caseStudyMeta.map(cs => ({
    ...cs,
    onClick: () => navigate(cs.path)
  }));

  const headerTrainings = trainingMeta.map(tr => ({ ...tr, onClick: () => {} }));

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body overflow-x-hidden">
      <Header caseStudies={headerCaseStudies} trainings={headerTrainings} />

      <section className="mt-16 sm:mt-20 pt-32 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/casestudy-cover-1.png" alt="" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(3,20,20,0.45) 0%, rgba(3,20,20,0.92) 75%)' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4 sm:mb-6 max-w-5xl mx-auto">
            Integrated Planning &amp; <span className="text-brand-accent">Performance Management</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Organizations increasingly require agile planning processes that can respond quickly to market changes,
            operational challenges, and evolving business priorities. I help organizations move from fragmented
            spreadsheet-based planning to integrated enterprise planning solutions.
          </p>
        </div>
      </section>



      <Reveal delay={100} direction="left">
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-brand-surface/10 border-y border-brand-accent/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
              Business <span className="text-brand-accent">Challenges Addressed</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-8 sm:mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {challenges.map((c, i) => (
                <div key={i} className="flex items-start gap-3 bg-brand-surface/50 border border-brand-accent/10 rounded-2xl p-4 sm:p-5 hover:border-brand-accent/25 transition-colors">
                  <CheckCircle className="text-brand-accent w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100} direction="right">
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-brand-dark">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
              Solutions <span className="text-brand-accent">Delivered</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-8 sm:mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {solutions.map((s, i) => (
                <div key={i} className="bg-brand-surface/60 border border-brand-accent/10 rounded-2xl p-5 sm:p-7 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>



      <Reveal delay={100} direction="left">
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-brand-dark">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
              Representative <span className="text-brand-accent">Engagements</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-8 sm:mb-10"></div>
            <div className="flex flex-col gap-0">
              {engagements.map((e, i) => (
                <div key={i} className="relative pl-12 sm:pl-14 pb-8 sm:pb-10 last:pb-0">
                  <div className="absolute left-0 top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                    <Building2 className="text-brand-accent w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="border-l border-brand-accent/20 absolute left-4 sm:left-5 top-10 sm:top-12 bottom-0 last:hidden"></div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-brand-accent mb-1">{e.org}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal direction="right">
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-brand-surface/10 border-t border-brand-accent/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="text-brand-accent w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="font-heading font-extrabold text-xl sm:text-3xl tracking-tight">
                  My <span className="text-brand-accent">Contributions</span>
                </h2>
              </div>
              <div className="w-16 h-1 bg-brand-accent rounded mb-6 sm:mb-8"></div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {contributions.map((c, i) => (
                  <span key={i} className="px-3 sm:px-4 py-2 bg-brand-surface/80 border border-brand-accent/15 rounded-full font-heading text-xs sm:text-sm text-slate-300 hover:border-brand-accent/40 hover:text-white transition-colors">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="text-brand-accent w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="font-heading font-extrabold text-xl sm:text-3xl tracking-tight">
                  <span className="text-brand-accent">Technologies</span>
                </h2>
              </div>
              <div className="w-16 h-1 bg-brand-accent rounded mb-6 sm:mb-8"></div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {technologies.map((t, i) => (
                  <span key={i} className="px-3 sm:px-4 py-2 bg-brand-accent/10 border border-brand-accent/30 rounded-full font-heading font-semibold text-xs sm:text-sm text-brand-accent">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-brand-dark border-t border-brand-accent/10 text-center">
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl mb-4">
            Ready to transform your <span className="text-brand-accent">planning process?</span>
          </h3>
          <p className="text-slate-400 text-sm mb-6 sm:mb-8 max-w-md mx-auto">
            Let's discuss how integrated planning can drive better outcomes for your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button onClick={() => navigate('/#booking')} className="px-6 py-3 bg-brand-accent text-brand-dark font-heading font-bold text-sm rounded-full hover:bg-brand-accent-hover transition-all duration-300 flex items-center gap-2">
              Book an E-Meeting <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </Reveal>

      <Footer />
    </div>
  );
}

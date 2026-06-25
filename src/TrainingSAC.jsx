import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, Monitor, BookOpen, Target, Lightbulb,
  BarChart3, Database, Layers, PieChart, TrendingUp, Users,
  ChevronDown, CheckCircle, GraduationCap, Briefcase,
  Rocket, Code, FileText, Sparkles, Wifi
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import { caseStudyMeta } from './data/caseStudies.jsx';
import { trainingMeta } from './data/trainings.jsx';

const modules = [
  {
    title: 'Module 1: Enterprise Analytics Fundamentals & Introduction to SAP Analytics Cloud',
    topics: [
      'The End Product', 'Why Analytics Matters', 'Journey of Data to Dashboard',
      'Analytics Personas & Stakeholders', 'Roles in an Analytics Project',
      'Modern Data & Analytics Landscape', 'Introduction to SAP',
      'SAP Analytics Ecosystem', 'The Role of an SAP Analytics Cloud Consultant',
      'Program Roadmap', 'Introduction to SAP Analytics Cloud',
      'SAC Architecture & Components', 'SAC Use Cases Across Industries',
      'Role of an SAP Analytics Consultant', 'Analytics Project Lifecycle',
      'SAC Navigation & Environment Overview',
    ],
    outcome: 'Develop a strong understanding of enterprise analytics and how SAP Analytics Cloud supports modern business decision-making.',
  },
  {
    title: 'Module 2: Data Modeling Fundamentals',
    topics: [
      'Understanding Dimensions & Measures', 'Data Modeling Concepts',
      'Model Types in SAC', 'Fact-Based Models', 'Time Dimensions',
      'Calculated Measures', 'Restricted Measures', 'Currency Conversion Concepts',
      'Modeling Best Practices',
    ],
    outcome: 'Learn how to design and build analytical models that support scalable and meaningful reporting.',
  },
  {
    title: 'Module 3: Data Integration & Connectivity',
    topics: [
      'Data Connectivity Concepts', 'Import vs Live Connections',
      'SAP S/4HANA Integration', 'SAP BW Integration',
      'SAP Datasphere Integration', 'Flat File & Excel Integration',
      'Data Refresh Strategies', 'Performance Considerations',
    ],
    outcome: 'Understand how SAC integrates with enterprise data sources and supports real-time and imported analytics scenarios.',
  },
  {
    title: 'Module 4: Dashboard & Story Development',
    topics: [
      'Story Design Fundamentals', 'Canvas vs Responsive Stories',
      'Visualization Selection Best Practices', 'Tables & Charts',
      'Interactive Filters', 'Input Controls', 'Linked Analysis',
      'Drill Down & Drill Through', 'Dashboard Design Principles',
      'User Experience Best Practices',
    ],
    outcome: 'Build professional dashboards that effectively communicate business performance and insights.',
  },
  {
    title: 'Module 5: Advanced Analytics & Intelligent Features',
    topics: [
      'Smart Discovery', 'Smart Insights', 'Search to Insight',
      'Data Analyzer', 'Geo Maps', 'Variance Analysis',
      'Trend Analysis', 'Exception Identification', 'Data Exploration Techniques',
    ],
    outcome: "Leverage SAC's advanced analytics capabilities to uncover trends, patterns, and actionable business insights.",
  },
  {
    title: 'Module 6: KPI Framework Design & Executive Reporting',
    topics: [
      'KPI Design Methodology', 'Understanding Business Requirements',
      'KPI Hierarchies', 'Executive Reporting Frameworks',
      'Dashboard Wireframing', 'Finance KPI Design', 'Sales KPI Design',
      'Procurement KPI Design', 'Supply Chain KPI Design',
      'Management Reporting Best Practices',
    ],
    outcome: 'Translate business requirements into actionable KPI frameworks and executive reporting solutions.',
  },
  {
    title: 'Module 7: Security, Governance & Analytics Consulting',
    topics: [
      'User Management', 'Roles & Authorizations', 'Teams',
      'Data Access Controls', 'Content Governance', 'Transport & Deployment Concepts',
      'Requirement Gathering Techniques', 'Stakeholder Interviews',
      'KPI Discovery Workshops', 'Functional Specification Documentation',
      'User Acceptance Testing (UAT)', 'End User Training',
      'Client Communication Best Practices',
    ],
    outcome: 'Develop both the technical and consulting skills required to succeed as an SAP Analytics professional.',
  },
  {
    title: 'Module 8: Capstone Project',
    topics: [
      'Business Requirement Analysis', 'KPI Definition',
      'Data Model Design', 'Dashboard Development',
      'Security Configuration', 'User Acceptance Testing',
      'Solution Presentation',
    ],
    outcome: 'Gain practical experience delivering an analytics solution similar to a real-world client implementation project.',
  },
];

const audiences = [
  {
    title: 'SAP Professionals',
    desc: 'Looking to upskill into analytics consulting and expand their expertise in SAP Analytics Cloud.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: 'Data & Analytics Professionals',
    desc: 'Who want to specialize in SAC and deliver enterprise-grade analytics solutions.',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: 'Students & Career Starters',
    desc: 'Aspiring to build a career in analytics with hands-on SAP tools and real-world consulting skills.',
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    title: 'Career Switchers',
    desc: 'Transitioning into analytics from non-technical roles with no prior SAC experience required.',
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

const programFeatures = [
  {
    title: 'Live Instructor-Led Training',
    desc: 'Learn from industry experts in real-time interactive sessions.',
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    title: 'Hands-On Learning',
    desc: 'Practice with SAC environments and real-world datasets.',
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: 'Industry Use Cases',
    desc: 'Work on scenarios from Finance, Sales, Supply Chain, and more.',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: 'Assignments & Practice',
    desc: 'Reinforce learning with structured exercises after each module.',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: 'Mentorship & Guidance',
    desc: 'Get personalized support and career advice throughout the program.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: 'Capstone Project',
    desc: 'Deliver an end-to-end SAC implementation as your final project.',
    icon: <Rocket className="w-6 h-6" />,
  },
];

function AccordionItem({ module, index, isOpen, onToggle }) {
  return (
    <div className="border border-brand-accent/10 rounded-2xl overflow-hidden bg-brand-surface/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left transition-colors hover:bg-brand-surface/50"
      >
        <span className="font-heading font-bold text-sm sm:text-base text-white pr-4">{module.title}</span>
        <ChevronDown
          size={18}
          className={`text-brand-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '1200px' : '0px' }}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <ul className="space-y-1.5 mb-4">
            {module.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/60 mt-1.5 flex-shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
          <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-xl p-3 sm:p-4">
            <span className="text-xs font-heading font-semibold text-brand-accent uppercase tracking-wider">Learning Outcome</span>
            <p className="text-slate-300 text-sm mt-1">{module.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrainingSAC() {
  const navigate = useNavigate();
  const [openModule, setOpenModule] = useState(null);

  const headerCaseStudies = caseStudyMeta.map(cs => ({
    ...cs,
    onClick: () => navigate(cs.path),
  }));

  const headerTrainings = trainingMeta.map(tr => ({
    ...tr,
    onClick: () => navigate(tr.path),
  }));

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body overflow-x-hidden">
      <Header caseStudies={headerCaseStudies} trainings={headerTrainings} />

      {/* ── HERO SECTION ── */}
      <section
        className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #031414 0%, #062423 40%, #0b4a48 80%, #063231 100%)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(203,255,84,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(11,74,72,0.3) 0%, transparent 50%)',
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-8">
          <Reveal>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight mb-4 text-center">
              SAP Analytics Cloud (SAC){' '}
              <span className="text-brand-accent">BI Bootcamp</span>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-heading font-semibold text-base sm:text-lg text-brand-accent/80 mb-4 text-center">
              Transform Data into Business Insights with SAP Analytics Cloud
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto space-y-4 mb-8 text-center">
              <p>
                Learn how to design, build, and deliver enterprise analytics solutions using SAP Analytics Cloud (SAC).
                This program is designed to prepare participants for real-world SAP Analytics consulting roles by combining
                technical expertise, business understanding, and implementation best practices.
              </p>
              <p>
                Unlike traditional software training, this bootcamp focuses on how analytics solutions are delivered in
                enterprise environments—from understanding business requirements and designing KPI frameworks to developing
                executive dashboards and presenting insights to stakeholders.
              </p>
              <p>
                Participants will gain hands-on experience with SAP Analytics Cloud and learn the practical skills required
                to contribute to analytics implementation projects across industries.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mt-6">
            <div className="lg:col-span-3 bg-brand-surface/40 border border-brand-accent/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <Reveal delay={200}>
                <h3 className="font-heading font-bold text-sm text-brand-accent uppercase tracking-wider mb-4 text-center sm:text-left">
                  Program Overview
                </h3>
              </Reveal>
              <Reveal delay={250}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-dark/50 border border-brand-accent/5">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-brand-accent w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="font-heading font-semibold text-sm">8 Weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-dark/50 border border-brand-accent/5">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Layers className="text-brand-accent w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Sessions / Week</p>
                      <p className="font-heading font-semibold text-sm">2 Live Sessions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-dark/50 border border-brand-accent/5">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-brand-accent w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Session Duration</p>
                      <p className="font-heading font-semibold text-sm">2 Hours Each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-dark/50 border border-brand-accent/5">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Monitor className="text-brand-accent w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Format</p>
                      <p className="font-heading font-semibold text-sm">Live Instructor-Led</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-dark/50 border border-brand-accent/5">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Wifi className="text-brand-accent w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Delivery Mode</p>
                      <p className="font-heading font-semibold text-sm">Online</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <Reveal delay={300}>
                <div
                  className="flex-1 rounded-2xl flex items-center justify-center p-6 sm:p-8 min-h-[200px]"
                  style={{
                    background: 'radial-gradient(circle at 50% 40%, rgba(11,74,72,0.5) 0%, rgba(3,20,20,0.95) 80%)',
                    border: '1px solid rgba(203,255,84,0.1)',
                  }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="text-brand-accent w-8 h-8" />
                    </div>
                    <p className="font-heading font-semibold text-lg">SAC BI Consultant</p>
                    <p className="text-slate-400 text-sm">Enterprise Analytics Bootcamp</p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU WILL LEARN ── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(180deg, #031414 0%, #062423 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2 text-center">
              What You Will <span className="text-brand-accent">Learn</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-6 mx-auto"></div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 text-center">
              By the end of this program, participants will be able to:
            </p>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-10">
              {[
                'Understand enterprise analytics and reporting concepts',
                'Design analytical data models in SAP Analytics Cloud',
                'Connect SAC with SAP and non-SAP data sources',
                'Build professional dashboards and reports',
                'Create meaningful KPI frameworks for business users',
                "Utilize SAC's intelligent analytics capabilities",
                'Implement security and governance best practices',
                'Conduct requirement gathering and analytics workshops',
                'Deliver end-to-end SAP Analytics Cloud reporting solutions',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-brand-surface/30 border border-brand-accent/8 rounded-xl p-3.5">
                  <CheckCircle className="text-brand-accent w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {modules.map((mod, i) => (
              <Reveal key={i} delay={i * 50}>
                <AccordionItem
                  module={mod}
                  index={i}
                  isOpen={openModule === i}
                  onToggle={() => setOpenModule(openModule === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS PROGRAM IS FOR ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2 text-center">
              Who This Program <span className="text-brand-accent">Is For</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-6 mx-auto"></div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-slate-400 text-sm mb-8 text-center">No prior SAP Analytics Cloud experience is required.</p>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {audiences.map((a, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="bg-brand-surface/40 border border-brand-accent/10 rounded-2xl p-5 sm:p-6 h-full hover:border-brand-accent/25 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
                      {a.icon}
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg mb-2">{a.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW THIS PROGRAM WORKS ── */}
      <Reveal>
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{
            background: 'linear-gradient(180deg, #062423 0%, #031414 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-2 text-center">
              How This Program <span className="text-brand-accent">Works</span>
            </h2>
            <div className="w-16 h-1 bg-brand-accent rounded mb-10 mx-auto"></div>
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {programFeatures.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="bg-brand-surface/30 border border-brand-accent/8 rounded-2xl p-5 sm:p-6 hover:border-brand-accent/20 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-3">
                      {f.icon}
                    </div>
                    <h3 className="font-heading font-bold text-base mb-1.5">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── PROGRAM OUTCOME ── */}
      <Reveal>
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-dark border-t border-brand-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-6">
              <Target className="text-brand-accent w-8 h-8" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-4">
              Program <span className="text-brand-accent">Outcome</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl mx-auto">
              By the end of the SAP Analytics Cloud BI Bootcamp, participants will possess the technical
              knowledge, business understanding, and consulting skills required to contribute confidently to SAP
              Analytics Cloud implementation projects and help organizations transform data into actionable business
              insights.
            </p>
            <button
              onClick={() => navigate('/#booking')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-dark font-heading font-bold text-sm rounded-full hover:bg-brand-accent-hover transition-all duration-300 hover:shadow-[0_0_25px_rgba(203,255,84,0.25)]"
            >
              Book an Appointment
            </button>
          </div>
        </section>
      </Reveal>

      <Footer />
    </div>
  );
}

import React from 'react';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

export const trainingMeta = [
  {
    id: 'tr1',
    icon: <GraduationCap className="text-brand-accent w-7 h-7" />,
    title: 'SAP Analytics Cloud – Planning & Reporting',
    desc: 'Master enterprise planning, budgeting, and reporting with hands-on SAC workshops tailored for finance professionals.',
  },
  {
    id: 'tr2',
    icon: <BookOpen className="text-brand-accent w-7 h-7" />,
    title: 'Data Architecture on SAP BDC & Datasphere',
    desc: 'Learn to design modern data models, integrate sources, and build scalable analytics foundations using SAP BDC.',
  },
  {
    id: 'tr3',
    icon: <Award className="text-brand-accent w-7 h-7" />,
    title: 'AI-Ready Enterprise – Strategy & Execution',
    desc: 'A practical program on preparing your organization\'s data, processes, and culture for AI adoption.',
  },
];

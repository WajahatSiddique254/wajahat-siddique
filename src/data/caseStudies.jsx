import React from 'react';
import { Network, Users, Presentation } from 'lucide-react';

export const caseStudyMeta = [
  {
    id: 'cs1',
    path: '/case-study/integrated-planning',
    icon: <Network className="text-brand-accent w-7 h-7" />,
    title: 'Integrated Planning & Performance Management',
    desc: 'From fragmented spreadsheets to connected enterprise planning across Finance, Sales & Operations.',
  },
  {
    id: 'cs2',
    path: '/case-study/executive-analytics',
    icon: <Users className="text-brand-accent w-7 h-7" />,
    title: 'Executive Analytics & Decision Intelligence',
    desc: 'Transforming transactional data into real-time executive dashboards and standardized KPI frameworks.',
  },
  {
    id: 'cs3',
    path: '/case-study/data-modernization',
    icon: <Presentation className="text-brand-accent w-7 h-7" />,
    title: 'Data Modernization & Cloud Analytics',
    desc: 'Migrating legacy reporting platforms to scalable cloud-native SAP analytics architectures.',
  },
];

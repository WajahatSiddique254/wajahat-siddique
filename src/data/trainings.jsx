import React from 'react';
import { BarChart3, Clock, Database } from 'lucide-react';

export const trainingMeta = [
  {
    id: 'tr1',
    icon: <BarChart3 className="text-brand-accent w-7 h-7" />,
    title: 'SAP Analytics Cloud (SAC) BI Bootcamp',
    desc: 'A hands-on bootcamp designed to turn beginners into industry-ready SAC BI professionals with real-world implementation skills.',
    path: '/trainings/sac-bi-consultant',
  },
  {
    id: 'tr2',
    icon: <Clock className="text-brand-accent w-7 h-7" />,
    title: 'SAP Analytics Cloud (SAC) Planning Bootcamp',
    desc: 'Coming soon',
    path: '/trainings/sac-planning-bootcamp',
  },
  {
    id: 'tr3',
    icon: <Database className="text-brand-accent w-7 h-7" />,
    title: 'SAP DataSphere Bootcamp',
    desc: 'Coming soon',
    path: '/trainings/datasphere-bootcamp',
  },
];

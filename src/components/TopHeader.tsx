import React from 'react';
import { ChevronRight, Layers, Sparkles } from 'lucide-react';
import { NavTab } from '../types/meridian';

interface TopHeaderProps {
  activeTab: NavTab;
  setActiveTab?: (tab: NavTab) => void;
}

const TAB_TITLES: Record<
  NavTab,
  { title: string; subtitle: string; category: string; screenNum: number }
> = {
  overview: {
    category: 'Ringkasan',
    title: 'Landing Page / Overview',
    subtitle: 'From Work Insights to People Outcomes',
    screenNum: 0,
  },
  deck: {
    category: 'Presentasi Eksekutif',
    title: 'Executive Presentation Deck',
    subtitle: 'Analisis Komparatif: 6 Gap Dokumen Klien vs. Solusi Nyata Project Meridian',
    screenNum: 0,
  },
  workforce: {
    category: 'Fondasi Populasi',
    title: 'Workforce Overview',
    subtitle: 'Komposisi 52.000 karyawan, 14 job families, dan populasi pilot 6.000 staf lapangan',
    screenNum: 1,
  },
  exposure: {
    category: 'Analisis Otomasi',
    title: 'AI Exposure Analysis',
    subtitle: 'Tingkat augmentasi dan otomasi tugas lapangan akibat Smart Meter (AMI) & IoT',
    screenNum: 2,
  },
  jobs: {
    category: 'Taksonomi Kerja',
    title: 'Job Architecture & Work Model',
    subtitle: 'Hierarki taksonomi pekerjaan dari Job Family (L1), Sub-Family (L2), hingga Roles & Tasks (L3)',
    screenNum: 3,
  },
  capabilities: {
    category: 'Standar Kompetensi',
    title: 'Capability Library',
    subtitle: 'Taksonomi standar 5 domain kapabilitas & 5-level proficiency ladder (SFIA/O*NET)',
    screenNum: 4,
  },
  people: {
    category: 'Direktori Karyawan',
    title: 'Employee Profile & Directory',
    subtitle: 'Direktori terpadu 6.000 staf, NIK resolver, skill radar, dan dokumen kontrak PKWT',
    screenNum: 5,
  },
  'future-roles': {
    category: 'Transisi Peran',
    title: 'Future Work & Roles',
    subtitle: 'Identifikasi pergeseran tugas dan peta peran masa depan energi terbarukan & smart grid',
    screenNum: 6,
  },
  redeployment: {
    category: 'Mobilitas Tenaga Kerja',
    title: 'Mobility Analysis & Redeployment Matrix',
    subtitle: 'Pencocokan 6.000 karyawan ke peran baru berdasarkan fit score & fisibilitas mobilitas',
    screenNum: 7,
  },
  learning: {
    category: 'Pengembangan Skill',
    title: 'Pathway & Learning Plan',
    subtitle: 'Kurikulum pelatihan terakreditasi 4-12 minggu dengan rincian biaya Rp 9,0 Juta/kapita',
    screenNum: 8,
  },
  decision: {
    category: 'Mesin Keputusan',
    title: 'Decision Engine Output',
    subtitle: 'Triage makro 6.000 karyawan ke dalam 5 jalur keputusan transisi berbasis Rule #1-#8',
    screenNum: 9,
  },
  impact: {
    category: 'Analisis Finansial',
    title: 'Overall Impact & Business Case',
    subtitle: 'Kalkulasi finansial ROI, biaya pesangon dihindari, dan penghematan bersih Rp 84,6 Miliar',
    screenNum: 10,
  },
  roadmap: {
    category: 'Implementasi',
    title: '90-Day Implementation Plan',
    subtitle: 'Panduan kerja 12 minggu mencakup dialog Serikat Pekerja (SP PLN) dan pilot regional',
    screenNum: 11,
  },
};

export const TopHeader: React.FC<TopHeaderProps> = ({ activeTab }) => {
  const current = TAB_TITLES[activeTab] || TAB_TITLES.workforce;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between shadow-2xs">
      {/* Clean Breadcrumb & Module Title */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="text-slate-400">Project Meridian</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-500">{current.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-blue-600 font-semibold">
            {current.screenNum > 0 ? `Modul #${current.screenNum}: ` : ''}
            {current.title}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <h1 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
            {current.title}
          </h1>
          <span className="hidden sm:inline-block h-3.5 w-px bg-slate-200"></span>
          <p className="hidden sm:inline-block text-xs text-slate-500 line-clamp-1">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Subtle indicator tag */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Pilot 6.000 Staf Aktif</span>
        </div>
      </div>
    </header>
  );
};

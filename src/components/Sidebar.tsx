import React from 'react';
import {
  Users,
  Cpu,
  Layers,
  Award,
  UserCheck,
  Compass,
  GitMerge,
  GraduationCap,
  BrainCircuit,
  TrendingUp,
  Presentation,
  FileText,
  Calendar,
  Scale,
} from 'lucide-react';
import { NavTab } from '../types/meridian';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenBriefing: () => void;
  onOpenRoadmap: () => void;
  onOpenLegal: () => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  screenNum: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'workforce', label: 'Workforce Overview', icon: Users, screenNum: 1 },
  { id: 'exposure', label: 'AI Exposure', icon: Cpu, screenNum: 2 },
  { id: 'jobs', label: 'Job Architecture', icon: Layers, screenNum: 3 },
  { id: 'capabilities', label: 'Capability Library', icon: Award, screenNum: 4 },
  { id: 'people', label: 'People & Directory', icon: UserCheck, screenNum: 5 },
  { id: 'future-roles', label: 'Future Roles', icon: Compass, screenNum: 6 },
  { id: 'redeployment', label: 'Redeployment Matrix', icon: GitMerge, screenNum: 7 },
  { id: 'learning', label: 'Learning & Pathways', icon: GraduationCap, screenNum: 8 },
  { id: 'decision', label: 'Decision Engine', icon: BrainCircuit, screenNum: 9 },
  { id: 'impact', label: 'Impact & ROI', icon: TrendingUp, screenNum: 10 },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBriefing,
  onOpenRoadmap,
  onOpenLegal,
}) => {
  return (
    <aside className="w-60 bg-white border-r border-slate-200/90 flex flex-col shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
          M
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 tracking-tight text-base leading-none">
            Meridian
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-1">
            Workforce Intelligence
          </span>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-thin">
        {/* Executive Deck Top Action */}
        <button
          onClick={() => setActiveTab('deck')}
          className={`w-full mb-2.5 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
            activeTab === 'deck'
              ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs ring-1 ring-amber-400'
              : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border-amber-200/90 hover:border-amber-300 hover:shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <Presentation className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">Executive Deck</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-amber-200 text-amber-950">
            SLIDES
          </span>
        </button>

        <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Platform Modules
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-slate-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isActive
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-slate-400'
                }`}
              >
                #{item.screenNum}
              </span>
            </button>
          );
        })}

        <div className="pt-3 pb-1 px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Strategic Resources
        </div>

        {/* Quick Context & Roadmap buttons */}
        <button
          onClick={onOpenBriefing}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
        >
          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">Briefing & Dokumen PRD</span>
        </button>

        <button
          onClick={onOpenRoadmap}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
        >
          <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="truncate">90-Day Implementation Plan</span>
        </button>

        <button
          onClick={onOpenLegal}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
        >
          <Scale className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="truncate">Regulasi Hukum (PP 35/2021)</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-1">
        <div className="text-[10px] text-slate-500 px-1 flex items-center justify-between">
          <span>Pilot Field Metering</span>
          <span className="font-semibold text-slate-700">6.000 Staf</span>
        </div>
      </div>
    </aside>
  );
};

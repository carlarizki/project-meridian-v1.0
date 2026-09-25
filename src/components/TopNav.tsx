import React from 'react';
import { CheckCircle2, FileSpreadsheet, ShieldAlert, Sparkles } from 'lucide-react';

interface TopNavProps {
  activeTab: 'overview' | 'roster' | 'economics' | 'pathways';
  setActiveTab: (tab: 'overview' | 'roster' | 'economics' | 'pathways') => void;
  onOpenQASuite: () => void;
  passedQACount: number;
  totalQACount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenQASuite,
  passedQACount,
  totalQACount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-base">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-white">
                Project Meridian
              </span>
              <span className="text-[11px] text-slate-400 -mt-0.5">
                Workforce Intelligence · Pilot Field Metering
              </span>
            </div>
          </div>

          {/* Zone 2: 4-6 clean text navigation links with subtle hover/active state */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1 rounded-lg border border-slate-800/80">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-sky-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Scope
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'roster'
                  ? 'bg-slate-800 text-sky-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Roster & Decision Engine
            </button>
            <button
              onClick={() => setActiveTab('economics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'economics'
                  ? 'bg-slate-800 text-sky-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Economics & Impact
            </button>
            <button
              onClick={() => setActiveTab('pathways')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'pathways'
                  ? 'bg-slate-800 text-sky-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Capability Clusters
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQASuite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 rounded-lg transition-colors whitespace-nowrap"
              title="Buka 12 Prototype Use Cases & Test Scenarios"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>QA Scenarios</span>
              <span className="font-mono text-[11px] bg-emerald-800/60 px-1.5 py-0.2 rounded text-emerald-200">
                {passedQACount}/{totalQACount}
              </span>
            </button>

            <a
              href="#export"
              onClick={(e) => {
                e.preventDefault();
                window.print();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
              <span>Cetak / PDF</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-800/80 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'overview' ? 'text-sky-400 font-semibold bg-slate-800' : 'text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'roster' ? 'text-sky-400 font-semibold bg-slate-800' : 'text-slate-400'
            }`}
          >
            Roster & Rules
          </button>
          <button
            onClick={() => setActiveTab('economics')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'economics' ? 'text-sky-400 font-semibold bg-slate-800' : 'text-slate-400'
            }`}
          >
            Economics
          </button>
          <button
            onClick={() => setActiveTab('pathways')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'pathways' ? 'text-sky-400 font-semibold bg-slate-800' : 'text-slate-400'
            }`}
          >
            Clusters
          </button>
        </div>
      </div>
    </header>
  );
};

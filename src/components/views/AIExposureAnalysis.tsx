import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  Clock,
  Radio,
  Layers,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';
import { PILOT_METRICS } from '../../data/meridianData';

interface AIExposureAnalysisProps {
  onNavigate: (tab: NavTab) => void;
}

export const AIExposureAnalysis: React.FC<AIExposureAnalysisProps> = ({ onNavigate }) => {
  const familyExposure = [
    { name: 'Operations', high: 68, med: 24, low: 8, isPilot: true },
    { name: 'Corporate Services', high: 52, med: 36, low: 12 },
    { name: 'Finance', high: 48, med: 40, low: 12 },
    { name: 'Human Capital', high: 40, med: 42, low: 18 },
    { name: 'Commercial', high: 32, med: 46, low: 22 },
    { name: 'Engineering', high: 20, med: 52, low: 28 },
    { name: 'IT & Digital', high: 20, med: 48, low: 32 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 3 Metric Cards matching Screen 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-rose-200 shadow-2xs">
          <div className="text-2xl font-extrabold text-rose-600 font-mono tracking-tight">
            13,000
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1">High Exposure (25%)</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Tasks predominantly routine & manual</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-2xs">
          <div className="text-2xl font-extrabold text-amber-600 font-mono tracking-tight">
            20,800
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1">Medium Exposure (40%)</div>
          <div className="text-[11px] text-slate-600 mt-0.5">AI augmented workflows & telemetry</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-2xs">
          <div className="text-2xl font-extrabold text-emerald-600 font-mono tracking-tight">
            18,200
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1">Low Exposure (35%)</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Physical field craft & strategic leadership</div>
        </div>
      </div>

      {/* Main Analysis Row matching Screen 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Exposure by Job Family (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">AI Exposure by Job Family</h2>
              <p className="text-xs text-slate-600">Breakdown of automation & augmentation risk</p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Medium
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low
              </span>
            </div>
          </div>

          <div className="space-y-3.5">
            {familyExposure.map((fam) => (
              <div key={fam.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800 flex items-center gap-2">
                    {fam.name}
                    {fam.isPilot && (
                      <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 rounded">
                        Critical Subfamily: Field Metering
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">
                    High: {fam.high}% · Med: {fam.med}% · Low: {fam.low}%
                  </span>
                </div>

                {/* Stacked bar */}
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100">
                  <div
                    className="bg-rose-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ width: `${fam.high}%` }}
                    title={`High Exposure: ${fam.high}%`}
                  >
                    {fam.high > 25 ? `${fam.high}%` : ''}
                  </div>
                  <div
                    className="bg-amber-400 h-full flex items-center justify-center text-[10px] text-slate-900 font-bold"
                    style={{ width: `${fam.med}%` }}
                    title={`Medium Exposure: ${fam.med}%`}
                  >
                    {fam.med > 25 ? `${fam.med}%` : ''}
                  </div>
                  <div
                    className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ width: `${fam.low}%` }}
                    title={`Low Exposure: ${fam.low}%`}
                  >
                    {fam.low > 15 ? `${fam.low}%` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Field Metering & Manual Operations Radial Gauge matching Screen 3 (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Pilot Family Focus
              </span>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                AMI / IoT Disruption
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              Field Metering & Manual Operations
            </h3>

            <div className="text-xs text-slate-600 flex items-center gap-1.5">
              <span>Population:</span>
              <strong className="text-slate-900 font-mono text-sm">
                {PILOT_METRICS.headcount.toLocaleString('en-US')}
              </strong>
              <span>Employees</span>
            </div>
          </div>

          {/* Big Circular Gauge (70%) */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FEE2E2" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#EF4444"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.7)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-rose-600 font-mono">70%</span>
                <span className="text-[10px] text-slate-600 text-center px-4 leading-tight font-medium">
                  Tasks automated in 18 months
                </span>
              </div>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>~4,200 roles affected</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Otomatisasi pengadaan Smart Meter AMI & AI vision meter reading menggantikan tugas pencatatan fisik secara masif.
            </p>

            <button
              onClick={() => onNavigate('redeployment')}
              className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Launch Pilot Redeployment Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

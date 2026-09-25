import React from 'react';
import {
  Users,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import { MACRO_SPLIT_DATA, PILOT_METRICS, RECEIVING_CLUSTERS } from '../data/meridianData';
import { DecisionCategory } from '../types/meridian';

interface OverviewViewProps {
  onSelectCategory: (category: DecisionCategory) => void;
  onNavigateTab: (tab: 'roster' | 'economics' | 'pathways') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectCategory,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Scope Banner & Pilot Context (Enforcing UC-01: 6.000 Headcount, 1 Job Family) */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
              <span>Ruang Lingkup Pilot Resmi BUMN</span>
              <span aria-hidden="true">·</span>
              <span>Keputusan Dewan Direksi & Kementerian</span>
              <span aria-hidden="true">·</span>
              <span>Sep 25, 2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Workforce Intelligence: Pilot Family Field Metering & Manual Operations
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Arsitektur penataan kapabilitas berbasis bukti untuk memitigasi disrupsi teknologi{' '}
              <strong className="text-white font-medium">Smart Meter (AMI/IoT)</strong> dan sistem dispatch digital.{' '}
              Menggantikan model restrukturisasi konvensional dengan sistem rekomendasi redeployment terarah tanpa PHK massal.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200 font-medium">Zero Mass Layoffs</span> (Pakta Integritas Serikat Pekerja)
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-400" />
                <span className="text-slate-200 font-medium">No System Migration</span> (Decision Layer di atas SAP/Moodle)
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200 font-medium">Window Disrupsi</span>: 18 Bulan Horizon
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('roster')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors shadow-sm"
            >
              <span>Buka Roster & Rules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('economics')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <span>Model Finansial (ROI)</span>
            </button>
          </div>
        </div>

        {/* 4 Scope KPI Cards (UC-01 strict check) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1">Populasi Headcount Pilot</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">
              {PILOT_METRICS.headcount.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Field Metering & Manual Ops
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1">Job Family Terdampak</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">
              {PILOT_METRICS.jobFamilyCount} Family
            </div>
            <div className="text-[11px] text-slate-400 mt-1 truncate" title={PILOT_METRICS.jobFamilyName}>
              {PILOT_METRICS.jobFamilyName}
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="text-xs text-amber-400 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Otomatisasi 18 Bulan</span>
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
              ~{PILOT_METRICS.automationExposure}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Penetrasi AMI Smart Meter
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1">Peran Kerja Tergeser</div>
            <div className="text-2xl font-bold text-sky-400 font-mono tabular-nums">
              ~{PILOT_METRICS.affectedCount.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Target Rekomendasi Redeployment
            </div>
          </div>
        </div>
      </section>

      {/* 5 Kategori Keputusan (Enforcing UC-02: 1.200 / 1.800 / 1.500 / 900 / 600, NO Surplus Review) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-white">
              5 Kategori Keputusan Redeployment (Populasi 6.000 vs Sampel 24)
            </h2>
            <p className="text-xs text-slate-400">
              Proyeksi alokasi populasi pilot (6.000 staf) dan representasi sampel 24 baris audit. Klik kartu untuk menyaring roster.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-md text-xs text-slate-300">
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Sampel: 24 catatan dummy (bukan populasi penuh)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MACRO_SPLIT_DATA.map((item) => (
            <button
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className="group text-left bg-slate-900 hover:bg-slate-800/80 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 group-hover:text-slate-200">
                  {item.category}
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-white font-mono tabular-nums">
                    {item.count.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-medium text-slate-400 font-mono">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mb-3">
                  Populasi Pilot
                </div>

                <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  Sampel UI:{' '}
                  <strong className="text-white font-mono tabular-nums">
                    {item.sampleCount} orang
                  </strong>{' '}
                  ({item.samplePercentage.toFixed(1)}%)
                </span>
                <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Disruption Context & 4 Target Capability Clusters */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The 4 Absorbing Destinations */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">
                4 Klaster Kapabilitas Penerima (Target Transisi 4.200 Pegawai)
              </h3>
              <p className="text-xs text-slate-400">
                Peta kedekatan kapabilitas fungsional (*capability adjacency*) agar tidak ada pegawai yang terabaikan.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('pathways')}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium"
            >
              Lihat Detail Silabus &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {RECEIVING_CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white">
                    {cluster.name}
                  </h4>
                  <span className="font-mono text-xs text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded">
                    ~{cluster.capacity.toLocaleString('id-ID')} staf
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cluster.adjacencyReason}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Durasi Reskilling:</span>
                  <span className="font-medium text-slate-200">{cluster.curriculumWeeks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Shadow-Cost Economic Summary Preview (UC-09 Preview) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <TrendingDown className="w-4 h-4" />
              <span>Justifikasi Finansial Dewan & Kementerian</span>
            </div>

            <h3 className="text-lg font-semibold text-white">
              Rekonsiliasi Nilai Ekonomis (Anti-PHK)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Membandingkan biaya kontra-faktual skenario Layoff-then-Rehire dengan model Capability Redeployment berbasis data proxy.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400">Biaya Layoff & Rehire</span>
                <span className="text-sm font-bold text-rose-400 font-mono tabular-nums">
                  Rp 108,6 M
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400">Biaya Capability Redeployment</span>
                <span className="text-sm font-bold text-sky-400 font-mono tabular-nums">
                  Rp 50,4 M
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                <div>
                  <div className="text-xs font-medium text-emerald-400">Penghematan Bersih</div>
                  <div className="text-[11px] text-emerald-400/80">Efisiensi Biaya Korporat</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-emerald-300 font-mono tabular-nums">
                    Rp 58,2 M
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 font-mono">
                    53,6% Hemat
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('economics')}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Buka Audit Model Finansial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import {
  TrendingDown,
  ShieldAlert,
  Coins,
  Building2,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  Sliders,
  DollarSign,
} from 'lucide-react';
import { ECONOMICS_DATA, PILOT_METRICS } from '../data/meridianData';

export const EconomicsView: React.FC = () => {
  // Interactive sensitivity multiplier (default 1.0)
  const [reskillCostMultiplier, setReskillCostMultiplier] = useState(1.0);

  const baselineLayoff = ECONOMICS_DATA.layoffRehireTotalM; // 108.6 M
  const adjustedRedeploy = Number((ECONOMICS_DATA.capabilityRedeploymentTotalM * reskillCostMultiplier).toFixed(1));
  const adjustedSavings = Number((baselineLayoff - adjustedRedeploy).toFixed(1));
  const adjustedSavingsPercent = Number(((adjustedSavings / baselineLayoff) * 100).toFixed(1));

  return (
    <div className="space-y-8 pb-12">
      {/* Top Context & Governance Anchor */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <TrendingDown className="w-4 h-4" />
          <span>Model Justifikasi Finansial Dewan Direksi & Kementerian BUMN</span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Rekonsiliasi Keekonomian Tenaga Kerja: Layoff vs. Capability Redeployment
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Kalkulasi komparatif untuk 4.200 pegawai terdampak otomatisasi pada pilot Field Metering & Manual Operations.{' '}
            Menggunakan <strong className="text-white font-medium">Standardized Grade Benchmark Pay (Proxy Modeling)</strong>{' '}
            karena database Oracle Payroll diblokir oleh kepatuhan tata kelola data Kementerian.
          </p>
        </div>

        {/* 3 Main Highlights (UC-09: 108,6 M vs 50,4 M = 53,6% Savings) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/80 p-5 rounded-xl border border-rose-900/40">
            <span className="text-xs text-rose-300/80 font-medium block mb-1">
              Biaya Layoff & Rehire (Kontra-faktual)
            </span>
            <div className="text-3xl font-bold text-rose-400 font-mono tabular-nums">
              Rp {baselineLayoff.toLocaleString('id-ID')} M
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Pesangon PP BUMN + Biaya Rekrutmen Eksternal 4.200 orang + Biaya Adaptasi
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-xl border border-sky-900/40">
            <span className="text-xs text-sky-300/80 font-medium block mb-1">
              Biaya Capability Redeployment (Meridian)
            </span>
            <div className="text-3xl font-bold text-sky-400 font-mono tabular-nums">
              Rp {adjustedRedeploy.toLocaleString('id-ID')} M
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Program Reskilling 8-16 Minggu + Fast-track Assessment Gate + Operasional
            </p>
          </div>

          <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-700/50">
            <span className="text-xs text-emerald-400 font-medium block mb-1">
              Penghematan Bersih (Cost Avoidance)
            </span>
            <div className="text-3xl font-bold text-emerald-300 font-mono tabular-nums">
              Rp {adjustedSavings.toLocaleString('id-ID')} M
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-emerald-400 font-mono">
                {adjustedSavingsPercent}% Penghematan
              </span>
              <span className="text-[11px] text-emerald-300/70">
                · Zero Industrial Dispute
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Detailed Breakdown Table */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Layoff & Rehire Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Skenario A: Layoff-then-Rehire (Terlarang & Tidak Efisien)
              </h2>
              <p className="text-xs text-slate-400">
                Estimasi beban jika BUMN memilih opsi PHK massal dan merekrut talenta baru.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
              Total: Rp 108,6 M
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {ECONOMICS_DATA.layoffBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-200">
                    {item.item}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Per Kapita: ~Rp {item.perCapitaJt.toFixed(1)} Jt / pegawai
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-rose-400 font-mono tabular-nums">
                    Rp {item.costM.toFixed(1)} M
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-300 space-y-1">
            <span className="font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Dampak Non-Finansial Negatif:</span>
            </span>
            <p className="text-rose-300/80 leading-relaxed">
              Risiko aksi mogok nasional dari Serikat Pekerja, sentimen negatif publik terhadap BUMN, dan hilangnya modal sosial/pengetahuan rute lapangan pelanggan.
            </p>
          </div>
        </div>

        {/* Right: Capability Redeployment Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Skenario B: Capability Redeployment (Project Meridian)
              </h2>
              <p className="text-xs text-slate-400">
                Investasi peningkatan kapabilitas internal ke 3 klaster pertumbuhan bisnis energi.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
              Total: Rp {adjustedRedeploy.toFixed(1)} M
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {ECONOMICS_DATA.redeploymentBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-200">
                    {item.item}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Per Kapita: ~Rp {(item.perCapitaJt * reskillCostMultiplier).toFixed(1)} Jt / pegawai
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-sky-400 font-mono tabular-nums">
                    Rp {(item.costM * reskillCostMultiplier).toFixed(1)} M
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300 space-y-1">
            <span className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Keunggulan Strategis BUMN:</span>
            </span>
            <p className="text-emerald-300/80 leading-relaxed">
              Mematuhi instruksi Kementerian tanpa PHK, mempertahankan loyalitas talenta lapangan, serta mengisi kekurangan 3.200+ teknisi Smart Grid & Solar secara instan.
            </p>
          </div>
        </div>
      </section>

      {/* Sensitivity & Proxy Methodology Note */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Simulasi Sensitivitas Anggaran Pelatihan Korporat</span>
            </h3>
            <p className="text-xs text-slate-400">
              Uji ketahanan margin penghematan bila biaya modul pelatihan naik atau turun.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Faktor Biaya:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setReskillCostMultiplier(0.9)}
                className={`px-2 py-1 rounded ${
                  reskillCostMultiplier === 0.9 ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
                }`}
              >
                -10% Efisien
              </button>
              <button
                onClick={() => setReskillCostMultiplier(1.0)}
                className={`px-2 py-1 rounded ${
                  reskillCostMultiplier === 1.0 ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
                }`}
              >
                1.0x Baseline
              </button>
              <button
                onClick={() => setReskillCostMultiplier(1.15)}
                className={`px-2 py-1 rounded ${
                  reskillCostMultiplier === 1.15 ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
                }`}
              >
                +15% Buffer
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-xs text-slate-400 pt-1">
          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Metodologi Tata Kelola Mandat BUMN:</strong>{' '}
            {ECONOMICS_DATA.governanceNote}{' '}
            Setiap komponen biaya telah diselaraskan dengan tabel grading jabatan Band 1 s/d Band 3 dan divalidasi oleh Tim Human Capital internal.
          </p>
        </div>
      </section>
    </div>
  );
};

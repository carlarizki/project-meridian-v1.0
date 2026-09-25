import React, { useState } from 'react';
import {
  Zap,
  Sun,
  Users,
  HeartHandshake,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { RECEIVING_CLUSTERS } from '../data/meridianData';

export const PathwaysView: React.FC = () => {
  const [selectedClusterId, setSelectedClusterId] = useState('smart-grid');

  const selectedCluster =
    RECEIVING_CLUSTERS.find((c) => c.id === selectedClusterId) || RECEIVING_CLUSTERS[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
          <Layers className="w-4 h-4" />
          <span>Arsitektur Transisi Kapabilitas (The 4 Receiving Clusters)</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Klaster Pertumbuhan Kapabilitas Energi Baru
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Mengalihkan tenaga kerja operasional meteran yang tergeser otomatisasi (~4.200 orang) ke 4 klaster bisnis masa depan.
          Memanfaatkan keunggulan geografis, penguasaan topografi jaringan, dan interaksi pelanggan eksisting.
        </p>
      </div>

      {/* Cluster Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {RECEIVING_CLUSTERS.map((cluster) => {
          const isSelected = cluster.id === selectedClusterId;
          return (
            <button
              key={cluster.id}
              onClick={() => setSelectedClusterId(cluster.id)}
              className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-500 shadow-md ring-1 ring-sky-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {cluster.id === 'smart-grid' ? (
                    <Zap className="w-5 h-5 text-sky-400" />
                  ) : cluster.id === 'solar-om' ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : cluster.id === 'customer-energy' ? (
                    <Users className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <HeartHandshake className="w-5 h-5 text-rose-400" />
                  )}
                  <span className="font-mono text-xs font-semibold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    ~{cluster.capacity} Staf
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white">
                  {cluster.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{cluster.curriculumWeeks}</span>
                <span className={`text-xs ${isSelected ? 'text-sky-400 font-semibold' : 'text-slate-500'}`}>
                  {isSelected ? 'Aktif' : 'Pilih'} &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Cluster Deep-Dive */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Spesifikasi Klaster Pilihan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {selectedCluster.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {selectedCluster.adjacencyReason}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 space-y-1 text-right">
            <span className="text-[11px] text-slate-400 block">Kapasitas Penyerapan</span>
            <div className="text-2xl font-bold text-sky-400 font-mono tabular-nums">
              ~{selectedCluster.capacity.toLocaleString('id-ID')} Orang
            </div>
            <span className="text-[11px] text-slate-400 block">
              Durasi: {selectedCluster.curriculumWeeks}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Future Roles */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Target Peran Baru Terakreditasi
            </h3>
            <div className="space-y-2">
              {selectedCluster.targetRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-medium text-white">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum & Key Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Silabus Pelatihan & Sertifikasi Lapangan
            </h3>
            <div className="space-y-2">
              {selectedCluster.keySkillsTrained.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800"
                >
                  <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Triad Model Protection Callout */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs">
          <Shield className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white font-medium">
              Proteksi Regulasi BUMN & Serikat Pekerja (Triad Model Architecture):
            </strong>
            <p className="text-slate-400 leading-relaxed">
              Karyawan yang bertransisi ke klaster ini mempertahankan Golongan Kepegawaian (Grade Band) dan hak pensiun legalnya secara penuh.
              Mutasi bersifat penugasan fungsional berbasis kapabilitas tanpa memerlukan revisi Perjanjian Kerja Bersama (PKB) massal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

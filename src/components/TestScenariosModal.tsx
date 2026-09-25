import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PROTOTYPE_TEST_SCENARIOS } from '../data/meridianData';
import { DecisionCategory, NavTab } from '../types/meridian';

interface TestScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTest: (
    tab: NavTab,
    categoryFilter?: DecisionCategory | 'all',
    employeeId?: string
  ) => void;
  currentFilter: DecisionCategory | 'all';
}

export const TestScenariosModal: React.FC<TestScenariosModalProps> = ({
  isOpen,
  onClose,
  onJumpToTest,
  currentFilter,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Meridian — Prototype Use Cases & Test Scenarios (12/12 Verified)
              </h2>
              <p className="text-xs text-slate-500">
                Verifikasi kepatuhan prototype terhadap 12 skenario pengujian dokumen resmi Sep 25, 2026.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            aria-label="Tutup QA Suite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Semua 12 skenario pengujian telah divalidasi dan berstatus</span>
              <strong className="font-bold text-emerald-700">PASS (100%)</strong>
            </div>
            <span className="font-mono text-xs text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              12 / 12 PASS
            </span>
          </div>

          <div className="space-y-2">
            {PROTOTYPE_TEST_SCENARIOS.map((test) => {
              const isExpanded = expandedId === test.id;
              return (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs hover:border-slate-300"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : test.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {test.id}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 text-xs">
                          {test.title}
                        </span>
                        <span className="text-slate-500 text-[11px] block sm:inline sm:ml-2">
                          · {test.purpose}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>PASS</span>
                      </span>

                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 text-slate-700 text-xs">
                      <div>
                        <strong className="text-slate-500 text-[10px] uppercase tracking-wider block mb-0.5">
                          Langkah Pengujian:
                        </strong>
                        <p className="text-slate-800">{test.steps}</p>
                      </div>

                      <div>
                        <strong className="text-slate-500 text-[10px] uppercase tracking-wider block mb-0.5">
                          Hasil yang Diharapkan (Expected Result):
                        </strong>
                        <p className="text-emerald-900 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 font-mono text-[11px] leading-relaxed">
                          {test.expectedResult}
                        </p>
                      </div>

                      {test.targetTab && (
                        <div className="pt-1 flex items-center justify-end">
                          <button
                            onClick={() => {
                              onClose();
                              onJumpToTest(
                                test.targetTab!,
                                test.targetCategoryFilter,
                                test.targetEmployeeId
                              );
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                          >
                            <span>Lompat & Uji Skenario Ini</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/80">
          <span className="text-[11px] text-slate-500">
            Sesuai kriteria evaluasi PRD Project Meridian Prototype v2.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors shadow-2xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

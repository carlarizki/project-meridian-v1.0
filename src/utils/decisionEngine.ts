import { DecisionCategory, EvidenceLevel, FeasibilityLevel, FitBucket } from '../types/meridian';

export interface DecisionResult {
  decision: DecisionCategory;
  ruleCode: string;
  ruleTitle: string;
  ruleExplanation: string;
  evidenceNote: string;
}

export function evaluateDecision(
  fit: number | null,
  feasibility: FeasibilityLevel,
  evidence: EvidenceLevel
): DecisionResult {
  // Bucket calculation: >= 75% High, >= 45% Medium, di bawah itu Low.
  let fitBucket: FitBucket = 'Insufficient Data';
  if (fit !== null && fit !== undefined) {
    if (fit >= 75) fitBucket = 'High';
    else if (fit >= 45) fitBucket = 'Medium';
    else fitBucket = 'Low';
  }

  // Rule #1: Evidence Low atau Unknown
  // Merepresentasikan 45% skill field kosong / data pre-2023. Preempts fit & feasibility.
  if (evidence === 'Low' || evidence === 'Unknown') {
    return {
      decision: 'Further Assessment',
      ruleCode: 'Rule #1',
      ruleTitle: 'Evidence Low atau Unknown',
      ruleExplanation:
        'Sinyal bukti kompetensi tidak mencukupi (45% skill data kosong atau skor performa pre-2023 uncalibrated). Wajib melalui fast-track assessment gate 14 hari sebelum rekomendasi definitif.',
      evidenceNote:
        evidence === 'Unknown'
          ? 'Data skill kosong di SAP/HRIS. Fit & kelayakan ditampilkan sebagai "data tidak cukup", tanpa skor buatan.'
          : 'Data performa tercatat sebelum 2023 tanpa verifikasi instrumen lapangan terbaru.',
    };
  }

  // Rule #2: fit >= 75% (High) DAN feasibility High
  if (fitBucket === 'High' && feasibility === 'High') {
    return {
      decision: 'Redeploy',
      ruleCode: 'Rule #2',
      ruleTitle: 'fit >= 75% (High) DAN feasibility High',
      ruleExplanation:
        'Kesesuaian kapabilitas tinggi (≥75%) didukung kelayakan fungsional tinggi. Direkomendasikan penempatan langsung ke target peran operasional baru dengan onboarding kilat 2-4 minggu.',
      evidenceNote:
        'Didukung bukti terukur (Measured Signals: riwayat log penugasan >12 bulan & sertifikasi teknis valid).',
    };
  }

  // Rule #3: fit Low (<45%) DAN feasibility Low (evidence bukan Low/Unknown)
  if (fitBucket === 'Low' && feasibility === 'Low') {
    return {
      decision: 'Voluntary Transition Review',
      ruleCode: 'Rule #3',
      ruleTitle: 'fit Low DAN feasibility Low',
      ruleExplanation:
        'Kesesuaian kapabilitas dan kelayakan fungsional berada di bucket rendah dengan evidence terverifikasi. Masuk ke program transisi sukarela bermartabat (VERS / Voluntary Early Retirement Scheme atau Facility Stewardship) tanpa PHK sepihak.',
      evidenceNote:
        'Evidence valid (bukan Low/Unknown), memastikan keputusan berbasis rekam jejak riil bukan ketiadaan data.',
    };
  }

  // Rule #4: (fit High + feasibility Medium) ATAU (fit Medium + feasibility High)
  if (
    (fitBucket === 'High' && feasibility === 'Medium') ||
    (fitBucket === 'Medium' && feasibility === 'High')
  ) {
    const specificDetail =
      fitBucket === 'High'
        ? 'High fit + Medium feasibility'
        : 'Medium fit + High feasibility';
    return {
      decision: 'Reskill -> Redeploy',
      ruleCode: 'Rule #4',
      ruleTitle: specificDetail,
      ruleExplanation: `Kombinasi ${specificDetail}. Karyawan memiliki fondasi kuat dan dapat dialokasikan ke peran target setelah mengikuti jalur reskilling akselerasi 8-12 minggu.`,
      evidenceNote:
        'Evidence teruji (Medium/High). Gap kapabilitas spesifik dapat dijembatani lewat modul praktikum terstandar.',
    };
  }

  // Rule #5: Default — kombinasi lain, evidence bukan Low/Unknown
  return {
    decision: 'Reskill',
    ruleCode: 'Rule #5',
    ruleTitle: 'Kombinasi Lain (Default)',
    ruleExplanation:
      'Kombinasi kapabilitas berada pada rentang menengah atau kelayakan bertahap. Direkomendasikan masuk program peningkatan kapabilitas komprehensif 12-24 minggu untuk membuka klaster fungsional baru.',
    evidenceNote:
      'Evidence terverifikasi cukup untuk memulai kurikulum pelatihan tanpa pre-assessment tambahan.',
  };
}

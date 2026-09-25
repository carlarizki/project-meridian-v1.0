import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { DecisionCategory, EmployeeRecord } from '../types/meridian';
import { MERIDIAN_EMPLOYEES } from '../data/meridianData';

interface RosterViewProps {
  categoryFilter: DecisionCategory | 'all';
  setCategoryFilter: (filter: DecisionCategory | 'all') => void;
  onSelectEmployee: (employee: EmployeeRecord) => void;
}

export const RosterView: React.FC<RosterViewProps> = ({
  categoryFilter,
  setCategoryFilter,
  onSelectEmployee,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'exposure' | 'fit'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter employees by category first
  const categoryFiltered = MERIDIAN_EMPLOYEES.filter((emp) => {
    if (categoryFilter === 'all') return true;
    return emp.officialDecision === categoryFilter;
  });

  // Filter by search query
  const searchFiltered = categoryFiltered.filter((emp) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      emp.id.toLowerCase().includes(q) ||
      emp.name.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      (emp.futureRoleTarget && emp.futureRoleTarget.toLowerCase().includes(q)) ||
      emp.regionalUnit.toLowerCase().includes(q)
    );
  });

  // Sort
  const sortedEmployees = [...searchFiltered].sort((a, b) => {
    if (sortField === 'id') {
      return sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    }
    if (sortField === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortField === 'exposure') {
      return sortDirection === 'asc' ? a.exposure - b.exposure : b.exposure - a.exposure;
    }
    if (sortField === 'fit') {
      const fitA = a.fit ?? -1;
      const fitB = b.fit ?? -1;
      return sortDirection === 'asc' ? fitA - fitB : fitB - fitA;
    }
    return 0;
  });

  const handleSort = (field: 'id' | 'name' | 'exposure' | 'fit') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Category counts
  const categoryCounts = {
    all: MERIDIAN_EMPLOYEES.length,
    Redeploy: MERIDIAN_EMPLOYEES.filter((e) => e.officialDecision === 'Redeploy').length,
    'Reskill -> Redeploy': MERIDIAN_EMPLOYEES.filter((e) => e.officialDecision === 'Reskill -> Redeploy').length,
    Reskill: MERIDIAN_EMPLOYEES.filter((e) => e.officialDecision === 'Reskill').length,
    'Further Assessment': MERIDIAN_EMPLOYEES.filter((e) => e.officialDecision === 'Further Assessment').length,
    'Voluntary Transition Review': MERIDIAN_EMPLOYEES.filter((e) => e.officialDecision === 'Voluntary Transition Review').length,
  };

  const getDecisionBadge = (decision: DecisionCategory) => {
    switch (decision) {
      case 'Redeploy':
        return (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            Redeploy
          </span>
        );
      case 'Reskill -> Redeploy':
        return (
          <span className="text-xs font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
            Reskill &rarr; Redeploy
          </span>
        );
      case 'Reskill':
        return (
          <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
            Reskill
          </span>
        );
      case 'Further Assessment':
        return (
          <span className="text-xs font-semibold text-violet-400 bg-violet-950/60 border border-violet-800/60 px-2 py-0.5 rounded">
            Further Assessment
          </span>
        );
      case 'Voluntary Transition Review':
        return (
          <span className="text-xs font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
            Voluntary Transition
          </span>
        );
    }
  };

  const getEvidenceIndicator = (level: string) => {
    switch (level) {
      case 'High':
        return (
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>High (Terverifikasi)</span>
          </span>
        );
      case 'Medium':
        return (
          <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Medium (Tercatat)</span>
          </span>
        );
      case 'Low':
        return (
          <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Low (Pre-2023)</span>
          </span>
        );
      case 'Unknown':
      default:
        return (
          <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>Unknown (Kosong)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Roster Lapangan & Decision Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit 24 catatan sampel dari pilot Field Metering & Manual Operations (6.000 headcount). Klik baris untuk membuka AHA Moment Engine.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Total Sampel:</span>
          <span className="font-mono text-white font-semibold tabular-nums">24 Pegawai</span>
          <span aria-hidden="true">·</span>
          <span>Scope Pilot:</span>
          <span className="font-mono text-sky-400 font-semibold tabular-nums">6.000 Staf</span>
        </div>
      </div>

      {/* Interactive Category Filter Tabs (Fulfilling UC-03 & UC-08) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto text-xs">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            categoryFilter === 'all'
              ? 'bg-slate-800 text-white font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Semua Kategori</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-slate-700/60 text-slate-300">
            {categoryCounts.all}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('Redeploy')}
          className={`px-3 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            categoryFilter === 'Redeploy'
              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Redeploy</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-emerald-900/50 text-emerald-300">
            {categoryCounts.Redeploy}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('Reskill -> Redeploy')}
          className={`px-3 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            categoryFilter === 'Reskill -> Redeploy'
              ? 'bg-sky-950/70 text-sky-300 border border-sky-800/80 font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Reskill &rarr; Redeploy</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-sky-900/50 text-sky-300">
            {categoryCounts['Reskill -> Redeploy']}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('Reskill')}
          className={`px-3 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            categoryFilter === 'Reskill'
              ? 'bg-amber-950/70 text-amber-300 border border-amber-800/80 font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Reskill</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-amber-900/50 text-amber-300">
            {categoryCounts.Reskill}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('Further Assessment')}
          className={`px-3 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            categoryFilter === 'Further Assessment'
              ? 'bg-violet-950/70 text-violet-300 border border-violet-800/80 font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Further Assessment</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-violet-900/50 text-violet-300">
            {categoryCounts['Further Assessment']}
          </span>
        </button>

        <button
          onClick={() => setCategoryFilter('Voluntary Transition Review')}
          className={`px-3 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            categoryFilter === 'Voluntary Transition Review'
              ? 'bg-rose-950/70 text-rose-300 border border-rose-800/80 font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Voluntary Transition</span>
          <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-rose-900/50 text-rose-300">
            {categoryCounts['Voluntary Transition Review']}
          </span>
        </button>
      </div>

      {/* Search and Quick Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari ID, nama, jabatan, peran target..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs text-slate-400">
          <div>
            Menampilkan{' '}
            <strong className="text-white font-mono tabular-nums">
              {sortedEmployees.length}
            </strong>{' '}
            dari 24 sampel
          </div>
          {categoryFilter !== 'all' && (
            <button
              onClick={() => setCategoryFilter('all')}
              className="text-sky-400 hover:text-sky-300 text-xs underline underline-offset-2"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* High-Density Data Grid / Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Nama Pegawai</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Jabatan Eksisting</th>
                <th
                  onClick={() => handleSort('exposure')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Exposure</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fit')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Fit Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Feasibility</th>
                <th className="py-3 px-4 font-semibold">Evidence Signal</th>
                <th className="py-3 px-4 font-semibold">Rekomendasi Decision</th>
                <th className="py-3 px-4 font-semibold">Future Role Target</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {sortedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    Tidak ada catatan yang cocok dengan filter atau kata kunci pencarian.
                  </td>
                </tr>
              ) : (
                sortedEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => onSelectEmployee(emp)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-sky-400 whitespace-nowrap">
                      {emp.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                      {emp.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {emp.role}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-400 text-right whitespace-nowrap tabular-nums">
                      {emp.exposure}%
                    </td>
                    <td className="py-3.5 px-4 font-mono text-right whitespace-nowrap tabular-nums">
                      {emp.fitRaw === '— (data kosong)' ? (
                        <span className="text-slate-500 italic">data kosong</span>
                      ) : emp.fitRaw.includes('pre-2023') ? (
                        <span className="text-amber-400/90">{emp.fitRaw}</span>
                      ) : (
                        <span className="text-white font-medium">{emp.fitRaw}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {emp.feasibility === '—' ? (
                        <span className="text-slate-600">—</span>
                      ) : (
                        emp.feasibility
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getEvidenceIndicator(emp.evidence)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getDecisionBadge(emp.officialDecision)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {emp.futureRoleTarget ? (
                        <span className="text-sky-300 font-medium">
                          {emp.futureRoleTarget}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Belum Ditugaskan</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center text-slate-400 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

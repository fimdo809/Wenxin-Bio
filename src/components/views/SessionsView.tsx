import React, { useState, useMemo } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  CalendarDays, 
  Search, 
  Clock, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Layers
} from 'lucide-react';

export const SessionsView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-03');
  const [selectedScreen, setSelectedScreen] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  const allSessions = WENXIN_DATA.opsSessions || [];
  const availableDates = Array.from(new Set(allSessions.map(s => s.date))).sort();
  const availableScreens = Array.from(new Set(allSessions.map(s => s.screen))).sort((a, b) => {
    const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
    const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
    return numA - numB;
  });

  const filtered = useMemo(() => {
    return allSessions.filter(s => {
      if (selectedDate !== 'all' && s.date !== selectedDate) return false;
      if (selectedScreen !== 'all' && s.screen !== selectedScreen) return false;
      if (selectedRating !== 'all' && !s.rating?.includes(selectedRating)) return false;
      if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [allSessions, selectedDate, selectedScreen, selectedRating, searchQuery]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-amber-400" />
            <span>場次查詢 (Sessions Query)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            全影城排片場次檢索 · 共 {allSessions.length} 場歷史與預售場次 · 支援即時篩選
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400">
          篩選結果: <strong className="text-amber-400">{filtered.length}</strong> 場
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] flex flex-wrap items-center gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="搜尋電影名稱..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-mono">日期:</span>
          <select
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-zinc-200 focus:outline-none"
          >
            <option value="all">全部日期</option>
            {availableDates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Screen */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-mono">影廳:</span>
          <select
            value={selectedScreen}
            onChange={(e) => { setSelectedScreen(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-zinc-200 focus:outline-none"
          >
            <option value="all">全部影廳</option>
            {availableScreens.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-mono">分級:</span>
          <select
            value={selectedRating}
            onChange={(e) => { setSelectedRating(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none"
          >
            <option value="all">全部分級</option>
            <option value="普">普遍級</option>
            <option value="護">保護級</option>
            <option value="輔12">輔12級</option>
            <option value="輔15">輔15級</option>
            <option value="限">限制級</option>
          </select>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="rounded-xl border border-zinc-800 bg-[#12141c] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase">
              <tr>
                <th className="py-3 px-4">放映時間</th>
                <th className="py-3 px-3">日期</th>
                <th className="py-3 px-3">影廳</th>
                <th className="py-3 px-4">電影名稱</th>
                <th className="py-3 px-3">版本</th>
                <th className="py-3 px-3">分級</th>
                <th className="py-3 px-3">備註</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {pageItems.length > 0 ? (
                pageItems.map((s) => (
                  <tr key={s.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-300 whitespace-nowrap">
                      {s.start} ~ {s.end}
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-400 whitespace-nowrap">
                      {s.date}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-zinc-200 whitespace-nowrap">
                      {s.screen}
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-100 max-w-xs truncate">
                      {s.title}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {s.version}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {s.rating || '普遍級'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-400 text-[11px] truncate max-w-xs">
                      {s.remark || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    查無符合條件之場次
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 bg-zinc-900/50 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div>
            第 {currentPage} 頁 / 共 {totalPages} 頁 (每頁 {pageSize} 筆)
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

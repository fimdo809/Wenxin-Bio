import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { TmsLoadChart } from '../TmsLoadChart';
import { ExcelUploader } from '../ExcelUploader';
import { 
  MonitorPlay, 
  CalendarDays, 
  Clock, 
  MapPin, 
  Star, 
  Gift, 
  Users, 
  ChevronRight, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-03');
  const [selectedHall, setSelectedHall] = useState<string>('all');
  const [showExcelUploader, setShowExcelUploader] = useState<boolean>(false);

  const allSessions = WENXIN_DATA.opsSessions || [];
  const allActivities = WENXIN_DATA.opsActivities || [];

  const availableDates = Array.from(new Set(allSessions.map(s => s.date))).sort();

  const filteredSessions = allSessions.filter(s => {
    if (s.date !== selectedDate) return false;
    if (selectedHall !== 'all' && s.screen !== selectedHall) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <MonitorPlay className="w-5 h-5 text-amber-400" />
            <span>主頁（儀表板）</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            文心秀泰營運即時監控 · 覆蓋 16 個影廳 · 今日場次與重要活動排程
          </p>
        </div>

        {/* Action Controls: Date Switcher & Excel Ingest Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExcelUploader(!showExcelUploader)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              showExcelUploader
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-emerald-500/60'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{showExcelUploader ? '收起 Excel 解析' : '上傳 Excel 檔案分析'}</span>
          </button>

          <span className="text-zinc-600">|</span>

          <span className="text-xs text-zinc-400 font-mono">日期:</span>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500"
          >
            {availableDates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Collapsible Excel Uploader Section */}
      {showExcelUploader && (
        <div className="animate-in fade-in duration-200">
          <ExcelUploader />
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141c]">
          <div className="text-[11px] text-zinc-400">當日排片場次</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
            {filteredSessions.length} 場
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">{selectedDate} 全影城</div>
        </div>

        <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141c]">
          <div className="text-[11px] text-zinc-400">進行中特典贈品</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
            {allActivities.filter(a => a.kind === 'gift').length} 檔
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">隨票贈活動供應中</div>
        </div>

        <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141c]">
          <div className="text-[11px] text-zinc-400">特別場 / Live Viewing</div>
          <div className="text-xl font-bold font-mono text-violet-400 mt-0.5">
            {allActivities.filter(a => a.kind === 'special').length} 場
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">含小圓生日場 / Vtuber</div>
        </div>

        <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141c]">
          <div className="text-[11px] text-zinc-400">企業包廳座談</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
            {allActivities.filter(a => a.kind === 'booking').length} 專場
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">瓏耀/大千/醫師夫人</div>
        </div>
      </div>

      {/* D3.js TMS DCP Load & Schedule Share Analytics Chart */}
      <TmsLoadChart selectedDate={selectedDate} />

      {/* Main Grid: Sessions & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Sessions (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>今日場次清單 ({selectedDate})</span>
            </h3>

            {/* Filter hall */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400 font-mono">影廳:</span>
              <select
                value={selectedHall}
                onChange={(e) => setSelectedHall(e.target.value)}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 font-mono focus:outline-none"
              >
                <option value="all">全部影廳</option>
                {Array.from({ length: 16 }, (_, i) => `${i + 1}廳`).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-xl border border-zinc-800 bg-[#12141c] hover:border-zinc-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {/* Time block */}
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-center shrink-0 w-24">
                      <div className="text-amber-300 font-bold text-sm">{session.start}</div>
                      <div className="text-[10px] text-zinc-400">至 {session.end}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-100 text-sm hover:text-amber-200 transition-colors">
                          {session.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {session.rating || '普遍級'}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {session.version}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-2">
                        <span className="font-mono text-zinc-300 font-semibold">{session.screen}</span>
                        {session.remark && (
                          <>
                            <span>·</span>
                            <span className="text-amber-300/90">{session.remark}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      自動化排程就位
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-zinc-400 border border-dashed border-zinc-800 rounded-xl text-xs">
                此日期或影廳條件下無排片資料
              </div>
            )}
          </div>
        </div>

        {/* Right: Activities Calendar (1 col) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-cyan-400" />
            <span>活動行事曆 (行事曆與特典)</span>
          </h3>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {allActivities.slice(0, 8).map((act) => {
              const isGift = act.kind === 'gift';
              const isSpecial = act.kind === 'special';
              const isBooking = act.kind === 'booking';

              return (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141c] hover:border-zinc-700 transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                      isGift
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : isSpecial
                        ? 'bg-violet-500/10 text-violet-300 border-violet-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {isGift ? '隨票贈特典' : isSpecial ? '特別場' : '包廳活動'}
                    </span>

                    <span className="text-[11px] font-mono text-zinc-400">
                      {act.start || '即日起'}
                    </span>
                  </div>

                  <div className="font-semibold text-zinc-200 line-clamp-1">
                    {act.title}
                  </div>

                  <div className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {act.description}
                  </div>

                  {act.reminder && (
                    <div className="text-[10px] text-amber-400/90 bg-amber-500/5 p-1.5 rounded border border-amber-500/20">
                      <strong>注意事項：</strong>{act.reminder}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

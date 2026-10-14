import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Gift,
  Star,
  Users,
  Film,
  Video,
  Tv,
  FileSpreadsheet,
  CalendarRange,
  CheckSquare,
  ShieldCheck,
  Thermometer,
  Lightbulb,
  Wrench,
  Package,
  Layers,
  Database,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export type ViewKey =
  | 'dashboard'
  | 'handover'
  | 'sessions'
  | 'gifts'
  | 'specials'
  | 'bookings'
  | 'movies'
  | 'trailers'
  | 'ads'
  | 'qacards'
  | 'plans'
  | 'qc'
  | 'rules'
  | 'env'
  | 'lamps'
  | 'repairs'
  | 'supplies'
  | 'halls'
  | 'backup';

interface SidebarProps {
  currentView: ViewKey;
  onSelectView: (view: ViewKey) => void;
  onOpenAnalysis: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, onOpenAnalysis }) => {
  return (
    <aside className="w-64 shrink-0 bg-[#0c0d13] border-r border-zinc-800/80 flex flex-col h-[calc(100vh-61px)] sticky top-[61px] select-none">
      {/* Projectionist Quick Banner */}
      <div className="p-3 border-b border-zinc-800/60">
        <button
          onClick={onOpenAnalysis}
          className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 hover:border-amber-500/60 text-left transition-all group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-amber-300">放映師設計改善分析</div>
              <div className="text-[10px] text-zinc-400">暗室色彩 · 流暢度 · 清晰度</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
            報告
          </span>
        </button>
      </div>

      {/* Navigation sections (Strictly matching original site categories 1~5) */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs scrollbar-thin scrollbar-thumb-zinc-800">
        {/* Category 1: 主頁 */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
            1. 主頁
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectView('dashboard')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>主頁（儀表板）</span>
            </button>
            <button
              onClick={() => onSelectView('handover')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'handover'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>早晚班交接</span>
            </button>
          </div>
        </div>

        {/* Category 2: 場次與活動 */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
            2. 場次與活動
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectView('sessions')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'sessions'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>場次查詢</span>
            </button>
            <button
              onClick={() => onSelectView('gifts')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'gifts'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>特典 (24項)</span>
            </button>
            <button
              onClick={() => onSelectView('specials')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'specials'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>特別場 (7場)</span>
            </button>
            <button
              onClick={() => onSelectView('bookings')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'bookings'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>包廳活動 (3場)</span>
            </button>
          </div>
        </div>

        {/* Category 3: 容量與編排 */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
            3. 容量與編排
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectView('movies')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'movies'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>正片清單 (59部)</span>
            </button>
            <button
              onClick={() => onSelectView('trailers')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'trailers'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>預告清單 (62支)</span>
            </button>
            <button
              onClick={() => onSelectView('ads')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'ads'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>廣告清單 (87支)</span>
            </button>
            <button
              onClick={() => onSelectView('qacards')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'qacards'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>包廳 / QA 字卡 (31張)</span>
            </button>
            <button
              onClick={() => onSelectView('plans')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'plans'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>每週廣預告</span>
            </button>
            <button
              onClick={() => onSelectView('qc')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'qc'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>放映品管表 (Cue)</span>
            </button>
            <button
              onClick={() => onSelectView('rules')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'rules'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>片商指定預告</span>
            </button>
          </div>
        </div>

        {/* Category 4: 資料登記 */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
            4. 資料登記
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectView('env')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'env'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>溫濕度登記 (7F/8F)</span>
            </button>
            <button
              onClick={() => onSelectView('lamps')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'lamps'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>燈泡時數</span>
            </button>
            <button
              onClick={() => onSelectView('repairs')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'repairs'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>維修紀錄</span>
            </button>
            <button
              onClick={() => onSelectView('supplies')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'supplies'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>備品統計</span>
            </button>
          </div>
        </div>

        {/* Category 5: 管理設定 */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
            5. 管理設定
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectView('halls')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'halls'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>影廳規格與容量 (16廳)</span>
            </button>
            <button
              onClick={() => onSelectView('backup')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
                currentView === 'backup'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>資料備份</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Footer station tag */}
      <div className="p-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>文心秀泰 TMS 在線</span>
        </span>
        <span className="text-zinc-400">16 Screens</span>
      </div>
    </aside>
  );
};

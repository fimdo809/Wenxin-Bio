import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Sun, 
  Moon, 
  Radio, 
  Activity, 
  Clock, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Wrench,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export type LightingMode = 'dark-cinema' | 'red-safety' | 'daylight';
export type AppTab = 'analysis' | 'cockpit' | 'dcp' | 'spl' | 'bookings' | 'qc' | 'handover';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  lightingMode: LightingMode;
  onLightingModeChange: (mode: LightingMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  lightingMode,
  onLightingModeChange
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [smpteFrame, setSmpteFrame] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-TW', { hour12: false });
      setCurrentTime(timeStr);
      // simulate 24fps frames (00 to 23)
      setSmpteFrame(Math.floor((now.getMilliseconds() / 1000) * 24));
    }, 41); // ~24fps tick
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#0c0d12]/95 backdrop-blur-md">
      {/* Top micro bar: Cinema status & optical safety toggle */}
      <div className="px-4 lg:px-8 py-1.5 border-b border-zinc-800/50 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="tracking-wide">文心秀泰放映機房 TMS 線上運作中</strong>
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-zinc-400">
            機房群：7F (1~8廳) · 8F (9~16廳) · 巨幕1廳 (4K Laser)
          </span>
        </div>

        {/* Lighting Mode Selector & Timecode */}
        <div className="flex items-center gap-4">
          {/* SMPTE Timecode */}
          <div className="flex items-center gap-1.5 bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-800 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-300 font-bold tracking-wider">
              {currentTime || '11:30:00'}:{smpteFrame < 10 ? `0${smpteFrame}` : smpteFrame}
            </span>
            <span className="text-[10px] text-amber-400/80 font-mono">24 FPS</span>
          </div>

          {/* Mode switch */}
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-[11px]">
            <button
              onClick={() => onLightingModeChange('dark-cinema')}
              title="DCI 暗室黑金模式 (預設抗光害)"
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                lightingMode === 'dark-cinema'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span className="hidden md:inline">暗室黑金</span>
            </button>
            <button
              onClick={() => onLightingModeChange('red-safety')}
              title="650nm 紅光夜巡模式 (防放映窗溢光至觀眾席)"
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                lightingMode === 'red-safety'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span className="hidden md:inline">650nm紅光</span>
            </button>
            <button
              onClick={() => onLightingModeChange('daylight')}
              title="白班日光高對比檢修模式"
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                lightingMode === 'daylight'
                  ? 'bg-zinc-700 text-zinc-100 font-semibold border border-zinc-600'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span className="hidden md:inline">日光檢修</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="px-4 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black shadow-md shadow-amber-500/10">
            <Film className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-zinc-100">
                文心秀泰 · 放映工程大師中樞
              </span>
              <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                PROJECTION OPS v2.8
              </span>
            </div>
            <div className="text-xs text-zinc-400">
              Showtime Cinemas Taichung Wenxin · Master Projection Console
            </div>
          </div>
        </div>

        {/* Primary nav buttons (Styled segmented buttons without pill clutter) */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => onTabChange('analysis')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'analysis'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>改善分析報告</span>
          </button>

          <button
            onClick={() => onTabChange('cockpit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'cockpit'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>16廳放映矩陣</span>
          </button>

          <button
            onClick={() => onTabChange('dcp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'dcp'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>正片與 KDM 庫 (59部)</span>
          </button>

          <button
            onClick={() => onTabChange('spl')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'spl'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>廣預告與 SPL 編排</span>
          </button>

          <button
            onClick={() => onTabChange('bookings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'bookings'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>包廳與特別場 (Live)</span>
          </button>

          <button
            onClick={() => onTabChange('qc')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'qc'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>放映品管工具箱 (QC)</span>
          </button>

          <button
            onClick={() => onTabChange('handover')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              currentTab === 'handover'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>交接日誌與溫濕度</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

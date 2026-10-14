import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Sun, 
  Moon, 
  Radio, 
  Clock, 
  Sparkles,
  Layers,
  Menu,
  ShieldCheck
} from 'lucide-react';

export type LightingMode = 'dark-cinema' | 'red-safety' | 'daylight';

interface HeaderBarProps {
  lightingMode: LightingMode;
  onLightingModeChange: (mode: LightingMode) => void;
  onOpenAnalysis: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  lightingMode,
  onLightingModeChange,
  onOpenAnalysis
}) => {
  const [timecodeStr, setTimecodeStr] = useState<string>('00:00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      const frame = Math.floor((now.getMilliseconds() / 1000) * 24).toString().padStart(2, '0');
      setTimecodeStr(`${h}:${m}:${s}:${frame}`);
    }, 41); // 24 FPS clock
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0b10] border-b border-zinc-800/80 px-4 lg:px-6 py-2.5 flex items-center justify-between select-none">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Film className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-zinc-100">
              文心秀泰｜放映管理系統
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 hidden sm:inline">
              Wenxin Showtime Operations
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            場次與活動查詢 · 容量表 · 廣預告編排 · 放映品管與資料登記
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* SMPTE 24fps Clock */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-200 font-bold tracking-wider">{timecodeStr}</span>
          <span className="text-[10px] text-amber-400/80">24FPS</span>
        </div>

        {/* Lighting Mode Selector */}
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-[11px]">
          <button
            onClick={() => onLightingModeChange('dark-cinema')}
            title="DCI 暗室黑金模式 (預設防放映窗漫射)"
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
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
            title="650nm 紅光夜巡模式 (防光線透過放映孔漏入影廳觀眾席)"
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
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
            title="白班高對比檢修模式"
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              lightingMode === 'daylight'
                ? 'bg-zinc-700 text-zinc-100 font-semibold border border-zinc-600'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sun className="w-3 h-3" />
            <span className="hidden md:inline">日光檢修</span>
          </button>
        </div>

        {/* View Analysis Button */}
        <button
          onClick={onOpenAnalysis}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold text-xs transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">放映師改善分析</span>
          <span className="sm:hidden">分析</span>
        </button>
      </div>
    </header>
  );
};

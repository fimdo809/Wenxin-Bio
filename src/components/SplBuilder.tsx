import React, { useState } from 'react';
import { Trailer, CommercialAd, Movie } from '../types/cinema';
import { 
  SlidersHorizontal, 
  Play, 
  Film, 
  Layers, 
  Clock, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Tv, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SplBuilderProps {
  trailers: Trailer[];
  ads: CommercialAd[];
  movies: Movie[];
}

interface SplElement {
  id: string;
  type: 'ad' | 'brand' | 'trailer' | 'qaCard' | 'feature';
  title: string;
  duration: number; // in seconds
  lens: 'F' | 'S';
  note?: string;
}

export const SplBuilder: React.FC<SplBuilderProps> = ({ trailers, ads, movies }) => {
  const [targetHall, setTargetHall] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0] || {} as Movie);
  
  // Initial default SPL rundown
  const [playlist, setPlaylist] = useState<SplElement[]>([
    {
      id: 'spl-ad-1',
      type: 'ad',
      title: '商業廣告群組 (台中商業聯播 8 支)',
      duration: 360, // 6 mins
      lens: 'F',
      note: '場內迎賓照明 70%'
    },
    {
      id: 'spl-brand-1',
      type: 'brand',
      title: '秀泰影城安全宣導與免責片頭 (SHOWTIME_SAFETY_2026)',
      duration: 65,
      lens: 'F',
      note: '場內燈光降至 30%'
    },
    {
      id: 'spl-trl-1',
      type: 'trailer',
      title: '指定預告：神木之島 TRL_F_51',
      duration: 120,
      lens: 'F',
      note: '燈光降至 0% 全暗，杜比環繞啟動'
    },
    {
      id: 'spl-trl-2',
      type: 'trailer',
      title: '指定預告：奧德賽 TRL_F_51',
      duration: 145,
      lens: 'F',
      note: '音壓提升至 6.8'
    },
    {
      id: 'spl-feature',
      type: 'feature',
      title: movies[0]?.title ? `正片：${movies[0].title}` : '正片：超人再起',
      duration: movies[0]?.duration || 5699,
      lens: (movies[0]?.lens as 'F' | 'S') || 'F',
      note: `正片開映 · 開燈 Cue 設定於 ${movies[0]?.lights || 5699} 秒`
    }
  ]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} 分 ${s < 10 ? `0${s}` : s} 秒`;
  };

  const totalPreShowSecs = playlist
    .filter(i => i.type !== 'feature')
    .reduce((acc, curr) => acc + curr.duration, 0);

  const totalTotalSecs = playlist.reduce((acc, curr) => acc + curr.duration, 0);

  // Check lens mismatch warning
  const featureElement = playlist.find(i => i.type === 'feature');
  const hasLensMismatch = featureElement && playlist.some(i => i.lens !== featureElement.lens);

  const addTrailer = (trl: Trailer) => {
    setPlaylist(prev => {
      // insert before feature
      const featIdx = prev.findIndex(i => i.type === 'feature');
      const newItem: SplElement = {
        id: `trl-${Date.now()}`,
        type: 'trailer',
        title: `預告：${trl.title}`,
        duration: trl.duration || 120,
        lens: trl.lens === 'S' ? 'S' : 'F',
        note: '片商指定排程預告'
      };
      if (featIdx !== -1) {
        const copy = [...prev];
        copy.splice(featIdx, 0, newItem);
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const removeElement = (id: string) => {
    setPlaylist(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-100">每週廣預告與播放清單編排器 (SPL Timeline Orchestrator)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Doremi / Barco TMS 相容
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            可視化 Show Play List 序列排程、廣告總時長校準、自動開燈開門 Cue 點注入
          </p>
        </div>

        {/* Hall select */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">目標影廳:</span>
          <select
            value={targetHall}
            onChange={(e) => setTargetHall(parseInt(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map(h => (
              <option key={h} value={h}>
                {h === 1 ? '巨幕1廳 (4K Laser)' : `${h} 廳`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main timeline builder & pool */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Timeline (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <span>{targetHall === 1 ? '巨幕1廳' : `${targetHall}廳`} SPL 播放清單時序</span>
                </h3>
                <div className="text-xs text-zinc-400 mt-0.5">
                  正片開演前墊檔時長：<strong className="text-amber-300 font-mono">{formatTime(totalPreShowSecs)}</strong> · 總計時間：<strong className="text-zinc-200 font-mono">{formatTime(totalTotalSecs)}</strong>
                </div>
              </div>

              {/* Lens alert if any */}
              {hasLensMismatch && (
                <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>注意：預告與正片比例不一致，需預留電動遮幅時間</span>
                </div>
              )}
            </div>

            {/* Timeline sequence list */}
            <div className="space-y-2.5">
              {playlist.map((item, index) => {
                const isFeature = item.type === 'feature';
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      isFeature
                        ? 'border-amber-500/50 bg-gradient-to-r from-amber-500/10 via-[#181a24] to-[#141620]'
                        : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {index + 1}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${isFeature ? 'text-amber-300' : 'text-zinc-200'}`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                            {item.lens === 'F' ? 'Flat 1.85:1' : 'Scope 2.39:1'}
                          </span>
                        </div>
                        {item.note && (
                          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-400/80" />
                            <span>{item.note}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                      <div className="font-mono text-xs text-right">
                        <div className="text-zinc-200 font-bold">{formatTime(item.duration)}</div>
                        <div className="text-[10px] text-zinc-400">{item.duration} 秒</div>
                      </div>

                      {!isFeature && (
                        <button
                          onClick={() => removeElement(item.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                          title="移出清單"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export button */}
            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
              <button
                onClick={() => {
                  alert(`已成功將 SPL 序列下發至 ${targetHall} 廳 Doremi TMS 伺服器！開燈自動化 CUE 點已就位。`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors shadow-sm"
              >
                生成 XML 播放表並同步至 TMS 伺服器
              </button>
            </div>
          </div>
        </div>

        {/* Available Trailers & Ads Pool */}
        <div className="space-y-6">
          {/* Trailers Pool */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono">
                現役預告片庫 (TRAILER VAULT)
              </h3>
              <span className="text-[10px] font-mono text-zinc-400">{trailers.length} 支可選</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {trailers.slice(0, 10).map((trl) => (
                <div
                  key={trl.id}
                  className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs hover:border-zinc-700"
                >
                  <div className="truncate mr-2">
                    <div className="font-semibold text-zinc-200 truncate">{trl.title}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      {trl.lens === 'F' ? 'Flat' : 'Scope'} · {formatTime(trl.duration || 120)}
                    </div>
                  </div>
                  <button
                    onClick={() => addTrailer(trl)}
                    className="p-1.5 rounded bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 transition-colors shrink-0"
                    title="加入 SPL 序列"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick automation cues reference */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 space-y-2.5 text-xs">
            <h3 className="font-bold text-zinc-200 font-mono text-xs uppercase tracking-wider">
              秀泰標準自動化 CUE 觸發規範
            </h3>
            <div className="space-y-1.5 text-zinc-400 text-[11px]">
              <div className="flex justify-between">
                <span>00:00 廣預告開始：</span>
                <span className="font-mono text-zinc-200">燈光 70% · 音量 5.0</span>
              </div>
              <div className="flex justify-between">
                <span>06:00 秀泰宣導片：</span>
                <span className="font-mono text-zinc-200">燈光 30% · 幕布開至定位</span>
              </div>
              <div className="flex justify-between">
                <span>07:05 正片第一格：</span>
                <span className="font-mono text-emerald-400">燈光全關 0% · Fader 鎖定 7.0</span>
              </div>
              <div className="flex justify-between">
                <span>片尾字幕 (Credits)：</span>
                <span className="font-mono text-amber-300">地燈 50% 微亮引導</span>
              </div>
              <div className="flex justify-between">
                <span>黑畫面走光 (Walkout)：</span>
                <span className="font-mono text-zinc-200">全廳主燈 100% 全開</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

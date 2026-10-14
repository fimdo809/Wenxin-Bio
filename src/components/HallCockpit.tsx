import React, { useState } from 'react';
import { Hall, Movie } from '../types/cinema';
import { 
  Play, 
  Pause, 
  Volume2, 
  Sliders, 
  Maximize2, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Film, 
  Sparkles,
  Zap,
  Info,
  X,
  VolumeX,
  ShieldAlert
} from 'lucide-react';

interface HallCockpitProps {
  halls: Hall[];
  movies: Movie[];
}

export const HallCockpit: React.FC<HallCockpitProps> = ({ halls, movies }) => {
  const [selectedFloor, setSelectedFloor] = useState<'all' | '7F' | '8F'>('all');
  const [selectedLens, setSelectedLens] = useState<'all' | 'F' | 'S'>('all');
  const [inspectingHall, setInspectingHall] = useState<Hall | null>(null);
  const [hallFaders, setHallFaders] = useState<Record<number, number>>({
    1: 7.2, // 巨幕 Atmos
    2: 6.5,
    3: 6.8,
    4: 6.5,
    5: 6.5,
    6: 6.5,
    7: 6.8,
    8: 6.5,
    9: 7.0, // 包廳
    10: 6.5,
    11: 6.5,
    12: 7.0, // Live
    13: 7.2, // 特典/Live
    14: 6.5,
    15: 6.5,
    16: 6.5
  });

  // Assign realistic active movies to halls
  const getHallMovie = (hallId: number): Movie => {
    if (hallId === 1) return movies[0] || { title: '超人再起 (巨幕4K版)', lens: 'F', duration: 5699, lights: 5699, sound: 'Atmos' } as Movie;
    if (hallId === 9) return movies.find(m => m.title === '超人再起') || movies[0];
    if (hallId === 2) return movies.find(m => m.title === '終戰那一天') || movies[1];
    if (hallId === 13) return movies.find(m => m.title.includes('小圓') || m.title.includes('偶像大師')) || movies[2];
    if (hallId === 12) return movies.find(m => m.title.includes('Kuzuha')) || movies[3];
    return movies[(hallId * 3) % movies.length] || movies[0];
  };

  // Convert seconds to HH:MM:SS
  const formatTimecode = (totalSeconds: number): string => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const filteredHalls = halls.filter(hall => {
    if (selectedFloor === '7F' && hall.id > 8) return false;
    if (selectedFloor === '8F' && hall.id <= 8) return false;
    if (selectedLens !== 'all' && hall.lens !== selectedLens && hall.lens !== 'Both') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Cockpit Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-100">16 影廳即時放映作戰矩陣 (TMS Live Cockpit)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              16 廳全伺服器在線
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            即時監控時長進度、開燈倒數、Dolby 混音 Fader、鏡頭遮幅 (Flat 1.85:1 / Scope 2.39:1)
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-zinc-500 font-mono text-[11px]">樓層機房:</span>
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSelectedFloor('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedFloor === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              全部 (16廳)
            </button>
            <button
              onClick={() => setSelectedFloor('7F')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedFloor === '7F' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              7F 機房 (1~8廳)
            </button>
            <button
              onClick={() => setSelectedFloor('8F')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedFloor === '8F' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              8F 機房 (9~16廳)
            </button>
          </div>

          <span className="text-zinc-500 font-mono text-[11px] ml-2">鏡頭遮幅:</span>
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSelectedLens('all')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedLens === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setSelectedLens('F')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedLens === 'F' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Flat (1.85:1)
            </button>
            <button
              onClick={() => setSelectedLens('S')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedLens === 'S' ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Scope (2.39:1)
            </button>
          </div>
        </div>
      </div>

      {/* 16 Halls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredHalls.map((hall) => {
          const movie = getHallMovie(hall.id);
          const fader = hallFaders[hall.id] || 6.5;
          const isAtmos = hall.soundSystem?.includes('Atmos') || hall.id === 1;
          const isGiantScreen = hall.id === 1;
          
          // Simulated progress for demonstration realism
          const elapsedSecs = Math.floor((movie.duration || 5400) * 0.68);
          const remainingSecs = Math.max(0, (movie.duration || 5400) - elapsedSecs);
          const lightsRemainSecs = Math.max(0, (movie.lights || movie.duration || 5400) - elapsedSecs);
          const progressPercent = Math.min(100, Math.floor((elapsedSecs / (movie.duration || 5400)) * 100));

          return (
            <div
              key={hall.id}
              onClick={() => setInspectingHall(hall)}
              className={`group relative rounded-xl border p-4 transition-all cursor-pointer hover:border-amber-500/60 hover:shadow-lg hover:shadow-black/50 ${
                isGiantScreen
                  ? 'border-amber-500/40 bg-gradient-to-br from-[#181512] to-[#10121a]'
                  : 'border-zinc-800 bg-[#12141c]'
              }`}
            >
              {/* Hall Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold font-mono tracking-tight text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {hall.name}
                    </span>
                    {isGiantScreen && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        旗艦4K雷射
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span>{hall.seats} 席</span>
                    <span>·</span>
                    <span className="font-mono text-zinc-400">{hall.id <= 8 ? '7F機房' : '8F機房'}</span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-semibold">放映中</span>
                </div>
              </div>

              {/* Movie info */}
              <div className="mt-3.5 space-y-1">
                <div className="text-xs text-zinc-400">現正放映:</div>
                <div className="text-sm font-semibold text-zinc-100 line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {movie.title}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 truncate">
                  {movie.file || 'DCP_FEATURE_RUN'}
                </div>
              </div>

              {/* Technical specs banner */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-[11px]">
                <div>
                  <div className="text-zinc-400 text-[10px]">遮幅鏡頭</div>
                  <div className="font-mono font-semibold text-zinc-200">
                    {movie.lens === 'F' ? 'Flat 1.85:1' : 'Scope 2.39:1'}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px]">聲道音效</div>
                  <div className={`font-mono font-semibold ${isAtmos ? 'text-cyan-400' : 'text-zinc-300'}`}>
                    {movie.sound || '5.1'}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px]">Dolby Fader</div>
                  <div className="font-mono font-bold text-amber-400">
                    {fader.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-zinc-400">
                    {formatTimecode(elapsedSecs)} / {formatTimecode(movie.duration || 5400)}
                  </span>
                  <span className="text-amber-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Lights up countdown */}
              <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>開燈倒數:</span>
                </span>
                <span className="font-mono font-bold text-amber-300">
                  -{formatTimecode(lightsRemainSecs)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hall Detailed Inspector Modal */}
      {inspectingHall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/30 bg-[#12141c] p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-mono text-zinc-100">
                    {inspectingHall.name} 放映工程作戰卡
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {inspectingHall.id <= 8 ? '7F 總控制室' : '8F 衛星分區'}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  座位配置：{inspectingHall.seats} 席 · 放映機：{inspectingHall.projectorType} · 音響架構：{inspectingHall.soundSystem}
                </div>
              </div>
              <button
                onClick={() => setInspectingHall(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hardware & Parameter Inspector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fader tuner */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>Dolby CP950 主音量推桿</span>
                  </span>
                  <span className="text-base font-mono font-bold text-amber-400">
                    {(hallFaders[inspectingHall.id] || 6.5).toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="9.0"
                  step="0.1"
                  value={hallFaders[inspectingHall.id] || 6.5}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setHallFaders(prev => ({ ...prev, [inspectingHall.id]: val }));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>4.0 (靜音預警)</span>
                  <span>7.0 (DCI 85dBC 參考)</span>
                  <span>9.0 (巨幕極限)</span>
                </div>
              </div>

              {/* Lens masking guard */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-violet-400" />
                    <span>電動遮幅布幕 (Masking)</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400">已就位</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button className="p-2 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-mono text-center">
                    Flat 1.85:1
                  </button>
                  <button className="p-2 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-mono text-center">
                    Scope 2.39:1
                  </button>
                </div>
                <div className="text-[11px] text-zinc-400">
                  注意：切換鏡頭時需預留 12 秒電動遮幅伺服馬達行程。
                </div>
              </div>
            </div>

            {/* Ingested DCP checklist */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-xs font-semibold text-zinc-300">本廳伺服器磁碟容量與金鑰 (Storage & KDM)</div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Doremi / Barco 本機磁碟容量：</span>
                <span className="font-mono text-zinc-200">{inspectingHall.capacity} {inspectingHall.unit} (使用率 64%)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>KDM 憑證序號：</span>
                <span className="font-mono text-amber-300">#KDM-WX-{inspectingHall.kdm}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setInspectingHall(null)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                關閉作戰卡
              </button>
              <button
                onClick={() => {
                  alert(`已向 ${inspectingHall.name} Doremi TMS 發送放映品質自動校準與開燈提示！`);
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-amber-500 text-zinc-950 font-semibold hover:bg-amber-400 transition-colors"
              >
                發送開燈 CUE 與品管確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

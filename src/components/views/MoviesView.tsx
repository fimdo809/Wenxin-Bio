import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  Film, 
  Search, 
  Clock, 
  Key, 
  HardDrive, 
  Volume2, 
  Maximize2,
  ChevronRight,
  Filter
} from 'lucide-react';

export const MoviesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLens, setSelectedLens] = useState<'all' | 'F' | 'S'>('all');
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  const movies = WENXIN_DATA.movies || [];

  const formatTC = (secs?: number | null) => {
    if (!secs) return '00:00:00';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(s)}`;
  };

  const filtered = movies.filter(m => {
    const match = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.file?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.distributor?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!match) return false;
    if (selectedLens !== 'all' && m.lens !== selectedLens) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            <span>正片清單 (Feature DCPs)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            現役 59 部 DCP 數位拷貝規格表 · 自動時間碼換算 · KDM 金鑰期限與各樓層 Fader 音量建議
          </p>
        </div>

        {/* Search & lens filter */}
        <div className="flex items-center gap-3 text-xs">
          <div className="relative w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="搜尋片名、檔名或片商..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSelectedLens('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
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
              Flat 1.85:1
            </button>
            <button
              onClick={() => setSelectedLens('S')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedLens === 'S' ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Scope 2.39:1
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Movies List (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((movie) => {
            const isSelected = selectedMovie?.id === movie.id;
            const durationTC = formatTC(movie.duration);
            const lightsTC = formatTC(movie.lights);
            const isFreeKdm = movie.kdmStart === '免' || movie.kdmEnd === '免';

            return (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-[#161822] shadow-lg shadow-black/40'
                    : 'border-zinc-800 bg-[#12141c] hover:border-zinc-700 hover:bg-[#141620]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-100 hover:text-amber-300 transition-colors">
                        {movie.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {movie.rating || '普0'}
                      </span>
                      {isFreeKdm ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          免KDM
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          KDM 授權中
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono text-zinc-400 truncate max-w-md">
                      {movie.file} · 片商: {movie.distributor}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                    <div className="text-right">
                      <div className="text-amber-300 font-bold">{durationTC}</div>
                      <div className="text-[10px] text-zinc-400">開燈: {lightsTC}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-200 font-semibold">
                        {movie.lens === 'F' ? 'Flat 1.85:1' : 'Scope 2.39:1'}
                      </div>
                      <div className="text-[10px] text-cyan-400">{movie.sound || '5.1'}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : ''}`} />
                  </div>
                </div>

                {/* Sub details */}
                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 font-mono">
                  <div>
                    載入影廳: {movie.halls?.length ? movie.halls.map((h: any) => `${h}廳`).join(', ') : '未載入'}
                  </div>
                  <div>
                    容量: {movie.size} GB · Fader: 7F[{movie.volumes?.['7F'] || '-'}] 8F[{movie.volumes?.['8F'] || '-'}]
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Inspection Details (1 col) */}
        <div>
          {selectedMovie ? (
            <div className="rounded-xl border border-amber-500/30 bg-[#12141c] p-5 space-y-4 sticky top-20">
              <div className="border-b border-zinc-800 pb-3">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  DCP SPECIFICATION SHEET
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mt-1">
                  {selectedMovie.title}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {selectedMovie.file}
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">正片片長</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatTC(selectedMovie.duration)} ({selectedMovie.duration}秒)
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">開燈 CUE 點</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatTC(selectedMovie.lights)} ({selectedMovie.lights}秒)
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">鏡頭比例</span>
                  <span className="font-mono font-bold text-zinc-200">
                    {selectedMovie.lens === 'F' ? 'Flat 1.85:1' : 'Scope 2.39:1'}
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">音訊格式</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {selectedMovie.sound || '5.1'}
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">發行片商</span>
                  <span className="text-zinc-200 font-medium">{selectedMovie.distributor}</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1.5 font-mono">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    <span>KDM 金鑰授權</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    起：{selectedMovie.kdmStart}<br />
                    迄：{selectedMovie.kdmEnd}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>各樓層 Fader 建議值</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">7F</div>
                      <div className="text-amber-400 font-bold">{selectedMovie.volumes?.['7F'] || '-'}</div>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">8F</div>
                      <div className="text-amber-400 font-bold">{selectedMovie.volumes?.['8F'] || '-'}</div>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">SX巨幕</div>
                      <div className="text-amber-400 font-bold">{selectedMovie.volumes?.['SX'] || '-'}</div>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">Atmos</div>
                      <div className="text-cyan-400 font-bold">{selectedMovie.volumes?.['AT'] || '-'}</div>
                    </div>
                  </div>
                </div>

                {selectedMovie.note && (
                  <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                    <strong>放映備註：</strong>{selectedMovie.note}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-[#12141c]/50 p-8 text-center text-zinc-500 text-xs">
              點擊左側任一部電影，查看完整規格與 Fader
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

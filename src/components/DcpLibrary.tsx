import React, { useState } from 'react';
import { Movie } from '../types/cinema';
import { 
  Search, 
  Film, 
  Clock, 
  Key, 
  HardDrive, 
  Volume2, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface DcpLibraryProps {
  movies: Movie[];
}

export const DcpLibrary: React.FC<DcpLibraryProps> = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLens, setSelectedLens] = useState<'all' | 'F' | 'S'>('all');
  const [selectedSound, setSelectedSound] = useState<'all' | '5.1' | '7.1' | 'Atmos'>('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const formatTimecode = (totalSeconds?: number | null): string => {
    if (!totalSeconds) return '00:00:00';
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const filteredMovies = movies.filter(m => {
    const matchQuery = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       m.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       m.distributor.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchQuery) return false;
    if (selectedLens !== 'all' && m.lens !== selectedLens) return false;
    if (selectedSound !== 'all' && m.sound !== selectedSound) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-100">正片 DCP 庫與 KDM 金鑰雷達 (Feature DCP Catalog)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              共 {movies.length} 部正片
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            DCI 數位封裝包規格、開燈時間碼、TMS 伺服器載入影廳、杜比分層 Fader 建議值
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="搜尋片名、檔名或片商..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 w-52"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSelectedLens('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedLens === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              全部鏡頭
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

          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSelectedSound('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedSound === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              全部音效
            </button>
            <button
              onClick={() => setSelectedSound('5.1')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedSound === '5.1' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              5.1
            </button>
            <button
              onClick={() => setSelectedSound('7.1')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedSound === '7.1' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              7.1
            </button>
            <button
              onClick={() => setSelectedSound('Atmos')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedSound === 'Atmos' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Atmos
            </button>
          </div>
        </div>
      </div>

      {/* Main List & Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table/Card list (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          {filteredMovies.map((movie) => {
            const isSelected = selectedMovie?.id === movie.id;
            const isKdmFree = movie.kdmStart === '免' || movie.kdmEnd === '免';
            const durationTC = formatTimecode(movie.duration);
            const lightsTC = formatTimecode(movie.lights);

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
                      {isKdmFree ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          免金鑰
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
                      <div className="text-zinc-200 font-semibold">{movie.lens === 'F' ? 'Flat 1.85:1' : 'Scope 2.39:1'}</div>
                      <div className="text-[10px] text-cyan-400">{movie.sound || '5.1'} 環繞</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : ''}`} />
                  </div>
                </div>

                {/* Sub row: Halls & Size */}
                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 font-mono">已部署伺服器:</span>
                    <span className="text-zinc-300 font-mono">
                      {movie.halls && movie.halls.length > 0
                        ? `${movie.halls.map(h => `${h}廳`).join(', ')} (共 ${movie.halls.length} 廳)`
                        : '未載入'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span>容量: {movie.size} GB</span>
                    <span>·</span>
                    <span className="text-zinc-300">
                      Fader: 7F[{movie.volumes?.['7F'] || '6.5'}] 8F[{movie.volumes?.['8F'] || '7.0'}]
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inspection panel on right */}
        <div className="space-y-6">
          {selectedMovie ? (
            <div className="rounded-xl border border-amber-500/30 bg-[#12141c] p-5 space-y-4 sticky top-20">
              <div className="border-b border-zinc-800 pb-3">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  DCP SPECIFICATION SHEET
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mt-1">
                  {selectedMovie.title}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {selectedMovie.file}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">標準放映時長</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatTimecode(selectedMovie.duration)} ({selectedMovie.duration} 秒)
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">片尾開燈 Cue 點</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatTimecode(selectedMovie.lights)} ({selectedMovie.lights} 秒)
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">鏡頭遮幅比例</span>
                  <span className="font-mono font-bold text-zinc-200">
                    {selectedMovie.lens === 'F' ? 'Flat 1.85:1 (1998×1080 / 3996×2160)' : 'Scope 2.39:1 (2048×858 / 4096×1716)'}
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">音頻格式編碼</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {selectedMovie.sound || '5.1'} LPCM 24-bit 48kHz
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">封裝包檔案大小</span>
                  <span className="font-mono font-bold text-zinc-200">
                    {selectedMovie.size} GB
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">發行片商</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedMovie.distributor}
                  </span>
                </div>

                {/* KDM section */}
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    <span>KDM 金鑰授權時效</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    起：{selectedMovie.kdmStart}<br />
                    迄：{selectedMovie.kdmEnd}
                  </div>
                </div>

                {/* Sound preset per floor */}
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>各樓層建議 Dolby Fader</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">7F</div>
                      <div className="text-amber-400 font-bold">{selectedMovie.volumes?.['7F'] || '6.5'}</div>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">8F</div>
                      <div className="text-amber-400 font-bold">{selectedMovie.volumes?.['8F'] || '7.0'}</div>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">SX巨幕</div>
                      <div className="text-amber-400 font-bold">{selectedMovie.volumes?.['SX'] || '7.2'}</div>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-800">
                      <div className="text-[10px] text-zinc-400">Atmos</div>
                      <div className="text-cyan-400 font-bold">{selectedMovie.volumes?.['AT'] || '7.0'}</div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedMovie.note && (
                  <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                    <strong>放映注意事項：</strong> {selectedMovie.note}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-[#12141c]/50 p-8 text-center text-zinc-500 space-y-3">
              <Film className="w-8 h-8 mx-auto text-zinc-600" />
              <div className="text-xs">請從左側點選任意電影，即可展開完整 DCI 技術規格與 Fader 數值</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

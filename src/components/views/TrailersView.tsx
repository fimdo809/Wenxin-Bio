import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { Video, Search, Clock, ShieldCheck, Film } from 'lucide-react';

export const TrailersView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const trailers = WENXIN_DATA.trailers || [];

  const formatSecs = (s?: number) => {
    if (!s) return '0秒';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}分${sec < 10 ? `0${sec}` : sec}秒`;
  };

  const filtered = trailers.filter(t => 
    t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.file?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.distributor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-400" />
            <span>預告清單 (Trailer Vault)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            現役 {trailers.length} 支電影預告片 · 鏡頭遮幅 (Flat / Scope) · 片商歸屬與分級規範
          </p>
        </div>

        <div className="relative w-60">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="搜尋預告片名或檔名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] hover:border-zinc-700 transition-colors space-y-2.5 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                {t.lens === 'F' ? 'Flat 1.85:1' : 'Scope 2.39:1'}
              </span>
              <span className="font-mono text-zinc-400">
                {formatSecs(t.duration)} ({t.duration}s)
              </span>
            </div>

            <div>
              <div className="font-bold text-zinc-100 line-clamp-1">{t.title}</div>
              <div className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">{t.file}</div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <span>片商：{t.distributor || '未指定'}</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                {t.rating || '普遍級'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

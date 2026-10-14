import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  Gift, 
  Search, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';

export const GiftsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allGifts = (WENXIN_DATA.opsActivities || []).filter(a => a.kind === 'gift');

  const filtered = allGifts.filter(g => {
    return g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           g.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
           g.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Gift className="w-5 h-5 text-cyan-400" />
            <span>特典隨票贈活動 (Gifts Management)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            文心秀泰現行隨票贈品清單 · 共 {allGifts.length} 檔特典 · 包含領取限制、庫存狀態與下片處置規範
          </p>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="搜尋特典或電影名稱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-[#12141c] p-4 flex flex-col justify-between space-y-3 hover:border-cyan-500/50 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  {item.stockStatus || '供應中'}
                </span>
                <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.start || '即日起'}</span>
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-100 line-clamp-2">
                  {item.title}
                </h3>
                <div className="text-xs text-cyan-300 font-medium mt-0.5">
                  電影：{item.movie}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
                {item.description}
              </div>

              {item.reminder && (
                <div className="p-2 rounded bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-300">
                  <strong>注意事項：</strong>{item.reminder}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <span>適用：{item.version || '任何版本'}</span>
              <span className="text-emerald-400 font-mono">核銷控管中</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { Tv, Search, Clock, FileSpreadsheet } from 'lucide-react';

export const AdsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const ads = WENXIN_DATA.ads || [];

  const filtered = ads.filter(a =>
    a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.file?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Tv className="w-5 h-5 text-cyan-400" />
            <span>商業廣告清單 (Commercial Ads)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            文心秀泰聯播廣告庫 · 共 {ads.length} 支商業託播影片 · 包含秒數、格式與音量
          </p>
        </div>

        <div className="relative w-60">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="搜尋廣告名稱或檔名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((ad) => (
          <div
            key={ad.id}
            className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141c] hover:border-zinc-700 transition-colors text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {ad.lens || 'Flat'}
              </span>
              <span className="font-mono text-amber-300 font-bold">
                {ad.duration} 秒
              </span>
            </div>

            <div className="font-semibold text-zinc-100 truncate">{ad.title}</div>
            <div className="text-[11px] font-mono text-zinc-400 truncate">{ad.file}</div>

            <div className="pt-2 border-t border-zinc-800/80 flex justify-between text-[10px] text-zinc-400">
              <span>音量：{ad.volume || '5.0'}</span>
              <span>版本：{ad.version || '一般'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const QaCardsView: React.FC = () => {
  const qaCards = WENXIN_DATA.qaCards || [];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-amber-400" />
          <span>包廳 / QA 字卡清單 (QA Cards)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          企業包廳與特別座談活動專用靜態字卡 · 共 {qaCards.length} 張 · 映前迎賓與映後 QA 專用
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qaCards.map((card) => (
          <div
            key={card.id}
            className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] hover:border-zinc-700 transition-colors space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                QA / 包廳片頭
              </span>
              <span className="font-mono text-zinc-400">時長: {card.duration}秒</span>
            </div>

            <div>
              <div className="font-bold text-zinc-100">{card.title}</div>
              <div className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">{card.file}</div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 flex justify-between">
              <span>ID: {card.id}</span>
              <span className="text-emerald-400 font-mono">Doremi 靜態字卡相容</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

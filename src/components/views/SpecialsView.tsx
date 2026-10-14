import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  Star, 
  Clock, 
  MapPin, 
  Radio, 
  Ticket, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SpecialsView: React.FC = () => {
  const specials = (WENXIN_DATA.opsActivities || []).filter(a => a.kind === 'special');

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Star className="w-5 h-5 text-violet-400" />
          <span>特別場與 Live Viewing 直播場 (Special Screenings)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          文心秀泰特別場活動 · 共 {specials.length} 場 · 含粉絲應援場、生日場及日本連線 Live Viewing 衛星直播
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {specials.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-violet-500/30 bg-gradient-to-br from-[#14121c] to-[#10121a] p-5 flex flex-col justify-between space-y-4 hover:border-violet-500/60 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold">
                  {item.version || '特別場'}
                </span>
                <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item.start} {item.end && item.end !== item.start ? `~ ${item.end}` : ''}</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-100 leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs text-violet-300 font-medium mt-1">
                  活動電影：{item.movie}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                {item.description}
              </div>

              {item.reminder && (
                <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                  <strong>備註：</strong>{item.reminder}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.stockStatus || '供應中'}</span>
              </span>
              <span>文心秀泰放映組</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

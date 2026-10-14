import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  CalendarRange, 
  CheckSquare, 
  ShieldCheck, 
  Filter, 
  Layers, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const PlansView: React.FC = () => {
  const [selectedHall, setSelectedHall] = useState<string>('all');
  const plans = WENXIN_DATA.plans || [];
  const weeks = WENXIN_DATA.weeks || [];

  const filtered = plans.filter(p => {
    if (selectedHall !== 'all' && p.hall.toString() !== selectedHall) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <CalendarRange className="w-5 h-5 text-amber-400" />
            <span>每週廣預告編排表 (Weekly Schedules)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            當週廣告、片頭與宣傳片序列 · 共 {plans.length} 筆編排 · 當期週期：{weeks[0]?.name || '本週'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400 font-mono">影廳:</span>
          <select
            value={selectedHall}
            onChange={(e) => setSelectedHall(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-zinc-200 focus:outline-none"
          >
            <option value="all">全部影廳</option>
            {Array.from({ length: 16 }, (_, i) => i + 1).map(h => (
              <option key={h} value={h.toString()}>{h === 1 ? '巨幕1廳' : `${h}廳`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0, 30).map((plan) => (
          <div
            key={plan.id}
            className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-300">
                {plan.hall === 1 ? '巨幕1廳' : `${plan.hall}廳`}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {plan.version || '一般'}
              </span>
            </div>

            <div>
              <div className="font-bold text-zinc-100 line-clamp-1">{plan.title}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">{plan.rawTitle}</div>
            </div>

            <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 space-y-1 font-mono text-[11px] text-zinc-400">
              <div className="flex justify-between">
                <span>商業廣告數量:</span>
                <span className="text-zinc-200">{plan.ads?.length || 0} 支</span>
              </div>
              <div className="flex justify-between">
                <span>宣導片/逃生圖:</span>
                <span className="text-zinc-200">{plan.identity?.length || 0} 支</span>
              </div>
              <div className="flex justify-between">
                <span>可售/已排場次:</span>
                <span className="text-amber-400 font-bold">{plan.sessions || 0} 場</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const QcView: React.FC = () => {
  const cueLists = WENXIN_DATA.cueLists || [];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
          <span>放映品管表與 CUE 清單 (QC & Cue Lists)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          各影廳 ADV / MOV 放映序列查核表 · 檔案順序、時序驗證與品質比對
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cueLists.map((cue) => (
          <div
            key={cue.id}
            className="p-5 rounded-xl border border-zinc-800 bg-[#12141c] space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100">{cue.name}</h3>
                <div className="text-[11px] text-zinc-400 mt-0.5">影廳：{cue.hall}廳 · 類別：{cue.kind}</div>
              </div>
              {cue.verified ? (
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  已品管核可
                </span>
              ) : (
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  待確認
                </span>
              )}
            </div>

            {cue.note && (
              <div className="text-zinc-400 bg-zinc-900/60 p-2.5 rounded border border-zinc-800 text-[11px]">
                <strong>說明：</strong>{cue.note}
              </div>
            )}

            <div className="space-y-1.5">
              <div className="text-zinc-300 font-semibold font-mono text-[11px]">
                CUE 檔案序列 ({cue.files?.length || 0} 個項目):
              </div>
              <div className="bg-zinc-900/90 rounded-lg p-3 font-mono text-[11px] space-y-1 max-h-48 overflow-y-auto border border-zinc-800 text-zinc-400">
                {cue.files?.map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-zinc-400">{i + 1}.</span>
                    <span className="text-zinc-200">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RulesView: React.FC = () => {
  const rules = WENXIN_DATA.rules || [];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>片商指定預告 (Mandated Trailer Rules)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          片商合約強制掛載之特定預告片規則 · 正片與指定預告綁定關係
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                指定順位 #{rule.order}
              </span>
              <span className="text-zinc-400 font-mono text-[11px]">
                {rule.start} ~ {rule.end}
              </span>
            </div>

            <div className="space-y-1 font-mono">
              <div className="text-zinc-400">目標正片 ID: <strong className="text-zinc-100">{rule.movieId}</strong></div>
              <div className="text-zinc-400">指定預告 ID: <strong className="text-amber-300">{rule.trailerId}</strong></div>
            </div>

            {rule.note && (
              <div className="text-[11px] text-zinc-400 p-2 rounded bg-zinc-900 border border-zinc-800">
                {rule.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

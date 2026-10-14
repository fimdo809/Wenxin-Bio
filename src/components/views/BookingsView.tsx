import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  Users, 
  Clock, 
  MapPin, 
  Mic, 
  Coffee, 
  CheckCircle2, 
  Tv, 
  Ticket,
  Sparkles
} from 'lucide-react';

export const BookingsView: React.FC = () => {
  const bookings = (WENXIN_DATA.opsActivities || []).filter(a => a.kind === 'booking');
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({
    'booking-1-mic': true,
    'booking-1-ad': true,
    'booking-2-qa': true,
    'booking-2-light': true,
    'booking-3-mic': true,
    'booking-3-catering': true
  });

  const toggle = (key: string) => {
    setCheckedMap(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          <span>包廳活動專用作業台 (Private Corporate Screenings)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          企業包廳、社團包場及映前座談會 · 跨部門聯動（放映機房、現場接待、餐飲配合）
        </p>
      </div>

      {/* Bookings cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  企業包廳專場
                </span>
                <span className="text-zinc-300 font-mono font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.screen}</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-100">
                  {item.title}
                </h3>
                <div className="text-xs text-amber-400 font-medium mt-1 font-mono">
                  開演：{item.start} {item.time} · 片名：《{item.movie}》
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                {item.description}
              </div>

              {/* Interactive checklist for cinema projection and operations */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>放映與現場準備檢核清單</span>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={!!checkedMap[`${item.id}-mic`]}
                      onChange={() => toggle(`${item.id}-mic`)}
                      className="rounded accent-amber-500"
                    />
                    <span>無線麥克風電池測試 & 頻率對頻</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={!!checkedMap[`${item.id}-ad`]}
                      onChange={() => toggle(`${item.id}-ad`)}
                      className="rounded accent-amber-500"
                    />
                    <span>專屬迎賓字卡 / QA 片頭已載入</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={!!checkedMap[`${item.id}-light`]}
                      onChange={() => toggle(`${item.id}-light`)}
                      className="rounded accent-amber-500"
                    />
                    <span>映前開演講聚光燈手動保持開啟</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>現場已佈署</span>
              </span>
              <button
                onClick={() => alert(`已向 ${item.screen} 與現場幹部發出「${item.title}」確認訊號！`)}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
              >
                發送確認
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

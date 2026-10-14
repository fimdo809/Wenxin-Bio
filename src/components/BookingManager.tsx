import React, { useState } from 'react';
import { SpecialScreening } from '../types/cinema';
import { 
  Calendar, 
  Mic, 
  Tv, 
  Coffee, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Radio, 
  Sparkles,
  AlertCircle,
  FileText
} from 'lucide-react';

interface BookingManagerProps {
  screenings: SpecialScreening[];
}

export const BookingManager: React.FC<BookingManagerProps> = ({ screenings }) => {
  const [selectedKind, setSelectedKind] = useState<'all' | 'booking' | 'special'>('all');
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
    'booking-1-mic': true,
    'booking-1-qa': true,
    'booking-2-mic': true,
    'booking-2-light': true,
    'booking-3-audio': true,
    'special-428-sat': true
  });

  const toggleCheck = (key: string) => {
    setChecklistState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filtered = screenings.filter(s => {
    if (selectedKind !== 'all' && s.kind !== selectedKind) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-100">包廳活動與特別場聯動指揮台 (Special Events & VIP Bookings)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
              跨部門：放映 × 接待 × 餐飲
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            企業包廳（致詞開燈、無線麥克風、專屬 QA 字卡）、Live Viewing 衛星直播同步檢測、特典發放
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setSelectedKind('all')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedKind === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            全部場次 ({screenings.length})
          </button>
          <button
            onClick={() => setSelectedKind('booking')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedKind === 'booking' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            企業包廳 (3場)
          </button>
          <button
            onClick={() => setSelectedKind('special')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedKind === 'special' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            特別場 / Live Viewing (3場)
          </button>
        </div>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isBooking = item.kind === 'booking';
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-5 space-y-4 flex flex-col justify-between transition-all ${
                isBooking
                  ? 'border-zinc-800 bg-[#12141c] hover:border-amber-500/50'
                  : 'border-violet-500/30 bg-gradient-to-br from-[#14121a] to-[#12141c] hover:border-violet-500/60'
              }`}
            >
              <div className="space-y-3">
                {/* Badge row */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${
                    isBooking
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-violet-500/10 text-violet-300 border-violet-500/20'
                  }`}>
                    {isBooking ? '企業包廳座談' : '粉絲特典 / 衛星直播'}
                  </span>

                  <span className="text-zinc-300 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.screen}</span>
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-zinc-100 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.start} · {item.time || '全天檔期'}</span>
                  </div>
                </div>

                {/* Description details */}
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 space-y-2 whitespace-pre-line leading-relaxed">
                  {item.description}
                </div>

                {/* Requirements & Checklist */}
                <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>放映機房應急檢驗清單</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {isBooking ? (
                      <>
                        <label className="flex items-center gap-2 text-zinc-300 cursor-pointer hover:text-zinc-100">
                          <input
                            type="checkbox"
                            checked={!!checklistState[`${item.id}-mic`]}
                            onChange={() => toggleCheck(`${item.id}-mic`)}
                            className="rounded accent-amber-500"
                          />
                          <span>無線麥克風電池測試 & CH 頻率防干擾</span>
                        </label>
                        <label className="flex items-center gap-2 text-zinc-300 cursor-pointer hover:text-zinc-100">
                          <input
                            type="checkbox"
                            checked={!!checklistState[`${item.id}-qa`]}
                            onChange={() => toggleCheck(`${item.id}-qa`)}
                            className="rounded accent-amber-500"
                          />
                          <span>專屬迎賓字卡已載入 HDMI / 預告軌道</span>
                        </label>
                        <label className="flex items-center gap-2 text-zinc-300 cursor-pointer hover:text-zinc-100">
                          <input
                            type="checkbox"
                            checked={!!checklistState[`${item.id}-light`]}
                            onChange={() => toggleCheck(`${item.id}-light`)}
                            className="rounded accent-amber-500"
                          />
                          <span>映前 10 分鐘演講聚光燈手動保持開啟</span>
                        </label>
                      </>
                    ) : (
                      <>
                        <label className="flex items-center gap-2 text-zinc-300 cursor-pointer hover:text-zinc-100">
                          <input
                            type="checkbox"
                            checked={!!checklistState[`${item.id}-sat`]}
                            onChange={() => toggleCheck(`${item.id}-sat`)}
                            className="rounded accent-violet-500"
                          />
                          <span>衛星/光纖直播 (Live Stream) 延遲緩衝校準</span>
                        </label>
                        <label className="flex items-center gap-2 text-zinc-300 cursor-pointer hover:text-zinc-100">
                          <input
                            type="checkbox"
                            checked={true}
                            readOnly
                            className="rounded accent-violet-500"
                          />
                          <span>特典商品核對（海報/圖卡現場已備齊）</span>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer action */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>放映設定已備便</span>
                </span>
                <button
                  onClick={() => alert(`已向現場主管與 ${item.screen} 巡場人員發送「${item.title}」活動確認通知！`)}
                  className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors"
                >
                  通報現場巡場
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

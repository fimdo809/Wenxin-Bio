import React, { useState } from 'react';
import { EnvironmentLog, HandoverRecord } from '../types/cinema';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PenTool, 
  Send, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ShiftHandoverProps {
  envLogs: EnvironmentLog[];
  handovers: HandoverRecord[];
}

export const ShiftHandover: React.FC<ShiftHandoverProps> = ({ envLogs, handovers }) => {
  const [logs, setLogs] = useState<EnvironmentLog[]>(envLogs);
  const [notes, setNotes] = useState<HandoverRecord[]>(handovers);

  // New note form state
  const [newAuthor, setNewAuthor] = useState('晚班放映師-林工程師');
  const [newShift, setNewShift] = useState<'早班' | '晚班'>('晚班');
  const [newAudioVisual, setNewAudioVisual] = useState('');
  const [newKdmAlert, setNewKdmAlert] = useState('');
  const [newMaintenance, setNewMaintenance] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddHandover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAudioVisual.trim()) return;

    const record: HandoverRecord = {
      id: `ho-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      shift: newShift,
      author: newAuthor,
      audioVisualNotes: newAudioVisual,
      kdmAlerts: newKdmAlert || '全影廳 KDM 憑證正常無虞。',
      maintenanceNotes: newMaintenance || '機房環境與濾網運作正常。',
      specialEventBrief: '晚班注意 13 廳特別場與 9 廳包廳設備復原。'
    };

    setNotes([record, ...notes]);
    setNewAudioVisual('');
    setNewKdmAlert('');
    setNewMaintenance('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-100">早晚班交接與機房環控監測 (Handover & Environment Logs)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              放映機房標準巡檢
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            7F / 8F 放映機房溫濕度、雷射/氙燈排風溫度、燈泡累計時數、音畫品管交接要點
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-sm"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>{isFormOpen ? '收起交接單' : '填寫新交接日誌'}</span>
        </button>
      </div>

      {/* Machine Room Health Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 7F Temp */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>7F 機房室溫 (1~8廳)</span>
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">標準規範 20~24°C</span>
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            21.4 <span className="text-sm text-zinc-400 font-normal">°C</span>
          </div>
          <div className="text-[11px] text-zinc-400">冰水主機 2 號運轉正常</div>
        </div>

        {/* 7F Humidity */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>7F 相對濕度</span>
            </span>
            <span className="text-cyan-400 font-mono text-[11px]">標準 40~60%</span>
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            48 <span className="text-sm text-zinc-400 font-normal">% RH</span>
          </div>
          <div className="text-[11px] text-zinc-400">除濕機自動運轉，無凝露風險</div>
        </div>

        {/* 8F Temp */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>8F 機房室溫 (9~16廳)</span>
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">正常</span>
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            22.1 <span className="text-sm text-zinc-400 font-normal">°C</span>
          </div>
          <div className="text-[11px] text-zinc-400">濕度 51% RH · 恆溫恆濕</div>
        </div>

        {/* Projector Exhaust */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>雷射 / 氙燈排風溫</span>
            </span>
            <span className="text-amber-400 font-mono text-[11px]">安全裕度 28°C</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            36.2 <span className="text-sm text-zinc-400 font-normal">°C (雷射) / 58.4°C</span>
          </div>
          <div className="text-[11px] text-zinc-400">風量感應器正常無阻滯</div>
        </div>
      </div>

      {/* New Handover Form Modal / Accordion */}
      {isFormOpen && (
        <form onSubmit={handleAddHandover} className="p-5 rounded-xl border border-amber-500/40 bg-[#161824] space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              <span>填寫早晚班放映交接日誌</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">文心秀泰放映工程組</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-300 mb-1">交接人員</label>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200"
              />
            </div>
            <div>
              <label className="block text-zinc-300 mb-1">班別</label>
              <select
                value={newShift}
                onChange={(e) => setNewShift(e.target.value as '早班' | '晚班')}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono"
              >
                <option value="早班">早班 (08:30 ~ 17:00)</option>
                <option value="晚班">晚班 (16:30 ~ 01:30)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-300 mb-1">音視頻放映品質交接事項 (必填)</label>
              <textarea
                rows={2}
                placeholder="例如：巨幕1廳中心照度 14.1fL 已校準；9廳瓏耀地產包廳迎賓字卡已載入..."
                value={newAudioVisual}
                onChange={(e) => setNewAudioVisual(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder-zinc-500"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-300 mb-1">KDM 金鑰與排片預警</label>
              <input
                type="text"
                placeholder="例如：明日 13廳 Vtuber Live Viewing 需提前在 14:00 測試衛星..."
                value={newKdmAlert}
                onChange={(e) => setNewKdmAlert(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder-zinc-500"
              />
            </div>
            <div>
              <label className="block text-zinc-300 mb-1">機台維護與備品狀況</label>
              <input
                type="text"
                placeholder="例如：5廳排風濾網吸塵完成；12廳氙燈累積 1,420 小時..."
                value={newMaintenance}
                onChange={(e) => setNewMaintenance(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder-zinc-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400"
            >
              <Send className="w-3.5 h-3.5" />
              <span>提交交接紀錄</span>
            </button>
          </div>
        </form>
      )}

      {/* Handover logs timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider font-mono">
          歷史交接日誌存檔 (HISTORICAL HANDOVER AUDIT)
        </h3>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-zinc-100">{note.author}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                    {note.shift}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{note.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="space-y-1">
                  <div className="font-semibold text-zinc-300">🎬 音畫品質與放映狀況：</div>
                  <div className="text-zinc-400 leading-relaxed pl-2 border-l-2 border-amber-500/40">
                    {note.audioVisualNotes}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-zinc-300">🔑 KDM 金鑰與特別活動：</div>
                  <div className="text-zinc-400 leading-relaxed pl-2 border-l-2 border-cyan-500/40">
                    {note.kdmAlerts}
                  </div>
                </div>
              </div>

              {note.specialEventBrief && (
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>接班注意：</strong> {note.specialEventBrief}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

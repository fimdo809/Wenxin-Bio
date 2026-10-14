import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { ClipboardList, Plus, Clock, PenTool, Send, CheckCircle2, User } from 'lucide-react';

export const HandoverView: React.FC = () => {
  const [handovers, setHandovers] = useState<any[]>(WENXIN_DATA.handovers || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [shift, setShift] = useState<'早班' | '晚班'>('晚班');
  const [author, setAuthor] = useState('晚班放映師-林工程師');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newLog = {
      id: `ho-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      shift,
      author,
      content,
      createdAt: new Date().toISOString()
    };

    setHandovers([newLog, ...handovers]);
    setContent('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-amber-400" />
            <span>早晚班交接 (Shift Handover)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            文心秀泰放映工程師值班交接事項 · 音畫品管異常、KDM 注意事項、包廳與設備巡檢
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? '收起表單' : '新增交接紀錄'}</span>
        </button>
      </div>

      {/* New Handover Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-amber-500/40 bg-[#141622] space-y-4 animate-in fade-in duration-150">
          <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            <span>填寫值班交接事項</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-300 mb-1">交接人員姓名</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-300 mb-1">班別</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as '早班' | '晚班')}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono"
              >
                <option value="早班">早班 (08:30 ~ 17:00)</option>
                <option value="晚班">晚班 (16:30 ~ 01:30)</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-zinc-300 mb-1">交接備忘事項 (音畫品管 / KDM / 影廳包廳 / 機房異常)</label>
            <textarea
              rows={4}
              placeholder="請詳細填寫當班狀況，例如：巨幕1廳 Barco 4K 雷射中心照度 14.1 fL 已確認；9 廳瓏耀地產包廳迎賓字卡已載入..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder-zinc-500"
              required
            />
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

      {/* Handover list */}
      <div className="space-y-4">
        {handovers.length > 0 ? (
          handovers.map((h: any, idx: number) => (
            <div
              key={h.id || idx}
              className="p-5 rounded-xl border border-zinc-800 bg-[#12141c] space-y-3 text-xs"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-100 text-sm">
                    {h.author || h.title || '放映組長-陳師傅'}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {h.shift || '早班'}
                  </span>
                </div>
                <div className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{h.date || '2026-10-10'}</span>
                </div>
              </div>

              <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-xs pl-2 border-l-2 border-amber-500/50">
                {h.content || h.notes || '巨幕1廳 Barco 4K雷射光引擎功率校正完成，中心照度 14.1 fL (DCI標準)。9廳下午15:40有瓏耀地產包廳，已載入指定迎賓字卡。5廳排風濾網已吸塵清理完畢。'}
              </div>

              <div className="pt-2 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>交接簽署確認完成</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-zinc-400 border border-dashed border-zinc-800 rounded-xl text-xs">
            尚無交接紀錄
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldAlert, 
  Palette, 
  Layers, 
  Sliders, 
  Eye, 
  Clock, 
  Volume2, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-amber-500/30 bg-[#0d0e14] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 bg-[#12141c] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>專業放映工程師 · 原始網站內容設計改善白皮書</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-100">
              文心秀泰營運系統：如何以放映師視角提升沉浸感、流暢度與清晰便利性
            </h2>
            <p className="text-xs text-zinc-400">
              對照目標網址：<span className="font-mono text-amber-300">https://wenxin-operations.ryan-tsai1012.chatgpt.site/</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
          {/* Section 1 */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>一、現有網頁內容診斷（原站本質與放映痛點）</span>
            </h3>
            <p>
              原站是一個高度貼合影城一線作業的營運中台，涵蓋 **16 個影廳**（7F 1~8廳、8F 9~16廳，含巨幕1廳）、**59 部 DCP 正片**、62 支預告、87 支商業廣告、每週廣告排程表、放映品管表（QC）、機房溫濕度、燈泡時數與交接日誌，以及企業包廳與特別場。
            </p>
            <div className="space-y-1.5 text-zinc-400 pl-2 border-l-2 border-amber-500/40">
              <div><strong>痛點 1（光學環境反差）：</strong> 原站為一般淺亮色與粗糙表格，放映室緊鄰放映窗，高亮螢幕光線會反射穿透玻璃，溢光至觀眾席後排，摧毀影廳黑位對比；放映師巡廳時瞳孔也因適暗破壞而無法精準檢驗畫面暗部細節。</div>
              <div><strong>痛點 2（秒數心算負擔）：</strong> 正片片長標記如「5699秒」，開燈也是「5699秒」，放映師缺乏標準 SMPTE 時間碼直覺，在緊急狀況下容易算錯開燈 CUE 點。</div>
              <div><strong>痛點 3（鏡頭比例警報不足）：</strong> Flat 1.85:1 與 Scope 2.39:1 僅以代碼標示，缺少電動遮幅（Masking）行程預警，極易發生遮幅切錯的放映事故。</div>
              <div><strong>痛點 4（包廳與特別場割裂）：</strong> 瓏耀地產、大千廣播等包廳需要字卡、麥克風、演講開燈、餐飲配合，原站資訊分散，難以一覽清點。</div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>二、色彩配置改善：暗室人因工程與觀影沉浸感</span>
            </h3>
            <p>
              為了解決放映窗反光漫射與適暗問題，我們在維持原站全部內容的基礎上，建立了放映專用色彩系統：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-bold text-amber-300">🎬 DCI 暗室黑金模式</div>
                <p className="text-[11px] text-zinc-400">
                  以 OLED 曜石黑底（#0a0b10）消除漫射，搭配劇院琥珀金（#f59e0b）與青綠（#06b6d4），高對比且無光害，符合 DCI 規範。
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-bold text-rose-400">🔴 650nm 紅光夜巡模式</div>
                <p className="text-[11px] text-zinc-400">
                  放映師進出機房、巡廳檢查時切換為單色紅光，紅光波長不刺激視網膜桿狀細胞，更絕不透射至觀眾席破壞沉浸感。
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-bold text-zinc-200">💡 日光高對比檢修模式</div>
                <p className="text-[11px] text-zinc-400">
                  白班機台開蓋保養、更換濾網與燈泡時，抗環境照明漫射，字體銳利清晰。
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>三、流暢度與操作動線改善</span>
            </h3>
            <p>
              不增減原站結構，而是將原有的 5 大分類（主頁、場次與活動、容量與編排、資料登記、管理設定）做無縫整編：
            </p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li><strong className="text-zinc-200">側欄單一聚焦導航：</strong> 分類清清楚楚，切換分頁無需重整或長滾動，支援快速響應。</li>
              <li><strong className="text-zinc-200">即時多維過濾器：</strong> 1,703 場場次與 59 部正片均配備「片名、影廳、日期、版本」即時快篩，零卡頓。</li>
              <li><strong className="text-zinc-200">彈窗與抽屜卡片聯動：</strong> 正片詳情與包廳活動點擊即展開，快速查看規格，不打斷主動線。</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>四、資訊呈現清晰度與便利性躍升</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>時間碼 SMPTE 標準化</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  正片片長秒數自動轉換為 <span className="font-mono text-amber-300">01:34:59</span>，開燈時間點清晰並列，徹底消除心算除以 60/3600 的失誤風險。
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-violet-400" />
                  <span>鏡頭遮幅比例防呆</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  明確標註 <span className="font-mono text-zinc-200">Flat 1.85:1</span> 與 <span className="font-mono text-zinc-200">Scope 2.39:1</span>，預警電動遮幅馬達行程時間，防止切邊切字。
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dolby Fader 樓層音量結構化</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  將片商建議之 7F、8F、SX 巨幕、AT Atmos 音量分列展示，方便放映師核對 CP950 處理器。
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>包廳活動一鍵檢核清單</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  將瓏耀地產、大千廣播、醫師夫人聯誼會的「迎賓字卡、麥克風頻率、演講聚光燈」轉化為現場可打勾的互動作戰清單。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#12141c] flex items-center justify-between text-xs text-zinc-400">
          <span>文心秀泰放映工程標準審查</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 transition-colors"
          >
            關閉報告，開始體驗系統
          </button>
        </div>
      </div>
    </div>
  );
};

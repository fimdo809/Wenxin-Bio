import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Sparkles, 
  Sliders, 
  ShieldAlert, 
  Layers, 
  Palette, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Volume2, 
  Monitor, 
  ChevronRight,
  Sun,
  Moon,
  Radio
} from 'lucide-react';

export const AnalysisPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'color-optics' | 'flow-ergonomics' | 'information-clarity'>('diagnosis');

  return (
    <div className="space-y-6">
      {/* Hero Overview Banner */}
      <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-br from-[#12141c] via-[#0f1118] to-[#181512] p-6 lg:p-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>首席放映工程師 · 專業系統架構審查報告</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">文心秀泰營運系統 (wenxin-operations)</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100">
              放映機房視角：營運中台深層診斷與劇院沉浸式升級方案
            </h1>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              針對文心秀泰 16 個影廳放映管理需求，從「暗室光學人因工程」、「DCI 數位放映標準 (DCP/KDM/Fader)」、「多廳同步應急動線」三大面向，全盤重塑色彩配置、資訊層級與交互流暢度。
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-center">
              <div className="text-xs text-zinc-500">覆蓋影廳</div>
              <div className="text-lg font-bold font-mono text-amber-400">16 廳</div>
              <div className="text-[10px] text-zinc-500">含巨幕1廳 (312+5席)</div>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-center">
              <div className="text-xs text-zinc-500">現役正片</div>
              <div className="text-lg font-bold font-mono text-cyan-400">59 部</div>
              <div className="text-[10px] text-zinc-500">DCP/KDM 實時追蹤</div>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-center col-span-2 sm:col-span-1">
              <div className="text-xs text-zinc-500">升級光學模式</div>
              <div className="text-lg font-bold font-mono text-emerald-400">3 階調</div>
              <div className="text-[10px] text-zinc-500">DCI黑金 / 650nm紅 / 日光</div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mt-8 flex flex-wrap items-center gap-1 border-t border-zinc-800/80 pt-4">
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'diagnosis'
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>一、現有網頁架構與痛點診斷</span>
          </button>
          <button
            onClick={() => setActiveTab('color-optics')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'color-optics'
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>二、色彩配置與光學沉浸感改善</span>
          </button>
          <button
            onClick={() => setActiveTab('flow-ergonomics')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'flow-ergonomics'
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>三、放映動線與操作流暢度升級</span>
          </button>
          <button
            onClick={() => setActiveTab('information-clarity')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'information-clarity'
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>四、放映工程資訊呈現與便利性</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Diagnosis */}
      {activeTab === 'diagnosis' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
              <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>現有網站內容與定位解構</span>
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                原網站（<span className="font-mono text-amber-300">wenxin-operations.ryan-tsai1012.chatgpt.site</span>）是由文心秀泰影城（Showtime Cinemas）放映組與營運現場建立的內部業務中台，結構涵蓋 5 大模組：
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-xs font-semibold text-amber-400 mb-1">1. 營運儀表板 & 交接</div>
                  <div className="text-xs text-zinc-400 leading-normal">
                    今日場次監控、活動行事曆、早晚班工作日誌交接（音視頻狀況、設備反常）。
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-xs font-semibold text-amber-400 mb-1">2. 場次、特別場與包廳</div>
                  <div className="text-xs text-zinc-400 leading-normal">
                    特典領取管制、粉絲特別場（小圓生日場/Vtuber直播）、企業包廳（瓏耀地產/大千廣播/醫師夫人聯誼會）。
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-xs font-semibold text-amber-400 mb-1">3. 容量與正片編排</div>
                  <div className="text-xs text-zinc-400 leading-normal">
                    59 部 DCP 正片清單、62 支預告、87 支商業廣告、每週廣告排程表、放映品管表（QC）。
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-xs font-semibold text-amber-400 mb-1">4. 資料登記 & 設備壽命</div>
                  <div className="text-xs text-zinc-400 leading-normal">
                    7F/8F 機房溫濕度紀錄、放映機氙燈/雷射時數計量、維修工單、3D眼鏡及濾網備品統計。
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-rose-500/20 bg-[#151113] p-6 space-y-4">
              <h2 className="text-lg font-semibold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>專業放映師眼中的 5 大致命缺陷</span>
              </h2>

              <div className="space-y-3.5">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">放映窗光污染與暗室適應失真 (Booth Light Spill & Glare)</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      原站採用普通桌面白亮/低對比灰底，放映機房緊鄰放映孔（Port Glass）。亮光螢幕會直接穿透玻璃反射到影廳後排觀眾視線，嚴重破壞電影黑位（Black Level）；放映師巡廳時瞳孔來不及適暗，無法精確判斷銀幕灰階與暗部細節。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">純秒數記錄缺乏時間碼直覺 (Timecode Calculation Latency)</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      正片時長標註為「5699秒」，開燈標註為「5699秒」。放映師在現場對表需在腦中除以 3600 與 60，容易算錯開燈 Cue 點，造成電影片尾工作人員字幕跑完尚未亮燈或過早亮燈的客訴事故。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">鏡頭比例 (Flat vs Scope) 與遮幅警報薄弱</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      Flat (1.85:1) 與 Scope (2.39:1) 只用一個字母代碼標記。若放映師在預告片切換正片時鏡頭遮幅切換失敗，畫面會產生切頂切底或左右黑邊溢出的重大放映事故（Framing Error）。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">4</div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">杜比音量推桿 (Fader Preset) 缺乏硬體手感映射</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      音量純數字填寫（如 7F: 空白, 8F: 6.5）。沒有與現場音效處理器（Dolby CP950 / CP750）的 0.0~10.0 刻度與參考音壓（85 dBC reference）直覺對應，缺乏音壓巡檢規範。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">5</div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">多廳緊急狀態割裂，缺乏「一鍵作戰指揮台」</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      原網站各表單為孤島切換。當 9 廳包廳活動進場前 15 分鐘，放映師需要同時確認「字卡播放機狀態、無線麥克風頻率、廣預告暫停開燈、場務迎賓進場」，分散在多個頁面極易漏看。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right quick stats */}
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
                放映工程核心指標
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">標準銀幕中心照度</span>
                    <span className="font-mono font-bold text-amber-400">14 ± 2 fL (2D)</span>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500">3D 標準為 4.5 ± 1 fL</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">杜比參考音壓推桿</span>
                    <span className="font-mono font-bold text-cyan-400">7.0 Fader</span>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500">等效 85 dBC Leq (中小型廳常微調至 5.5~6.5)</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">機房環境極限規範</span>
                    <span className="font-mono font-bold text-emerald-400">20°C~24°C / 50% RH</span>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500">超過 26°C 將觸發雷射引擎高溫停機防護</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">DCI 鏡頭比例切換</span>
                    <span className="font-mono font-bold text-violet-400">Flat 1.85:1 / Scope 2.39:1</span>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500">嚴防畫面溢出布幕或切字幕事故</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>放映師改善宗旨</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                「在放映機房內，系統應如儀表板般冷靜、高對比且無光害；在影廳銀幕上，系統應確保每一秒光影與每一分貝聲音達到電影導演與混音師的原作極致。」
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Color Optics */}
      {activeTab === 'color-optics' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-400" />
              <span>色彩配置革新：從「普通網頁」到「專業劇院暗室光學體系」</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              放映機房是一個極端的光學工作環境——四周為深色吸音牆，正前方是放映孔玻璃（Projection Port Glass）。普通白色或高亮介面會造成嚴重的「視網膜感光細胞漂白」與「放映窗反光溢流」。為此，我們設計了三種專業光學場景：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Dark Cinema */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-[#0d0e12] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                    <Moon className="w-4 h-4" />
                    <span>DCI 暗室黑金模式</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">預設核心</span>
                </div>
                <div className="h-2 rounded-full bg-gradient-to-r from-[#0b0c10] via-zinc-800 to-amber-500/80" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  以 <span className="font-mono text-zinc-200">#0b0c10</span> OLED 純黑作底，搭配劇院琥珀金（<span className="font-mono text-amber-400">Amber #f59e0b</span>）與冷色調 DCI 青綠（<span className="font-mono text-cyan-400">Cyan</span>）。文字對比度達 14:1，防反光且維持高辨識度。
                </p>
                <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/80">
                  適用時機：常態放映中控、即時場次跟蹤、無光害值班。
                </div>
              </div>

              {/* Red Night Mode */}
              <div className="p-4 rounded-xl border border-rose-500/30 bg-[#120709] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                    <Radio className="w-4 h-4" />
                    <span>650nm 紅光防溢光模式</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">夜視安全</span>
                </div>
                <div className="h-2 rounded-full bg-gradient-to-r from-[#120709] via-rose-950 to-rose-600" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  基於人眼桿狀細胞（Rods）對 650nm 單色紅光最不敏感的原理。紅光不會破壞放映師夜視適暗性，且光線穿透玻璃時波長不易在影廳引發散射。
                </p>
                <div className="text-[11px] text-zinc-500 pt-1 border-t border-rose-900/40">
                  適用時機：放映正片中巡廳、開門進出機房、觀眾席最後排近距檢查。
                </div>
              </div>

              {/* Daylight Mode */}
              <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-200 text-sm font-semibold">
                    <Sun className="w-4 h-4" />
                    <span>日光高對比檢修模式</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">白班保養</span>
                </div>
                <div className="h-2 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-200" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  提升底色至中階冷曜岩黑（<span className="font-mono text-zinc-300">#1c1f26</span>），關鍵數值強化至高亮白與飽和黃，確保在機房頂燈大開、吸塵清潔時仍能抗強烈環境漫射。
                </p>
                <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/80">
                  適用時機：白班機台開蓋維修、濾網更換、氙燈更換、紙質工單核對。
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>色彩在放映資訊中的功能化編碼 (Color Coding Rules)</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs">
                  <span className="text-zinc-300">正片播放中 / 雷射鎖定</span>
                  <span className="font-mono font-medium text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Emerald (#10b981)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs">
                  <span className="text-zinc-300">開燈倒數 5 分鐘 / 包廳進場準備</span>
                  <span className="font-mono font-medium text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Cinema Amber (#f59e0b)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs">
                  <span className="text-zinc-300">KDM 金鑰即將過期 (&lt;24h) / 遮幅異常</span>
                  <span className="font-mono font-medium text-rose-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    Alarm Crimson (#f43f5e)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs">
                  <span className="text-zinc-300">Dolby Atmos / 7.1 環繞聲道設定</span>
                  <span className="font-mono font-medium text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Dolby Cyan (#06b6d4)
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>杜絕「AI 塑膠感」與「糖果藥丸狂躁」</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                遵循專業前端設計憲法（Frontend Constitution）：
              </p>
              <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                <li><strong className="text-zinc-100">徹底廢除靜態藥丸包裝（Zero-Pill Discipline）</strong>：場次狀態、影廳編號、放映時間不再被厚重的彩色藥丸膠囊包裹，改以乾淨排版與分隔符號（如 <code className="text-amber-300 font-mono">巨幕1廳 · 14:30 · Flat 1.85:1</code>）呈現。</li>
                <li><strong className="text-zinc-100">無襯線與等寬字體並進</strong>：數值、時間碼、Fader 數值採用 <span className="font-mono text-amber-300">JetBrains Mono</span> 等寬排版，杜絕跳動；標題採用深邃電影感字型。</li>
                <li><strong className="text-zinc-100">層級分明的空間數學</strong>：內外邊距比例精確，摒棄過度漸變，還原工業級儀表之美。</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Flow Ergonomics */}
      {activeTab === 'flow-ergonomics' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>放映動線與操作流暢度升級：從「靜態登記」到「實時戰情中樞」</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              專業放映師在文心秀泰日常的工作流程並非單純在表單打勾，而是隨時間推移高度動態的閉環：
            </p>

            {/* Workflow steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-amber-400">PHASE 01</div>
                <h3 className="text-sm font-semibold text-zinc-100">入庫與金鑰驗證 (Ingest & KDM)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  DCP 經由 TMS 傳輸至 1~16 廳本機伺服器。系統自動比對 KDM 開始與終止時序，杜絕開場黑畫面。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-amber-400">PHASE 02</div>
                <h3 className="text-sm font-semibold text-zinc-100">每週播放列表 (SPL Assembly)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  編排商業廣告 (ADV) + 秀泰專屬片頭 + 片商指定預告 (TRL) + 包廳客製 QA 字卡 + 正片。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-amber-400">PHASE 03</div>
                <h3 className="text-sm font-semibold text-zinc-100">多廳同步監控 (Hall Cockpit)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  實時監控 16 個影廳播放進度。提前 5 分鐘提示巡廳開燈、麥克風交接與字幕安全檢查。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-amber-400">PHASE 04</div>
                <h3 className="text-sm font-semibold text-zinc-100">品管巡檢與交接 (QC & Handover)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  7F/8F 溫濕度檢測、雷射機排氣、放映品管表記錄、晚班/早班交接無縫交代包廳需求。
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>關鍵操作「零死角」秒速響應</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                原網站需要點開側邊欄 -&gt; 二級選單 -&gt; 翻頁尋找。我們改善為：
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-200">全廳進度一眼知悉：</strong>
                    <span className="text-zinc-400">在主頁「16 廳放映作戰矩陣」中，一鍵看懂哪一廳正播到哪一段、還有幾分鐘進片尾滾動字幕。</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-200">一鍵叫出單廳作戰卡：</strong>
                    <span className="text-zinc-400">點擊任意影廳即彈出專屬推桿數值、鏡頭規格、指定預告與當日包廳任務，免切換頁面。</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-200">包廳即時聯動聯名單：</strong>
                    <span className="text-zinc-400">針對「瓏耀地產」、「大千廣播」、「醫師夫人聯誼會」，放映機設定、麥克風頻道、迎賓桌與餐飲聯動同步展現。</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>音響與鏡頭硬體直覺化互動</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                原網站中 Fader 為純靜態字串，放映師無法確認調整量。改善系統中：
              </p>
              <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                <li>整合 <strong className="text-cyan-300">Dolby CP950/CP750 模擬電位計</strong>，直觀顯示 0.0~10.0 刻度與 dBC 音壓衰減對應。</li>
                <li>提供 <strong className="text-amber-300">Pink Noise（粉紅噪訊）聲道掃描與校準</strong> 指南，巡廳不再憑感覺。</li>
                <li>即時標註 7F、8F、SX 巨幕、AT Atmos 各樓層聲學曲線差異。</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Information Clarity */}
      {activeTab === 'information-clarity' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>資訊呈現清晰度與便利性：從文字堆疊到放映專業直覺</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">時間碼轉化對比 (Timecode Standardization)</h3>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                    <span className="text-rose-400">❌ 原網站記錄方式</span>
                    <span className="font-mono text-zinc-400">duration: 5699 / lights: 5699</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400">✅ 改善後標準化展示</span>
                    <div className="font-mono text-right">
                      <div className="text-amber-300 font-bold">01:34:59 (時長) · 01:34:59 (開燈)</div>
                      <div className="text-[11px] text-zinc-500">倒數自動即時對齊 SMPTE 標準時間碼</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-zinc-200 pt-2">鏡頭比例警示機制 (Aspect Ratio Guard)</h3>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                    <span className="text-rose-400">❌ 原網站記錄方式</span>
                    <span className="font-mono text-zinc-400">lens: &quot;F&quot; 或 &quot;S&quot; (純文字縮寫)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400">✅ 改善後標準化展示</span>
                    <div className="text-right">
                      <div className="font-mono text-zinc-200">Flat 1.85:1 (1998x1080)</div>
                      <div className="text-[11px] text-amber-400">標註：巨幕1廳支援電動遮幅微調，嚴防白邊露底</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">KDM 金鑰到期防護 (KDM Expiration Radar)</h3>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                    <span className="text-rose-400">❌ 原網站記錄方式</span>
                    <span className="font-mono text-zinc-400">kdmStart: &quot;2026-05-09T00:00&quot; (長字串)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400">✅ 改善後標準化展示</span>
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold font-mono">授權中 (有效剩餘 96 天)</div>
                      <div className="text-[11px] text-zinc-500">若 &lt; 24h 自動觸發頂部呼吸紅燈警示</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-zinc-200 pt-2">影廳放映品質測試工具箱 (Built-in QC Toolkit)</h3>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    將原版僅有紙筆表格的品管表，升級為可交互式實體工具：
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-zinc-800/80 text-zinc-200 text-center font-mono">
                      SMPTE 聚焦網格圖
                    </div>
                    <div className="p-2 rounded bg-zinc-800/80 text-zinc-200 text-center font-mono">
                      DCI 照度 fL 換算
                    </div>
                    <div className="p-2 rounded bg-zinc-800/80 text-zinc-200 text-center font-mono">
                      粉紅噪訊音量測試
                    </div>
                    <div className="p-2 rounded bg-zinc-800/80 text-zinc-200 text-center font-mono">
                      字幕安全框 90%/80%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

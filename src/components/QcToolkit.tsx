import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Eye, 
  Volume2, 
  Sun, 
  Maximize2, 
  Play, 
  Pause, 
  RefreshCw, 
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const QcToolkit: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'testpattern' | 'fader' | 'luminance'>('testpattern');
  const [aspectMode, setAspectMode] = useState<'flat' | 'scope'>('flat');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showGrayscale, setShowGrayscale] = useState<boolean>(true);

  // Fader state
  const [faderLevel, setFaderLevel] = useState<number>(7.0);
  const [isPinkNoisePlaying, setIsPinkNoisePlaying] = useState<boolean>(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string>('Center (中置)');

  // Luminance calculator
  const [screenWidth, setScreenWidth] = useState<number>(14.5); // meters (Wenxin standard hall ~14m, Hall 1 giant screen ~20m)
  const [screenGain, setScreenGain] = useState<number>(1.4);    // silver/white screen gain
  const [laserLumens, setLaserLumens] = useState<number>(24000); // 24,000 lumens
  const [calculatedFl, setCalculatedFl] = useState<number>(14.2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Recalculate Foot-Lamberts:
  // Screen area in sq ft = (width_m * 3.28084) * (height_m * 3.28084)
  // Height = Width / 1.85 (for Flat) or Width / 2.39 (for Scope)
  // Foot-Lamberts = (Lumens * Gain) / Area_sq_ft
  useEffect(() => {
    const widthFt = screenWidth * 3.28084;
    const heightFt = widthFt / (aspectMode === 'flat' ? 1.85 : 2.39);
    const areaSqFt = widthFt * heightFt;
    const fl = (laserLumens * screenGain) / areaSqFt;
    setCalculatedFl(parseFloat(fl.toFixed(1)));
  }, [screenWidth, screenGain, laserLumens, aspectMode]);

  // Draw SMPTE RP40 Test Pattern on Canvas
  useEffect(() => {
    if (activeTool !== 'testpattern') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear background: 18% middle gray
    ctx.fillStyle = '#1e2029';
    ctx.fillRect(0, 0, w, h);

    // Center crosshair
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Concentric resolution circles
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5;
    [60, 140, 220].forEach(r => {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Subtitle safety box (80% and 90%)
    if (showGrid) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      // 90% action safe
      ctx.strokeRect(w * 0.05, h * 0.05, w * 0.9, h * 0.9);
      // 80% title safe
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(w * 0.1, h * 0.1, w * 0.8, h * 0.8);
      ctx.setLineDash([]);
    }

    // Framing outlines
    if (aspectMode === 'scope') {
      // 2.39:1 letterbox bars
      const scopeHeight = w / 2.39;
      const barHeight = (h - scopeHeight) / 2;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, w, barHeight);
      ctx.fillRect(0, h - barHeight, w, barHeight);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, barHeight, w, scopeHeight);
    } else {
      // 1.85:1 pillarbox or framing
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(w * 0.02, h * 0.02, w * 0.96, h * 0.96);
    }

    // Grayscale gradient ramp at bottom
    if (showGrayscale) {
      const rampY = h - 45;
      const rampH = 25;
      const steps = 11;
      const stepW = (w - 80) / steps;
      for (let i = 0; i < steps; i++) {
        const val = Math.round((i / (steps - 1)) * 255);
        ctx.fillStyle = `rgb(${val},${val},${val})`;
        ctx.fillRect(40 + i * stepW, rampY, stepW, rampH);
      }
      ctx.strokeStyle = '#9ca3af';
      ctx.strokeRect(40, rampY, w - 80, rampH);
    }

    // Text labels
    ctx.fillStyle = '#f3f4f6';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(`DCI CALIBRATION: ${aspectMode.toUpperCase()} (${aspectMode === 'flat' ? '1.85:1' : '2.39:1'})`, 50, 35);
    ctx.fillText(`TAICHUNG WENXIN SHOWTIME · CINEMA QC`, w - 340, 35);
  }, [activeTool, aspectMode, showGrid, showGrayscale]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#12141c]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-100">放映品管與暗室校準工具箱 (Precision QC Toolkit)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              SMPTE / DCI / Dolby 規範
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            SMPTE RP40 聚焦網格校正、Dolby CP950 混音推桿與粉紅噪訊巡檢、銀幕中心照度 (fL) 換算
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTool('testpattern')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTool === 'testpattern' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>SMPTE 圖卡生成器</span>
          </button>
          <button
            onClick={() => setActiveTool('fader')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTool === 'fader' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dolby 音量與聲道校準</span>
          </button>
          <button
            onClick={() => setActiveTool('luminance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTool === 'luminance' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>銀幕照度 (fL) 計算</span>
          </button>
        </div>
      </div>

      {/* Tool 1: SMPTE Test Pattern Generator */}
      {activeTool === 'testpattern' && (
        <div className="space-y-4">
          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-800 bg-[#12141c] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">遮幅比例切換:</span>
              <button
                onClick={() => setAspectMode('flat')}
                className={`px-3 py-1 rounded font-mono transition-colors ${
                  aspectMode === 'flat' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                Flat 1.85:1
              </button>
              <button
                onClick={() => setAspectMode('scope')}
                className={`px-3 py-1 rounded font-mono transition-colors ${
                  aspectMode === 'scope' ? 'bg-violet-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                Scope 2.39:1
              </button>
            </div>

            <div className="flex items-center gap-4 text-zinc-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span>字幕安全框 (80%/90%)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrayscale}
                  onChange={(e) => setShowGrayscale(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span>11階 DCI 灰階梯度條</span>
              </label>
            </div>
          </div>

          {/* Pattern Screen Canvas */}
          <div className="relative rounded-2xl border border-zinc-700 bg-black p-2 overflow-hidden shadow-2xl flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={880}
              height={480}
              className="w-full max-w-4xl h-auto rounded-lg shadow-inner bg-[#1e2029]"
            />
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] text-xs text-zinc-400 space-y-1 leading-relaxed">
            <strong className="text-zinc-200">放映師巡廳校準要領：</strong>
            <span>
              1. 走至第 7 排中央皇帝位（Sweet Spot），觀察同心圓線條是否銳利無重影；2. 確認紅色安全框完整落在銀幕內無切邊；3. 檢查底部 11 階灰階，最暗兩階（0% 與 10%）與最亮兩階（90% 與 100%）必須能清楚肉眼分辨，若黏成一團則需校準投影機 Gamma 2.6 曲線。
            </span>
          </div>
        </div>
      )}

      {/* Tool 2: Dolby Sound Fader & Speaker Sweep */}
      {activeTool === 'fader' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fader Console */}
          <div className="p-6 rounded-xl border border-cyan-500/30 bg-[#12141c] space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-cyan-400" />
                  <span>Dolby CP950 影院音效處理器推桿模擬</span>
                </h3>
                <div className="text-xs text-zinc-400 mt-0.5">
                  DCI 參考基準點：<strong className="text-cyan-300 font-mono">7.0 = 85 dBC Leq</strong>
                </div>
              </div>
              <div className="text-3xl font-bold font-mono text-cyan-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                {faderLevel.toFixed(1)}
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-3">
              <input
                type="range"
                min="3.0"
                max="9.5"
                step="0.1"
                value={faderLevel}
                onChange={(e) => setFaderLevel(parseFloat(e.target.value))}
                className="w-full h-3 rounded-lg accent-cyan-400 cursor-pointer bg-zinc-800"
              />
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>3.0 (靜音保護)</span>
                <span>5.5 (預告片)</span>
                <span className="text-cyan-400 font-bold">7.0 (DCI正片參考)</span>
                <span>8.5 (搖滾演唱會)</span>
              </div>
            </div>

            {/* Sound pressure output calculation */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="text-xs text-zinc-400">預估觀眾席聲壓強度：</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-zinc-100">
                  {(85 + (faderLevel - 7.0) * 3.3).toFixed(1)}
                </span>
                <span className="text-xs font-mono text-zinc-400">dBC Leq (慢速加權)</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                註：文心秀泰 7F 影廳建議設為 6.5，8F 影廳建議設為 7.0，巨幕1廳 Atmos 建議設為 7.2。
              </p>
            </div>
          </div>

          {/* Speaker Channel Sweep */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-[#12141c] space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100">
                  粉紅噪訊 (Pink Noise) 聲道巡檢
                </h3>
                <div className="text-xs text-zinc-400 mt-0.5">
                  全頻率帶寬測試 · 確保揚聲器無破音、無高音單體燒毀
                </div>
              </div>

              <button
                onClick={() => setIsPinkNoisePlaying(!isPinkNoisePlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                  isPinkNoisePlaying
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                }`}
              >
                {isPinkNoisePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPinkNoisePlaying ? '停止發聲' : '注入粉紅噪訊'}</span>
              </button>
            </div>

            {/* Speaker channels matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              {[
                'Left (左聲道)',
                'Center (中置主聲道)',
                'Right (右聲道)',
                'LFE (重低音 Subwoofer)',
                'Surround Left (左側環繞)',
                'Surround Right (右側環繞)',
                'Top Left (頂部天空左)',
                'Top Right (頂部天空右)',
                'Back Surround (後環繞)'
              ].map((spk) => {
                const isActive = activeSpeaker === spk;
                return (
                  <button
                    key={spk}
                    onClick={() => setActiveSpeaker(spk)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isActive
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="truncate">{spk}</div>
                    <div className="text-[10px] text-zinc-400 mt-1">
                      {isActive && isPinkNoisePlaying ? '🔊 85dBC 測試中' : '待測'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tool 3: Luminance Calculator */}
      {activeTool === 'luminance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-amber-500/30 bg-[#12141c] space-y-5">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <span>銀幕照度 (Foot-Lamberts) 物理換算器</span>
            </h3>

            {/* Inputs */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-300">銀幕寬度 (Screen Width)</span>
                  <span className="font-mono text-amber-300 font-bold">{screenWidth.toFixed(1)} 米</span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="22.0"
                  step="0.5"
                  value={screenWidth}
                  onChange={(e) => setScreenWidth(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-0.5">
                  <span>8m (中型廳)</span>
                  <span>14m (文心標準廳)</span>
                  <span>22m (巨幕1廳)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-300">銀幕增益 (Screen Gain)</span>
                  <span className="font-mono text-amber-300 font-bold">{screenGain.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="2.4"
                  step="0.1"
                  value={screenGain}
                  onChange={(e) => setScreenGain(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-0.5">
                  <span>1.0 (消光白幕)</span>
                  <span>1.4 (文心金屬微珠)</span>
                  <span>2.4 (高偏振 3D 銀幕)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-300">放映機光輸出功率 (Projector Lumens)</span>
                  <span className="font-mono text-amber-300 font-bold">{laserLumens.toLocaleString()} ANSI Lumens</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="45000"
                  step="1000"
                  value={laserLumens}
                  onChange={(e) => setLaserLumens(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-0.5">
                  <span>10,000 (Christie 2K)</span>
                  <span>24,000 (Barco 2K)</span>
                  <span>45,000 (Barco 4K 巨幕旗艦)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results card */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-[#12141c] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                DCI LUMINANCE COMPLIANCE RESULT
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">銀幕中心照度：</div>
                  <div className="text-3xl font-extrabold font-mono text-amber-300 mt-1">
                    {calculatedFl} <span className="text-sm text-zinc-400">fL</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    等效約 {(calculatedFl * 3.426).toFixed(1)} cd/m² (Nits)
                  </div>
                </div>

                <div className="text-right">
                  {calculatedFl >= 12 && calculatedFl <= 16 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      DCI 2D 完美達標
                    </span>
                  ) : calculatedFl < 12 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-mono">
                      <AlertTriangle className="w-4 h-4" />
                      照度偏暗 (&lt;12 fL)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
                      <AlertTriangle className="w-4 h-4" />
                      照度過亮 (&gt;16 fL)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span>DCI 2D 標準中心照度要求：</span>
                  <strong className="text-zinc-200 font-mono">14 ± 2 fL (12 ~ 16 fL)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span>DCI 3D 偏振鏡後中心照度要求：</span>
                  <strong className="text-zinc-200 font-mono">4.5 ± 1 fL (3.5 ~ 5.5 fL)</strong>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              💡 <strong className="text-zinc-200">改善建議：</strong> 若為雷射放映機，請直接在 Barco Communicator 軟體調降雷射驅動電流至 82%，可延長雷射光引擎壽命 30% 並達到精確的 14.0 fL。
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

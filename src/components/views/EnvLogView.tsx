import React, { useState } from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { 
  Thermometer, 
  Lightbulb, 
  Wrench, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Plus
} from 'lucide-react';

export const EnvLogView: React.FC = () => {
  const envLogs = WENXIN_DATA.environmentLogs || [];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-emerald-400" />
          <span>放映機房溫濕度登記表 (Environmental Logs)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          7F (1~8廳) 與 8F (9~16廳) 機房環境指標 · 規範：室溫 20~24°C / 相對濕度 40~60% RH
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-[#12141c] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase">
              <tr>
                <th className="py-3 px-4">登記日期 / 班別</th>
                <th className="py-3 px-4">7F 機房溫濕度</th>
                <th className="py-3 px-4">8F 機房溫濕度</th>
                <th className="py-3 px-4">雷射機排風溫度</th>
                <th className="py-3 px-4">巡檢工程師</th>
                <th className="py-3 px-4">狀態核定</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {envLogs.map((log: any) => (
                <tr key={log.id} className="hover:bg-zinc-900/40">
                  <td className="py-3 px-4 font-mono font-bold text-zinc-200">
                    {log.date || '2026-10-10'} · {log.shift || '早班'}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {log.temp7F || 21.4}°C / {log.hum7F || 48}% RH
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {log.temp8F || 22.1}°C / {log.hum8F || 51}% RH
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-300">
                    {log.exhaustLaser || 36.2}°C
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {log.inspector || '放映組長-陳師傅'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      正常
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const LampsView: React.FC = () => {
  const halls = WENXIN_DATA.halls || [];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>放映機燈泡與雷射光源時數 (Lamp & Laser Hours)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Barco 4K雷射 / Christie 2K氙燈累積點火時數 · 預防性維護與更換警戒
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {halls.map((h: any) => {
          const isGiant = h.id === 1;
          const isLaser = isGiant || h.id % 2 !== 0;
          const currentHours = isGiant ? 6420 : 1200 + (h.id * 85);
          const maxHours = isLaser ? 20000 : 1800;
          const percent = Math.min(100, Math.round((currentHours / maxHours) * 100));

          return (
            <div
              key={h.id}
              className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-zinc-100 text-sm">
                  {h.name}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  isLaser
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {isLaser ? 'Laser 雷射' : 'Xenon 氙燈'}
                </span>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-zinc-400">當前累積時數:</span>
                  <span className="font-bold text-amber-300">{currentHours.toLocaleString()} 小時</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                  <span>建議壽命上限</span>
                  <span>{maxHours.toLocaleString()} 小時 ({percent}%)</span>
                </div>
              </div>

              <div className="text-[11px] text-emerald-400 font-mono pt-1 border-t border-zinc-800/80">
                ● 點火觸發正常 · 光輸出穩定
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RepairsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-rose-400" />
          <span>放映設備維修紀錄 (Maintenance & Repair Records)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          機房投影機、音效處理器、排風冷卻與伺服馬達維修工單
        </p>
      </div>

      <div className="p-8 text-center text-zinc-400 border border-dashed border-zinc-800 rounded-xl space-y-2 text-xs">
        <Wrench className="w-8 h-8 mx-auto text-zinc-600" />
        <div className="text-zinc-300 font-medium">目前無未結案之維修工單</div>
        <div>歷史維修已歸檔至後台備份庫，全廳設備運作正常</div>
      </div>
    </div>
  );
};

export const SuppliesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Package className="w-5 h-5 text-cyan-400" />
          <span>備品統計 (Spare Parts & Inventory)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          3D 主動/被動眼鏡、投影機空氣濾網、光纖跳線、音訊轉接頭安全庫存
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-1">
          <div className="text-zinc-400">3D 偏振眼鏡安全庫存</div>
          <div className="text-2xl font-bold text-cyan-400">1,250 支</div>
          <div className="text-[10px] text-emerald-400">庫存充裕 (巨幕廳專用)</div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-1">
          <div className="text-zinc-400">Barco 原廠防塵濾網</div>
          <div className="text-2xl font-bold text-amber-400">18 組</div>
          <div className="text-[10px] text-zinc-400">預計下次更換：2026-11</div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141c] space-y-1">
          <div className="text-zinc-400">Doremi 備用抽取式硬碟</div>
          <div className="text-2xl font-bold text-zinc-200">6 顆</div>
          <div className="text-[10px] text-emerald-400">RAID5 磁碟陣列備援就緒</div>
        </div>
      </div>
    </div>
  );
};

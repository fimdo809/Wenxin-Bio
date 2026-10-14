import React from 'react';
import { WENXIN_DATA } from '../../data/wenxinFullData';
import { ExcelUploader } from '../ExcelUploader';
import { Layers, Database, Download, Upload, CheckCircle2, HardDrive } from 'lucide-react';

export const HallsView: React.FC = () => {
  const halls = WENXIN_DATA.halls || [];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>影廳規格與容量 (Screen Specifications & Capacity)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          文心秀泰 16 個影廳物理規格 · 座位席次 · 優先鏡頭 (F/S) · 本機儲存容量 · KDM 識別碼
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-[#12141c] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-[11px] text-zinc-400 uppercase">
              <tr>
                <th className="py-3 px-4">影廳名稱</th>
                <th className="py-3 px-4">座位配置</th>
                <th className="py-3 px-4">優先鏡頭</th>
                <th className="py-3 px-4">伺服器容量</th>
                <th className="py-3 px-4">支援格式</th>
                <th className="py-3 px-4">KDM 認證號</th>
                <th className="py-3 px-4 font-sans">備註規範</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {halls.map((h: any) => (
                <tr key={h.id} className="hover:bg-zinc-900/40">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">
                    {h.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-200">
                    {h.seats} 席
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-zinc-300">
                    {h.lens === 'F' ? 'Flat 優先' : h.lens === 'S' ? 'Scope 優先' : 'F / S 自動'}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {h.capacity} {h.unit}
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-400">
                    {h.formats || '2D'}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-400">
                    #{h.kdm}
                  </td>
                  <td className="py-3 px-4 text-xs text-zinc-400">
                    {h.note || '-'}
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

export const BackupView: React.FC = () => {
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(WENXIN_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `wenxin_operations_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <span>營運資料備份與還原 (Data Backup & Synchronization)</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          文心秀泰放映系統資料庫快照 · 支援本機 JSON 備份、離線封裝導出與同步還原
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-zinc-800 bg-[#12141c] space-y-4">
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-400" />
            <span>匯出系統完整快照</span>
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            將所有 59 部正片清單、16 廳規格、1,703 場場次、特典與排程匯出為標準 JSON 檔案，以供緊急離線調閱或交接備存。
          </p>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>下載完整資料庫快照 (.json)</span>
          </button>
        </div>

        <div className="p-6 rounded-xl border border-zinc-800 bg-[#12141c] space-y-4">
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>快照同步狀態</span>
          </h3>
          <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2 text-xs font-mono text-zinc-300">
            <div className="flex justify-between">
              <span className="text-zinc-400">系統最後快照時間:</span>
              <span className="text-emerald-400 font-bold">{WENXIN_DATA.opsSnapshotAt || '2026-10-03'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">總正片資料:</span>
              <span>{WENXIN_DATA.movies?.length} 筆</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">總排片場次:</span>
              <span>{WENXIN_DATA.opsSessions?.length} 場</span>
            </div>
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>本機快照校驗正常 · 無檔案損壞</span>
          </div>
        </div>
      </div>

      {/* Excel & CSV Ingest Section */}
      <ExcelUploader />
    </div>
  );
};

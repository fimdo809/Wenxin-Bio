import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Table, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

interface ExcelUploaderProps {
  onDataParsed?: (sheetName: string, rows: any[]) => void;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onDataParsed }) => {
  const [fileName, setFileName] = useState<string>('');
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    setParseError('');
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      setParseError('僅支援 Excel (.xlsx, .xls) 或 CSV (.csv) 格式檔案');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const wb = XLSX.read(buffer, { type: 'array' });
        setWorkbook(wb);
        setSheetNames(wb.SheetNames);

        if (wb.SheetNames.length > 0) {
          const firstSheet = wb.SheetNames[0];
          setActiveSheet(firstSheet);
          const rawJson = XLSX.utils.sheet_to_json(wb.Sheets[firstSheet], { defval: '' });
          setSheetData(rawJson);
          if (onDataParsed) {
            onDataParsed(firstSheet, rawJson);
          }
        }
      } catch (err: any) {
        setParseError(`解析檔案失敗：${err.message || '未知格式錯誤'}`);
      }
    };

    reader.onerror = () => {
      setParseError('讀取檔案時發生錯誤');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSheetChange = (sheetName: string) => {
    if (!workbook) return;
    setActiveSheet(sheetName);
    const rawJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
    setSheetData(rawJson);
    if (onDataParsed) {
      onDataParsed(sheetName, rawJson);
    }
  };

  const columns = sheetData.length > 0 ? Object.keys(sheetData[0]).slice(0, 8) : [];

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100">
              Excel / CSV 營運試算表上傳解析 (Excel Data Ingest)
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              支援 .xlsx / .xls / .csv
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            可上傳影城每週排片表（WeeklySessionsbyScreen）、DCP 容量表或設備工單，由系統在瀏覽器本機即時解析
          </p>
        </div>

        {fileName && (
          <button
            onClick={() => {
              setFileName('');
              setSheetData([]);
              setSheetNames([]);
              setWorkbook(null);
            }}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>清除</span>
          </button>
        )}
      </div>

      {/* Drag & Drop Box */}
      {!fileName ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files.length > 0) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging 
              ? 'border-emerald-500 bg-emerald-500/10' 
              : 'border-zinc-700 bg-zinc-900/40 hover:border-emerald-500/60 hover:bg-zinc-900/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <Upload className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
          <div className="text-xs font-semibold text-zinc-200">
            點擊此處或將 Excel 檔案拖曳至此處
          </div>
          <div className="text-[11px] text-zinc-500 mt-1 font-mono">
            支援格式：Microsoft Excel (.xlsx, .xls) · 逗號分隔檔 (.csv)
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File details bar */}
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-zinc-100">{fileName}</span>
              <span className="text-[11px] text-zinc-400 font-mono">
                ({sheetData.length.toLocaleString()} 列資料)
              </span>
            </div>

            {/* Sheet Selector */}
            {sheetNames.length > 1 && (
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-zinc-400">工作表:</span>
                <div className="flex items-center gap-1">
                  {sheetNames.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSheetChange(s)}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        activeSheet === s
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                          : 'text-zinc-400 hover:text-zinc-200 bg-zinc-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Data Preview Table */}
          {sheetData.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Table className="w-3.5 h-3.5 text-zinc-500" />
                  <span>資料預覽 (顯示前 5 筆，共 {sheetData.length} 筆)：</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>已成功在瀏覽器端解析完成</span>
                </span>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 overflow-x-auto max-h-56">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 sticky top-0">
                    <tr>
                      <th className="py-2 px-3 text-zinc-500">#</th>
                      {columns.map((col) => (
                        <th key={col} className="py-2 px-3 whitespace-nowrap text-zinc-300">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {sheetData.slice(0, 5).map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-900/40">
                        <td className="py-1.5 px-3 text-zinc-500">{i + 1}</td>
                        {columns.map((col) => (
                          <td key={col} className="py-1.5 px-3 truncate max-w-xs">
                            {String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Parse Error Notification if any */}
      {parseError && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{parseError}</span>
        </div>
      )}
    </div>
  );
};

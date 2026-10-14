import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { WENXIN_DATA } from '../data/wenxinFullData';
import { 
  HardDrive, 
  Layers, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Sparkles, 
  Info,
  Server,
  Zap,
  ArrowUpDown
} from 'lucide-react';

interface MovieTmsStat {
  title: string;
  shortTitle: string;
  size: number;          // GB per package
  hallsCount: number;    // Number of halls ingested
  transferGb: number;    // size * hallsCount
  sessionsCount: number; // Scheduled sessions
  scheduleShare: number; // % of total sessions
  lens: string;
  sound: string;
}

interface TmsLoadChartProps {
  selectedDate?: string;
}

export const TmsLoadChart: React.FC<TmsLoadChartProps> = ({ selectedDate }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [chartMode, setChartMode] = useState<'dual' | 'donut'>('dual');
  const [sortBy, setSortBy] = useState<'transfer' | 'sessions'>('transfer');
  const [hoveredItem, setHoveredItem] = useState<MovieTmsStat | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Calculate stats from WENXIN_DATA
  const chartData = useMemo(() => {
    const movies = WENXIN_DATA.movies || [];
    const allSessions = WENXIN_DATA.opsSessions || [];
    
    // Filter sessions by selectedDate if provided, or use all sessions
    const relevantSessions = selectedDate && selectedDate !== 'all'
      ? allSessions.filter(s => s.date === selectedDate)
      : allSessions;

    const totalSessions = relevantSessions.length || 1;

    // Count sessions per movie
    const sessionCountMap: Record<string, number> = {};
    for (const s of relevantSessions) {
      const cleanTitle = s.title.trim();
      sessionCountMap[cleanTitle] = (sessionCountMap[cleanTitle] || 0) + 1;
    }

    // Merge with movies metadata
    const statMap: Record<string, MovieTmsStat> = {};

    // 1. Process from movies catalog
    for (const m of movies) {
      const title = m.title.trim();
      const size = Number(m.size) || 140;
      const hallsCount = Array.isArray(m.halls) && m.halls.length > 0 ? m.halls.length : 6;
      const transferGb = size * hallsCount;
      const sessions = sessionCountMap[title] || 0;
      const share = parseFloat(((sessions / totalSessions) * 100).toFixed(1));

      statMap[title] = {
        title,
        shortTitle: title.length > 7 ? title.slice(0, 6) + '…' : title,
        size,
        hallsCount,
        transferGb,
        sessionsCount: sessions,
        scheduleShare: share,
        lens: m.lens || 'Scope',
        sound: m.sound || '5.1'
      };
    }

    // 2. Also incorporate high-session movies that might have alternate title names
    for (const [sTitle, count] of Object.entries(sessionCountMap)) {
      if (!statMap[sTitle] && count >= 30) {
        const matchedMv = movies.find(m => m.title.includes(sTitle) || sTitle.includes(m.title));
        const size = matchedMv?.size || 145;
        const hallsCount = matchedMv?.halls?.length || 8;
        const transferGb = size * hallsCount;
        const share = parseFloat(((count / totalSessions) * 100).toFixed(1));

        statMap[sTitle] = {
          title: sTitle,
          shortTitle: sTitle.length > 7 ? sTitle.slice(0, 6) + '…' : sTitle,
          size,
          hallsCount,
          transferGb,
          sessionsCount: count,
          scheduleShare: share,
          lens: matchedMv?.lens || 'Flat',
          sound: matchedMv?.sound || '5.1'
        };
      }
    }

    let list = Object.values(statMap);

    // Sort
    if (sortBy === 'transfer') {
      list.sort((a, b) => b.transferGb - a.transferGb);
    } else {
      list.sort((a, b) => b.sessionsCount - a.sessionsCount);
    }

    // Top 8 movies for readability in D3 chart
    return list.slice(0, 8);
  }, [selectedDate, sortBy]);

  // Aggregate overview metrics
  const totals = useMemo(() => {
    const totalTransferGb = chartData.reduce((acc, cur) => acc + cur.transferGb, 0);
    const totalSessions = chartData.reduce((acc, cur) => acc + cur.sessionsCount, 0);
    const avgHalls = chartData.length > 0
      ? (chartData.reduce((acc, cur) => acc + cur.hallsCount, 0) / chartData.length).toFixed(1)
      : '0';
    const peakFilm = chartData[0];

    return {
      totalTransferGb,
      totalSessions,
      avgHalls,
      peakFilm
    };
  }, [chartData]);

  // D3 Rendering effect
  useEffect(() => {
    if (!svgRef.current || chartData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 760;
    const height = 280;
    const margin = { top: 25, right: 60, bottom: 45, left: 65 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if (chartMode === 'dual') {
      // Create defs for gradients
      const defs = svg.append('defs');
      
      const barGradient = defs.append('linearGradient')
        .attr('id', 'tmsBarGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      barGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#06b6d4')
        .attr('stop-opacity', 0.95);

      barGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#0284c7')
        .attr('stop-opacity', 0.4);

      const glowFilter = defs.append('filter')
        .attr('id', 'amberGlow')
        .attr('x', '-20%')
        .attr('y', '-20%')
        .attr('width', '140%')
        .attr('height', '140%');

      glowFilter.append('feGaussianBlur')
        .attr('stdDeviation', 2.5)
        .attr('result', 'coloredBlur');

      const feMerge = glowFilter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Scales
      const xScale = d3.scaleBand()
        .domain(chartData.map(d => d.shortTitle))
        .range([0, innerWidth])
        .padding(0.35);

      const maxTransfer = d3.max(chartData, d => d.transferGb) || 1000;
      const yLeftScale = d3.scaleLinear()
        .domain([0, maxTransfer * 1.15])
        .nice()
        .range([innerHeight, 0]);

      const maxShare = d3.max(chartData, d => d.scheduleShare) || 20;
      const yRightScale = d3.scaleLinear()
        .domain([0, Math.max(25, maxShare * 1.25)])
        .nice()
        .range([innerHeight, 0]);

      // Horizontal background grid lines
      g.append('g')
        .attr('class', 'grid')
        .call(
          d3.axisLeft(yLeftScale)
            .ticks(5)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
        )
        .selectAll('line')
        .attr('stroke', '#27272a')
        .attr('stroke-dasharray', '2,3')
        .attr('stroke-opacity', 0.6);

      g.select('.domain').remove(); // remove axis outer border

      // X Axis
      const xAxisG = g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSize(0));

      xAxisG.select('.domain').attr('stroke', '#3f3f46');
      xAxisG.selectAll('text')
        .attr('fill', '#a1a1aa')
        .attr('font-size', '11px')
        .attr('font-family', 'sans-serif')
        .attr('dy', '14px');

      // Left Y Axis (Transfer GB)
      const yLeftAxisG = g.append('g')
        .call(
          d3.axisLeft(yLeftScale)
            .ticks(5)
            .tickFormat(d => `${d}G`)
        );

      yLeftAxisG.select('.domain').remove();
      yLeftAxisG.selectAll('text')
        .attr('fill', '#06b6d4')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace');

      // Left Axis Label
      g.append('text')
        .attr('x', -innerHeight / 2)
        .attr('y', -48)
        .attr('transform', 'rotate(-90)')
        .attr('fill', '#06b6d4')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .text('TMS 傳輸分發量 (GB)');

      // Right Y Axis (Schedule Share %)
      const yRightAxisG = g.append('g')
        .attr('transform', `translate(${innerWidth},0)`)
        .call(
          d3.axisRight(yRightScale)
            .ticks(5)
            .tickFormat(d => `${d}%`)
        );

      yRightAxisG.select('.domain').remove();
      yRightAxisG.selectAll('text')
        .attr('fill', '#f59e0b')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace');

      // Right Axis Label
      g.append('text')
        .attr('x', innerHeight / 2)
        .attr('y', -innerWidth - 44)
        .attr('transform', 'rotate(90)')
        .attr('fill', '#f59e0b')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .text('排程佔比 (%)');

      // BARS: Ingest Transfer Volume
      const bars = g.selectAll('.bar')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.shortTitle) || 0)
        .attr('width', xScale.bandwidth())
        .attr('y', innerHeight)
        .attr('height', 0)
        .attr('rx', 4)
        .attr('fill', 'url(#tmsBarGradient)')
        .attr('stroke', '#0891b2')
        .attr('stroke-width', 1)
        .attr('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          setHoveredItem(d);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top - 12
            });
          }
        })
        .on('mousemove', (event) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top - 12
            });
          }
        })
        .on('mouseleave', () => {
          setHoveredItem(null);
        });

      // Animate bars opening
      bars.transition()
        .duration(650)
        .ease(d3.easeCubicOut)
        .attr('y', d => yLeftScale(d.transferGb))
        .attr('height', d => innerHeight - yLeftScale(d.transferGb));

      // LINE: Schedule Share %
      const lineGenerator = d3.line<MovieTmsStat>()
        .x(d => (xScale(d.shortTitle) || 0) + xScale.bandwidth() / 2)
        .y(d => yRightScale(d.scheduleShare))
        .curve(d3.curveMonotoneX);

      const path = g.append('path')
        .datum(chartData)
        .attr('fill', 'none')
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 2.5)
        .attr('filter', 'url(#amberGlow)')
        .attr('d', lineGenerator);

      // Path transition
      const totalLength = path.node()?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(850)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);

      // DOTS on line
      const dots = g.selectAll('.dot')
        .data(chartData)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => (xScale(d.shortTitle) || 0) + xScale.bandwidth() / 2)
        .attr('cy', d => yRightScale(d.scheduleShare))
        .attr('r', 0)
        .attr('fill', '#fef3c7')
        .attr('stroke', '#d97706')
        .attr('stroke-width', 2)
        .attr('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          setHoveredItem(d);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top - 12
            });
          }
        })
        .on('mouseleave', () => setHoveredItem(null));

      dots.transition()
        .delay(300)
        .duration(400)
        .attr('r', 4.5);

    } else {
      // DONUT CHART MODE: Storage Breakdown
      const radius = Math.min(innerWidth, innerHeight) / 2 + 10;
      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const colorScale = d3.scaleOrdinal<string>()
        .domain(chartData.map(d => d.title))
        .range([
          '#06b6d4', '#f59e0b', '#3b82f6', '#10b981', 
          '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
        ]);

      const pie = d3.pie<MovieTmsStat>()
        .value(d => d.transferGb)
        .sort(null);

      const arc = d3.arc<d3.PieArcDatum<MovieTmsStat>>()
        .innerRadius(radius * 0.58)
        .outerRadius(radius);

      const hoverArc = d3.arc<d3.PieArcDatum<MovieTmsStat>>()
        .innerRadius(radius * 0.55)
        .outerRadius(radius * 1.06);

      const arcs = g.selectAll('.arc')
        .data(pie(chartData))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colorScale(d.data.title))
        .attr('stroke', '#0c0d13')
        .attr('stroke-width', 2.5)
        .attr('cursor', 'pointer')
        .on('mouseenter', function(event, d) {
          d3.select(this)
            .transition()
            .duration(150)
            .attr('d', hoverArc as any);
          setHoveredItem(d.data);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top - 12
            });
          }
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(150)
            .attr('d', arc as any);
          setHoveredItem(null);
        });

      // Center Text
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-5px')
        .attr('fill', '#a1a1aa')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .text('TMS 傳輸總量');

      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '18px')
        .attr('fill', '#06b6d4')
        .attr('font-size', '15px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'monospace')
        .text(`${(totals.totalTransferGb / 1000).toFixed(1)} TB`);
    }
  }, [chartData, chartMode, totals]);

  return (
    <div 
      ref={containerRef}
      className="relative rounded-xl border border-zinc-800 bg-[#12141c] p-4 lg:p-5 space-y-4"
    >
      {/* Chart Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-zinc-100 tracking-tight">
              TMS 伺服器片源傳輸量與排程佔比 (D3.js Ingest & Load Analytics)
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              D3.js v7 Live
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            視覺化統計各部 DCP 在 16 影廳間的派發總傳輸量 (GB) 與排片負載，輔助放映師精確掌握機房頻寬與磁碟水位
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          {/* Sorting */}
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSortBy('transfer')}
              className={`px-2.5 py-1 rounded transition-colors text-[11px] font-mono ${
                sortBy === 'transfer'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="按傳輸總量 (GB) 排序"
            >
              傳輸量排序
            </button>
            <button
              onClick={() => setSortBy('sessions')}
              className={`px-2.5 py-1 rounded transition-colors text-[11px] font-mono ${
                sortBy === 'sessions'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="按排片場次數量排序"
            >
              場次排序
            </button>
          </div>

          {/* Mode Switch: Dual Bar vs Donut */}
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setChartMode('dual')}
              className={`p-1.5 rounded transition-colors ${
                chartMode === 'dual'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="雙軸長條/折線複合分析"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartMode('donut')}
              className={`p-1.5 rounded transition-colors ${
                chartMode === 'donut'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="磁碟佔比環形圖"
            >
              <PieChart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Badges Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
          <div className="text-[10px] text-zinc-400 flex items-center justify-between">
            <span>TMS 累計入庫傳輸量</span>
            <HardDrive className="w-3 h-3 text-cyan-400" />
          </div>
          <div className="text-base font-bold font-mono text-cyan-400 mt-0.5">
            {(totals.totalTransferGb / 1000).toFixed(2)} <span className="text-xs text-zinc-400">TB</span>
          </div>
          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
            共 {totals.totalTransferGb.toLocaleString()} GB 派發
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
          <div className="text-[10px] text-zinc-400 flex items-center justify-between">
            <span>最大負載片源</span>
            <Zap className="w-3 h-3 text-amber-400" />
          </div>
          <div className="text-xs font-bold text-zinc-100 truncate mt-1">
            {totals.peakFilm?.title || '惡靈古堡：爆發夜'}
          </div>
          <div className="text-[10px] font-mono text-amber-300 mt-0.5">
            {totals.peakFilm?.transferGb.toLocaleString()} GB ({totals.peakFilm?.hallsCount} 廳入庫)
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
          <div className="text-[10px] text-zinc-400 flex items-center justify-between">
            <span>平均單片派發廣度</span>
            <Layers className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
            {totals.avgHalls} <span className="text-xs text-zinc-400">廳/部</span>
          </div>
          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">全影城 16 廳伺服器</div>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
          <div className="text-[10px] text-zinc-400 flex items-center justify-between">
            <span>TMS 網路頻寬狀態</span>
            <Sparkles className="w-3 h-3 text-violet-400" />
          </div>
          <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>光纖千兆暢通</span>
          </div>
          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">無伺服器入庫壅塞</div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto overflow-y-hidden bg-zinc-950/60 rounded-xl border border-zinc-800/60 p-2 flex justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 760 280"
          className="w-full max-w-[760px] h-auto min-w-[580px] select-none"
        />

        {/* Legend */}
        <div className="absolute top-4 right-4 flex items-center gap-3 text-[11px] font-mono bg-zinc-900/85 px-2.5 py-1 rounded-md border border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm bg-cyan-500" />
            <span className="text-cyan-300">傳輸分發量 (GB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-300">排程佔比 (%)</span>
          </div>
        </div>

        {/* Floating Custom Tooltip */}
        {hoveredItem && (
          <div
            className="absolute z-30 pointer-events-none rounded-lg border border-cyan-500/40 bg-[#0f1118]/95 p-3 shadow-xl backdrop-blur-md transition-all duration-75 text-xs font-mono space-y-1.5"
            style={{
              left: `${Math.min(540, Math.max(10, tooltipPos.x + 15))}px`,
              top: `${Math.max(10, tooltipPos.y - 40)}px`
            }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-1.5">
              <span className="font-bold text-zinc-100 font-sans text-xs">
                {hoveredItem.title}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {hoveredItem.lens} · {hoveredItem.sound}
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-zinc-300">
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">DCP 封裝大小：</span>
                <span className="font-bold text-zinc-100">{hoveredItem.size} GB</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">已部署影廳數：</span>
                <span className="font-bold text-cyan-400">{hoveredItem.hallsCount} 廳伺服器</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">TMS 累計傳輸量：</span>
                <span className="font-bold text-cyan-300">{hoveredItem.transferGb.toLocaleString()} GB</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-zinc-800/80 pt-1">
                <span className="text-zinc-400">排片場次 (佔比)：</span>
                <span className="font-bold text-amber-400">
                  {hoveredItem.sessionsCount} 場 ({hoveredItem.scheduleShare}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Projectionist Ingest Advice Banner */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 font-mono">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>放映師提示：單廳入庫頻寬約 45MB/s，傳輸量 &gt; 1,500GB 之片源建議於清晨離峰時段由 TMS 自動下發。</span>
        </div>
        <span className="text-zinc-500 hidden md:inline">Doremi TMS / Barco Communicator 協議</span>
      </div>
    </div>
  );
};

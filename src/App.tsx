/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, ViewKey } from './components/Sidebar';
import { HeaderBar, LightingMode } from './components/HeaderBar';
import { AnalysisModal } from './components/AnalysisModal';

// All views strictly matching original site structure
import { DashboardView } from './components/views/DashboardView';
import { HandoverView } from './components/views/HandoverView';
import { SessionsView } from './components/views/SessionsView';
import { GiftsView } from './components/views/GiftsView';
import { SpecialsView } from './components/views/SpecialsView';
import { BookingsView } from './components/views/BookingsView';
import { MoviesView } from './components/views/MoviesView';
import { TrailersView } from './components/views/TrailersView';
import { AdsView, QaCardsView } from './components/views/AdsView';
import { PlansView, QcView, RulesView } from './components/views/PlansView';
import { EnvLogView, LampsView, RepairsView, SuppliesView } from './components/views/EnvLogView';
import { HallsView, BackupView } from './components/views/HallsView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewKey>('dashboard');
  const [lightingMode, setLightingMode] = useState<LightingMode>('dark-cinema');
  const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);

  // Dynamic optical theme styling
  const getLightingStyles = () => {
    switch (lightingMode) {
      case 'red-safety':
        return 'bg-[#0e0406] text-rose-100 selection:bg-rose-900 selection:text-rose-100 filter-[contrast(1.15)]';
      case 'daylight':
        return 'bg-[#181a22] text-zinc-100 selection:bg-amber-500/40 selection:text-white';
      case 'dark-cinema':
      default:
        return 'bg-[#090a0f] text-zinc-200 selection:bg-amber-500/30 selection:text-amber-200';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${getLightingStyles()}`}>
      {/* 650nm Red Safety Mode Warning Banner */}
      {lightingMode === 'red-safety' && (
        <div className="bg-rose-950/90 border-b border-rose-800 text-rose-200 px-4 py-1.5 text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>[650nm RED SAFETY ACTIVE] 放映室紅光夜視已啟用 · 防止放映孔溢光至影廳觀眾席 · 維持視網膜暗適應</span>
        </div>
      )}

      {/* Main Header Bar */}
      <HeaderBar
        lightingMode={lightingMode}
        onLightingModeChange={setLightingMode}
        onOpenAnalysis={() => setIsAnalysisOpen(true)}
      />

      {/* Body with Sidebar and Main Content */}
      <div className="flex-1 flex">
        {/* Navigation Sidebar (Strictly Categories 1~5) */}
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          onOpenAnalysis={() => setIsAnalysisOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden p-4 lg:p-8 max-w-7xl">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'handover' && <HandoverView />}
          {currentView === 'sessions' && <SessionsView />}
          {currentView === 'gifts' && <GiftsView />}
          {currentView === 'specials' && <SpecialsView />}
          {currentView === 'bookings' && <BookingsView />}
          {currentView === 'movies' && <MoviesView />}
          {currentView === 'trailers' && <TrailersView />}
          {currentView === 'ads' && <AdsView />}
          {currentView === 'qacards' && <QaCardsView />}
          {currentView === 'plans' && <PlansView />}
          {currentView === 'qc' && <QcView />}
          {currentView === 'rules' && <RulesView />}
          {currentView === 'env' && <EnvLogView />}
          {currentView === 'lamps' && <LampsView />}
          {currentView === 'repairs' && <RepairsView />}
          {currentView === 'supplies' && <SuppliesView />}
          {currentView === 'halls' && <HallsView />}
          {currentView === 'backup' && <BackupView />}
        </main>
      </div>

      {/* Professional Projectionist Analysis Modal */}
      <AnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
      />
    </div>
  );
}

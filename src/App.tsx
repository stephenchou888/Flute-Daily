import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PracticeTimer } from './components/PracticeTimer';
import { FingeringChart } from './components/FingeringChart';
import { Metronome } from './components/Metronome';
import { ToneDrone } from './components/ToneDrone';
import { RoutineLibrary } from './components/RoutineLibrary';
import { PracticeHistory } from './components/PracticeHistory';
import { MasterTips } from './components/MasterTips';
import { GithubDeployModal } from './components/GithubDeployModal';
import { getStoredLogs, calculateStreak } from './lib/storage';
import { PracticeLog } from './types/flute';
import { Music2, Github, Heart, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('timer');
  const [logs, setLogs] = useState<PracticeLog[]>([]);
  const [metronomeBpm, setMetronomeBpm] = useState<number>(90);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flute_daily_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('flute_daily_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('flute_daily_theme', 'light');
    }
  }, [isDarkMode]);

  // Load practice logs
  const refreshLogs = () => {
    const stored = getStoredLogs();
    setLogs(stored);
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  const streak = calculateStreak(logs);

  const handleSelectRoutineBpm = (bpm: number) => {
    setMetronomeBpm(bpm);
    setActiveTab('metronome');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-900 dark:selection:text-teal-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakCount={streak.currentStreak}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'timer' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <PracticeTimer onSessionLogged={refreshLogs} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Metronome initialBpm={metronomeBpm} compact />
              <ToneDrone />
            </div>
          </div>
        )}

        {activeTab === 'fingering' && (
          <div className="animate-in fade-in-50 duration-300">
            <FingeringChart />
          </div>
        )}

        {activeTab === 'metronome' && (
          <div className="max-w-3xl mx-auto animate-in fade-in-50 duration-300">
            <Metronome initialBpm={metronomeBpm} onBpmChange={setMetronomeBpm} />
          </div>
        )}

        {activeTab === 'drone' && (
          <div className="max-w-3xl mx-auto animate-in fade-in-50 duration-300">
            <ToneDrone />
          </div>
        )}

        {activeTab === 'routines' && (
          <div className="animate-in fade-in-50 duration-300">
            <RoutineLibrary onSelectRoutineBpm={handleSelectRoutineBpm} />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-in fade-in-50 duration-300">
            <PracticeHistory logs={logs} onLogsChanged={refreshLogs} />
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="animate-in fade-in-50 duration-300">
            <MasterTips />
          </div>
        )}
      </main>

      {/* GitHub Deployment Guide Modal */}
      <GithubDeployModal
        open={isDeployModalOpen}
        onOpenChange={setIsDeployModalOpen}
      />

      {/* Footer */}
      <footer className="border-t border-border/80 bg-muted/20 py-8 text-xs text-muted-foreground mt-12">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              <Music2 className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-foreground">Flute Daily</span>
            <span>— 长笛每日系统化练习助手</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="hover:text-teal-600 dark:hover:text-teal-400 font-medium cursor-pointer flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" /> GitHub Pages 编译发布
            </button>
            <span>•</span>
            <a
              href="https://stephenchou888.github.io/Saxophone-Daily/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1"
            >
              参考原型: Saxophone-Daily <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="text-[11px]">
            Made with <Heart className="h-3 w-3 inline text-red-500 fill-red-500" /> for Flute Players
          </div>
        </div>
      </footer>
    </div>
  );
}

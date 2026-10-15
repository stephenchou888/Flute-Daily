import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Flame,
  Sun,
  Moon,
  Github,
  Music2,
  Clock,
  Compass,
  Radio,
  BookOpen,
  BarChart2,
  Wind
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakCount: number;
  onOpenDeployModal: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
  onOpenDeployModal,
  isDarkMode,
  setIsDarkMode
}) => {
  const navItems = [
    { id: 'timer', label: '今日练习', icon: Clock },
    { id: 'fingering', label: '长笛指法', icon: Compass },
    { id: 'metronome', label: '数字节拍器', icon: Music2 },
    { id: 'drone', label: '校音长音', icon: Radio },
    { id: 'routines', label: '练习宝典', icon: BookOpen },
    { id: 'history', label: '日志打卡', icon: BarChart2 },
    { id: 'tips', label: '大师要诀', icon: Wind },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div
          onClick={() => setActiveTab('timer')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
            <Music2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-foreground font-mono">
                Flute Daily
              </span>
              <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.2 rounded-sm border border-teal-500/20">
                长笛每日助手
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground block -mt-0.5">
              专业伯姆长笛练习与打卡
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-background text-teal-600 dark:text-teal-400 font-bold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side items: Streak, Github, Theme */}
        <div className="flex items-center gap-2">
          {/* Streak pill */}
          <div
            title={`连续练习 ${streakCount} 天`}
            onClick={() => setActiveTab('history')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-semibold cursor-pointer hover:bg-orange-500/15 transition-colors"
          >
            <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span className="font-mono">{streakCount}</span>
            <span className="hidden sm:inline text-[11px] font-normal">天连击</span>
          </div>

          {/* GitHub Deployment guide button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenDeployModal}
            className="hidden sm:flex items-center gap-1.5 text-xs h-9 border-border"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub 部署</span>
          </Button>

          {/* Dark Mode toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Scrollbar */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-border/40 bg-muted/20 scrollbar-none">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

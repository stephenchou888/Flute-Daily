import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Flame,
  Sun,
  Moon,
  Github,
  Music2,
  Music,
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
    { id: 'scales', label: '音阶练习', icon: Music },
    { id: 'metronome', label: '数字节拍器', icon: Music2 },
    { id: 'drone', label: '校音长音', icon: Radio },
    { id: 'routines', label: '练习宝典', icon: BookOpen },
    { id: 'history', label: '日志打卡', icon: BarChart2 },
    { id: 'tips', label: '大师要诀', icon: Wind },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-2 px-4 sm:px-8">
        {/* Logo & Brand */}
        <div
          onClick={() => setActiveTab('timer')}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground transition-colors group-hover:bg-primary/90">
            <Music2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="whitespace-nowrap font-semibold text-[15px] tracking-tight text-foreground font-sans">
                Flute Daily
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold text-brand-strong dark:text-brand-400 bg-brand/10 px-1.5 py-0.2 rounded-sm border border-brand/20">
                长笛每日助手
              </span>
            </div>
            <span className="block whitespace-nowrap text-[10px] text-muted-foreground -mt-0.5">
              专业伯姆长笛练习与打卡
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden 2xl:flex flex-nowrap items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-background text-foreground font-semibold shadow-xs'
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
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
          {/* Streak pill */}
          <div
            title={`连续练习 ${streakCount} 天`}
            onClick={() => setActiveTab('history')}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full bg-brand/10 border border-brand/25 text-brand-strong dark:text-brand-400 text-xs font-semibold cursor-pointer hover:bg-brand/15 transition-colors"
          >
            <Flame className="h-4 w-4 fill-brand text-brand" />
            <span className="font-mono">{streakCount}</span>
            <span className="hidden whitespace-nowrap text-[11px] font-normal sm:inline">天连击</span>
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
      <div className="2xl:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-border/40 bg-muted/20 scrollbar-none sm:px-8">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex shrink-0 items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold'
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

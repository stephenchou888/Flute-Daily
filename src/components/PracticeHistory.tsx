import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input, Textarea } from './ui/input';
import { PracticeLog, PracticeCategory } from '@/types/flute';
import {
  getStoredLogs,
  saveStoredLogs,
  addPracticeLog,
  deletePracticeLog,
  calculateStreak,
  exportDataAsJSON,
  importDataFromJSON
} from '@/lib/storage';
import {
  Flame,
  Clock,
  Calendar,
  Trophy,
  Download,
  Upload,
  Plus,
  Trash2,
  Star,
  BookOpen,
  CheckCircle,
  BarChart2
} from 'lucide-react';

interface PracticeHistoryProps {
  logs: PracticeLog[];
  onLogsChanged: () => void;
}

const CATEGORY_LABELS: Record<PracticeCategory, { label: string; color: string }> = {
  long_tone: { label: '长音与音色', color: 'bg-brand/15 text-brand-strong dark:text-brand-300' },
  harmonics: { label: '泛音与口风', color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  scales: { label: '音阶与琶音', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-300' },
  articulation: { label: '吐音与运舌', color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
  flexibility: { label: '手指机能', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-300' },
  etudes: { label: '练习曲', color: 'bg-rose-500/15 text-rose-700 dark:text-rose-300' },
  repertoire: { label: '独奏曲目', color: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300' },
};

export const PracticeHistory: React.FC<PracticeHistoryProps> = ({ logs, onLogsChanged }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Manual log form
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formDuration, setFormDuration] = useState(45);
  const [formRating, setFormRating] = useState(5);
  const [formBpm, setFormBpm] = useState(108);
  const [formPiece, setFormPiece] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formCategories, setFormCategories] = useState<PracticeCategory[]>(['long_tone', 'scales']);

  // Analytics calculation
  const streak = useMemo(() => calculateStreak(logs), [logs]);

  const totalMinutes = useMemo(() => {
    return logs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [logs]);

  const thisWeekMinutes = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];

    return logs
      .filter(l => l.date >= startOfWeekStr)
      .reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [logs]);

  // Category breakdown calculation
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(log => {
      log.categories.forEach(cat => {
        counts[cat] = (counts[cat] || 0) + log.durationMinutes;
      });
    });
    return counts;
  }, [logs]);

  // Heatmap generation (Past 12 weeks / ~84 days)
  const heatmapDays = useMemo(() => {
    const days = [];
    const today = new Date();
    // 84 days back
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLogs = logs.filter(l => l.date === dateStr);
      const dayMinutes = dayLogs.reduce((sum, item) => sum + item.durationMinutes, 0);
      days.push({
        date: dateStr,
        dayOfWeek: d.getDay(),
        minutes: dayMinutes,
        count: dayLogs.length
      });
    }
    return days;
  }, [logs]);

  const filteredLogs = useMemo(() => {
    if (filterCategory === 'all') return logs;
    return logs.filter(l => l.categories.includes(filterCategory as PracticeCategory));
  }, [logs, filterCategory]);

  const handleExport = () => {
    const json = exportDataAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flute-daily-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const success = importDataFromJSON(text);
      if (success) {
        onLogsChanged();
        alert('练习数据恢复成功！');
      } else {
        alert('文件格式错误，未能导入数据。');
      }
    };
    reader.readAsText(file);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条练习记录吗？')) {
      deletePracticeLog(id);
      onLogsChanged();
    }
  };

  const handleManualAdd = () => {
    addPracticeLog({
      date: formDate,
      startTime: '12:00',
      durationMinutes: formDuration,
      categories: formCategories.length > 0 ? formCategories : ['long_tone'],
      bpmAchieved: formBpm || undefined,
      rating: formRating,
      notes: formNotes || '长笛每日练习记录',
      etudeOrPiece: formPiece || undefined
    });
    setIsAddDialogOpen(false);
    onLogsChanged();
  };

  return (
    <div className="space-y-6">
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <Card className="p-4 border-border bg-card flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium block">连续练习</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold font-mono text-foreground">{streak.currentStreak}</span>
              <span className="text-xs text-muted-foreground">天</span>
            </div>
            <span className="text-[10px] text-muted-foreground">最高纪录: {streak.longestStreak} 天</span>
          </div>
        </Card>

        {/* Total Time */}
        <Card className="p-4 border-border bg-card flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-xl bg-brand/10 text-brand-strong dark:text-brand-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium block">累计总时长</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold font-mono text-foreground">
                {(totalMinutes / 60).toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">小时</span>
            </div>
            <span className="text-[10px] text-muted-foreground">共 {logs.length} 次练习</span>
          </div>
        </Card>

        {/* This Week */}
        <Card className="p-4 border-border bg-card flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium block">本周已练</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold font-mono text-foreground">{thisWeekMinutes}</span>
              <span className="text-xs text-muted-foreground">分钟</span>
            </div>
            <span className="text-[10px] text-muted-foreground">约 {(thisWeekMinutes / 60).toFixed(1)} 小时</span>
          </div>
        </Card>

        {/* Average Rating */}
        <Card className="p-4 border-border bg-card flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium block">状态均分</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold font-mono text-foreground">
                {logs.length > 0
                  ? (logs.reduce((sum, l) => sum + l.rating, 0) / logs.length).toFixed(1)
                  : '5.0'}
              </span>
              <span className="text-xs text-muted-foreground">/ 5 星</span>
            </div>
            <span className="text-[10px] text-muted-foreground">自我状态评测</span>
          </div>
        </Card>
      </div>

      {/* GitHub-style Practice Heatmap */}
      <Card className="border-border bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-brand-strong dark:text-brand-400" />
              练习热力日历 (最近 12 周)
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              绿色深浅代表每日练习时长，持之以恒见证音色蜕变
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground self-end sm:self-auto">
            <span>较少</span>
            <span className="w-3 h-3 rounded-xs bg-muted border border-border" />
            <span className="w-3 h-3 rounded-xs bg-brand-200 dark:bg-brand-950" />
            <span className="w-3 h-3 rounded-xs bg-brand-400 dark:bg-brand-700" />
            <span className="w-3 h-3 rounded-xs bg-brand-strong dark:bg-brand" />
            <span>较多</span>
          </div>
        </div>

        {/* Grid cells */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-max p-1">
            {heatmapDays.map((d, idx) => {
              let bg = 'bg-muted/70';
              if (d.minutes > 60) bg = 'bg-brand-strong dark:bg-brand';
              else if (d.minutes >= 40) bg = 'bg-brand dark:bg-brand-strong';
              else if (d.minutes >= 20) bg = 'bg-brand-300 dark:bg-brand-800';
              else if (d.minutes > 0) bg = 'bg-brand-200 dark:bg-brand-950';

              return (
                <div
                  key={idx}
                  title={`${d.date} : 练习 ${d.minutes} 分钟 (${d.count} 次)`}
                  className={`w-3.5 h-3.5 rounded-xs transition-all hover:ring-2 hover:ring-brand-400 cursor-pointer ${bg}`}
                />
              );
            })}
          </div>
        </div>
      </Card>

      {/* Category Breakdown Progress */}
      <Card className="border-border bg-card shadow-sm p-6">
        <h4 className="font-semibold text-foreground text-sm mb-3">各练习模块时间分配</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(CATEGORY_LABELS) as PracticeCategory[]).map(catKey => {
            const minutes = categoryStats[catKey] || 0;
            const percent = totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;
            const meta = CATEGORY_LABELS[catKey];
            return (
              <div key={catKey} className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <span className="text-xs text-muted-foreground block truncate">{meta.label}</span>
                <span className="text-lg font-bold font-mono text-foreground mt-0.5 block">
                  {minutes} <span className="text-[10px] font-normal text-muted-foreground">分</span>
                </span>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-brand h-1.5 rounded-full" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* History Log Table & Action Bar */}
      <Card className="border-border bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-strong dark:text-brand-400" />
            <h3 className="font-semibold text-foreground text-base">详细练习流水账与反思</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddDialogOpen(true)}
              className="text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> 补录记录
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="text-xs"
            >
              <Download className="h-3.5 w-3.5 mr-1" /> 导出备份 (JSON)
            </Button>

            <label className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted cursor-pointer transition-colors">
              <Upload className="h-3.5 w-3.5 mr-1" /> 导入恢复
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {/* Category Filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-brand text-brand-foreground font-semibold'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            全部 ({logs.length})
          </button>
          {(Object.keys(CATEGORY_LABELS) as PracticeCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-brand text-brand-foreground font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {CATEGORY_LABELS[cat].label}
            </button>
          ))}
        </div>

        {/* Logs List */}
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            暂无相关练习打卡记录，点击“开始练习”开启你的长笛之旅！
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {filteredLogs.map(log => (
              <div key={log.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-sm text-foreground">{log.date}</span>
                    <Badge variant="brand">{log.durationMinutes} 分钟</Badge>
                    {log.bpmAchieved && (
                      <Badge variant="outline" className="font-mono text-xs">
                        🚀 {log.bpmAchieved} BPM
                      </Badge>
                    )}
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: log.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {log.etudeOrPiece && (
                    <div className="text-xs font-semibold text-brand-strong dark:text-brand-400">
                      🎼 曲目/练习：{log.etudeOrPiece}
                    </div>
                  )}

                  <p className="text-xs text-foreground/90 leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/40">
                    {log.notes}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {log.categories.map(cat => (
                      <span
                        key={cat}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${CATEGORY_LABELS[cat]?.color || 'bg-muted text-muted-foreground'}`}
                      >
                        {CATEGORY_LABELS[cat]?.label || cat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-muted-foreground hover:text-red-500 p-1.5 transition-colors cursor-pointer self-end sm:self-start"
                  title="删除记录"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Manual Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogHeader>
          <DialogTitle>补录长笛练习记录</DialogTitle>
          <DialogDescription>手动登记之前的脱机练习记录或补充心得</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">日期</label>
              <Input
                type="date"
                value={formDate}
                onChange={e => setFormDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">时长 (分钟)</label>
              <Input
                type="number"
                min={5}
                max={360}
                value={formDuration}
                onChange={e => setFormDuration(parseInt(e.target.value) || 30)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">练习曲目 / 章节</label>
            <Input
              placeholder="例如：Taffanel EJ4 / 柯勒练习曲 / 莫扎特协奏曲"
              value={formPiece}
              onChange={e => setFormPiece(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">练习分类 (多选)</label>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(CATEGORY_LABELS) as PracticeCategory[]).map(cat => {
                const isSelected = formCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setFormCategories(prev =>
                        isSelected ? prev.filter(c => c !== cat) : [...prev, cat]
                      );
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border cursor-pointer ${
                      isSelected
                        ? 'bg-brand text-brand-foreground border-brand'
                        : 'bg-muted/50 border-border text-foreground'
                    }`}
                  >
                    {CATEGORY_LABELS[cat].label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">练习笔记 / 心得感悟</label>
            <Textarea
              rows={3}
              placeholder="记录呼吸、音色、指法转换等要点..."
              value={formNotes}
              onChange={e => setFormNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
          <Button variant="default" onClick={handleManualAdd}>保存补录</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

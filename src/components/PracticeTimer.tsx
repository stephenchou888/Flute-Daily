import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input, Textarea } from './ui/input';
import { PRACTICE_ROUTINES } from '@/data/routineData';
import { ExerciseItem, PracticeCategory } from '@/types/flute';
import { addPracticeLog } from '@/lib/storage';
import { Play, Pause, CheckCircle2, Circle, Clock, Flame, Star, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeTimerProps {
  onSessionLogged?: () => void;
}

export const PracticeTimer: React.FC<PracticeTimerProps> = ({ onSessionLogged }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);

  // Form states for log dialog
  const [durationInput, setDurationInput] = useState<number>(30);
  const [rating, setRating] = useState<number>(5);
  const [bpmAchieved, setBpmAchieved] = useState<number>(100);
  const [etudeOrPiece, setEtudeOrPiece] = useState<string>('Taffanel & Gaubert EJ4');
  const [reflectionNotes, setReflectionNotes] = useState<string>('');

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleCheckItem = (id: string) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenLogModal = () => {
    setIsRunning(false);
    const minutes = Math.max(1, Math.round(elapsedSeconds / 60));
    setDurationInput(minutes);
    setIsLogDialogOpen(true);
  };

  const handleSaveLog = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Get checked categories
    const checkedCategories: PracticeCategory[] = Array.from(
      new Set(
        completedItems
          .map(id => PRACTICE_ROUTINES.find(r => r.id === id)?.category)
          .filter(Boolean) as PracticeCategory[]
      )
    );

    addPracticeLog({
      date: dateStr,
      startTime: timeStr,
      durationMinutes: durationInput,
      categories: checkedCategories.length > 0 ? checkedCategories : ['long_tone', 'scales'],
      bpmAchieved: bpmAchieved || undefined,
      rating,
      notes: reflectionNotes || '今日长笛例行练习完成，音色与发音状态良好。',
      etudeOrPiece: etudeOrPiece || undefined
    });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsLogDialogOpen(false);
    setElapsedSeconds(0);
    setCompletedItems([]);
    setReflectionNotes('');

    if (onSessionLogged) {
      onSessionLogged();
    }
  };

  return (
    <div className="space-y-4">
      {/* Timer & Live Status Card */}
      <Card className="border-border bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-strong dark:text-brand-400" />
              <h3 className="font-semibold text-foreground text-lg">实时练习计时器 & 练习清单</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              记录每项基本功完成进度，练习结束即可一键写入每日打卡日志
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isRunning ? 'success' : 'secondary'} className="px-3 py-1">
              {isRunning ? '● 正在专注练习' : '○ 已暂停'}
            </Badge>
          </div>
        </div>

        {/* Big Digital Clock Display */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div className="text-6xl sm:text-7xl font-mono font-black tracking-tight text-foreground">
            {formatTime(elapsedSeconds)}
          </div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2 font-medium">
            已练习时间 (分:秒)
          </span>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-6">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              size="lg"
              className="min-w-[150px] shadow-sm"
              variant={isRunning ? 'secondary' : 'default'}
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5 mr-1" /> 暂停休息
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-1" /> 开始练习
                </>
              )}
            </Button>

            <Button
              onClick={handleOpenLogModal}
              size="lg"
              variant="success"
              className="font-semibold shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 mr-1" /> 完成并打卡
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setIsRunning(false);
                setElapsedSeconds(0);
              }}
              className="text-xs"
            >
              重置
            </Button>
          </div>
        </div>
      </Card>

      {/* Routine Interactive Checklist */}
      <Card className="border-border bg-card shadow-sm p-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <h4 className="font-semibold text-foreground text-base flex items-center gap-2">
            <span>今日练习计划勾选清单</span>
            <span className="text-xs font-normal text-muted-foreground">
              (已完成 {completedItems.length} / {PRACTICE_ROUTINES.length} 项)
            </span>
          </h4>
          <span className="text-xs text-brand-strong dark:text-brand-400 font-medium">
            点击项目可标记完成
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRACTICE_ROUTINES.map(routine => {
            const isDone = completedItems.includes(routine.id);
            return (
              <div
                key={routine.id}
                onClick={() => toggleCheckItem(routine.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isDone
                    ? 'bg-brand/10 border-brand/40 text-foreground'
                    : 'bg-card border-border hover:border-brand/40 hover:bg-muted/40'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5 text-brand-strong dark:text-brand-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-sm font-semibold truncate ${isDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {routine.title}
                    </span>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {routine.durationMinutes} 分钟
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {routine.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Log Dialog */}
      <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-strong" />
            保存今日练习记录
          </DialogTitle>
          <DialogDescription>
            练习心得与数据将永久保存在浏览器中，支持随时导出与统计分析
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Duration */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              练习时长 (分钟)
            </label>
            <Input
              type="number"
              min={1}
              max={360}
              value={durationInput}
              onChange={e => setDurationInput(parseInt(e.target.value) || 1)}
            />
          </div>

          {/* Repertoire / Etude */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              练习曲目 / 教材
            </label>
            <Input
              value={etudeOrPiece}
              onChange={e => setEtudeOrPiece(e.target.value)}
              placeholder="例如：Taffanel EJ4 / 莫扎特协奏曲 / Andersen Op.33"
            />
          </div>

          {/* Achieved BPM */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              今日突破最高速度 (BPM)
            </label>
            <Input
              type="number"
              min={40}
              max={240}
              value={bpmAchieved}
              onChange={e => setBpmAchieved(parseInt(e.target.value) || 60)}
            />
          </div>

          {/* Self-Rating */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
              今日自我评价 (音色、节奏与专注度)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`h-7 w-7 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-medium text-muted-foreground ml-2">
                {rating === 5 ? '🌟 超常发挥' : rating === 4 ? '✨ 良好顺畅' : rating === 3 ? '👌 正常完成' : '💪 仍需精进'}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              练习笔记与反思心得
            </label>
            <Textarea
              rows={3}
              placeholder="写下今天的收获，如气流角度、双吐清晰度、高音发音阻力等..."
              value={reflectionNotes}
              onChange={e => setReflectionNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsLogDialogOpen(false)}>
            取消
          </Button>
          <Button variant="default" onClick={handleSaveLog}>
            确认保存打卡
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

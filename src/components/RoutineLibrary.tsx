import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PRACTICE_ROUTINES } from '@/data/routineData';
import { ExerciseItem, PracticeCategory } from '@/types/flute';
import { BookOpen, Sparkles, Check, Play, Music2, Target } from 'lucide-react';

interface RoutineLibraryProps {
  onSelectRoutineBpm?: (bpm: number) => void;
}

export const RoutineLibrary: React.FC<RoutineLibraryProps> = ({ onSelectRoutineBpm }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部核心模块' },
    { id: 'long_tone', label: '1. 长音音色 (Moyse)' },
    { id: 'harmonics', label: '2. 泛音灵活性' },
    { id: 'scales', label: '3. 音阶琶音 (T&G)' },
    { id: 'articulation', label: '4. 吐音技巧 (双吐)' },
    { id: 'flexibility', label: '5. 手指机能' },
    { id: 'etudes', label: '6. 练习曲与曲目' },
  ];

  const filtered = selectedCategory === 'all'
    ? PRACTICE_ROUTINES
    : PRACTICE_ROUTINES.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            长笛每日系统化练习宝典
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            源自莫伊斯 (Moyse)、塔法内尔-高伯特 (T&G)、赖歇特等巴黎音乐学院学派百年典范
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === cat.id
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs font-semibold'
                : 'bg-card border-border hover:bg-muted text-foreground'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <Card key={item.id} className="border-border bg-card shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between gap-2">
                <Badge variant="teal">{item.composerOrSource}</Badge>
                <span className="text-xs font-mono font-semibold text-muted-foreground">
                  ⏱️ 建议 {item.durationMinutes} 分钟
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mt-3">
                {item.title}
              </h3>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-0.5">
                {item.subtitle}
              </p>

              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Notation preview */}
              {item.sampleSheetNotation && (
                <div className="mt-4 p-2.5 rounded-lg bg-muted/60 border border-border/80 font-mono text-[11px] text-foreground/90 overflow-x-auto">
                  <span className="text-muted-foreground text-[10px] block mb-0.5 font-sans font-medium">
                    🎵 谱例/指法模式：
                  </span>
                  {item.sampleSheetNotation}
                </div>
              )}

              {/* Key Technique Points */}
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> 核心练习要领:
                </span>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {item.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-500 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer with target BPM and quick metronome launcher */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">
                  目标速度: {item.defaultBpm} - {item.targetBpm} BPM
                </span>
              </div>

              {onSelectRoutineBpm && item.defaultBpm && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectRoutineBpm(item.defaultBpm!)}
                  className="text-xs h-8"
                >
                  <Play className="h-3 w-3 mr-1" /> 同步至节拍器 ({item.defaultBpm})
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

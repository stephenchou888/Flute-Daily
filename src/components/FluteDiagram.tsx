import React, { useState } from 'react';
import { FluteFingering } from '@/types/flute';
import { RealisticFluteSvg } from './RealisticFluteSvg';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Check, Info, Sparkles, HelpCircle } from 'lucide-react';

interface FluteDiagramProps {
  fingering: FluteFingering;
  className?: string;
  compact?: boolean;
}

export const FluteDiagram: React.FC<FluteDiagramProps> = ({
  fingering,
  className,
  compact = false
}) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const { keys } = fingering;

  // Single key status card in the associated lower guide
  const FingerKeyCard = ({
    active,
    keyName,
    fingerLabel,
    keyRole,
    handType = 'lh',
    isSpecial = false,
  }: {
    active: boolean;
    keyName: string;
    fingerLabel: string;
    keyRole: string;
    handType?: 'lh' | 'rh' | 'trill';
    isSpecial?: boolean;
  }) => {
    const isHovered = hoveredKey === keyName;

    return (
      <div
        onMouseEnter={() => setHoveredKey(keyName)}
        onMouseLeave={() => setHoveredKey(null)}
        className={cn(
          'flex flex-col items-center justify-between p-2.5 rounded-xl border text-center transition-all duration-200 select-none cursor-pointer',
          active
            ? 'bg-brand/10 border-brand/60 shadow-xs shadow-brand/15'
            : 'bg-card/70 border-border/80 hover:bg-muted/50 text-muted-foreground',
          isHovered && 'ring-2 ring-brand/50 scale-102 bg-brand/15'
        )}
      >
        {/* Status Indicator circle */}
        <div className="relative flex items-center justify-center mb-1.5">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all border',
              active
                ? 'bg-brand text-brand-foreground border-brand shadow-md shadow-brand/30'
                : 'bg-muted border-slate-300 dark:border-slate-700 text-muted-foreground'
            )}
          >
            {active ? <Check className="h-4 w-4 stroke-[3]" /> : '○'}
          </div>
        </div>

        {/* Finger and Key Name */}
        <div className="w-full">
          <span
            className={cn(
              'text-[11px] font-bold block leading-tight truncate',
              active ? 'text-brand-strong dark:text-brand-300' : 'text-foreground'
            )}
          >
            {fingerLabel}
          </span>
          <span className="text-[10px] text-muted-foreground block leading-tight mt-0.5 truncate">
            {keyRole}
          </span>
        </div>

        {/* State Tag */}
        <span
          className={cn(
            'mt-2 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide',
            active
              ? 'bg-brand text-brand-foreground'
              : 'bg-muted text-muted-foreground/80'
          )}
        >
          {active ? '按下闭合' : '放开'}
        </span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-border bg-gradient-to-b from-card via-card to-muted/20 p-4 sm:p-6 shadow-sm overflow-hidden space-y-6',
        className
      )}
    >
      {/* Top bar info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-strong dark:text-brand-400">
            实物长笛图例与指法映射 (Boehm System)
          </span>
          {fingering.isAlternate && (
            <Badge variant="amber" className="text-[10px]">
              备用指法
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand inline-block shadow-xs" />
            <span>绿亮 = 按下闭孔</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
            <span>银白 = 放开放气</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. ACTUAL REALISTIC FLUTE DISPLAY                       */}
      {/* ======================================================== */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-border/80 p-3 sm:p-5 shadow-xs">
        <div className="text-[11px] font-semibold text-muted-foreground mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="text-brand-strong dark:text-brand-400 font-bold">✨ 纯银伯姆长笛 (Boehm Concert Flute) 实物图解</span>
            <span className="text-[10px] text-muted-foreground">• 法式尖头开孔按键系统</span>
          </div>
          <span className="text-[10px] bg-brand/10 text-brand-strong dark:text-brand-300 px-2 py-0.5 rounded-full font-medium">
            鼠标悬停按键可预览指位联动
          </span>
        </div>

        <RealisticFluteSvg
          fingering={fingering}
          activeKeyHover={hoveredKey}
          onKeyHover={setHoveredKey}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. ASSOCIATED FINGERING DIAGRAM (下方关联指法图解)      */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <span>👇 下方关联指法操作图解 (手位分工)</span>
          </h4>
          <span className="text-[11px] text-muted-foreground font-mono">
            {fingering.displayName} • {fingering.solfege}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* 2.1 Left Hand Section (左手手位) - 5 Cols */}
          <div className="md:col-span-6 bg-muted/30 dark:bg-slate-900/40 rounded-xl border border-border/70 p-3">
            <div className="text-xs font-bold text-brand-strong dark:text-brand-400 mb-2.5 flex items-center justify-between">
              <span>左手手位 (Left Hand)</span>
              <span className="text-[10px] font-normal text-muted-foreground">控制主管上半段</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <FingerKeyCard
                active={keys.thumbB}
                keyName="thumbB"
                fingerLabel="左拇指"
                keyRole="B 圆形键"
                handType="lh"
              />
              <FingerKeyCard
                active={keys.thumbBb}
                keyName="thumbBb"
                fingerLabel="左拇指"
                keyRole="Bb 杠杆"
                handType="lh"
                isSpecial
              />
              <FingerKeyCard
                active={keys.lh1}
                keyName="lh1"
                fingerLabel="左食指 1"
                keyRole="C 键盖"
                handType="lh"
              />
              <FingerKeyCard
                active={keys.lh2}
                keyName="lh2"
                fingerLabel="左中指 2"
                keyRole="A 键盖"
                handType="lh"
              />
              <FingerKeyCard
                active={keys.lh3}
                keyName="lh3"
                fingerLabel="左无名 3"
                keyRole="G 键盖"
                handType="lh"
              />
            </div>

            {/* Left Pinky G# */}
            <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between px-1">
              <span className="text-[11px] text-muted-foreground">左小指侧键：</span>
              <div
                onMouseEnter={() => setHoveredKey('lhGSharp')}
                onMouseLeave={() => setHoveredKey(null)}
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all',
                  keys.lhGSharp
                    ? 'bg-brand text-brand-foreground border-brand shadow-xs'
                    : 'bg-card border-border text-muted-foreground hover:bg-muted'
                )}
              >
                <span>小指 G# 键</span>
                <span className="font-bold">{keys.lhGSharp ? '【按下】' : '【放开】'}</span>
              </div>
            </div>
          </div>

          {/* 2.2 Right Hand Section (右手手位) - 6 Cols */}
          <div className="md:col-span-6 bg-muted/30 dark:bg-slate-900/40 rounded-xl border border-border/70 p-3">
            <div className="text-xs font-bold text-brand-strong dark:text-brand-400 mb-2.5 flex items-center justify-between">
              <span>右手手位 (Right Hand)</span>
              <span className="text-[10px] font-normal text-muted-foreground">控制主管下半段与尾管</span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              <FingerKeyCard
                active={keys.rh1}
                keyName="rh1"
                fingerLabel="右食指 1"
                keyRole="F 键盖"
                handType="rh"
              />
              <FingerKeyCard
                active={keys.rh2}
                keyName="rh2"
                fingerLabel="右中指 2"
                keyRole="E 键盖"
                handType="rh"
              />
              <FingerKeyCard
                active={keys.rh3}
                keyName="rh3"
                fingerLabel="右无名 3"
                keyRole="D 键盖"
                handType="rh"
              />
              <FingerKeyCard
                active={keys.rhEb}
                keyName="rhEb"
                fingerLabel="右小指"
                keyRole="Eb 支撑键"
                handType="rh"
                isSpecial
              />
              <FingerKeyCard
                active={keys.rhLowCs}
                keyName="rhLowCs"
                fingerLabel="右小指"
                keyRole="低音 C#"
                handType="rh"
                isSpecial
              />
              <FingerKeyCard
                active={keys.rhLowC}
                keyName="rhLowC"
                fingerLabel="右小指"
                keyRole="低音 C"
                handType="rh"
                isSpecial
              />
            </div>

            {/* Trill Keys row if present */}
            <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between px-1">
              <span className="text-[11px] text-muted-foreground">右手食中指旁颤音键：</span>
              <div className="flex gap-2">
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-medium border',
                    keys.trill1
                      ? 'bg-brand text-brand-foreground border-brand'
                      : 'bg-card border-border text-muted-foreground'
                  )}
                >
                  Trill 1: {keys.trill1 ? '按下' : '关'}
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-medium border',
                    keys.trill2
                      ? 'bg-brand text-brand-foreground border-brand'
                      : 'bg-card border-border text-muted-foreground'
                  )}
                >
                  Trill 2: {keys.trill2 ? '按下' : '关'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Technique Advice Box */}
        <div className="flex items-start gap-3 rounded-xl bg-brand/10 border border-brand/20 p-3.5 text-xs text-foreground">
          <div className="p-1 rounded-md bg-brand/20 text-brand-strong dark:text-brand-300 shrink-0 font-bold">
            💡 发音指导
          </div>
          <div className="leading-relaxed">
            {fingering.tips}
            {fingering.note === 'D5' && (
              <span className="block mt-1 font-semibold text-amber-600 dark:text-amber-400">
                ⚠️ 特别提示：注意中音 D5 左手食指必须放开抬起！右手小指放开不按 Eb。
              </span>
            )}
            {fingering.note === 'E6' && (
              <span className="block mt-1 font-semibold text-amber-600 dark:text-amber-400">
                ⚠️ 特别提示：超吹高音 E6 左手无名指（LH 3）放开，保持口风紧凑前推。
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

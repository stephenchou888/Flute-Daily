import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { fluteAudio } from '@/lib/audioEngine';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Plus, Minus, Disc } from 'lucide-react';

interface MetronomeProps {
  initialBpm?: number;
  onBpmChange?: (bpm: number) => void;
  compact?: boolean;
}

export const Metronome: React.FC<MetronomeProps> = ({
  initialBpm = 90,
  onBpmChange,
  compact = false
}) => {
  const [bpm, setBpm] = useState(initialBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState<number>(4); // 2, 3, 4, 6
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [subdivision, setSubdivision] = useState<'quarter' | 'eighth' | 'triplet' | 'sixteenth'>('quarter');
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState(false);

  // Tap tempo state
  const tapTimesRef = useRef<number[]>([]);

  // Web Audio lookahead scheduling
  const nextNoteTimeRef = useRef<number>(0);
  const currentBeatRef = useRef<number>(0);
  const subTickRef = useRef<number>(0);
  const timerWorkerRef = useRef<number | null>(null);

  const getSubdivisionsPerBeat = () => {
    switch (subdivision) {
      case 'eighth': return 2;
      case 'triplet': return 3;
      case 'sixteenth': return 4;
      default: return 1;
    }
  };

  const scheduleTick = useCallback((time: number) => {
    const subsPerBeat = getSubdivisionsPerBeat();
    const isMainBeat = subTickRef.current === 0;
    const isFirstBeat = currentBeatRef.current === 0 && isMainBeat;

    if (!isMuted) {
      fluteAudio.playClick(time, isFirstBeat, !isMainBeat, volume);
    }

    // Schedule visual state change near actual audio time
    const delayMs = Math.max(0, (time - fluteAudio.getAudioContextTime()) * 1000);
    setTimeout(() => {
      if (isMainBeat) {
        setCurrentBeat(currentBeatRef.current);
      }
    }, delayMs);

    // Advance beat and subticks
    subTickRef.current = (subTickRef.current + 1) % subsPerBeat;
    if (subTickRef.current === 0) {
      currentBeatRef.current = (currentBeatRef.current + 1) % timeSignature;
    }

    // Calculate time interval
    const secondsPerBeat = 60.0 / bpm;
    const secondsPerSubTick = secondsPerBeat / subsPerBeat;
    nextNoteTimeRef.current += secondsPerSubTick;
  }, [bpm, timeSignature, subdivision, isMuted, volume]);

  useEffect(() => {
    if (isPlaying) {
      const audioTime = fluteAudio.getAudioContextTime();
      nextNoteTimeRef.current = audioTime + 0.05;
      currentBeatRef.current = 0;
      subTickRef.current = 0;

      const scheduleLoop = () => {
        const currentTime = fluteAudio.getAudioContextTime();
        // Look ahead 100ms
        while (nextNoteTimeRef.current < currentTime + 0.1) {
          scheduleTick(nextNoteTimeRef.current);
        }
        timerWorkerRef.current = window.setTimeout(scheduleLoop, 25);
      };

      scheduleLoop();
    } else {
      if (timerWorkerRef.current !== null) {
        clearTimeout(timerWorkerRef.current);
        timerWorkerRef.current = null;
      }
      setCurrentBeat(0);
    }

    return () => {
      if (timerWorkerRef.current !== null) {
        clearTimeout(timerWorkerRef.current);
      }
    };
  }, [isPlaying, scheduleTick]);

  const updateBpm = (newBpm: number) => {
    const clamped = Math.max(30, Math.min(260, Math.round(newBpm)));
    setBpm(clamped);
    if (onBpmChange) onBpmChange(clamped);
  };

  const handleTapTempo = () => {
    const now = Date.now();
    const taps = tapTimesRef.current;
    if (taps.length > 0 && now - taps[taps.length - 1] > 2000) {
      tapTimesRef.current = [now];
      return;
    }
    taps.push(now);
    if (taps.length > 5) taps.shift();

    if (taps.length >= 2) {
      let totalDiff = 0;
      for (let i = 1; i < taps.length; i++) {
        totalDiff += taps[i] - taps[i - 1];
      }
      const avgDiff = totalDiff / (taps.length - 1);
      const computedBpm = Math.round(60000 / avgDiff);
      updateBpm(computedBpm);
    }
  };

  // Tempo Italian term
  const getTempoTerm = (val: number) => {
    if (val < 60) return 'Largo (广板)';
    if (val < 76) return 'Adagio (柔板)';
    if (val < 108) return 'Andante (行板)';
    if (val < 120) return 'Moderato (中板)';
    if (val < 168) return 'Allegro (快板)';
    return 'Presto (急板)';
  };

  return (
    <Card className={`border-border bg-card shadow-sm ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Disc className={`h-5 w-5 text-teal-600 dark:text-teal-400 ${isPlaying ? 'animate-spin' : ''}`} />
          <h3 className="font-semibold text-foreground text-base">高精度数字节拍器</h3>
        </div>
        <Badge variant="teal">{getTempoTerm(bpm)}</Badge>
      </div>

      {/* Main Beat Display & Tempo Number */}
      <div className="py-6 flex flex-col items-center justify-center">
        {/* Beat indicators */}
        <div className="flex items-center gap-3 mb-6">
          {Array.from({ length: timeSignature }).map((_, idx) => {
            const isCurrent = isPlaying && currentBeat === idx;
            const isAccent = idx === 0;
            return (
              <div
                key={idx}
                className={`transition-all duration-150 rounded-full flex items-center justify-center ${
                  isAccent ? 'w-10 h-10' : 'w-8 h-8'
                } ${
                  isCurrent
                    ? isAccent
                      ? 'bg-teal-500 scale-125 shadow-lg shadow-teal-500/40 text-white'
                      : 'bg-emerald-400 scale-110 shadow-md text-white'
                    : 'bg-muted border border-border/70 text-muted-foreground'
                }`}
              >
                <span className="text-xs font-bold">{idx + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Big BPM display */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateBpm(bpm - 1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted text-foreground cursor-pointer"
          >
            <Minus className="h-5 w-5" />
          </button>
          
          <div className="text-center px-4">
            <span className="text-6xl font-black tracking-tight font-mono text-foreground">
              {bpm}
            </span>
            <span className="block text-xs uppercase tracking-widest text-muted-foreground mt-1 font-semibold">
              BPM (拍/分)
            </span>
          </div>

          <button
            onClick={() => updateBpm(bpm + 1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted text-foreground cursor-pointer"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* BPM Slider */}
        <div className="w-full max-w-md mt-6 px-4">
          <input
            type="range"
            min={30}
            max={240}
            value={bpm}
            onChange={e => updateBpm(Number(e.target.value))}
            className="w-full accent-teal-600 h-2 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-mono">
            <span>30</span>
            <span>60</span>
            <span>90</span>
            <span>120</span>
            <span>160</span>
            <span>200</span>
            <span>240</span>
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size="lg"
          className="min-w-[140px] h-12 text-base shadow-md"
          variant={isPlaying ? 'destructive' : 'default'}
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5 mr-1" /> 暂停节拍
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-1" /> 开始节拍
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleTapTempo}
          className="h-12 px-5 font-semibold active:bg-teal-500/10 cursor-pointer"
        >
          🎯 测速 (Tap Tempo)
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="h-12 w-12"
          title={isMuted ? '取消静音' : '静音'}
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-red-500" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>

      {/* Time Signature & Subdivision Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-border/60">
        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-2">拍号 (Time Signature)</label>
          <div className="flex items-center gap-1.5">
            {[2, 3, 4, 6].map(sig => (
              <button
                key={sig}
                onClick={() => setTimeSignature(sig)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  timeSignature === sig
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-muted/50 border-border hover:bg-muted text-foreground'
                }`}
              >
                {sig}/4
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-2">音符细分 (Subdivision)</label>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'quarter', label: '1/4 四分' },
              { id: 'eighth', label: '1/8 八分' },
              { id: 'triplet', label: '3连音' },
              { id: 'sixteenth', label: '1/16 十六' },
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setSubdivision(sub.id as typeof subdivision)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  subdivision === sub.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-muted/50 border-border hover:bg-muted text-foreground'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Expand, Pause, Play, Repeat2, Shrink, ZoomIn, ZoomOut } from 'lucide-react';
import { FluteFingering } from '@/types/flute';
import { fluteAudio } from '@/lib/audioEngine';
import { Button } from './ui/button';

interface FingeringPracticeItem {
  fingering: FluteFingering;
  originalIndex: number;
}

interface FingeringPracticeProps {
  fingerings: FingeringPracticeItem[];
  activeIndex: number;
  onSelectNote: (index: number) => void;
}

const focusZoom = 1.5;

const toAbcToken = (note: string) => {
  const match = note.match(/^([A-G])([#b]?)([4-7])$/);
  if (!match) return 'C';

  const [, letter, accidental, octaveText] = match;
  const octave = Number(octaveText);
  const prefix = accidental === '#' ? '^' : accidental === 'b' ? '_' : '';
  const pitch = octave === 4 ? letter : letter.toLowerCase();
  const octaveMark = octave >= 6 ? "'".repeat(octave - 5) : '';
  return `${prefix}${pitch}${octaveMark}`;
};

export const FingeringPractice: React.FC<FingeringPracticeProps> = ({
  fingerings,
  activeIndex,
  onSelectNote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const onSelectNoteRef = useRef(onSelectNote);
  const activeIndexRef = useRef(activeIndex);
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [renderTick, setRenderTick] = useState(0);

  activeIndexRef.current = activeIndex;

  const abc = useMemo(() => {
    const notes = fingerings.map(({ fingering }) => fingering.note);
    const music = notes.map(toAbcToken);
    const labels = notes.map(note => note.replace('#', '♯').replace('b', '♭'));
    const measures: string[] = [];
    const lyrics: string[] = [];

    for (let i = 0; i < music.length; i += 4) {
      measures.push(music.slice(i, i + 4).join(' '));
      lyrics.push(labels.slice(i, i + 4).join(' '));
    }

    return `X:1\nM:4/4\nL:1/4\nK:C\n${measures.join(' | ')} |]\nw: ${lyrics.join(' | ')} |]`;
  }, [fingerings]);

  useEffect(() => {
    onSelectNoteRef.current = onSelectNote;
  }, [onSelectNote]);

  useEffect(() => {
    if (!isPlaying || fingerings.length === 0) return;

    const timer = window.setInterval(() => {
      const current = activeIndexRef.current;
      const next = current < 0 ? 0 : current + 1;

      if (next >= fingerings.length) {
        if (!isLooping) {
          setIsPlaying(false);
          return;
        }
        activeIndexRef.current = 0;
        onSelectNoteRef.current(fingerings[0].originalIndex);
        fluteAudio.playFluteTone(fingerings[0].fingering.frequency, Math.min(1.2, (60 / bpm) * 0.85), 0.28);
        return;
      }

      activeIndexRef.current = next;
      const item = fingerings[next];
      onSelectNoteRef.current(item.originalIndex);
      fluteAudio.playFluteTone(item.fingering.frequency, Math.min(1.2, (60 / bpm) * 0.85), 0.28);
    }, 60000 / bpm);

    return () => window.clearInterval(timer);
  }, [bpm, fingerings, isLooping, isPlaying]);

  useEffect(() => {
    if (!isFocusMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFocusMode(false);
      } else if (event.key === 'ArrowRight' && activeIndexRef.current < fingerings.length - 1) {
        event.preventDefault();
        const next = activeIndexRef.current + 1;
        activeIndexRef.current = next;
        onSelectNoteRef.current(fingerings[next].originalIndex);
      } else if (event.key === 'ArrowLeft' && activeIndexRef.current > 0) {
        event.preventDefault();
        const next = activeIndexRef.current - 1;
        activeIndexRef.current = next;
        onSelectNoteRef.current(fingerings[next].originalIndex);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [fingerings, isFocusMode]);

  useEffect(() => {
    let cancelled = false;

    import('abcjs')
      .then(module => {
        const container = containerRef.current;
        if (cancelled || !container) return;

        container.innerHTML = '';
        const renderZoom = zoom * (isFocusMode ? focusZoom : 1);
        module.default.renderAbc(container, abc, {
          scale: renderZoom,
          staffwidth: Math.max(860, fingerings.length * 38),
          format: { stretchlast: true },
          add_classes: true,
          paddingtop: 12,
          paddingbottom: 18,
          paddingleft: 16,
          paddingright: 16,
        });

        container.querySelectorAll('.abcjs-note').forEach((note, index) => {
          (note as HTMLElement).style.cursor = 'pointer';
          note.addEventListener('click', () => {
            activeIndexRef.current = index;
            onSelectNoteRef.current(fingerings[index].originalIndex);
          });
        });

        setRenderTick(tick => tick + 1);
      })
      .catch(error => console.error('Unable to render flute score:', error));

    return () => {
      cancelled = true;
    };
  }, [abc, fingerings, isFocusMode, zoom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('.active-score-note').forEach(node => {
      node.classList.remove('active-score-note');
      node.querySelectorAll('path').forEach(path => {
        (path as SVGPathElement).style.fill = '';
        (path as SVGPathElement).style.stroke = '';
        (path as SVGPathElement).style.filter = '';
      });
    });

    const target = container.querySelectorAll('.abcjs-note')[activeIndex] as HTMLElement | undefined;
    if (!target) return;

    target.classList.add('active-score-note');
    target.querySelectorAll('path').forEach(path => {
      (path as SVGPathElement).style.fill = 'var(--brand)';
      (path as SVGPathElement).style.stroke = 'var(--brand)';
      (path as SVGPathElement).style.filter = 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.95))';
    });

    const wrapper = scrollWrapperRef.current;
    if (wrapper) {
      const noteBounds = target.getBoundingClientRect();
      const wrapperBounds = wrapper.getBoundingClientRect();
      wrapper.scrollTo({
        left: wrapper.scrollLeft + noteBounds.left + noteBounds.width / 2 - (wrapperBounds.left + wrapperBounds.width / 2),
        behavior: 'smooth',
      });
    }
  }, [activeIndex, renderTick]);

  const score = (
    <section className={`w-full overflow-hidden rounded-xl border border-border bg-card ${isFocusMode ? 'flex max-h-[90vh] w-[min(96vw,1400px)] flex-col shadow-2xl' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
        <div>
          <h3 className="font-semibold">慢速指法演示与五线谱</h3>
          <p className="text-xs text-muted-foreground">点击谱面音符可切换指法；演示会同步高亮并试听。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{bpm} BPM</span>
            <input
              aria-label="慢速演示速度"
              type="range"
              min="30"
              max="120"
              step="5"
              value={bpm}
              onChange={event => setBpm(Number(event.target.value))}
              className="w-24 accent-brand-strong"
            />
          </label>
          <Button
            variant={isLooping ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setIsLooping(value => !value)}
            aria-pressed={isLooping}
            title={isLooping ? '关闭循环播放' : '开启循环播放'}
          >
            <Repeat2 className="h-4 w-4" />
            {isLooping ? '循环' : '单次'}
          </Button>
          <Button
            variant={isPlaying ? 'destructive' : 'default'}
            size="sm"
            onClick={() => setIsPlaying(value => !value)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? '暂停演示' : '开始演示'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFocusMode(value => !value)}
            aria-label={isFocusMode ? '关闭放大乐谱' : '放大乐谱'}
            title={isFocusMode ? '关闭放大乐谱（Esc）' : '放大乐谱（方向键切换音符，Esc 关闭）'}
          >
            {isFocusMode ? <Shrink className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
            {isFocusMode ? '关闭' : '放大'}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 border-b border-border/60 px-3 py-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setZoom(value => Math.max(0.7, +(value - 0.1).toFixed(1)))}
          disabled={zoom <= 0.7}
          aria-label="缩小乐谱"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="min-w-12 text-center text-xs text-muted-foreground">{Math.round(zoom * (isFocusMode ? focusZoom : 1) * 100)}%</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setZoom(value => Math.min(1.6, +(value + 0.1).toFixed(1)))}
          disabled={zoom >= 1.6}
          aria-label="放大乐谱"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={scrollWrapperRef}
        className={`w-full overflow-x-auto bg-white p-2 text-slate-900 ${isFocusMode ? 'flex min-h-[40vh] flex-1 items-center' : 'min-h-[150px]'}`}
      >
        {fingerings.length > 0 ? (
          <div ref={containerRef} className="abc-sheet-container min-w-max" />
        ) : (
          <p className="p-6 text-sm text-slate-500">没有符合条件的音符。</p>
        )}
      </div>
    </section>
  );

  if (!isFocusMode) return score;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="放大查看长笛五线谱"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-6"
      onClick={event => event.target === event.currentTarget && setIsFocusMode(false)}
    >
      {score}
    </div>,
    document.body,
  );
};

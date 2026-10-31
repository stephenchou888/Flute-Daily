import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Music2, Pause, Play, Repeat2, Volume2, ZoomIn, ZoomOut } from 'lucide-react';
import { fluteAudio } from '@/lib/audioEngine';
import {
  buildPracticeNotes,
  buildScaleAbc,
  getScaleNotes,
  PRACTICE_PATTERNS,
  SCALE_ROOTS,
  SCALE_TRACKS,
  SCALE_TYPES,
  ScaleNote,
  ScaleRootId,
  ScaleTrack,
  ScaleTypeId,
  PracticePatternId,
} from '@/lib/scalePractice';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const NOTE_HIGHLIGHT = '#b45309';

interface ScaleScoreProps {
  notes: ScaleNote[];
  activeIndex: number;
  beatsPerMeasure: number;
  onNoteClick: (index: number) => void;
}

const ScaleScore: React.FC<ScaleScoreProps> = ({ notes, activeIndex, beatsPerMeasure, onNoteClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [renderTick, setRenderTick] = useState(0);
  const abc = useMemo(() => buildScaleAbc(notes, beatsPerMeasure), [beatsPerMeasure, notes]);

  useEffect(() => {
    let cancelled = false;
    import('abcjs')
      .then(module => {
        const container = containerRef.current;
        if (cancelled || !container) return;

        container.innerHTML = '';
        module.default.renderAbc(container, abc, {
          scale: zoom,
          staffwidth: Math.max(900, notes.length * 38),
          format: { stretchlast: true },
          add_classes: true,
          paddingtop: 12,
          paddingbottom: 16,
          paddingleft: 16,
          paddingright: 16,
        });

        container.querySelectorAll('.abcjs-note').forEach((element, index) => {
          (element as HTMLElement).style.cursor = 'pointer';
          element.addEventListener('click', () => onNoteClick(index));
        });
        setRenderTick(tick => tick + 1);
      })
      .catch(error => console.error('Unable to render scale practice score:', error));

    return () => {
      cancelled = true;
    };
  }, [abc, notes.length, onNoteClick, zoom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('.active-score-note').forEach(element => {
      element.classList.remove('active-score-note');
      element.querySelectorAll('path').forEach(path => {
        (path as SVGPathElement).style.fill = '';
        (path as SVGPathElement).style.stroke = '';
        (path as SVGPathElement).style.filter = '';
      });
    });

    const target = container.querySelectorAll('.abcjs-note')[activeIndex] as HTMLElement | undefined;
    if (!target) return;

    target.classList.add('active-score-note');
    target.querySelectorAll('path').forEach(path => {
      (path as SVGPathElement).style.fill = NOTE_HIGHLIGHT;
      (path as SVGPathElement).style.stroke = NOTE_HIGHLIGHT;
      (path as SVGPathElement).style.filter = 'drop-shadow(0 0 6px rgba(180, 83, 9, 0.8))';
    });

    const wrapper = scrollWrapperRef.current;
    if (wrapper) {
      const noteBounds = target.getBoundingClientRect();
      const wrapperBounds = wrapper.getBoundingClientRect();
      if (noteBounds.left < wrapperBounds.left || noteBounds.right > wrapperBounds.right) {
        wrapper.scrollTo({
          left: wrapper.scrollLeft + noteBounds.left + noteBounds.width / 2 - (wrapperBounds.left + wrapperBounds.width / 2),
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex, renderTick]);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
        <div>
          <h3 className="font-semibold">五线谱视奏</h3>
          <p className="text-xs text-muted-foreground">点击谱面音符或下方音名，试听并同步高亮。</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(value => Math.max(0.8, +(value - 0.1).toFixed(1)))}
            disabled={zoom <= 0.8}
            aria-label="缩小五线谱"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="min-w-12 text-center text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(value => Math.min(1.6, +(value + 0.1).toFixed(1)))}
            disabled={zoom >= 1.6}
            aria-label="放大五线谱"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div ref={scrollWrapperRef} className="w-full overflow-x-auto bg-white p-2 text-slate-900">
        <div ref={containerRef} className="min-h-[160px] min-w-max" />
      </div>
    </section>
  );
};

export const ScalePractice: React.FC = () => {
  const [track, setTrack] = useState<ScaleTrack>('basic');
  const [rootId, setRootId] = useState<ScaleRootId>('C');
  const [typeId, setTypeId] = useState<ScaleTypeId>('major');
  const [patternId, setPatternId] = useState<PracticePatternId>('scale');
  const [activeIndex, setActiveIndex] = useState(0);
  const [bpm, setBpm] = useState(72);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);

  const selectedRoot = SCALE_ROOTS.find(root => root.id === rootId) ?? SCALE_ROOTS[0];
  const selectedType = SCALE_TYPES.find(type => type.id === typeId) ?? SCALE_TYPES[0];
  const pattern = PRACTICE_PATTERNS.find(item => item.id === patternId) ?? PRACTICE_PATTERNS[0];
  const ascending = useMemo(() => getScaleNotes(rootId, typeId), [rootId, typeId]);
  const notes = useMemo(() => buildPracticeNotes(ascending, patternId), [ascending, patternId]);
  const activeIndexRef = useRef(activeIndex);
  const notesRef = useRef(notes);
  const bpmRef = useRef(bpm);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  notesRef.current = notes;
  bpmRef.current = bpm;

  const selectNote = useCallback((index: number) => {
    const note = notesRef.current[index];
    if (!note) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
    fluteAudio.playFluteTone(note.frequency, Math.min(1.2, (60 / bpmRef.current) * 0.85), 0.32);
  }, []);

  const resetPractice = () => {
    setIsPlaying(false);
    activeIndexRef.current = 0;
    setActiveIndex(0);
  };

  const selectTrack = (nextTrack: ScaleTrack) => {
    const firstType = SCALE_TYPES.find(type => type.track === nextTrack);
    if (!firstType) return;
    setTrack(nextTrack);
    setTypeId(firstType.id);
    resetPractice();
  };

  useEffect(() => {
    if (!isPlaying || notes.length === 0) return;

    const timer = window.setInterval(() => {
      const next = activeIndexRef.current + 1;
      if (next >= notesRef.current.length) {
        if (!isLooping) {
          setIsPlaying(false);
          return;
        }
        selectNote(0);
        return;
      }
      selectNote(next);
    }, 60000 / bpm);

    return () => window.clearInterval(timer);
  }, [bpm, isLooping, isPlaying, notes.length, selectNote]);

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (notes.length === 0) return;
    selectNote(Math.min(activeIndex, notes.length - 1));
    setIsPlaying(true);
  };

  const changeRoot = (nextRoot: ScaleRootId) => {
    setRootId(nextRoot);
    resetPractice();
  };

  const changeType = (nextType: ScaleTypeId) => {
    setTypeId(nextType);
    resetPractice();
  };

  const changePattern = (nextPattern: PracticePatternId) => {
    setPatternId(nextPattern);
    resetPractice();
  };

  const visibleTypes = SCALE_TYPES.filter(type => type.track === track);
  const currentNote = notes[activeIndex];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Music2 className="h-6 w-6 text-brand-strong dark:text-brand-400" />
          长笛音阶与模进练习
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          参考萨克斯练习的调性选择与模进方式，涵盖 24 个大小调、七种教会调式及常用爵士音阶；默认主音上行一八度再下行。
        </p>
      </div>

      <section className="space-y-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">练习类型</p>
          <div className="flex flex-wrap gap-2">
            {SCALE_TRACKS.map(item => (
              <button
                key={item.id}
                type="button"
                aria-pressed={track === item.id}
                onClick={() => selectTrack(item.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  track === item.id
                    ? 'border-brand bg-brand text-brand-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">选择主音</p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
            {SCALE_ROOTS.map(root => (
              <button
                key={root.id}
                type="button"
                aria-pressed={rootId === root.id}
                onClick={() => changeRoot(root.id)}
                className={`min-h-10 rounded-lg border px-2 text-sm font-semibold transition-colors ${
                  rootId === root.id
                    ? 'border-brand bg-brand text-brand-foreground shadow-xs'
                    : 'border-border bg-background text-foreground hover:border-brand/50 hover:bg-muted'
                }`}
              >
                {root.label}
              </button>
            ))}
          </div>
          {track === 'basic' && (
            <p className="mt-2 text-xs text-muted-foreground">
              12 个主音分别练习大调和小调，即覆盖 24 个基本调性。
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">音阶 / 调式</p>
          <div className="flex flex-wrap gap-2">
            {visibleTypes.map(type => (
              <button
                key={type.id}
                type="button"
                aria-pressed={typeId === type.id}
                onClick={() => changeType(type.id)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  typeId === type.id
                    ? 'border-brand bg-brand text-brand-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">练习模进</p>
          <div className="flex flex-wrap gap-2">
            {PRACTICE_PATTERNS.map(item => (
              <button
                key={item.id}
                type="button"
                aria-pressed={patternId === item.id}
                onClick={() => changePattern(item.id)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  patternId === item.id
                    ? 'border-brand bg-brand text-brand-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold">{selectedRoot.label} {selectedType.label} · {pattern.label}</h3>
            <Badge variant="brand">{currentNote?.label ?? '—'}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{selectedType.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{bpm} BPM</span>
            <input
              aria-label="音阶示范速度"
              type="range"
              min="40"
              max="160"
              step="4"
              value={bpm}
              onChange={event => setBpm(Number(event.target.value))}
              className="w-28 accent-brand-strong"
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
            onClick={togglePlayback}
            aria-label={isPlaying ? '暂停音阶示范' : '开始音阶示范'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? '暂停示范' : '开始示范'}
          </Button>
          <Button variant="outline" onClick={() => selectNote(activeIndex)}>
            <Volume2 className="h-4 w-4" />
            试听当前音
          </Button>
        </div>
      </section>

      <ScaleScore
        notes={notes}
        activeIndex={activeIndex}
        beatsPerMeasure={pattern.beatsPerMeasure}
        onNoteClick={selectNote}
      />

      <section className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-semibold">点击音符试听与定位</h3>
          <span className="text-xs text-muted-foreground">{activeIndex + 1} / {notes.length}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {notes.map((note, index) => (
            <button
              key={`${index}-${note.name}`}
              type="button"
              aria-label={`播放第 ${index + 1} 音 ${note.label}`}
              aria-current={activeIndex === index ? 'step' : undefined}
              onClick={() => selectNote(index)}
              className={`min-w-14 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                activeIndex === index
                  ? 'border-brand bg-brand text-brand-foreground shadow-xs'
                  : 'border-border bg-background text-foreground hover:border-brand/50 hover:bg-muted'
              }`}
            >
              <span className="block text-[10px] opacity-70">{index + 1}</span>
              {note.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

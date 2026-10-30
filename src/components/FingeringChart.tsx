import React, { useState, useMemo, useEffect } from 'react';
import { FLUTE_FINGERINGS } from '@/data/fingeringData';
import { FluteFingering } from '@/types/flute';
import { FluteDiagram } from './FluteDiagram';
import { FingeringPractice } from './FingeringPractice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { fluteAudio } from '@/lib/audioEngine';
import { Volume2, ChevronLeft, ChevronRight, Search, Radio, Music } from 'lucide-react';

export const FingeringChart: React.FC = () => {
  const [selectedOctave, setSelectedOctave] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(9); // Default to A4 (440Hz)
  const [isPlayingTone, setIsPlayingTone] = useState(false);

  // Filtered fingerings
  const filteredList = useMemo(() => {
    return FLUTE_FINGERINGS.filter(f => {
      const matchesOctave = selectedOctave === 'all' || f.octave === selectedOctave;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        f.note.toLowerCase().includes(q) || 
        f.displayName.toLowerCase().includes(q) || 
        f.solfege.toLowerCase().includes(q);
      return matchesOctave && matchesSearch;
    });
  }, [selectedOctave, searchQuery]);

  const currentFingering: FluteFingering = FLUTE_FINGERINGS[selectedIndex] || FLUTE_FINGERINGS[0];
  const currentFilteredIndex = filteredList.indexOf(currentFingering);
  const practiceItems = useMemo(
    () => filteredList.map(fingering => ({
      fingering,
      originalIndex: FLUTE_FINGERINGS.indexOf(fingering),
    })),
    [filteredList],
  );

  useEffect(() => {
    if (filteredList.length > 0 && currentFilteredIndex === -1) {
      setSelectedIndex(FLUTE_FINGERINGS.indexOf(filteredList[0]));
    }
  }, [currentFilteredIndex, filteredList]);

  const handlePlayTone = (freq: number) => {
    setIsPlayingTone(true);
    fluteAudio.playFluteTone(freq, 1.8, 0.45);
    setTimeout(() => setIsPlayingTone(false), 1800);
  };

  const handleNext = () => {
    if (currentFilteredIndex < filteredList.length - 1) {
      setSelectedIndex(FLUTE_FINGERINGS.indexOf(filteredList[currentFilteredIndex + 1]));
    }
  };

  const handlePrev = () => {
    if (currentFilteredIndex > 0) {
      setSelectedIndex(FLUTE_FINGERINGS.indexOf(filteredList[currentFilteredIndex - 1]));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Music className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            长笛指法表与发音指引
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            完整覆盖低音 C4 至超吹高音 D7，配备真实长笛声波合成与触键图解
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索音符 (如 A4, F#, Re)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Octave Range Selectors */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1">音区选择:</span>
        {[
          { id: 'all', label: '全部音域 (C4 - D7)' },
          { id: 1, label: '低音区 1st (C4 - B4)' },
          { id: 2, label: '中音区 2nd (C5 - B5)' },
          { id: 3, label: '高音区 3rd (C6 - B6)' },
          { id: 4, label: '极限高音 4th (C7 - D7)' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedOctave(item.id as number | 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedOctave === item.id
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Horizontal Note Selector Scrollbar */}
      <div className="bg-card rounded-xl border border-border p-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {filteredList.map(item => {
            const originalIndex = FLUTE_FINGERINGS.findIndex(
              f => f.note === item.note && f.displayName === item.displayName
            );
            const isSelected = originalIndex === selectedIndex;
            return (
              <button
                key={`${item.note}-${item.displayName}`}
                onClick={() => setSelectedIndex(originalIndex)}
                className={`flex flex-col items-center justify-center min-w-[58px] py-2 px-2 rounded-lg text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs scale-105 font-bold'
                    : 'bg-background hover:bg-muted/70 text-foreground border-border/80'
                }`}
              >
                <span className="text-sm tracking-tight">{item.note}</span>
                <span className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-muted-foreground'}`}>
                  {item.solfege}
                </span>
                {item.isAlternate && (
                  <span className="text-[8px] bg-amber-400/30 text-amber-900 dark:text-amber-200 px-1 rounded mt-0.5">
                    替
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <FingeringPractice
        fingerings={practiceItems}
        activeIndex={currentFilteredIndex}
        onSelectNote={setSelectedIndex}
      />

      {/* Main Fingering Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Note Details & Actions */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="teal">第 {currentFingering.octave} 八度</Badge>
              <Badge
                variant={
                  currentFingering.difficulty === '初级'
                    ? 'emerald'
                    : currentFingering.difficulty === '中级'
                    ? 'teal'
                    : 'amber'
                }
              >
                {currentFingering.difficulty}
              </Badge>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                  {currentFingering.note}
                </h1>
                <p className="text-base font-medium text-teal-600 dark:text-teal-400 mt-1">
                  {currentFingering.displayName}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-muted-foreground font-mono">
                  {currentFingering.solfege}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {currentFingering.frequency} Hz
                </span>
              </div>
            </div>

            {currentFingering.isAlternate && (
              <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                <strong>说明：</strong> {currentFingering.altDescription}
              </div>
            )}
          </div>

          {/* Sound Preview & Actions */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Button
              onClick={() => handlePlayTone(currentFingering.frequency)}
              className="w-full flex items-center justify-center gap-2 h-11"
              variant={isPlayingTone ? 'secondary' : 'default'}
            >
              <Volume2 className={`h-4 w-4 ${isPlayingTone ? 'animate-bounce text-teal-500' : ''}`} />
              {isPlayingTone ? '正在发音...' : '试听真实长笛音色 (Tone)'}
            </Button>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentFilteredIndex <= 0}
                className="flex-1 flex items-center justify-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> 上一个音
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentFilteredIndex < 0 || currentFilteredIndex >= filteredList.length - 1}
                className="flex-1 flex items-center justify-center gap-1"
              >
                下一个音 <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Key Diagram */}
        <div className="lg:col-span-8">
          <FluteDiagram fingering={currentFingering} />
        </div>
      </div>
    </div>
  );
};

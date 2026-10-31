import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { fluteAudio } from '@/lib/audioEngine';
import { Radio, Volume2, VolumeX, Sparkles, Activity } from 'lucide-react';

const CHROMATIC_NOTES = [
  { name: 'C', semitonesFromA: -9 },
  { name: 'C#', semitonesFromA: -8 },
  { name: 'D', semitonesFromA: -7 },
  { name: 'Eb', semitonesFromA: -6 },
  { name: 'E', semitonesFromA: -5 },
  { name: 'F', semitonesFromA: -4 },
  { name: 'F#', semitonesFromA: -3 },
  { name: 'G', semitonesFromA: -2 },
  { name: 'Ab', semitonesFromA: -1 },
  { name: 'A', semitonesFromA: 0 },
  { name: 'Bb', semitonesFromA: 1 },
  { name: 'B', semitonesFromA: 2 },
];

export const ToneDrone: React.FC = () => {
  const [basePitch, setBasePitch] = useState<440 | 442>(442); // 442Hz is popular for flutes
  const [selectedNote, setSelectedNote] = useState('A');
  const [selectedOctave, setSelectedOctave] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [richHarmonics, setRichHarmonics] = useState(true);
  const [volume, setVolume] = useState(0.4);

  // Compute exact frequency
  const calculateFreq = (noteName: string, octave: number, pitchRef: number): number => {
    const noteObj = CHROMATIC_NOTES.find(n => n.name === noteName) || CHROMATIC_NOTES[9];
    const semitones = noteObj.semitonesFromA + (octave - 4) * 12;
    return pitchRef * Math.pow(2, semitones / 12);
  };

  const currentFreq = calculateFreq(selectedNote, selectedOctave, basePitch);

  const toggleDrone = () => {
    if (isPlaying) {
      fluteAudio.stopDrone();
      setIsPlaying(false);
    } else {
      fluteAudio.startDrone(currentFreq, richHarmonics, volume);
      setIsPlaying(true);
    }
  };

  const handleSelectNote = (name: string) => {
    setSelectedNote(name);
    const newFreq = calculateFreq(name, selectedOctave, basePitch);
    if (isPlaying) {
      fluteAudio.setDroneFreq(newFreq);
    }
  };

  const handleSelectOctave = (oct: number) => {
    setSelectedOctave(oct);
    const newFreq = calculateFreq(selectedNote, oct, basePitch);
    if (isPlaying) {
      fluteAudio.setDroneFreq(newFreq);
    }
  };

  const handleBasePitchChange = (pitch: 440 | 442) => {
    setBasePitch(pitch);
    const newFreq = calculateFreq(selectedNote, selectedOctave, pitch);
    if (isPlaying) {
      fluteAudio.setDroneFreq(newFreq);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    fluteAudio.setDroneVolume(v);
  };

  useEffect(() => {
    return () => {
      fluteAudio.stopDrone();
    };
  }, []);

  return (
    <Card className="border-border bg-card shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Activity className={`h-5 w-5 text-brand-strong dark:text-brand-400 ${isPlaying ? 'animate-pulse' : ''}`} />
          <h3 className="font-semibold text-foreground text-base">长笛基准音 / 无人机持续长音 (Drone)</h3>
        </div>
        
        {/* Base Pitch Standard Switch */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">基准律:</span>
          <div className="inline-flex rounded-lg bg-muted p-1">
            <button
              onClick={() => handleBasePitchChange(440)}
              className={`px-2.5 py-1 text-xs rounded-md font-semibold cursor-pointer transition-all ${
                basePitch === 440 ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'
              }`}
            >
              A=440 Hz
            </button>
            <button
              onClick={() => handleBasePitchChange(442)}
              className={`px-2.5 py-1 text-xs rounded-md font-semibold cursor-pointer transition-all ${
                basePitch === 442 ? 'bg-brand text-brand-foreground shadow-xs' : 'text-muted-foreground'
              }`}
            >
              A=442 Hz (长笛推荐)
            </button>
          </div>
        </div>
      </div>

      {/* Main Pitch Monitor & Visualizer */}
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="relative">
          {isPlaying && (
            <div className="absolute -inset-4 rounded-full bg-brand/15 animate-ping" />
          )}
          <div
            className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
              isPlaying
                ? 'border-brand bg-brand/10 shadow-xl shadow-brand/20'
                : 'border-border bg-muted/30'
            }`}
          >
            <span className="text-3xl font-black text-foreground font-mono">
              {selectedNote}{selectedOctave}
            </span>
            <span className="text-xs text-brand-strong dark:text-brand-400 font-mono mt-0.5">
              {currentFreq.toFixed(1)} Hz
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Badge variant={isPlaying ? 'brand' : 'secondary'}>
            {isPlaying ? '● 正在发出持续长音' : '○ 已静音'}
          </Badge>
          <Badge variant="outline">
            {richHarmonics ? '长笛复合泛音' : '纯正弦波'}
          </Badge>
        </div>
      </div>

      {/* Note Selector: 12 Chromatic Pitches */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground">选择对音音高:</span>
            <div className="flex gap-1">
              {[3, 4, 5].map(oct => (
                <button
                  key={oct}
                  onClick={() => handleSelectOctave(oct)}
                  className={`px-2 py-0.5 text-xs rounded-md border font-medium cursor-pointer ${
                    selectedOctave === oct
                      ? 'bg-brand text-brand-foreground border-brand'
                      : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {oct} 八度
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {CHROMATIC_NOTES.map(note => {
              const isSelected = selectedNote === note.name;
              return (
                <button
                  key={note.name}
                  onClick={() => handleSelectNote(note.name)}
                  className={`h-11 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-brand text-brand-foreground border-brand shadow-sm scale-105'
                      : 'bg-card border-border hover:bg-muted/70 text-foreground'
                  }`}
                >
                  {note.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Play & Settings */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={toggleDrone}
              size="lg"
              className="flex-1 sm:flex-none min-w-[150px] shadow-sm"
              variant={isPlaying ? 'destructive' : 'default'}
            >
              {isPlaying ? (
                <>
                  <VolumeX className="h-5 w-5 mr-1" /> 关闭持续音
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5 mr-1" /> 开启持续长音
                </>
              )}
            </Button>

            <button
              onClick={() => {
                const nextState = !richHarmonics;
                setRichHarmonics(nextState);
                if (isPlaying) {
                  fluteAudio.startDrone(currentFreq, nextState, volume);
                }
              }}
              className="px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-muted cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {richHarmonics ? '泛音共鸣: 开启' : '泛音共鸣: 关闭'}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 w-full sm:w-48">
            <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={e => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-brand-strong h-2 bg-muted rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Intonation Guide */}
        <div className="rounded-xl bg-muted/40 border border-border/60 p-3.5 text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">💡 纯律长音对音法 (Drone Practice Method)：</span>
          播放主音（如持续 D 音），用长笛演奏同一音或其纯五度（A音）、大三度（F#音）。当音准完全锁定时，空气中的“拍频（扑棱声）”会完全消失，音响变得清澈透亮！
        </div>
      </div>
    </Card>
  );
};

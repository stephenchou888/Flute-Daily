export const SCALE_ROOTS = [
  { id: 'C', label: 'C', pitchClass: 0 },
  { id: 'C#', label: 'C♯ / D♭', pitchClass: 1 },
  { id: 'D', label: 'D', pitchClass: 2 },
  { id: 'Eb', label: 'E♭', pitchClass: 3 },
  { id: 'E', label: 'E', pitchClass: 4 },
  { id: 'F', label: 'F', pitchClass: 5 },
  { id: 'F#', label: 'F♯ / G♭', pitchClass: 6 },
  { id: 'G', label: 'G', pitchClass: 7 },
  { id: 'Ab', label: 'A♭', pitchClass: 8 },
  { id: 'A', label: 'A', pitchClass: 9 },
  { id: 'Bb', label: 'B♭', pitchClass: 10 },
  { id: 'B', label: 'B', pitchClass: 11 },
] as const;

export type ScaleRootId = (typeof SCALE_ROOTS)[number]['id'];
export type ScaleTrack = 'basic' | 'modes' | 'jazz';

type ScaleTypeDefinition = {
  readonly id: string;
  readonly track: ScaleTrack;
  readonly label: string;
  readonly intervals: readonly number[];
  readonly degrees: readonly number[];
  readonly description: string;
};

const diatonicDegrees = [0, 1, 2, 3, 4, 5, 6] as const;

export const SCALE_TYPES = [
  {
    id: 'major',
    track: 'basic',
    label: '自然大调',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: diatonicDegrees,
    description: '12 个大调，熟悉调号、音准与均匀气息。',
  },
  {
    id: 'natural-minor',
    track: 'basic',
    label: '自然小调',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: diatonicDegrees,
    description: '12 个自然小调，按本调音级正确拼写。',
  },
  {
    id: 'harmonic-minor',
    track: 'basic',
    label: '和声小调',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    degrees: diatonicDegrees,
    description: '升高第七级，练习导音与增二度音程。',
  },
  {
    id: 'melodic-minor',
    track: 'basic',
    label: '旋律小调',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    degrees: diatonicDegrees,
    description: '爵士旋律小调形式，上下行均升高第六、七级。',
  },
  {
    id: 'ionian',
    track: 'modes',
    label: '伊奥尼亚 (Ionian)',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: diatonicDegrees,
    description: '大调式；练习时以所选主音为中心听辨音级。',
  },
  {
    id: 'dorian',
    track: 'modes',
    label: '多利亚 (Dorian)',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degrees: diatonicDegrees,
    description: '小调色彩，特征音为自然六级，常用于 ii7 和弦。',
  },
  {
    id: 'phrygian',
    track: 'modes',
    label: '弗里几亚 (Phrygian)',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    degrees: diatonicDegrees,
    description: '小调色彩，特征音为降二级。',
  },
  {
    id: 'lydian',
    track: 'modes',
    label: '利底亚 (Lydian)',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    degrees: diatonicDegrees,
    description: '明亮的大调色彩，特征音为升四级。',
  },
  {
    id: 'mixolydian',
    track: 'modes',
    label: '混合利底亚 (Mixolydian)',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    degrees: diatonicDegrees,
    description: '属调式，特征音为降七级，常用于属七和弦。',
  },
  {
    id: 'aeolian',
    track: 'modes',
    label: '爱奥利亚 (Aeolian)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: diatonicDegrees,
    description: '自然小调式；与基础练习中的自然小调音程相同。',
  },
  {
    id: 'locrian',
    track: 'modes',
    label: '洛克里亚 (Locrian)',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    degrees: diatonicDegrees,
    description: '半减调式，特征音为降二级与降五级。',
  },
  {
    id: 'major-pentatonic',
    track: 'jazz',
    label: '大调五声音阶',
    intervals: [0, 2, 4, 7, 9],
    degrees: [0, 1, 2, 4, 5],
    description: '五声音阶常用于民谣、流行与爵士即兴。',
  },
  {
    id: 'minor-pentatonic',
    track: 'jazz',
    label: '小调五声音阶',
    intervals: [0, 3, 5, 7, 10],
    degrees: [0, 2, 3, 4, 6],
    description: '爵士与布鲁斯即兴的基础音阶。',
  },
  {
    id: 'blues',
    track: 'jazz',
    label: '布鲁斯音阶',
    intervals: [0, 3, 5, 6, 7, 10],
    degrees: [0, 2, 3, 3, 4, 6],
    description: '小调五声音阶加入降五级蓝调音。',
  },
  {
    id: 'bebop-dominant',
    track: 'jazz',
    label: '比波普属音阶',
    intervals: [0, 2, 4, 5, 7, 9, 10, 11],
    degrees: [0, 1, 2, 3, 4, 5, 6, 6],
    description: '属音阶加入经过音，适合配合节拍器练习。',
  },
  {
    id: 'whole-tone',
    track: 'jazz',
    label: '全音音阶',
    intervals: [0, 2, 4, 6, 8, 10],
    degrees: [0, 1, 2, 3, 4, 6],
    description: '六个全音构成的对称音阶，常用于增和弦色彩。',
  },
  {
    id: 'half-whole-diminished',
    track: 'jazz',
    label: '半全减音阶',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    degrees: [0, 1, 2, 2, 3, 4, 5, 6],
    description: '半音与全音交替，常用于属减和弦。',
  },
] as const satisfies readonly ScaleTypeDefinition[];

export type ScaleTypeId = (typeof SCALE_TYPES)[number]['id'];

export const SCALE_TRACKS: { id: ScaleTrack; label: string }[] = [
  { id: 'basic', label: '24 个大小调' },
  { id: 'modes', label: '七种教会调式' },
  { id: 'jazz', label: '爵士常用音阶' },
];

export const PRACTICE_PATTERNS = [
  { id: 'scale', label: '音阶', beatsPerMeasure: 4, offsets: [] },
  { id: 'thirds', label: '三度', beatsPerMeasure: 4, offsets: [0, 2] },
  { id: 'fourths', label: '四度', beatsPerMeasure: 4, offsets: [0, 3] },
  { id: 'fifths', label: '五度', beatsPerMeasure: 4, offsets: [0, 4] },
  { id: 'groups3', label: '三音组', beatsPerMeasure: 3, offsets: [0, 1, 2] },
  { id: 'groups4', label: '四音组', beatsPerMeasure: 4, offsets: [0, 1, 2, 3] },
  { id: 'triads', label: '琶音', beatsPerMeasure: 3, offsets: [0, 2, 4] },
] as const;

export type PracticePatternId = (typeof PRACTICE_PATTERNS)[number]['id'];

export interface ScaleNote {
  name: string;
  label: string;
  letter: string;
  accidental: number;
  octave: number;
  midi: number;
  frequency: number;
}

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NATURAL_PITCH_CLASSES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

function accidentalText(accidental: number): string {
  if (accidental === 2) return '##';
  if (accidental === -2) return 'bb';
  if (accidental > 0) return '#'.repeat(accidental);
  if (accidental < 0) return 'b'.repeat(-accidental);
  return '';
}

function accidentalLabel(accidental: number): string {
  if (accidental === 2) return '𝄪';
  if (accidental === -2) return '𝄫';
  if (accidental > 0) return '♯'.repeat(accidental);
  if (accidental < 0) return '♭'.repeat(-accidental);
  return '';
}

function createScaleNote(rootMidi: number, rootLetterIndex: number, interval: number, degree: number): ScaleNote {
  const midi = rootMidi + interval;
  const letter = LETTERS[(rootLetterIndex + degree) % LETTERS.length];
  const pitchClass = ((midi % 12) + 12) % 12;
  let accidental = pitchClass - NATURAL_PITCH_CLASSES[letter];
  if (accidental > 6) accidental -= 12;
  if (accidental < -6) accidental += 12;

  const octave = Math.floor((midi - accidental - NATURAL_PITCH_CLASSES[letter]) / 12) - 1;
  const name = `${letter}${accidentalText(accidental)}${octave}`;

  return {
    name,
    label: `${letter}${accidentalLabel(accidental)}${octave}`,
    letter,
    accidental,
    octave,
    midi,
    frequency: 440 * 2 ** ((midi - 69) / 12),
  };
}

export function getScaleNotes(rootId: ScaleRootId, typeId: ScaleTypeId): ScaleNote[] {
  const root = SCALE_ROOTS.find(item => item.id === rootId);
  const type = SCALE_TYPES.find(item => item.id === typeId);
  if (!root || !type) throw new RangeError('Unknown scale root or type');

  const rootLetter = root.id[0];
  const rootLetterIndex = LETTERS.indexOf(rootLetter);
  const rootMidi = 60 + root.pitchClass;
  const notes = type.intervals.map((interval, index) =>
    createScaleNote(rootMidi, rootLetterIndex, interval, type.degrees[index]),
  );
  notes.push(createScaleNote(rootMidi, rootLetterIndex, 12, 7));
  return notes;
}

export function buildPracticeNotes(ascending: ScaleNote[], patternId: PracticePatternId): ScaleNote[] {
  const pattern = PRACTICE_PATTERNS.find(item => item.id === patternId);
  if (!pattern) throw new RangeError('Unknown practice pattern');

  if (pattern.id === 'scale') {
    return [...ascending, ...ascending.slice(0, -1).reverse()];
  }

  const span = Math.max(...pattern.offsets);
  const notes: ScaleNote[] = [];
  for (let start = 0; start + span < ascending.length; start++) {
    pattern.offsets.forEach(offset => notes.push(ascending[start + offset]));
  }
  for (let start = ascending.length - 1; start - span >= 0; start--) {
    pattern.offsets.forEach(offset => notes.push(ascending[start - offset]));
  }
  return notes;
}

function abcPitch(note: ScaleNote): string {
  if (note.octave <= 4) {
    return `${note.letter}${','.repeat(Math.max(0, 4 - note.octave))}`;
  }
  return `${note.letter.toLowerCase()}${"'".repeat(note.octave - 5)}`;
}

function abcAccidental(accidental: number): string {
  if (accidental > 0) return '^'.repeat(accidental);
  if (accidental < 0) return '_'.repeat(-accidental);
  return '';
}

export function buildScaleAbc(notes: ScaleNote[], beatsPerMeasure = 4): string {
  const measures: string[] = [];
  const words: string[] = [];

  for (let start = 0; start < notes.length; start += beatsPerMeasure) {
    const measure = notes.slice(start, start + beatsPerMeasure);
    const accidentalsInMeasure = new Map<string, number>();
    measures.push(
      measure
        .map(note => {
          const current = accidentalsInMeasure.get(note.letter) ?? 0;
          const accidental = note.accidental === current
            ? ''
            : note.accidental === 0
              ? '='
              : abcAccidental(note.accidental);
          accidentalsInMeasure.set(note.letter, note.accidental);
          return `${accidental}${abcPitch(note)}`;
        })
        .join(' '),
    );
    words.push(measure.map(note => note.label).join(' '));
  }

  const music = measures.join(' | ') + ' |]';
  const lyrics = words.length > 0 ? `\nw: ${words.join(' | ')} |]` : '';
  return `X:1\nM:${beatsPerMeasure}/4\nL:1/4\nK:C\n${music}${lyrics}`;
}

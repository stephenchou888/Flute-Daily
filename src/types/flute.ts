export type NoteName = 
  | 'B3' | 'C4' | 'C#4' | 'D4' | 'D#4' | 'E4' | 'F4' | 'F#4' | 'G4' | 'G#4' | 'A4' | 'A#4' | 'B4'
  | 'C5' | 'C#5' | 'D5' | 'D#5' | 'E5' | 'F5' | 'F#5' | 'G5' | 'G#5' | 'A5' | 'A#5' | 'B5'
  | 'C6' | 'C#6' | 'D6' | 'D#6' | 'E6' | 'F6' | 'F#6' | 'G6' | 'G#6' | 'A6' | 'A#6' | 'B6'
  | 'C7' | 'C#7' | 'D7';

export interface FluteFingering {
  note: NoteName;
  displayName: string;
  solfege: string;
  frequency: number; // Hz at A440
  octave: 1 | 2 | 3 | 4; // 1 = low (C4-B4), 2 = mid (C5-B5), 3 = high (C6-B6), 4 = altissimo (C7-D7)
  isAlternate?: boolean;
  altDescription?: string;
  difficulty: '初级' | '中级' | '高级';
  // Flute Boehm key states
  keys: {
    // Left Hand
    thumbB: boolean;      // Thumb B key (standard)
    thumbBb: boolean;     // Briccialdi Bb thumb lever
    lh1: boolean;         // LH Index
    lh2: boolean;         // LH Middle
    lh3: boolean;         // LH Ring
    lhGSharp: boolean;    // LH Pinky (G# key)
    
    // Right Hand
    rh1: boolean;         // RH Index
    rh2: boolean;         // RH Middle
    rh3: boolean;         // RH Ring
    rhEb: boolean;        // RH Pinky (Eb key - standard open on most notes)
    rhLowCs: boolean;     // Low C# key
    rhLowC: boolean;      // Low C key
    rhLowB?: boolean;     // Low B key (if B foot)
    
    // Trill keys (between RH and LH)
    trill1?: boolean;     // D trill key
    trill2?: boolean;     // D# trill key
  };
  tips: string;
}

export type PracticeCategory = 
  | 'long_tone'     // 长音与音色
  | 'harmonics'     // 泛音与口风灵活性
  | 'scales'        // 音阶与琶音
  | 'articulation'  // 吐音与运舌 (单吐/双吐/三吐)
  | 'flexibility'   // 手指灵活性与颤音
  | 'etudes'        // 练习曲 (Andersen/Köhler/Gariboldi)
  | 'repertoire';   // 独奏与乐队片段 (Bach/Mozart/Chaminade)

export interface ExerciseItem {
  id: string;
  category: PracticeCategory;
  title: string;
  subtitle: string;
  composerOrSource: string;
  description: string;
  defaultBpm?: number;
  targetBpm?: number;
  durationMinutes: number;
  keyPoints: string[];
  sampleSheetNotation?: string;
}

export interface PracticeLog {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  categories: PracticeCategory[];
  bpmAchieved?: number;
  rating: number; // 1 to 5
  notes: string;
  etudeOrPiece?: string;
}

export interface DailyGoal {
  targetMinutes: number;
  daysPerWeek: number;
}

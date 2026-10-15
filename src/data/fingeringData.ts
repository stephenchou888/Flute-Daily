import { FluteFingering } from '@/types/flute';

export const FLUTE_FINGERINGS: FluteFingering[] = [
  // 低音区 (Octave 1)
  {
    note: 'C4',
    displayName: '低音 C (C4)',
    solfege: 'Do',
    frequency: 261.63,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: true, rhEb: false, rhLowCs: true, rhLowC: true
    },
    tips: '长笛最低音之一。需要口风松弛、喉部打开、气流温暖而稳定，不可拼命挤压嘴唇。'
  },
  {
    note: 'C#4',
    displayName: '低音 C# / Db (C#4)',
    solfege: 'Di / Ra',
    frequency: 277.18,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: true, rhEb: false, rhLowCs: true, rhLowC: false
    },
    tips: '右小指只按下 C# 键。注意保持低音管身共鸣。'
  },
  {
    note: 'D4',
    displayName: '低音 D (D4)',
    solfege: 'Re',
    frequency: 293.66,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: true, rhEb: false, rhLowCs: false, rhLowC: false
    },
    tips: '低音基准音之一。右小指不按 Eb 键，气流向下倾斜约 45 度。'
  },
  {
    note: 'D#4',
    displayName: '低音 D# / Eb (Eb4)',
    solfege: 'Ri / Me',
    frequency: 311.13,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: true, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '从这里开始，右小指常驻按压 Eb 键（作为长笛主要支撑点）。'
  },
  {
    note: 'E4',
    displayName: '低音 E (E4)',
    solfege: 'Mi',
    frequency: 329.63,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '右手无名指抬起。气息要深沉饱满。'
  },
  {
    note: 'F4',
    displayName: '低音 F (F4)',
    solfege: 'Fa',
    frequency: 349.23,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '右手仅食指与小指按下。'
  },
  {
    note: 'F#4',
    displayName: '低音 F# / Gb (F#4)',
    solfege: 'Fi / Se',
    frequency: 369.99,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: true, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '标准指法为右手按无名指和小指，不可用右手中指。'
  },
  {
    note: 'G4',
    displayName: '中低音 G (G4)',
    solfege: 'Sol',
    frequency: 392.00,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手食、中、无名指与拇指按住，右手小指按 Eb 键支撑。'
  },
  {
    note: 'G#4',
    displayName: '中低音 G# / Ab (Ab4)',
    solfege: 'Si / Le',
    frequency: 415.30,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: true,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手小指按下侧面 G# 键。'
  },
  {
    note: 'A4',
    displayName: '中音 A (A4 - 国际标准校音音)',
    solfege: 'La',
    frequency: 440.00,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '长笛音准基准音（440Hz / 442Hz）。用该音做长音练习能检验笛头插入深度。'
  },
  {
    note: 'A#4',
    displayName: '中音 Bb / A# (Bb4 标准指法 1+1)',
    solfege: 'Li / Te',
    frequency: 466.16,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '标准 1+1 指法（LH1 + RH1）。音质均衡纯净。'
  },
  {
    note: 'A#4',
    displayName: '中音 Bb (Briccialdi 拇指键替代指法)',
    solfege: 'Li / Te',
    frequency: 466.16,
    octave: 1,
    isAlternate: true,
    altDescription: '布里恰尔迪拇指降B键 (Thumb Bb)',
    difficulty: '中级',
    keys: {
      thumbB: false, thumbBb: true, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '使用左手拇指 Bb 键，在 F 大调、降 B 大调等快速音阶中极其顺滑。'
  },
  {
    note: 'B4',
    displayName: '中音 B (B4)',
    solfege: 'Ti',
    frequency: 493.88,
    octave: 1,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '莫伊斯长音训练起点音（Marcel Moyse 推荐由此音向下练习长音）。'
  },

  // 中高音区 (Octave 2)
  {
    note: 'C5',
    displayName: '中音 C (C5)',
    solfege: 'Do',
    frequency: 523.25,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: false, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手拇指抬起！仅左手食指与右手小指按压，注意管身平稳。'
  },
  {
    note: 'C#5',
    displayName: '中音 C# / Db (C#5)',
    solfege: 'Di / Ra',
    frequency: 554.37,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: false, thumbBb: false, lh1: false, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '几乎全开，仅右手小指按 Eb 键维持稳定。此音易偏高，气流需向下略收。'
  },
  {
    note: 'D5',
    displayName: '高八度 D (D5)',
    solfege: 'Re',
    frequency: 587.33,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: false, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: true, rhEb: false, rhLowCs: false, rhLowC: false
    },
    tips: '⚠️重要：左手食指必须抬起！右手小指放开。初学者最易在此漏抬食指。'
  },
  {
    note: 'D#5',
    displayName: '高八度 D# / Eb (Eb5)',
    solfege: 'Ri / Me',
    frequency: 622.25,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: false, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: true, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手食指抬起，右小指按 Eb 键。'
  },
  {
    note: 'E5',
    displayName: '中高音 E (E5)',
    solfege: 'Mi',
    frequency: 659.25,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: true, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '指法同 E4，依靠微调口风与稍快的核心气流使其翻高八度。'
  },
  {
    note: 'F5',
    displayName: '中高音 F (F5)',
    solfege: 'Fa',
    frequency: 698.46,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '同 F4 指法，气流更紧致聚焦。'
  },
  {
    note: 'F#5',
    displayName: '中高音 F# (F#5)',
    solfege: 'Fi',
    frequency: 739.99,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: true, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '注意仍用右手无名指，音色比低八度更具穿透力。'
  },
  {
    note: 'G5',
    displayName: '高八度 G (G5)',
    solfege: 'Sol',
    frequency: 783.99,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '明亮饱满的中高音过渡点。'
  },
  {
    note: 'G#5',
    displayName: '高八度 G# / Ab (Ab5)',
    solfege: 'Si',
    frequency: 830.61,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: true,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '指法同 G#4，左手小指按键。'
  },
  {
    note: 'A5',
    displayName: '高八度 A (A5)',
    solfege: 'La',
    frequency: 880.00,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '泛音饱满，喉部保持如说“噢(Oh)”的放松状态。'
  },
  {
    note: 'A#5',
    displayName: '高八度 Bb / A# (Bb5)',
    solfege: 'Li',
    frequency: 932.33,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '可用 1+1 或 Thumb Bb 键演奏。'
  },
  {
    note: 'B5',
    displayName: '高八度 B (B5)',
    solfege: 'Ti',
    frequency: 987.77,
    octave: 2,
    difficulty: '初级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '中高音最高音，准备跨入超吹高音区。'
  },

  // 高音区 (Octave 3 - 第三八度)
  {
    note: 'C6',
    displayName: '高音 C (C6)',
    solfege: 'Do',
    frequency: 1046.50,
    octave: 3,
    difficulty: '中级',
    keys: {
      thumbB: false, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '同 C5 指法，气流更聚拢、略微前推下唇。'
  },
  {
    note: 'C#6',
    displayName: '高音 C# / Db (C#6)',
    solfege: 'Di',
    frequency: 1108.73,
    octave: 3,
    difficulty: '中级',
    keys: {
      thumbB: false, thumbBb: false, lh1: false, lh2: false, lh3: false, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '全开键，控制气流角度避免刺耳偏高。'
  },
  {
    note: 'D6',
    displayName: '超吹高音 D (D6)',
    solfege: 'Re',
    frequency: 1174.66,
    octave: 3,
    difficulty: '中级',
    keys: {
      thumbB: false, thumbBb: false, lh1: false, lh2: true, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '⚠️注意：拇指、LH1放开！仅左手中指、无名指与右小指按压，音色清脆响亮。'
  },
  {
    note: 'D#6',
    displayName: '超吹高音 D# / Eb (Eb6)',
    solfege: 'Ri',
    frequency: 1244.51,
    octave: 3,
    difficulty: '中级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: true,
      rh1: true, rh2: true, rh3: true, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '几乎全按！包括左手 G# 键及右手全部与小指 Eb。'
  },
  {
    note: 'E6',
    displayName: '超吹高音 E (E6 - 著名难发音点)',
    solfege: 'Mi',
    frequency: 1318.51,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: true, lh3: false, lhGSharp: false,
      rh1: true, rh2: true, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手 3 放开！长笛物理声学难点（通常 E 分割机械装置 E-Mechanism 能大幅改善发音稳定度）。'
  },
  {
    note: 'F6',
    displayName: '超吹高音 F (F6)',
    solfege: 'Fa',
    frequency: 1396.91,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: true, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手食指和无名指按，中指放开（叉状指法）。'
  },
  {
    note: 'F#6',
    displayName: '超吹高音 F# (F#6)',
    solfege: 'Fi',
    frequency: 1479.98,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: true, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '右手按无名指和小指 Eb。下巴微收，气速加快。'
  },
  {
    note: 'G6',
    displayName: '超吹高音 G (G6)',
    solfege: 'Sol',
    frequency: 1567.98,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: false, thumbBb: false, lh1: true, lh2: true, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手拇指必须放开！右手仅按小指 Eb。'
  },
  {
    note: 'G#6',
    displayName: '超吹高音 G# (G#6)',
    solfege: 'Si',
    frequency: 1661.22,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: false, thumbBb: false, lh1: false, lh2: true, lh3: true, lhGSharp: true,
      rh1: false, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '拇指与食指皆放开，左手按中指、无名指与 G# 键。'
  },
  {
    note: 'A6',
    displayName: '超吹高音 A (A6)',
    solfege: 'La',
    frequency: 1760.00,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: true, thumbBb: false, lh1: false, lh2: true, lh3: false, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false
    },
    tips: '左手拇指+中指，右手食指+小指。需要极度集中的细气流。'
  },
  {
    note: 'A#6',
    displayName: '超吹高音 Bb (Bb6)',
    solfege: 'Li',
    frequency: 1864.66,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: true, thumbBb: false, lh1: false, lh2: false, lh3: true, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false,
      trill1: true
    },
    tips: '通常借助第一颤音键 (D trill key)。'
  },
  {
    note: 'B6',
    displayName: '极限高音 B (B6)',
    solfege: 'Ti',
    frequency: 1975.53,
    octave: 3,
    difficulty: '高级',
    keys: {
      thumbB: true, thumbBb: false, lh1: true, lh2: false, lh3: true, lhGSharp: false,
      rh1: false, rh2: false, rh3: false, rhEb: false, rhLowCs: false, rhLowC: false,
      trill1: true
    },
    tips: '利用颤音键发音，练习时避免喉部收缩。'
  },
  {
    note: 'C7',
    displayName: '极限高音 C (C7 - 长笛最高常规音)',
    solfege: 'Do',
    frequency: 2093.00,
    octave: 4,
    difficulty: '高级',
    keys: {
      thumbB: false, thumbBb: false, lh1: true, lh2: false, lh3: false, lhGSharp: false,
      rh1: true, rh2: false, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false,
      trill1: true
    },
    tips: '交响乐与技巧曲终曲高潮常见音。需要强大下腹部气流支撑与极其精细的口风孔隙。'
  },
  {
    note: 'D7',
    displayName: '极限泛音 D (D7 - 独奏巅峰)',
    solfege: 'Re',
    frequency: 2349.32,
    octave: 4,
    difficulty: '高级',
    keys: {
      thumbB: false, thumbBb: false, lh1: false, lh2: true, lh3: false, lhGSharp: false,
      rh1: false, rh2: true, rh3: false, rhEb: true, rhLowCs: false, rhLowC: false,
      trill2: true
    },
    tips: '现代长笛扩展指法，结合右侧高音颤音键。'
  }
];

import { ExerciseItem } from '@/types/flute';

export const PRACTICE_ROUTINES: ExerciseItem[] = [
  // 1. 长音与音色 (Moyse)
  {
    id: 'tone-moyse-1',
    category: 'long_tone',
    title: '莫伊斯中音向下半音长音练习',
    subtitle: 'Marcel Moyse - De la Sonorité (音色与发音技巧)',
    composerOrSource: 'Marcel Moyse',
    description: '从最容易发出丰润纯净音色的 B4 开始，以 8-12 拍的速度连贯向下推移至 Bb4、A4、Ab4 ... 直至低音 C4。每个音确保音色圆润、喉部彻底放松。',
    defaultBpm: 60,
    targetBpm: 60,
    durationMinutes: 10,
    keyPoints: [
      '保持口风中央极其柔和，下唇覆盖吹孔约 1/4 到 1/3',
      '由 B4 吹向 Bb4 时，音质必须与前一个音保持完全一致的纯净度与光泽感',
      '避免音尾下滑或音头爆破，结尾自然渐弱淡出',
      '腹肌深处平稳给气，不要耸肩或胸部憋气'
    ],
    sampleSheetNotation: 'B4 ———— Bb4 ———— | Bb4 ———— A4 ———— | A4 ———— Ab4 ———— | Ab4 ———— G4 ————'
  },
  {
    id: 'tone-dynamic-curves',
    category: 'long_tone',
    title: '色彩渐强渐弱 (Messa di Voce)',
    subtitle: '极弱(pp) 到 极强(ff) 再到 极弱(pp) 的动态音准控制',
    composerOrSource: 'Trevor Wye / Moyse',
    description: '单音持续 16 拍：前 8 拍从 pp 缓慢且均匀渐强至 ff，后 8 拍从 ff 缓慢渐弱回 pp。在整个动态变化中，音高绝不可偏高或偏低！',
    defaultBpm: 60,
    targetBpm: 60,
    durationMinutes: 8,
    keyPoints: [
      '渐强(crescendo)时，笛音容易偏高：下唇微收、气流角度稍向下倾斜以保持音准',
      '渐弱(diminuendo)时，笛音容易偏低：下颚与下唇微往前推、气流稍微向上抬起',
      '关注音色的核心密度，即使在 ppp 状态下仍具有共鸣核心'
    ],
    sampleSheetNotation: 'A4: [pp < < < < mf > > > > ff > > > > pp]'
  },

  // 2. 泛音与口风灵活性 (Harmonics)
  {
    id: 'harmonics-low-c-d',
    category: 'harmonics',
    title: '低音指法多层泛音练习 (Overtones)',
    subtitle: '手指固定指法，纯以气息速度与口风角度激发泛音',
    composerOrSource: 'Robert Dick / Trevor Wye',
    description: '保持低音 C4 指法不变，纯靠调整口风角度与气流速度，依次吹出：基音 C4 -> 8度 C5 -> 12度 G5 -> 15度 C6 -> 17度 E6。然后换到 C#4、D4 指法重复。',
    defaultBpm: 60,
    targetBpm: 72,
    durationMinutes: 10,
    keyPoints: [
      '手指绝对不要动！严禁用真实高音指法作弊',
      '通过向前轻微推进下唇和收窄风口来加速气流',
      '泛音能极大锻炼唇肌核心力量与敏锐的泛音听辨力',
      '吹完泛音后立刻吹响真实指法的高音，感受音色丰满度的质的飞跃'
    ],
    sampleSheetNotation: 'Fingering [Low C4]: C4 -> C5 -> G5 -> C6 -> E6'
  },

  // 3. 音阶与琶音 (Taffanel & Gaubert)
  {
    id: 'tg-ej4-scales',
    category: 'scales',
    title: '塔法内尔与高伯特 17 每日大练习 (EJ 4)',
    subtitle: 'Taffanel & Gaubert - 17 Grands Exercices Journaliers',
    composerOrSource: 'P. Taffanel & Ph. Gaubert',
    description: '长笛演奏者的《圣经》。以流畅均匀的十六分音符，贯穿低音区至超高音区（C4 至 C7）。要求音与音之间如珍珠般平滑无缝连接。',
    defaultBpm: 76,
    targetBpm: 120,
    durationMinutes: 15,
    keyPoints: [
      '手指动作幅度尽量小，指肚贴近键盖上方不超过 1 厘米',
      '从低音到高音气流角度微微向上提，音量保持均匀，不可在高音区突发炸响',
      '结合连音(Legato)与轻吐音(Staccato)两种呼吸循环交替练习'
    ],
    sampleSheetNotation: 'C4-D4-E4-F4-G4-A4-B4-C5-D5-E5-F5-G5-A5-B5-C6-D6-E6-F6-G6-A6-B6-C7 (Up & Down)'
  },
  {
    id: 'tg-ej1-arpeggios',
    category: 'scales',
    title: '三和弦与减七和弦琶音 (EJ 10/11)',
    subtitle: '24个大小调主和弦、属七和弦与减七和弦琶音',
    composerOrSource: 'Taffanel & Gaubert',
    description: '跨越三个八度的琶音上下行大跳练习。训练音程大跳时的喉部放松与口风瞬间对位定位。',
    defaultBpm: 72,
    targetBpm: 112,
    durationMinutes: 12,
    keyPoints: [
      '大跳时不要依靠下巴猛烈晃动，而要依靠腹肌弹性支撑',
      '中音到高音转换时，右手支撑点保持稳定',
      '注意三度、四度、六度音程的纯律谐和'
    ],
    sampleSheetNotation: 'C4 - E4 - G4 - C5 - E5 - G5 - C6 - E6 - G6 - C7 (Arpeggio)'
  },

  // 4. 吐音与技巧 (Articulation)
  {
    id: 'articulation-double-tonguing',
    category: 'articulation',
    title: '长笛双吐音提速练习 (Double Tonguing: T-K-T-K)',
    subtitle: '舌尖与舌根力量的平衡 (Ti-Ki / Te-Ke)',
    composerOrSource: 'Marcel Moyse / Trevor Wye',
    description: '双吐不仅需要快，更需要 "K" 音具有和 "T" 音完全相同的爆发力、清晰度与音色厚度。先在单音上做发音平衡，再迁移至音阶。',
    defaultBpm: 80,
    targetBpm: 144,
    durationMinutes: 10,
    keyPoints: [
      '先单独练习纯 "K-K-K-K" 吐音，唤醒后舌根力量',
      'T-K 时气流不可断开，想象连续呼气在舌面上被轻轻“切片”',
      '舌位前置，避免 "K" 音带有过多喉咙杂音',
      '从低音区 D4 开始逐步往上爬升至 A5'
    ],
    sampleSheetNotation: 'T-K-T-K T-K-T-K | T-K-T-K T (四连音十六分拍)'
  },
  {
    id: 'articulation-triple-tonguing',
    category: 'articulation',
    title: '三吐音与切分重音 (Triple Tonguing)',
    subtitle: 'T-K-T T-K-T 或 T-K-T K-T-K',
    composerOrSource: 'Traditional Flute Pedagogy',
    description: '针对三连音快速乐句（如罗西尼《威廉·退尔》序曲、门德尔松《仲夏夜之梦》诙谐曲）。',
    defaultBpm: 72,
    targetBpm: 132,
    durationMinutes: 8,
    keyPoints: [
      '重音准确落在三连音的第一拍上',
      '气流源源不绝，切忌因为运舌导致气流停滞',
      '保持口唇形态稳定，严禁嘴唇随运舌蠕动'
    ],
    sampleSheetNotation: 'T-K-T T-K-T | T-K-T T-K-T (Triplets)'
  },

  // 5. 灵活性与颤音 (Flexibility)
  {
    id: 'reichert-daily-2',
    category: 'flexibility',
    title: '赖歇特每日七大练习 (Reichert No. 2)',
    subtitle: 'M. A. Reichert - 7 Daily Exercises Op. 5',
    composerOrSource: 'M. A. Reichert',
    description: '优美且富有歌唱性的手指机能训练。解决长笛指法中最棘手的几个半音转换和无名指独立性。',
    defaultBpm: 84,
    targetBpm: 126,
    durationMinutes: 12,
    keyPoints: [
      '左右手无名指与小指必须保持放松自然的拱形',
      '特别注意 D#4/Eb4 到 E4，以及 C#5 到 D5 的手指配合',
      '像在弹钢琴一样触键，击键干脆且轻盈'
    ],
    sampleSheetNotation: 'Reichert Op.5 No.2 Pattern in C Major, G Major, D Major...'
  },

  // 6. 练习曲与经典曲目 (Etudes & Repertoire)
  {
    id: 'andersen-etude-op33',
    category: 'etudes',
    title: '安德森长笛练习曲 Op. 33',
    subtitle: 'J. Andersen - 24 Progressive Studies for Flute',
    composerOrSource: 'Joachim Andersen',
    description: '涵盖各种调性、运舌法、强弱对比与旋律表现力的古典经典练习曲。',
    defaultBpm: 80,
    targetBpm: 108,
    durationMinutes: 20,
    keyPoints: [
      '先以较慢的速度分句分析乐句结构与呼吸记号',
      '难点小节单独循环 5-10 次',
      '重视音乐表情记号（dolce, espressivo, marcato）'
    ],
    sampleSheetNotation: 'No.1 in C Major (Allegro energico) / No.2 in A Minor'
  },
  {
    id: 'repertoire-mozart-g',
    category: 'repertoire',
    title: '莫扎特 G大调第一长笛协奏曲 K.313',
    subtitle: 'W. A. Mozart - Flute Concerto No. 1 in G Major',
    composerOrSource: 'W. A. Mozart',
    description: '长笛演奏艺术试金石。要求高贵典雅的音色、极其精准的节奏与水晶般透明的吐音。',
    defaultBpm: 112,
    targetBpm: 120,
    durationMinutes: 25,
    keyPoints: [
      '第一乐章 Allegro maestoso：第一音庄严辉煌，三十二分音符运舌轻灵',
      '第二乐章 Adagio non troppo：歌唱性如女高音咏叹调，气息线条绵长',
      '注意装饰音（倚音与颤音）的古典风格处理'
    ],
    sampleSheetNotation: 'K.313 Movement 1 Exposition: Solo Entry'
  }
];

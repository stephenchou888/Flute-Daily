import { PracticeLog, DailyGoal } from '@/types/flute';

const STORAGE_KEY_LOGS = 'flute_daily_logs_v1';
const STORAGE_KEY_GOAL = 'flute_daily_goal_v1';
const STORAGE_KEY_THEME = 'flute_daily_theme_v1';

// Seed sample records for a realistic initial experience
const getInitialSeedLogs = (): PracticeLog[] => {
  const today = new Date();
  const formatDate = (offsetDays: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - offsetDays);
    return d.toISOString().split('T')[0];
  };

  return [
    {
      id: 'seed-log-1',
      date: formatDate(0),
      startTime: '09:30',
      durationMinutes: 45,
      categories: ['long_tone', 'scales', 'articulation'],
      bpmAchieved: 112,
      rating: 5,
      notes: '今天重点练习了莫伊斯 B4-C4 半音下行长音，音色非常纯净温暖。双吐提速到了 112 BPM。',
      etudeOrPiece: 'Taffanel & Gaubert EJ4'
    },
    {
      id: 'seed-log-2',
      date: formatDate(1),
      startTime: '20:15',
      durationMinutes: 35,
      categories: ['long_tone', 'harmonics', 'etudes'],
      bpmAchieved: 88,
      rating: 4,
      notes: '低音 C 泛音列练习，口风微调有进步，高音 E6 泛音更轻松发音了。',
      etudeOrPiece: 'Andersen Op.33 No.1'
    },
    {
      id: 'seed-log-3',
      date: formatDate(2),
      startTime: '16:00',
      durationMinutes: 50,
      categories: ['scales', 'flexibility', 'repertoire'],
      bpmAchieved: 104,
      rating: 4,
      notes: '练习莫扎特 G 大调第一长笛协奏曲第一乐章呈示部，注意华彩段前的三十二分音符运舌轻巧。',
      etudeOrPiece: 'Mozart K.313 in G Major'
    },
    {
      id: 'seed-log-4',
      date: formatDate(4),
      startTime: '10:00',
      durationMinutes: 30,
      categories: ['long_tone', 'scales'],
      bpmAchieved: 96,
      rating: 4,
      notes: '长音动态渐强渐弱控制，渐弱时注意下唇略往前送保持音高不偏低。',
      etudeOrPiece: 'Moyse De la Sonorite'
    },
    {
      id: 'seed-log-5',
      date: formatDate(5),
      startTime: '19:00',
      durationMinutes: 40,
      categories: ['articulation', 'etudes'],
      bpmAchieved: 120,
      rating: 5,
      notes: '双吐 T-K-T-K 练习，舌尖与舌根力量更均衡。',
      etudeOrPiece: 'Gariboldi Etude No. 8'
    }
  ];
};

export function getStoredLogs(): PracticeLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    if (!raw) {
      const initial = getInitialSeedLogs();
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredLogs(logs: PracticeLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save logs to localStorage:', err);
  }
}

export function addPracticeLog(log: Omit<PracticeLog, 'id'>): PracticeLog {
  const logs = getStoredLogs();
  const newLog: PracticeLog = {
    ...log,
    id: `flute-log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  };
  const updated = [newLog, ...logs];
  saveStoredLogs(updated);
  return newLog;
}

export function deletePracticeLog(id: string): void {
  const logs = getStoredLogs();
  const updated = logs.filter(l => l.id !== id);
  saveStoredLogs(updated);
}

export function getDailyGoal(): DailyGoal {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GOAL);
    if (!raw) return { targetMinutes: 45, daysPerWeek: 5 };
    return JSON.parse(raw);
  } catch {
    return { targetMinutes: 45, daysPerWeek: 5 };
  }
}

export function saveDailyGoal(goal: DailyGoal): void {
  try {
    localStorage.setItem(STORAGE_KEY_GOAL, JSON.stringify(goal));
  } catch (err) {
    console.error('Failed to save daily goal:', err);
  }
}

// Calculate streak (consecutive days of practice up to today)
export function calculateStreak(logs: PracticeLog[]): { currentStreak: number; longestStreak: number } {
  if (logs.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const uniqueDates = Array.from(new Set(logs.map(l => l.date))).sort().reverse();
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let currentStreak = 0;
  // If practiced today or yesterday, streak is ongoing
  const startsFromToday = uniqueDates.includes(todayStr);
  const startsFromYesterday = uniqueDates.includes(yesterdayStr);

  if (startsFromToday || startsFromYesterday) {
    let checkDate = new Date(startsFromToday ? todayStr : yesterdayStr);
    while (true) {
      const dateString = checkDate.toISOString().split('T')[0];
      if (uniqueDates.includes(dateString)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak in entire history
  const sortedDatesAsc = Array.from(new Set(logs.map(l => l.date))).sort();
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  for (const dStr of sortedDatesAsc) {
    const curr = new Date(dStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffMs = curr.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevDate = curr;
  }

  return {
    currentStreak: Math.max(currentStreak, 0),
    longestStreak: Math.max(longestStreak, currentStreak)
  };
}

export function exportDataAsJSON(): string {
  const logs = getStoredLogs();
  const goal = getDailyGoal();
  const exportPayload = {
    appName: 'Flute Daily',
    exportedAt: new Date().toISOString(),
    goal,
    logs
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importDataFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed.logs)) {
      saveStoredLogs(parsed.logs);
      if (parsed.goal) {
        saveDailyGoal(parsed.goal);
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  UserRole,
  CurriculumSubject,
  Decree,
  PromisedReward,
  DailyLog,
  AuditFlag,
  RankData,
} from '../types';
import { GRADE_9_CURRICULUM } from '../data/curriculumGrade9';

interface AppContextType {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  studentProfile: UserProfile;
  curriculum: CurriculumSubject[];
  decrees: Decree[];
  rewards: PromisedReward[];
  dailyLogs: DailyLog[];
  auditLogs: AuditFlag[];
  hasCheckedInToday: boolean;
  submitDailyCheckIn: (data: { studyMinutes: number; subjects: string[]; reflectionEasy: string; reflectionChallenging: string }) => void;
  submitQuizAttempt: (unitId: string, score: number, passed: boolean, tabSwitchesCount: number) => void;
  approveUnit: (unitId: string) => void;
  rejectUnit: (unitId: string, reason?: string) => void;
  startUnit: (unitId: string) => void;
  toggleChapterCompletion: (unitId: string, chapterTitle: string) => void;
  postDecree: (title: string, message: string, urgency: 'normal' | 'high' | 'celebration') => void;
  deleteDecree: (id: string) => void;
  addReward: (reward: Omit<PromisedReward, 'id' | 'isUnlocked' | 'isClaimed' | 'unlockedDate'>) => void;
  claimReward: (rewardId: string) => void;
  grantMastersGraceStreakFreeze: () => void;
  addStudyMinutes: (minutes: number) => void;
  calculatePredictedScore: () => {
    predictedScore: number;
    completionPercentage: number;
    quizAverage: number;
    consistencyScore: number;
    completedUnits: number;
    totalUnits: number;
    inProgressUnits: number;
    totalChapters: number;
    completedChaptersCount: number;
    currentRank: RankData;
  };
  themeMode: 'dark' | 'light';
  toggleThemeMode: () => void;
  resetAllDataToDefaults: () => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'benohel_mastery_nindo_v4';

const INITIAL_PROFILE: UserProfile = {
  id: 'benohel-01',
  name: 'Benohel Yosef',
  title: 'Genin Cadet • The Great Student of Master Dagiyosi',
  role: 'student',
  level: 1,
  xp: 220,
  currentStreak: 5,
  longestStreak: 7,
  lastCheckInDate: null,
  totalStudyMinutes: 425,
  targetExamYear: 2029,
};

const INITIAL_DECREES: Decree[] = [
  {
    id: 'dec-1',
    sender: 'Master Dagiyosi (Hokage Overwatch • 700 Miles)',
    title: 'THE NINDO CREED: NO SHORTCUTS TO BECOMING HOKAGE!',
    message: 'Benohel, listen to me closely: "I never go back on my word, and I never run away from my training... THAT IS MY NINDO, THAT IS MY NINJA WAY!" The Grade 12 National University Entrance Exam is not won during the final month of Grade 12. It is won right now, in Grade 9, in the discipline of solving one problem at a time. No shortcuts, no skipping days, and zero genjutsu (no lies/cheating). You are destined for AAU Medicine or AAiT Software Titan. A dropout will beat a genius through sheer hard work! Train your Will of Fire today!',
    date: '2026-11-12',
    urgency: 'high',
    active: true,
  },
  {
    id: 'dec-2',
    sender: 'Master Dagiyosi',
    title: 'NO GENJUTSU: Authentic Mindset Over AI Cheating',
    message: 'When you study each textbook chapter and take your Chunin mini-quizzes, remember: relying on AI or copy-pasting is a genjutsu that cheats only yourself. When you sit in the national exam hall with pen and paper, only what is forged in your own mind and your own chakra will stand with you. Train your intellect to be iron.',
    date: '2026-11-10',
    urgency: 'normal',
    active: true,
  },
];

const INITIAL_REWARDS: PromisedReward[] = [
  {
    id: 'rew-1',
    title: '15-Day Unbroken Streak Milestone',
    rewardDescription: 'Master Dagiyosi unlocks his private Google Drive Formula Vault & Telegram Exam Summary Guides + sends a personalized signed letter of commendation across the 700 miles!',
    conditionType: 'streak',
    targetValue: 15,
    progressValue: 5,
    isUnlocked: false,
    isClaimed: false,
    unlockedDate: null,
  },
  {
    id: 'rew-2',
    title: 'Semester 1 STEM Core Mastery (6 Units)',
    rewardDescription: 'Master Dagiyosi gifts a dedicated hardcover formula notebook & premium exam pen set, plus a guaranteed 3-hour weekend PUBG Mobile Duo Squad session with Dagi!',
    conditionType: 'unit_completion',
    targetValue: 6,
    progressValue: 1,
    isUnlocked: false,
    isClaimed: false,
    unlockedDate: null,
  },
  {
    id: 'rew-3',
    title: '50 Verified Deep Study Hours',
    rewardDescription: 'Master Dagiyosi formally passes down his own trusted scientific calculator as an heirloom torch, plus sponsors your favorite local pastry, juice, or special family lunch treat!',
    conditionType: 'focus_hours',
    targetValue: 50,
    progressValue: 7, // 425 min / 60
    isUnlocked: false,
    isClaimed: false,
    unlockedDate: null,
  },
  {
    id: 'rew-4',
    title: 'Grade 9 Full Curriculum Conquest (34 Units)',
    rewardDescription: 'Master Dagiyosi calls a special family celebration to officially declare Benohel the Family Academic Titan, plus orders a special Winner Winner Victory meal celebration!',
    conditionType: 'unit_completion',
    targetValue: 34,
    progressValue: 1,
    isUnlocked: false,
    isClaimed: false,
    unlockedDate: null,
  },
];

const INITIAL_AUDIT_LOGS: AuditFlag[] = [
  {
    id: 'aud-1',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    type: 'daily_checkin',
    details: 'Benohel completed daily check-in (Physics Unit 1 study logged for 60 min)',
    severity: 'info',
  },
  {
    id: 'aud-2',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    type: 'quiz_passed',
    details: 'Benohel passed Physics Unit 1 Mini-Quiz with 85% (passed ≥75% threshold). Submitted for review.',
    severity: 'info',
  },
  {
    id: 'aud-3',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    type: 'unit_approved',
    details: 'Master Dagiyosi reviewed and approved Physics Unit 1 (Verified Complete). +150 XP awarded.',
    severity: 'info',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('student');
  const [studentProfile, setStudentProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [curriculum, setCurriculum] = useState<CurriculumSubject[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_curriculum`);
    if (saved) return JSON.parse(saved);
    return JSON.parse(JSON.stringify(GRADE_9_CURRICULUM));
  });

  const [decrees, setDecrees] = useState<Decree[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_decrees`);
    return saved ? JSON.parse(saved) : INITIAL_DECREES;
  });

  const [rewards, setRewards] = useState<PromisedReward[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_rewards`);
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });

  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_logs`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-seed-1',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        subjects: ['Physics', 'Mathematics'],
        studyMinutes: 60,
        reflectionEasy: 'Physics branches and measurement units are very clear and logical.',
        reflectionChallenging: 'Practicing significant figure propagation in multiplication problems.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      }
    ];
  });

  const [auditLogs, setAuditLogs] = useState<AuditFlag[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('benohel_theme_mode');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('benohel_theme_mode', next);
      return next;
    });
  };

  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    }
  }, [themeMode]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_curriculum`, JSON.stringify(curriculum));
  }, [curriculum]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_decrees`, JSON.stringify(decrees));
  }, [decrees]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_rewards`, JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_logs`, JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const todayStr = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = studentProfile.lastCheckInDate === todayStr;

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 300) + 1;
  };

  const submitDailyCheckIn = (data: {
    studyMinutes: number;
    subjects: string[];
    reflectionEasy: string;
    reflectionChallenging: string;
  }) => {
    const today = new Date().toISOString().split('T')[0];
    const isConsecutive = studentProfile.lastCheckInDate
      ? (new Date(today).getTime() - new Date(studentProfile.lastCheckInDate).getTime()) <= 86400000 * 1.5
      : true;

    const newStreak = isConsecutive ? studentProfile.currentStreak + 1 : 1;
    const newLongest = Math.max(newStreak, studentProfile.longestStreak);
    const earnedXp = 50 + Math.floor(data.studyMinutes / 2);

    const newProfile: UserProfile = {
      ...studentProfile,
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastCheckInDate: today,
      totalStudyMinutes: studentProfile.totalStudyMinutes + data.studyMinutes,
      xp: studentProfile.xp + earnedXp,
      level: calculateLevel(studentProfile.xp + earnedXp),
    };

    setStudentProfile(newProfile);

    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      date: today,
      subjects: data.subjects,
      studyMinutes: data.studyMinutes,
      reflectionEasy: data.reflectionEasy,
      reflectionChallenging: data.reflectionChallenging,
      timestamp: new Date().toISOString(),
    };
    setDailyLogs((prev) => [newLog, ...prev]);

    // Check streak & focus hour rewards
    setRewards((prev) =>
      prev.map((r) => {
        if (r.conditionType === 'streak') {
          const isUnlocked = newStreak >= r.targetValue;
          return {
            ...r,
            progressValue: newStreak,
            isUnlocked: isUnlocked || r.isUnlocked,
            unlockedDate: isUnlocked && !r.isUnlocked ? new Date().toISOString() : r.unlockedDate,
          };
        }
        if (r.conditionType === 'focus_hours') {
          const hours = Math.floor(newProfile.totalStudyMinutes / 60);
          const isUnlocked = hours >= r.targetValue;
          return {
            ...r,
            progressValue: hours,
            isUnlocked: isUnlocked || r.isUnlocked,
            unlockedDate: isUnlocked && !r.isUnlocked ? new Date().toISOString() : r.unlockedDate,
          };
        }
        return r;
      })
    );

    const auditEntry: AuditFlag = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'daily_checkin',
      details: `Daily Check-In: Studied ${data.studyMinutes}m in ${data.subjects.join(', ')}. Streak is now ${newStreak} days!`,
      severity: 'info',
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const startUnit = (unitId: string) => {
    setCurriculum((prev) =>
      prev.map((subj) => ({
        ...subj,
        units: subj.units.map((u) => {
          if (u.id === unitId && u.status === 'not_started') {
            return { ...u, status: 'in_progress' };
          }
          return u;
        }),
      }))
    );
  };

  const toggleChapterCompletion = (unitId: string, chapterTitle: string) => {
    setCurriculum((prev) =>
      prev.map((subj) => ({
        ...subj,
        units: subj.units.map((u) => {
          if (u.id === unitId) {
            const isDone = u.completedChapters.includes(chapterTitle);
            const newCompleted = isDone
              ? u.completedChapters.filter((c) => c !== chapterTitle)
              : [...u.completedChapters, chapterTitle];

            return {
              ...u,
              completedChapters: newCompleted,
              status: u.status === 'not_started' && newCompleted.length > 0 ? 'in_progress' : u.status,
            };
          }
          return u;
        }),
      }))
    );
  };

  const submitQuizAttempt = (unitId: string, score: number, passed: boolean, tabSwitchesCount: number) => {
    let unitTitle = unitId;

    setCurriculum((prev) =>
      prev.map((subj) => ({
        ...subj,
        units: subj.units.map((u) => {
          if (u.id === unitId) {
            unitTitle = `${subj.name} - Unit ${u.unitNumber}: ${u.title}`;
            return {
              ...u,
              quizScore: score,
              quizPassed: passed,
              status: passed ? 'pending_approval' : 'in_progress',
            };
          }
          return u;
        }),
      }))
    );

    if (passed) {
      const bonus = score === 100 ? 50 : 0;
      const totalEarned = 100 + bonus;
      setStudentProfile((prev) => ({
        ...prev,
        xp: prev.xp + totalEarned,
        level: calculateLevel(prev.xp + totalEarned),
      }));

      const auditEntry: AuditFlag = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'quiz_passed',
        details: `Passed mini-quiz on ${unitTitle} with ${score}%. Submitted for Master Dagiyosi's review.`,
        severity: 'info',
      };
      setAuditLogs((prev) => [auditEntry, ...prev]);
    } else {
      const auditEntry: AuditFlag = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'quiz_failed',
        details: `Failed mini-quiz on ${unitTitle} with ${score}% (requires ≥ 75%). Encouraged to review unit materials.`,
        severity: 'warning',
      };
      setAuditLogs((prev) => [auditEntry, ...prev]);
    }

    if (tabSwitchesCount > 0) {
      const antiCheatAlert: AuditFlag = {
        id: `aud-cheat-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'tab_switch',
        details: `INTEGRITY ALERT: Benohel left the quiz tab ${tabSwitchesCount} time(s) while taking ${unitTitle} quiz! Possible search or external lookup.`,
        severity: 'critical',
      };
      setAuditLogs((prev) => [antiCheatAlert, ...prev]);
    }
  };

  const approveUnit = (unitId: string) => {
    let approvedTitle = unitId;

    setCurriculum((prev) =>
      prev.map((subj) => ({
        ...subj,
        units: subj.units.map((u) => {
          if (u.id === unitId) {
            approvedTitle = `${subj.name} - Unit ${u.unitNumber}: ${u.title}`;
            return {
              ...u,
              status: 'verified_completed',
              verifiedAt: new Date().toISOString(),
            };
          }
          return u;
        }),
      }))
    );

    setStudentProfile((prev) => ({
      ...prev,
      xp: prev.xp + 50,
      level: calculateLevel(prev.xp + 50),
    }));

    setRewards((prev) =>
      prev.map((r) => {
        if (r.conditionType === 'unit_completion') {
          const newCompletedCount = r.progressValue + 1;
          const isUnlocked = newCompletedCount >= r.targetValue;
          return {
            ...r,
            progressValue: newCompletedCount,
            isUnlocked: isUnlocked || r.isUnlocked,
            unlockedDate: isUnlocked && !r.isUnlocked ? new Date().toISOString() : r.unlockedDate,
          };
        }
        return r;
      })
    );

    const auditEntry: AuditFlag = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'unit_approved',
      details: `Master Dagiyosi verified & approved: ${approvedTitle}. Unit marked Verified Complete.`,
      severity: 'info',
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const rejectUnit = (unitId: string, reason?: string) => {
    setCurriculum((prev) =>
      prev.map((subj) => ({
        ...subj,
        units: subj.units.map((u) => {
          if (u.id === unitId) {
            return {
              ...u,
              status: 'in_progress',
              quizPassed: false,
            };
          }
          return u;
        }),
      }))
    );

    const auditEntry: AuditFlag = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'quiz_failed',
      details: `Master Dagiyosi requested a retake on Unit: ${unitId}. Note: ${reason || 'Review concepts thoroughly.'}`,
      severity: 'warning',
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const postDecree = (title: string, message: string, urgency: 'normal' | 'high' | 'celebration') => {
    const newDecree: Decree = {
      id: `dec-${Date.now()}`,
      sender: 'Master Dagiyosi',
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      urgency,
      active: true,
    };
    setDecrees((prev) => [newDecree, ...prev]);
  };

  const deleteDecree = (id: string) => {
    setDecrees((prev) => prev.filter((d) => d.id !== id));
  };

  const addReward = (reward: Omit<PromisedReward, 'id' | 'isUnlocked' | 'isClaimed' | 'unlockedDate'>) => {
    const newRew: PromisedReward = {
      ...reward,
      id: `rew-${Date.now()}`,
      isUnlocked: false,
      isClaimed: false,
      unlockedDate: null,
    };
    setRewards((prev) => [...prev, newRew]);
  };

  const claimReward = (rewardId: string) => {
    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, isClaimed: true } : r))
    );
  };

  const grantMastersGraceStreakFreeze = () => {
    setStudentProfile((prev) => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
      lastCheckInDate: new Date().toISOString().split('T')[0],
    }));

    const auditEntry: AuditFlag = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'streak_freeze',
      details: 'Master Dagiyosi granted "Master’s Grace" streak freeze! 700-mile connection safeguarded.',
      severity: 'info',
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const addStudyMinutes = (minutes: number) => {
    const earnedXp = Math.floor(minutes / 2);
    setStudentProfile((prev) => ({
      ...prev,
      totalStudyMinutes: prev.totalStudyMinutes + minutes,
      xp: prev.xp + earnedXp,
      level: calculateLevel(prev.xp + earnedXp),
    }));
  };

  const calculatePredictedScore = () => {
    let totalUnits = 0;
    let completedUnits = 0;
    let inProgressUnits = 0;
    let totalScore = 0;
    let scoredCount = 0;
    let totalChapters = 0;
    let completedChaptersCount = 0;

    curriculum.forEach((subj) => {
      subj.units.forEach((u) => {
        totalUnits++;
        totalChapters += u.chapters.length;
        completedChaptersCount += u.completedChapters.length;
        if (u.status === 'verified_completed') {
          completedUnits++;
        } else if (u.status === 'in_progress' || u.status === 'pending_approval') {
          inProgressUnits++;
        }
        if (u.quizScore !== null) {
          totalScore += u.quizScore;
          scoredCount++;
        }
      });
    });

    const completionRate = totalUnits > 0 ? (completedUnits / totalUnits) * 100 : 0;
    const avgQuiz = scoredCount > 0 ? totalScore / scoredCount : 80;
    const streakBonus = Math.min(studentProfile.currentStreak * 1.5, 30);

    const rawScore = 340 + (completionRate * 1.5) + (avgQuiz * 0.9) + streakBonus;
    const predictedScore = Math.min(Math.round(rawScore), 595);

    // Rule of Master Dagiyosi: Current rank starts at BRONZE in Grade 9.
    // As milestones are cleared, rank increases. If average quiz score is >= 90%, rank gets an Honor promotion!
    const isHonorBoosted = avgQuiz >= 90;

    let tierName = 'Bronze V Cadet';
    let rankCategory: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Crown' | 'Ace' | 'Conqueror' = 'Bronze';
    let shinobiTitle = 'Genin Apprentice • Will of Fire';
    let nextMilestone = 'Clear 3 Units to reach Bronze IV';

    if (completedUnits >= 34) {
      rankCategory = isHonorBoosted ? 'Diamond' : 'Platinum';
      tierName = isHonorBoosted ? 'Diamond I Master' : 'Platinum Chunin';
      shinobiTitle = 'Chunin Graduate • Grade 10 Titan Ready';
      nextMilestone = 'Grade 9 Syllabus 100% Cleared! Prepare for Grade 10!';
    } else if (completedUnits >= 26) {
      rankCategory = isHonorBoosted ? 'Platinum' : 'Gold';
      tierName = isHonorBoosted ? 'Platinum V Chunin (Honor Boosted)' : 'Gold I Shinobi';
      shinobiTitle = 'Senior Genin • Exam Elite';
      nextMilestone = `${34 - completedUnits} Units to Platinum Chunin`;
    } else if (completedUnits >= 18) {
      rankCategory = isHonorBoosted ? 'Gold' : 'Silver';
      tierName = isHonorBoosted ? 'Gold IV Strategist (Honor Boosted)' : 'Silver I Vanguard';
      shinobiTitle = 'Vanguard Genin • High Chakra';
      nextMilestone = `${26 - completedUnits} Units to Gold Tier`;
    } else if (completedUnits >= 10) {
      rankCategory = isHonorBoosted ? 'Silver' : 'Bronze';
      tierName = isHonorBoosted ? 'Silver V Vanguard (Honor Boosted)' : 'Bronze I Veteran';
      shinobiTitle = 'Disciplined Genin • Steady Pace';
      nextMilestone = `${18 - completedUnits} Units to Silver Tier`;
    } else if (completedUnits >= 5) {
      rankCategory = 'Bronze';
      tierName = isHonorBoosted ? 'Bronze II (Honor Boosted)' : 'Bronze III Cadet';
      shinobiTitle = 'Genin in Training • Will of Fire';
      nextMilestone = `${10 - completedUnits} Units to Bronze I`;
    } else if (completedUnits >= 1) {
      rankCategory = 'Bronze';
      tierName = isHonorBoosted ? 'Bronze IV (Honor Boosted)' : 'Bronze V Cadet';
      shinobiTitle = 'Genin Apprentice • Grade 9 Kickoff';
      nextMilestone = `${5 - completedUnits} Units to Bronze III`;
    } else {
      rankCategory = 'Bronze';
      tierName = isHonorBoosted ? 'Bronze IV (Honor Boosted)' : 'Bronze V Cadet';
      shinobiTitle = 'Genin Recruit • Day 1 Trainee';
      nextMilestone = 'Complete & Verify 1 Unit for Bronze promotion';
    }

    const currentRank: RankData = {
      tierName,
      rankCategory,
      shinobiTitle,
      isHonorBoosted,
      nextMilestone,
    };

    return {
      predictedScore,
      completionPercentage: Math.round(completionRate),
      quizAverage: Math.round(avgQuiz),
      consistencyScore: Math.min(studentProfile.currentStreak * 10, 100),
      completedUnits,
      totalUnits,
      inProgressUnits,
      totalChapters,
      completedChaptersCount,
      currentRank,
    };
  };

  const resetAllDataToDefaults = () => {
    localStorage.clear();
    setStudentProfile(INITIAL_PROFILE);
    setCurriculum(GRADE_9_CURRICULUM);
    setDecrees(INITIAL_DECREES);
    setRewards(INITIAL_REWARDS);
    setDailyLogs([]);
    setAuditLogs(INITIAL_AUDIT_LOGS);
  };

  const exportDatabaseJSON = () => {
    return JSON.stringify({
      studentProfile,
      curriculum,
      decrees,
      rewards,
      dailyLogs,
      auditLogs,
    }, null, 2);
  };

  const importDatabaseJSON = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.studentProfile) setStudentProfile(data.studentProfile);
      if (data.curriculum) setCurriculum(data.curriculum);
      if (data.decrees) setDecrees(data.decrees);
      if (data.rewards) setRewards(data.rewards);
      if (data.dailyLogs) setDailyLogs(data.dailyLogs);
      if (data.auditLogs) setAuditLogs(data.auditLogs);
      return true;
    } catch (e) {
      console.error('Failed to import database JSON', e);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUserRole,
        setCurrentUserRole,
        studentProfile,
        curriculum,
        decrees,
        rewards,
        dailyLogs,
        auditLogs,
        hasCheckedInToday,
        submitDailyCheckIn,
        submitQuizAttempt,
        approveUnit,
        rejectUnit,
        startUnit,
        toggleChapterCompletion,
        postDecree,
        deleteDecree,
        addReward,
        claimReward,
        grantMastersGraceStreakFreeze,
        addStudyMinutes,
        calculatePredictedScore,
        themeMode,
        toggleThemeMode,
        resetAllDataToDefaults,
        exportDatabaseJSON,
        importDatabaseJSON,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

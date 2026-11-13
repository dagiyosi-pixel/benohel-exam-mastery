export type UserRole = 'student' | 'master_admin';

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  role: UserRole;
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate: string | null;
  totalStudyMinutes: number;
  targetExamYear: number; // e.g. 2029 / 2021 E.C.
}

export interface RankData {
  tierName: string; // e.g. "Bronze V Cadet" (starts at Bronze in Grade 9!)
  rankCategory: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Crown' | 'Ace' | 'Conqueror';
  shinobiTitle: string; // e.g. "Genin Apprentice • Will of Fire"
  isHonorBoosted: boolean; // true if quizAverage >= 90
  nextMilestone: string;
}

export type UnitStatus = 'not_started' | 'in_progress' | 'pending_approval' | 'verified_completed';

export interface CurriculumUnit {
  id: string;
  subjectId: string;
  unitNumber: number;
  title: string;
  description: string;
  keyTopics: string[];
  chapters: string[]; // Authentic textbook sections (e.g. 1.1, 1.2...)
  textbookPageRange?: string; // Authentic MoE textbook page references
  learningOutcomes?: string[]; // Official competencies
  semester: 1 | 2; // Semester 1 vs Semester 2
  completedChapters: string[]; // Track individual section read progress
  status: UnitStatus;
  quizScore: number | null;
  quizPassed: boolean;
  verifiedAt: string | null;
  studyMinutesLogged: number;
  allocatedHours?: number; // Realistic allocated study hours (e.g. 10 hours)
  targetWeeks?: string; // Pacing target (e.g. "2 Weeks")
  pubgLootTier?: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Airdrop';
}

export interface CurriculumSubject {
  id: string;
  name: string;
  code: string;
  grade: number;
  iconName: string;
  stream: 'general' | 'natural_science' | 'social_science';
  units: CurriculumUnit[];
}

export interface QuizQuestion {
  id: string;
  unitId: string;
  subjectId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PastExamQuestion {
  id: string;
  year: number;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface Decree {
  id: string;
  sender: string;
  title: string;
  message: string;
  date: string;
  urgency: 'normal' | 'high' | 'celebration';
  active: boolean;
}

export interface PromisedReward {
  id: string;
  title: string;
  rewardDescription: string;
  conditionType: 'streak' | 'unit_completion' | 'quiz_score' | 'focus_hours';
  targetValue: number;
  progressValue: number;
  isUnlocked: boolean;
  isClaimed: boolean;
  unlockedDate: string | null;
}

export interface DailyLog {
  id: string;
  date: string;
  subjects: string[];
  studyMinutes: number;
  reflectionEasy: string;
  reflectionChallenging: string;
  timestamp: string;
}

export interface AuditFlag {
  id: string;
  timestamp: string;
  type: 'tab_switch' | 'quiz_failed' | 'quiz_passed' | 'daily_checkin' | 'streak_freeze' | 'unit_approved';
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface UniversityAdmissionBenchmark {
  university: string;
  city: string;
  program: string;
  requiredCutoff: number; // out of 600
  competitiveness: 'Ultra-High' | 'High' | 'Moderate';
  description: string;
}

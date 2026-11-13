export interface SubMilestone {
  title: string;
  duration: string; // e.g. "8 Weeks (60 Study Hours)"
  targetPeriod: string; // e.g. "Meskerem – Tikimt / Sep – Oct"
  objectives: string[];
  lootDrop: string; // Meaningful, affordable brotherly reward (non-cash)
  completed: boolean;
}

export interface RoadmapMilestone {
  year: number;
  grade: string;
  phaseTitle: string;
  status: 'active' | 'upcoming' | 'completed';
  timeframe: string;
  totalDuration: string; // e.g. "10 Months (320 Total Hours)"
  targetPace: string; // e.g. "1.25 Hours/Day • 6 Days/Week"
  pubgZoneName: string; // e.g. "DROP ZONE 1: MILITARY BASE"
  pubgRankTier: string; // e.g. "GOLD VANGUARD"
  focus: string;
  goals: string[];
  subMilestones: SubMilestone[];
}

export const FOUR_YEAR_ROADMAP: RoadmapMilestone[] = [
  {
    year: 1,
    grade: 'Grade 9',
    phaseTitle: 'Phase 1: Foundational Discipline & MoE Core Mastery',
    status: 'active',
    timeframe: 'Academic Year 2016–2017 E.C. (Current)',
    totalDuration: '10 Months (320 Focus Hours Total)',
    targetPace: '1.25 Hours/Day • 5–6 Days/Week (No Skipping)',
    pubgZoneName: 'DROP ZONE 1: POCHINKI OUTPOST // FOUNDATION DRILL',
    pubgRankTier: 'CROWN CADET (TIER 6)',
    focus: 'Mastering Grade 9 STEM principles: Number Systems, Kinematics, Atomic Structure, Cell Biology, ICT Algorithms & English.',
    goals: [
      'Conquer all 34 authentic MoE curriculum units with ≥ 75% quiz verification',
      'Maintain an unbroken 30-day+ study streak on the daily tracker',
      'Establish a 45–60 minute daily deep focus routine in the Focus Chamber',
      'Fulfill Master Dagiyosi’s weekly decrees and secure Grade 9 Honor status',
    ],
    subMilestones: [
      {
        title: 'Sprint 1.1: First Quarter Infiltration (Semester 1 Kickoff)',
        duration: '8 Weeks (60 Study Hours)',
        targetPeriod: 'Meskerem – Tikimt (Sep – Oct)',
        objectives: [
          'Math: Unit 1 (Further on Sets) & Unit 2 (The Real Number System)',
          'Physics: Unit 1 (Vectors & Physical Quantities) & Unit 2 (Kinematics)',
          'Chemistry: Unit 1 (Structure of the Atom) & Periodic Classification',
          'Pass 6 anti-cheat unit quizzes with ≥ 75% score',
        ],
        lootDrop: 'Master Dagiyosi’s Curated Google Drive Formula Vault & Telegram Summary Guides',
        completed: true,
      },
      {
        title: 'Sprint 1.2: Semester 1 Consolidation & Mid-Year Audit',
        duration: '8 Weeks (70 Study Hours)',
        targetPeriod: 'Hidar – Tahsas (Nov – Dec)',
        objectives: [
          'Biology: Unit 1 (Biology & Technology) & Unit 2 (Cell Biology)',
          'IT: Unit 1 (Intro to ICT) & Unit 2 (Application Software)',
          'English: Unit 1 (Learning to Learn) & Unit 2 (Places to Visit)',
          'Complete Master Dagiyosi’s Mid-Year Audit Call with 0 unverified units',
        ],
        lootDrop: 'Master Dagiyosi’s Dedicated Handwritten Letter of Commendation & Official Seal',
        completed: false,
      },
      {
        title: 'Sprint 1.3: Semester 2 Escalation (Mechanics & Bonding)',
        duration: '10 Weeks (85 Study Hours)',
        targetPeriod: 'Tir – Megabit (Jan – Mar)',
        objectives: [
          'Math: Unit 3 (Linear Equations) & Unit 4 (Relations & Functions)',
          'Physics: Unit 3 (Dynamics & Friction) & Unit 4 (Work, Energy & Power)',
          'Chemistry: Unit 2 (Chemical Bonding) & Unit 3 (Classification of Compounds)',
          'IT: Unit 3 (Security) & Unit 4 (Spreadsheets)',
        ],
        lootDrop: 'A Special Hardcover Formula Notebook & Premium Exam Pen Set (Bought by Dagi)',
        completed: false,
      },
      {
        title: 'Sprint 1.4: Final Exam Conquest & 34-Unit Full Clear',
        duration: '8 Weeks (75 Study Hours)',
        targetPeriod: 'Miyazya – Ginbot (Apr – May)',
        objectives: [
          'Clear all remaining Semester 2 units (Circle Geometry, Simple Machines, Human Biology, Genetics)',
          'Complete 5 comprehensive Grade 9 mock exams',
          'Lock in Grade 9 annual average ≥ 85%',
        ],
        lootDrop: 'Dagi Passing Down His Own Trusted Scientific Calculator as an Heirloom Torch',
        completed: false,
      },
      {
        title: 'Sprint 1.5: Summer Pre-Flight & Brotherly Duo Session',
        duration: '4 Weeks (30 Study Hours)',
        targetPeriod: 'Sene – Hamle (Jun – Jul)',
        objectives: [
          'Review formula notebooks for 30 mins every 2 days',
          'Preview Grade 10 quadratic functions and Newton’s laws',
          'Maintain unbroken discipline over the holiday break',
        ],
        lootDrop: 'Weekend 3-Hour PUBG Mobile Duo Night with Master Dagiyosi + Favorite Local Pastry/Juice Treat',
        completed: false,
      },
    ],
  },
  {
    year: 2,
    grade: 'Grade 10',
    phaseTitle: 'Phase 2: Academic Consolidation & Natural Science Lock-In',
    status: 'upcoming',
    timeframe: 'Academic Year 2017–2018 E.C. (Next Year)',
    totalDuration: '10 Months (340 Focus Hours Total)',
    targetPace: '1.5 Hours/Day • 5–6 Days/Week',
    pubgZoneName: 'DROP ZONE 2: ROZHOK HILLS // STREAM SELECTION',
    pubgRankTier: 'ACE CONTENDER (TIER 7)',
    focus: 'Grade 10 Regional Assessment, Quadratic Functions, Coordinate Geometry, Chemical Reactions, and securing Natural Science stream.',
    goals: [
      'Rank in the top 5% of the school on Grade 10 Regional Examinations',
      'Guarantee official placement in Natural Science stream (Engineering/Medicine track)',
      'Accumulate 150+ hours of verified deep focus time',
      'Master fundamental trigonometric ratios and chemical stoichiometry',
    ],
    subMilestones: [
      {
        title: 'Sprint 2.1: Secondary Foundation Sprint',
        duration: '16 Weeks (140 Study Hours)',
        targetPeriod: 'Meskerem – Tahsas (Sep – Dec)',
        objectives: [
          'Master Grade 10 Quadratics, Polynomials, and Exponential Functions',
          'Physics: Rotational Equilibrium and Electrostatics basics',
          'Chemistry: Chemical Reactions, Stoichiometry, and Solutions',
        ],
        lootDrop: 'Master Dagiyosi’s Personal Handwritten Grade 10 Cheat-Sheet Compendium',
        completed: false,
      },
      {
        title: 'Sprint 2.2: Mid-Year Regional Mock Drill',
        duration: '4 Weeks (40 Study Hours)',
        targetPeriod: 'Tir (January)',
        objectives: [
          'Simulate 3 timed regional practice assessments under strict anti-cheat rules',
          'Target score ≥ 80% on all STEM subjects',
        ],
        lootDrop: 'Weekend Gaming Marathon with Master Dagiyosi (Unrestricted Brotherly Fun)',
        completed: false,
      },
      {
        title: 'Sprint 2.3: Regional Examination Peak & Stream Lock-In',
        duration: '16 Weeks (160 Study Hours)',
        targetPeriod: 'Yekatit – Ginbot (Feb – May)',
        objectives: [
          'Ace the Grade 10 Regional Examination',
          'Confirm admission to Natural Science stream with top priority ranking',
        ],
        lootDrop: 'Celebratory Victory Tibs / Special Family Dinner Hosted by Dagi & Family',
        completed: false,
      },
    ],
  },
  {
    year: 3,
    grade: 'Grade 11',
    phaseTitle: 'Phase 3: High-Yield Natural Science Intensive (The 45% Weight)',
    status: 'upcoming',
    timeframe: 'Academic Year 2018–2019 E.C. (Year 3)',
    totalDuration: '11 Months (420 Focus Hours Total)',
    targetPace: '1.75 Hours/Day • 6 Days/Week',
    pubgZoneName: 'DROP ZONE 3: GEORGOPOL HIGH GROUND // 45% EXAM ANCHOR',
    pubgRankTier: 'CROWN ELITE (TIER 8)',
    focus: 'In-depth specialization: Grade 11 concepts form ~45% of the National Entrance Exam (Vectors, Calculus, Thermodynamics, Organic Chemistry).',
    goals: [
      'Master high-yield Grade 11 topics that decide University cutoffs',
      'Complete 500+ past entrance exam questions categorized by topic',
      'Reach "National Contender" level with high accuracy in timed conditions',
      'Maintain peak physical stamina and focused study discipline',
    ],
    subMilestones: [
      {
        title: 'Sprint 3.1: Heavy Mechanics & Molecular Science',
        duration: '16 Weeks (160 Study Hours)',
        targetPeriod: 'Meskerem – Tahsas (Sep – Dec)',
        objectives: [
          'Calculus foundations: Limits, Derivatives, and Rate of Change',
          'Physics: 2D Motion, Projectiles, Circular Motion & Rotational Dynamics',
          'Chemistry: Chemical Kinetics, Equilibrium, and Acid-Base Theories',
        ],
        lootDrop: 'Complete Hardcopy Spiral-Bound Past Matric Questions Book (Gift from Dagi)',
        completed: false,
      },
      {
        title: 'Sprint 3.2: Organic Chemistry, Waves & Physiology',
        duration: '18 Weeks (160 Study Hours)',
        targetPeriod: 'Tir – Ginbot (Jan – May)',
        objectives: [
          'Organic Chemistry: Hydrocarbons, Functional Groups & Reaction Mechanisms',
          'Physics: Wave Motion, Sound, Geometric Optics, and Heat Engines',
          'Biology: Cellular Respiration, Photosynthesis & Molecular Genetics',
        ],
        lootDrop: 'Master Dagiyosi’s Framed "Titan in the Making" Certificate of Honor',
        completed: false,
      },
      {
        title: 'Sprint 3.3: Summer Vacation Matric Bootcamp',
        duration: '8 Weeks (100 Study Hours)',
        targetPeriod: 'Sene – Nehase (Jun – Aug)',
        objectives: [
          'Solve all past Grade 11 entrance questions from 2012–2016 E.C.',
          'Consolidate personal error notebook (Mistake Journal)',
        ],
        lootDrop: 'A Special Care Package Sent Across the 700 Miles with Brotherly Surprises',
        completed: false,
      },
    ],
  },
  {
    year: 4,
    grade: 'Grade 12',
    phaseTitle: 'Phase 4: National Exam Conquest & University Titan (AAU / AAiT)',
    status: 'upcoming',
    timeframe: 'Academic Year 2019–2020 E.C. (Matric Year)',
    totalDuration: '9 Months Intensive (480 Focus Hours Total)',
    targetPace: '2.0 Hours/Day • 6 Days/Week',
    pubgZoneName: 'THE FINAL SAFE CIRCLE: WINNER WINNER TOP ADMISSION DINNER',
    pubgRankTier: 'CONQUEROR (SUPREME NATIONAL RANK)',
    focus: 'Past National Exam papers (2012–2016 E.C.), timed model exams, speed optimization, and score prediction 550+/600 for AAU Medicine / AAiT Software Eng.',
    goals: [
      'Achieve 550+ scaled score out of 600 on all full-length model examinations',
      'Secure top choice admission: AAU School of Medicine or AAiT Software Engineering',
      'Deliver on Master Dagiyosi’s grand challenge and bring pride to the entire family',
      'Earn the ultimate title: "Grand Matric Champion & University Titan"',
    ],
    subMilestones: [
      {
        title: 'Sprint 4.1: Rapid Syllabus Finish (Beat the School Clock)',
        duration: '16 Weeks (180 Study Hours)',
        targetPeriod: 'Meskerem – Yekatit (Sep – Feb)',
        objectives: [
          'Complete all Grade 12 student books 3 months ahead of regular school pace',
          'Physics: Electromagnetic Induction, Quantum Physics & Nuclear Physics',
          'Math: Integrals, Complex Numbers & Probability Distributions',
        ],
        lootDrop: 'Master Dagiyosi’s Final Pre-Exam Strategic Playbook & Time-Management Blueprint',
        completed: false,
      },
      {
        title: 'Sprint 4.2: 5-Year Matric Marathon Under Exam Conditions',
        duration: '10 Weeks (150 Study Hours)',
        targetPeriod: 'Megabit – Miyazya (Mar – Apr)',
        objectives: [
          'Solve full past papers (2012, 2013, 2014, 2015, 2016 E.C.) with 60-second question pacing',
          'Zero phone or formula sheet assistance',
          'Target average score ≥ 90%',
        ],
        lootDrop: 'Master Dagiyosi Visiting Home / Unifying the Brothers for Exam Week Support',
        completed: false,
      },
      {
        title: 'Sprint 4.3: Model Exam Peak & Taper',
        duration: '6 Weeks (130 Study Hours)',
        targetPeriod: 'Ginbot – Sene (May – Jun)',
        objectives: [
          'Simulate 10 full-length 600-point national exams',
          'Fine-tune mental calmness, exam breathing, and test strategy',
        ],
        lootDrop: 'The Grand Blessing Call with Master Dagiyosi & Entire Family Circle',
        completed: false,
      },
      {
        title: 'Sprint 4.4: The Final Battlefield (Exam Week)',
        duration: '1 Week (20 Hours)',
        targetPeriod: 'Hamle (July - National Exam Dates)',
        objectives: [
          'Sit for the National University Entrance Examination with total confidence',
          'Execute every question with precision drilled over 4 years',
        ],
        lootDrop: 'THE ULTIMATE VICTORY: AAU Acceptance Letter + Grand Winner Winner Family Feast & Roast Dinner Celebration!',
        completed: false,
      },
    ],
  },
];

import fs from 'fs';
const file = 'c:/Users/Dagi 3/Desktop/09_Tutoring_&_EdTech/Benohel_Exam_Mastery/src/data/curriculumGrade9.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace studyMinutesLogged: \d+ with allocatedHours, targetWeeks, pubgLootTier
content = content.replace(/studyMinutesLogged:\s*(\d+),/g, (match, minutes, offset) => {
  const pre = content.slice(Math.max(0, offset - 600), offset);
  const uMatch = pre.match(/unitNumber:\s*(\d+)/);
  const uNum = uMatch ? parseInt(uMatch[1]) : 1;
  const hours = uNum === 1 ? 8 : uNum === 2 ? 9 : uNum === 3 ? 10 : uNum === 4 ? 10 : uNum === 5 ? 11 : 12;
  const weeks = uNum <= 2 ? '1.5 Weeks (~8h)' : uNum <= 4 ? '2 Weeks (~10h)' : '2.5 Weeks (~12h)';
  const tier = uNum === 1 ? 'Rare' : uNum === 2 ? 'Epic' : uNum === 3 ? 'Legendary' : uNum === 4 ? 'Epic' : uNum === 5 ? 'Legendary' : 'Airdrop';

  return `studyMinutesLogged: ${minutes},
        allocatedHours: ${hours},
        targetWeeks: '${weeks}',
        pubgLootTier: '${tier}',`;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated curriculumGrade9.ts!');

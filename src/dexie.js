import Dexie, { liveQuery } from 'dexie';

export const db = new Dexie('bjjAcademy');

db.version(1).stores({
  students: 'id, name, belt, membershipStatus',
  instructors: 'id, name, belt',
  classes: 'id, startsAt, instructorId, classType',
  checkins: '++id, classId, studentId, checkedInAt, [classId+studentId]',
  progressNotes: '++id, studentId, instructorId, createdAt, visibility',
  promotions: '++id, studentId, instructorId, date, toRank',
  skills: 'id, category, name',
  curriculumProgress: '++id, studentId, skillId, status, updatedAt, [studentId+skillId]',
});

db.version(2).stores({
  students: 'id, name, belt, membershipStatus',
  instructors: 'id, name, belt',
  classes: 'id, startsAt, instructorId, classType',
  checkins: '++id, classId, studentId, checkedInAt, [classId+studentId]',
  progressNotes: '++id, studentId, instructorId, createdAt, visibility',
  promotions: '++id, studentId, instructorId, date, toRank',
  skills: 'id, category, name',
  curriculumProgress: '++id, studentId, skillId, status, updatedAt, [studentId+skillId]',
  studentGoals: '++id, studentId, instructorId, status, createdAt, dueDate',
});

db.version(3).stores({
  students: 'id, name, belt, membershipStatus',
  instructors: 'id, name, belt',
  classes: 'id, startsAt, instructorId, classType',
  checkins: '++id, classId, studentId, checkedInAt, [classId+studentId]',
  progressNotes: '++id, studentId, instructorId, createdAt, visibility',
  promotions: '++id, studentId, instructorId, date, toRank',
  skills: 'id, category, name',
  curriculumProgress: '++id, studentId, skillId, status, updatedAt, [studentId+skillId]',
  studentGoals: '++id, studentId, instructorId, status, createdAt, updatedAt, dueDate',
});

db.version(4).stores({
  students: 'id, name, belt, membershipStatus',
  instructors: 'id, name, belt',
  classes: 'id, startsAt, instructorId, classType',
  checkins: '++id, classId, studentId, checkedInAt, [classId+studentId]',
  progressNotes: '++id, studentId, instructorId, createdAt, visibility',
  promotions: '++id, studentId, instructorId, date, toRank',
  skills: 'id, category, name',
  curriculumProgress: '++id, studentId, skillId, status, updatedAt, [studentId+skillId]',
  studentGoals: '++id, studentId, instructorId, status, createdAt, updatedAt, dueDate',
  lessonPlans: '++id, classId, instructorId, plannedFor, updatedAt, [classId+instructorId]',
});

const tables = [
  db.students,
  db.instructors,
  db.classes,
  db.checkins,
  db.progressNotes,
  db.promotions,
  db.skills,
  db.curriculumProgress,
  db.studentGoals,
  db.lessonPlans,
];

function randomId(prefix) {
  const browserCrypto = typeof window !== 'undefined' ? window.crypto : undefined;
  const value =
    browserCrypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return `${prefix}-${value}`;
}

function todayAt(hour, minute = 0) {
  const value = new Date();
  value.setHours(hour, minute, 0, 0);
  return value.toISOString();
}

function seedRows() {
  const now = new Date().toISOString();
  const fundamentalsAt = todayAt(6, 30);
  const noGiAt = todayAt(12);
  const advancedAt = todayAt(18);

  return {
    instructors: [
      {
        id: 'instructor-avery',
        name: 'Avery Stone',
        belt: 'Black',
        email: 'avery@academy.test',
        isActive: true,
      },
      {
        id: 'instructor-leah',
        name: 'Leah Kim',
        belt: 'Brown',
        email: 'leah@academy.test',
        isActive: true,
      },
    ],
    students: [
      {
        id: 'student-maya',
        name: 'Maya Chen',
        email: 'maya@example.com',
        phone: '555-0182',
        emergencyContact: 'Rin Chen, 555-0114',
        belt: 'Blue',
        stripes: 2,
        joinedAt: '2023-04-10',
        membershipStatus: 'Active',
      },
      {
        id: 'student-andre',
        name: 'Andre Silva',
        email: 'andre@example.com',
        phone: '555-0156',
        emergencyContact: 'Mateo Silva, 555-0142',
        belt: 'White',
        stripes: 3,
        joinedAt: '2024-02-18',
        membershipStatus: 'Active',
      },
      {
        id: 'student-jordan',
        name: 'Jordan Brooks',
        email: 'jordan@example.com',
        phone: '555-0138',
        emergencyContact: 'Taylor Brooks, 555-0199',
        belt: 'Purple',
        stripes: 1,
        joinedAt: '2021-09-03',
        membershipStatus: 'Past Due',
      },
      {
        id: 'student-nina',
        name: 'Nina Patel',
        email: 'nina@example.com',
        phone: '555-0120',
        emergencyContact: 'Dev Patel, 555-0175',
        belt: 'White',
        stripes: 1,
        joinedAt: '2025-01-11',
        membershipStatus: 'Active',
      },
      {
        id: 'student-sam',
        name: 'Sam Rivera',
        email: 'sam@example.com',
        phone: '555-0164',
        emergencyContact: 'Elena Rivera, 555-0107',
        belt: 'Blue',
        stripes: 4,
        joinedAt: '2022-07-28',
        membershipStatus: 'Active',
      },
    ],
    classes: [
      {
        id: 'class-fundamentals',
        title: 'Fundamentals',
        classType: 'Gi',
        startsAt: fundamentalsAt,
        instructorId: 'instructor-avery',
        room: 'Mat 1',
        capacity: 24,
        status: 'Scheduled',
      },
      {
        id: 'class-nogi',
        title: 'All Levels No-Gi',
        classType: 'No-Gi',
        startsAt: noGiAt,
        instructorId: 'instructor-leah',
        room: 'Mat 2',
        capacity: 20,
        status: 'Scheduled',
      },
      {
        id: 'class-advanced',
        title: 'Advanced Gi',
        classType: 'Gi',
        startsAt: advancedAt,
        instructorId: 'instructor-avery',
        room: 'Mat 1',
        capacity: 18,
        status: 'Scheduled',
      },
    ],
    checkins: [
      {
        classId: 'class-fundamentals',
        studentId: 'student-maya',
        checkedInAt: now,
      },
      {
        classId: 'class-fundamentals',
        studentId: 'student-andre',
        checkedInAt: now,
      },
      {
        classId: 'class-nogi',
        studentId: 'student-sam',
        checkedInAt: now,
      },
    ],
    progressNotes: [
      {
        studentId: 'student-maya',
        instructorId: 'instructor-avery',
        note: 'Strong guard retention. Next focus is cleaner hip escapes under pressure.',
        visibility: 'Student',
        createdAt: now,
      },
      {
        studentId: 'student-jordan',
        instructorId: 'instructor-leah',
        note: 'Consider competition class invite after another month of consistent attendance.',
        visibility: 'Private',
        createdAt: now,
      },
    ],
    promotions: [
      {
        studentId: 'student-maya',
        instructorId: 'instructor-avery',
        fromRank: 'White / 4 stripes',
        toRank: 'Blue',
        stripes: 0,
        date: '2024-05-22T18:00:00.000Z',
      },
      {
        studentId: 'student-sam',
        instructorId: 'instructor-leah',
        fromRank: 'Blue / 3 stripes',
        toRank: 'Blue',
        stripes: 4,
        date: '2025-11-09T18:00:00.000Z',
      },
    ],
    skills: [
      { id: 'skill-breakfall', category: 'Safety', name: 'Breakfalls' },
      { id: 'skill-guard-retention', category: 'Guard', name: 'Guard retention' },
      { id: 'skill-hip-escape', category: 'Movement', name: 'Hip escape' },
      { id: 'skill-armbar', category: 'Submission', name: 'Armbar from guard' },
      { id: 'skill-side-control', category: 'Control', name: 'Side control escape' },
      { id: 'skill-takedown', category: 'Standing', name: 'Single leg entry' },
    ],
    curriculumProgress: [
      {
        studentId: 'student-maya',
        skillId: 'skill-guard-retention',
        status: 'Proficient',
        instructorId: 'instructor-avery',
        updatedAt: now,
      },
      {
        studentId: 'student-maya',
        skillId: 'skill-hip-escape',
        status: 'Improving',
        instructorId: 'instructor-avery',
        updatedAt: now,
      },
      {
        studentId: 'student-andre',
        skillId: 'skill-breakfall',
        status: 'Introduced',
        instructorId: 'instructor-leah',
        updatedAt: now,
      },
    ],
    studentGoals: [
      {
        studentId: 'student-maya',
        instructorId: 'instructor-avery',
        title: 'Sharpen guard retention',
        focus: 'Recover frames and hips before the pass settles.',
        status: 'Active',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30))
          .toISOString()
          .slice(0, 10),
        createdAt: now,
        updatedAt: now,
      },
      {
        studentId: 'student-andre',
        instructorId: 'instructor-leah',
        title: 'Build safer breakfalls',
        focus: 'Land relaxed, protect the head, and return to base.',
        status: 'Active',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 21))
          .toISOString()
          .slice(0, 10),
        createdAt: now,
        updatedAt: now,
      },
      {
        studentId: 'student-sam',
        instructorId: 'instructor-leah',
        title: 'Competition round pacing',
        focus: 'Hold pace through three rounds without forcing low-percentage attacks.',
        status: 'Completed',
        dueDate: '2025-12-01',
        createdAt: '2025-10-01T18:00:00.000Z',
        updatedAt: '2025-11-18T18:00:00.000Z',
        completedAt: '2025-11-18T18:00:00.000Z',
      },
    ],
    lessonPlans: [
      {
        classId: 'class-advanced',
        instructorId: 'instructor-avery',
        title: 'Knee shield passing chain',
        objectives: 'Connect headquarters control, knee slice pressure, and backstep options.',
        warmup: 'Hip mobility, knee cut footwork, and partner pummeling.',
        techniques:
          'Headquarters entry, knee slice to side control, and backstep when the shield blocks the lane.',
        drills:
          'Three-minute positional rounds from knee shield with a reset on pass or guard recovery.',
        rounds: 'Four five-minute specific rounds, then two open rounds.',
        notes: 'Keep the pace technical for mixed ranks.',
        plannedFor: advancedAt,
        createdAt: now,
        updatedAt: now,
      },
    ],
  };
}

async function applySeedRows({ clearFirst = false } = {}) {
  const seed = seedRows();

  await db.transaction('rw', tables, async () => {
    if (clearFirst) {
      await Promise.all(tables.map((table) => table.clear()));
    }

    await db.instructors.bulkAdd(seed.instructors);
    await db.students.bulkAdd(seed.students);
    await db.classes.bulkAdd(seed.classes);
    await db.checkins.bulkAdd(seed.checkins);
    await db.progressNotes.bulkAdd(seed.progressNotes);
    await db.promotions.bulkAdd(seed.promotions);
    await db.skills.bulkAdd(seed.skills);
    await db.curriculumProgress.bulkAdd(seed.curriculumProgress);
    await db.studentGoals.bulkAdd(seed.studentGoals);
    await db.lessonPlans.bulkAdd(seed.lessonPlans);
  });
}

export async function seedAcademyData() {
  const studentCount = await db.students.count();

  if (studentCount === 0) {
    await applySeedRows({ clearFirst: true });
    return;
  }

  const goalCount = await db.studentGoals.count();
  const seededStudents = await Promise.all([
    db.students.get('student-maya'),
    db.students.get('student-andre'),
    db.students.get('student-sam'),
  ]);

  if (goalCount === 0 && seededStudents.some(Boolean)) {
    await db.studentGoals.bulkAdd(seedRows().studentGoals);
  }

  const lessonPlanCount = await db.lessonPlans.count();
  const advancedClass = await db.classes.get('class-advanced');

  if (lessonPlanCount === 0 && advancedClass) {
    await db.lessonPlans.bulkAdd(seedRows().lessonPlans);
  }
}

export async function resetAcademyData() {
  await applySeedRows({ clearFirst: true });
}

export async function getAcademySnapshot() {
  const [
    students,
    instructors,
    classes,
    checkins,
    progressNotes,
    promotions,
    skills,
    curriculumProgress,
    studentGoals,
    lessonPlans,
  ] = await Promise.all([
    db.students.orderBy('name').toArray(),
    db.instructors.orderBy('name').toArray(),
    db.classes.orderBy('startsAt').toArray(),
    db.checkins.orderBy('checkedInAt').reverse().toArray(),
    db.progressNotes.orderBy('createdAt').reverse().toArray(),
    db.promotions.orderBy('date').reverse().toArray(),
    db.skills.orderBy('category').toArray(),
    db.curriculumProgress.orderBy('updatedAt').reverse().toArray(),
    db.studentGoals.orderBy('updatedAt').reverse().toArray(),
    db.lessonPlans.orderBy('updatedAt').reverse().toArray(),
  ]);

  return {
    students,
    instructors,
    classes,
    checkins,
    progressNotes,
    promotions,
    skills,
    curriculumProgress,
    studentGoals,
    lessonPlans,
  };
}

export function subscribeToAcademySnapshot(onNext, onError) {
  return liveQuery(getAcademySnapshot).subscribe({
    next: onNext,
    error: onError,
  });
}

export async function addStudent(student) {
  const name = student.name.trim();

  if (!name) {
    throw new Error('Student name is required.');
  }

  return db.students.add({
    id: randomId('student'),
    name,
    email: student.email.trim(),
    phone: student.phone.trim(),
    emergencyContact: student.emergencyContact.trim(),
    belt: student.belt,
    stripes: Number(student.stripes) || 0,
    joinedAt: student.joinedAt,
    membershipStatus: student.membershipStatus,
  });
}

export async function updateStudentProfile(studentId, student) {
  const name = student.name.trim();

  if (!name) {
    throw new Error('Student name is required.');
  }

  return db.students.update(studentId, {
    name,
    email: student.email.trim(),
    phone: student.phone.trim(),
    emergencyContact: student.emergencyContact.trim(),
    belt: student.belt,
    stripes: Number(student.stripes) || 0,
    joinedAt: student.joinedAt,
    membershipStatus: student.membershipStatus,
  });
}

export async function updateStudentMembership(studentId, membershipStatus) {
  return db.students.update(studentId, { membershipStatus });
}

export async function addClass(classDetails) {
  const title = classDetails.title.trim();

  if (!title) {
    throw new Error('Class title is required.');
  }

  const startsAt = new Date(`${classDetails.date}T${classDetails.time}`);

  if (Number.isNaN(startsAt.getTime())) {
    throw new Error('Class date and time are required.');
  }

  if (!classDetails.instructorId) {
    throw new Error('Class instructor is required.');
  }

  const repeatWeeks = Math.max(1, Number(classDetails.repeatWeeks) || 1);
  const classRows = Array.from({ length: repeatWeeks }, (_, index) => {
    const classDate = new Date(startsAt);
    classDate.setDate(classDate.getDate() + index * 7);

    return {
      id: randomId('class'),
      title,
      classType: classDetails.classType,
      startsAt: classDate.toISOString(),
      instructorId: classDetails.instructorId,
      room: classDetails.room.trim(),
      capacity: Number(classDetails.capacity) || 0,
      status: 'Scheduled',
    };
  });

  return db.classes.bulkAdd(classRows);
}

export async function updateClassStatus(classId, status) {
  return db.classes.update(classId, { status });
}

export async function saveLessonPlan({
  classId,
  instructorId,
  title,
  objectives,
  warmup,
  techniques,
  drills,
  rounds,
  notes,
}) {
  const value = title.trim();

  if (!value) {
    throw new Error('Lesson plan title is required.');
  }

  const classItem = await db.classes.get(classId);

  if (!classItem) {
    throw new Error('Class was not found.');
  }

  if (classItem.instructorId !== instructorId) {
    throw new Error('Only the assigned instructor can save this lesson plan.');
  }

  if ((classItem.status ?? 'Scheduled') !== 'Scheduled') {
    throw new Error('Lesson plans can only be saved for scheduled classes.');
  }

  if (new Date(classItem.startsAt) < new Date()) {
    throw new Error('Lesson plans can only be saved for future classes.');
  }

  const now = new Date().toISOString();
  const payload = {
    classId,
    instructorId,
    title: value,
    objectives: objectives.trim(),
    warmup: warmup.trim(),
    techniques: techniques.trim(),
    drills: drills.trim(),
    rounds: rounds.trim(),
    notes: notes.trim(),
    plannedFor: classItem.startsAt,
    updatedAt: now,
  };
  const existing = await db.lessonPlans.where('classId').equals(classId).first();

  if (existing) {
    return db.lessonPlans.update(existing.id, payload);
  }

  return db.lessonPlans.add({
    ...payload,
    createdAt: now,
  });
}

export async function recordCheckin({ classId, studentId }) {
  const [classItem, student] = await Promise.all([
    db.classes.get(classId),
    db.students.get(studentId),
  ]);

  if (!classItem) {
    throw new Error('Class was not found.');
  }

  if ((classItem.status ?? 'Scheduled') !== 'Scheduled') {
    throw new Error('Students can only check into scheduled classes.');
  }

  if (!student) {
    throw new Error('Student was not found.');
  }

  if (student.membershipStatus === 'Inactive') {
    throw new Error('Inactive students cannot check into class.');
  }

  const existing = await db.checkins
    .where('[classId+studentId]')
    .equals([classId, studentId])
    .first();

  if (existing) {
    return existing.id;
  }

  return db.checkins.add({
    classId,
    studentId,
    checkedInAt: new Date().toISOString(),
  });
}

export async function addInstructor(instructor) {
  const name = instructor.name.trim();

  if (!name) {
    throw new Error('Instructor name is required.');
  }

  return db.instructors.add({
    id: randomId('instructor'),
    name,
    email: instructor.email.trim(),
    belt: instructor.belt,
    isActive: instructor.isActive,
  });
}

export async function updateInstructorStatus(instructorId, isActive) {
  return db.instructors.update(instructorId, { isActive });
}

export async function addProgressNote({ studentId, instructorId, note, visibility }) {
  const value = note.trim();

  if (!value) {
    throw new Error('Progress note is required.');
  }

  return db.progressNotes.add({
    studentId,
    instructorId,
    note: value,
    visibility,
    createdAt: new Date().toISOString(),
  });
}

export async function addStudentGoal({
  studentId,
  instructorId,
  title,
  focus,
  dueDate,
}) {
  const value = title.trim();

  if (!value) {
    throw new Error('Goal title is required.');
  }

  const now = new Date().toISOString();

  return db.studentGoals.add({
    studentId,
    instructorId,
    title: value,
    focus: focus.trim(),
    status: 'Active',
    dueDate,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateStudentGoalStatus(goalId, status) {
  const now = new Date().toISOString();

  return db.studentGoals.update(goalId, {
    status,
    updatedAt: now,
    completedAt: status === 'Completed' ? now : undefined,
  });
}

export async function addPromotion({ studentId, instructorId, toRank, stripes }) {
  const stripeCount = Number(stripes) || 0;
  const date = new Date().toISOString();

  return db.transaction('rw', db.students, db.promotions, async () => {
    const student = await db.students.get(studentId);

    if (!student) {
      throw new Error('Student was not found.');
    }

    await db.promotions.add({
      studentId,
      instructorId,
      fromRank: `${student.belt} / ${student.stripes} stripes`,
      toRank,
      stripes: stripeCount,
      date,
    });

    return db.students.update(studentId, {
      belt: toRank,
      stripes: stripeCount,
      lastPromotionAt: date,
    });
  });
}

export async function updateCurriculumProgress({
  studentId,
  skillId,
  status,
  instructorId,
}) {
  const updatedAt = new Date().toISOString();

  return db.transaction('rw', db.curriculumProgress, async () => {
    const existing = await db.curriculumProgress
      .where('[studentId+skillId]')
      .equals([studentId, skillId])
      .first();

    if (existing) {
      return db.curriculumProgress.update(existing.id, {
        status,
        instructorId,
        updatedAt,
      });
    }

    return db.curriculumProgress.add({
      studentId,
      skillId,
      status,
      instructorId,
      updatedAt,
    });
  });
}

import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('./dexie', () => ({
  addClass: jest.fn(),
  addInstructor: jest.fn(),
  addProgressNote: jest.fn(),
  addPromotion: jest.fn(),
  addStudent: jest.fn(),
  addStudentGoal: jest.fn(),
  recordCheckin: jest.fn(),
  resetAcademyData: jest.fn(),
  saveLessonPlan: jest.fn(),
  seedAcademyData: jest.fn(),
  subscribeToAcademySnapshot: jest.fn(),
  updateClassStatus: jest.fn(),
  updateCurriculumProgress: jest.fn(),
  updateInstructorStatus: jest.fn(),
  updateStudentGoalStatus: jest.fn(),
  updateStudentMembership: jest.fn(),
  updateStudentProfile: jest.fn(),
}));

import App from './App';

const academyData = {
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
  ],
  instructors: [
    {
      id: 'instructor-avery',
      name: 'Avery Stone',
      belt: 'Black',
    },
  ],
  classes: [
    {
      id: 'class-advanced',
      title: 'Advanced Gi',
      classType: 'Gi',
      startsAt: '2099-01-01T18:00:00.000Z',
      instructorId: 'instructor-avery',
      room: 'Mat 1',
      capacity: 18,
      status: 'Scheduled',
    },
  ],
  checkins: [],
  progressNotes: [],
  promotions: [],
  skills: [],
  curriculumProgress: [],
  studentGoals: [
    {
      id: 1,
      studentId: 'student-maya',
      instructorId: 'instructor-avery',
      title: 'Sharpen guard retention',
      focus: 'Recover frames and hips before the pass settles.',
      status: 'Active',
      dueDate: '2026-07-01',
      createdAt: '2026-06-01T12:00:00.000Z',
      updatedAt: '2026-06-01T12:00:00.000Z',
    },
  ],
  lessonPlans: [
    {
      id: 1,
      classId: 'class-advanced',
      instructorId: 'instructor-avery',
      title: 'Guard passing plan',
      objectives: 'Connect headquarters to knee slice.',
      warmup: 'Movement prep',
      techniques: 'Knee slice',
      drills: 'Positional rounds',
      rounds: 'Specific rounds',
      notes: 'Keep pressure steady.',
      plannedFor: '2099-01-01T18:00:00.000Z',
      createdAt: '2026-06-01T12:00:00.000Z',
      updatedAt: '2026-06-01T12:00:00.000Z',
    },
  ],
};

test('renders academy dashboard data', async () => {
  render(<App initialData={academyData} />);

  expect(await screen.findByText(/BJJ academy operations/i)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Maya Chen/i })).toBeInTheDocument();
});

test('renders saved instructor lesson plan for an upcoming class', async () => {
  render(<App initialData={academyData} />);

  fireEvent.click(screen.getByRole('button', { name: /instructor/i }));

  expect(await screen.findByRole('heading', { name: /Lesson plan/i })).toBeInTheDocument();
  expect(await screen.findByDisplayValue(/Guard passing plan/i)).toBeInTheDocument();
});

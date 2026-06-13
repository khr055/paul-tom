import { dateInputValue } from './utils';

export const emptyStudentForm = {
  name: '',
  email: '',
  phone: '',
  emergencyContact: '',
  belt: 'White',
  stripes: '0',
  joinedAt: dateInputValue(),
  membershipStatus: 'Active',
};

export const emptyInstructorForm = {
  name: '',
  email: '',
  belt: 'Black',
  isActive: true,
};

export const defaultClassForm = {
  title: '',
  classType: 'Gi',
  date: dateInputValue(),
  time: '18:00',
  instructorId: '',
  room: 'Mat 1',
  capacity: '24',
  repeatWeeks: '1',
};

export const emptyGoalForm = {
  title: '',
  focus: '',
  dueDate: dateInputValue(
    new Date(new Date().setDate(new Date().getDate() + 30))
  ),
};

export const emptyLessonPlanForm = {
  title: '',
  objectives: '',
  warmup: '',
  techniques: '',
  drills: '',
  rounds: '',
  notes: '',
};

export function initialClassForm(initialData) {
  return {
    ...defaultClassForm,
    instructorId: initialData?.instructors?.[0]?.id ?? defaultClassForm.instructorId,
  };
}

export function studentToForm(student) {
  if (!student) {
    return emptyStudentForm;
  }

  return {
    name: student.name,
    email: student.email,
    phone: student.phone,
    emergencyContact: student.emergencyContact,
    belt: student.belt,
    stripes: String(student.stripes ?? 0),
    joinedAt: student.joinedAt,
    membershipStatus: student.membershipStatus,
  };
}

export function lessonPlanToForm(lessonPlan) {
  if (!lessonPlan) {
    return emptyLessonPlanForm;
  }

  return {
    title: lessonPlan.title ?? '',
    objectives: lessonPlan.objectives ?? '',
    warmup: lessonPlan.warmup ?? '',
    techniques: lessonPlan.techniques ?? '',
    drills: lessonPlan.drills ?? '',
    rounds: lessonPlan.rounds ?? '',
    notes: lessonPlan.notes ?? '',
  };
}

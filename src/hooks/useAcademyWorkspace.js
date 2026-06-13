import { useEffect, useMemo, useState } from 'react';
import { EMPTY_LIST } from '../constants';
import {
  addClass,
  addInstructor,
  addProgressNote,
  addPromotion,
  addStudent,
  addStudentGoal,
  getAcademySnapshot,
  recordCheckin,
  resetAcademyData,
  saveLessonPlan,
  seedAcademyData,
  subscribeToAcademySnapshot,
  updateClassStatus,
  updateCurriculumProgress,
  updateInstructorStatus,
  updateStudentGoalStatus,
  updateStudentMembership,
  updateStudentProfile,
} from '../dexie';
import {
  defaultClassForm,
  emptyGoalForm,
  emptyInstructorForm,
  emptyLessonPlanForm,
  emptyStudentForm,
  initialClassForm,
  lessonPlanToForm,
  studentToForm,
} from '../formDefaults';
import {
  classStatus,
  dateInputValue,
  isInstructorActive,
  isSameLocalDate,
} from '../utils';

export default function useAcademyWorkspace(initialData = null) {
  const [role, setRole] = useState('student');
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [currentStudentId, setCurrentStudentId] = useState(
    initialData?.students?.[0]?.id ?? ''
  );
  const [selectedStudentId, setSelectedStudentId] = useState(
    initialData?.students?.[0]?.id ?? ''
  );
  const [selectedInstructorId, setSelectedInstructorId] = useState(
    initialData?.instructors?.[0]?.id ?? ''
  );
  const [selectedClassId, setSelectedClassId] = useState(
    initialData?.classes?.[0]?.id ?? ''
  );
  const [selectedLessonPlanClassId, setSelectedLessonPlanClassId] = useState(
    initialData?.classes?.[0]?.id ?? ''
  );
  const [manualCheckinStudentId, setManualCheckinStudentId] = useState(
    initialData?.students?.[0]?.id ?? ''
  );
  const [noteText, setNoteText] = useState('');
  const [noteVisibility, setNoteVisibility] = useState('Student');
  const [goalForm, setGoalForm] = useState(emptyGoalForm);
  const [promotionRank, setPromotionRank] = useState('White');
  const [promotionStripes, setPromotionStripes] = useState('0');
  const [studentForm, setStudentForm] = useState(emptyStudentForm);
  const [editStudentId, setEditStudentId] = useState(initialData?.students?.[0]?.id ?? '');
  const [editStudentForm, setEditStudentForm] = useState(emptyStudentForm);
  const [studentSearch, setStudentSearch] = useState('');
  const [instructorForm, setInstructorForm] = useState(emptyInstructorForm);
  const [classForm, setClassForm] = useState(() => initialClassForm(initialData));
  const [lessonPlanForm, setLessonPlanForm] = useState(emptyLessonPlanForm);
  const [reportStudentId, setReportStudentId] = useState('all');
  const [reportInstructorId, setReportInstructorId] = useState('all');
  const [reportClassType, setReportClassType] = useState('all');
  const [reportFrom, setReportFrom] = useState('');
  const [reportTo, setReportTo] = useState('');

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      return undefined;
    }

    let isMounted = true;

    function applySnapshot(snapshot) {
      setError('');
      setData(snapshot);
      setCurrentStudentId((current) =>
        snapshot.students.some((student) => student.id === current)
          ? current
          : snapshot.students[0]?.id ?? ''
      );
      setSelectedStudentId((current) =>
        snapshot.students.some((student) => student.id === current)
          ? current
          : snapshot.students[0]?.id ?? ''
      );
      setSelectedInstructorId((current) =>
        snapshot.instructors.some((instructor) => instructor.id === current)
          ? current
          : snapshot.instructors[0]?.id ?? ''
      );
      setSelectedClassId((current) =>
        snapshot.classes.some((classItem) => classItem.id === current)
          ? current
          : snapshot.classes[0]?.id ?? ''
      );
      setManualCheckinStudentId((current) =>
        snapshot.students.some((student) => student.id === current)
          ? current
          : snapshot.students[0]?.id ?? ''
      );
      setEditStudentId((current) =>
        snapshot.students.some((student) => student.id === current)
          ? current
          : snapshot.students[0]?.id ?? ''
      );
      setClassForm((current) => ({
        ...current,
        instructorId:
          current.instructorId ||
          snapshot.instructors[0]?.id ||
          defaultClassForm.instructorId,
      }));
    }

    async function loadInitialSnapshot() {
      try {
        await seedAcademyData();
        const snapshot = await getAcademySnapshot();

        if (isMounted) {
          applySnapshot(snapshot);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.message);
        }
      }
    }

    loadInitialSnapshot();

    const subscription = subscribeToAcademySnapshot(
      (snapshot) => {
        if (!isMounted) {
          return;
        }

        applySnapshot(snapshot);
      },
      (caughtError) => {
        if (isMounted) {
          setError(caughtError.message);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, [initialData]);

  const students = data?.students ?? EMPTY_LIST;
  const instructors = data?.instructors ?? EMPTY_LIST;
  const classes = data?.classes ?? EMPTY_LIST;
  const checkins = data?.checkins ?? EMPTY_LIST;
  const notes = data?.progressNotes ?? EMPTY_LIST;
  const promotions = data?.promotions ?? EMPTY_LIST;
  const skills = data?.skills ?? EMPTY_LIST;
  const curriculumProgress = data?.curriculumProgress ?? EMPTY_LIST;
  const studentGoals = data?.studentGoals ?? EMPTY_LIST;
  const lessonPlans = data?.lessonPlans ?? EMPTY_LIST;

  const studentById = useMemo(
    () => Object.fromEntries(students.map((student) => [student.id, student])),
    [students]
  );

  const instructorById = useMemo(
    () => Object.fromEntries(instructors.map((instructor) => [instructor.id, instructor])),
    [instructors]
  );

  const classById = useMemo(
    () => Object.fromEntries(classes.map((classItem) => [classItem.id, classItem])),
    [classes]
  );

  const lessonPlanByClassId = useMemo(
    () => Object.fromEntries(lessonPlans.map((lessonPlan) => [lessonPlan.classId, lessonPlan])),
    [lessonPlans]
  );

  const skillById = useMemo(
    () => Object.fromEntries(skills.map((skill) => [skill.id, skill])),
    [skills]
  );

  const activeStudents = students.filter(
    (student) => student.membershipStatus !== 'Inactive'
  );
  const activeInstructors = instructors.filter(isInstructorActive);
  const classTypes = Array.from(
    new Set(classes.map((classItem) => classItem.classType).filter(Boolean))
  );

  const selectedStudent = students.find((student) => student.id === selectedStudentId);
  const selectedInstructor = instructors.find(
    (instructor) => instructor.id === selectedInstructorId
  );
  const selectedClass = classes.find((classItem) => classItem.id === selectedClassId);
  const editStudent = students.find((student) => student.id === editStudentId);
  const studentScopeId = role === 'student' ? currentStudentId : selectedStudentId;
  const studentScope = students.find((student) => student.id === studentScopeId);
  const upcomingInstructorClasses = useMemo(
    () =>
      classes.filter(
        (classItem) =>
          classItem.instructorId === selectedInstructorId &&
          classStatus(classItem) === 'Scheduled' &&
          new Date(classItem.startsAt) > new Date()
      ),
    [classes, selectedInstructorId]
  );
  const selectedLessonPlanClass = upcomingInstructorClasses.find(
    (classItem) => classItem.id === selectedLessonPlanClassId
  );
  const selectedLessonPlan = lessonPlanByClassId[selectedLessonPlanClassId];

  const selectedStudentCheckins = checkins.filter(
    (checkin) => checkin.studentId === studentScopeId
  );
  const selectedStudentClassIds = new Set(
    selectedStudentCheckins.map((checkin) => checkin.classId)
  );
  const selectedStudentNotes = notes.filter(
    (note) =>
      note.studentId === studentScopeId &&
      (role !== 'student' || note.visibility === 'Student')
  );
  const selectedStudentPromotions = promotions.filter(
    (promotion) => promotion.studentId === studentScopeId
  );
  const selectedStudentGoals = studentGoals.filter(
    (goal) => goal.studentId === studentScopeId
  );
  const selectedStudentCurriculumProgress = curriculumProgress.filter(
    (progress) => progress.studentId === studentScopeId
  );
  const selectedClassRoster = checkins
    .filter((checkin) => checkin.classId === selectedClassId)
    .map((checkin) => ({
      ...checkin,
      student: studentById[checkin.studentId],
    }))
    .filter((checkin) => checkin.student);
  const todaysClasses = classes.filter(
    (classItem) =>
      classStatus(classItem) === 'Scheduled' && isSameLocalDate(classItem.startsAt)
  );
  const studentSkillRows = skills.map((skill) => ({
    skill,
    progress: curriculumProgress.find(
      (item) => item.studentId === studentScopeId && item.skillId === skill.id
    ),
  }));
  const studentTimeline = [
    ...selectedStudentCheckins.map((checkin) => ({
      id: `checkin-${checkin.id}`,
      type: 'checkin',
      date: checkin.checkedInAt,
      checkin,
      classItem: classById[checkin.classId],
    })),
    ...selectedStudentNotes.map((note) => ({
      id: `note-${note.id}`,
      type: 'note',
      date: note.createdAt,
      note,
    })),
    ...selectedStudentCurriculumProgress.map((progress) => ({
      id: `curriculum-${progress.id}`,
      type: 'curriculum',
      date: progress.updatedAt,
      progress,
      skill: skillById[progress.skillId],
    })),
    ...selectedStudentPromotions.map((promotion) => ({
      id: `promotion-${promotion.id}`,
      type: 'promotion',
      date: promotion.date,
      promotion,
    })),
    ...selectedStudentGoals.map((goal) => ({
      id: `goal-${goal.id}`,
      type: 'goal',
      date: goal.updatedAt ?? goal.createdAt,
      goal,
    })),
  ].sort((left, right) => new Date(right.date) - new Date(left.date));

  const filteredStudents = students.filter((student) => {
    const search = studentSearch.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return [student.name, student.email, student.belt, student.membershipStatus]
      .join(' ')
      .toLowerCase()
      .includes(search);
  });

  const reportRows = checkins
    .map((checkin) => {
      const classItem = classById[checkin.classId];
      const student = studentById[checkin.studentId];
      const instructor = classItem ? instructorById[classItem.instructorId] : undefined;

      return {
        checkin,
        classItem,
        student,
        instructor,
        reportDate: classItem?.startsAt ?? checkin.checkedInAt,
      };
    })
    .filter(({ classItem, student, instructor, reportDate }) => {
      if (!classItem || !student) {
        return false;
      }

      if (reportStudentId !== 'all' && student.id !== reportStudentId) {
        return false;
      }

      if (reportInstructorId !== 'all' && instructor?.id !== reportInstructorId) {
        return false;
      }

      if (reportClassType !== 'all' && classItem.classType !== reportClassType) {
        return false;
      }

      if (reportFrom && dateInputValue(new Date(reportDate)) < reportFrom) {
        return false;
      }

      if (reportTo && dateInputValue(new Date(reportDate)) > reportTo) {
        return false;
      }

      return true;
    });

  useEffect(() => {
    if (role === 'student' && currentStudentId) {
      setSelectedStudentId(currentStudentId);
    }
  }, [currentStudentId, role]);

  useEffect(() => {
    setEditStudentForm(studentToForm(editStudent));
  }, [editStudent]);

  useEffect(() => {
    setSelectedLessonPlanClassId((current) =>
      upcomingInstructorClasses.some((classItem) => classItem.id === current)
        ? current
        : upcomingInstructorClasses[0]?.id ?? ''
    );
  }, [upcomingInstructorClasses]);

  useEffect(() => {
    setLessonPlanForm(lessonPlanToForm(selectedLessonPlan));
  }, [selectedLessonPlan]);

  async function runAction(action) {
    try {
      setError('');
      await action();
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  function handleStudentFormChange(event) {
    const { name, value } = event.target;
    setStudentForm((current) => ({ ...current, [name]: value }));
  }

  function handleEditStudentFormChange(event) {
    const { name, value } = event.target;
    setEditStudentForm((current) => ({ ...current, [name]: value }));
  }

  function handleInstructorFormChange(event) {
    const { name, type, checked, value } = event.target;
    setInstructorForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleClassFormChange(event) {
    const { name, value } = event.target;
    setClassForm((current) => ({ ...current, [name]: value }));
  }

  function handleGoalFormChange(event) {
    const { name, value } = event.target;
    setGoalForm((current) => ({ ...current, [name]: value }));
  }

  function handleLessonPlanFormChange(event) {
    const { name, value } = event.target;
    setLessonPlanForm((current) => ({ ...current, [name]: value }));
  }

  function handleCurrentStudentChange(studentId) {
    setCurrentStudentId(studentId);
    setSelectedStudentId(studentId);
  }

  function handleSignIn() {
    if (role === 'student') {
      setSelectedStudentId(currentStudentId);
    }

    setIsSignedIn(true);
  }

  function handleRoleChange(nextRole) {
    setRole(nextRole);

    if (nextRole === 'student') {
      setSelectedStudentId(currentStudentId);
    }
  }

  function handleCheckIn(classId, studentId) {
    runAction(() => recordCheckin({ classId, studentId }));
  }

  function handleAddStudent(event) {
    event.preventDefault();
    runAction(async () => {
      await addStudent(studentForm);
      setStudentForm({ ...emptyStudentForm, joinedAt: dateInputValue() });
    });
  }

  function handleUpdateStudent(event) {
    event.preventDefault();
    runAction(() => updateStudentProfile(editStudentId, editStudentForm));
  }

  function handleDeactivateStudent(studentId) {
    runAction(() => updateStudentMembership(studentId, 'Inactive'));
  }

  function handleAddInstructor(event) {
    event.preventDefault();
    runAction(async () => {
      await addInstructor(instructorForm);
      setInstructorForm(emptyInstructorForm);
    });
  }

  function handleAddClass(event) {
    event.preventDefault();
    runAction(async () => {
      await addClass(classForm);
      setClassForm((current) => ({
        ...defaultClassForm,
        instructorId: current.instructorId,
        date: dateInputValue(),
      }));
    });
  }

  function handleAddNote(event) {
    event.preventDefault();
    runAction(async () => {
      await addProgressNote({
        studentId: selectedStudentId,
        instructorId: selectedInstructorId,
        note: noteText,
        visibility: noteVisibility,
      });
      setNoteText('');
    });
  }

  function handleAddGoal(event) {
    event.preventDefault();
    runAction(async () => {
      await addStudentGoal({
        ...goalForm,
        studentId: selectedStudentId,
        instructorId: selectedInstructorId,
      });
      setGoalForm(emptyGoalForm);
    });
  }

  function handleGoalStatusChange(goalId, status) {
    runAction(() => updateStudentGoalStatus(goalId, status));
  }

  function handleSaveLessonPlan(event) {
    event.preventDefault();
    runAction(() =>
      saveLessonPlan({
        ...lessonPlanForm,
        classId: selectedLessonPlanClassId,
        instructorId: selectedInstructorId,
      })
    );
  }

  function handlePromotion(event) {
    event.preventDefault();
    runAction(() =>
      addPromotion({
        studentId: selectedStudentId,
        instructorId: selectedInstructorId,
        toRank: promotionRank,
        stripes: promotionStripes,
      })
    );
  }

  function handleCurriculumProgress({ skillId, status, instructorId }) {
    runAction(() =>
      updateCurriculumProgress({
        studentId: selectedStudentId,
        skillId,
        status,
        instructorId,
      })
    );
  }

  function handleToggleInstructorStatus(instructorId, isActive) {
    runAction(() => updateInstructorStatus(instructorId, isActive));
  }

  function handleClassStatusChange(classId, status) {
    runAction(() => updateClassStatus(classId, status));
  }

  function handleResetData() {
    if (window.confirm('Reset local academy data?')) {
      runAction(resetAcademyData);
    }
  }

  return {
    data,
    error,
    isSignedIn,
    role,
    selectedInstructor,
    topbarProps: {
      activeInstructors,
      activeStudents,
      currentStudentId,
      isSignedIn,
      onCurrentStudentChange: handleCurrentStudentChange,
      onInstructorChange: setSelectedInstructorId,
      onRoleChange: handleRoleChange,
      onSignOut: () => setIsSignedIn(false),
      role,
      selectedInstructorId,
    },
    loginProps: {
      activeInstructors,
      activeStudents,
      currentStudentId,
      onCurrentStudentChange: handleCurrentStudentChange,
      onInstructorChange: setSelectedInstructorId,
      onRoleChange: setRole,
      onSignIn: handleSignIn,
      role,
      selectedInstructorId,
    },
    metricProps: {
      checkins,
      classes,
      notes,
      students,
    },
    studentDashboardProps: {
      classById,
      currentStudentId,
      instructorById,
      onCheckIn: handleCheckIn,
      selectedStudentCheckins,
      selectedStudentClassIds,
      selectedStudentGoals,
      studentScope,
      studentSkillRows,
      studentTimeline,
      todaysClasses,
    },
    instructorDashboardProps: {
      activeStudents,
      classes,
      instructorById,
      lessonPlanForm,
      manualCheckinStudentId,
      goalForm,
      noteText,
      noteVisibility,
      onAddNote: handleAddNote,
      onAddGoal: handleAddGoal,
      onCheckIn: handleCheckIn,
      onCurriculumProgress: handleCurriculumProgress,
      onGoalFormChange: handleGoalFormChange,
      onGoalStatusChange: handleGoalStatusChange,
      onLessonPlanFormChange: handleLessonPlanFormChange,
      onPromotion: handlePromotion,
      onSaveLessonPlan: handleSaveLessonPlan,
      promotionRank,
      promotionStripes,
      selectedClass,
      selectedClassId,
      selectedClassRoster,
      selectedInstructorId,
      selectedLessonPlan,
      selectedLessonPlanClass,
      selectedLessonPlanClassId,
      selectedStudent,
      selectedStudentCheckins,
      selectedStudentGoals,
      selectedStudentId,
      setManualCheckinStudentId,
      setNoteText,
      setNoteVisibility,
      setPromotionRank,
      setPromotionStripes,
      setSelectedClassId,
      setSelectedLessonPlanClassId,
      setSelectedStudentId,
      studentSkillRows,
      studentTimeline,
      students,
      upcomingInstructorClasses,
    },
    adminDashboardProps: {
      activeInstructors,
      checkins,
      classForm,
      classes,
      classTypes,
      editStudentForm,
      editStudentId,
      filteredStudents,
      instructorById,
      instructorForm,
      instructors,
      onAddClass: handleAddClass,
      onAddInstructor: handleAddInstructor,
      onAddStudent: handleAddStudent,
      onClassFormChange: handleClassFormChange,
      onClassStatusChange: handleClassStatusChange,
      onDeactivateStudent: handleDeactivateStudent,
      onEditStudentFormChange: handleEditStudentFormChange,
      onInstructorFormChange: handleInstructorFormChange,
      onResetData: handleResetData,
      onStudentFormChange: handleStudentFormChange,
      onToggleInstructorStatus: handleToggleInstructorStatus,
      onUpdateStudent: handleUpdateStudent,
      reportClassType,
      reportFrom,
      reportInstructorId,
      reportRows,
      reportStudentId,
      reportTo,
      setEditStudentId,
      setReportClassType,
      setReportFrom,
      setReportInstructorId,
      setReportStudentId,
      setReportTo,
      setStudentSearch,
      studentForm,
      studentSearch,
      students,
    },
  };
}

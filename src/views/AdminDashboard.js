import AttendanceReport from '../components/admin/AttendanceReport';
import ClassScheduleManager from '../components/admin/ClassScheduleManager';
import InstructorManagement from '../components/admin/InstructorManagement';
import StudentDirectory from '../components/admin/StudentDirectory';
import StudentManagement from '../components/admin/StudentManagement';

export default function AdminDashboard({
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
  onAddClass,
  onAddInstructor,
  onAddStudent,
  onClassFormChange,
  onClassStatusChange,
  onDeactivateStudent,
  onEditStudentFormChange,
  onInstructorFormChange,
  onResetData,
  onStudentFormChange,
  onToggleInstructorStatus,
  onUpdateStudent,
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
}) {
  return (
    <section className="workspace-grid admin-grid">
      <StudentManagement
        editStudentForm={editStudentForm}
        editStudentId={editStudentId}
        onAddStudent={onAddStudent}
        onDeactivateStudent={onDeactivateStudent}
        onEditStudentFormChange={onEditStudentFormChange}
        onStudentFormChange={onStudentFormChange}
        onUpdateStudent={onUpdateStudent}
        setEditStudentId={setEditStudentId}
        studentForm={studentForm}
        students={students}
      />

      <InstructorManagement
        instructorForm={instructorForm}
        instructors={instructors}
        onAddInstructor={onAddInstructor}
        onInstructorFormChange={onInstructorFormChange}
        onToggleInstructorStatus={onToggleInstructorStatus}
      />

      <ClassScheduleManager
        activeInstructors={activeInstructors}
        classForm={classForm}
        classes={classes}
        instructorById={instructorById}
        onAddClass={onAddClass}
        onClassFormChange={onClassFormChange}
        onClassStatusChange={onClassStatusChange}
      />

      <StudentDirectory
        checkins={checkins}
        filteredStudents={filteredStudents}
        onResetData={onResetData}
        setEditStudentId={setEditStudentId}
        setStudentSearch={setStudentSearch}
        studentSearch={studentSearch}
      />

      <AttendanceReport
        classTypes={classTypes}
        instructors={instructors}
        reportClassType={reportClassType}
        reportFrom={reportFrom}
        reportInstructorId={reportInstructorId}
        reportRows={reportRows}
        reportStudentId={reportStudentId}
        reportTo={reportTo}
        setReportClassType={setReportClassType}
        setReportFrom={setReportFrom}
        setReportInstructorId={setReportInstructorId}
        setReportStudentId={setReportStudentId}
        setReportTo={setReportTo}
        students={students}
      />
    </section>
  );
}

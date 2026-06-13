import StudentForm from '../StudentForm';

export default function StudentManagement({
  editStudentForm,
  editStudentId,
  onAddStudent,
  onDeactivateStudent,
  onEditStudentFormChange,
  onStudentFormChange,
  onUpdateStudent,
  setEditStudentId,
  studentForm,
  students,
}) {
  return (
    <>
      <article className="panel">
        <div className="panel-heading">
          <h2>Add student</h2>
        </div>
        <StudentForm
          form={studentForm}
          onChange={onStudentFormChange}
          onSubmit={onAddStudent}
          submitLabel="Save student"
        />
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Edit student</h2>
          <label>
            Student
            <select
              value={editStudentId}
              onChange={(event) => setEditStudentId(event.target.value)}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <StudentForm
          form={editStudentForm}
          onChange={onEditStudentFormChange}
          onSubmit={onUpdateStudent}
          submitLabel="Update student"
        />
        <div className="form-actions">
          <button
            className="secondary-button danger-button"
            disabled={!editStudentId}
            onClick={() => onDeactivateStudent(editStudentId)}
            type="button"
          >
            Deactivate
          </button>
        </div>
      </article>
    </>
  );
}

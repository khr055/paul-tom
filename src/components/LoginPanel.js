import { ROLES } from '../constants';

export default function LoginPanel({
  activeInstructors,
  activeStudents,
  currentStudentId,
  onCurrentStudentChange,
  onInstructorChange,
  onRoleChange,
  onSignIn,
  role,
  selectedInstructorId,
}) {
  return (
    <section className="login-grid">
      <article className="panel login-panel">
        <div className="panel-heading">
          <h2>Sign in</h2>
        </div>
        <div className="form-grid">
          <label>
            Role
            <select value={role} onChange={(event) => onRoleChange(event.target.value)}>
              {ROLES.map((roleName) => (
                <option key={roleName} value={roleName}>
                  {roleName}
                </option>
              ))}
            </select>
          </label>
          {role === 'student' && (
            <label>
              Student
              <select
                value={currentStudentId}
                onChange={(event) => onCurrentStudentChange(event.target.value)}
              >
                {activeStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          {role === 'instructor' && (
            <label>
              Instructor
              <select
                value={selectedInstructorId}
                onChange={(event) => onInstructorChange(event.target.value)}
              >
                {activeInstructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button className="primary-button" onClick={onSignIn} type="button">
            Continue
          </button>
        </div>
      </article>
    </section>
  );
}

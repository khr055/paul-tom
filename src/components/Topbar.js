import { ROLES } from '../constants';

export default function Topbar({
  activeInstructors,
  activeStudents,
  currentStudentId,
  isSignedIn,
  onCurrentStudentChange,
  onInstructorChange,
  onRoleChange,
  onSignOut,
  role,
  selectedInstructorId,
}) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Mat Ledger</p>
        <h1>BJJ academy operations</h1>
      </div>

      {isSignedIn && (
        <div className="access-bar">
          <nav className="role-switch" aria-label="Workspace role">
            {ROLES.map((roleName) => (
              <button
                className={role === roleName ? 'is-active' : ''}
                key={roleName}
                onClick={() => onRoleChange(roleName)}
                type="button"
              >
                {roleName}
              </button>
            ))}
          </nav>
          <div className="session-controls">
            {role === 'student' && (
              <label>
                Signed in as
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
            {role === 'admin' && <span className="admin-badge">Academy admin</span>}
            <button className="secondary-button" onClick={onSignOut} type="button">
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

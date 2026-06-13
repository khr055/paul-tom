import AttendanceTable from '../components/AttendanceTable';
import ProgressTimeline from '../components/ProgressTimeline';
import ReadOnlySkillList from '../components/ReadOnlySkillList';
import StudentGoals from '../components/StudentGoals';
import StudentProfile from '../components/StudentProfile';
import { formatTime } from '../utils';

export default function StudentDashboard({
  classById,
  currentStudentId,
  instructorById,
  onCheckIn,
  selectedStudentCheckins,
  selectedStudentClassIds,
  selectedStudentGoals,
  studentScope,
  studentSkillRows,
  studentTimeline,
  todaysClasses,
}) {
  return (
    <section className="workspace-grid">
      <article className="panel">
        <div className="panel-heading">
          <h2>My profile</h2>
          <span className="scope-badge">Student view</span>
        </div>

        {studentScope && <StudentProfile student={studentScope} />}
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Today&apos;s classes</h2>
        </div>
        <div className="class-list">
          {todaysClasses.map((classItem) => {
            const instructor = instructorById[classItem.instructorId];
            const isCheckedIn = selectedStudentClassIds.has(classItem.id);

            return (
              <div className="class-card" key={classItem.id}>
                <div>
                  <h3>{classItem.title}</h3>
                  <p>
                    {formatTime(classItem.startsAt)} | {classItem.classType} |{' '}
                    {classItem.room}
                  </p>
                  <p>{instructor?.name ?? 'Unassigned'}</p>
                </div>
                <button
                  className={isCheckedIn ? 'secondary-button' : 'primary-button'}
                  disabled={isCheckedIn || !studentScope}
                  onClick={() => onCheckIn(classItem.id, currentStudentId)}
                  type="button"
                >
                  {isCheckedIn ? 'Checked in' : 'Check in'}
                </button>
              </div>
            );
          })}
          {todaysClasses.length === 0 && (
            <p className="empty-state">No scheduled classes today.</p>
          )}
        </div>
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Attendance</h2>
        </div>
        <AttendanceTable checkins={selectedStudentCheckins} classById={classById} />
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Progress</h2>
        </div>
        <ProgressTimeline
          instructorById={instructorById}
          role="student"
          timeline={studentTimeline}
        />
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Training goals</h2>
        </div>
        <StudentGoals goals={selectedStudentGoals} />
      </article>

      <article className="panel wide-panel">
        <div className="panel-heading">
          <h2>Curriculum progress</h2>
        </div>
        <ReadOnlySkillList rows={studentSkillRows} />
      </article>
    </section>
  );
}

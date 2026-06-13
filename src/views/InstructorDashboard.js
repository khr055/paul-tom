import { BELTS, SKILL_STATUSES } from '../constants';
import LessonPlanEditor from '../components/LessonPlanEditor';
import ProgressTimeline from '../components/ProgressTimeline';
import StudentGoals from '../components/StudentGoals';
import StudentProfile from '../components/StudentProfile';
import {
  classNameFor,
  classStatus,
  formatDate,
  formatTime,
  stripesText,
} from '../utils';

export default function InstructorDashboard({
  activeStudents,
  classes,
  instructorById,
  lessonPlanForm,
  manualCheckinStudentId,
  goalForm,
  noteText,
  noteVisibility,
  onAddNote,
  onAddGoal,
  onCheckIn,
  onCurriculumProgress,
  onGoalFormChange,
  onGoalStatusChange,
  onLessonPlanFormChange,
  onPromotion,
  onSaveLessonPlan,
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
}) {
  return (
    <section className="workspace-grid">
      <article className="panel">
        <div className="panel-heading">
          <h2>Class roster</h2>
          <label>
            Class
            <select
              value={selectedClassId}
              onChange={(event) => setSelectedClassId(event.target.value)}
            >
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.title} | {formatDate(classItem.startsAt)} |{' '}
                  {formatTime(classItem.startsAt)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedClass && (
          <div className="class-summary">
            <h3>{selectedClass.title}</h3>
            <p>
              {formatDate(selectedClass.startsAt)} | {formatTime(selectedClass.startsAt)} |{' '}
              {selectedClass.classType} | {selectedClass.room}
            </p>
            <p>
              {selectedClassRoster.length} of {selectedClass.capacity} checked in
            </p>
            <span
              className={`status-pill status-${classNameFor(classStatus(selectedClass))}`}
            >
              {classStatus(selectedClass)}
            </span>
          </div>
        )}

        <div className="manual-checkin">
          <label>
            Add student
            <select
              value={manualCheckinStudentId}
              onChange={(event) => setManualCheckinStudentId(event.target.value)}
            >
              {activeStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="primary-button"
            disabled={!selectedClassId || !manualCheckinStudentId}
            onClick={() => onCheckIn(selectedClassId, manualCheckinStudentId)}
            type="button"
          >
            Check in
          </button>
        </div>

        <div className="roster-list">
          {selectedClassRoster.map((checkin) => (
            <button
              key={checkin.id}
              onClick={() => setSelectedStudentId(checkin.studentId)}
              type="button"
            >
              <span>{checkin.student.name}</span>
              <small>{checkin.student.belt}</small>
            </button>
          ))}
          {selectedClassRoster.length === 0 && (
            <p className="empty-state">No students checked in.</p>
          )}
        </div>
      </article>

      <LessonPlanEditor
        form={lessonPlanForm}
        onFormChange={onLessonPlanFormChange}
        onSave={onSaveLessonPlan}
        selectedClass={selectedLessonPlanClass}
        selectedClassId={selectedLessonPlanClassId}
        selectedLessonPlan={selectedLessonPlan}
        setSelectedClassId={setSelectedLessonPlanClassId}
        upcomingClasses={upcomingInstructorClasses}
      />

      <article className="panel">
        <div className="panel-heading">
          <h2>Student profile</h2>
          <label>
            Student
            <select
              value={selectedStudentId}
              onChange={(event) => setSelectedStudentId(event.target.value)}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedStudent && <StudentProfile student={selectedStudent} compact />}
        {selectedStudent && (
          <p className="profile-footnote">
            {selectedStudent.belt} | {stripesText(selectedStudent.stripes)} |{' '}
            {selectedStudentCheckins.length} check-ins
          </p>
        )}
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Progress notes</h2>
        </div>
        <form className="stacked-form" onSubmit={onAddNote}>
          <label>
            Note
            <textarea
              onChange={(event) => setNoteText(event.target.value)}
              rows="4"
              value={noteText}
            />
          </label>
          <div className="inline-controls">
            <label>
              Visibility
              <select
                value={noteVisibility}
                onChange={(event) => setNoteVisibility(event.target.value)}
              >
                <option>Student</option>
                <option>Private</option>
              </select>
            </label>
            <button className="primary-button" type="submit">
              Add note
            </button>
          </div>
        </form>
        <ProgressTimeline
          instructorById={instructorById}
          role="instructor"
          timeline={studentTimeline}
        />
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Training goals</h2>
        </div>
        <form className="stacked-form" onSubmit={onAddGoal}>
          <label>
            Goal
            <input
              name="title"
              onChange={onGoalFormChange}
              value={goalForm.title}
            />
          </label>
          <label>
            Focus
            <textarea
              name="focus"
              onChange={onGoalFormChange}
              rows="3"
              value={goalForm.focus}
            />
          </label>
          <div className="inline-controls">
            <label>
              Target date
              <input
                name="dueDate"
                onChange={onGoalFormChange}
                type="date"
                value={goalForm.dueDate}
              />
            </label>
            <button className="primary-button" type="submit">
              Set goal
            </button>
          </div>
        </form>
        <StudentGoals
          canEdit
          goals={selectedStudentGoals}
          onStatusChange={onGoalStatusChange}
        />
      </article>

      <article className="panel">
        <div className="panel-heading">
          <h2>Promotion</h2>
        </div>
        <form className="inline-form" onSubmit={onPromotion}>
          <label>
            Rank
            <select
              value={promotionRank}
              onChange={(event) => setPromotionRank(event.target.value)}
            >
              {BELTS.map((belt) => (
                <option key={belt}>{belt}</option>
              ))}
            </select>
          </label>
          <label>
            Stripes
            <input
              max="4"
              min="0"
              onChange={(event) => setPromotionStripes(event.target.value)}
              type="number"
              value={promotionStripes}
            />
          </label>
          <button className="primary-button" type="submit">
            Record
          </button>
        </form>
      </article>

      <article className="panel wide-panel">
        <div className="panel-heading">
          <h2>Curriculum</h2>
        </div>
        <div className="skill-list">
          {studentSkillRows.map(({ skill, progress }) => (
            <div className="skill-row" key={skill.id}>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.category}</p>
              </div>
              <div className="status-buttons">
                {SKILL_STATUSES.map((status) => (
                  <button
                    className={progress?.status === status ? 'is-active' : ''}
                    key={status}
                    onClick={() =>
                      onCurriculumProgress({
                        skillId: skill.id,
                        status,
                        instructorId: selectedInstructorId,
                      })
                    }
                    type="button"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

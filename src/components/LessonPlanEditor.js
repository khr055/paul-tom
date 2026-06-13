import { formatDate, formatTime } from '../utils';

export default function LessonPlanEditor({
  form,
  onFormChange,
  onSave,
  selectedClass,
  selectedClassId,
  selectedLessonPlan,
  setSelectedClassId,
  upcomingClasses,
}) {
  return (
    <article className="panel wide-panel lesson-plan-panel">
      <div className="panel-heading">
        <h2>Lesson plan</h2>
        <span className="scope-badge">
          {selectedLessonPlan ? 'Plan saved' : 'New plan'}
        </span>
      </div>

      {upcomingClasses.length > 0 ? (
        <>
          <div className="lesson-plan-layout">
            <label>
              Upcoming class
              <select
                value={selectedClassId}
                onChange={(event) => setSelectedClassId(event.target.value)}
              >
                {upcomingClasses.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.title} | {formatDate(classItem.startsAt)} |{' '}
                    {formatTime(classItem.startsAt)}
                  </option>
                ))}
              </select>
            </label>

            {selectedClass && (
              <div className="class-summary">
                <h3>{selectedClass.title}</h3>
                <p>
                  {formatDate(selectedClass.startsAt)} |{' '}
                  {formatTime(selectedClass.startsAt)} | {selectedClass.classType} |{' '}
                  {selectedClass.room}
                </p>
                <p>Capacity {selectedClass.capacity}</p>
              </div>
            )}
          </div>

          <form className="lesson-plan-form" onSubmit={onSave}>
            <label className="wide-field">
              Plan title
              <input name="title" onChange={onFormChange} value={form.title} />
            </label>

            <label>
              Objectives
              <textarea
                name="objectives"
                onChange={onFormChange}
                rows="3"
                value={form.objectives}
              />
            </label>

            <label>
              Warmup
              <textarea
                name="warmup"
                onChange={onFormChange}
                rows="3"
                value={form.warmup}
              />
            </label>

            <label>
              Techniques
              <textarea
                name="techniques"
                onChange={onFormChange}
                rows="3"
                value={form.techniques}
              />
            </label>

            <label>
              Drills
              <textarea
                name="drills"
                onChange={onFormChange}
                rows="3"
                value={form.drills}
              />
            </label>

            <label>
              Rounds
              <textarea
                name="rounds"
                onChange={onFormChange}
                rows="3"
                value={form.rounds}
              />
            </label>

            <label>
              Notes
              <textarea
                name="notes"
                onChange={onFormChange}
                rows="3"
                value={form.notes}
              />
            </label>

            <div className="lesson-plan-actions">
              {selectedLessonPlan ? (
                <small>
                  Updated {formatDate(selectedLessonPlan.updatedAt)}{' '}
                  {formatTime(selectedLessonPlan.updatedAt)}
                </small>
              ) : (
                <span />
              )}
              <button className="primary-button" disabled={!selectedClassId} type="submit">
                Save plan
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="empty-state">No upcoming classes assigned to this instructor.</p>
      )}
    </article>
  );
}

import { CLASS_STATUSES } from '../../constants';
import { classStatus, formatDate, formatTime } from '../../utils';

export default function ClassScheduleManager({
  activeInstructors,
  classForm,
  classes,
  instructorById,
  onAddClass,
  onClassFormChange,
  onClassStatusChange,
}) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <h2>Class schedule</h2>
      </div>
      <form className="form-grid" onSubmit={onAddClass}>
        <label>
          Title
          <input name="title" onChange={onClassFormChange} value={classForm.title} />
        </label>
        <label>
          Type
          <select
            name="classType"
            onChange={onClassFormChange}
            value={classForm.classType}
          >
            <option>Gi</option>
            <option>No-Gi</option>
            <option>Open Mat</option>
            <option>Competition</option>
          </select>
        </label>
        <label>
          Date
          <input
            name="date"
            onChange={onClassFormChange}
            type="date"
            value={classForm.date}
          />
        </label>
        <label>
          Time
          <input
            name="time"
            onChange={onClassFormChange}
            type="time"
            value={classForm.time}
          />
        </label>
        <label>
          Instructor
          <select
            name="instructorId"
            onChange={onClassFormChange}
            value={classForm.instructorId}
          >
            {activeInstructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Room
          <input name="room" onChange={onClassFormChange} value={classForm.room} />
        </label>
        <label>
          Capacity
          <input
            min="1"
            name="capacity"
            onChange={onClassFormChange}
            type="number"
            value={classForm.capacity}
          />
        </label>
        <label>
          Repeat weeks
          <input
            min="1"
            name="repeatWeeks"
            onChange={onClassFormChange}
            type="number"
            value={classForm.repeatWeeks}
          />
        </label>
        <button className="primary-button" type="submit">
          Save class
        </button>
      </form>

      <div className="table-wrap compact-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Date</th>
              <th>Instructor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td>{classItem.title}</td>
                <td>
                  {formatDate(classItem.startsAt)} {formatTime(classItem.startsAt)}
                </td>
                <td>{instructorById[classItem.instructorId]?.name ?? 'Unassigned'}</td>
                <td>
                  <select
                    aria-label={`Status for ${classItem.title}`}
                    onChange={(event) =>
                      onClassStatusChange(classItem.id, event.target.value)
                    }
                    value={classStatus(classItem)}
                  >
                    {CLASS_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

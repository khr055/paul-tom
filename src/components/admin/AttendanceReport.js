import { formatDate, formatTime } from '../../utils';

export default function AttendanceReport({
  classTypes,
  instructors,
  reportClassType,
  reportFrom,
  reportInstructorId,
  reportRows,
  reportStudentId,
  reportTo,
  setReportClassType,
  setReportFrom,
  setReportInstructorId,
  setReportStudentId,
  setReportTo,
  students,
}) {
  return (
    <article className="panel wide-panel">
      <div className="panel-heading">
        <h2>Attendance report</h2>
        <span className="scope-badge">{reportRows.length} records</span>
      </div>
      <div className="report-filters">
        <label>
          Student
          <select
            value={reportStudentId}
            onChange={(event) => setReportStudentId(event.target.value)}
          >
            <option value="all">All students</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Instructor
          <select
            value={reportInstructorId}
            onChange={(event) => setReportInstructorId(event.target.value)}
          >
            <option value="all">All instructors</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Type
          <select
            value={reportClassType}
            onChange={(event) => setReportClassType(event.target.value)}
          >
            <option value="all">All class types</option>
            {classTypes.map((classType) => (
              <option key={classType} value={classType}>
                {classType}
              </option>
            ))}
          </select>
        </label>
        <label>
          From
          <input
            onChange={(event) => setReportFrom(event.target.value)}
            type="date"
            value={reportFrom}
          />
        </label>
        <label>
          To
          <input
            onChange={(event) => setReportTo(event.target.value)}
            type="date"
            value={reportTo}
          />
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Date</th>
              <th>Instructor</th>
              <th>Checked in</th>
            </tr>
          </thead>
          <tbody>
            {reportRows.map(({ checkin, classItem, instructor, student }) => (
              <tr key={checkin.id}>
                <td>{student.name}</td>
                <td>
                  {classItem.title} | {classItem.classType}
                </td>
                <td>{formatDate(classItem.startsAt)}</td>
                <td>{instructor?.name ?? 'Unassigned'}</td>
                <td>{formatTime(checkin.checkedInAt)}</td>
              </tr>
            ))}
            {reportRows.length === 0 && (
              <tr>
                <td colSpan="5">No attendance records match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}

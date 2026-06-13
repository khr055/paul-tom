import { classNameFor, stripesText } from '../../utils';

export default function StudentDirectory({
  checkins,
  filteredStudents,
  onResetData,
  setEditStudentId,
  setStudentSearch,
  studentSearch,
}) {
  return (
    <article className="panel wide-panel">
      <div className="panel-heading">
        <h2>Student directory</h2>
        <button className="secondary-button" onClick={onResetData} type="button">
          Reset demo data
        </button>
      </div>
      <div className="directory-controls">
        <label>
          Search
          <input
            onChange={(event) => setStudentSearch(event.target.value)}
            value={studentSearch}
          />
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Membership</th>
              <th>Check-ins</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const studentCheckinCount = checkins.filter(
                (checkin) => checkin.studentId === student.id
              ).length;

              return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    {student.belt}, {stripesText(student.stripes)}
                  </td>
                  <td>
                    <span
                      className={`status-pill status-${classNameFor(
                        student.membershipStatus
                      )}`}
                    >
                      {student.membershipStatus}
                    </span>
                  </td>
                  <td>{studentCheckinCount}</td>
                  <td>
                    <button
                      className="secondary-button"
                      onClick={() => setEditStudentId(student.id)}
                      type="button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
}

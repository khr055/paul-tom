import { formatDate, formatTime } from '../utils';

export default function AttendanceTable({ checkins, classById }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {checkins.map((checkin) => {
            const classItem = classById[checkin.classId];

            return (
              <tr key={checkin.id}>
                <td>{classItem?.title ?? 'Class removed'}</td>
                <td>{formatDate(checkin.checkedInAt)}</td>
                <td>{formatTime(checkin.checkedInAt)}</td>
              </tr>
            );
          })}
          {checkins.length === 0 && (
            <tr>
              <td colSpan="3">No check-ins yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

import { classNameFor, formatDate, stripesText } from '../utils';

export default function StudentProfile({ student, compact = false }) {
  return (
    <div className="profile-stack">
      <div className={`identity-row ${compact ? 'compact' : ''}`}>
        <div>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
        </div>
        <span className={`belt-chip belt-${classNameFor(student.belt)}`}>
          {student.belt}
        </span>
      </div>

      <dl className="detail-grid">
        <div>
          <dt>Stripes</dt>
          <dd>{stripesText(student.stripes)}</dd>
        </div>
        <div>
          <dt>Joined</dt>
          <dd>{formatDate(student.joinedAt)}</dd>
        </div>
        <div>
          <dt>Membership</dt>
          <dd>
            <span
              className={`status-pill status-${classNameFor(student.membershipStatus)}`}
            >
              {student.membershipStatus}
            </span>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{student.phone}</dd>
        </div>
        <div className="wide-detail">
          <dt>Emergency</dt>
          <dd>{student.emergencyContact}</dd>
        </div>
      </dl>
    </div>
  );
}

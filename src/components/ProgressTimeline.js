import { formatDate, formatTime, stripesText } from '../utils';

export default function ProgressTimeline({ instructorById, role, timeline }) {
  if (timeline.length === 0) {
    return <p className="empty-state">No progress yet.</p>;
  }

  return (
    <div className="timeline">
      {timeline.map((item) => {
        if (item.type === 'promotion') {
          const { promotion } = item;

          return (
            <div className="timeline-item promotion-item" key={item.id}>
              <p>
                Promoted to {promotion.toRank}, {stripesText(promotion.stripes)}
              </p>
              <span>
                {formatDate(promotion.date)} |{' '}
                {instructorById[promotion.instructorId]?.name ?? 'Instructor'}
              </span>
            </div>
          );
        }

        if (item.type === 'checkin') {
          return (
            <div className="timeline-item checkin-item" key={item.id}>
              <p>Checked into {item.classItem?.title ?? 'class'}</p>
              <span>
                {formatDate(item.checkin.checkedInAt)} |{' '}
                {formatTime(item.checkin.checkedInAt)}
              </span>
            </div>
          );
        }

        if (item.type === 'curriculum') {
          return (
            <div className="timeline-item curriculum-item" key={item.id}>
              <p>
                {item.skill?.name ?? 'Curriculum item'} marked{' '}
                {item.progress.status.toLowerCase()}
              </p>
              <span>
                {formatDate(item.progress.updatedAt)} |{' '}
                {instructorById[item.progress.instructorId]?.name ?? 'Instructor'}
              </span>
            </div>
          );
        }

        if (item.type === 'goal') {
          return (
            <div className="timeline-item goal-item" key={item.id}>
              <p>
                Goal {item.goal.status.toLowerCase()}: {item.goal.title}
              </p>
              <span>
                {formatDate(item.goal.updatedAt ?? item.goal.createdAt)} |{' '}
                {instructorById[item.goal.instructorId]?.name ?? 'Instructor'}
              </span>
            </div>
          );
        }

        const { note } = item;

        return (
          <div className="timeline-item" key={item.id}>
            <p>{note.note}</p>
            <span>
              {formatDate(note.createdAt)} |{' '}
              {instructorById[note.instructorId]?.name ?? 'Instructor'}
              {role !== 'student' ? ` | ${note.visibility}` : ''}
            </span>
          </div>
        );
      })}
    </div>
  );
}

import { GOAL_STATUSES } from '../constants';
import { classNameFor, formatDate } from '../utils';

export default function StudentGoals({
  canEdit = false,
  goals,
  onStatusChange,
}) {
  if (goals.length === 0) {
    return <p className="empty-state">No goals have been set yet.</p>;
  }

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <div className="goal-card" key={goal.id}>
          <div>
            <div className="goal-card-header">
              <h3>{goal.title}</h3>
              <span className={`status-pill status-${classNameFor(goal.status)}`}>
                {goal.status}
              </span>
            </div>
            {goal.focus && <p>{goal.focus}</p>}
            {goal.dueDate && <small>Target: {formatDate(goal.dueDate)}</small>}
          </div>
          {canEdit && (
            <label>
              Status
              <select
                onChange={(event) => onStatusChange(goal.id, event.target.value)}
                value={goal.status}
              >
                {GOAL_STATUSES.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      ))}
    </div>
  );
}

import { BELTS } from '../../constants';
import { isInstructorActive } from '../../utils';

export default function InstructorManagement({
  instructorForm,
  instructors,
  onAddInstructor,
  onInstructorFormChange,
  onToggleInstructorStatus,
}) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <h2>Instructors</h2>
      </div>
      <form className="form-grid" onSubmit={onAddInstructor}>
        <label>
          Name
          <input
            name="name"
            onChange={onInstructorFormChange}
            value={instructorForm.name}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            onChange={onInstructorFormChange}
            type="email"
            value={instructorForm.email}
          />
        </label>
        <label>
          Belt
          <select
            name="belt"
            onChange={onInstructorFormChange}
            value={instructorForm.belt}
          >
            {BELTS.map((belt) => (
              <option key={belt}>{belt}</option>
            ))}
          </select>
        </label>
        <label className="checkbox-label">
          <input
            checked={instructorForm.isActive}
            name="isActive"
            onChange={onInstructorFormChange}
            type="checkbox"
          />
          Instructor access
        </label>
        <button className="primary-button" type="submit">
          Save instructor
        </button>
      </form>

      <div className="directory-list">
        {instructors.map((instructor) => (
          <div className="directory-row" key={instructor.id}>
            <div>
              <h3>{instructor.name}</h3>
              <p>
                {instructor.belt} belt | {instructor.email}
              </p>
            </div>
            <button
              className="secondary-button"
              onClick={() =>
                onToggleInstructorStatus(instructor.id, !isInstructorActive(instructor))
              }
              type="button"
            >
              {isInstructorActive(instructor) ? 'Deactivate' : 'Reactivate'}
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}

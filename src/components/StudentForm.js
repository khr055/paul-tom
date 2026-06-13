import { BELTS, MEMBERSHIP_STATUSES } from '../constants';

export default function StudentForm({ form, onChange, onSubmit, submitLabel }) {
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" onChange={onChange} value={form.name} />
      </label>
      <label>
        Email
        <input name="email" onChange={onChange} type="email" value={form.email} />
      </label>
      <label>
        Phone
        <input name="phone" onChange={onChange} value={form.phone} />
      </label>
      <label>
        Emergency
        <input
          name="emergencyContact"
          onChange={onChange}
          value={form.emergencyContact}
        />
      </label>
      <label>
        Belt
        <select name="belt" onChange={onChange} value={form.belt}>
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
          name="stripes"
          onChange={onChange}
          type="number"
          value={form.stripes}
        />
      </label>
      <label>
        Joined
        <input name="joinedAt" onChange={onChange} type="date" value={form.joinedAt} />
      </label>
      <label>
        Membership
        <select
          name="membershipStatus"
          onChange={onChange}
          value={form.membershipStatus}
        >
          {MEMBERSHIP_STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </label>
      <button className="primary-button" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

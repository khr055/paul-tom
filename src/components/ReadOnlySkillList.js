export default function ReadOnlySkillList({ rows }) {
  const visibleRows = rows.filter(({ progress }) => progress);

  if (visibleRows.length === 0) {
    return <p className="empty-state">No curriculum progress has been recorded yet.</p>;
  }

  return (
    <div className="skill-list">
      {visibleRows.map(({ skill, progress }) => (
        <div className="skill-row" key={skill.id}>
          <div>
            <h3>{skill.name}</h3>
            <p>{skill.category}</p>
          </div>
          <span className="scope-badge">{progress.status}</span>
        </div>
      ))}
    </div>
  );
}

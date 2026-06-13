export default function MetricStrip({ students, classes, checkins, notes }) {
  return (
    <section className="metric-strip" aria-label="Academy totals">
      <div>
        <span>{students.length}</span>
        <p>students</p>
      </div>
      <div>
        <span>{classes.length}</span>
        <p>classes</p>
      </div>
      <div>
        <span>{checkins.length}</span>
        <p>check-ins</p>
      </div>
      <div>
        <span>{notes.length}</span>
        <p>progress notes</p>
      </div>
    </section>
  );
}

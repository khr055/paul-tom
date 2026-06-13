import LoginPanel from './components/LoginPanel';
import MetricStrip from './components/MetricStrip';
import Topbar from './components/Topbar';
import useAcademyWorkspace from './hooks/useAcademyWorkspace';
import { AppShell, GlobalStyles, LoadingShell } from './styles/AppStyles';
import AdminDashboard from './views/AdminDashboard';
import InstructorDashboard from './views/InstructorDashboard';
import StudentDashboard from './views/StudentDashboard';

function App({ initialData = null }) {
  const workspace = useAcademyWorkspace(initialData);

  if (!workspace.data) {
    return (
      <LoadingShell>
        <GlobalStyles />
        <div>
          <p>Loading academy data...</p>
          {workspace.error && <p className="error-banner">{workspace.error}</p>}
        </div>
      </LoadingShell>
    );
  }

  return (
    <AppShell>
      <GlobalStyles />
      <Topbar {...workspace.topbarProps} />

      {workspace.error && <p className="error-banner">{workspace.error}</p>}

      {!workspace.isSignedIn && <LoginPanel {...workspace.loginProps} />}

      {workspace.isSignedIn && (
        <>
          <MetricStrip {...workspace.metricProps} />

          {workspace.role === 'student' && (
            <StudentDashboard {...workspace.studentDashboardProps} />
          )}

          {workspace.role === 'instructor' && (
            <InstructorDashboard {...workspace.instructorDashboardProps} />
          )}

          {workspace.role === 'admin' && (
            <AdminDashboard {...workspace.adminDashboardProps} />
          )}

          {workspace.selectedInstructor && workspace.role !== 'admin' && (
            <p className="footer-note">
              Current instructor: {workspace.selectedInstructor.name},{' '}
              {workspace.selectedInstructor.belt} belt
            </p>
          )}
        </>
      )}
    </AppShell>
  );
}

export default App;

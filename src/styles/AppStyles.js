import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #080b10;
    --bg-soft: #10151d;
    --ink: #f4f7fb;
    --muted: #9aa7b8;
    --line: #303a49;
    --line-strong: #465264;
    --surface: #151b24;
    --surface-soft: #1d2530;
    --field: #0f141c;
    --accent: #e5484d;
    --accent-strong: #ff6267;
    --accent-dark: #b92631;
    --red: #e5484d;
    --gold: #d99b2b;
    --green: #25865a;
    --blue: #3d72d9;
    --purple: #7b55c7;
    --brown: #8c5f43;
    --black: #05070a;
    color: var(--ink);
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: var(--bg);
  }

  ::selection {
    background: rgba(229, 72, 77, 0.32);
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.62;
  }

  .topbar {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    max-width: 1240px;
    margin: 0 auto 22px;
  }

  .access-bar {
    display: grid;
    gap: 10px;
    justify-items: end;
  }

  .eyebrow {
    margin: 0 0 4px;
    color: var(--accent-strong);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  h1 {
    margin-bottom: 0;
    font-size: clamp(2rem, 4vw, 3.7rem);
    line-height: 1;
  }

  h2 {
    margin-bottom: 0;
    font-size: 1.08rem;
  }

  h3 {
    margin-bottom: 5px;
    font-size: 1rem;
  }

  p {
    color: var(--muted);
    line-height: 1.45;
  }

  .role-switch {
    display: inline-flex;
    gap: 6px;
    padding: 6px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(8, 11, 16, 0.74);
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.38);
  }

  .role-switch button {
    min-width: 104px;
    padding: 10px 16px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--muted);
    font-weight: 800;
    text-transform: capitalize;
  }

  .role-switch button.is-active {
    background: var(--accent);
    color: #fff;
  }

  .session-controls,
  .manual-checkin,
  .form-actions,
  .directory-controls,
  .report-filters {
    display: flex;
    align-items: end;
    gap: 12px;
  }

  .session-controls {
    justify-content: flex-end;
  }

  .session-controls label {
    min-width: 220px;
  }

  .admin-badge,
  .scope-badge {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 7px 11px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--surface-soft);
    color: var(--ink);
    font-size: 0.82rem;
    font-weight: 900;
  }

  .login-grid {
    display: grid;
    max-width: 720px;
    margin: 0 auto;
  }

  .login-panel {
    margin-top: 30px;
  }

  .metric-strip,
  .workspace-grid {
    max-width: 1240px;
    margin: 0 auto;
  }

  .metric-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 18px;
  }

  .metric-strip div,
  .panel {
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(21, 27, 36, 0.94);
    box-shadow: 0 20px 55px rgba(0, 0, 0, 0.34);
  }

  .metric-strip div {
    padding: 16px;
  }

  .metric-strip span {
    display: block;
    margin-bottom: 4px;
    color: var(--accent-strong);
    font-size: 1.75rem;
    font-weight: 900;
  }

  .metric-strip p {
    margin-bottom: 0;
    font-weight: 700;
    text-transform: lowercase;
  }

  .workspace-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 18px;
    align-items: start;
  }

  .admin-grid {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  }

  .panel {
    padding: 20px;
  }

  .wide-panel {
    grid-column: 1 / -1;
  }

  .panel-heading,
  .identity-row,
  .inline-controls,
  .inline-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .panel-heading {
    margin-bottom: 18px;
  }

  .identity-row {
    padding: 16px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--surface-soft);
  }

  .identity-row.compact {
    margin-bottom: 16px;
  }

  .identity-row p,
  .class-card p,
  .class-summary p,
  .skill-row p {
    margin-bottom: 0;
  }

  label {
    display: grid;
    gap: 7px;
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 800;
  }

  input,
  select,
  textarea {
    width: 100%;
    min-height: 42px;
    border: 1px solid var(--line);
    border-radius: 7px;
    background: var(--field);
    color: var(--ink);
    padding: 9px 11px;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(229, 72, 77, 0.18);
    outline: none;
  }

  textarea {
    min-height: 112px;
    resize: vertical;
  }

  .profile-stack {
    display: grid;
    gap: 16px;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 0;
  }

  .detail-grid div {
    min-height: 78px;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--bg-soft);
  }

  dt {
    color: var(--muted);
    font-size: 0.74rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  dd {
    margin: 6px 0 0;
    font-weight: 800;
  }

  .belt-chip,
  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: 5px 10px;
    border-radius: 999px;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 900;
  }

  .belt-white {
    border: 1px solid #c7d0dc;
    background: #eef2f7;
    color: #151b24;
  }

  .belt-blue {
    background: var(--blue);
  }

  .belt-purple {
    background: var(--purple);
  }

  .belt-brown {
    background: var(--brown);
  }

  .belt-black {
    background: var(--black);
  }

  .status-active,
  .status-scheduled,
  .status-completed {
    background: var(--green);
  }

  .status-past-due {
    background: var(--gold);
    color: #15100a;
  }

  .status-inactive,
  .status-canceled {
    background: var(--red);
  }

  .status-paused {
    background: var(--line-strong);
  }

  .class-list,
  .roster-list,
  .timeline,
  .skill-list,
  .stacked-form,
  .directory-list,
  .goal-list {
    display: grid;
    gap: 12px;
  }

  .lesson-plan-layout,
  .lesson-plan-form {
    display: grid;
    gap: 14px;
  }

  .lesson-plan-layout {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    align-items: stretch;
    margin-bottom: 14px;
  }

  .lesson-plan-layout .class-summary {
    margin-bottom: 0;
  }

  .lesson-plan-form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lesson-plan-form textarea {
    min-height: 96px;
  }

  .wide-field,
  .lesson-plan-actions {
    grid-column: 1 / -1;
  }

  .lesson-plan-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .lesson-plan-actions small {
    color: var(--muted);
    font-weight: 800;
  }

  .class-card,
  .skill-row,
  .timeline-item,
  .class-summary,
  .directory-row,
  .goal-card {
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--bg-soft);
  }

  .class-card,
  .skill-row,
  .directory-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 104px;
    padding: 15px;
  }

  .primary-button,
  .secondary-button,
  .roster-list button,
  .status-buttons button {
    min-height: 40px;
    border-radius: 7px;
    border: 1px solid transparent;
    padding: 9px 14px;
    font-weight: 900;
  }

  .primary-button {
    background: var(--accent);
    color: #fff;
  }

  .primary-button:hover {
    background: var(--accent-strong);
  }

  .secondary-button {
    border-color: var(--line);
    background: var(--surface-soft);
    color: var(--ink);
  }

  .danger-button {
    color: var(--red);
  }

  .danger-button:hover {
    border-color: var(--red);
  }

  .table-wrap {
    overflow-x: auto;
  }

  .compact-table {
    margin-top: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 520px;
  }

  th,
  td {
    padding: 12px 10px;
    border-bottom: 1px solid var(--line);
    text-align: left;
    vertical-align: middle;
  }

  th {
    color: var(--muted);
    font-size: 0.74rem;
    text-transform: uppercase;
  }

  .timeline-item {
    padding: 14px;
  }

  .timeline-item p {
    margin-bottom: 5px;
    color: var(--ink);
    font-weight: 700;
  }

  .timeline-item span {
    color: var(--muted);
    font-size: 0.84rem;
    font-weight: 700;
  }

  .promotion-item {
    border-left: 5px solid var(--gold);
  }

  .checkin-item {
    border-left: 5px solid var(--accent);
  }

  .curriculum-item {
    border-left: 5px solid var(--blue);
  }

  .goal-item {
    border-left: 5px solid var(--green);
  }

  .goal-card {
    display: grid;
    gap: 12px;
    padding: 14px;
  }

  .goal-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .goal-card p {
    margin-bottom: 8px;
    color: var(--ink);
    font-weight: 700;
  }

  .goal-card small {
    color: var(--muted);
    font-weight: 800;
  }

  .class-summary {
    margin-bottom: 12px;
    padding: 15px;
  }

  .class-summary .status-pill {
    margin-top: 10px;
  }

  .roster-list button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-color: var(--line);
    background: var(--bg-soft);
    color: var(--ink);
    text-align: left;
  }

  .roster-list button:hover,
  .status-buttons button:hover,
  .secondary-button:hover {
    border-color: var(--accent);
  }

  .roster-list small {
    color: var(--muted);
    font-weight: 800;
  }

  .inline-controls {
    align-items: end;
  }

  .inline-form {
    align-items: end;
    margin-bottom: 16px;
  }

  .inline-form label,
  .inline-controls label {
    flex: 1;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .form-grid .primary-button {
    align-self: end;
  }

  .form-actions {
    justify-content: flex-end;
    margin-top: 12px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    min-height: 42px;
    margin-top: 23px;
  }

  .checkbox-label input {
    width: auto;
    min-height: auto;
  }

  .directory-controls {
    margin-bottom: 14px;
  }

  .directory-controls label {
    width: min(420px, 100%);
  }

  .directory-list {
    margin-top: 16px;
  }

  .directory-row p {
    margin-bottom: 0;
  }

  .report-filters {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    margin-bottom: 16px;
  }

  .manual-checkin {
    margin-bottom: 14px;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--surface-soft);
  }

  .manual-checkin label {
    flex: 1;
  }

  .wide-detail {
    grid-column: 1 / -1;
  }

  .status-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: flex-end;
  }

  .status-buttons button {
    border-color: var(--line);
    background: var(--bg-soft);
    color: var(--muted);
    font-size: 0.82rem;
  }

  .status-buttons button.is-active {
    background: var(--accent);
    color: #fff;
  }

  .empty-state {
    margin: 0;
    padding: 14px;
    border: 1px dashed var(--line);
    border-radius: 8px;
    background: var(--bg-soft);
    font-weight: 700;
  }

  .error-banner {
    max-width: 1240px;
    margin: 0 auto 18px;
    padding: 12px 14px;
    border: 1px solid rgba(229, 72, 77, 0.42);
    border-radius: 8px;
    background: rgba(229, 72, 77, 0.14);
    color: #ff8084;
    font-weight: 800;
  }

  .footer-note {
    max-width: 1240px;
    margin: 20px auto 0;
    color: var(--muted);
    font-weight: 700;
  }

  @media (max-width: 880px) {
    .topbar {
      display: grid;
      align-items: start;
    }

    .role-switch {
      width: 100%;
      justify-content: stretch;
    }

    .role-switch button {
      min-width: 0;
      flex: 1;
    }

    .metric-strip,
    .workspace-grid,
    .admin-grid,
    .detail-grid,
    .form-grid,
    .report-filters,
    .lesson-plan-layout,
    .lesson-plan-form {
      grid-template-columns: 1fr;
    }

    .wide-panel {
      grid-column: auto;
    }

    .panel-heading,
    .identity-row,
    .class-card,
    .skill-row,
    .directory-row,
    .inline-controls,
    .inline-form,
    .session-controls,
    .manual-checkin,
    .form-actions,
    .directory-controls,
    .lesson-plan-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .access-bar {
      justify-items: stretch;
    }

    .session-controls label {
      min-width: 0;
    }

    .status-buttons {
      justify-content: flex-start;
    }
  }
`;

export const AppShell = styled.main`
  min-height: 100vh;
  padding: 28px;
  color: var(--ink);
  background:
    linear-gradient(180deg, rgba(229, 72, 77, 0.18), transparent 280px),
    linear-gradient(135deg, #121824 0%, var(--bg) 46%, #06080d 100%);

  @media (max-width: 880px) {
    padding: 18px;
  }
`;

export const LoadingShell = styled(AppShell)`
  display: grid;
  place-items: center;
  font-weight: 700;
`;

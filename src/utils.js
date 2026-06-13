export function dateInputValue(date = new Date()) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

export function toDate(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00`);
  }

  return new Date(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(toDate(value));
}

export function formatTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function isSameLocalDate(value, compare = new Date()) {
  return dateInputValue(new Date(value)) === dateInputValue(compare);
}

export function classNameFor(value = '') {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function classStatus(classItem) {
  return classItem?.status ?? 'Scheduled';
}

export function isInstructorActive(instructor) {
  return instructor?.isActive !== false;
}

export function stripesText(stripes) {
  const count = Number(stripes) || 0;
  return `${count} ${count === 1 ? 'stripe' : 'stripes'}`;
}

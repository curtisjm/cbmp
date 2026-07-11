const CALENDAR_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export type CalendarDateParts = {
  day: number;
  month: number;
  year: number;
};

export function parseCalendarDateString(
  value: string,
): CalendarDateParts | undefined {
  const match = CALENDAR_DATE_PATTERN.exec(value);

  if (!match) {
    return undefined;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year === 0 || month < 1 || month > 12 || day < 1) {
    return undefined;
  }

  if (day > daysInMonth(year, month)) {
    return undefined;
  }

  return { day, month, year };
}

export function isCalendarDateString(value: string): boolean {
  return parseCalendarDateString(value) !== undefined;
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

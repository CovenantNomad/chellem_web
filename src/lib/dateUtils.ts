import { addDays, format, startOfWeek } from "date-fns";

export function getWeekDates() {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Set week start to Monday
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
      const day = addDays(startOfThisWeek, i);
      weekDates.push(day); // Formats the date as "YYYY-MM-DD (Day)"
  }

  return weekDates;
}

export const getDayText = (day: number) => {
  const textDay = ['일', '월', '화', '수', '목', '금', '토'];
  return textDay[day];
};
import { DateTime, Info } from "luxon";

export const gyms = [
  "TK Nekala",
  "TK Lielahti",
  "Kiipeilyareena Ristikko",
  "Kiipeilyareena Salmisaari",
  "Kiipeilyareena Kalasatama",
];

export const grades = [
  "3",
  "4",
  "5",
  "5+",
  "6a",
  "6a+",
  "6b",
  "6b+",
  "6c",
  "6c+",
  "7a",
  "7a+",
  "7b",
  "7b+",
] as const;

export type Ascent = {
  id: string;
  grade: string;
};

export const ascentsByGradeThisMonth = grades.map((grade) => {
  return {
    grade,
    count: Math.round(Math.random() * 10 + 1),
  };
});

export const allMonthlySessions = Info.months("short").map((month) => {
  return {
    month,
    count: Math.round(Math.random() * 10 + 10),
    duration: Math.round(Math.random() * 210 + 30),
  };
});

export const sessionData = Array.from({ length: 12 })
  .map((_) => {
    const startTime = DateTime.now().minus({
      minutes: Math.round(Math.random() * 60 * 24 * 365),
    });
    const endTime = startTime.plus({
      minutes: Math.round(Math.random() * 210 + 30),
    });

    return {
      startTime,
      endTime,
      ascents: grades.map((grade) => {
        return { grade, count: Math.round(Math.random() * 10) };
      }),
    };
  })
  .sort((a, b) => a.startTime.toUnixInteger() - b.startTime.toUnixInteger());

export const climbingDaysThisMonth = sessionData.map(
  (session) => session.startTime.day
);

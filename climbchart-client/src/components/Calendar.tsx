import { DateTime, Info } from "luxon";
import React from "react";

type CalendarProps = {
  month: number;
  year: number;
  coloredDays: number[];
};

const coloredDayStyle: React.CSSProperties = {
  background: "#E7C300",
  borderRadius: 4,
  textAlign: "center",
};

export const Calendar = ({ month, year, coloredDays }: CalendarProps) => {
  const dateTime = DateTime.fromObject({ year, month, day: 1 });
  const offset = dateTime.weekday - 1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        maxWidth: "fit-content",
      }}
    >
      {Info.weekdays("short").map((weekday, index) => {
        return (
          <div
            key={"calendar-weekday-" + index}
            style={{
              padding: 8,
              textAlign: "center",
              borderBottom: "1px solid lightGrey",
            }}
          >
            {weekday}
          </div>
        );
      })}
      {Array(31 + offset)
        .fill("")
        .map((_, index) => (
          <div key={"calendar-day-" + index} style={{ padding: 8 }}>
            {index < offset ||
            index > (dateTime.daysInMonth ?? 31) + offset - 1 ? (
              <div></div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  ...(coloredDays.includes(index + 1 - offset)
                    ? coloredDayStyle
                    : {}),
                }}
              >
                {index + 1 - offset}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
